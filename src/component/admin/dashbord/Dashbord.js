import React, { useEffect, useState } from "react";
import Index from "../../Index";
import "../../../container/admin/pages/dashboardLayout/dashboard.css";
import PageIndex from "../../../container/pageIndex";
import "../../../container/admin/pages/dashboardLayout/dashboard.responsive.css";
import { toast } from "react-toastify";
import DataService from "../../../config/DataService";
import { Api } from "../../../config/Api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardList, setDashboardList] = useState({});

  let totalDeposit = dashboardList ? dashboardList.totalDeposit : undefined;

  let roundedTotalDeposit;
  if (totalDeposit !== undefined) {
    roundedTotalDeposit = Math.round(totalDeposit * 1e18) / 1e18;
  }

  const getAllDashboardData = async () => {
    await DataService.get(Api.ADMIN_DASHBOARD)
      .then((res) => {
        setDashboardList(res?.data?.data);
      })
      .catch((e) => {
        toast.error(
          e?.response?.data?.message ? e.response?.data?.message : e?.message,
          {
            toastId: "customId",
          }
        );
      });
  };
  useEffect(() => {
    getAllDashboardData();
  }, []);

  const handleUserManagement = () => {
    navigate("/admin/user-management");
  };
  const handleTransactionList = () => {
    navigate("/admin/transaction-history");
  };

  return (
    <div className="main-dashboard">
      <Index.Box className="admin-comman-title-right">
        <Index.Box className="mb-20px-dashboard">
          <Index.Typography
            className="head-title admin-page-title"
            component="h1"
          >
            Dashboard
          </Index.Typography>
        </Index.Box>

        <Index.Box className="main-card-dash-details">
          <Index.List className="main-list-card-details">
            <Index.ListItem
              className="admin-listitem-details"
              onClick={() => handleUserManagement()}
            >
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img src={PageIndex.Svg.man} alt="main"></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      Total Users{" "}
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.totalUsers
                        ? dashboardList?.totalUsers
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem
              className="admin-listitem-details"
              onClick={() => handleUserManagement()}
            >
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img src={PageIndex.Svg.networking} alt="networking"></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total Active Users{" "}
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.totalActiveUsers
                        ? dashboardList?.totalActiveUsers
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem className="admin-listitem-details">
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img
                      src={PageIndex.Svg.adminprofile}
                      alt="adminprofile"
                    ></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      Total New login users in 24 hours{" "}
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.totalNewLoginUsersIn24Hours
                        ? dashboardList?.totalNewLoginUsersIn24Hours
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem
              className="admin-listitem-details"
              onClick={() => handleUserManagement()}
            >
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img src={PageIndex.Svg.who} alt="who"></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total deactivated Users{" "}
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.totalDeactivatedUsers
                        ? dashboardList?.totalDeactivatedUsers
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem className="admin-listitem-details">
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img src={PageIndex.Svg.adminwork} alt="adminwork"></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total Zero balance users{" "}
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.totalZeroDepositUser
                        ? dashboardList?.totalZeroDepositUser
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem className="admin-listitem-details">
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img src={PageIndex.Svg.balance} alt="balance"></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total zero balance users in 24 hours{" "}
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.totalZeroDepositUserIn24Hours
                        ? dashboardList?.totalZeroDepositUserIn24Hours
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem
              className="admin-listitem-details"
              onClick={() => handleTransactionList()}
            >
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img
                      src={PageIndex.Svg.cardPayment}
                      alt="cardPayment"
                    ></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total Transaction{" "}
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.totalTransaction
                        ? dashboardList?.totalTransaction
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>

            {/* new list add */}
            <Index.ListItem
              className="admin-listitem-details"
              // onClick={() => handleTransactionList()}
            >
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img
                      src={PageIndex.Svg.cardPayment}
                      alt="cardPayment"
                    ></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total Users who Deposited Amount in 24 Hrs{" "}
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.totaldepositIn24Hours
                        ? dashboardList?.totaldepositIn24Hours
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem
              className="admin-listitem-details"
              // onClick={() => handleTransactionList()}
            >
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img
                      src={PageIndex.Svg.cardPayment}
                      alt="cardPayment"
                    ></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total Users who Placed Bets in 24 Hrs
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.allUserPlacedBetIn24Hours
                        ? dashboardList?.allUserPlacedBetIn24Hours
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem
              className="admin-listitem-details"
              // onClick={() => handleTransactionList()}
            >
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img
                      src={PageIndex.Svg.cardPayment}
                      alt="cardPayment"
                    ></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total Rewards Distributed (1 Month Count)
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.totalDistributedAmountInLastMonth
                        ? dashboardList?.totalDistributedAmountInLastMonth
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem
              className="admin-listitem-details"
              // onClick={() => handleTransactionList()}
            >
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img
                      src={PageIndex.Svg.cardPayment}
                      alt="cardPayment"
                    ></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total User Wallet Balance
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {/* {roundedTotalDeposit ? roundedTotalDeposit : "-"} */}
                      {dashboardList?.totalDeposit
                        ? Number(dashboardList?.totalDeposit)?.toFixed(2)
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem
              className="admin-listitem-details"
              // onClick={() => handleTransactionList()}
            >
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img
                      src={PageIndex.Svg.cardPayment}
                      alt="cardPayment"
                    ></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total Rewards Distributed Today
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.totalDistributedToday
                        ? Number(dashboardList?.totalDistributedToday)?.toFixed(
                            2
                          )
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem
              className="admin-listitem-details"
              // onClick={() => handleTransactionList()}
            >
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img
                      src={PageIndex.Svg.cardPayment}
                      alt="cardPayment"
                    ></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total Bets in 24 Hrs
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.totalBetInPast24hrs
                        ? dashboardList?.totalBetInPast24hrs
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem
              className="admin-listitem-details"
              // onClick={() => handleTransactionList()}
            >
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img
                      src={PageIndex.Svg.cardPayment}
                      alt="cardPayment"
                    ></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total Winning Amount in 24 Hrs
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.totalWinningAmountin24Hrs
                        ? dashboardList?.totalWinningAmountin24Hrs
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
            <Index.ListItem
              className="admin-listitem-details"
              // onClick={() => handleTransactionList()}
            >
              <Index.Box className="admin-card-box-dash">
                <Index.Box className="admin-pd-box-card">
                  <Index.Box className="admin-card-list-img">
                    <img
                      src={PageIndex.Svg.cardPayment}
                      alt="cardPayment"
                    ></img>
                  </Index.Box>
                  <Index.Box className="card-dash-list-details">
                    <Index.Typography
                      component="h5"
                      variant="h5"
                      className="user-title-main"
                    >
                      {" "}
                      Total Withdrawal Requests
                    </Index.Typography>
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="user-amount-main"
                    >
                      {dashboardList?.totalWithdrawalRequests
                        ? dashboardList?.totalWithdrawalRequests
                        : "-"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.ListItem>
          </Index.List>
        </Index.Box>

        {/* <Index.Box className="mini-card-main">
          <Index.Box className="mini-card">
            <Index.Box className="mini-card-img">
              <img src={PageIndex.Png.card1}></img>
  
            </Index.Box>
            <Index.Box className="card-right-content">
              <Index.Typography className="card-total" component="p">
                Total Sales
              </Index.Typography>

              <Index.Typography className="card-price">
                ₹ 53,00,000
              </Index.Typography>
            </Index.Box>
          </Index.Box>
          <Index.Box className="mini-card">
            <Index.Box className="mini-card-img mini-card-2">
              <img src={PageIndex.Png.card2}></img>
            </Index.Box>
            <Index.Box className="card-right-content">
              <Index.Typography className="card-total" component="p">
                Total Purchase
              </Index.Typography>
              <Index.Typography className="card-price">
                ₹ 7,00,102
              </Index.Typography>
            </Index.Box>
          </Index.Box>
          <Index.Box className="mini-card">
            <Index.Box className="mini-card-img mini-card-3">
              <img src={PageIndex.Png.card3}></img>
            </Index.Box>
            <Index.Box className="card-right-content">
              <Index.Typography className="card-total" component="p">
                Total Profit
              </Index.Typography>
              <Index.Typography className="card-price">
                ₹ 46,38,000
              </Index.Typography>
            </Index.Box>
          </Index.Box>
          <Index.Box className="mini-card">
            <Index.Box className="mini-card-img mini-card-4">
              <img src={PageIndex.Png.card4}></img>
            </Index.Box>
            <Index.Box className="card-right-content">
              <Index.Typography className="card-total" component="p">
                Total Kotak Balance
              </Index.Typography>
              <Index.Typography className="card-price">
                ₹ 7,00,102
              </Index.Typography>
            </Index.Box>
          </Index.Box>
          <Index.Box className="mini-card">
            <Index.Box className="mini-card-img mini-card-5">
              <img src={PageIndex.Png.card4}></img>
            </Index.Box>
            <Index.Box className="card-right-content">
              <Index.Typography className="card-total" component="p">
                Total HDFC Balance
              </Index.Typography>
              <Index.Typography className="card-price">
                ₹ 7,00,102
              </Index.Typography>
            </Index.Box>
          </Index.Box>
        </Index.Box> */}
      </Index.Box>
    </div>
  );
};

export default Dashboard;
