import { ArrowLeft } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export function About({ onBack }: AboutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">
          About NetPlan
        </h1>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">
            What is NetPlan?
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            NetPlan is an interactive IPv4 subnetting simulator designed for students and professionals learning computer networks. It provides hands-on experience with FLSM (Fixed Length Subnet Masking) and VLSM (Variable Length Subnet Masking) concepts, enabling users to design, analyze, and visualize IPv4 subnet allocations from real-world network requirements.
          </p>
        </div>

        {/* Subnetting Basics */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">
            Why Subnetting Matters
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
            Subnetting is the process of dividing a large IP network into smaller, more manageable sub-networks called subnets. It's fundamental to modern networking and provides several benefits:
          </p>
          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Efficient Address Usage:</strong> Allocate IP addresses based on actual network requirements rather than wasting addresses.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Network Organization:</strong> Separate departments, services, or physical locations into distinct logical networks.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Security:</strong> Implement network access controls and firewalls at subnet boundaries.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Scalability:</strong> Design networks that can grow and adapt to changing requirements.</span>
            </li>
          </ul>
        </div>

        {/* FLSM */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">
            FLSM - Fixed Length Subnet Masking
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
            FLSM allocates subnets of equal size, with all subnets sharing the same subnet mask. This approach is simple to implement and understand.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
            <p className="font-mono-ip text-sm text-slate-700 dark:text-slate-300 mb-2">
              <strong>Example:</strong>
            </p>
            <p className="font-mono-ip text-sm text-slate-700 dark:text-slate-300">
              Network: 192.168.0.0/24 (256 addresses)
              <br/>
              Requirement: 4 subnets
              <br/>
              Result: Each subnet gets /26 (64 addresses)
            </p>
          </div>
          <p className="text-slate-700 dark:text-slate-300">
            <strong>Drawback:</strong> FLSM wastes addresses when subnet requirements vary. If you need one subnet with 60 hosts and another with only 2, FLSM allocates 62 addresses to both.
          </p>
        </div>

        {/* VLSM */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">
            VLSM - Variable Length Subnet Masking
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
            VLSM allows subnets to have different sizes based on individual requirements. This is more complex but significantly more address-efficient.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
            <p className="font-mono-ip text-sm text-slate-700 dark:text-slate-300 mb-2">
              <strong>Example:</strong>
            </p>
            <p className="font-mono-ip text-sm text-slate-700 dark:text-slate-300">
              Network: 192.168.0.0/24 (256 addresses)
              <br/>
              Requirements:
              <br/>
              &nbsp;&nbsp;Administration: 60 hosts → /26 (64 addresses)
              <br/>
              &nbsp;&nbsp;Engineering: 30 hosts → /27 (32 addresses)
              <br/>
              &nbsp;&nbsp;HR: 6 hosts → /29 (8 addresses)
              <br/>
              &nbsp;&nbsp;WAN Link: 2 hosts → /30 (4 addresses)
              <br/>
              Total: 108 addresses (vs 256 with FLSM)
            </p>
          </div>
          <p className="text-slate-700 dark:text-slate-300">
            <strong>Advantage:</strong> Dramatically reduces address wastage. The network in the example uses only 42% of available addresses instead of 100%.
          </p>
        </div>

        {/* Key Concepts */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">
            Key Concepts
          </h2>
          <div className="space-y-4">
            <div>
              <p className="font-bold text-slate-950 dark:text-white mb-2">Network Address</p>
              <p className="text-slate-700 dark:text-slate-300">The first address in a subnet. Used to identify the subnet itself. Example: 192.168.0.0</p>
            </div>
            <div>
              <p className="font-bold text-slate-950 dark:text-white mb-2">Broadcast Address</p>
              <p className="text-slate-700 dark:text-slate-300">The last address in a subnet. Used for broadcasting to all hosts in the subnet. Example: 192.168.0.255</p>
            </div>
            <div>
              <p className="font-bold text-slate-950 dark:text-white mb-2">Usable Host Addresses</p>
              <p className="text-slate-700 dark:text-slate-300">All addresses between the network and broadcast addresses. For a /24: Network (1 address) + Usable (254 addresses) + Broadcast (1 address) = 256 total</p>
            </div>
            <div>
              <p className="font-bold text-slate-950 dark:text-white mb-2">Subnet Mask</p>
              <p className="text-slate-700 dark:text-slate-300">A dotted decimal mask that shows which portion of an IP address represents the network. Example: /24 = 255.255.255.0</p>
            </div>
            <div>
              <p className="font-bold text-slate-950 dark:text-white mb-2">CIDR Notation</p>
              <p className="text-slate-700 dark:text-slate-300">Compact representation showing network address and prefix length. Example: 192.168.0.0/24 means 24 network bits and 8 host bits</p>
            </div>
          </div>
        </div>

        {/* How to Use NetPlan */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">
            How to Use NetPlan
          </h2>
          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <div>
              <p className="font-bold text-slate-950 dark:text-white mb-2">1. FLSM Calculator</p>
              <p>Learn the basics of fixed-size subnetting. Enter your network and specify either hosts per subnet or number of subnets needed.</p>
            </div>
            <div>
              <p className="font-bold text-slate-950 dark:text-white mb-2">2. VLSM Calculator</p>
              <p>Design efficient networks with variable-sized subnets. Add departments with their individual host requirements.</p>
            </div>
            <div>
              <p className="font-bold text-slate-950 dark:text-white mb-2">3. Challenge Mode</p>
              <p>Test your understanding with interactive problems. Select a difficulty level and solve subnetting challenges.</p>
            </div>
            <div>
              <p className="font-bold text-slate-950 dark:text-white mb-2">4. Visualization</p>
              <p>See how your address space is allocated with interactive charts and visualizations.</p>
            </div>
          </div>
        </div>

        {/* Learning Resources */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">
            Learning Tips
          </h2>
          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Start with FLSM to understand the fundamentals of subnetting mathematics.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Use the explanation panels to understand the calculation process step-by-step.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Practice VLSM with the address space visualization to see how efficiently subnets fit together.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Challenge mode helps reinforce your learning through practical problem-solving.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Download your results for reference or documentation.</span>
            </li>
          </ul>
        </div>

        {/* Technical Details */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">
            Technical Details
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            NetPlan is a fully client-side application with no backend dependencies. All calculations are performed locally in your browser using custom TypeScript algorithms.
          </p>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            <strong>Technology Stack:</strong>
          </p>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li>• React - UI framework</li>
            <li>• TypeScript - Type-safe calculations</li>
            <li>• Tailwind CSS - Styling</li>
            <li>• Recharts - Data visualization</li>
            <li>• Vite - Build tool</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
