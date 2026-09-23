import { useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { CalculationResult } from '../types/subnet';
import { SubnetTable } from './SubnetTable';
import { getFLSMExplanation } from '../engine/flsm';

interface FLSMResultsProps {
  result: CalculationResult;
  network: string;
  prefix: number;
  requirementType: 'hosts' | 'subnets';
  value: number;
  onBack: () => void;
}

export function FLSMResults({
  result,
  network,
  prefix,
  requirementType,
  value,
  onBack,
}: FLSMResultsProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  const explanation = getFLSMExplanation(
    requirementType === 'hosts' ? value : undefined,
    requirementType === 'subnets' ? value : undefined,
    prefix
  );

  const downloadResults = () => {
    const csv = [
      ['Subnet', 'Network Address', 'CIDR', 'Subnet Mask', 'First Host', 'Last Host', 'Broadcast', 'Usable Hosts', 'Total Addresses'],
      ...result.subnets.map(subnet => [
        subnet.name,
        subnet.networkAddress,
        `/${subnet.prefix}`,
        subnet.subnetMask,
        subnet.firstHost,
        subnet.lastHost,
        subnet.broadcastAddress,
        subnet.usableHosts,
        subnet.totalAddresses,
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `netplan-flsm-${network.replace(/\./g, '-')}-${prefix}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-6">
        FLSM Calculation Results
      </h2>

      {/* Summary Section */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Base Network</p>
          <p className="text-lg font-mono-ip font-bold text-slate-950 dark:text-white mt-1">
            {result.baseNetwork}/{result.basePrefix}
          </p>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Generated Subnets</p>
          <p className="text-lg font-mono-ip font-bold text-slate-950 dark:text-white mt-1">
            {result.subnets[0].networkAddress}/{result.subnets[0].prefix}
          </p>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Total Subnets</p>
          <p className="text-lg font-bold text-slate-950 dark:text-white mt-1">
            {result.subnets.length}
          </p>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Address Utilization</p>
          <p className="text-lg font-bold text-slate-950 dark:text-white mt-1">
            {result.utilization.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Subnet Table */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-4">
          Subnet Allocation Table
        </h3>
        <SubnetTable subnets={result.subnets} />
      </div>

      {/* Explanation Section */}
      <div className="mb-8">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="w-full p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-smooth flex items-center justify-between"
        >
          <span className="font-medium text-slate-950 dark:text-white">
            How was this calculated?
          </span>
          {showExplanation ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {showExplanation && (
          <div className="mt-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 space-y-2">
              {explanation.split('\n').map((line, idx) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <p key={idx} className="font-bold text-slate-950 dark:text-white">
                      {line.replace(/\*\*/g, '')}
                    </p>
                  );
                }
                if (line.startsWith('- ')) {
                  return <p key={idx} className="ml-4">• {line.substring(2)}</p>;
                }
                return <p key={idx}>{line}</p>;
              })}
            </div>
          </div>
        )}
      </div>

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
