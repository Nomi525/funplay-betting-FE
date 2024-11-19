import Svg from "../assets/Svg";
import Png from "../assets/Png";
import Jpg from "../assets/jpg";
import Video from "../assets/Video";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import {
  validationSchemaLogin,
  validationSchemaForgotpassword,
  validationSchemaResetPassword,
  validationSchemaChangepassword,
  validationSchemaYearOfSahay,
  validationSchemaUserSetting,
  validationSchemaPrivayPolicy,
  validationSchemaTermsConditions,
  validationSchemaGameRules,
  validationSchemaAddGame,
  validationSchemaCardBetting,
  validationSchemaColorBeatAddGame,
  validationCommunityBetting,
  validationSchemaBanner,
  validationSchemaPayment,
  validationSchemaDepositReqReject,
  validationSchemaDepositReqApproved,
  validationSchemaWithdrwalApproveReq,
  validationSchemaAdminUserTransaction,
  validationPlusTableSchema,
  validationSchemaCurrency,
  profileValidationSchema,
  validationSchemaWithdrawalReqReject,
} from "../validation/Validation";

// Component
import Sidebar from "../component/user/defaultLayout/Sidebar";
import Header from "../component/user/defaultLayout/Header";
import TopWeeklyPlayer from "../component/user/pages/userdashboard/topweeklyplayer/TopWeeklyPlayer";
import BlueButton from "../component/comman/button/BlueButton";
import UserChooseWallet from "../component/user/pages/userauth/userchoosewallet/UserChooseWallet";
import BlueOutlineButton from "../component/comman/button/BlueOutlineButton";
import MyReferral from "./admin/pages/userManagement/MyReferral";
import Footer from "../component/user/defaultLayout/Footer";
import Game from "./admin/pages/userManagement/Game";
import WinnerNumberBettingList from "../component/admin/winnerDeclartionTable/WinnerNumberBettingList";
import WinnerThreeColorBettingList from "../component/admin/winnerDeclartionTable/WinnerThreeColorBettingList";
import WinnerTwoColorBetting from "../component/admin/winnerDeclartionTable/WinnerTwoColorBetting";
import WinnerCommunityBettingList from "../component/admin/winnerDeclartionTable/WinnerCommunityBettingList";
import TransationHistory from "./user/pages/transationHistory/TransationHistory";
import Penaltymens from "../component/icons/Penaltymens";
import PenaltyMenSec from "../component/icons/PenaltyMenSec";
import CountrySelect from "../component/comman/countrySelect/CountrySelect";
import UserChat from "./user/pages/userChat/UserChat";
const PageIndex = {
  Formik,
  Svg,
  Png,
  Jpg,
  CKEditor,
  ClassicEditor,
  Outlet,
  Link,
  useDispatch,
  useNavigate,
  useLocation,
  axios,
  validationSchemaLogin,
  validationSchemaForgotpassword,
  validationSchemaResetPassword,
  validationSchemaChangepassword,
  validationSchemaYearOfSahay,
  validationSchemaUserSetting,
  validationSchemaPrivayPolicy,
  validationSchemaTermsConditions,
  validationSchemaGameRules,
  validationSchemaAddGame,
  validationSchemaCardBetting,
  validationSchemaColorBeatAddGame,
  validationCommunityBetting,
  validationSchemaBanner,
  validationSchemaPayment,
  validationSchemaDepositReqReject,
  validationSchemaDepositReqApproved,
  validationSchemaWithdrwalApproveReq,
  validationSchemaAdminUserTransaction,
  validationPlusTableSchema,
  validationSchemaCurrency,
  useSelector,
  Sidebar,
  Header,
  TopWeeklyPlayer,
  BlueButton,
  UserChooseWallet,
  BlueOutlineButton,
  MyReferral,
  Game,
  Footer,
  profileValidationSchema,
  Video,
  WinnerNumberBettingList,
  WinnerThreeColorBettingList,
  WinnerTwoColorBetting,
  WinnerCommunityBettingList,
  TransationHistory,
  Penaltymens,
  PenaltyMenSec,
  CountrySelect,
  validationSchemaWithdrawalReqReject,
  UserChat,
};

export default PageIndex;
