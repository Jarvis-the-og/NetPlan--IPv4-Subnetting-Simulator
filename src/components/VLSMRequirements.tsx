import { Trash2, Plus, AlertCircle } from 'lucide-react';
import { SubnetRequirement, ValidationError } from '../types/subnet';

interface VLSMRequirementsProps {
  requirements: SubnetRequirement[];
  onRequirementsChange: (requirements: SubnetRequirement[]) => void;
  onBack: () => void;
  onCalculate: () => void;
  error?: ValidationError | null;
}

export function VLSMRequirements({
  requirements,
  onRequirementsChange,
  onBack,
  onCalculate,
  error,
}: VLSMRequirementsProps) {
  const addRequirement = () => {
    onRequirementsChange([
      ...requirements,
      { name: `Subnet ${requirements.length + 1}`, hostsRequired: 10 },
    ]);
  };

  const removeRequirement = (idx: number) => {
    onRequirementsChange(requirements.filter((_, i) => i !== idx));
  };

  const updateRequirement = (idx: number, field: 'name' | 'hostsRequired', value: string | number) => {
    const updated = [...requirements];
    if (field === 'name') {
      updated[idx].name = value as string;
    } else {
      updated[idx].hostsRequired = Math.max(0, parseInt(value as string) || 0);
    }
    onRequirementsChange(updated);
  };

  const totalHosts = requirements.reduce((sum, req) => sum + req.hostsRequired, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-6">
        Step 2: Subnet Requirements
      </h2>

      <div className="space-y-6">
        <p className="text-slate-600 dark:text-slate-400">
          Define each subnet/department with its name and required number of hosts. The allocation will be optimized automatically.
        </p>

        {/* Requirements Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-bold text-slate-950 dark:text-white">Subnet Name</th>
                <th className="text-left py-3 px-4 font-bold text-slate-950 dark:text-white">Required Hosts</th>
                <th className="text-center py-3 px-4 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {requirements.map((req, idx) => (
                <tr key={idx} className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={req.name}
                      onChange={(e) => updateRequirement(idx, 'name', e.target.value)}
                      placeholder="e.g., Administration"
                      className="input-base text-sm"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min="1"
                      value={req.hostsRequired}
                      onChange={(e) => updateRequirement(idx, 'hostsRequired', e.target.value)}
                      className="input-base text-sm"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    {requirements.length > 1 && (
                      <button
                        onClick={() => removeRequirement(idx)}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-smooth"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Button */}
        <button
          onClick={addRequirement}
          className="w-full p-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-smooth flex items-center justify-center gap-2 text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <Plus className="w-4 h-4" />
          Add Subnet
        </button>

        {/* Summary */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-medium">Total Hosts Required:</span> {totalHosts}
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
