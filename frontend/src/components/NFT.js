import detectEthereumProvider from "@metamask/detect-provider";
import React, { useEffect, useRef, useState } from "react";
const { ethers } = require("ethers");

const NFT = () => {
  const [account, setAccount] = useState("");
  const [providerMain, setProviderMain] = useState(null);
  const [nftData, setNftData] = useState(null);
  const listIdRef = useRef();

  useEffect(() => {
    // fetchData();
    // createListing();
  }, []);

  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      fetch(
        `https://testnets-api.opensea.io/v2/orders/sepolia/seaport/listings?asset_contract_address=0x97bc6b1a472ecef7dee2f13afe132bbdb91b6e5a&token_ids=${listIdRef.current.value}&limit=10`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setNftData(response.orders);
          console.log(response.orders);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  const listAll = () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      "https://testnets-api.opensea.io/v2/listings/collection/TWEETNFT/all",
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  const createListing = async (data) => {
    const chain = "mumbai"; // Replace with the desired chain name (e.g., "rinkeby", "mainnet", etc.)
    const url = `https://testnets-api.opensea.io/v2/orders/${chain}/seaport/listings`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error creating listing:", error);
      return null;
    }
  };
  const createListing2 = async () => {
    let tokenId = 2,
      tokenAddress = "0x97bc6b1a472ecef7dee2f13afe132bbdb91b6e5a",
      startAmount = 10000000000,
      expirationTime = 1692787948,
      accountAddress = "0x96c6dcA2eD6683c2F7Af6D87E40142194EdF5A0e",
      apiKey;

    const url = `https://testnets-api.opensea.io/v2/orders/sepolia/seaport/listings`;
    let data = {
      asset: {
        tokenId: tokenId,
        tokenAddress: tokenAddress,
      },
      startAmount: startAmount,
      expirationTime: expirationTime,
      accountAddress: accountAddress,
    };
    const signature = await providerMain.signTransaction(data);
    data["signature"] = signature;
    console.log("signature", signature);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        // "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  };
  const connectMeta = async () => {
    const provider = await detectEthereumProvider();
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length > 0) {
      let data = {
        asset: {
          tokenId: "tokenId",
          tokenAddress: "tokenAddress",
        },
        startAmount: "startAmount",
        expirationTime: "expirationTime",
        accountAddress: "accountAddress",
      };
      const signature = await provider.signTransaction(data);
      setProviderMain(provider);
      console.log(accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No authorized account found");
    }
    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    // // MetaMask requires requesting permission to connect users accounts
    // let res = await provider.send("eth_requestAccounts", []);
    // console.log(res);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    // const signer = provider.getSigner();
  };

  return (
    <div>
      <div>
        <button onClick={connectMeta}>Connect</button>
      </div>
      <div>
        <button onClick={fetchData}>Fetch Listing</button>
        <input type="number" ref={listIdRef}></input>
      </div>
      <div>
        <button onClick={createListing2}>Create Listing</button>
      </div>

      {/* <button onClick={fetchData}>Fetch Data</button> */}
    </div>
  );
};

export default NFT;
