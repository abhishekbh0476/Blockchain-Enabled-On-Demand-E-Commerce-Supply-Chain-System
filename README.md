Setup Guide
1. Install Truffle
Type the following command and press Enter:

npm install -g truffle



2. Install Dependencies
Type the following command and press Enter:

npm i


3. Compile the Smart Contract
In the terminal, use the following command to compile the smart contract:

truffle compile


4. Deploy the Smart Contract
After compiling, we need to deploy the smart contract on the blockchain. We are using Ganache, a personal blockchain for Ethereum development used to test and develop smart contracts.

Steps to Deploy:
Open Ganache and create a new workspace.
Copy the RPC Server Address.
The RPC server allows applications to communicate with the Ethereum blockchain, execute smart contract transactions, query the blockchain state, and interact with the Ethereum network.

Add the RPC address to truffle-config.js.
Replace the host address and port address with the Ganache RPC.
After updating the RPC address, open the terminal and run:
truffle migrate
This command will deploy the smart contract to the blockchain.


5. Run DApp
Open a second terminal and enter the client folder:
cd client


Install all packages from package.json:
npm i
Install Web3:
npm install --save web3
Run the application:
npm start
The app gets hosted by default at port 3000.

