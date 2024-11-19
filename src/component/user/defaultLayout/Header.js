import React, { useState, useEffect, useMemo } from "react";
import Index from "../../Index";
import PageIndex from "../../PageIndex";
import PagesIndex from "../../PageIndex";
import { styled, alpha } from "@mui/material/styles";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import DataService from "../../../config/DataService";
import { Api } from "../../../config/Api";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  dashboardAmount,
  loginWithWallet,
  logout,
  resetDashboardAmount,
} from "../../../redux/user/userSlice";
import {
  getTotalCoins,
  userAmount,
  userAmountNew,
  userProfile,
} from "../../../redux/user/userReducer";
import Loader from "../../comman/loader/Loader";
import {
  useDisconnect,
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";

import {
  DepositAndWithdrawObj,
  USDTObj,
  BNBBettingObje,
  BUSDTObj,
  ETHBettingObj,
  EUSDTObj,
} from "../../../component/user/Connectivity/ContractObject";
import { useEthersSigner } from "../../../component/user/Connectivity/WalletSignerprovider";
import { ethers } from "ethers";
import { Formik } from "formik";

import {
  MaticBetting,
  BNBBetting,
  ETHBetting,
} from "../../../component/user/Connectivity/AddressHelper";
import { userDepositSchema } from "../../../validation/Validation";
import axios from "axios";
import FiatCurrency from "../pages/fiatCurrency/FiatCurrency";
import UserChat from "../../../container/user/pages/userChat/UserChat";
import UserNotificationPanel from "../pages/userNotificationPanel/UserNotificationPanel";

const StyledMenu = styled((props) => (
  <Index.Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 3,
    // marginTop: theme.spacing(1),
    minWidth: 258,
    paddingTop: 30,
    paddingBottom: 0,
    paddingLeft: 23,
    marginTop: 38,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow: "0px 3px 6px #00000029",
    "& .MuiMenu-list": {
      padding: "0px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

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

export default function Header(props) {
  const [openBalances, setOpenBalances] = useState(false);
  const handleOpenBalances = () => setOpenBalances(true);
  const handleCloseBalances = () => setOpenBalances(false);

  const [openCoins, setOpenCoins] = useState(false);
  const handleOpenCoins = () => setOpenCoins(true);
  const handleCloseCoins = () => setOpenCoins(false);

  const userDetail = useSelector((state) => state?.UserReducer?.userData);
  const userToken = useSelector((state) => state?.UserReducer?.token);

  console.log({ userDetail });
  const {
    handleOpen,
    handleClose,
    openMenu,
    setOpenMenu,
    open,
    openWithdraw,
    setOpenWithdraw,
    gameRules,
    setGameRules,
    userGameId,
    setUserGameId,
    date,
    setDate,
    handleOpenGameRules,
    handleCloseGameRules,
    openModal,
    setOpenModal,
    walletAddress,
    setWalletAddress,
    openDeposit,
    setOpenDeposit,
    openChatDrawer,
    setOpenChatDrawer,
  } = props;

  // const isconnect = useEthersSigner();
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const [openDeposit, setOpenDeposit] = useState(
  //   location?.pathname == "/user/deposit" ? true : false
  // );
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [currency, setCurrency] = useState();
  const [openPassword, setOpenPassword] = useState(false);
  const [openSignatureModal, setOpenSignatureModal] = useState(false);
  const [openMagicSignatureModal, setOpenMagicSignatureModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [openSetPassword, setOpenSetPassword] = useState(false);
  const [userId, setUserId] = useState();
  const [signUp, setSignUp] = useState(false);
  const [forgot, setforgot] = useState("");
  const [referCode, setReferCode] = useState(location.search.split("=")[1]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [show, setShow] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [signOut, setSignOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [magicSignerWallet, setMagicSignerWallet] = useState({});
  const [processType, setProcessType] = useState("");
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDetails, setUserDetails] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const { address, isConnected } = useWeb3ModalAccount();
  console.log(address, "isConnected", "address", isConnected);
  const [exchangeRate, setExchangeRate] = useState("");
  const [depositType, setDepositType] = useState("Wallet");
  const [withdrawType, setWithdrawType] = useState("Crypto");
  const [openNotificationPanel, setOpenNotificationPanel] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(false);
  setWalletAddress(address);
  const { disconnect } = useDisconnect();
  const [delateUser, setDelateUSer] = useState([]);
  let refferalCode = useSearchParams()[0].get("referralCode");
  // const [totalCoins, setTotalCoins] = useState(0)
  const totalCoins = useSelector((state) => state?.UserReducer?.totalCoins);
  const userData = useSelector((state) => state?.UserReducer?.userData);
  console.log({ userData }, " :191");
  const [balance, setBalance] = useState(0);
  const signer = useEthersSigner();

  const { walletProvider } = useWeb3ModalProvider();
  const handleOpenSetPassword = () => setOpenSetPassword(true);
  const handleCloseSetPassword = () => setOpenSetPassword(false);
  const handleNotificationPanel = () => {
    setShowNotificationBadge(false);
    setOpenNotificationPanel(!openNotificationPanel);
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setDate("");
  };

  const handleOpenForgotPassword = () => setForgotPassword(true);
  const handleCloseForgotPassword = () => setForgotPassword(false);

  const handleOpenResetPassword = () => setResetPassword(true);
  const handleCloseResetPassword = () => setResetPassword(false);

  const handleOpenOtp = () => setOpenOtp(true);
  const handleCloseOtp = () => setOpenOtp(false);

  const handleOpenPassword = () => setOpenPassword(true);
  const handleClosePassword = () => setOpenPassword(false);

  const handleOpenDeposit = () => {
    setOpenDeposit(true);
    // navigate("/user/deposit");
  };

  const handleCloseDeposit = () => {
    setDepositType("Wallet");
    setOpenDeposit(false);
    // navigate("/user");
  };

  const handleOpenSignIn = () => {
    setOpenSignIn(true);
    setReferCode("");
  };

  const handleCloseSignIn = () => setOpenSignIn(false);
  const openProfile = Boolean(anchorEl);
  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleProcess = (value) => {
    console.log("239:");
    setProcessType(value);
  };

  const handleCloseSignup = () => {
    handleCloseSignIn();
    setLogin(false);
    setShow(false);
  };

  const handleOpenWithdraw = () => {
    setOpenWithdraw(true);
    navigate("/user/withdraw");
  };

  const handleCloseWithdraw = () => {
    setWithdrawType("Crypto");
    setOpenWithdraw(false);
  };

  const userAmounts = useSelector((state) => state?.UserReducer?.userAmounts);
  const userActive = useSelector(
    (state) => state?.UserReducer?.userData?.isActive
  );
  const Address = address
    ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
    : null;

  // console.log(userAmounts, "userAmounts>>>>>");
  // useEffect(() => {
  //   setOpenWithdraw(openWithdrawModal);
  // }, [openWithdrawModal]);

  // useEffect(() => {
  //   if (account) {
  //     setWalletAddress(account.address);
  //     setsigneraccount(signer);
  //   }
  // }, [account]);

  useEffect(() => {
    axios
      .get(Api.User.GET_CURRENT_EXCHANGE_RATE)
      .then((res) => {
        setExchangeRate(res?.data?.data?.rates?.USD);
        console.log(res?.data?.data?.rates, "ussd");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getBalance = async () => {
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);

    const balanceWei = await ethersProvider.getBalance(address);
    const balanceEther = ethers.utils.formatEther(balanceWei);

    return balanceEther;
  };

  useEffect(() => {
    if (walletProvider) {
      getBalance().then((data) => {
        setBalance(data);
      });
    }
  }, [walletProvider]);

  console.log({ balance }, "balance");
  console.log({ exchangeRate }, "exchangeRate");
  const walletBalanceToUSD = balance * exchangeRate;

  let initialValues = {
    Network: "",
    value: "",
  };

  let networkArr = [
    {
      chain_id: 0,
      network_type: "Bitcoin",
    },
    {
      chain_id: 97,
      network_type: "BNB",
    },
    {
      chain_id: 80001,
      network_type: "Polygon",
    },
    {
      chain_id: 11155111,
      network_type: "Ethereum",
    },
    // {
    //   chain_id: 80001,
    //   network_type: "USDT(Polygon)",
    // },
    // {
    //   chain_id: 97,
    //   network_type: "BUSD",
    // },
    // {
    //   chain_id: 11155111,
    //   network_type: "USDT(Ethereum)",
    // },
  ];

  //user total amount call API
  const userTotalAmountData = () => {
    dispatch(resetDashboardAmount());
    dispatch(userAmount())
      .then((res) => {
        if (res) {
          dispatch(dashboardAmount(res?.payload));
        }
      })
      .catch((error) => {});
    dispatch(userAmountNew())
      .then((res) => {
        if (res) {
          dispatch(dashboardAmount(res?.payload));
        }
      })
      .catch((error) => {});

    dispatch(getTotalCoins());
  };

  // user transation call API
  const userTransation = (value, selectedNetwork) => {
    let data = {
      networkChainId: value?.Network?.chain_id,
      tokenName:
        selectedNetwork?.network_type === "USDT(Ethereum)" ||
        selectedNetwork?.network_type === "USDT(Polygon)"
          ? "Tether"
          : selectedNetwork?.network_type,
      tokenAmount: +value?.value,
      walletAddress: address,
      tetherType:
        selectedNetwork?.network_type === "USDT(Ethereum)"
          ? "EthereumUSDT"
          : selectedNetwork?.network_type === "USDT(Polygon)"
          ? "PolygonUSDT"
          : selectedNetwork?.network_type,
      // networkChainId:value?.Network,
      // tokenAmount:value?.value
    };

    DataService.post(Api.User.ADD_TRANSATION_HISTORY, data)
      .then((res) => {
        toast.success(res?.data?.message, {
          toastId: "customId",
        });
        userTotalAmountData();
        navigate("/user");
      })
      .then((err) => {
        toast.error(err?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };

  // user deactive call API
  const handleDeactiveUser = () => {
    DataService.post(Api.User.DELETE_USER)
      .then((res) => {
        // setDelateUSer(res?.data)
        toast.success(res?.data?.message, {
          toastId: "customId",
        });
        handleSignOutUser();
        // dispatch(logout());
        // setSignOut(false);
        // navigate("/user")
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };

  localStorage.setItem("walletAddress", address);

  const checkwallet = async () => {
    const urlencoded = new URLSearchParams();
    console.log("typeof address ", typeof address);
    urlencoded.append(
      "walletAddress",
      Object.keys(magicSignerWallet).length > 0
        ? magicSignerWallet?._address
        : address
    );
    if (userData?.email) {
      urlencoded.append("email", userData?.email);
    }
    if (userData?.mobileNumber) {
      urlencoded.append("mobileNumber", userData?.mobileNumber);
    }
    await DataService.post(Api.User.CHECK_WALLET, urlencoded)
      .then((res) => {
        localStorage.setItem("token", res?.data?.data?.token);
        userTotalAmountData();
        dispatch(loginWithWallet(res?.data?.data));
        res?.data?.data?.wallet?.map((item) => {
          if (item?.walletAddress == address && item?.isConnected !== "true") {
            setOpenSignatureModal(false);
          } else {
            setOpenSignatureModal(false);
            setIsUserConnected(true);
          }
          if (
            item?.walletAddress == magicSignerWallet?._address &&
            item?.isConnected !== "true"
          ) {
            setOpenMagicSignatureModal(false);
          } else {
            setIsUserConnected(true);
            setOpenMagicSignatureModal(true);
          }
        });
      })
      .catch((error) => {
        if (Object.keys(magicSignerWallet).length > 0) {
          setOpenMagicSignatureModal(true);
        } else {
          setOpenSignatureModal(true);
        }

        // handleOpen();
      });
  };

  // user transation call metamask function
  const handleTransation = async (value) => {
    const selectedNetwork = networkArr?.find(
      (ele) => ele?.chain_id == value?.Network
    );

    navigate(
      `/user/deposit?network=${selectedNetwork?.network_type}&chainId=${selectedNetwork?.chain_id}&userId=${userDetail?._id}&amount=${value.value}&code=${userToken}`
    );

    try {
      const depositobj = await DepositAndWithdrawObj(
        Object.keys(magicSignerWallet).length > 0 ? magicSignerWallet : signer
      );
      const usdtobj = await USDTObj(
        Object.keys(magicSignerWallet).length > 0 ? magicSignerWallet : signer
      );
      const bnbobj = await BNBBettingObje(
        Object.keys(magicSignerWallet).length > 0 ? magicSignerWallet : signer
      );
      const busdtobj = await BUSDTObj(
        Object.keys(magicSignerWallet).length > 0 ? magicSignerWallet : signer
      );
      const ethbettingobj = await ETHBettingObj(
        Object.keys(magicSignerWallet).length > 0 ? magicSignerWallet : signer
      );
      const eusdt = await EUSDTObj(
        Object.keys(magicSignerWallet).length > 0 ? magicSignerWallet : signer
      );
      const priceInWei = ethers.utils.parseEther(value.value).toString();
      let maticDeposit;
      let usdtapprove;
      let deposit1;
      let bnbDeposit;
      let busdtApprove;
      let bnbusdtDeposit;
      let ethDeposit;
      let eusdtApprove;
      let eusdtDeposit;
      if (selectedNetwork.network_type === "Polygon") {
        maticDeposit = await depositobj.Deposit(0, priceInWei, {
          value: priceInWei,
        });
        userTransation(value, selectedNetwork);

        handleCloseDeposit();
      } else if (selectedNetwork.network_type === "USDT(Polygon)") {
        usdtapprove = await usdtobj.approve(MaticBetting, priceInWei);
        await usdtapprove.wait();
        deposit1 = await depositobj.Deposit(1, priceInWei);
        userTransation(value, selectedNetwork);
        handleCloseDeposit();
        userTotalAmountData();
      } else if (selectedNetwork.network_type === "BNB") {
        bnbDeposit = await bnbobj.Deposit(0, priceInWei, { value: priceInWei });
        userTransation(value, selectedNetwork);
        handleCloseDeposit();
        userTotalAmountData();
      } else if (selectedNetwork.network_type === "BUSD") {
        busdtApprove = await busdtobj.approve(BNBBetting, priceInWei);
        await busdtApprove.wait();
        bnbusdtDeposit = await bnbobj.Deposit(1, priceInWei);
        userTransation(value, selectedNetwork);
        handleCloseDeposit();
        userTotalAmountData();
      } else if (selectedNetwork.network_type === "Ethereum") {
        ethDeposit = await ethbettingobj.Deposit(0, priceInWei, {
          value: priceInWei,
        });
        userTransation(value, selectedNetwork);
        handleCloseDeposit();
        userTotalAmountData();
      } else if (selectedNetwork.network_type === "USDT(Ethereum)") {
        eusdtApprove = await eusdt.approve(ETHBetting, priceInWei);
        await eusdtApprove.wait();
        eusdtDeposit = await ethbettingobj.Deposit(1, priceInWei);
        userTransation(value, selectedNetwork);
        handleCloseDeposit();
        userTotalAmountData();
      } else if (selectedNetwork.network_type === "Bitcoin") {
        // eusdtApprove = await eusdt.approve(ETHBetting, priceInWei);
        // await eusdtApprove.wait();
        // eusdtDeposit = await ethbettingobj.Deposit(1, priceInWei);
        // depositData(value, selectedNetwork);
        // handleCloseDeposit();
        // userAmountDeposit();
      } else {
        alert("please Select network first");
      }
    } catch (error) {
      const err = error?.error?.message.split(":");

      if (error?.data?.message) {
        toast.error("Insufficient Balance", {
          toastId: "customId",
        });
      } else {
        const match = error.message.match(/message":"([^"]*)"/);
        const extractedMessage = match
          ? match[1]
          : "My transaction has been canceled";
        toast.error(err[err?.length - 2], {
          // toast.error(extractedMessage, {
          toastId: "customId",
        });
        handleCloseDeposit();
      }
    }
  };

  {
    /* user signout function */
  }
  const handleSignOutUser = async (fromEffect = false) => {
    // toast.success("Logged out");
    if (!fromEffect) {
      toast.success("Sign out successfully");
    }
    if (isConnected) {
      await disconnect();
    }
    await localStorage.removeItem("token");
    await dispatch(logout());
    await setIsUserConnected(false);
    await setWalletAddress("");
    await setSignOut(false);
    await setLogin(false);
    await setShow(false);
    await navigate("/user");
  };

  {
    /*handle withdrawal  */
  }
  const handleChangeWithdrawal = () => {
    // if (Address) {
    handleOpenWithdraw();
    navigate("/user/withdraw");
    handleCloseProfile();
    // } else {
    //   toast.error("Please connect wallet", {
    //     toastId: "customId",
    //   });
    // }
  };

  useEffect(() => {
    if (!refferalCode && !userActive) {
      // handleDeactiveUser();
      handleSignOutUser(true);
    }
  }, [userActive]);

  useEffect(() => {
    if (
      Object.keys(magicSignerWallet).length > 0
        ? magicSignerWallet
        : address != undefined
    ) {
      checkwallet();
    }
  }, [address, magicSignerWallet]);

  useEffect(() => {
    if (location.search.split("=")[0] == "?referralCode") {
      setOpenSignIn(true);
      setLogin(true);
      setShow(true);
    }
  }, [location.search]);

  let token = localStorage.getItem("token");

  useEffect(() => {
    if (userToken || token) {
      dispatch(userProfile());
    }
  }, [userToken]);

  useEffect(() => {
    userTotalAmountData();
  }, []);

  useEffect(() => {
    userTotalAmountData();
  }, [token]);

  // deposit from wallet (3 rd party wallet) or from the Fiat currency.
  const handleDepositType = (event, newValue) => {
    console.log({ newValue });
    setDepositType(newValue);
  };
  const handleWithdrawType = (event, newValue) => {
    console.log({ newValue });
    setWithdrawType(newValue);
  };

  useEffect(() => {
    if (location.state?.accountStatus == "deactivated") {
      handleSignOutUser();
    }
  }, [location.state]);

  return (
    <>
      <Index.Box className="main-top-user-header">
        <Index.Box className="bg-user-details">
          <Index.Box className="user-flex-header">
            {/* <Index.Box className="search-main-content">
              <Index.Box className="search-input-content">
                <Index.TextField
                  className=" search-input-control"
                  placeholder="Search games..."
                />
                <img
                  src={PageIndex.Svg.headersearch}
                  className="headersearch"
                  alt="headersearch"
                />
              </Index.Box>
            </Index.Box> */}

            <Index.Box className="burgor-list">
              <Index.Box className="menu-burgur-header">
                <Index.Button
                  className="btn-menu-list"
                  onClick={() => {
                    document.body.classList[!openMenu ? "add" : "remove"](
                      "header-override"
                    );
                    setOpenMenu(!openMenu);
                  }}
                >
                  <img src={PageIndex.Svg.menu} alt="menu" />
                </Index.Button>
              </Index.Box>
            </Index.Box>

            <Index.Box className="header-right-top-content">
              {/* wallet Balnce dropdown start */}
              {/* <PageIndex.WalletBalanceDropdown /> */}
              {/*   wallet Balnce dropdown end  */}
              <Index.Box className="wallet-num-list comman-header-mrl">
                <Index.Box className="wallet-bg-main">
                  {token ? (
                    <>
                      <Index.Box className="wallet-pd-content">
                        <img
                          src={PageIndex.Png.dollar}
                          className="wallet-main"
                          alt="wallet"
                        />
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="wallet-number remove-pointer"
                        >
                          {totalCoins?.totalCoin
                            ? Number(totalCoins?.totalCoin)?.toFixed(2)
                            : 0}
                        </Index.Typography>

                        {/* <Index.Button
                        className="btn-plus-circle-file"
                        onClick={() => Address ? handleOpenDeposit() : toast.error("Please connect wallet", {
                          toastId: "customId"
                        })}
                        >
                          <img
                            src={PageIndex.Svg.pluscirclefill}
                            className="pluscirclefill-main"
                            alt="pluscirclefill"
                          />
                        </Index.Button> */}
                      </Index.Box>
                    </>
                  ) : (
                    ""
                  )}
                </Index.Box>
              </Index.Box>
              <Index.Box className="wallet-num-list comman-header-mrl balance-amount-header">
                <Index.Box className="wallet-bg-main balance-amount-details">
                  {token ? (
                    <>
                      <Index.Box className="wallet-pd-content">
                        <img
                          src={PageIndex.Svg.balancewallet}
                          className="wallet-main"
                          alt="wallet"
                        />
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="wallet-number remove-pointer"
                        >
                          {totalCoins?.coinDollarValue
                            ? Number(totalCoins?.coinDollarValue)?.toFixed(2)
                            : 0}
                        </Index.Typography>
                      </Index.Box>
                    </>
                  ) : (
                    ""
                  )}
                </Index.Box>
              </Index.Box>
              {token ? (
                <Index.Box className="connect-wallet-btn-main comman-header-mrl header-rounded-outline">
                  <PagesIndex.BlueButton
                    btnLabel="Deposit"
                    className="connect-btn-main"
                    onClick={
                      () =>
                        // Address ?
                        handleOpenDeposit()
                      // : toast.error("Please connect wallet", {
                      //     toastId: "customId",
                      //   })
                    }
                  />
                </Index.Box>
              ) : (
                ""
              )}

              {/* <Index.Box className="connect-wallet-btn-main comman-header-mrl">
                <Index.Button
                  className={`connect-btn-main connect-btn-main-cursor ${
                    isConnected ? "remove-pointer" : ""
                  }`}
                  onClick={() => {
                    if (!Address || Object.keys(magicSignerWallet).length > 0) {
                      // handleOpen();
                      setLogin(false);
                      setShow(false);
                      setEmail("");
                    }
                  }}
                >
                  {isConnected
                    ? `$ ${walletBalanceToUSD.toFixed(2)}`
                    : Object.keys(magicSignerWallet).length > 0
                    ? `${magicSignerWallet?._address?.slice(
                        0,
                        6
                      )}...${magicSignerWallet?._address?.slice(-4)}`
                    : "SignUp/SignIn"}
                </Index.Button>
              </Index.Box> */}

              <Index.Box className="connect-wallet-btn-main comman-header-mrl">
                <Index.Button
                  className={`connect-btn-main connect-btn-main-cursor ${
                    isConnected ? "remove-pointer" : ""
                  }`}
                  onClick={() => {
                    // console.log({ Address }, "Address");
                    // console.log({ magicSignerWallet }, "magicSignerWallet");
                    // console.log(userDetail, "userDetail786");
                    // console.log(userDetail.length, "length");
                    if (
                      !Address ||
                      (typeof magicSignerWallet === 'object' && Object.keys(magicSignerWallet).length > 0)

                    ) {
                      if (
                        userDetail &&
                        Object.keys(userDetail).length > 0
                      ) {
                        handleOpen();
                        console.log(true, "true");
                      } else {
                        // handlesubmitforConnect()
                        handleOpenSignIn();
                        console.log(false, "false");
                      }
                      // handleOpenSignIn();
                      //  closeMetaMask();
                      // handleOpen();
                      setLogin(false);
                      setShow(false);
                      setEmail("");
                    }
                  }}
                >
                  {" "}
                  {console.log(userDetail, "userDetail123")}
                  {console.log(walletBalanceToUSD, "walletBalanceToUSD")}
                  {console.log(magicSignerWallet, "magicSignerWallet")}
                  {isConnected
                    ? `$ ${walletBalanceToUSD.toFixed(2)}`
                    : magicSignerWallet && Object.keys(magicSignerWallet).length > 0
                    ? `${magicSignerWallet?._address?.slice(
                        0,
                        6
                      )}...${magicSignerWallet?._address?.slice(-4)}`
                    : userDetail && Object.keys(userDetail).length === 0
                    ? "Login"
                    : "Connect Wallet"}
                </Index.Button>
              </Index.Box>
              {token ? (
                <>
                  {/* <Index.Box className="notification-main-content comman-header-mrl mobile-btn-hidden">
                    <Index.Badge variant="dot" color="info" invisible={false}>
                    <Index.Button className="notification-btn">
                      <img
                        src={PageIndex.Svg.notifcations}
                        className="bell-img-content"
                        alt="notifcations"
                      />
                    </Index.Button>
                    </Index.Badge>
                  </Index.Box> */}

                  <Index.Box
                    className="notification"
                    onClick={() => handleNotificationPanel()}
                  >
                    <Index.Badge
                      variant="dot"
                      color="error"
                      invisible={!showNotificationBadge}
                    >
                      <Index.NotificationsNoneIcon />
                    </Index.Badge>
                  </Index.Box>
                  <UserNotificationPanel
                    open={openNotificationPanel}
                    handleNotificationPanel={handleNotificationPanel}
                    setShowNotificationBadge={setShowNotificationBadge}
                  />

                  <Index.Box className="user-header-profile ">
                    <Index.Button
                      className="drop-header-btn"
                      id="basic-button"
                      aria-controls={openProfile ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openProfile ? "true" : undefined}
                      onClick={handleClickProfile}
                      disableRipple
                    >
                      <Index.Box className="flex-drop-main">
                        <img
                          src={
                            userDetail?.profile
                              ? process.env.REACT_APP_IMG + userDetail?.profile
                              : PagesIndex.Png.user
                          }
                          className="admin-header-profile-icon"
                          alt="bell"
                        ></img>

                        {/* <Index.Box className="title-admin-drop">
                      <Index.Typography variant="h5" component="h5" className='admin-header-drop'>Admin</Index.Typography>
                  </Index.Box> */}
                      </Index.Box>
                    </Index.Button>
                    {token || Address ? (
                      <Index.Menu
                        className="drop-header-menu header-user-dropdown-menu"
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openProfile}
                        onClose={handleCloseProfile}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <Index.MenuItem
                          onClick={handleOpenCoins}
                          className="drop-header-menuitem desktop-mobile-hideshow"
                        >
                          <img
                            src={PageIndex.Png.dollar}
                            className="header-profile-icon"
                          ></img>
                          <Link className="menu-link-details"> Coin</Link>
                        </Index.MenuItem>
                        <Index.MenuItem
                          onClick={handleOpenBalances}
                          className="drop-header-menuitem desktop-mobile-hideshow"
                        >
                          <img
                            src={PageIndex.Svg.balancewallet}
                            className="header-profile-icon"
                          ></img>
                          <Link className="menu-link-details"> Balance</Link>
                        </Index.MenuItem>
                        <Index.MenuItem
                          // onClick={() => Address ?  handleOpenWithdraw() : toast.error("Please connect wallet")}
                          className="drop-header-menuitem"
                          setOpenWithdraw={setOpenWithdraw}
                          onClick={handleChangeWithdrawal}
                        >
                          <img
                            src={PageIndex.Svg.atm}
                            className="header-profile-icon"
                          ></img>
                          <Link className="menu-link-details">Withdrawal</Link>
                        </Index.MenuItem>

                        {/* <Index.MenuItem
                          onClick={() => {
                            handleCloseProfile();
                            handleDeactiveUser();
                          }}
                          className="drop-header-menuitem"
                        >
                          <img
                            src={PageIndex.Svg.deactivate}
                            className="header-profile-icon"
                          ></img>
                          <Link className="menu-link-details">
                            {" "}
                            Deactivate Account
                          </Link>
                        </Index.MenuItem> */}
                        <Index.MenuItem
                          onClick={() => {
                            handleCloseProfile();
                            navigate("/user/setting ", {
                              state: {
                                userName: userName,
                              },
                            });
                          }}
                          className="drop-header-menuitem"
                        >
                          <img
                            src={PageIndex.Svg.mechanicalgears}
                            className="header-profile-icon"
                          ></img>
                          <Link
                            className="menu-link-details"
                            // to={"/user/setting"}
                          >
                            Account setting
                          </Link>
                        </Index.MenuItem>

                        <Index.MenuItem
                          onClick={() => {
                            handleCloseProfile();
                            handleSignOutUser();
                          }}
                          className="drop-header-menuitem"
                        >
                          <img
                            src={PageIndex.Svg.exitheader}
                            className="header-profile-icon"
                          ></img>

                          <Link className="menu-link-details"> Sign Out</Link>
                        </Index.MenuItem>
                      </Index.Menu>
                    ) : (
                      ""
                    )}

                    <p className="profile_fullName">
                      {userDetail?.fullName ? userDetail?.fullName : ""}
                    </p>
                  </Index.Box>
                  {/* <Index.Box className="chat-betting-main">
                    <Index.Button
                      className="chat-betting show"
                      onClick={() => {
                        document.body.classList[openChatDrawer ? "add" : "remove"](
                          "chat-override"
                        );
                        setOpenChatDrawer(!openChatDrawer);
                      }}
                    >
                      <img
                        src={PageIndex.Svg.chat}
                        className="chat-icon"
                        alt="chat"
                      />
                    </Index.Button>
                  </Index.Box> */}
                </>
              ) : (
                ""
              )}
              {/* {location.pathname !== "/user/community-betting" &&
                location.pathname !== "/user/number-betting" && (
                  <Index.Box className="chat-betting-main">
                    <Index.Button
                      className="chat-betting show"
                      onClick={() => setOpenChatDrawer(!openChatDrawer)}
                    >
                      <img
                        src={PageIndex.Svg.chat}
                        className="chat-icon"
                        alt="chat"
                      />
                    </Index.Button>
                  </Index.Box>
                )} */}
              {/* <UserChat
                open={openChat}
                handleOpenSignIn={handleOpenSignIn}
                handleOpenChat={handleOpenChat}
              /> */}
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
      {/* metamast  modal start */}
      {/* Withdraw  Modal*/}
      <Index.Modal
        open={openWithdraw}
        onClose={() => {
          handleCloseWithdraw();
          navigate("/user");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details"
      >
        <Index.Box sx={style} className="modal-comman-inner-style">
          <Index.Box className="modal-cancel-btn">
            <Index.Button
              className="btn btn-cancel"
              onClick={() => {
                handleCloseWithdraw();
                navigate("/user");
              }}
            >
              <img
                src={PagesIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
              />
            </Index.Button>
          </Index.Box>
          <Index.Box className="signin-content-details">
            <Index.Typography
              className="user-auth-title-comman"
              variant="h6"
              component="h6"
            >
              Withdrawal
            </Index.Typography>
          </Index.Box>
          <Index.Box className="choose-wallet-component">
            <Index.TabContext value={withdrawType}>
              <Index.Box pb={"15px"}>
                <Index.Tabs
                  onChange={handleWithdrawType}
                  aria-label="lab API tabs example"
                  value={withdrawType}
                >
                  <Index.Tab
                    label="Crypto"
                    value="Crypto"
                    className="deposit-tab-border"
                    sx={{ width: "50%", color: "#fff" }}
                  />
                  <Index.Tab
                    label="Fiat currency"
                    value="Fiat currency"
                    className="deposit-tab-border"
                    sx={{ width: "50%", color: "#fff" }}
                  />
                </Index.Tabs>
              </Index.Box>
              <Index.TabPanel value="Crypto" sx={{ padding: 0 }}>
                {isConnected ? (
                  <PagesIndex.Withdrawl
                    handleCloseWithdraw={handleCloseWithdraw}
                    openWithdraw={openWithdraw}
                    totalAmount={userAmounts}
                    setOpenWithdraw={setOpenWithdraw}
                    setTotalAmount={setTotalAmount}
                    userTotalAmountData={userTotalAmountData}
                  />
                ) : (
                  <Index.Box className="choose-wallet-component">
                    <PagesIndex.UserChooseWallet
                      closeMetaMask={() => {
                        setOpenWithdraw(false);
                      }}
                      handleOpenSignIn={handleOpenSignIn}
                      handleClose={() => {
                        handleCloseWithdraw();
                      }}
                      openSignatureModal={openSignatureModal}
                      setMagicSignerWallet={setMagicSignerWallet}
                      openMagicSignatureModal={openMagicSignatureModal}
                      setOpenSignatureModal={setOpenSignatureModal}
                      isWithdrawModal={false}
                      openDepositModal={() => {
                        setOpenWithdraw(true);
                      }}
                    />
                  </Index.Box>
                )}
              </Index.TabPanel>
              <Index.TabPanel value="Fiat currency" sx={{ padding: 0 }}>
                <PageIndex.WithdrawFiatCurrency
                  openWithdraw={openWithdraw}
                  handleCloseWithdraw={handleCloseWithdraw}
                />
              </Index.TabPanel>
            </Index.TabContext>
          </Index.Box>
        </Index.Box>
      </Index.Modal>
      {/* choose wallet modal */}
      <Index.Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details"
      >
        <Index.Box sx={style} className="modal-comman-inner-style">
          <Index.Box className="modal-cancel-btn">
            <Index.Button className="btn btn-cancel">
              <img
                src={PagesIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
                onClick={handleClose}
              />
            </Index.Button>
          </Index.Box>
          <Index.Box className="choose-wallet-component">
            <PagesIndex.UserChooseWallet
              closeMetaMask={handleClose}
              handleOpenSignIn={handleOpenSignIn}
              handleClose={handleClose}
              openSignatureModal={openSignatureModal}
              setMagicSignerWallet={setMagicSignerWallet}
              openMagicSignatureModal={openMagicSignatureModal}
              setOpenSignatureModal={setOpenSignatureModal}
              isDepositModal={false}
            />
          </Index.Box>
        </Index.Box>
      </Index.Modal>
      {/* metamast  modal end */}
      {/*set password modal */}
      <Index.Modal
        open={openSetPassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details deposit-modal-main"
      >
        {/* <Index.Box sx={style} className="modal-comman-inner-style deposit-modal-inner">
  <Index.Box className="modal-cancel-btn" >
    <Index.Button className="btn btn-cancel" >
      <img src={PagesIndex.Svg.cancelmodal} className='cancel-modal' alt="modal-cancel" />
    </Index.Button>
  </Index.Box>
  <Index.Box className="otp-main-component">
    <Deposit />
  </Index.Box>
</Index.Box> */}

        <Index.Box sx={style} className="modal-comman-inner-style">
          <Index.Box className="modal-cancel-btn">
            <Index.Button className="btn btn-cancel">
              <img
                src={PagesIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
                onClick={() => {
                  handleCloseSetPassword();
                  navigate("/user");
                }}
              />
            </Index.Button>
          </Index.Box>
          <Index.Box className="set-btn-main-list">
            <PagesIndex.BlueOutlineButton
              onClick={() => {
                handleCloseSetPassword();
                setReferCode("");
                navigate("/user/setting", {
                  state: { tab: userDetail?.password ? 2 : 1 },
                });
              }}
              className="outline-blue-btn-content"
              variant="h6"
              component="h6"
              btnLabel="First Set Your Password"
            />
          </Index.Box>
        </Index.Box>
      </Index.Modal>
      {/* handle signin modal */}
      <Index.Modal
        open={openSignIn}
        onClose={handleCloseSignIn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details"
      >
        <Index.Box sx={style} className="modal-comman-inner-style">
          <Index.Box className="modal-cancel-btn">
            <Index.Button className="btn btn-cancel">
              <img
                src={PagesIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
                onClick={handleCloseSignup}
              />
            </Index.Button>
          </Index.Box>
          <Index.Box className="signin-main-component">
            <PagesIndex.SignIn
              setSignUp={setSignUp}
              type={"referral"}
              setEmail={setEmail}
              setPassword={setPassword}
              handleCloseSignIn={handleCloseSignIn}
              referCode={referCode}
              setUserId={setUserId}
              handleOpenOtp={handleOpenOtp}
              handleOpenPassword={handleOpenPassword}
              login={login}
              setLogin={setLogin}
              show={show}
              setShow={setShow}
              setReferCode={setReferCode}
              setWalletAddress={setWalletAddress}
              handleProcess={handleProcess}
              processType={processType}
              handleOpenSetPassword={handleOpenSetPassword}
              email={email}
              setforgot={setforgot}
              setCurrency={setCurrency}
              setUserName={setUserName}
              userName={userName}
            />
          </Index.Box>
        </Index.Box>
      </Index.Modal>
      {/* handle otp modal */}
      <Index.Modal
        open={openOtp}
        onClose={handleCloseOtp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details"
      >
        <Index.Box sx={style} className="modal-comman-inner-style">
          <Index.Box className="modal-cancel-btn">
            <Index.Button className="btn btn-cancel">
              <img
                src={PagesIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
                onClick={() => handleCloseOtp()}
              />
            </Index.Button>
          </Index.Box>
          <Index.Box className="otp-main-component">
            <PagesIndex.Otp
              userId={userId}
              handleCloseOtp={handleCloseOtp}
              handleOpenResetPassword={handleOpenResetPassword}
              forgot={forgot}
              handleOpenSignIn={handleOpenSignIn}
              setLogin={setLogin}
              setShow={setShow}
              handleOpenSetPassword={handleOpenSetPassword}
              setReferCode={setReferCode}
              setSignOut={setSignOut}
              processType={processType}
              login={login}
              setEmail={setEmail}
            />
          </Index.Box>
        </Index.Box>
      </Index.Modal>
      {/* handle password */}
      <Index.Modal
        open={openPassword}
        onClose={() => {
          handleClosePassword();
          handleCloseSignIn();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details"
      >
        <Index.Box sx={style} className="modal-comman-inner-style">
          <Index.Box className="modal-cancel-btn">
            <Index.Button
              className="btn btn-cancel"
              handleOpenPassword={handleOpenPassword}
            >
              <img
                src={PagesIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
                onClick={() => {
                  handleClosePassword();
                  handleCloseSignIn();
                }}
              />
            </Index.Button>
          </Index.Box>
          <Index.Box className="otp-main-component">
            <PagesIndex.Password
              signUp={signUp}
              email={email}
              handleCloseSignIn={handleCloseSignIn}
              handleClosePassword={handleClosePassword}
              handleOpenForgotPassword={handleOpenForgotPassword}
              setLogin={setLogin}
              login={login}
              setShow={setShow}
              setSignOut={setSignOut}
              handleOpenPassword={handleOpenPassword}
              currency={currency}
              userName={userName}
              handleProcess={handleProcess}
              handleOpenSignIn={handleOpenSignIn}
            />
          </Index.Box>
        </Index.Box>
      </Index.Modal>
      {/* deposit modal */}
      <Index.Modal
        open={openDeposit}
        onClose={handleCloseDeposit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details deposit-modal-main"
      >
        {/* <Index.Box sx={style} className="modal-comman-inner-style deposit-modal-inner">
          <Index.Box className="modal-cancel-btn" >
            <Index.Button className="btn btn-cancel" >
              <img src={PagesIndex.Svg.cancelmodal} className='cancel-modal' alt="modal-cancel" />
            </Index.Button>
          </Index.Box>
          <Index.Box className="otp-main-component">
            <Deposit />
          </Index.Box>
        </Index.Box> */}
        <Index.Box
          sx={style}
          className="modal-comman-inner-style deposit-modal-inner"
        >
          <Index.Box className="modal-cancel-btn">
            <Index.Button className="btn btn-cancel">
              <img
                src={PagesIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
                onClick={() => handleCloseDeposit()}
              />
            </Index.Button>
          </Index.Box>
          <Index.Box className="title-deposit-transaction">
            <Index.Typography
              component="h5"
              variant="h5"
              className="inner-title-transaction"
            >
              Deposit
            </Index.Typography>
          </Index.Box>
          <Index.Box sx={{ width: "100%", typography: "body1" }}>
            <Index.TabContext value={depositType}>
              <Index.Box>
                <Index.Tabs
                  onChange={handleDepositType}
                  aria-label="lab API tabs example"
                  value={depositType}
                >
                  <Index.Tab
                    label="Wallet"
                    value="Wallet"
                    className="deposit-tab-border"
                    sx={{ width: "50%", color: "#fff" }}
                  />
                  <Index.Tab
                    label="Fiat currency"
                    value="Fiat currency"
                    className="deposit-tab-border"
                    sx={{ width: "50%", color: "#fff" }}
                  />
                </Index.Tabs>
              </Index.Box>
              <Index.TabPanel value="Wallet" sx={{ padding: 0 }}>
                <Index.Box mt={2}>
                  {/* if wallet not connected it will show connect wallet content  */}
                  {isConnected ? (
                    <Formik
                      enableReinitialize
                      initialValues={initialValues}
                      validationSchema={userDepositSchema}
                      onSubmit={handleTransation}
                    >
                      {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        touched,
                        errors,
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <Index.Box className="deposit-main-content">
                            <Index.Box className="deposit-flex-content">
                              <Index.Box className="deposit-content-qr-content">
                                {/* <Index.Box className="title-deposit-transaction">
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={userDepositSchema}
                  onSubmit={handleTransation}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    touched,
                    errors,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Index.Box className="deposit-main-content">
                        <Index.Box className="deposit-flex-content">
                          <Index.Box className="deposit-content-qr-content">
                            {/* <Index.Box className="title-deposit-transaction">
                              <Index.Typography
                                component="h5"
                                variant="h5"
                                className="inner-title-transaction"
                              >
                                Deposit
                              </Index.Typography>
                            </Index.Box> */}
                                <Index.Box className="box-deposit-details-content">
                                  <Index.Box className="form-group-main deposit-form-content mb-30px-form">
                                    <Index.FormHelperText className="title-label-comman-user">
                                      Network
                                    </Index.FormHelperText>
                                    <Index.Box className="edit_profile_field">
                                      <Index.Box className="form-group from_login_details">
                                        <Index.Box className="dropdown-box">
                                          <Index.FormControl className="form-control">
                                            <Index.Select
                                              displayEmpty
                                              className="dropdown-select "
                                              name="Network"
                                              onBlur={handleBlur}
                                              value={values?.Network}
                                              onChange={handleChange}
                                              defaultValue=""
                                              renderValue={
                                                values?.Network !== ""
                                                  ? undefined
                                                  : () => "Select network"
                                              }
                                            >
                                              {networkArr.map((ele) => {
                                                return (
                                                  <Index.MenuItem
                                                    key={ele?.network_type}
                                                    value={ele.chain_id}
                                                    className="menuitem"
                                                  >
                                                    {ele?.network_type}
                                                  </Index.MenuItem>
                                                );
                                              })}
                                            </Index.Select>
                                          </Index.FormControl>
                                          {errors.Network &&
                                            touched.Network && (
                                              <Index.FormHelperText error>
                                                {errors.Network}
                                              </Index.FormHelperText>
                                            )}
                                        </Index.Box>
                                      </Index.Box>
                                    </Index.Box>
                                  </Index.Box>
                                  <Index.Box className="form-group-main deposit-form-content mb-30px-form">
                                    <Index.FormHelperText className="title-label-comman-user">
                                      Value
                                    </Index.FormHelperText>
                                    <Index.Box className="form-control-details-auth">
                                      <Index.Box className="icon-position-rel">
                                        <Index.TextField
                                          className="form-control custom-auth-user-control "
                                          name="value"
                                          onBlur={handleBlur}
                                          value={values.value}
                                          onChange={(e) => {
                                            !isNaN(e.target.value) &&
                                              handleChange(e);
                                          }}
                                          placeholder="Enter value"
                                        />
                                      </Index.Box>
                                      {errors.value && touched.value && (
                                        <Index.FormHelperText error>
                                          {errors.value}
                                        </Index.FormHelperText>
                                      )}
                                    </Index.Box>
                                  </Index.Box>
                                  <Index.Box className="form-btn-verify-details">
                                    <Index.Box className="betting-card-btn-comman">
                                      <PagesIndex.BlueButton
                                        btnLabel="Verify"
                                        className="blue-btn-content"
                                        type="submit"
                                        // onSubmit={() => {
                                        //   handleTransation(values);
                                        // }}
                                      />
                                    </Index.Box>
                                  </Index.Box>
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </form>
                      )}
                    </Formik>
                  ) : (
                    <Index.Box className="choose-wallet-component">
                      <PagesIndex.UserChooseWallet
                        closeMetaMask={() => {
                          setOpenDeposit(false);
                        }}
                        handleOpenSignIn={handleOpenSignIn}
                        handleClose={() => {
                          setOpenDeposit(false);
                        }}
                        openSignatureModal={openSignatureModal}
                        setMagicSignerWallet={setMagicSignerWallet}
                        openMagicSignatureModal={openMagicSignatureModal}
                        setOpenSignatureModal={setOpenSignatureModal}
                        isDepositModal={true}
                        openDepositModal={() => {
                          setOpenDeposit(true);
                        }}
                      />
                    </Index.Box>
                  )}
                </Index.Box>
              </Index.TabPanel>
              <Index.TabPanel value="Fiat currency" sx={{ padding: 0 }}>
                <FiatCurrency
                  openDeposit={openDeposit}
                  handleCloseDeposit={handleCloseDeposit}
                />
              </Index.TabPanel>
            </Index.TabContext>
          </Index.Box>
        </Index.Box>
      </Index.Modal>
      {/* handle forgotpassword */}
      {forgotPassword && (
        <Index.Modal
          open={forgotPassword}
          onClose={handleCloseForgotPassword}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-comman-details"
        >
          <Index.Box sx={style} className="modal-comman-inner-style">
            <Index.Box className="modal-cancel-btn">
              <Index.Button
                className="btn btn-cancel"
                handleOpenForgotPassword={handleOpenForgotPassword}
              >
                <img
                  src={PagesIndex.Svg.cancelmodal}
                  className="cancel-modal"
                  alt="modal-cancel"
                  onClick={() => handleCloseForgotPassword()}
                />
              </Index.Button>
            </Index.Box>
            <Index.Box className="otp-main-component">
              <PagesIndex.ForgotPassword
                email={email}
                setUserId={setUserId}
                handleCloseForgotPassword={handleCloseForgotPassword}
                handleOpenOtp={handleOpenOtp}
                setforgot={setforgot}
                setEmail={setEmail}
              />
            </Index.Box>
          </Index.Box>
        </Index.Modal>
      )}
      {/* handle resetpassword */}
      {resetPassword && (
        <Index.Modal
          open={resetPassword}
          onClose={handleCloseResetPassword}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-comman-details"
        >
          <Index.Box sx={style} className="modal-comman-inner-style">
            <Index.Box className="modal-cancel-btn">
              <Index.Button
                className="btn btn-cancel"
                handleOpenResetPassword={handleOpenResetPassword}
              >
                <img
                  src={PagesIndex.Svg.cancelmodal}
                  className="cancel-modal"
                  alt="modal-cancel"
                  onClick={() => handleCloseResetPassword()}
                />
              </Index.Button>
            </Index.Box>
            <Index.Box className="otp-main-component">
              <PagesIndex.ResetPassword
                userId={userId}
                handleOpenSignIn={handleOpenSignIn}
                handleCloseForgotPassword={handleCloseForgotPassword}
                handleCloseResetPassword={handleCloseResetPassword}
                handleClosePassword={handleClosePassword}
                setEmail={setEmail}
              />
            </Index.Box>
          </Index.Box>
        </Index.Modal>
      )}

      {/*show date and date available soon modal */}
      <Index.Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details"
      >
        <Index.Box sx={style} className="modal-comman-inner-style">
          <Index.Box className="modal-cancel-btn">
            <Index.Button
              className="btn btn-cancel"
              handleOpenModal={handleOpenModal}
            >
              <img
                src={PagesIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
                onClick={() => {
                  handleCloseModal();
                  setDate("");
                }}
              />
            </Index.Button>
          </Index.Box>
          <Index.Box className="otp-main-component">
            <PagesIndex.UserGameErrorModal
              setOpenModal={setOpenModal}
              date={date}
              openModal={openModal}
              // userGameId={userGameId}
              // handleCloseGameRules={handleCloseGameRules}
            />
          </Index.Box>
        </Index.Box>
      </Index.Modal>

      {/* mobile menu balnce start */}
      <Index.Modal
        open={openBalances}
        onClose={handleCloseBalances}
        aria-labelledby="modal-modal-title"
        className="modal-comman-details"
        aria-describedby="modal-modal-description"
      >
        <Index.Box
          sx={style}
          className="modal-comman-inner-style deposit-modal-inner"
        >
          <Index.Box className="modal-cancel-btn">
            <Index.Button className="btn btn-cancel">
              <img
                src={PagesIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
                onClick={() => handleCloseBalances()}
              />
            </Index.Button>
          </Index.Box>
          <Index.Box className="balance-title-details">
            <Index.Typography
              variant="h6"
              component="h6"
              className="balances-main-content"
            >
              Balance
            </Index.Typography>
          </Index.Box>
          <Index.Box className="balance-mobile-value">
            <Index.Box className="wallet-bg-main">
              <Index.Box className="wallet-pd-content">
                <img
                  src={PageIndex.Svg.wallet}
                  className="wallet-main"
                  alt="wallet"
                />
                <Index.Typography
                  component="p"
                  variant="p"
                  className="wallet-number"
                >
                  {totalCoins?.coinDollarValue
                    ? Number(totalCoins?.coinDollarValue)?.toFixed(2)
                    : 0}
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Modal>
      {/* mobile menu balance end */}
      {/* mobile menu coin start */}
      <Index.Modal
        open={openCoins}
        onClose={handleCloseCoins}
        aria-labelledby="modal-modal-title"
        className="modal-comman-details"
        aria-describedby="modal-modal-description"
      >
        <Index.Box
          sx={style}
          className="modal-comman-inner-style deposit-modal-inner"
        >
          <Index.Box className="modal-cancel-btn">
            <Index.Button className="btn btn-cancel">
              <img
                src={PagesIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
                onClick={() => handleCloseCoins()}
              />
            </Index.Button>
          </Index.Box>
          <Index.Box className="balance-title-details">
            <Index.Typography
              variant="h6"
              component="h6"
              className="balances-main-content"
            >
              Coin
            </Index.Typography>
          </Index.Box>
          <Index.Box className="balance-mobile-value">
            <Index.Box className="wallet-bg-main">
              <Index.Box className="wallet-pd-content">
                <img
                  src={PageIndex.Svg.wallet}
                  className="wallet-main"
                  alt="wallet"
                />
                <Index.Typography
                  component="p"
                  variant="p"
                  className="wallet-number"
                >
                  {totalCoins?.totalCoin
                    ? Number(totalCoins?.totalCoin)?.toFixed(2)
                    : 0}
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Modal>
      {/* mobile menu coin end */}
    </>
  );
}
