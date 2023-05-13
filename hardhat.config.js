require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      // url: `${process.env.MUMBAI_URL}`,
      url: "https://polygon-mumbai.g.alchemy.com/v2/yourAppID",
      //accounts: [process.env.ACCOUNT_PRIVATE_KEY],
      accounts: ["Private Key of the MetaMask account"],
    },
  },
};
