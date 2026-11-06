// Hardcoded contract address — update after deploy.
// Edit address to point this front end at an existing deployment.
window.APP_CONFIG = {
  "address": "0xA60D82CaB3b70770C5C852Bc71D8D8f6E64e7d1a",
  "slug": "autogrow",
  "name": "AutoGrow",
  "accent": "#5c8a12",
  "tagline": "A vault that compounds yield into its share price.",
  "about": "Deposit to receive vault shares. Yield accrues at a fixed APR from a funded reserve and is folded into the share price on every deposit, withdrawal or compound call.",
  "tokens": [
    "token"
  ],
  "deploy": {
    "tokens": [
      {
        "name": "Vault Token",
        "symbol": "VTK"
      }
    ],
    "args": [
      "$t0",
      1200
    ]
  },
  "stats": [
    {
      "label": "Total assets",
      "fn": "totalAssets",
      "fmt": "token"
    },
    {
      "label": "Reserve",
      "fn": "reserve",
      "fmt": "token"
    },
    {
      "label": "Share price",
      "fn": "sharePrice",
      "fmt": "ratio"
    },
    {
      "label": "Pending yield",
      "fn": "pendingYield",
      "fmt": "token"
    },
    {
      "label": "APR",
      "fn": "aprBps",
      "fmt": "bps"
    },
    {
      "label": "Your shares",
      "fn": "shares",
      "fmt": "token",
      "args": [
        "me"
      ]
    },
    {
      "label": "Your assets",
      "fn": "assetsOf",
      "fmt": "token",
      "args": [
        "me"
      ]
    }
  ],
  "actions": [
    {
      "title": "Deposit",
      "fn": "deposit",
      "inputs": [
        {
          "id": "amount",
          "label": "Amount",
          "type": "amount",
          "default": "100"
        }
      ]
    },
    {
      "title": "Withdraw",
      "fn": "withdraw",
      "inputs": [
        {
          "id": "s",
          "label": "Shares",
          "type": "amount",
          "default": "50"
        }
      ]
    },
    {
      "title": "Compound now",
      "fn": "compound",
      "desc": "Anyone can trigger it.",
      "inputs": []
    },
    {
      "title": "Fund reserve",
      "fn": "fund",
      "inputs": [
        {
          "id": "amount",
          "label": "Amount",
          "type": "amount",
          "default": "500"
        }
      ]
    }
  ],
  "views": []
};
