import { useState } from 'react';

interface AddressRange {
  name: string;
  startDecimal: number;
  endDecimal: number;
  prefix: number;
  size: number;
  networkAddress?: string;
  firstHost?: string;
  lastHost?: string;
  broadcastAddress?: string;
}

interface SubnetVisualizerProps {
  ranges: AddressRange[];
  totalAddresses: number;
}

interface TooltipPosition {
  x: number;
  y: number;
}

export function SubnetVisualizer({ ranges, totalAddresses }: SubnetVisualizerProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<TooltipPosition>({ x: 0, y: 0 });

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-cyan-500',
    'bg-rose-500',
    'bg-emerald-500',
    'bg-violet-500',
    'bg-amber-500',
  ];

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  return (
    <div>
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 mb-4">
        <div className="flex gap-2 mb-4 flex-wrap">
          {ranges.map((range, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded ${range.name === 'Unallocated' ? 'bg-slate-300' : colors[idx % colors.length]}`}
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {range.name}
              </span>
            </div>
          ))}
        </div>

        {/* Visualization Bar */}
        <div className="flex gap-1 h-16 rounded-lg overflow-hidden bg-slate-900/10 dark:bg-slate-950 relative">
          {ranges.map((range, idx) => (
            <div
              key={idx}
              style={{
                flex: range.size,
              }}
              className={`${
                range.name === 'Unallocated' ? 'bg-slate-300 dark:bg-slate-600' : colors[idx % colors.length]
              } ${hoveredIndex === idx ? 'ring-2 ring-offset-2 ring-slate-400 brightness-110' : ''} transition-all cursor-pointer relative group`}
              onMouseEnter={(e) => {
                setHoveredIndex(idx);
                handleMouseEnter(e);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Enhanced Tooltip */}
              {hoveredIndex === idx && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 block bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 text-xs rounded px-3 py-2 whitespace-nowrap z-50 shadow-lg border border-slate-700 dark:border-slate-300">
                  <p className="font-bold mb-1">{range.name}</p>
                  {range.networkAddress && (
                    <p className="font-mono-ip text-xs mb-1">
                      {range.networkAddress}/{range.prefix}
                    </p>
                  )}
                  {range.firstHost && range.lastHost ? (
                    <p className="font-mono-ip text-xs mb-1">
                      Hosts: {range.firstHost} – {range.lastHost}
                    </p>
                  ) : null}
                  {range.broadcastAddress && (
                    <p className="font-mono-ip text-xs mb-1">
                      Broadcast: {range.broadcastAddress}
                    </p>
                  )}
                  <p className="font-mono-ip text-xs">
                    Addresses: {range.size}
                  </p>
                  {range.name === 'Unallocated' && (
                    <p className="font-mono-ip text-xs mt-1">
                      Remaining: {range.size}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Details Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-2 px-3 font-bold text-slate-950 dark:text-white">Name</th>
              <th className="text-left py-2 px-3 font-bold text-slate-950 dark:text-white">CIDR</th>
              <th className="text-right py-2 px-3 font-bold text-slate-950 dark:text-white">Addresses</th>
              <th className="text-right py-2 px-3 font-bold text-slate-950 dark:text-white">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {ranges.map((range, idx) => (
              <tr
                key={idx}
                className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="py-2 px-3 font-medium text-slate-950 dark:text-white">
                  {range.name}
                </td>
                <td className="py-2 px-3 font-mono-ip text-slate-600 dark:text-slate-400">
                  {range.prefix > 0 ? `/${range.prefix}` : '-'}
                </td>
                <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-400">
                  {range.size}
                </td>
                <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-400">
                  {((range.size / totalAddresses) * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
