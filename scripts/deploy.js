// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const path = require("path");

async function main() {
  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory("Calend3");
  const contract = await Contract.deploy();
  console.log("loading..............");
  await contract.deployed();
  console.log("Calend3 deployed to: ", contract.address);
  saveFrontendFiles(contract);
}
// function saveFrontendFiles() {
//   const fs = require("fs");

//   const abiDir = _dirname + "/../frontend/src/abis";
//   if (!fs.existsSync(abiDir)) {
//     fs.mkdirSync(abiDir);
//   }
//   const artifact = artifacts.readArtifactSync("Calend3");
//   fs.writeFileSync(abiDir + "/Calend3.json", JSON.stringify(artifact, null, 2));
// }

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,
    "..",
    "frontend",
    "src",
    "contracts"
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "Calend3-address.json"),
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Calend3");

  fs.writeFileSync(
    path.join(contractsDir, "Calend3.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
