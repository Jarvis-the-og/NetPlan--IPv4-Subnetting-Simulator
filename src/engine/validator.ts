/**
 * Validation Engine for IPv4 and subnetting inputs
 */

import { ValidationError } from '../types/subnet';
import {
  parseIPv4,
  isValidNetworkAddress,
  getTotalAddresses,
  getUsableHosts,
} from './ipv4';

/**
 * Validate IPv4 address format
 */
export function validateIPv4Address(address: string): ValidationError | null {
  if (!address || typeof address !== 'string') {
    return { field: 'address', message: 'Address is required' };
  }

  const trimmed = address.trim();
  if (!trimmed) {
    return { field: 'address', message: 'Address cannot be empty' };
  }

  const octets = parseIPv4(trimmed);
  if (!octets) {
    return {
      field: 'address',
      message: 'Invalid IPv4 address. Use format: xxx.xxx.xxx.xxx',
    };
  }

  return null;
}

/**
 * Validate CIDR prefix
 */
export function validateCIDRPrefix(prefix: unknown): ValidationError | null {
  if (prefix === null || prefix === undefined || prefix === '') {
    return { field: 'prefix', message: 'CIDR prefix is required' };
  }

  const num = typeof prefix === 'string' ? parseInt(prefix, 10) : (prefix as number);

  if (isNaN(num)) {
    return { field: 'prefix', message: 'CIDR prefix must be a number' };
  }

  if (!Number.isInteger(num)) {
    return { field: 'prefix', message: 'CIDR prefix must be an integer' };
  }

  if (num < 0 || num > 32) {
    return { field: 'prefix', message: 'CIDR prefix must be between 0 and 32' };
  }

  return null;
}

/**
 * Validate network address is properly aligned with prefix
 */
export function validateNetworkAlignment(
  address: string,
  prefix: number
): ValidationError | null {
  const addressError = validateIPv4Address(address);
  if (addressError) return addressError;

  const prefixError = validateCIDRPrefix(prefix);
  if (prefixError) return prefixError;

  const octets = parseIPv4(address.trim())!;

  if (!isValidNetworkAddress(octets, prefix)) {
    return {
      field: 'network',
      message: `The address ${address} is not a valid network address for /${prefix}. Network addresses must be aligned to subnet boundaries.`,
    };
  }

  return null;
}

/**
 * Validate host requirement
 */
export function validateHostRequirement(hosts: unknown): ValidationError | null {
  if (hosts === null || hosts === undefined || hosts === '') {
    return { field: 'hosts', message: 'Host requirement is required' };
  }

  const num = typeof hosts === 'string' ? parseInt(hosts, 10) : (hosts as number);

  if (isNaN(num)) {
    return { field: 'hosts', message: 'Host requirement must be a number' };
  }

  if (!Number.isInteger(num)) {
    return { field: 'hosts', message: 'Host requirement must be an integer' };
  }

  if (num < 1) {
    return { field: 'hosts', message: 'Host requirement must be at least 1' };
  }

  if (num > Math.pow(2, 30)) {
    return { field: 'hosts', message: 'Host requirement is too large' };
  }

  return null;
}

/**
 * Validate number of subnets
 */
export function validateNumberOfSubnets(subnets: unknown): ValidationError | null {
  if (subnets === null || subnets === undefined || subnets === '') {
    return { field: 'subnets', message: 'Number of subnets is required' };
  }

  const num = typeof subnets === 'string' ? parseInt(subnets, 10) : (subnets as number);

  if (isNaN(num)) {
    return { field: 'subnets', message: 'Number of subnets must be a number' };
  }

  if (!Number.isInteger(num)) {
    return { field: 'subnets', message: 'Number of subnets must be an integer' };
  }

  if (num < 1) {
    return { field: 'subnets', message: 'Number of subnets must be at least 1' };
  }

  if (num > Math.pow(2, 16)) {
    return { field: 'subnets', message: 'Number of subnets is too large' };
  }

  return null;
}

/**
 * Validate that subnet requirements fit in base network
 */
export function validateRequirementsFitInNetwork(
  baseNetwork: string,
  basePrefix: number,
  totalHostsNeeded: number
): ValidationError | null {
  const addressError = validateIPv4Address(baseNetwork);
  if (addressError) return addressError;

  const prefixError = validateCIDRPrefix(basePrefix);
  if (prefixError) return prefixError;

  const availableHosts = getUsableHosts(basePrefix);

  if (totalHostsNeeded > availableHosts) {
    return {
      field: 'requirements',
      message: `Total hosts required (${totalHostsNeeded}) exceeds available addresses in /${basePrefix} network (${availableHosts} usable hosts).`,
    };
  }

  return null;
}

/**
 * Validate VLSM requirements
 */
export function validateVLSMRequirements(
  requirements: Array<{ name: string; hostsRequired: number }>
): ValidationError | null {
  if (!Array.isArray(requirements) || requirements.length === 0) {
    return { field: 'requirements', message: 'At least one subnet requirement is needed' };
  }

  const names = new Set<string>();

  for (let i = 0; i < requirements.length; i++) {
    const req = requirements[i];

    if (!req.name || !req.name.trim()) {
      return {
        field: `requirements.${i}.name`,
        message: 'Subnet name is required',
      };
    }

    if (names.has(req.name)) {
      return {
        field: `requirements.${i}.name`,
        message: `Duplicate subnet name: "${req.name}"`,
      };
    }
    names.add(req.name);

    const hostError = validateHostRequirement(req.hostsRequired);
    if (hostError) {
      return { field: `requirements.${i}.hosts`, message: hostError.message };
    }
  }

  return null;
}
