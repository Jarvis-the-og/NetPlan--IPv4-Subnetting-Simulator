# NetPlan - Interactive FLSM & VLSM Subnetting Simulator

A modern, interactive web application for learning and mastering IPv4 subnetting concepts. NetPlan provides hands-on experience with both FLSM (Fixed Length Subnet Masking) and VLSM (Variable Length Subnet Masking) through real-world scenarios.

---

## 🚀 Quick Start in 3 Steps

### Step 1: Start the Application
```bash
git clone https://github.com/Jarvis-the-og/NetPlan--IPv4-Subnetting-Simulator.git
cd "NetPlan--IPv4-Subnetting-Simulator"
npm install  # Only needed first time
npm run dev
```
The application will open at: **http://localhost:5173/**

### Step 2: Choose Your Mode
On the landing page, select one of:
- **FLSM** - For learning fixed-size subnetting
- **VLSM** - For learning variable-size subnetting
- **About** - For learning resources

### Step 3: Start Subnetting!

---

## 💡 Quick Examples

### Example 1: FLSM (5 minutes)
1. Click **FLSM**
2. Enter network: `192.168.1.0`
3. Set prefix: `24`
4. Choose "Hosts Per Subnet"
5. Enter `50` hosts
6. Click Calculate
7. View results and download if needed

**Result**: 4 subnets of /26, each with 62 usable hosts

### Example 2: VLSM (10 minutes)
1. Click **VLSM**
2. Enter network: `192.168.10.0`
3. Set prefix: `24`
4. Add departments:
   - Department 1: 60 hosts
   - Department 2: 30 hosts
   - Department 3: 10 hosts
5. Click Calculate
6. View visualization showing how subnets fit
7. See FLSM comparison (would use 100% of space)

**Result**: VLSM uses only ~43% of space vs 100% with FLSM

---

## 🌟 Features

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
- Interactive address range tooltips showing subnet names, network address, CIDR, broadcast, and total addresses.

### 📊 Address Space Visualization
- Proportional block representation of subnet allocation
- Color-coded subnets for easy identification
- Hover tooltips showing detailed subnet metrics
- Detailed breakdown table with address calculations
- Clear visualization of unused address space

### 📚 Comprehensive About Section
- Detailed explanation of subnetting concepts
- FLSM vs VLSM comparison and trade-offs
- Key concepts and terminology
- Learning tips and best practices
- Technical implementation details

---

## 🏗️ Technical Architecture

The application strictly separates the UI from the calculation logic (Separation of Concerns).

### Technology Stack
- **Frontend**: React 18 with TypeScript 5
- **Styling**: Tailwind CSS 3
- **Build Tool**: Vite 5
- **Visualization**: Recharts 2
- **Icons**: Lucide React

### Project Structure
```
src/
├── components/          # React components
│   ├── About.tsx        # About/Learning page
│   ├── ComparisonChart.tsx # FLSM vs VLSM comparison
│   ├── FLSMWorkflow.tsx # FLSM calculator workflow
│   ├── FLSMRequirements.tsx # FLSM input form
│   ├── FLSMResults.tsx  # FLSM calculation results
│   ├── Landing.tsx      # Home page
│   ├── Navigation.tsx   # Navigation bar
│   ├── NetworkInput.tsx # Shared network input form
│   ├── SubnetTable.tsx  # Subnet results table
│   ├── SubnetVisualizer.tsx # Address space visualization
│   ├── VLSMWorkflow.tsx # VLSM calculator workflow
│   ├── VLSMRequirements.tsx # VLSM input form
│   └── VLSMResults.tsx  # VLSM calculation results
├── engine/              # Calculation logic
│   ├── ipv4.ts          # IPv4 address utilities
│   ├── flsm.ts          # FLSM algorithm
│   ├── vlsm.ts          # VLSM algorithm
│   └── validator.ts     # Input validation
├── types/
│   └── subnet.ts        # TypeScript interfaces
├── App.tsx              # Main app component
├── index.css            # Global styles
└── main.tsx             # Entry point
```

## 🧠 Calculation Engine

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

---

## 📖 Key Concepts

- **Network Address**: The first address in a subnet, used to identify the subnet itself.
- **Broadcast Address**: The last address in a subnet, used for broadcasting to all hosts.
- **Usable Host Addresses**: All addresses between network and broadcast addresses.
- **Subnet Mask**: Shows which portion of an IP address represents the network.
- **CIDR Notation**: Compact representation like 192.168.0.0/24 (address/prefix length).
- **FLSM (Fixed Length Subnet Masking)**: All subnets have the same size and mask. Simple but can waste addresses.
- **VLSM (Variable Length Subnet Masking)**: Subnets have different sizes based on requirements. More efficient and flexible.

---

## 🛠️ Production Build

Build for production:
```bash
npm run build
```
This creates an optimized build in the `dist/` directory.

Preview the build locally:
```bash
npm run preview
```

---

## 🌐 Browser Support & Performance
- Chrome/Edge 90+ | Firefox 88+ | Safari 14+ | Modern mobile browsers
- All calculations performed instantly (<10ms) in the browser
- No network requests required for calculations
- Lightweight application (~164KB gzipped)
- Responsive design optimized for all screen sizes (mobile-friendly)

## 📝 License
This project is created for educational purposes.

## 🤝 Support
For issues, questions, or suggestions, please refer to the About section within the application for more learning resources.
