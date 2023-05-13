import React, { useState, useEffect, useCallback } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

const EthContext = React.createContext({
  accounts: false,
  contract: null,
  connectWallet: () => {},
});

export const EthContextProvider = (props) => {
  const [userAccounts, setUserAccounts] = useState(false);
  const [contract, setContract] = useState();
  const isConnected = async () => {
    const provider = await detectEthereumProvider();
    const accounts = await provider.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      setUserAccounts(accounts[0]);
    }
  };

  const connectWalletHandler = async () => {
    const provider = await detectEthereumProvider();
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) {
      setUserAccounts(accounts[0]);
    } else {
      console.log("No authorized account found");
    }
  };
  const init = useCallback(async (artifacts) => {
    if (artifacts) {
      const contractAddress = artifacts.address.Token;
      const contractABI = artifacts.artifact.abi;
      console.log("contractABI");
      console.log(contractABI);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider.getSigner(0)
      );
      setContract(contract);
    }
  }, []);
  useEffect(() => {
    isConnected();
    const tryInit = async () => {
      try {
        const artifacts = {
          artifact: require("../contracts/Calend3.json"),
          address: require("../contracts/Calend3-address.json"),
        };
        init(artifacts);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  const contextValue = {
    accounts: userAccounts,
    contract: contract,
    connectWallet: connectWalletHandler,
  };
  return (
    <EthContext.Provider value={contextValue}>
      {props.children}
    </EthContext.Provider>
  );
};

export default EthContext;
