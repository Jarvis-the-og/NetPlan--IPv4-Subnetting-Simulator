import { SubnetResult } from '../types/subnet';

interface SubnetTableProps {
  subnets: SubnetResult[];
}

export function SubnetTable({ subnets }: SubnetTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-3 px-4 font-bold text-slate-950 dark:text-white">Subnet</th>
            <th className="text-left py-3 px-4 font-bold text-slate-950 dark:text-white">Network Address</th>
            <th className="text-left py-3 px-4 font-bold text-slate-950 dark:text-white">CIDR</th>
            <th className="text-left py-3 px-4 font-bold text-slate-950 dark:text-white">Subnet Mask</th>
            <th className="text-left py-3 px-4 font-bold text-slate-950 dark:text-white">First Host</th>
            <th className="text-left py-3 px-4 font-bold text-slate-950 dark:text-white">Last Host</th>
            <th className="text-left py-3 px-4 font-bold text-slate-950 dark:text-white">Broadcast</th>
            <th className="text-right py-3 px-4 font-bold text-slate-950 dark:text-white">Usable</th>
            <th className="text-right py-3 px-4 font-bold text-slate-950 dark:text-white">Total</th>
          </tr>
        </thead>
        <tbody>
          {subnets.map((subnet, idx) => (
            <tr
              key={idx}
              className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-smooth"
            >
              <td className="py-3 px-4 font-medium text-slate-950 dark:text-white">
                {subnet.name}
              </td>
              <td className="py-3 px-4 font-mono-ip text-slate-600 dark:text-slate-400">
                {subnet.networkAddress}
              </td>
              <td className="py-3 px-4 font-mono-ip font-medium text-blue-600 dark:text-blue-400">
                /{subnet.prefix}
              </td>
              <td className="py-3 px-4 font-mono-ip text-slate-600 dark:text-slate-400">
                {subnet.subnetMask}
              </td>
              <td className="py-3 px-4 font-mono-ip text-slate-600 dark:text-slate-400">
                {subnet.firstHost}
              </td>
              <td className="py-3 px-4 font-mono-ip text-slate-600 dark:text-slate-400">
                {subnet.lastHost}
              </td>
              <td className="py-3 px-4 font-mono-ip text-slate-600 dark:text-slate-400">
                {subnet.broadcastAddress}
              </td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">
                {subnet.usableHosts}
              </td>
              <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">
                {subnet.totalAddresses}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
