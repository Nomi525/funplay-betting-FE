import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { magic } from "../magic";

const Web3Context = createContext({
  provider: null,
  signerMagic: null,
  initializeWeb3: () => {},
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signerMagic, setSignerMagic] = useState(null);

  const initializeWeb3 = async () => {
    try {
      const provider = await magic.wallet.getProvider();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();

      setProvider(web3Provider);
      setSignerMagic(signer);
    } catch (error) {
      console.error("Error initializing ethers.js:", error);
    }
  };

  useEffect(() => {
    initializeWeb3();
  }, []);

  return React.createElement(
    Web3Context.Provider,
    {
      value: {
        provider,
        signerMagic,
        initializeWeb3,
      },
    },
    children
  );
};
