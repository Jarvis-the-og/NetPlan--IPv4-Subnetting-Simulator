import { AlertCircle } from 'lucide-react';
import { ValidationError } from '../types/subnet';

interface FLSMRequirementsProps {
  requirementType: 'hosts' | 'subnets';
  hostsPerSubnet: number;
  numberOfSubnets: number;
  onRequirementTypeChange: (type: 'hosts' | 'subnets') => void;
  onHostsChange: (value: number) => void;
  onSubnetsChange: (value: number) => void;
  onBack: () => void;
  onCalculate: () => void;
  error?: ValidationError | null;
}

export function FLSMRequirements({
  requirementType,
  hostsPerSubnet,
  numberOfSubnets,
  onRequirementTypeChange,
  onHostsChange,
  onSubnetsChange,
  onBack,
  onCalculate,
  error,
}: FLSMRequirementsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-6">
        Step 2: Define Requirements
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
            How would you like to define your requirement?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onRequirementTypeChange('hosts')}
              className={`p-4 rounded-lg border-2 transition-smooth ${
                requirementType === 'hosts'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-600'
              }`}
            >
              <p className="font-medium text-slate-950 dark:text-white">Hosts Per Subnet</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Fixed host requirement</p>
            </button>
            <button
              onClick={() => onRequirementTypeChange('subnets')}
              className={`p-4 rounded-lg border-2 transition-smooth ${
                requirementType === 'subnets'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-600'
              }`}
            >
              <p className="font-medium text-slate-950 dark:text-white">Number of Subnets</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Fixed subnet count</p>
            </button>
          </div>
        </div>

        {requirementType === 'hosts' ? (
          <div>
            <label htmlFor="hosts" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Required Hosts Per Subnet
            </label>
            <div className="flex items-center gap-4">
              <input
                id="hosts"
                type="range"
                min="1"
                max="1000"
                value={hostsPerSubnet}
                onChange={(e) => onHostsChange(parseInt(e.target.value))}
                className="flex-1"
              />
              <input
                type="number"
                min="1"
                value={hostsPerSubnet}
                onChange={(e) => onHostsChange(Math.max(1, parseInt(e.target.value) || 1))}
                className="input-base w-24"
              />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="subnets" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Number of Subnets Needed
            </label>
            <div className="flex items-center gap-4">
              <input
                id="subnets"
                type="range"
                min="1"
                max="256"
                value={numberOfSubnets}
                onChange={(e) => onSubnetsChange(parseInt(e.target.value))}
                className="flex-1"
              />
              <input
                type="number"
                min="1"
                value={numberOfSubnets}
                onChange={(e) => onSubnetsChange(Math.max(1, parseInt(e.target.value) || 1))}
                className="input-base w-24"
              />
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900 dark:text-red-200">
                {error.message}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="btn-secondary flex-1"
          >
            Back
          </button>
          <button
            onClick={onCalculate}
            className="btn-primary flex-1"
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
}
