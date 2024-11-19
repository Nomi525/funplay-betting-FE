import React, { useState, useEffect } from "react";
import Index from "../../Index";
import PageIndex from "../../PageIndex";
import { Link, useLocation } from "react-router-dom";
import PagesIndex from "../../PageIndex";
import { useSelector, useDispatch } from "react-redux";
import { dashboardAmount, logout } from "../../../redux/user/userSlice";
import { useDisconnect, useWeb3ModalAccount } from "@web3modal/ethers5/react";

import { useNavigate } from "react-router-dom/dist";
import DataService from "../../../config/DataService";
import { Api } from "../../../config/Api";
import moment from "moment";
import { toast } from "react-toastify";
import { userAmountNew } from "../../../redux/user/userReducer";

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

export default function Sidebar(props) {
  const [totalAmount, setTotalAmount] = useState();
  const [openBalances, setOpenBalances] = useState(false);
  const [openAccount, setOpenAccount] = useState(true);
  const [gameList, setGameList] = useState();
  // const [selectedVal, setSelectedVal] = useState();
  const [meargeData, setMeargeData] = useState([]);

  const path = useLocation()?.pathname;
  const locationState = useLocation()?.state;
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  let dispatch = useDispatch();
  const { isConnected, address } = useWeb3ModalAccount();
  let token = localStorage.getItem("token");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log({ path });
  const referralCode = useSelector(
    (state) => state?.UserReducer?.userData?.referralCode
  );

  const {
    openMenu,
    setOpenMenu,
    setOpenWithdraw,
    open,
    setOpen,
    handleOpenGameRules,
    handleCloseGameRules,
    userGameId,
    setUserGameId,
    openModal,
    setOpenModal,
    date,
    setDate,
    walletAddress,
    // handleOpenSignIn,
    selectedVal,
    setSelectedVal,
  } = props;
  const handleClickAccount = () => {
    setOpenAccount(!openAccount);
  };

  const handleOpenBalances = () => setOpenBalances(true);
  const handleCloseBalances = () => setOpenBalances(false);

  /* user signout function*/
  const handleSignOutUser = async () => {
    await disconnect();
    await dispatch(logout());
    await localStorage.removeItem("token");
    await removeClass();
    await navigate("/user");
  };

  useEffect(() => {
    // Function to update window width state
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* user wallet total amount */
  const userAmountDeposit = async () => {
    await DataService.get(Api.User.USER_AMOUNT_DEPOSIT)
      .then((res) => {
        setTotalAmount(res?.data?.data?.tokenDollorValue);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (token) {
      userAmountDeposit();
    }
  }, []);

  const userGameList = async () => {
    await DataService.get(Api.User.USER_GAMES)
      .then((res) => {
        setGameList(res?.data?.data);
        res?.data?.data.forEach((ele) => {
          if (ele?.gameName === "Community Betting") {
            localStorage.setItem("communityBetting", JSON.stringify(ele));
          }
          if (ele?.gameName === "Card Betting") {
            localStorage.setItem("cardBetting", JSON.stringify(ele));
          }
        });
        // setRetingId(res?.data?.data.map((e) => userGameRating(e?._id)))
      })
      .catch((error) => {});
  };
  useEffect(() => {
    userGameList();
  }, []);

  const removeClass = () => {
    setOpenMenu((e) => !e);
    document.body.classList[openMenu ? "add" : "remove"]("header-override");
    document
      .getElementById("admin-sidebar")
      .classList[openMenu ? "add" : "remove"]("active");
  };

  /* slider */
  const [sidebarslider, setslider] = useState({
    ourgameslider: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1024: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    },
  });

  const staticData = [
    {
      gameName: "Home",
      isActive: true,
    },
  ];

  const lastData = [
    {
      gameName: "Live Bets",
      isActive: false,
    },
    {
      gameName: "Offers",
      isActive: false,
    },
    {
      gameName: "Query",
      isActive: true,
    },
    {
      gameName: "Transaction History",
      isActive: true,
    },
  ];

  // useEffect(() => {
  //   if (gameList?.length) {
  //     const mergedArray = [...staticData, ...gameList, ...lastData];
  //     setMeargeData(mergedArray);
  //   } else {
  //     const mergedArray = [...staticData, ...lastData];
  //     setMeargeData(mergedArray);
  //   }
  // }, [gameList]);

  useEffect(() => {
    if (token) {
      if (gameList?.length) {
        const mergedArray = [
          ...staticData,
          ...gameList,
          {
            gameName: "Dashboard",
            isActive: true,
          },
          ...lastData,
        ];
        setMeargeData(mergedArray);
      } else {
        const mergedArray = [...staticData, ...lastData];
        setMeargeData(mergedArray);
      }
    } else {
      if (gameList?.length) {
        const mergedArray = [...staticData, ...gameList, ...lastData];
        setMeargeData(mergedArray);
      } else {
        const mergedArray = [...staticData, ...lastData];
        setMeargeData(mergedArray);
      }
    }
  }, [token, gameList]);

  useEffect(() => {
    if (path == "/user") {
      setSelectedVal("Home");
    }
  }, [path]);

  useEffect(() => {
    if (locationState?.message === "loginRequired") {
      setOpen(true);
      // handleOpenSignIn();
    } else {
      if (locationState?.ele?.gameName) {
        setSelectedVal(locationState?.ele?.gameName);
        setUserGameId(locationState?.ele);
      }
    }
  }, [locationState]);

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  const handleNavigate = (ele) => {
    setSelectedVal(ele?.gameName);
    localStorage.setItem("userGameId", JSON.stringify(ele));
    setUserGameId("");

    if (referralCode) {
      setDate(ele);
      var d1 = new Date();
      const Today = moment(d1).format("YYYY/MM/DD ");
      const startDate = moment(ele?.gameTimeFrom).format("YYYY/MM/DD ");
      const time = formatAMPM(new Date());
      const endDate = moment(ele?.gameTimeTo).format("YYYY/MM/DD");
      const getDate = Today >= startDate;
      const Time = time >= ele?.gameDurationFrom;
      const startDateTime = moment(startDate + " " + ele?.gameDurationFrom);
      const endDateTime = moment(endDate + " " + ele?.gameDurationTo);
      const currentDateTime = moment();
      var expected_endtime = moment(startDateTime).add(
        Number(ele?.gameHours),
        "minutes"
      );
      setUserGameId(ele);
      if (ele?.gameName == "Home") {
        navigate("/user");
      } else if (ele?.gameName == "Dashboard" && referralCode) {
        dispatch(userAmountNew())
          .then((res) => {
            if (res) {
              dispatch(dashboardAmount(res?.payload));
            }
          })
          .catch((error) => {});
        navigate("/user/dashboard_details");
      } else if (ele?.gameName == "Transaction History" && referralCode) {
        navigate("/user/transation-history");
      } else if (ele?.gameName == "Live Bets" && referralCode) {
      } else if (ele?.gameName == "Offers" && referralCode) {
      } else if (ele?.gameName == "Query" && referralCode) {
        navigate("/user/query");
      }
      // if (walletAddress) {
      if (ele?.gameName == "Number Betting") {
        if (
          currentDateTime >= startDateTime &&
          currentDateTime <= endDateTime
        ) {
          if (expected_endtime >= currentDateTime || ele?.isRepeat) {
            navigate("/user/number-betting-gamerules", {
              state: {
                ele: ele,
              },
            });
            setOpenModal(false);
          } else {
            setOpenModal(true);
            navigate("/user");
          }
        } else {
          setOpenModal(true);
          navigate("/user");
        }
      } else if (ele?.gameName.trim() == "Color Prediction") {
        if (
          currentDateTime >= startDateTime &&
          currentDateTime <= endDateTime
        ) {
          if (expected_endtime >= currentDateTime || ele?.isRepeat) {
            navigate("/user/three-color-gamerules", {
              state: {
                ele: ele,
              },
            });
            setOpenModal(false);
          } else {
            navigate("/user");
            setOpenModal(true);
          }
          // navigate("/user/number-betting-gamerules", {
          //      state: {
          //          ele: ele,
          //         },
          //       });
          //        setOpenModal(false);
        } else {
          setOpenModal(true);
          navigate("/user");
        }
      } else if (ele?.gameName == "2 Color Betting") {
        if (
          currentDateTime >= startDateTime &&
          currentDateTime <= endDateTime
        ) {
          if (expected_endtime >= currentDateTime || ele?.isRepeat) {
            navigate("/user/two-color-gamerules", {
              state: {
                ele: ele,
              },
            });
            setOpenModal(false);
          } else {
            setOpenModal(true);
            navigate("/user");
          }
        } else {
          setOpenModal(true);
          navigate("/user");
        }
      } else if (ele?.gameName == "Penalty Betting") {
        localStorage.setItem("userGameId", JSON.stringify(ele));
        if (
          currentDateTime >= startDateTime &&
          currentDateTime <= endDateTime
        ) {
          if (expected_endtime >= currentDateTime || ele?.isRepeat) {
            navigate("/user/penalty-betting-game-rules", {
              state: {
                ele: ele,
              },
            });
            setOpenModal(false);
          } else {
            setOpenModal(true);
          }
        } else {
          setOpenModal(true);
        }
      } else if (ele?.gameName == "Community Betting") {
        localStorage.setItem("userGameId", JSON.stringify(ele));
        if (
          currentDateTime >= startDateTime &&
          currentDateTime <= endDateTime
        ) {
          if (expected_endtime >= currentDateTime || ele?.isRepeat) {
            navigate("/user/community-betting-gamerules", {
              state: {
                ele: ele,
              },
            });
            setOpenModal(false);
          } else {
            setOpenModal(true);
            navigate("/user");
          }
        } else {
          setOpenModal(true);
          navigate("/user");
        }
      } else if (ele?.gameName == "Card Betting") {
        localStorage.setItem("userGameId", JSON.stringify(ele));
        if (
          currentDateTime >= startDateTime &&
          currentDateTime <= endDateTime
        ) {
          if (expected_endtime >= currentDateTime || ele?.isRepeat) {
            navigate("/user/card-betting-gamerules", {
              state: {
                ele: ele,
              },
            });
            setOpenModal(false);
          } else {
            setOpenModal(true);
            navigate("/user");
          }
        } else {
          setOpenModal(true);
          navigate("/user");
        }
      }
      // }else {
      //   toast.error("Please connect wallet", {
      //     toastId: "customId"
      //   })
      // }
    } else {
      console.log("425");
      setSelectedVal("Home");
      setOpen(true);
      // handleOpenSignIn();
      setUserGameId("");
      navigate("/user");
    }
  };

  return (
    <>
      <Index.Box className="user-sidebar-main-flex" id={"admin-sidebar"}>
        <Index.Box className="main-user-logo-content">
          <Link
            to="/user"
            onClick={() => {
              setUserGameId("");
            }}
            className="user-logo-redirect"
          >
            {/* <img
              src={PageIndex.Svg.userlogo}
              alt="logo"
              onClick={() => {
                window.innerWidth <= 768 && removeClass();
              }}
            /> */}
          </Link>
        </Index.Box>
        <Index.Box className="list-user-details-main">
          <Index.List className="list-user-sidebar">
            {meargeData?.map((ele) => {
              return (
                <Index.ListItem
                  // className={
                  //   windowWidth <= 768
                  //     ? ele?.gameName == "Transaction History"
                  //       ? "abc"
                  //       : `listitem-user-inner ${
                  //           ele?.gameName == selectedVal && ele?.isActive
                  //             ? "active"
                  //             : ""
                  //         }`
                  //     : `listitem-user-inner ${
                  //         ele?.gameName == selectedVal && ele?.isActive
                  //           ? "active"
                  //           : path == "/user" && ele?.gameName == "Home"
                  //           ? "active"
                  //           : ""
                  //       }`
                  // }
                  className={`listitem-user-inner ${
                    ele?.gameName == selectedVal && ele?.isActive
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    window.innerWidth <= 768 && removeClass();
                    ele?.isActive && handleNavigate(ele);
                  }}
                >
                  <Link
                    className="inner-user-redirect-page"
                    onClick={() => {
                      setUserGameId("");
                    }}
                  >
                    <Index.Box className="user-flex-menu">
                      <Index.Box className="user-icon-list">
                        {ele?.gameName == "Home" ? (
                          <>
                            <img src={PageIndex.Png.home} alt="home" />
                          </>
                        ) : ele?.gameName == "Dashboard" ? (
                          <>
                            <img
                              src={PageIndex.Png.dashbaord}
                              alt="dashbaord"
                            />
                          </>
                        ) : ele?.gameName == "Live Bets" ? (
                          <>
                            <img
                              src={PageIndex.Png.onlinebetting}
                              alt="onlinebetting"
                            />
                          </>
                        ) : ele?.gameName == "Offers" ? (
                          <>
                            <img src={PageIndex.Png.offers} alt="offers" />
                          </>
                        ) : ele?.iconImage ? (
                          <>
                            <img
                              src={process.env.REACT_APP_IMG + ele?.iconImage}
                              alt="offers"
                            />
                          </>
                        ) : ele?.gameName == "Query" ? (
                          <>
                            <img src={PageIndex.Png.query} alt="query" />
                          </>
                        ) : // windowWidth <= 768 ? (
                        //   ""
                        // ) :
                        ele?.gameName == "Transaction History" ? (
                          <>
                            <img
                              src={PageIndex.Png.transactionhistory}
                              alt="transactionhistory"
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </Index.Box>

                      {/* {windowWidth <= 768 ? (
                        ele?.gameName == "Transaction History" ? (
                          ""
                        ) : (
                          <Index.Typography
                            component="p"
                            variant="p"
                            className="sidebar-user-title"
                          >
                            {ele?.gameName}
                          </Index.Typography>
                        )
                      ) : ( */}
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="sidebar-user-title"
                      >
                        {ele?.gameName}
                      </Index.Typography>
                      {/* )} */}
                    </Index.Box>
                  </Link>
                </Index.ListItem>
              );
            })}
            <Index.ListItem
              className={`term-condition listitem-user-inner ${
                selectedVal === "Terms and Conditions" ? "active" : ""
              }`}
              onClick={() => {
                window.innerWidth <= 768 && removeClass();
                setSelectedVal("Terms and Conditions");
                navigate("/user/terms-condition");
              }}
            >
              <Link
                className="inner-user-redirect-page"
                onClick={() => {
                  setUserGameId("");
                }}
              >
                <Index.Box className="user-flex-menu">
                  <Index.Box className="user-icon-list">
                    <>
                      <img
                        src={PageIndex.Png.term_condition}
                        alt="Terms and Conditions"
                      />
                    </>
                  </Index.Box>
                  <Index.Typography
                    component="p"
                    variant="p"
                    className="sidebar-user-title"
                  >
                    Terms and Conditions
                  </Index.Typography>
                </Index.Box>
              </Link>
            </Index.ListItem>
            <Index.ListItem
              className={`term-condition listitem-user-inner ${
                selectedVal === "Privacy Policy" ? "active" : ""
              }`}
              onClick={() => {
                window.innerWidth <= 768 && removeClass();
                setSelectedVal("Privacy Policy");
                navigate("/user/privacy-policy");
              }}
            >
              <Link
                className="inner-user-redirect-page"
                onClick={() => {
                  setUserGameId("");
                }}
              >
                <Index.Box className="user-flex-menu">
                  <Index.Box className="user-icon-list">
                    <>
                      <img
                        src={PageIndex.Png.privacy_policy}
                        alt="Privacy Policy"
                      />
                    </>
                  </Index.Box>
                  <Index.Typography
                    component="p"
                    variant="p"
                    className="sidebar-user-title"
                  >
                    Privacy Policy
                  </Index.Typography>
                </Index.Box>
              </Link>
            </Index.ListItem>

            {/* <Index.ListItem className="listitem-user-inner desktop-hidden">
              <Link
                className="inner-user-redirect-page"
                onClick={() => handleSignOutUser()}
              >
                <Index.Box className="user-flex-menu">
                  <Index.Box className="user-icon-list">
                    <img
                      src={PageIndex.Svg.exit}
                      className="none-active-user-icon"
                      alt="home"
                    />
                  </Index.Box>
                  <Index.Typography
                    component="p"
                    variant="p"
                    className="sidebar-user-title sign-out-color"
                  >
                    Sign out
                  </Index.Typography>
                </Index.Box>
              </Link>
            </Index.ListItem> */}
          </Index.List>
        </Index.Box>
        <Index.Box className="user-sidebar-owl-carousel">
          <Index.OwlCarousel
            className="owl-theme owl-slider-main-content"
            loop
            margin={10}
            nav={false}
            dots={true}
            autoplay={true}
            autoplayTimeout={3000}
            responsive={sidebarslider.sidebarslider}
            items={1}
          >
            <div class="item">
              <Index.Box className="sidebar-owl-main">
                <Index.Box className="img-card-sidebar">
                  <img
                    src={PageIndex.Png.sidebarowl}
                    className="sidebar-card-img-inner"
                    alt="sidebar-card"
                  />
                </Index.Box>
                <Index.Box className="owl-bg-sidebar">
                  <Index.Box className="pd-owl-sidebar">
                    <Index.Box className="slider-bg-details">
                      <Index.Typography
                        component="h4"
                        variant="h4"
                        className="community-title-slider"
                      >
                        Community Betting
                      </Index.Typography>
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="community-details-slider"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </div>
            <div class="item">
              <Index.Box className="sidebar-owl-main">
                <Index.Box className="img-card-sidebar">
                  <img
                    src={PagesIndex.Png.sidebarowl}
                    className="sidebar-card-img-inner"
                    alt="sidebar-card-one"
                  />
                </Index.Box>
                <Index.Box className="owl-bg-sidebar">
                  <Index.Box className="pd-owl-sidebar">
                    <Index.Box className="slider-bg-details">
                      <Index.Typography
                        component="h4"
                        variant="h4"
                        className="community-title-slider"
                      >
                        Community Betting
                      </Index.Typography>
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="community-details-slider"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </div>
            <div class="item">
              <Index.Box className="sidebar-owl-main">
                <Index.Box className="img-card-sidebar">
                  <img
                    src={PageIndex.Png.sidebarowl}
                    className="sidebar-card-img-inner"
                    alt="sidebar-card-two"
                  />
                </Index.Box>
                <Index.Box className="owl-bg-sidebar">
                  <Index.Box className="pd-owl-sidebar">
                    <Index.Box className="slider-bg-details">
                      <Index.Typography
                        component="h4"
                        variant="h4"
                        className="community-title-slider"
                      >
                        Community Betting
                      </Index.Typography>
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="community-details-slider"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </div>
            <div class="item">
              <Index.Box className="sidebar-owl-main">
                <Index.Box className="img-card-sidebar">
                  <img
                    src={PageIndex.Png.sidebarowl}
                    className="sidebar-card-img-inner"
                    alt="sidebar-card-three"
                  />
                </Index.Box>
                <Index.Box className="owl-bg-sidebar">
                  <Index.Box className="pd-owl-sidebar">
                    <Index.Box className="slider-bg-details">
                      <Index.Typography
                        component="h4"
                        variant="h4"
                        className="community-title-slider"
                      >
                        Community Betting
                      </Index.Typography>
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="community-details-slider"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </div>
            <div class="item">
              <Index.Box className="sidebar-owl-main">
                <Index.Box className="img-card-sidebar">
                  <img
                    src={PageIndex.Png.sidebarowl}
                    className="sidebar-card-img-inner"
                    alt="sidebar-card-three"
                  />
                </Index.Box>
                <Index.Box className="owl-bg-sidebar">
                  <Index.Box className="pd-owl-sidebar">
                    <Index.Box className="slider-bg-details">
                      <Index.Typography
                        component="h4"
                        variant="h4"
                        className="community-title-slider"
                      >
                        Community Betting
                      </Index.Typography>
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="community-details-slider"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </div>
            <div class="item">
              <Index.Box className="sidebar-owl-main">
                <Index.Box className="img-card-sidebar">
                  <img
                    src={PageIndex.Png.sidebarowl}
                    className="sidebar-card-img-inner"
                    alt="sidebar-card-three"
                  />
                </Index.Box>
                <Index.Box className="owl-bg-sidebar">
                  <Index.Box className="pd-owl-sidebar">
                    <Index.Box className="slider-bg-details">
                      <Index.Typography
                        component="h4"
                        variant="h4"
                        className="community-title-slider"
                      >
                        Community Betting
                      </Index.Typography>
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="community-details-slider"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </div>
          </Index.OwlCarousel>
        </Index.Box>
      </Index.Box>

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
                  {isConnected && totalAmount
                    ? Number(totalAmount)?.toFixed(2)
                    : 0}
                </Index.Typography>
                <Index.Button className="btn-plus-circle-file">
                  <img
                    src={PageIndex.Svg.pluscirclefill}
                    className="pluscirclefill-main"
                    alt="pluscirclefill"
                  />
                </Index.Button>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Modal>

      {/* mobile menu balance end */}
    </>
  );
}
