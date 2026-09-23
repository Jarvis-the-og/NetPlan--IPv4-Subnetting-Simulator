/**
 * IPv4 Calculation Engine
 * Core utilities for IPv4 address manipulation and conversion
 */

export interface IPv4Parts {
  octets: [number, number, number, number];
}

/**
 * Parse an IPv4 address string into octets
 */
export function parseIPv4(address: string): [number, number, number, number] | null {
  const parts = address.split('.');
  if (parts.length !== 4) return null;

  const octets = parts.map(p => {
    const num = parseInt(p, 10);
    if (isNaN(num) || num < 0 || num > 255) return null;
    return num;
  });

  if (octets.includes(null)) return null;
  return octets as [number, number, number, number];
}

/**
 * Convert IPv4 octets to decimal representation
 */
export function ipv4ToDecimal(octets: [number, number, number, number]): number {
  return (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3];
}

/**
 * Convert decimal to IPv4 octets
 */
export function decimalToIPv4(num: number): [number, number, number, number] {
  return [
    (num >> 24) & 0xff,
    (num >> 16) & 0xff,
    (num >> 8) & 0xff,
    num & 0xff,
  ];
}

/**
 * Format octets as dotted decimal string
 */
export function formatIPv4(octets: [number, number, number, number]): string {
  return octets.join('.');
}

/**
 * Create CIDR notation string
 */
export function formatCIDR(address: string, prefix: number): string {
  return `${address}/${prefix}`;
}

/**
 * Generate subnet mask from prefix length
 */
export function generateSubnetMask(prefix: number): string {
  let mask = 0xffffffff;
  mask = mask - ((1 << (32 - prefix)) - 1);
  const octets = decimalToIPv4(mask);
  return formatIPv4(octets);
}

/**
 * Get network address from an IP and prefix
 */
export function getNetworkAddress(
  address: [number, number, number, number],
  prefix: number
): [number, number, number, number] {
  const decimal = ipv4ToDecimal(address);
  const mask = 0xffffffff - ((1 << (32 - prefix)) - 1);
  const networkDecimal = decimal & mask;
  return decimalToIPv4(networkDecimal);
}

/**
 * Get broadcast address from network address and prefix
 */
export function getBroadcastAddress(
  networkAddress: [number, number, number, number],
  prefix: number
): [number, number, number, number] {
  const decimal = ipv4ToDecimal(networkAddress);
  const hostBits = 32 - prefix;
  const broadcastDecimal = decimal | ((1 << hostBits) - 1);
  return decimalToIPv4(broadcastDecimal);
}

/**
 * Calculate total addresses in a subnet
 */
export function getTotalAddresses(prefix: number): number {
  return Math.pow(2, 32 - prefix);
}

/**
 * Calculate usable host addresses in a subnet
 */
export function getUsableHosts(prefix: number): number {
  const total = getTotalAddresses(prefix);
  // Special cases for /31 and /32
  if (prefix === 31) return 2; // RFC 3021
  if (prefix === 32) return 1;
  return total - 2;
}

/**
 * Get first usable host address
 */
export function getFirstHostAddress(
  networkAddress: [number, number, number, number]
): [number, number, number, number] {
  const decimal = ipv4ToDecimal(networkAddress);
  return decimalToIPv4(decimal + 1);
}

/**
 * Get last usable host address
 */
export function getLastHostAddress(
  broadcastAddress: [number, number, number, number]
): [number, number, number, number] {
  const decimal = ipv4ToDecimal(broadcastAddress);
  return decimalToIPv4(decimal - 1);
}

/**
 * Check if two subnets overlap
 */
export function subnetsOverlap(
  net1Address: [number, number, number, number],
  net1Prefix: number,
  net2Address: [number, number, number, number],
  net2Prefix: number
): boolean {
  const dec1 = ipv4ToDecimal(net1Address);
  const dec2 = ipv4ToDecimal(net2Address);
  
  const size1 = Math.pow(2, 32 - net1Prefix);
  const size2 = Math.pow(2, 32 - net2Prefix);
  
  const end1 = dec1 + size1 - 1;
  const end2 = dec2 + size2 - 1;
  
  return !(end1 < dec2 || end2 < dec1);
}

/**
 * Check if an IP is within a subnet
 */
export function ipInSubnet(
  ip: [number, number, number, number],
  networkAddress: [number, number, number, number],
  prefix: number
): boolean {
  const ipDecimal = ipv4ToDecimal(ip);
  const netDecimal = ipv4ToDecimal(networkAddress);
  const size = Math.pow(2, 32 - prefix);
  
  return ipDecimal >= netDecimal && ipDecimal < netDecimal + size;
}

/**
 * Get the next available address after a subnet
 */
export function getNextNetworkAddress(
  networkAddress: [number, number, number, number],
  prefix: number
): [number, number, number, number] {
  const decimal = ipv4ToDecimal(networkAddress);
  const size = Math.pow(2, 32 - prefix);
  return decimalToIPv4(decimal + size);
}

/**
 * Validate if a network address is properly aligned with its prefix
 */
export function isValidNetworkAddress(
  address: [number, number, number, number],
  prefix: number
): boolean {
  const networkAddr = getNetworkAddress(address, prefix);
  return (
    address[0] === networkAddr[0] &&
    address[1] === networkAddr[1] &&
    address[2] === networkAddr[2] &&
    address[3] === networkAddr[3]
  );
}
