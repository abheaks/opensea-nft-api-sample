# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

# HardHat Steps

```shell

mkdir hardhat-tutorial
cd hardhat-tutorial
npm init
npm install --save-dev hardhat
npx hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox

```

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

Used Alchemy to deploy the contract in mumbai(Polygon TestNet)

# Install Metamask

```shell
npm install @metamask/detect-provider
```

# Compile Contracts

```shell
npx hardhat compile
```

# Up the local Nodes

```shell
npx hardhat node
```

# Deploy the Contract

```shell
npx hardhat run scripts/deploy.js --network mumbai
```

# Create React App

```shell
npx create-react-app frontend
```

press ⇧⌘V in the editor to view Readme in VSCode
