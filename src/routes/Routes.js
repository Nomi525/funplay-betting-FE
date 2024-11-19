import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Routess,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Dashboard from "../component/admin/dashbord/Dashbord";
// import { createBrowserHistory } from "history";

//#region user
import Banner from "../container/admin/pages/banner/Banner";
import Setting from "../container/admin/pages/setting/Setting";
import DashboardLayout from "../container/admin/pages/dashboardLayout/DashboardLayout";
import GameManagement from "../container/admin/pages/gameManagement/GameManagement";
import UserLayout from "../container/user/pages/userLayout/UserLayout";
import UserDashboard from "../container/user/pages/userDashboard/UserDashboard";
import UserManagement from "../container/admin/pages/userManagement/UserManagement";
import TermsCondition from "../container/admin/pages/cms/TermsCondition";
import PrivayPolicy from "../container/admin/pages/cms/PrivayPolicy";
import AddGame from "../container/admin/pages/gameManagement/AddGame";
import ViewGame from "../container/admin/pages/userManagement/ViewGame";
import Transaction from "../container/admin/pages/transaction/Transaction";
import WithDrawal from "../container/admin/pages/withdrawal/WithDrawal";
import ViewPage from "../container/admin/pages/gameManagement/ViewPage";
import Login from "../container/admin/auth/login/Login";
import ForgotPassword from "../container/admin/auth/forgotPassword/ForgotPassword";
import ResetPassword from "../container/admin/auth/resetPassword/ResetPassword";
import Otp from "../container/admin/auth/otp/Otp";
import AddBanner from "../container/admin/pages/banner/AddBanner";
import ViewBanner from "../container/admin/pages/banner/ViewBanner";
import UserQuery from "../container/user/pages/userQuery/UserQuery";
import BannerViewPage from "../container/admin/pages/bannerManagement/BannerViewPage";
import BannerEditPage from "../container/admin/pages/bannerManagement/BannerEditPage";
import Profile from "../container/admin/pages/profile/Profile";
import ChangePassword from "../container/admin/auth/changePassword/ChangePassword";
import UserSetting from "../container/user/pages/userSetting/UserSetting";
import TransationHistory from "../container/user/pages/transationHistory/TransationHistory";
import DashboardDetails from "../container/user/pages/dashboardDetails/DashboardDetails";
import AdminPrivateRoute from "./AdminPrivateRoute";
import {
  UserPrivateRoute,
  UserPrivateRouteWalletAddress,
} from "./UserPrivateRoute";
import Query from "../container/admin/pages/query/Query";
import UserTemsCondition from "../container/user/pages/cms/UserTemsCondition";
import UserPrivacyPolice from "../container/user/pages/cms/UserPrivacyPolice";
import UserContactUs from "../container/user/pages/cms/UserContactUs";
import ThreeColorBetting from "../container/user/pages/threeColorbetting/ThreeColorBetting";
import DemoThreeBetting from "../container/user/pages/threeColorbetting/DemoThreeBetting";
import ViewQuery from "../container/admin/pages/query/ViewQuery";
import NumberBetting from "../container/admin/pages/gameRules/NumberBetting";
import Currency from "../container/admin/pages/currency/Currency";
import AddCurrency from "../container/admin/pages/currency/AddCurrency";
import UserNumberBetting from "../container/user/pages/numberBetting/UserNumberBetting";
import PlusTable from "../container/admin/pages/gameManagement/PlusTable";
import Rules from "../container/admin/pages/gameManagement/Rules";
import UserCommunityBetting from "../container/user/pages/communityBetting/UserCommunityBetting";
import CommunityBetting from "../container/admin/pages/communityBetting/CommunityBetting";
import UserCardBetting from "../container/user/pages/cardBetting/UserCardBetting";
import TwoColorBetting from "../container/user/pages/twoColorbetting/TwoColorBetting";
import ThreeColorGameRules from "../container/user/pages/threeColorbetting/ThreeColorGameRules";
import TwoColorGameRules from "../container/user/pages/twoColorbetting/TwoColorGameRules";
import NumberBettingGameRules from "../container/user/pages/numberBetting/NumberBettingGameRules";
import WinnerDeclartionTabs from "../container/admin/pages/winnerDeclartion/WinnerDeclartionTabs";
import NumberBettingEdit from "../component/admin/winnerEditDecalartion/NumberBettingEdit";
import ThreeColorBetList from "../component/admin/winnerEditDecalartion/ThreeColorBetList";
import TwoColorBetList from "../component/admin/winnerEditDecalartion/TwoColorBetList";
import CommunityBettingSwap from "../container/admin/pages/communityBetting/CommunityBettingSwap";
import CommunityGameRules from "../container/user/pages/communityBetting/CommunityBettingGameRules";
// import PenalityBetting from "../container/admin/pages/gameRules/PenalityBetting";
import PeriodsTable from "../component/admin/winnerEditDecalartion/PeriodsTable";
import PeriodList from "../container/admin/pages/periodList/PeriodList";
import ThreeColorAllRecords from "../container/user/pages/threeColorbetting/ThreeColorAllRecords";
import ThreeColorMyRecord from "../container/user/pages/threeColorbetting/ThreeColorMyRecord";
import TwoColorAllRecords from "../container/user/pages/twoColorbetting/TwoColorAllRecords";
import TwoColorMyRecords from "../container/user/pages/twoColorbetting/TwoColorMyRecords";
import NumberBettingMyRecords from "../container/user/pages/numberBetting/NumberBettingMyRecords";
import NumberBettingAllRecords from "../container/user/pages/numberBetting/NumberBettingAllRecords";
import RoleList from "../container/admin/pages/rolePermission/RoleList";
import AddRole from "../container/admin/pages/rolePermission/AddRole";
import AddSubAdmin from "../container/admin/pages/subAdmin/AddSubAdmin";
import SubAdmin from "../container/admin/pages/subAdmin/SubAdmin";
import AddCommunityBetting from "../container/admin/pages/gameManagement/AddCommunityBetting";
import UserPenaltyBetting from "../container/user/pages/penaltyBetting/UserPenaltyBetting";
import CardBetting from "../container/admin/pages/gameManagement/CardBetting";
import UserPenatltyBettingGameRules from "../container/user/pages/penaltyBetting/UserPenatltyBettingGameRules";
import UserCommunityBettingMyRecords from "../container/user/pages/communityBetting/UserCommunityBettingMyRecords";
import CardBettingRules from "../container/user/pages/cardBetting/CardBettingRules";
import CardBettingAllRecords from "../container/user/pages/cardBetting/CardBettingAllRecords";

