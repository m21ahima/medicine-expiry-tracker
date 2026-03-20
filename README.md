# 💊 Medicine Expiry Tracker DApp

A decentralized application (DApp) built on Ethereum blockchain to log and track medicine expiry dates. Every record is permanently stored on-chain and cannot be tampered with.

## 🔍 Features
- Add medicines with expiry dates to the blockchain
- Each record costs 0.001 ETH (demonstrates payable smart contract functions)
- Real-time expiry status — Good ✅, Expiring Soon ⚠️, Expired ❌
- Full transaction history via MetaMask
- Contract balance tracker
- Separate app.js architecture for clean code structure

## 🛠️ Tech Stack
- **Solidity** — Smart contract
- **Truffle** — Compile and deploy
- **Ganache** — Local Ethereum blockchain
- **MetaMask** — Wallet and transaction signing
- **Web3.js** — Frontend blockchain interaction
- **HTML + CSS** — Frontend UI

## 📁 Project Structure
```
medicine-tracker/
├── contracts/
│   └── MedicineTracker.sol
├── migrations/
│   └── 2_deploy_medicine.js
├── frontend/
│   ├── index.html
│   └── app.js
├── screenshots/
├── truffle-config.js
└── README.md
```

## 🚀 How to Run

### Prerequisites
- Node.js installed
- Truffle installed (`npm install -g truffle`)
- Ganache desktop app
- MetaMask browser extension

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/m21ahima/medicine-expiry-tracker.git
cd medicine-expiry-tracker
```

**2. Open Ganache**
- Open Ganache app
- Click the `medicine-tracker` workspace
- Make sure RPC server is running on `HTTP://127.0.0.1:7545`

**3. Deploy smart contract**
```bash
truffle migrate --reset
```
- Copy the contract address from terminal output

**4. Update contract address**
- Open `frontend/app.js`
- Paste contract address in:
```javascript
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
```

**5. Connect MetaMask**
- Add Ganache network in MetaMask (RPC: `http://127.0.0.1:7545`, Chain ID: `1337`)
- Import a Ganache account using its private key

**6. Open the app**
- Right click `frontend/index.html` in VS Code
- Click **Open with Live Server**
- Click **Connect MetaMask** in the app
- Start adding medicines! 🎉

## 📌 Notes
- This runs on a local Ganache blockchain — no real ETH is used
- Every medicine addition creates a new block on the blockchain
- Ganache must be running before opening the app
```

git add .
git commit -m "Added README"
git push
