let web3;
let account;
let contract;

const contractAddress = "0x67F9Dda541Cd0F354b91b46fBB6211adf1e78B17";

const abi = [
  {
    "inputs": [{"internalType": "string","name": "_name","type": "string"},{"internalType": "string","name": "_expiryDate","type": "string"}],
    "name": "addMedicine",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_id","type": "uint256"}],
    "name": "getMedicine",
    "outputs": [
      {"internalType": "uint256","name": "","type": "uint256"},
      {"internalType": "string","name": "","type": "string"},
      {"internalType": "string","name": "","type": "string"},
      {"internalType": "address","name": "","type": "address"},
      {"internalType": "uint256","name": "","type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "medicineCount",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];
    contract = new web3.eth.Contract(abi, contractAddress);

    // Show account
    document.getElementById("account").innerText = account.substring(0,6) + "..." + account.substring(38);
    document.getElementById("connectBtn").innerText = "✅ Connected";
    document.getElementById("connectBtn").style.background = "#27ae60";

    // Load balance and medicines
    loadBalance();
    loadMedicines();
  } else {
    alert("Please install MetaMask!");
  }
}

async function loadBalance() {
  const balance = await contract.methods.getBalance().call();
  const inEth = web3.utils.fromWei(balance, "ether");
  document.getElementById("contractBalance").innerText = inEth + " ETH";
}

async function addMedicine() {
  const name = document.getElementById("medicineName").value;
  const expiry = document.getElementById("expiryDate").value;

  if (!name || !expiry) { alert("Fill both fields!"); return; }
  if (!account) { alert("Connect MetaMask first!"); return; }

  setStatus("⏳ Adding to blockchain...", "orange");

  await contract.methods.addMedicine(name, expiry).send({
    from: account,
    value: web3.utils.toWei("0.001", "ether")
  });

  setStatus("✅ Medicine added successfully!", "green");
  document.getElementById("medicineName").value = "";
  document.getElementById("expiryDate").value = "";
  loadMedicines();
  loadBalance();
}

async function loadMedicines() {
  const count = await contract.methods.medicineCount().call();
  const tbody = document.getElementById("medicineList");
  tbody.innerHTML = "";

  if (count == 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#999;">No medicines added yet</td></tr>';
    return;
  }

  for (let i = 1; i <= count; i++) {
    const m = await contract.methods.getMedicine(i).call();
    const addedOn = new Date(m[4] * 1000).toLocaleDateString();
    const status = getExpiryStatus(m[2]);
    const formattedExpiry = formatExpiry(m[2]);

    tbody.innerHTML += `
      <tr class="${status.class}">
        <td>${m[0]}</td>
        <td><strong>${m[1]}</strong></td>
        <td>${formattedExpiry}</td>
        <td>${m[3].substring(0,6)}...${m[3].substring(38)}</td>
        <td>${addedOn}</td>
        <td><span class="status-badge">${status.label}</span></td>
      </tr>`;
  }
}

function getExpiryStatus(expiryStr) {
  let year, month;
  if (expiryStr.includes("-")) {
    [year, month] = expiryStr.split("-").map(Number);
  } else {
    [month, year] = expiryStr.split("/").map(Number);
  }
  const expiry = new Date(year, month - 1, 1);
  const today = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(today.getMonth() + 3);

  if (expiry < today) return { class: "expired", label: "❌ EXPIRED" };
  else if (expiry <= threeMonthsLater) return { class: "expiring-soon", label: "⚠️ EXPIRING SOON" };
  else return { class: "good", label: "✅ GOOD" };
}

function formatExpiry(expiryStr) {
  if (expiryStr.includes("-")) {
    const [year, month] = expiryStr.split("-");
    return month + "/" + year;
  }
  return expiryStr;
}

function setStatus(msg, color) {
  const s = document.getElementById("status");
  s.innerText = msg;
  s.style.color = color;
}