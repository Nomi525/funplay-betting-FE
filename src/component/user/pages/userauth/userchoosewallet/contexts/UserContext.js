import React, { createContext, useContext, useEffect, useState } from "react";
import { useWeb3 } from "./Web3Context";
import { ethers } from "ethers";

// Define the type for the user context.
// type UserContextType = {
//   user: string | null;
// };

// Create a context for user data.
const UserContext = createContext<UserContext>({
  user: null,
});

// Custom hook for accessing user context data.
export const useUser = () => useContext(UserContext);

// Provider component that wraps parts of the app that need user context.
export const UserProvider = ({ children }) => {
  // Use the web3 context.
  const { web3Provider } = useWeb3();

  // Initialize user state to hold user's account information.
  const [user, setUser] = useState<string | null>(null);

  // Function to retrieve and set user's account.
  const fetchUserAccount = async () => {
    try {
      if (provider) {
        const signer = provider.getSigner();
        const accounts = await signer.getAddress();
        setUser(accounts);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user account:", error);
      setUser(null);
    }
  };

  // Run fetchUserAccount function whenever the provider instance changes.
  useEffect(() => {
    fetchUserAccount();
  }, [provider]);

  return (
    <UserContext.Provider
      value={{
        user: user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
