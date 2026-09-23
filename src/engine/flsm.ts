/**
 * FLSM (Fixed Length Subnet Mask) Calculation Engine
 */

import { SubnetResult, CalculationResult } from '../types/subnet';
import {
  parseIPv4,
  ipv4ToDecimal,
  getNetworkAddress,
  getBroadcastAddress,
  getFirstHostAddress,
  getLastHostAddress,
  getTotalAddresses,
  getUsableHosts,
  generateSubnetMask,
  formatIPv4,
  getNextNetworkAddress,
} from './ipv4';

export interface FLSMInput {
  baseNetwork: string;
  basePrefix: number;
  hostsPerSubnet?: number;
  numberOfSubnets?: number;
}

/**
 * Calculate the prefix length needed for a given number of hosts
 */
function calculatePrefixForHosts(hostsRequired: number): number {
  if (hostsRequired < 1) return -1;
  if (hostsRequired === 1) return 32;
  if (hostsRequired === 2) return 31;

  // Find minimum h such that 2^h - 2 >= hostsRequired
  let h = 1;
  while (Math.pow(2, h) - 2 < hostsRequired) {
    h++;
  }
  return 32 - h;
}

/**
 * Calculate the prefix length needed for a number of subnets
 */
function calculatePrefixForSubnets(basePrefix: number, numberOfSubnets: number): number {
  if (numberOfSubnets < 1) return -1;

  // Find minimum n such that 2^n >= numberOfSubnets
  let n = 0;
  while (Math.pow(2, n) < numberOfSubnets) {
    n++;
  }

  const newPrefix = basePrefix + n;
  if (newPrefix > 32) return -1;

  return newPrefix;
}

/**
 * Calculate number of subnets possible with a given prefix
 */
function calculateNumberOfSubnets(basePrefix: number, subnetPrefix: number): number {
  const subnetBits = subnetPrefix - basePrefix;
  if (subnetBits < 0) return -1;
  return Math.pow(2, subnetBits);
}

/**
 * Generate all subnets for FLSM calculation
 */
function generateSubnets(
  baseNetwork: string,
  basePrefix: number,
  subnetPrefix: number
): SubnetResult[] {
  const subnets: SubnetResult[] = [];

  const baseOctets = parseIPv4(baseNetwork);
  if (!baseOctets) return [];

  const numberOfSubnets = calculateNumberOfSubnets(basePrefix, subnetPrefix);
  if (numberOfSubnets < 0) return [];

  let currentNetwork = getNetworkAddress(baseOctets, basePrefix);

  for (let i = 0; i < numberOfSubnets; i++) {
    const broadcast = getBroadcastAddress(currentNetwork, subnetPrefix);
    const firstHost = getFirstHostAddress(currentNetwork);
    const lastHost = getLastHostAddress(broadcast);
    const totalAddresses = getTotalAddresses(subnetPrefix);
    const usableHosts = getUsableHosts(subnetPrefix);

    subnets.push({
      name: `Subnet ${String.fromCharCode(65 + i)}`,
      networkAddress: formatIPv4(currentNetwork),
      prefix: subnetPrefix,
      subnetMask: generateSubnetMask(subnetPrefix),
      firstHost: formatIPv4(firstHost),
      lastHost: formatIPv4(lastHost),
      broadcastAddress: formatIPv4(broadcast),
      totalAddresses,
      usableHosts,
      requiredHosts: usableHosts,
    });

    currentNetwork = getNextNetworkAddress(currentNetwork, subnetPrefix);
  }

  return subnets;
}

/**
 * Calculate FLSM allocation
 */
export function calculateFLSM(input: FLSMInput): CalculationResult | null {
  const baseOctets = parseIPv4(input.baseNetwork);
  if (!baseOctets) return null;

  // Determine subnet prefix
  let subnetPrefix: number;

  if (input.hostsPerSubnet) {
    subnetPrefix = calculatePrefixForHosts(input.hostsPerSubnet);
  } else if (input.numberOfSubnets) {
    subnetPrefix = calculatePrefixForSubnets(input.basePrefix, input.numberOfSubnets);
  } else {
    return null;
  }

  if (subnetPrefix < 0 || subnetPrefix < input.basePrefix || subnetPrefix > 32) {
    return null;
  }

  // Generate all subnets
  const subnets = generateSubnets(input.baseNetwork, input.basePrefix, subnetPrefix);

  if (subnets.length === 0) return null;

  const baseDecimal = ipv4ToDecimal(baseOctets);
  const totalAvailableAddresses = getTotalAddresses(input.basePrefix);
  const usedAddresses = subnets.length * getTotalAddresses(subnetPrefix);
  const remainingAddresses = Math.max(0, totalAvailableAddresses - usedAddresses);
  const utilization = totalAvailableAddresses > 0 
    ? (usedAddresses / totalAvailableAddresses) * 100 
    : 0;

  return {
    baseNetwork: input.baseNetwork,
    basePrefix: input.basePrefix,
    subnets,
    usedAddresses,
    totalAvailableAddresses,
    remainingAddresses,
    utilization,
  };
}

/**
 * Get calculation explanation for FLSM
 */
export function getFLSMExplanation(
  hostsRequired?: number,
  numberOfSubnets?: number,
  basePrefix?: number
): string {
  let explanation = '';

  if (hostsRequired) {
    explanation += `**Requirement:** ${hostsRequired} hosts per subnet\n\n`;
    explanation += `**Calculation:**\n`;
    explanation += `We need to find the minimum h such that 2^h - 2 ≥ ${hostsRequired}\n\n`;

    let h = 1;
    while (Math.pow(2, h) - 2 < hostsRequired) {
      h++;
    }

    explanation += `2^${h} - 2 = ${Math.pow(2, h) - 2}\n\n`;
    explanation += `Therefore:\n`;
    explanation += `- Host bits = ${h}\n`;
    explanation += `- Network bits = 32 - ${h} = ${32 - h}\n`;
    explanation += `- CIDR prefix = /${32 - h}\n`;
    explanation += `- Subnet mask = ${generateSubnetMask(32 - h)}\n`;
  } else if (numberOfSubnets && basePrefix) {
    explanation += `**Requirement:** ${numberOfSubnets} subnets\n\n`;
    explanation += `**Calculation:**\n`;
    explanation += `We need to find the minimum n such that 2^n ≥ ${numberOfSubnets}\n\n`;

    let n = 0;
    while (Math.pow(2, n) < numberOfSubnets) {
      n++;
    }

    explanation += `2^${n} = ${Math.pow(2, n)}\n\n`;
    explanation += `Therefore:\n`;
    explanation += `- Subnet bits = ${n}\n`;
    explanation += `- New prefix = ${basePrefix} + ${n} = ${basePrefix + n}\n`;
  }

  explanation += `\n**Key Concepts:**\n`;
  explanation += `- Network address = First address of the block\n`;
  explanation += `- Broadcast = Final address of the block\n`;
  explanation += `- Usable hosts = Addresses between network and broadcast\n`;

  return explanation;
}
