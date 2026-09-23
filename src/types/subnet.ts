export interface SubnetRequirement {
  name: string;
  hostsRequired: number;
}

export interface SubnetResult {
  name: string;
  networkAddress: string;
  prefix: number;
  subnetMask: string;
  firstHost: string;
  lastHost: string;
  broadcastAddress: string;
  totalAddresses: number;
  usableHosts: number;
  requiredHosts: number;
}

export interface CalculationResult {
  baseNetwork: string;
  basePrefix: number;
  subnets: SubnetResult[];
  usedAddresses: number;
  totalAvailableAddresses: number;
  remainingAddresses: number;
  utilization: number; // percentage
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface AddressRange {
  startDecimal: number;
  endDecimal: number;
  name: string;
  prefix: number;
}
