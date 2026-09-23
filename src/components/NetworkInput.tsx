import { ValidationError } from '../types/subnet';
import { AlertCircle } from 'lucide-react';

interface NetworkInputProps {
  network: string;
  prefix: number;
  onNetworkChange: (value: string) => void;
  onPrefixChange: (value: number) => void;
  onSubmit: () => void;
  error?: ValidationError | null;
}

export function NetworkInput({
  network,
  prefix,
  onNetworkChange,
  onPrefixChange,
  onSubmit,
  error,
}: NetworkInputProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-6">
        Step 1: Network Information
      </h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="network" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Network Address
          </label>
          <input
            id="network"
            type="text"
            value={network}
            onChange={(e) => onNetworkChange(e.target.value)}
            placeholder="e.g., 192.168.0.0"
            className="input-base"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Enter the base IPv4 network address in dotted decimal notation
          </p>
        </div>

        <div>
          <label htmlFor="prefix" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            CIDR Prefix Length
          </label>
          <div className="flex items-center gap-4">
            <input
              id="prefix"
              type="range"
              min="1"
              max="32"
              value={prefix}
              onChange={(e) => onPrefixChange(parseInt(e.target.value))}
              className="flex-1"
            />
            <div className="text-2xl font-bold text-blue-600 min-w-12">/{prefix}</div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Adjust the prefix length (1-32)
          </p>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm font-mono-ip text-slate-900 dark:text-slate-100">
            {network}/{prefix}
          </p>
        </div>

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

        <button
          onClick={onSubmit}
          className="btn-primary w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
