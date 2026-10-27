# AutoGrow

A vault that compounds yield into its share price.

Deposit to receive vault shares. Yield accrues at a fixed APR from a funded reserve and is folded into the share price on every deposit, withdrawal or compound call.

## Run
1. Serve this folder: `python3 -m http.server 8080` and open http://localhost:8080
2. Click **Connect wallet**. The app adds/switches to BOT Chain Testnet (Chain ID 968, RPC https://rpc.bohr.life, explorer https://scan.botchain.ai).
3. Click **Deploy new copy** (deploys the test token(s) and AutoGrow), or paste an existing address and click **Use this address**. To pin an address for everyone, set `address` in config.js.
4. Use **Get test tokens** and **Approve**, then the action cards.

## Manual deploy (Remix)
Open contracts/AutoGrow.sol, compile with 0.8.20+ (EVM version paris), deploy TestToken first, then AutoGrow with the constructor arguments listed in config.js under deploy.args.

## Notes
Testnet demo code, not audited. TestToken has a public faucet and mint.
# autogrow
