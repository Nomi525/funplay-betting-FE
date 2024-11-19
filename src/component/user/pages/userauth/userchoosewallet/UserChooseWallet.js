import React, { useEffect, useState } from "react";
import Index from "../../../../Index";
import PageIndex from "../../../../PageIndex";
import { useWeb3Modal } from "@web3modal/ethers5/react";

import { ethers } from "ethers";
// import { providers } from "ethers";
import { magic } from "./magic";
import { useWeb3 } from "../userchoosewallet/contexts/Web3Context";
import { Api } from "../../../../../config/Api";
import DataService from "../../../../../config/DataService";
import { toast } from "react-toastify";
import {
  userAmount,
  userWalletLogin,
} from "../../../../../redux/user/userReducer";
import { useNavigate } from "react-router-dom";
import SignatureWallet from "./modals/SignatureWallet";
import WalletEmailUpadte from "./modals/WalletEmailUpdate";
import { loginWithWallet, logout } from "../../../../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEthersSigner } from "../../../Connectivity/WalletSignerprovider";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
// import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'

// export function walletClientToSigner(walletClient) {
//   const { account, chain, transport } = walletClient;
//   const network = {
//     chainId: chain.id,
//     name: chain.name,
//     ensAddress: chain.contracts?.ensRegistry?.address,
//   };
//   const provider = new providers.Web3Provider(transport, network);
//   const signer = provider.getSigner(account.address);
//   return signer;
// }

