window.ARTIFACTS = {
  main: {
    abi: [
      "constructor(uint256 _aprBps)",
      "event Compounded(uint256 yieldAdded, uint256 totalAssets)",
      "event Deposited(address indexed user, uint256 amount, uint256 shares)",
      "event Funded(address indexed from, uint256 amount)",
      "event Withdrawn(address indexed user, uint256 amount, uint256 shares)",
      "function aprBps() view returns (uint256)",
      "function assetsOf(address u) view returns (uint256)",
      "function compound()",
      "function deposit() payable",
      "function fund() payable",
      "function lastCompound() view returns (uint256)",
      "function pendingYield() view returns (uint256)",
      "function reserve() view returns (uint256)",
      "function sharePrice() view returns (uint256)",
      "function shares(address) view returns (uint256)",
      "function totalAssets() view returns (uint256)",
      "function totalShares() view returns (uint256)",
      "function withdraw(uint256 s)"
    ]
  }
};

window.APP_CONFIG = {
  "address": "0xA60D82CaB3b70770C5C852Bc71D8D8f6E64e7d1a", // Your mainnet address
  "slug": "autogrow",
  "name": "AutoGrow",
  "accent": "#22c55e",
  "tagline": "A native coin vault that compounds yield into its share price.",
  "tokens": [], // Emptied to remove the token faucet/approve UI
  "stats": [
    { "label": "Total Assets", "fn": "totalAssets", "fmt": "token" },
    { "label": "Reserve Pool", "fn": "reserve", "fmt": "token" },
    { "label": "Share Price", "fn": "sharePrice", "fmt": "ratio" },
    { "label": "Pending Yield", "fn": "pendingYield", "fmt": "token" },
    { "label": "Fixed APR", "fn": "aprBps", "fmt": "bps" },
    { "label": "Your Shares", "fn": "shares", "fmt": "token", "args": ["me"] },
    { "label": "Your Value", "fn": "assetsOf", "fmt": "token", "args": ["me"] }
  ],
  "actions": [
    {
      "title": "Deposit BOT",
      "fn": "deposit",
      "desc": "Deposit native BOT to mint yield-bearing shares",
      "button": "Deposit",
      "payable": true, // Tells the UI to send msg.value
      "inputs": [{ "id": "amount", "label": "Amount (BOT)", "type": "amount", "default": "10" }]
    },
    {
      "title": "Withdraw Shares",
      "fn": "withdraw",
      "desc": "Redeem vault shares back for BOT + accrued interest",
      "button": "Withdraw",
      "inputs": [{ "id": "s", "label": "Shares to Burn", "type": "amount", "default": "50" }]
    },
    {
      "title": "Compound Yield",
      "fn": "compound",
      "desc": "Fold accumulated pending yield into share price now",
      "button": "Trigger Compound",
      "inputs": []
    },
    {
      "title": "Fund Reserve",
      "fn": "fund",
      "desc": "Top up vault reserve pool to back future yields",
      "button": "Fund Reserve",
      "payable": true, // Tells the UI to send msg.value
      "inputs": [{ "id": "amount", "label": "Amount (BOT)", "type": "amount", "default": "50" }]
    }
  ],
  "views": []
};