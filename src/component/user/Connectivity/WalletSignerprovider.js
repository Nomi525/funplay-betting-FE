import React from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";

export function useEthersSigner() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  console.log(isConnected, "isConnect");
  const { walletProvider } = useWeb3ModalProvider();
  try {
    console.log(walletProvider, "log");

    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    console.log(ethersProvider, "ethersprovider");
    const signer = ethersProvider.getSigner();
    const balance = ethersProvider.getBalance(address);
    console.log(signer, "signer2");

    return signer;
    // console.log(signer,chainId,address , "Data");
  } catch (error) {
    console.log(error);
  }
}