// /** Hook to convert a viem Wallet Client to an ethers.js Signer. */
// export function useEthersSigner({ chainId } = {}) {
//   const { data: walletClient } = useWalletClient({ chainId });
//   return React.useMemo(
//     () => (walletClient ? walletClientToSigner(walletClient) : undefined),
//     [walletClient]
//   );
// }

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserChooseWallet({
  closeMetaMask,
  handleOpenSignIn,
  handleClose,
  openSignatureModal,
  setMagicSignerWallet,
  openMagicSignatureModal,
  setOpenSignatureModal,
  isDepositModal,
  openDepositModal,
  isWithdrawModal,
}) {
  const userData = useSelector((state) => state?.UserReducer);
  const wallet_Address = useSelector((state) => state?.UserReducer?.userData);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { open, close } = useWeb3Modal();
  const signer = useEthersSigner();

  const address = useWeb3ModalAccount();
  console.log(signer, "Signer");
  const [walletAddress, setWalletAddress] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [msg, setMsg] = useState();
  const [messageForMagic, setMessageForMagic] = useState();
  const [accnt, setAccnt] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [signeraccount, setSinger] = useState();
  const [walletaddressmagic, setWalletaddressmagic] = useState("");
  const [signerMagic, setSignerMagic] = useState();
  const [signerWalletDetails, setSignerWalletDetails] = useState(signer);
  const [signerType, setSignerType] = useState(false);
  const [openSignature, setOpenSignature] = useState(false);
  const handleOpenSignature = () => setOpenSignature(true);
  const handleCloseSignature = () => {
    setOpenSignature(false);
    signin();
  };
  const handleCloseSignatureModal = () => {
    setOpenSignature(false);
  };
  const userId = useSelector((state) => state?.UserReducer?.userData?._id);

  const [openEmailUpdate, setOpenEmailUpdate] = useState(false);
  const handleOpenEmailUpdate = () => setOpenEmailUpdate(true);
  const handleCloseEmailUpdate = () => {
    setOpenEmailUpdate(false);
    handleClose();
    setOpenSignatureModal(false);
  };

  // useEffect(() => {
  //   if(signerType && signer){
  //     userWalletLogin();
  //     // getSingerDetails()
  //   }
  // },[signerType, signer])

  const handlesubmitforConnect = async () => {
    try {
      await open();
      closeMetaMask();
    } catch (error) {
      console.log(error);
    }
  };

  const userWalletLogin = async () => {
    let data = {
      walletAddress: address,
      walletType: "web3model",
    };

    const urlencoded = new URLSearchParams();
    urlencoded.append("wallet", JSON.stringify(data));
    if (userData?.userData?.email) {
      urlencoded.append("email", userData?.userData?.email);
    }

    await DataService.post(Api.User.WALLET_SIGNUP_SIGNIN, urlencoded)
      .then((res) => {
        localStorage.setItem("token", res?.data?.data?.token);
        dispatch(userAmount());
        dispatch(loginWithWallet(res?.data.data));
        handleClose();
        toast.success(res?.data?.message, {
          toastId: "customId",
        });
        setOpenSignatureModal(false);
        // if (res?.data?.data?.walletConnected == "No") {
        // handleOpenSignature();
        // navigate('/user/setting')
        // setToken(res?.data?.data?.token)
        // toast.success(res?.data?.message);
        // }
        // handleClose()

        // if(res?.data?.data?.walletConnected == "Yes"){
        //   handleOpenEmailUpdate();
        //   toast.success(res?.data?.message);
        // }
        // navigate('/user/setting')
        // setToken(res?.data?.data?.token)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };

  const userMagicWalletLogin = (address, walletType) => {
    let data = {
      walletAddress: address,
      walletType: walletType,
      // currency:value?.Network,
      // referralByCode:value?.value
    };

    const urlencoded = new URLSearchParams();
    urlencoded.append("wallet", JSON.stringify(data));

    DataService.post(Api.User.WALLET_SIGNUP_SIGNIN, urlencoded)
      .then((res) => {
        handleOpenEmailUpdate();
        // if (res?.data?.data?.walletConnected == "No") {
        //   handleOpenSignature();
        //   // navigate('/user/setting')
        //   // setToken(res?.data?.data?.token)
        toast.success(res?.data?.message, {
          toastId: "customId",
        });
        //   localStorage.setItem("token", res?.data?.data?.token);
        // }
        // handleClose();

        // if(res?.data?.data?.walletConnected == "Yes"){
        //   handleOpenEmailUpdate();
        //   toast.success(res?.data?.message);
        // localStorage.setItem("token",res?.data?.data?.token)
        // }
        // navigate('/user/setting')
        // setToken(res?.data?.data?.token)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };

  useEffect(() => {
    if (openSignatureModal) {
      userWalletLogin();
    }
  }, [openSignatureModal]);

  const signin = async () => {
    if (signer) {
      const walletAddress = address;
      const message = "Welcome to Betting App";
      const signature = await signer.signMessage(message);
      const signAddress = ethers.utils.verifyMessage(message, signature);
      if (signAddress.toLowerCase() === walletAddress.toLowerCase()) {
        setMsg("User Login");
        handleOpenEmailUpdate();

        // setAccnt(accnt[0]);
      } else {
        setMsg("Login failed");
      }
    } else {
      setMsg("MetaMask is not installed");
    }
  };

  const handleConnect = async () => {
    try {
      const wallet1 = await magic.wallet.connectWithUI();

      const address = Array.isArray(wallet1) ? wallet1[0] : wallet1;
      setWalletaddressmagic(address);
      const provider = await magic.wallet.getProvider();

      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer_magic = web3Provider.getSigner(address);

      setSignerMagic(signer_magic);
      setMagicSignerWallet(signer_magic);
      const walletInfo = await magic.user.getInfo();
      const isMagicWallet = walletInfo.walletType === "magic";
      setShowButton(isMagicWallet);

      await magic?.wallet.showUI();
      SigninForMagicWallet(signer_magic, walletInfo);
    } catch (error) {
      console.error("handleConnect:", error);
    }
  };

  const SigninForMagicWallet = async (value, walletInfo) => {
    try {
      if (value) {
        const message = "Welcome to Betting App";
        const signature = await value.signMessage(message);
        const signAddress = ethers.utils.verifyMessage(message, signature);

        if (signAddress.toLowerCase() === walletaddressmagic.toLowerCase()) {
          setMessageForMagic("User Login");

          setAccounts(accounts[0]);
        } else {
          setMessageForMagic("Login failed");
        }
        openMagicSignatureModal
          ? handleClose()
          : userMagicWalletLogin(
              walletInfo.publicAddress,
              walletInfo.walletType
            );
      } else {
        setMessageForMagic("Magic is not installed");
      }
    } catch (error) {}
  };

  return (
    <>
      <Index.Box className="choose-wallet-modal-main">
        {(!isDepositModal || !isWithdrawModal) && (
          <Index.Box className="choose-wallet-details">
            <Index.Typography
              component="h5"
              variant="h5"
              className="choose-main-wallet-title"
            >
              Choose Wallet
            </Index.Typography>
          </Index.Box>
        )}
        <Index.Box className="wallet-btn-details">
          <Index.Box className="btn-wallet-main">
            {/* <Index.Button
              className="btn btn-wallet-content"
              variant="contained"
              onClick={handlesubmitforConnect}
            >
              <Index.Box className="wallet-flex-content">
                <img
                  src={PageIndex.Svg.walletone}
                  className="wallet-main-content"
                />
                <Index.Box className="wallet-title-details">
                  <Index.Typography
                    component="h6"
                    variant="h6"
                    className="metamask-title-wallet"
                  >
                    {" "}
                    Web3 Modal
                  </Index.Typography>
                  <Index.Typography
                    component="p"
                    variant="p"
                    className="metamask-details-wallet"
                  >
                    Connect to your wallet
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Button> */}
          </Index.Box>
          {/* <Index.Box className="btn-wallet-main">
            <Index.Button
              className="btn btn-wallet-content"
              variant="contained"
              onClick={() => signin()}
            >
              <Index.Box className="wallet-flex-content">
                <img src={PageIndex.Svg.wallettwo} className='wallet-main-content' />

                <Index.Box className="wallet-title-details">
                  <Index.Typography component='h6' variant='h6' className="metamask-title-wallet">Login</Index.Typography>
                  <Index.Typography component='p' variant='p' className="metamask-details-wallet">Connect to your Login</Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Button>
          </Index.Box> */}
          {/* <Index.Box className="btn-wallet-main">
            <Index.Button
              variant="contained"
              className="btn btn-wallet-content"
            >
              <Index.Box className="wallet-flex-content">
                <img
                  src={PageIndex.Svg.walletthree}
                  className="wallet-main-content"
                />

                <Index.Box className="wallet-title-details">
                  <Index.Typography
                    component="h6"
                    variant="h6"
                    className="metamask-title-wallet"
                    onClick={() => SigninForMagicWallet(magicSignerWallet)}
                  >
                    Signin For Magic Wallet
                  </Index.Typography>
                  <Index.Typography
                    component="p"
                    variant="p"
                    className="metamask-details-wallet"
                  >
                    Connect to your Magic Wallet
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Button>
          </Index.Box> */}
          {/* <Index.Box className="btn-wallet-main">
            <Index.Button className="btn btn-wallet-content" disableRipple>
              <Index.Box className="wallet-flex-content">
                <img
                  src={PageIndex.Svg.walletthree}
                  className="wallet-main-content"
                />
                <Index.Box className="wallet-title-details">
                  <Index.Typography
                    component="h6"
                    variant="h6"
                    className="metamask-title-wallet"
                    onClick={() => handleConnect()}
                  >
                    Magic
                  </Index.Typography>
                  <Index.Typography
                    component="p"
                    variant="p"
                    className="metamask-details-wallet"
                  >
                    Connect to your Magic
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Button>
          </Index.Box> */}
          {!userId ? (
            <Index.Box className="btn-wallet-main">
              <Index.Button
                className="btn btn-wallet-content"
                onClick={() => {
                  handleOpenSignIn();
                  closeMetaMask();
                }}
                disableRipple
              >
                <Index.Box className="wallet-flex-content">
                  <img
                    src={PageIndex.Svg.walletfour}
                    className="wallet-main-content"
                  />
                  <Index.Box className="wallet-title-details">
                    <Index.Typography
                      component="h6"
                      variant="h6"
                      className="metamask-title-wallet"
                    >
                      Email Address / Phone Number
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="metamask-details-wallet"
                    >
                      Sign in with your Email Address / Phone Number
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Button>
            </Index.Box>
          ) : (
            ""
          )}
        </Index.Box>
        {/* <Index.Box className="btn-wallet-main">
                        <Index.Button className='btn btn-wallet-content' disableRipple>
                            <Index.Box className="wallet-flex-content">
                                <img src={PageIndex.Svg.walletone} className='wallet-main-content' />
                                <Index.Box className="wallet-title-details">
                                    <Index.Typography component='h6' variant='h6' className="metamask-title-wallet" onClick={() => handleConnect()} >MagicWallet</Index.Typography>
                                    <Index.Typography component='p' variant='p' className="metamask-details-wallet">Connect to your fortmatic</Index.Typography>
                                </Index.Box>
                            </Index.Box>
                        </Index.Button>
                    </Index.Box> */}
        {/* <Index.Box className="btn-wallet-main">
                        <Index.Button className='btn btn-wallet-content' disableRipple>
                            <Index.Box className="wallet-flex-content">
                                <img src={PageIndex.Svg.wallettwo} className='wallet-main-content' />
                                <Index.Box className="wallet-title-details">
                                    <Index.Typography component='h6' variant='h6' className="metamask-title-wallet">Wallet Connect</Index.Typography>
                                    <Index.Typography component='p' variant='p' className="metamask-details-wallet">Connect to your wallet connect</Index.Typography>
                                </Index.Box>
                            </Index.Box>
                        </Index.Button>
                    </Index.Box> */}
      </Index.Box>

      {/* Signature modal */}
      <Index.Modal
        open={openSignature}
        onClose={handleCloseSignature}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details"
      >
        <Index.Box sx={style}>
          <SignatureWallet
            handleCloseSignature={handleCloseSignature}
            handleCloseSignatureModal={handleCloseSignatureModal}
          />
        </Index.Box>
      </Index.Modal>

      {/* Wallet Email Update Modal  */}
      <Index.Modal
        open={openEmailUpdate}
        onClose={handleCloseEmailUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details"
      >
        <Index.Box sx={style}>
          <WalletEmailUpadte
            handleCloseEmailUpdate={handleCloseEmailUpdate}
            walletAddress={address && address}
            magicWalletAddress={walletaddressmagic}
            walletType={walletaddressmagic ? "magic" : "web3model"}
          />
        </Index.Box>
      </Index.Modal>
    </>
  );
}
