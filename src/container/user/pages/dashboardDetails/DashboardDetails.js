import React, { useEffect, useState } from "react";
import "../../../../container/admin/pages/dashboardLayout/dashboard.responsive.css";
import "../../../../container/admin/pages/dashboardLayout/dashboard.css";
import Index from "../../../Index";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import PagesIndex from "../../../pageIndex";
import { useSelector } from "react-redux";
import BetHistory from "./BetHistory";

const DashboardDetails = () => {
  // const [userDetails, setUserDetails] = useState();
  const userAmounts = useSelector((state) => state?.UserReducer?.userAmounts);

  // user dashboarddeatils api call
  // const dashboardDetails = async () => {
  //   await DataService.get(Api.User.USER_DASHBOARD_DETAILS)
  //     .then((res) => {
  //       setUserDetails(res?.data?.data);
  //     })
  //     .catch((error) => {});
  // };

  // useEffect(() => {
  //   dashboardDetails();
  // }, []);

  return (
    <div className="main-dashboard">
      <Index.Box className="admin-comman-title-right">
        <Index.Typography
          className="head-title admin-page-title"
          component="h1"
        >
          Dashboard
        </Index.Typography>
        <Index.Box className="main-card-dash-details">
          <Index.List className="main-list-card-details">
            <Index.ListItem className="admin-listitem-details">
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img src={PagesIndex.Svg.man}></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total Referral count
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {/* {userDetails?.totalReferralCount} */}
                      {userAmounts?.totalReferralCount}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem className="admin-listitem-details">
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img src={PagesIndex.Svg.networking}></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total Rewards{" "}
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {/* {userDetails?.totalRewardsDistributedOneMonth} */}
                      {/* {userAmounts?.totalReward
                        ? userAmounts?.totalReward
                        : "-"} */}
                      {userAmounts?.totalReward
                        ? Number(userAmounts?.totalReward)?.toFixed(2)
                        : 0}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem className="admin-listitem-details">
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img src={PagesIndex.Svg.adminprofile}></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total Deposit{" "}
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {" "}
                      {/* {userDetails?.totalBalance
                        ? Number(userDetails?.totalBalance)?.toFixed(2)
                        : 0} */}
                      {userAmounts?.totalDepositAmount
                        ? Number(userAmounts?.totalDepositAmount)?.toFixed(2)
                        : 0}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem className="admin-listitem-details">
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img src={PagesIndex.Svg.who}></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total transaction{" "}
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {/* {userDetails?.totalTransaction} */}
                      {userAmounts?.totalTransaction}
                      {/* userAmounts */}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem className="admin-listitem-details">
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img src={PagesIndex.Png.winner}></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      Total Win
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {/* {userDetails?.totalTransaction} */}
                      {userAmounts?.totalWin}
                      {/* userAmounts */}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem className="admin-listitem-details">
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img src={PagesIndex.Png.loss}></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      Total Loss
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {/* {userDetails?.totalTransaction} */}
                      {userAmounts?.totalLoose}
                      {/* userAmounts */}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
          </Index.List>
        </Index.Box>
      </Index.Box>
      <BetHistory />
    </div>
  );
};

export default DashboardDetails;
