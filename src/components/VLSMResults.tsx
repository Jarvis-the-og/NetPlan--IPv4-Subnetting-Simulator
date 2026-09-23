import { useState } from 'react';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';
import { CalculationResult, SubnetRequirement } from '../types/subnet';
import { SubnetTable } from './SubnetTable';
import { SubnetVisualizer } from './SubnetVisualizer';
import { ComparisonChart } from './ComparisonChart';
import { getAddressRanges, calculateEquivalentFLSM } from '../engine/vlsm';

interface VLSMResultsProps {
  result: CalculationResult;
  requirements: SubnetRequirement[];
  onBack: () => void;
}

export function VLSMResults({
  result,
  requirements,
  onBack,
}: VLSMResultsProps) {
  const [showComparison, setShowComparison] = useState(false);

  const flsmComparison = calculateEquivalentFLSM(result.baseNetwork, result.basePrefix, requirements);

  const downloadResults = () => {
    const csv = [
      ['Department/Subnet', 'Required Hosts', 'Allocated Hosts', 'CIDR', 'Network', 'Host Range', 'Broadcast'],
      ...result.subnets.map(subnet => [
        subnet.name,
        subnet.requiredHosts,
        subnet.usableHosts,
        `/${subnet.prefix}`,
        subnet.networkAddress,
        `${subnet.firstHost} - ${subnet.lastHost}`,
        subnet.broadcastAddress,
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `netplan-vlsm-${result.baseNetwork.replace(/\./g, '-')}-${result.basePrefix}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const ranges = getAddressRanges(result);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-6">
        VLSM Calculation Results
      </h2>

      {/* Summary Statistics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Base Network</p>
          <p className="text-lg font-mono-ip font-bold text-slate-950 dark:text-white mt-1">
            {result.baseNetwork}/{result.basePrefix}
          </p>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Subnets Allocated</p>
          <p className="text-lg font-bold text-slate-950 dark:text-white mt-1">
            {result.subnets.length}
          </p>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Addresses Used</p>
          <p className="text-lg font-bold text-slate-950 dark:text-white mt-1">
            {result.usedAddresses} / {result.totalAvailableAddresses}
          </p>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Utilization</p>
          <p className="text-lg font-bold text-slate-950 dark:text-white mt-1">
            {result.utilization.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Address Space Visualization */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-4">
          Address Space Allocation
        </h3>
        <SubnetVisualizer ranges={ranges} totalAddresses={result.totalAvailableAddresses} />
      </div>

      {/* Subnet Table */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-4">
          Subnet Details
        </h3>
        <SubnetTable subnets={result.subnets} />
      </div>

      {/* Remaining Address Space */}
      {result.remainingAddresses > 0 && (
        <div className="mb-8 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <p className="text-sm font-medium text-orange-900 dark:text-orange-200">
            Remaining Unallocated Addresses: {result.remainingAddresses}
          </p>
          {result.subnets.length > 0 && (
            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1 font-mono-ip">
              {result.subnets[result.subnets.length - 1].broadcastAddress} - 192.168.0.255
            </p>
          )}
        </div>
      )}

      {/* FLSM vs VLSM Comparison */}
      {flsmComparison && (
        <div className="mb-8">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="w-full p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-smooth flex items-center justify-between"
          >
            <span className="font-medium text-slate-950 dark:text-white">
              FLSM vs VLSM Comparison
            </span>
            {showComparison ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showComparison && (
            <div className="mt-4 space-y-4">
              <ComparisonChart
                flsmAddresses={flsmComparison.addressesUsed}
                vlsmAddresses={result.usedAddresses}
                totalAddresses={result.totalAvailableAddresses}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-slate-950 dark:text-white mb-2">FLSM Approach</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    All {requirements.length} subnets would use /{flsmComparison.prefix} (for {result.subnets.find(s => s.prefix === Math.min(...result.subnets.map(s => s.prefix)))?.usableHosts || 'N/A'} usable hosts)
                  </p>
                  <p className="text-sm font-mono-ip font-bold text-slate-950 dark:text-white">
                    {flsmComparison.addressesUsed} addresses used
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-bold text-slate-950 dark:text-white mb-2">VLSM Approach</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Variable-length masks optimized for requirements
                  </p>
                  <p className="text-sm font-mono-ip font-bold text-slate-950 dark:text-white">
                    {result.usedAddresses} addresses used ({((1 - result.usedAddresses / flsmComparison.addressesUsed) * 100).toFixed(1)}% more efficient)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="btn-secondary flex-1"
        >
          Back
        </button>
        <button
          onClick={downloadResults}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download CSV
        </button>
      </div>
    </div>
  );
}
