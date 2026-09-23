import { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { NetworkInput } from './NetworkInput';
import { FLSMRequirements } from './FLSMRequirements';
import { FLSMResults } from './FLSMResults';
import { calculateFLSM } from '../engine/flsm';
import { validateNetworkAlignment, validateHostRequirement, validateNumberOfSubnets } from '../engine/validator';
import { CalculationResult, ValidationError } from '../types/subnet';

type Step = 'network' | 'requirements' | 'results';

interface FLSMWorkflowProps {
  onBack: () => void;
}

export function FLSMWorkflow({ onBack }: FLSMWorkflowProps) {
  const [step, setStep] = useState<Step>('network');
  const [network, setNetwork] = useState('192.168.0.0');
  const [prefix, setPrefix] = useState(24);
  const [requirementType, setRequirementType] = useState<'hosts' | 'subnets'>('hosts');
  const [hostsPerSubnet, setHostsPerSubnet] = useState(50);
  const [numberOfSubnets, setNumberOfSubnets] = useState(4);
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

    if (requirementType === 'hosts') {
      const hostError = validateHostRequirement(hostsPerSubnet);
      if (hostError) {
        setError(hostError);
        return;
      }

      const calculation = calculateFLSM({
        baseNetwork: network,
        basePrefix: prefix,
        hostsPerSubnet,
      });

      if (!calculation) {
        setError({
          field: 'calculation',
          message: 'Cannot allocate subnets with given requirements',
        });
        return;
      }

      setResult(calculation);
    } else {
      const subnetError = validateNumberOfSubnets(numberOfSubnets);
      if (subnetError) {
        setError(subnetError);
        return;
      }

      const calculation = calculateFLSM({
        baseNetwork: network,
        basePrefix: prefix,
        numberOfSubnets,
      });

      if (!calculation) {
        setError({
          field: 'calculation',
          message: 'Cannot allocate subnets with given requirements',
        });
        return;
      }

      setResult(calculation);
    }

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
          FLSM Subnet Calculator
        </h1>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
            step === 'network' || step === 'requirements' || step === 'results'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          1
        </div>
        <span className="text-slate-600 dark:text-slate-400">Network Information</span>
        <ChevronRight className="w-5 h-5 text-slate-400" />
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
            step === 'requirements' || step === 'results'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          2
        </div>
        <span className="text-slate-600 dark:text-slate-400">Requirements</span>
        <ChevronRight className="w-5 h-5 text-slate-400" />
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
            step === 'results'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          3
        </div>
        <span className="text-slate-600 dark:text-slate-400">Results</span>
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
          <FLSMRequirements
            requirementType={requirementType}
            hostsPerSubnet={hostsPerSubnet}
            numberOfSubnets={numberOfSubnets}
            onRequirementTypeChange={setRequirementType}
            onHostsChange={setHostsPerSubnet}
            onSubnetsChange={setNumberOfSubnets}
            onBack={() => setStep('network')}
            onCalculate={handleCalculate}
            error={error}
          />
        )}

        {step === 'results' && result && (
          <FLSMResults
            result={result}
            network={network}
            prefix={prefix}
            requirementType={requirementType}
            value={requirementType === 'hosts' ? hostsPerSubnet : numberOfSubnets}
            onBack={() => setStep('requirements')}
          />
        )}
      </div>
    </div>
  );
}
