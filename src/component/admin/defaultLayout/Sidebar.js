import React, { useEffect, useState } from "react";
import Index from "../../Index";
import PagesIndex from "../../../container/pageIndex";
import "../../../container/admin/pages/dashboardLayout/dashboard.css";
import { useSelector } from "react-redux";

function Sidebar({ open, setOpen }) {
  const location = PagesIndex.useLocation();
  const [opens, setOpens] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);
  const [transactionDropdown, setTransactionDropdown] = useState(false);
  const handleClickCms = () => {
    setOpens(!opens);
  };

  const handleTransactionDropdown = () => {
    setTransactionDropdown(!transactionDropdown);
  };

  const handleClickGameRule = () => {
    setOpenRules(!openRules);
  };

  useEffect(() => {
    if (
      location.pathname == "/admin/withdrawal-request" ||
      location.pathname == "/admin/manual-deposit"
    ) {
      setTransactionDropdown(true);
    }
  }, [location?.pathname]);

  return (
    <>
      <Index.Box
        className={`sidebar-main ${!open ? "active" : "sidebar-none"}`}
      >
        {/* <Index.Box className="sidebar-logo">
          <Index.Box className="sidebar-logo-back">
            <PagesIndex.Link className="logo-admin-redirect" to="/admin">
              <img src={PagesIndex.Svg.userlogo} alt="logo"></img>
            </PagesIndex.Link>
          </Index.Box>
        </Index.Box> */}
        <Index.Box className="sidebar-links">
          <Index.Box className="sidebar-ul">
            <Index.Box
              className={`sidebar-li ${
                location.pathname == "/admin" ? "active" : ""
              }`}
            >
              <PagesIndex.Link to="/admin">
                {" "}
                <Index.Box className="admin-icon-active">
                  <img
                    src={PagesIndex.Svg.sidebar1blue}
                    className="admin-without-active"
                  />
                  <img
                    src={PagesIndex.Svg.sidebar1}
                    className="active-admin-sidebar"
                  />
                </Index.Box>{" "}
                Dashboard
              </PagesIndex.Link>
            </Index.Box>
            {permission?.isAdmin == true ||
            (permission?.role?.UserManagement?.View == true &&
              permission?.isAdmin == false) ? (
              <>
                <Index.Box
                  className={`sidebar-li ${
                    location.pathname == "/admin/user-management"
                      ? "active"
                      : ""
                  }`}
                >
                  <PagesIndex.Link to="/admin/user-management">
                    <Index.Box className="admin-icon-active">
                      <img
                        src={PagesIndex.Svg.addGroup}
                        className="admin-without-active"
                      />
                      <img
                        src={PagesIndex.Svg.addGroup}
                        className="active-admin-sidebar"
                      />
                    </Index.Box>
                    User Management
                  </PagesIndex.Link>
                </Index.Box>
              </>
            ) : (
              <></>
            )}

            {/* {permission?.isAdmin == true ||
            (permission?.role?.Transaction?.View == true &&
              permission?.isAdmin == false) ? (
              <>
                <Index.Box
                  className={`sidebar-li ${
                    location.pathname == "/admin/transaction-history"
                      ? "active"
                      : ""
                  }`}
                >
                  <PagesIndex.Link to="/admin/transaction-history">
                    <Index.Box className="admin-icon-active">
                      <img
                        src={PagesIndex.Svg.transaction}
                        className="admin-without-active"
                      />
                      <img
                        src={PagesIndex.Svg.transaction}
                        className="active-admin-sidebar"
                      />
                    </Index.Box>
                    Transaction
                  </PagesIndex.Link>
                </Index.Box>
              </>
            ) : (
              <></>
            )} */}

            {/* {permission?.isAdmin == true ||
            (permission?.role?.WithdrawlRequest?.View == true &&
              permission?.isAdmin == false) ? (
              <>
                <Index.Box
                  className={`sidebar-li ${
                    location.pathname == "/admin/withdrawal-request"
                      ? "active"
                      : ""
                  }`}
                >
                  <PagesIndex.Link to="/admin/withdrawal-request">
                    <Index.Box className="admin-icon-active">
                      <img
                        src={PagesIndex.Svg.withdrawal}
                        className="admin-without-active"
                      />
                      <img
                        src={PagesIndex.Svg.withdrawal}
                        className="active-admin-sidebar"
                      />
                    </Index.Box>
                    Withdrawal Request
                  </PagesIndex.Link>
                </Index.Box>
              </>
            ) : (
              <></>
            )} */}
            <Index.List className="cms-menu-sideuser">
              {permission?.isAdmin == true ||
              permission?.role?.WithdrawlRequest?.View == true ||
              (permission?.role?.DepositRequest?.View == true &&
                permission?.isAdmin == false) ? (
                <>
                  <Index.ListItem className="drop-sidebar-admin">
                    <Index.Box className="w-100-drop">
                      <Index.Box
                        className="cms-text"
                        onClick={handleTransactionDropdown}
                      >
                        <Index.Box className="flex-cms-data">
                          <img
                            src={PagesIndex.Svg.sidebar5}
                            alt="sidebar icon"
                            className="cms-logo"
                          />
                          Transaction Request
                        </Index.Box>
                        {transactionDropdown ? (
                          <Index.ExpandLess className="expandless-icon" />
                        ) : (
                          <Index.ExpandMore className="expandmore-icon" />
                        )}
                      </Index.Box>

                      <Index.Box className="cms-drop-main">
                        <Index.Collapse
                          in={transactionDropdown}
                          timeout="auto"
                          unmountOnExit
                          className=""
                        >
                          <Index.List
                            component="div"
                            disablePadding
                            className="cms-list-content"
                          >
                            {/* Deposit Request */}

                            {permission?.isAdmin == true ||
                            (permission?.role?.DepositRequest?.View == true &&
                              permission?.isAdmin == false) ? (
                              <>
                                <Index.ListItem
                                  className={`sidebar-li ${
                                    location.pathname == "/admin/manual-deposit"
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <PagesIndex.Link
                                    to="/admin/manual-deposit"
                                    className=""
                                  >
                                    Deposit Request
                                  </PagesIndex.Link>
                                </Index.ListItem>
                              </>
                            ) : (
                              <></>
                            )}

                            {permission?.isAdmin == true ||
                            (permission?.role?.WithdrawlRequest?.View == true &&
                              permission?.isAdmin == false) ? (
                              <>
                                <Index.ListItem
                                  className={`sidebar-li ${
                                    location.pathname ==
                                    "/admin/withdrawal-request"
                                      ? "active"
                                      : ""
                                  }`}
                                  // className={`cms-listitem ${
                                  //   location.pathname == "/admin/withdrawal-request"
                                  //     ? "active"
                                  //     : ""
                                  // }`}
                                >
                                  <PagesIndex.Link
                                    to="/admin/withdrawal-request"
                                    className=""
                                  >
                                    Withdrawal Request
                                  </PagesIndex.Link>
                                </Index.ListItem>
                              </>
                            ) : (
                              <></>
                            )}
                          </Index.List>
                        </Index.Collapse>
                      </Index.Box>
                    </Index.Box>
                  </Index.ListItem>
                </>
              ) : (
                <></>
              )}
            </Index.List>
            {permission?.isAdmin == true ||
            (permission?.role?.BannerManagement?.View == true &&
              permission?.isAdmin == false) ? (
              <>
                <Index.Box
                  className={`sidebar-li ${
                    location.pathname == "/admin/banner" ? "active" : ""
                  }`}
                >
                  <PagesIndex.Link to="/admin/banner">
                    <Index.Box className="admin-icon-active">
                      <img
                        src={PagesIndex.Svg.banner}
                        className="admin-without-active"
                      />
                      <img
                        src={PagesIndex.Svg.banner}
                        className="active-admin-sidebar"
                      />
                    </Index.Box>
                    Banner Management
                  </PagesIndex.Link>
                </Index.Box>
              </>
            ) : (
              <></>
            )}

            {/* <Index.Box
              className={`sidebar-li ${location.pathname == "/admin/community-betting" ? "active" : ""
                }`}
            >
              <PagesIndex.Link to="/admin/community-betting">
                <Index.Box className="admin-icon-active">
                  <img
                    src={PagesIndex.Svg.community                                                                                               }
                    className="admin-without-active"
                  />
                  <img
                    src={PagesIndex.Svg.communitywhite}
                    className="active-admin-sidebar"
                  />
                </Index.Box>
                Community Betting
              </PagesIndex.Link>
            </Index.Box> */}

            {permission?.isAdmin == true ||
            (permission?.role?.CurrencyManagement?.View == true &&
              permission?.isAdmin == false) ? (
              <>
                <Index.Box
                  className={`sidebar-li ${
                    location.pathname == "/admin/currency" ? "active" : ""
                  }`}
                >
                  <PagesIndex.Link to="/admin/currency">
                    <Index.Box className="admin-icon-active">
                      <img
                        src={PagesIndex.Svg.currencyManagement}
                        className="admin-without-active"
                      />
                      <img
                        src={PagesIndex.Svg.currencyManagement}
                        className="active-admin-sidebar"
                      />
                    </Index.Box>
                    Currency Management
                  </PagesIndex.Link>
                </Index.Box>
              </>
            ) : (
              <></>
            )}

            {permission?.isAdmin == true ||
            (permission?.role?.GameManagement?.View == true &&
              permission?.isAdmin == false) ? (
              <>
                <Index.Box
                  className={`sidebar-li ${
                    location.pathname == "/admin/game-management"
                      ? "active"
                      : ""
                  }`}
                >
                  <PagesIndex.Link to="/admin/game-management">
                    {" "}
                    <Index.Box className="admin-icon-active">
                      <img
                        src={PagesIndex.Svg.game}
                        className="admin-without-active"
                      />
                      <img
                        src={PagesIndex.Svg.game}
                        className="active-admin-sidebar"
                      />
                    </Index.Box>
                    Game Management
                  </PagesIndex.Link>
                </Index.Box>
              </>
            ) : (
              <></>
            )}

            {/* Betting Record */}

            {permission?.isAdmin == true ||
            (permission?.role?.BettingRecords?.View == true &&
              permission?.isAdmin == false) ? (
              <>
                <Index.Box
                  className={`sidebar-li ${
                    location.pathname == "/admin/bet-history" ? "active" : ""
                  }`}
                >
                  <PagesIndex.Link to="/admin/bet-history">
                    {" "}
                    <Index.Box className="admin-icon-active">
                      <img
                        src={PagesIndex.Svg.game}
                        className="admin-without-active"
                      />
                      <img
                        src={PagesIndex.Svg.game}
                        className="active-admin-sidebar"
                      />
                    </Index.Box>
                    Betting Records
                  </PagesIndex.Link>
                </Index.Box>
              </>
            ) : (
              <></>
            )}

            {/* 
            <Index.Box
              className={`sidebar-li ${location.pathname == "/admin/game-rules" ? "active" : ""
                }`}
            >
              <PagesIndex.Link to="/admin/game-rules">
                <Index.Box className="admin-icon-active">
                  </Index.Box>
                <img
                  src={PagesIndex.Svg.sidebar4blue}
                  className="admin-without-active"
                />
                Game Rules
              </PagesIndex.Link>
            </Index.Box> */}

            {permission?.isAdmin == true ||
            (permission?.role?.WinnerDeclaration?.View == true &&
              permission?.isAdmin == false) ? (
              <>
                <Index.Box
                  className={`sidebar-li ${
                    location.pathname == "/admin/winner-declartion"
                      ? "active"
                      : ""
                  }`}
                >
                  <PagesIndex.Link to="/admin/winner-declartion">
                    <Index.Box className="admin-icon-active">
                      <img
                        src={PagesIndex.Svg.winning}
                        className="admin-without-active"
                      />
                      <img
                        src={PagesIndex.Svg.winning}
                        className="active-admin-sidebar"
                      />
                    </Index.Box>
                    Winner Declaration
                  </PagesIndex.Link>
                </Index.Box>
              </>
            ) : (
              <></>
            )}

            {/* Deposit Request*/}

            {/* {permission?.isAdmin == true ||
            (permission?.role?.WinnerDeclaration?.View == true &&
              permission?.isAdmin == false) ? (
              <>
                <Index.Box
                  className={`sidebar-li ${
                    location.pathname == "/admin/manual-deposit" ? "active" : ""
                  }`}
                >
                  <PagesIndex.Link to="/admin/manual-deposit">
                    <Index.Box className="admin-icon-active">
                      <img
                        src={PagesIndex.Svg.winning}
                        className="admin-without-active"
                      />
                      <img
                        src={PagesIndex.Svg.winning}
                        className="active-admin-sidebar"
                      />
                    </Index.Box>
                    Deposit Request
                  </PagesIndex.Link>
                </Index.Box>
              </>
            ) : (
              <></>
            )} */}

            {permission?.isAdmin == true ||
            (permission?.role?.Periods?.View == true &&
              permission?.isAdmin == false) ? (
              <>
                <Index.Box
                  className={`sidebar-li ${
                    location.pathname == "/admin/period-list" ? "active" : ""
                  }`}
                >
                  <PagesIndex.Link to="/admin/period-list">
                    <Index.Box className="admin-icon-active">
                      <img
                        src={PagesIndex.Svg.customer}
                        className="admin-without-active"
                      />
                      <img
                        src={PagesIndex.Svg.customer}
                        className="active-admin-sidebar"
                      />
                    </Index.Box>
                    Periods List
                  </PagesIndex.Link>
                </Index.Box>
              </>
            ) : (
              <></>
            )}

            {permission?.isAdmin == true ||
            (permission?.role?.Query?.View == true &&
              permission?.isAdmin == false) ? (
              <>
                <Index.Box
                  className={`sidebar-li ${
                    location.pathname == "/admin/query" ? "active" : ""
                  }`}
                >
                  <PagesIndex.Link to="/admin/query">
                    <Index.Box className="admin-icon-active">
                      <img
                        src={PagesIndex.Svg.sidebar8blue}
                        className="admin-without-active"
                      />
                      <img
                        src={PagesIndex.Svg.sidebar8}
                        className="active-admin-sidebar"
                      />
                    </Index.Box>
                    Query
                  </PagesIndex.Link>
                </Index.Box>
              </>
            ) : (
              <></>
            )}

            {permission?.isAdmin == true && (
              <Index.Box
                className={`sidebar-li ${
                  location.pathname == "/admin/role-list" ? "active" : ""
                }`}
              >
                <PagesIndex.Link to="/admin/role-list">
                  <Index.Box className="admin-icon-active">
                    <img
                      src={PagesIndex.Svg.administrator}
                      className="admin-without-active"
                    />
                    <img
                      src={PagesIndex.Svg.administrator}
                      className="active-admin-sidebar"
                    />
                  </Index.Box>
                  Role Management
                </PagesIndex.Link>
              </Index.Box>
            )}

            {permission?.isAdmin == true ? (
              <Index.Box
                className={`sidebar-li ${
                  location.pathname == "/admin/subAdmin-list" ? "active" : ""
                }`}
              >
                <PagesIndex.Link to="/admin/subAdmin-list">
                  <Index.Box className="admin-icon-active">
                    <img
                      src={PagesIndex.Svg.employee}
                      className="admin-without-active"
                    />
                    <img
                      src={PagesIndex.Svg.employee}
                      className="active-admin-sidebar"
                    />
                  </Index.Box>
                  Sub Admin
                </PagesIndex.Link>
              </Index.Box>
            ) : (
              <></>
            )}

            {/* <Index.Box
              className={`sidebar-li ${location.pathname == "/admin/banner-management" ? "active" : ""
                }`}
            >
              <PagesIndex.Link to="/admin/banner-management">
                {" "}
                <Index.Box className="admin-icon-active">
                  <img src={PagesIndex.Svg.sidebar2blue} className="admin-without-active" />
                  <img src={PagesIndex.Svg.sidebar2} className="active-admin-sidebar" />
                </Index.Box>
                Banner Management
              </PagesIndex.Link>
            </Index.Box> */}
            {/* <Index.Box
              className={`sidebar-li ${location.pathname == "/admin/game-rules" ? "active" : ""
                }`}
             >
              <PagesIndex.Link to="/admin/game-rules">
                <Index.Box className="admin-icon-active">
                  <img src={PagesIndex.Svg.sidebar4blue} className="admin-without-active" />
                  <img src={PagesIndex.Svg.sidebar4} className="active-admin-sidebar" />
                </Index.Box>
                Game Rules
              </PagesIndex.Link>
            </Index.Box> */}

            {/* <Index.Box
              className={`sidebar-li ${location.pathname == "/admin/user-management" ? "active" : ""
                }`}
            >
              <PagesIndex.Link to="/admin/user-management">
              <Index.Box className="admin-icon-active">
                  <img src={PagesIndex.Svg.sidebar8blue} className="admin-without-active"/>
                  <img src={PagesIndex.Svg.sidebar8} className="active-admin-sidebar"/>
                </Index.Box>
                User Management
              </PagesIndex.Link>
            </Index.Box> */}

            {permission?.isAdmin == true ||
            (permission?.role?.Setting?.View == true &&
              permission?.isAdmin == false) ? (
              <>
                <Index.Box
                  className={`sidebar-li ${
                    location.pathname == "/admin/setting" ? "active" : ""
                  }`}
                >
                  <PagesIndex.Link to="/admin/setting">
                    <Index.Box className="admin-icon-active">
                      <img
                        src={PagesIndex.Svg.settings}
                        className="admin-without-active"
                      />
                      <img
                        src={PagesIndex.Svg.settingswhite}
                        className="active-admin-sidebar"
                      />
                    </Index.Box>
                    Setting
                  </PagesIndex.Link>
                </Index.Box>
              </>
            ) : (
              <></>
            )}
            <Index.List className="cms-menu-sideuser">
              {permission?.isAdmin == true ||
              permission?.role?.CMS?.PaymentMethod?.View == true ||
              permission?.role?.CMS?.TermsAndCondition?.View == true ||
              (permission?.role?.CMS?.PrivacyPolicy?.View == true &&
                permission?.isAdmin == false) ? (
                <>
                  <Index.ListItem className="drop-sidebar-admin">
                    <Index.Box className="w-100-drop">
                      <Index.Box className="cms-text" onClick={handleClickCms}>
                        <Index.Box className="flex-cms-data">
                          <img
                            src={PagesIndex.Svg.sidebar5}
                            alt="sidebar icon"
                            className="cms-logo"
                          />
                          CMS
                        </Index.Box>
                        {opens ? (
                          <Index.ExpandLess className="expandless-icon" />
                        ) : (
                          <Index.ExpandMore className="expandmore-icon" />
                        )}
                      </Index.Box>

                      <Index.Box className="cms-drop-main">
                        <Index.Collapse
                          in={opens}
                          timeout="auto"
                          unmountOnExit
                          className=""
                        >
                          <Index.List
                            component="div"
                            disablePadding
                            className="cms-list-content"
                          >
                            {/* payment method */}

                            {permission?.isAdmin == true ||
                            (permission?.role?.CMS?.PaymentMethod?.View ==
                              true &&
                              permission?.isAdmin == false) ? (
                              <>
                                <Index.ListItem className="cms-listitem">
                                  <PagesIndex.Link
                                    to="/admin/payment-method"
                                    className=""
                                  >
                                    Payment Method
                                  </PagesIndex.Link>
                                </Index.ListItem>
                              </>
                            ) : (
                              <></>
                            )}

                            {permission?.isAdmin == true ||
                            (permission?.role?.CMS?.TermsAndCondition?.View ==
                              true &&
                              permission?.isAdmin == false) ? (
                              <>
                                <Index.ListItem className="cms-listitem">
                                  <PagesIndex.Link
                                    to="/admin/terms-and-condition"
                                    className=""
                                  >
                                    Terms and conditions
                                  </PagesIndex.Link>
                                </Index.ListItem>
                              </>
                            ) : (
                              <></>
                            )}

                            {permission?.isAdmin == true ||
                            (permission?.role?.CMS?.PrivacyPolicy?.View ==
                              true &&
                              permission?.isAdmin == false) ? (
                              <>
                                <Index.ListItem className="cms-listitem">
                                  <PagesIndex.Link
                                    to="/admin/privacy-policy"
                                    className=" "
                                  >
                                    Privacy policy
                                  </PagesIndex.Link>
                                </Index.ListItem>
                              </>
                            ) : (
                              <></>
                            )}
                          </Index.List>
                        </Index.Collapse>
                      </Index.Box>
                    </Index.Box>
                  </Index.ListItem>
                </>
              ) : (
                <></>
              )}
            </Index.List>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}

export default Sidebar;
