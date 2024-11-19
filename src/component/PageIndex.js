import Svg from "../assets/Svg";
import Png from "../assets/Png";
import Jpg from "../assets/jpg";

// component
import Sidebar from "./user/defaultLayout/Sidebar";
import Header from "./user/defaultLayout/Header";
import TopWeeklyPlayer from "./user/pages/userdashboard/topweeklyplayer/TopWeeklyPlayer";
import BlueButton from "./comman/button/BlueButton";
import UserChooseWallet from "./user/pages/userauth/userchoosewallet/UserChooseWallet";
import BlueOutlineButton from "./comman/button/BlueOutlineButton";
import SignIn from "../container/user/auth/signin/SignIn";
import Password from "../container/user/auth/password/Password";
import Otp from "../container/user/auth/otp/Otp";
import Footer from "./user/defaultLayout/Footer";
import Withdrawl from "../container/user/auth/withdrawl/Withdrawl";
import ForgotPassword from "../container/user/auth/forgotPassword/ForgotPassword";
import ResetPassword from "../container/user/auth/resetPassword/ResetPassword";
import UserGameErrorModal from "../container/user/pages/userGameErrorModal/UserGameErrorModal";
import { Formik } from "formik";
import { createSearchParams } from "react-router-dom";
import WalletBalanceDropdown from "./comman/walletBalance/WalletBalanceDropdown";
import Penaltymens from "./icons/Penaltymens";
import WithdrawFiatCurrency from "./user/pages/withdrawFiatCurrency/WithdrawFiatCurrency";
import UserNotificationPanel from "./user/pages/userNotificationPanel/UserNotificationPanel";
const PageIndex = {
  Svg,
  Png,
  Jpg,
  Formik,
  // component
  Sidebar,
  Header,
  TopWeeklyPlayer,
  BlueButton,
  UserChooseWallet,
  BlueOutlineButton,
  SignIn,
  Password,
  Otp,
  Footer,
  Withdrawl,
  ForgotPassword,
  ResetPassword,
  createSearchParams,
  UserGameErrorModal,
  WalletBalanceDropdown,
  Penaltymens,
  WithdrawFiatCurrency,
  UserNotificationPanel,
};

export default PageIndex;
