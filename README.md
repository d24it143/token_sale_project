🪙 D24IT143 Token Sale Project
This project is a simple Ethereum-based token and token sale system built using Solidity, Truffle, and Ganache.
The main purpose of this project is to understand how cryptocurrency tokens are created, deployed, and sold on a blockchain network.
I created a custom ERC20-like token named D24IT143 with the symbol D24, and implemented a token sale smart contract to simulate how tokens are distributed.
This project helped me learn the fundamentals of blockchain development, smart contracts, and decentralized applications (DApps).

🚀 Project Overview
🔹 Token Details
Token Name: D24IT143
Token Symbol: D24
Total Supply: 250,000 D24
Blockchain: Ethereum (Local Ganache Network)
Framework: Truffle
🔹 Smart Contracts
This project contains two main smart contracts:
DappToken.sol
Creates the D24 token.
Manages total supply and balances.
DappTokenSale.sol
Handles token sale logic.
Allows users to buy tokens using Ether.

🗂️ Project Structure
token_sale_project/
│
├── contracts/
│   ├── DappToken.sol
│   ├── DappTokenSale.sol
│   └── Migrations.sol
│
├── migrations/
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
│
├── test/
│
├── truffle-config.js
├── package.json
└── README.md


⚙️ Technologies Used
Solidity – Smart contract programming
Truffle – Development framework
Ganache – Local blockchain
MetaMask – Wallet & token verification
Web3.js – Blockchain interaction
Node.js – Runtime environment

🛠️ How to Run the Project
1️⃣ Install Dependencies
npm install -g truffle
npm install

2️⃣ Start Ganache
Open Ganache and start a local blockchain.

3️⃣ Compile Contracts
truffle compile

4️⃣ Deploy Contracts
truffle migrate --reset


🔍 How to Verify the Token (D24IT143)
✅ Method 1: Truffle Console
truffle console

Then run:
token = await DappToken.deployed()
await token.name()
await token.symbol()
(await token.totalSupply()).toString()

Expected Output:
Name: D24IT143
Symbol: D24
Supply: 250000

✅ Method 2: MetaMask
Copy the deployed token contract address from migration output.
Open MetaMask → Tokens → Import Token.
Paste the contract address.
Token details should appear automatically.
Add the token and check your balance.

✅ Method 3: Ganache
Open Ganache.
Go to Contracts tab.
You should see:
DappToken
DappTokenSale

🎯 Learning Outcome
Through this project, I learned:
How ERC20-like tokens are created.
How smart contracts are deployed on Ethereum.
How token sales work in blockchain.
How to interact with blockchain using Truffle and MetaMask.
Debugging real blockchain errors like deployment and revert issues.
This project gave me hands-on experience in blockchain development and strengthened my understanding of decentralized systems.

🌱 Future Improvements
Add frontend UI for buying tokens.
Improve token sale logic.
Deploy on testnets like Sepolia or Goerli.
Add more security checks in smart contracts.
Implement real ERC20 standards using OpenZeppelin.

👤 Author
Dhaval Varvariya
Blockchain & Web Development Student
Token Name: D24IT143 (D24)
