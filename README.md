# NetPlan - Interactive FLSM & VLSM Subnetting Simulator

A modern, interactive web application for learning and mastering IPv4 subnetting concepts. NetPlan provides hands-on experience with both FLSM (Fixed Length Subnet Masking) and VLSM (Variable Length Subnet Masking) through real-world scenarios and interactive challenges.

## Features

### 🎯 FLSM Calculator
- Define network requirements by either:
  - Number of hosts per subnet
  - Number of subnets needed
- Automatic calculation of optimal subnet masks
- Complete subnet allocation table with all details
- Step-by-step explanation of calculations
- Download results as CSV

### 🚀 VLSM Calculator
- Allocate subnets based on individual department/segment requirements
- Variable-length subnet masks for maximum address efficiency
- Visual representation of address space allocation
- Proportional block visualization showing how subnets fit together
- Automatic FLSM vs VLSM efficiency comparison
- Interactive address range tooltips

### 📊 Address Space Visualization
- Proportional block representation of subnet allocation
- Color-coded subnets for easy identification
- Hover tooltips showing subnet details
- Detailed breakdown table with address calculations
- Clear visualization of unused address space

### 🏆 Challenge Mode
- Three difficulty levels: Beginner, Intermediate, Advanced
- Auto-generated subnetting problems
- Real-time answer validation
- Immediate feedback on correctness
- Step-by-step solution explanation

### 📚 Comprehensive About Section
- Detailed explanation of subnetting concepts
- FLSM vs VLSM comparison and trade-offs
- Key concepts and terminology
- Learning tips and best practices
- Technical implementation details

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Visualization**: Recharts
- **Icons**: Lucide React

## Installation

### Prerequisites
- Node.js 16+ and npm

### Setup

```bash
cd "c:\workspace personal\Netplan"
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## Production Build

Build for production:

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

Preview the build locally:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── About.tsx       # About/Learning page
│   ├── ChallengeMode.tsx # Challenge problems
│   ├── ComparisonChart.tsx # FLSM vs VLSM comparison
│   ├── FLSMWorkflow.tsx # FLSM calculator workflow
│   ├── FLSMRequirements.tsx # FLSM input form
│   ├── FLSMResults.tsx # FLSM calculation results
│   ├── Landing.tsx # Home page
│   ├── Navigation.tsx # Navigation bar
│   ├── NetworkInput.tsx # Shared network input form
│   ├── SubnetTable.tsx # Subnet results table
│   ├── SubnetVisualizer.tsx # Address space visualization
│   ├── VLSMWorkflow.tsx # VLSM calculator workflow
│   ├── VLSMRequirements.tsx # VLSM input form
│   └── VLSMResults.tsx # VLSM calculation results
├── engine/             # Calculation logic
│   ├── ipv4.ts        # IPv4 address utilities
│   ├── flsm.ts        # FLSM algorithm
│   ├── vlsm.ts        # VLSM algorithm
│   ├── validator.ts   # Input validation
│   └── calculations.test.ts # Test cases
├── types/
│   └── subnet.ts      # TypeScript interfaces
├── App.tsx            # Main app component
├── index.css          # Global styles
└── main.tsx           # Entry point
```

## How to Use

### FLSM Mode
1. Enter your base network address and CIDR prefix
2. Choose whether to define by hosts per subnet or number of subnets
3. Enter your requirement
4. Review the calculated subnet allocation
5. Download results if needed

### VLSM Mode
1. Enter your base network address and CIDR prefix
2. Add each department/segment with its host requirement
3. Watch the algorithm allocate optimal subnet sizes
4. View the visual representation of address space
5. Compare with equivalent FLSM allocation
6. Download results if needed

### Challenge Mode
1. Select a difficulty level (Beginner, Intermediate, Advanced)
2. Review the network requirements
3. Fill in the subnet allocation answers
4. Submit for validation
5. Get feedback and try again or move to new challenge

## Calculation Engine

### IPv4 Utilities
- IP address parsing and validation
- CIDR notation handling
- Subnet mask generation
- Network/broadcast address calculation
- Address overlap detection

### FLSM Algorithm
- Calculates minimum subnet mask for given host requirement
- Formula: Find minimum h such that 2^h - 2 ≥ required hosts
- Generates complete subnet table
- Calculates utilization statistics

### VLSM Algorithm
- Sorts requirements from largest to smallest
- Allocates each subnet with optimal size
- Prevents overlap and boundary violations
- Maximizes address efficiency
- Includes FLSM comparison for learning

### Validation Engine
- IPv4 address format validation
- CIDR prefix range checking (0-32)
- Network address alignment verification
- Host requirement boundary checks
- Duplicate name detection
- Overflow detection

## Key Concepts

### Network Address
The first address in a subnet, used to identify the subnet itself.

### Broadcast Address
The last address in a subnet, used for broadcasting to all hosts.

### Usable Host Addresses
All addresses between network and broadcast addresses.

### Subnet Mask
Shows which portion of an IP address represents the network.

### CIDR Notation
Compact representation like 192.168.0.0/24 (address/prefix length).

### FLSM
Fixed Length Subnet Masking - all subnets have the same size and mask. Simple but can waste addresses.

### VLSM
Variable Length Subnet Masking - subnets have different sizes based on requirements. More efficient and flexible.

## Examples

### Example 1: FLSM with 50 hosts per subnet
- Network: 192.168.1.0/24
- Requirement: 50 hosts per subnet
- Result: /26 (62 usable hosts), 4 subnets total

### Example 2: VLSM with mixed requirements
- Network: 192.168.10.0/24
- Requirements:
  - Admin: 60 hosts → /26 (64 addresses)
  - Engineering: 30 hosts → /27 (32 addresses)
  - Accounts: 14 hosts → /28 (16 addresses)
  - HR: 6 hosts → /29 (8 addresses)
  - WAN Link: 2 hosts → /30 (4 addresses)
- Total: 124 addresses used (48.4% efficiency vs 100% with FLSM)

## Accuracy and Reliability

All calculations are performed locally in the browser using custom TypeScript algorithms. The calculation engine has been verified against known test cases:

- ✓ FLSM host-to-prefix conversion
- ✓ FLSM subnet generation and boundaries
- ✓ VLSM sorting and allocation
- ✓ VLSM overlap prevention
- ✓ Address space utilization
- ✓ Boundary checking and validation

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## Performance

- All calculations performed instantly in the browser
- No network requests required for calculations
- Lightweight application (~600KB gzipped)
- Responsive design optimized for all screen sizes

## Educational Use

NetPlan is designed as an educational tool for:
- Computer Science students learning networking
- IT professionals preparing for certifications (CCNA, CompTIA)
- Network administrators designing subnets
- Anyone learning IPv4 subnetting concepts

## License

This project is created for educational purposes.

## Support

For issues, questions, or suggestions, please refer to the About section within the application for more learning resources.

## Changelog

### Version 1.0.0
- Initial release
- FLSM and VLSM calculators
- Interactive visualization
- Challenge mode
- Comprehensive learning resources
