import { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { NetworkInput } from './NetworkInput';
import { VLSMRequirements } from './VLSMRequirements';
import { VLSMResults } from './VLSMResults';
import { calculateVLSM } from '../engine/vlsm';
import { validateNetworkAlignment, validateVLSMRequirements, validateRequirementsFitInNetwork } from '../engine/validator';
import { CalculationResult, SubnetRequirement, ValidationError } from '../types/subnet';

type Step = 'network' | 'requirements' | 'results';

interface VLSMWorkflowProps {
  onBack: () => void;
}

export function VLSMWorkflow({ onBack }: VLSMWorkflowProps) {
  const [step, setStep] = useState<Step>('network');
  const [network, setNetwork] = useState('192.168.0.0');
  const [prefix, setPrefix] = useState(24);
  const [requirements, setRequirements] = useState<SubnetRequirement[]>([
    { name: 'Administration', hostsRequired: 60 },
    { name: 'Engineering', hostsRequired: 30 },
    { name: 'Accounts', hostsRequired: 14 },
    { name: 'HR', hostsRequired: 6 },
    { name: 'WAN Link', hostsRequired: 2 },
  ]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<ValidationError | null>(null);

  const handleNetworkSubmit = () => {
    const alignError = validateNetworkAlignment(network, prefix);
    if (alignError) {
      setError(alignError);
      return;
    }
    setError(null);
    setStep('requirements');
  };

  const handleCalculate = () => {
    setError(null);

    const reqError = validateVLSMRequirements(requirements);
    if (reqError) {
      setError(reqError);
      return;
    }

    const totalHosts = requirements.reduce((sum, req) => sum + req.hostsRequired, 0);
    const fitError = validateRequirementsFitInNetwork(network, prefix, totalHosts);
    if (fitError) {
      setError(fitError);
      return;
    }

    const calculation = calculateVLSM(network, prefix, requirements);

    if (!calculation) {
      setError({
        field: 'calculation',
        message: 'Cannot allocate subnets with given requirements. Requirements may exceed available address space.',
      });
      return;
    }

    setResult(calculation);
    setStep('results');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">
          VLSM Subnet Calculator
        </h1>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-4 mb-8 overflow-x-auto">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full font-bold flex-shrink-0 ${
            step === 'network' || step === 'requirements' || step === 'results'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          1
        </div>
        <span className="text-slate-600 dark:text-slate-400 whitespace-nowrap">Network</span>
        <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full font-bold flex-shrink-0 ${
            step === 'requirements' || step === 'results'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          2
        </div>
        <span className="text-slate-600 dark:text-slate-400 whitespace-nowrap">Requirements</span>
        <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full font-bold flex-shrink-0 ${
            step === 'results'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          3
        </div>
        <span className="text-slate-600 dark:text-slate-400 whitespace-nowrap">Results</span>
      </div>

      {/* Content */}
      <div className="card p-8">
        {step === 'network' && (
          <NetworkInput
            network={network}
            prefix={prefix}
            onNetworkChange={setNetwork}
            onPrefixChange={setPrefix}
            onSubmit={handleNetworkSubmit}
            error={error}
          />
        )}

        {step === 'requirements' && (
          <VLSMRequirements
            requirements={requirements}
            onRequirementsChange={setRequirements}
            onBack={() => setStep('network')}
            onCalculate={handleCalculate}
            error={error}
          />
        )}

        {step === 'results' && result && (
          <VLSMResults
            result={result}
            requirements={requirements}
            onBack={() => setStep('requirements')}
          />
        )}
      </div>
    </div>
  );
}