import PenaltyBettingMyRecords from "../container/user/pages/penaltyBetting/PenaltyBettingMyRecords";
import PenaltyBettingAllRecords from "../container/user/pages/penaltyBetting/PenaltyBettingAllRecords";
import CardBettingList from "../component/admin/winnerEditDecalartion/CardBettingList";
import PenaltyBettingList from "../component/admin/winnerEditDecalartion/PenaltyBettingList";
import CardBettingMyRecords from "../container/user/pages/cardBetting/CardBettingMyRecords";
import PaymentAdd from "../container/admin/pages/cms/paymentMethod/PaymentAdd";
import ManualDepositList from "../container/admin/pages/cms/paymentMethod/ManualDepositList";
import BetHistory from "../container/admin/pages/betHistoryManagement/BetHistory";
import AdminPublicRoutes from "./AdminPublicRoutes";
import AddUpiPayment from "../container/admin/pages/cms/paymentMethod/AddUpiPayment";
//#endregion

const history = createBrowserHistory();
export default function Routes() {
  return (
    <BrowserRouter history={history}>
      <Routess>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/otp" element={<Otp />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="banner" element={<Banner />} />
            <Route path="currency" element={<Currency />} />
            <Route path="new-banner/add" element={<AddBanner />} />
            <Route path="payment-method" element={<PaymentAdd />} />
            <Route path="payment-method/upi-add" element={<AddUpiPayment />} />

            <Route path="new-currency/add" element={<AddCurrency />} />

            <Route path="new-banner/edit" element={<AddBanner />} />
            <Route path="new-currency/edit" element={<AddCurrency />} />

            <Route path="new-banner/viewpage" element={<ViewBanner />} />
            <Route path="setting" element={<Setting />} />
            <Route path="game-management" element={<GameManagement />} />
            <Route path="bet-history" element={<BetHistory />} />

            {/* <Route path="game-rules" element={<GameRules />} /> */}
            <Route path="game-rules" element={<Rules />} />
            <Route path="game-rules/number/:id" element={<NumberBetting />} />

            <Route path="query" element={<Query />} />
            <Route path="viewquery" element={<ViewQuery />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="user-management/view/:id" element={<ViewGame />} />
            {/* // <Route path="banner-management" element={<BannerManagement />} */}
            <Route path="terms-and-condition" element={<TermsCondition />} />
            <Route path="privacy-policy" element={<PrivayPolicy />} />
            {/* <Route path="contact-us" element={<Contactus />} /> */}
            <Route path="new-game/add" element={<AddGame />} />
            <Route path="new-game/edit" element={<AddGame />} />
            <Route path="new-game/pluspage" element={<PlusTable />} />
            {/* <Route path="new-game/edit/:id" element={<AddGame />} /> */}
            <Route path="new-game/edit/:gameId" element={<AddGame />} />
            <Route
              path="Add-community-betting"
              element={<AddCommunityBetting />}
            />
            <Route path="card-betting" element={<CardBetting />} />
            {/* <Route path="new-game/view" element={<ViewGame />} /> */}
            <Route path="new-game/viewpage" element={<ViewPage />} />
            <Route path="transaction-history" element={<Transaction />} />
            <Route path="withdrawal-request" element={<WithDrawal />} />
            <Route path="banner-view" element={<BannerViewPage />} />
            <Route path="banner-edit" element={<BannerEditPage />} />
            <Route path="edit-profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="community-betting" element={<CommunityBetting />} />
            <Route
              path="winner-declartion"
              element={<WinnerDeclartionTabs />}
            />
            <Route path="manual-deposit" element={<ManualDepositList />} />
            <Route path="Number-betting-edit" element={<NumberBettingEdit />} />
            <Route
              path="three-color-betting-edit"
              element={<ThreeColorBetList />}
            />
            <Route
              path="two-color-betting-edit"
              element={<TwoColorBetList />}
            />
            <Route path="card-betting-edit" element={<CardBettingList />} />
            <Route
              path="penalty-betting-edit"
              element={<PenaltyBettingList />}
            />
            <Route
              path="community-betting-swap"
              element={<CommunityBettingSwap />}
            />
            <Route path="periods-table" element={<PeriodsTable />} />
            <Route path="period-list" element={<PeriodList />} />
            <Route path="role-list" element={<RoleList />} />
            <Route path="add-role" element={<AddRole />} />
            <Route path="add-subAdmin" element={<AddSubAdmin />} />
            <Route path="subAdmin-list" element={<SubAdmin />} />
          </Route>
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route path="" element={<UserDashboard />} />

          {/* <Route path="deposit" element={<UserDashboard />} /> */}
          {/* <Route path="query" element={<UserQuery />} />

          <Route path="setting" element={<UserSetting />} /> */}

          <Route path="terms-condition" element={<UserTemsCondition />} />
          <Route path="contact-us" element={<UserContactUs />} />
          {/* <Route path="about-us" element={<UserAboutUs />} /> */}

          {/* <Route path="contact-us" element={<UserContactUs />} /> */}
          <Route path="privacy-policy" element={<UserPrivacyPolice />} />

          {/* <Route path="deposit" />
          <Route path="withdraw" /> */}

          {/* <Route path="demo-three-betting" element={<DemoThreeBetting />} />
          <Route path="transation-history" element={<TransationHistory />} />
          <Route path="dashboard_details" element={<DashboardDetails />} /> */}
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route element={<UserPrivateRoute />}>
            <Route path="query" element={<UserQuery />} />
            <Route path="setting" element={<UserSetting />} />
            <Route path="transation-history" element={<TransationHistory />} />
            <Route path="dashboard_details" element={<DashboardDetails />} />
            {/* </Route>
          <Route element={<UserPrivateRouteWalletAddress />}> */}
            <Route path="deposit" />
            <Route path="withdraw" />
            <Route path="demo-three-betting" element={<DemoThreeBetting />} />
            <Route path="three-color-betting" element={<ThreeColorBetting />} />
            <Route path="two-color-betting" element={<TwoColorBetting />} />
            <Route path="number-betting" element={<UserNumberBetting />} />
            <Route
              path="community-betting"
              element={<UserCommunityBetting />}
            />

            <Route
              path="three-color-gamerules"
              element={<ThreeColorGameRules />}
            />
            <Route path="two-color-gamerules" element={<TwoColorGameRules />} />
            <Route
              path="number-betting-gamerules"
              element={<NumberBettingGameRules />}
            />
            <Route
              path="three-color-betting/my-records"
              element={<ThreeColorMyRecord />}
            />
            <Route
              path="three-color-betting/all-records"
              element={<ThreeColorAllRecords />}
            />

            <Route
              path="two-color-betting/my-records"
              element={<TwoColorMyRecords />}
            />
            <Route
              path="two-color-betting/all-records"
              element={<TwoColorAllRecords />}
            />

            <Route
              path="penalty-betting/my-records"
              element={<PenaltyBettingMyRecords />}
            />
            <Route
              path="penalty-betting/all-records"
              element={<PenaltyBettingAllRecords />}
            />

            <Route
              path="number-betting/all-records"
              element={<NumberBettingAllRecords />}
            />
            <Route
              path="card-betting/all-records"
              element={<CardBettingAllRecords />}
            />
            <Route
              path="card-betting/my-records"
              element={<CardBettingMyRecords />}
            />
            <Route
              path="number-betting/my-records"
              element={<NumberBettingMyRecords />}
            />
            <Route
              path="community-betting/my-records"
              element={<UserCommunityBettingMyRecords />}
            />
            <Route
              path="three-color-gamerules"
              element={<ThreeColorGameRules />}
            />

            <Route path="two-color-gamerules" element={<TwoColorGameRules />} />
            <Route
              path="number-betting-gamerules"
              element={<NumberBettingGameRules />}
            />
            <Route
              path="card-betting-gamerules"
              element={<CardBettingRules />}
            />

            <Route
              path="community-betting-gamerules"
              element={<CommunityGameRules />}
            />

            <Route
              path="user-penalty-betting"
              element={<UserPenaltyBetting />}
            />
            <Route
              path="penalty-betting-game-rules"
              element={<UserPenatltyBettingGameRules />}
            />
            <Route path="card-betting" element={<UserCardBetting />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/user" replace={true} />} />
      </Routess>
    </BrowserRouter>
  );
}
