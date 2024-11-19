import Routes from "./routes/Routes";

import "./assets/style/admin.css";
import "./assets/style/responsive.css";
import "../src/container/admin/pages/rolePermission/RolePermission.css";
import "react-toastify/dist/ReactToastify.css";
// user side css
import "./container/user/pages/userChat/UserChat.css";
import "./container/user/pages/userLayout/userlayout.css";
import "./container/user/pages/userDashboard/userdashboard.css";
import "./component/user/defaultLayout/defaultlayout.css";
import "./assets/style/swiper.css";
import "./component/user/pages/userdashboard/topweeklyplayer/topweeklyplayer.css";
import "./component/user/pages/userauth/userchoosewallet/userchoosewallet.css";
import "./container/user/auth/auth.css";
import "./container/user/pages/userQuery/userquery.css";
import "./container/admin/pages/bannerManagement/bannermanagement.css";
import "./assets/style/global.css";
import "./container/admin/pages/profile/profile.css";
import "./container/admin/auth/changePassword/changepassword.css";
import "./container/admin/auth/otp/otp.css";
import "./container/user/pages/userSetting/usersetting.css";
import "./container/user/pages/threeColorbetting/threecolorbetting.css";
import "./container/user/pages/communityBetting/communitybetting.css";
import "./container/user/pages/communityBetting/communitybetting.responsive.css";
import "./container/user/pages/cardBetting/usercardbetting.css";
import "./container/admin/pages/communityBetting/admincommunitybetting.css";
import "./container/user/pages/penaltyBetting/penaltybetting.css";
import "./component/user/pages/fiatCurrency/fiatCurrency.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {
//   EthereumClient,
//   w3mConnectors,
//   w3mProvider,
// } from "@web3modal/ethereum";
// import { Web3Modal } from "@web3modal/react";
// import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import {
//   arbitrum,
//   mainnet,
//   polygon,
//   polygonMumbai,
//   bscTestnet,
//   sepolia,
// } from "wagmi/chains";

// responsive

import "./container/user/pages/numberBetting/numberbetting.css";
import "./container/user/pages/userLayout/userlayout.responsive.css";
import "./component/user/defaultLayout/defaultlayout.responsive.css";
import "./container/user/pages/userDashboard/userdashboard.responsive.css";
import "./assets/style/global.responsive.css";
import "./component/user/pages/userdashboard/topweeklyplayer/topweeklyplayer.responsive.css";
import "./container/user/pages/userSetting/usersetting.responsive.css";
import "./container/user/pages/dashboardDetails/dashboard.responsive.css";
import "./container/user/pages/transationHistory/transationhistory.responsive.css";
import "./container/user/pages/userQuery/userquery.responsive.css";
import "./container/admin/pages/profile/profile.responsive.css";
import "./container/user/pages/threeColorbetting/threecolorbetting.responsive.css";
import "./container/user/pages/communityBetting/communitybetting.responsive.css";
import "./container/user/pages/cardBetting/usercardbetting.responsive.css";
import "./container/admin/pages/communityBetting/admincommunitybetting.responsive.css";
import "./container/admin/pages/winnerDeclartion/winnerdeclartiontabs.css";
import "./container/admin/pages/winnerDeclartion/winnerdeclartiontabs.responsive.css";
import "./container/user/pages/numberBetting/numberbetting.responsive.css";
import "./container/user/pages/penaltyBetting/penaltybetting.responsive.css";
import "./container/admin/pages/rolePermission/RolePermission.responsive.css";
import "./container/user/pages/twoColorbetting/twocolorbetting.css";
import "./container/user/pages/twoColorbetting/twocolorbetting.responsive.css";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import "./component/user/pages/userNotificationPanel/UserNotificationPanel.css";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
// import { SocketProvider } from "./SocketContext";
import { useEffect, useState } from "react";
import Index from "./component/Index";

// const chains = [mainnet, polygon, polygonMumbai, bscTestnet, sepolia];
const projectId = "2fa6c12dde1b5cd1a88e4fd4cb690bca";

// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, chains }),
//   publicClient,
// });
// const ethereumClient = new EthereumClient(wagmiConfig, chains);

const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://mainnet.infura.io/v3/2EydPKGqmXcXAKly2TBkdObNCHk",
};

const polygonMumbai = {
  chainId: 80001,
  name: "MumbaiTesnet",
  currency: "MATIC",
  explorerUrl: "https://mumbai.polygonscan.com/",
  rpcUrl: "https://rpc-mumbai.maticvigil.com/",
};

const bscTestnet = {
  chainId: 97,
  name: "BSC TestNet",
  currency: "TBNB",
  explorerUrl: "https://testnet.bscscan.com/",
  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
};

const Sepoliatestnetwork = {
  chainId: 11155111,
  name: "Sepoliatestnetwork",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://sepolia.infura.io/v3/8c79ca71179c4e318999034a96a93f31",
};

// 3. Create modal
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet, polygonMumbai, bscTestnet, Sepoliatestnetwork],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  color: "white",
  p: 4,
  textAlign: "center",
  padding: 30,
};
function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showPopup, setShowPopup] = useState(false);
  console.log(isOnline, 140);
  console.log(showPopup, "popup");
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setShowPopup(true); // Show the popup when offline
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  // {
  //   console.log = () => {};
  //   console.error = () => {};
  //   console.debug = () => {};
  // }
  return (
    <>
      {/* <SocketProvider> */}
      <ToastContainer limit={1} autoClose={1000} />
      <div className="App">
        {/* <WagmiConfig config={wagmiConfig}> */}

        <Routes />

        {/* </WagmiConfig> */}

        {/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
      </div>
      {/* </SocketProvider> */}
      {!isOnline && (
        <Index.Modal
          open={!isOnline}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-comman-details"
        >
          <Index.Box sx={style} className="modal-comman-inner-style">
            <Index.Box>
              <h3 sx={{ color: "white" }}>Connect to the internet</h3>
              {/* <Index.CircularProgress color="Primary" size={20} /> */}
            </Index.Box>
          </Index.Box>
        </Index.Modal>
      )}
    </>
  );
}

export default App;
