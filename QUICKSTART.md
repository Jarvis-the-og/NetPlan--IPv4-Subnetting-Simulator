# NetPlan Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start the Application
```bash
cd "c:\workspace personal\Netplan"
npm install  # Only needed first time
npm run dev
```

The application will open at: **http://localhost:5173/**

### Step 2: Choose Your Mode
On the landing page, select one of:
- **FLSM** - For learning fixed-size subnetting
- **VLSM** - For learning variable-size subnetting
- **Challenge** - To test your skills
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

### Example 3: Challenge (15 minutes)
1. Click **Challenge**
2. Select difficulty: **Beginner**
3. Click "Generate Challenge"
4. Review the network requirements
5. Fill in your subnet calculations
6. Click "Submit Answer"
7. Get immediate feedback
8. Try new challenges to improve

---

## 📖 Key Concepts (TL;DR)

### FLSM (Fixed Length Subnet Masking)
- All subnets are **the same size**
- Simple but wastes addresses if requirements vary
- Formula: Find prefix where 2^h - 2 ≥ required hosts

### VLSM (Variable Length Subnet Masking)
- Each subnet is **sized by requirement**
- More efficient, less wasteful
- Allocates from largest requirement first

### Quick Math
- **50 hosts** → Need /26 (62 usable)
- **100 hosts** → Need /25 (126 usable)
- **1000 hosts** → Need /22 (1022 usable)

---

## 🎮 Playing with the Application

### Add More Subnets in VLSM
- Click the **+ Add Subnet** button
- Each new row represents one department/network

### Download Results
- Click the **Download CSV** button
- Use the data in your documentation

### Compare FLSM vs VLSM
- In VLSM results, expand "FLSM vs VLSM Comparison"
- See how much space each approach uses

### Check Address Space
- Watch the visualization show how subnets fit
- Hover over blocks to see details
- See remaining unallocated space

### Change Network
- Click "Back" to return to network input
- Enter a different network (e.g., 10.0.0.0/8)
- Try different subnet counts

---

## ✅ Verification Examples

### Test Case: 4 Subnets from /24
| Setting | Value |
|---------|-------|
| Network | 192.168.1.0/24 |
| Mode | FLSM |
| Option | 4 subnets |
| **Result Prefix** | **/26** |
| Subnet 1 | 192.168.1.0 - 192.168.1.63 |
| Subnet 2 | 192.168.1.64 - 192.168.1.127 |
| Subnet 3 | 192.168.1.128 - 192.168.1.191 |
| Subnet 4 | 192.168.1.192 - 192.168.1.255 |

### Test Case: Mixed Requirements from /24
| Department | Required | Allocated Prefix | Network | Broadcast |
|------------|----------|-----------------|---------|-----------|
| Admin | 60 | /26 | 192.168.10.0 | 192.168.10.63 |
| Engineering | 30 | /27 | 192.168.10.64 | 192.168.10.95 |
| HR | 10 | /28 | 192.168.10.96 | 192.168.10.111 |

---

## 🛠️ Troubleshooting

### "Application won't start"
```bash
# Make sure Node.js is installed
node --version

# Clear cache and reinstall
rm -r node_modules package-lock.json
npm install
npm run dev
```

### "Port 5173 already in use"
```bash
# Change to different port
npm run dev -- --port 3000
```

### "Network address error"
- Ensure CIDR prefix matches the address
- Example: 192.168.1.0/24 is valid
- Example: 192.168.1.5/24 is NOT valid (should be 192.168.1.0)

---

## 📚 Learn More

Inside the app, click **About** for comprehensive learning resources covering:
- What is subnetting?
- Why use FLSM vs VLSM?
- Key networking concepts
- Detailed examples
- Learning tips

---

## 🎯 Common Tasks

### Calculate subnets for 100 employees
1. Go to FLSM
2. Network: `10.0.0.0`, Prefix: `16`
3. Hosts: `100`
4. Get: `/25` prefix with 126 usable hosts

### Allocate subnets for multiple departments
1. Go to VLSM
2. Network: `172.16.0.0`, Prefix: `16`
3. Add: Sales 80, IT 40, HR 20, Guest WiFi 10
4. View: Optimized allocation with efficiency

### Test your knowledge
1. Go to Challenge
2. Select difficulty
3. Solve problems
4. Learn from feedback

---

## 💾 Exporting Results

All calculation results can be downloaded as CSV files:

```csv
Subnet,Network Address,CIDR,Subnet Mask,First Host,Last Host,Broadcast,Usable Hosts,Total Addresses
Subnet A,192.168.1.0,/26,255.255.255.192,192.168.1.1,192.168.1.62,192.168.1.63,62,64
Subnet B,192.168.1.64,/26,255.255.255.192,192.168.1.65,192.168.1.126,192.168.1.127,62,64
```

Use these files in:
- Network documentation
- IP address planning
- Device configuration
- Team communication

---

## 🔗 Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Navigate form fields |
| Enter | Submit form / Click button |
| Esc | Close dialog (if supported) |
| ↑/↓ | Adjust slider values |

---

## 📱 Mobile Usage

NetPlan works on mobile devices!
- Tables horizontally scroll
- Touch-friendly buttons
- All features available
- Responsive design
- Optimized for small screens

---

## ⚡ Pro Tips

1. **Bookmark the page** for quick access
2. **Export results** as you work for documentation
3. **Try different networks** to understand patterns
4. **Use Challenge mode** to reinforce learning
5. **Check the About section** for detailed explanations

---

## ❓ FAQ

**Q: How do I know if my calculation is correct?**
A: Use the Challenge mode to verify your answers against the system.

**Q: Can I use real networks in the calculator?**
A: Yes! Enter any valid IPv4 network address and prefix.

**Q: What if I make a mistake entering data?**
A: Error messages explain what's wrong. Fix and try again.

**Q: Can I save my calculations?**
A: Download as CSV and save the files locally.

**Q: Does this work offline?**
A: Yes! After loading, the app works entirely offline.

**Q: Is there a maximum network size?**
A: /0 to /32 prefixes are supported.

---

## 🎓 Next Steps

1. **Start with FLSM** - Understand the basics
2. **Learn the formula** - 2^h - 2 ≥ required hosts
3. **Try VLSM** - See how to optimize
4. **Use Challenge** - Test your understanding
5. **Read About** - Deepen your knowledge

---

**Ready to start? Open http://localhost:5173/ now!**

---

For detailed documentation, see:
- **README.md** - Complete guide
- **About section** - Learning resources
- **VERIFICATION.md** - Technical details
