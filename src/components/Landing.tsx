import { Zap, Layers } from 'lucide-react';

interface LandingProps {
  onSelectMode: (mode: 'flsm' | 'vlsm' | 'about') => void;
}

export function Landing({ onSelectMode }: LandingProps) {
  return (
    <div className="min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-950 dark:text-white mb-4">
            NetPlan
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
            Interactive IPv4 Subnetting Simulator
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-500">
            Design, calculate and visualize FLSM and VLSM subnetworks from real-world network requirements
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <button
            onClick={() => onSelectMode('flsm')}
            className="p-8 card hover:shadow-lg transition-smooth group"
          >
            <div className="text-blue-600 mb-3">
              <Layers className="w-10 h-10 group-hover:scale-110 transition-smooth" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">FLSM</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Fixed-size subnet allocation
            </p>
          </button>

          <button
            onClick={() => onSelectMode('vlsm')}
            className="p-8 card hover:shadow-lg transition-smooth group"
          >
            <div className="text-green-600 mb-3">
              <Zap className="w-10 h-10 group-hover:scale-110 transition-smooth" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">VLSM</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Requirement-driven subnet allocation
            </p>
          </button>
        </div>

        {/* Info Section */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">
            What is Subnetting?
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Subnetting is the process of dividing an IP network into smaller sub-networks, called subnets. 
            This allows for more efficient use of IP address space and better network organization.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-slate-950 dark:text-white mb-2">FLSM (Fixed Length Subnet Mask)</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                All subnets have the same size and subnet mask. Simple but can waste addresses if 
                requirements vary significantly.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-950 dark:text-white mb-2">VLSM (Variable Length Subnet Mask)</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Subnets can have different sizes based on individual requirements. More efficient 
                but requires careful planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
