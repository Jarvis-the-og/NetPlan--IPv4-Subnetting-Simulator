/**
 * VLSM (Variable Length Subnet Mask) Calculation Engine
 */

import { SubnetRequirement, SubnetResult, CalculationResult } from '../types/subnet';
import {
  parseIPv4,
  ipv4ToDecimal,
  decimalToIPv4,
  getNetworkAddress,
  getBroadcastAddress,
  getFirstHostAddress,
  getLastHostAddress,
  getTotalAddresses,
  getUsableHosts,
  generateSubnetMask,
  formatIPv4,
  subnetsOverlap,
} from './ipv4';

/**
 * Calculate prefix needed for a given number of hosts
 */
function calculatePrefixForHosts(hostsRequired: number): number {
  if (hostsRequired < 1) return -1;
  if (hostsRequired === 1) return 32;
  if (hostsRequired === 2) return 31;

  let h = 1;
  while (Math.pow(2, h) - 2 < hostsRequired) {
    h++;
  }
  return 32 - h;
}

/**
 * Calculate VLSM allocation
 */
export function calculateVLSM(
  baseNetwork: string,
  basePrefix: number,
  requirements: SubnetRequirement[]
): CalculationResult | null {
  const baseOctets = parseIPv4(baseNetwork);
  if (!baseOctets) return null;

  if (requirements.length === 0) return null;

  // Validate all requirements
  for (const req of requirements) {
    if (req.hostsRequired < 1) return null;
  }

  // Sort requirements from largest to smallest
  const sortedReqs = [...requirements].sort((a, b) => b.hostsRequired - a.hostsRequired);

  const subnets: SubnetResult[] = [];
  let currentNetworkDecimal = ipv4ToDecimal(baseOctets);
  const maxAddress = ipv4ToDecimal(baseOctets) + getTotalAddresses(basePrefix) - 1;

  for (const req of sortedReqs) {
    const requiredPrefix = calculatePrefixForHosts(req.hostsRequired);
    if (requiredPrefix < 0 || requiredPrefix < basePrefix) {
      return null; // Cannot allocate
    }

    const subnetSize = getTotalAddresses(requiredPrefix);
    const subnetEnd = currentNetworkDecimal + subnetSize - 1;

    // Check if this subnet fits within the base network
    if (subnetEnd > maxAddress) {
      return null; // Allocation overflow
    }

    const networkOctets = decimalToIPv4(currentNetworkDecimal);
    const broadcast = getBroadcastAddress(networkOctets, requiredPrefix);
    const firstHost = getFirstHostAddress(networkOctets);
    const lastHost = getLastHostAddress(broadcast);
    const totalAddresses = getTotalAddresses(requiredPrefix);
    const usableHosts = getUsableHosts(requiredPrefix);

    subnets.push({
      name: req.name,
      networkAddress: formatIPv4(networkOctets),
      prefix: requiredPrefix,
      subnetMask: generateSubnetMask(requiredPrefix),
      firstHost: formatIPv4(firstHost),
      lastHost: formatIPv4(lastHost),
      broadcastAddress: formatIPv4(broadcast),
      totalAddresses,
      usableHosts,
      requiredHosts: req.hostsRequired,
    });

    // Move to next available network
    currentNetworkDecimal += subnetSize;
  }

  // Calculate statistics
  const totalAvailableAddresses = getTotalAddresses(basePrefix);
  const usedAddresses = subnets.reduce((sum, subnet) => sum + subnet.totalAddresses, 0);
  const remainingAddresses = totalAvailableAddresses - usedAddresses;
  const utilization = totalAvailableAddresses > 0 
    ? (usedAddresses / totalAvailableAddresses) * 100 
    : 0;

  return {
    baseNetwork,
    basePrefix,
    subnets,
    usedAddresses,
    totalAvailableAddresses,
    remainingAddresses,
    utilization,
  };
}

/**
 * Get address range breakdown for visualization
 */
export function getAddressRanges(result: CalculationResult) {
  const ranges = [];

  for (const subnet of result.subnets) {
    const startOctets = parseIPv4(subnet.networkAddress)!;
    const startDecimal = ipv4ToDecimal(startOctets);
    const endDecimal = startDecimal + subnet.totalAddresses - 1;

    ranges.push({
      name: subnet.name,
      startDecimal,
      endDecimal,
      prefix: subnet.prefix,
      size: subnet.totalAddresses,
      networkAddress: subnet.networkAddress,
      firstHost: subnet.firstHost,
      lastHost: subnet.lastHost,
      broadcastAddress: subnet.broadcastAddress,
    });
  }

  // Add remaining space
  const baseOctets = parseIPv4(result.baseNetwork)!;
  const baseDecimal = ipv4ToDecimal(baseOctets);
  const maxDecimal = baseDecimal + result.totalAvailableAddresses - 1;

  if (result.remainingAddresses > 0) {
    const lastSubnet = result.subnets[result.subnets.length - 1];
    const lastOctets = parseIPv4(lastSubnet.networkAddress)!;
    const lastDecimal = ipv4ToDecimal(lastOctets) + lastSubnet.totalAddresses - 1;

    ranges.push({
      name: 'Unallocated',
      startDecimal: lastDecimal + 1,
      endDecimal: maxDecimal,
      prefix: 0,
      size: result.remainingAddresses,
      networkAddress: undefined,
      firstHost: undefined,
      lastHost: undefined,
      broadcastAddress: undefined,
    });
  }

  return ranges;
}

/**
 * Calculate FLSM for comparison
 */
export function calculateEquivalentFLSM(
  baseNetwork: string,
  basePrefix: number,
  requirements: SubnetRequirement[]
): { prefix: number; subnetsNeeded: number; addressesUsed: number } | null {
  const baseOctets = parseIPv4(baseNetwork);
  if (!baseOctets) return null;

  if (requirements.length === 0) return null;

  // Find the largest requirement
  const maxHosts = Math.max(...requirements.map(r => r.hostsRequired));

  // Calculate prefix for largest requirement
  const prefix = calculatePrefixForHosts(maxHosts);
  if (prefix < 0 || prefix < basePrefix) return null;

  const subnetSize = getTotalAddresses(prefix);
  const subnetsNeeded = requirements.length;
  const addressesUsed = subnetsNeeded * subnetSize;

  return {
    prefix,
    subnetsNeeded,
    addressesUsed,
  };
}
