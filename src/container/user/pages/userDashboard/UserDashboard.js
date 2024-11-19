import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PagesIndex from "../../../pageIndex";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import Loader from "../../../../component/comman/loader/Loader";
import moment from "moment";
import { Rating } from "@mui/material";
import { userGames } from "../../../../redux/user/userReducer";
import { useDispatch } from "react-redux";
import PageIndex from "../../../pageIndex";
import { useNavigate, useLocation } from "react-router-dom";
import CardAndCommunityBetting from "../../../../component/comman/cardAndCommunityBetting/CardAndCommunityBetting";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "start",
  color: theme.palette.text.secondary,
}));
const ratingModalStyle = {
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
};
const initialRatingValue = { gameId: "", gameName: "", rating: "" };
function UserDashboard() {
  const [
    open,
    setOpen,
    gameRules,
    setGameRules,
    userGameId,
    setUserGameId,
    date,
    setDate,
    gameRuleError,
    setGameRuleError,
    totalAmount,
    setTotalAmount,
    openModal,
    setOpenModal,
    walletAddress,
    setWalletAddress,
    openDeposit,
    setOpenDeposit,
    handleOpen,
    // openChatDrawer,
    // setOpenChatDrawer,
    socket,
    allLiveBets,
    setAllLiveBets,
  ] = useOutletContext();
  console.log("allLiveBets: ", allLiveBets);

  const [banner, setBanner] = useState();
  const { isConnected } = useWeb3ModalAccount();

  // const handleOpenSignIn = () => {
  //   setOpenSignIn(true);
  //   setReferCode("");
  // };

  const navigate = useNavigate();
  const [imageList, setImageList] = useState([]);
  // console.log("hello", imageList)
  const [selectedSecond, setSelectedSecond] = useState();
  const [copyTextHide, setCopyTextHide] = useState(true);
  const [weeklyPlayer, setWeeklyPlayer] = useState([]);
  const [monthlyPlayer, setMonthlyPlayer] = useState([]);
  const [gameRatings, setGameRatings] = useState({});
  const [newGameRating, setNewGameRating] = useState(initialRatingValue);
  const [openConfirmRating, setOpenConfirmRating] = useState(false);
  const hideReferral = (originalString) => {
    const ReferralLength = Math?.max(originalString?.length - 4, 0);
    const hideReferral =
      originalString?.slice(0, 2) +
      "*".repeat(ReferralLength) +
      originalString?.slice(-2);
    return hideReferral;
  };
  const referralCode = useSelector(
    (state) => state?.UserReducer?.userData?.referralCode
  );

  console.log(referralCode, 98);
  const hideCode = hideReferral(referralCode);
  const location = useLocation();
  const referCode = `${window.location.protocol}//${window.location.host}/user?referralCode=${hideCode}`;
  const originalReferCode = `${window.location.protocol}//${window.location.host}/user?referralCode=${referralCode}`;

  let newReferCode;
  // function copy() {
  //   setCopyTextHide(false);
  //   const el = document.createElement("input");

  //   // Use the appropriate variable for the text you want to copy
  //   const textToCopy = newReferCode || originalReferCode;

  //   console.log(textToCopy, 112);
  //   el.value = textToCopy;
  //   document.body.appendChild(el);
  //   el.select();
  //   document.execCommand("copy");
  //   document.body.removeChild(el);

  //   // Check if the text being copied is different from the original
  //   if (textToCopy !== originalReferCode) {
  //     // Set setCopyTextHide to true after copying another text
  //     setCopyTextHide(true);
  //   }

  //   toast.success("Referral link copied successfully", {
  //     toastId: "customId",
  //   });

  //   setTimeout(() => {
  //     setCopyTextHide(true); // Revert back to "Copy Link" after 3 seconds
  //   }, 3000);
  // }

  function copyField(value) {
    setCopyTextHide(false);
    console.log(value, 154);
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success("Referral link copied successfully", {
          toastId: "customId",
        });
        setTimeout(() => {
          setCopyTextHide(true);
        }, 1000);
      })
      .catch((error) => {
        toast.error(`Failed to copy to clipboard!`, {
          toastId: "customId",
        });
        setCopyTextHide(true);
      });
  }
  const loading = useSelector((state) => state?.UserReducer?.loading);

  const userGetBanner = async () => {
    await DataService.get(Api.ADMIN_BANNER)
      .then((res) => {
        setBanner(res?.data?.data.map((e) => e?.bannerImage));
      })
      .catch((error) => {});
  };

  const userGameList = async () => {
    await DataService.get(Api.User.USER_GAMES)
      .then((res) => {
        setImageList(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGameRating = async (gameId, name) => {
    await DataService.get(Api.User.USER_RATING + "/" + gameId)
      .then((res) => {
        setGameRatings((prev) => ({
          ...prev,
          [name]: res?.data?.data.ratingAverage,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log({ gameRatings });
  const giveRating = async () => {
    try {
      const res = await DataService.post(
        Api.User.GIVE_GAME_RATING,
        newGameRating
      );
      if (res?.data?.status === 200 || res?.data?.status === 201) {
        // toast.success(res?.data?.message);
        await getGameRating(newGameRating?.gameId, newGameRating?.gameName);
        closeConfirmRatingModal();
      }
    } catch (e) {
      toast.error(
        e.response?.data?.message ? e.response?.data?.message : e.message
      );
    }
  };

  console.log("136 rating:", gameRatings);
  useEffect(() => {
    if (imageList?.length) {
      for (let game of imageList) {
        getGameRating(game._id, game.gameName);
      }
    }
  }, [imageList]);
  const handleTopWeeklyPlayer = async () => {
    await DataService.get(Api.User.TOP_WEEKLY_PLAYER)
      .then((res) => {
        setWeeklyPlayer(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleTopAllPlayer = async () => {
    await DataService.get(Api.User.TOP_ALL_PLAYER)
      .then((res) => {
        setMonthlyPlayer(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    userGetBanner();
    handleTopWeeklyPlayer();
    handleTopAllPlayer();
  }, []);

  useEffect(() => {
    userGameList();
  }, []);

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
  const token = localStorage.getItem("token");
  const handlegameListimge = (id, ele) => {
    console.log("151");
    if (!token) {
      setOpen(true);
      return;
    }
    localStorage.setItem("userGameId", JSON.stringify(ele));
    if (referralCode) {
      setDate(ele);
      var d1 = new Date();
      const Today = moment(d1).format("YYYY/MM/DD ");
      const startDate = moment(ele?.gameTimeFrom).format("YYYY/MM/DD ");
      console.log(ele, "ele");
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

      var expected_endtimeForColorGame = moment(startDateTime).add(
        Number(ele?.gameSecond[2]),
        "seconds"
      );
      console.log(ele?.gameSecond[2], "seconds");
      // if (walletAddress) {
      if (ele?.gameName == "Number Betting") {
        console.log(currentDateTime, startDateTime, "start", endDateTime);
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
          }
          // navigate("/user/number-betting-gamerules", {
          //      state: {
          //          ele: ele,
          //         },
          //       });
          //        setOpenModal(false);
        } else {
          setOpenModal(true);
        }
      } else if (ele?.gameName === "Color Prediction") {
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
            setOpenModal(true);
          }
        } else {
          setOpenModal(true);
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
          }
        } else {
          setOpenModal(true);
        }
      } else if (ele?.gameName == "Community Betting") {
        if (
          currentDateTime >= startDateTime &&
          currentDateTime <= endDateTime
        ) {
          if (expected_endtime >= currentDateTime || ele?.isRepeat) {
            console.log(
              expected_endtime,
              currentDateTime,
              expected_endtime >= currentDateTime,
              "226"
            );
            navigate("/user/community-betting-gamerules", {
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
      } else if (ele?.gameName == "Penalty Betting") {
        localStorage.setItem("userGameId", JSON.stringify(ele));
        if (
          currentDateTime >= startDateTime &&
          currentDateTime <= endDateTime
        ) {
          if (expected_endtime >= currentDateTime || ele?.isRepeat) {
            console.log(
              expected_endtime,
              currentDateTime,
              expected_endtime >= currentDateTime,
              "226"
            );
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
      } else if (ele?.gameName == "Card Betting") {
        localStorage.setItem("userGameId", JSON.stringify(ele));
        if (
          currentDateTime >= startDateTime &&
          currentDateTime <= endDateTime
        ) {
          if (expected_endtime >= currentDateTime || ele?.isRepeat) {
            console.log(
              expected_endtime,
              currentDateTime,
              expected_endtime >= currentDateTime,
              "226"
            );
            navigate("/user/card-betting-gamerules", {
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
      }
      // } else {
      //   if (!walletAddress) {
      //     toast.error("Please connect wallet", {
      //       toastId: "customId",
      //     });
      //   } else {
      //     setOpen(referralCode ? false : true);
      //   }
      // }
    }
  };

  const [ourgameslider, setslider] = useState({
    nav: true,
    ourgameslider: {
      0: {
        items: 1,
        center: true,
        margin: 0,
      },
      768: {
        items: 3,
      },
      1024: {
        items: 4,
      },
      1200: {
        items: 4,
      },
      1600: {
        items: 4,
      },
    },
  });

  const [bannerslider, setbannerslider] = useState({
    bannerslider: {
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

  const opengamedots = Boolean(selectedSecond);
  const handleClickgamedots = (event) => {
    setSelectedSecond(event.currentTarget);
  };
  const handleClosegamedots = () => {
    setSelectedSecond(null);
  };

  const handleChange = (event) => {
    navigate("/user/three-color-betting", {
      state: {
        selectedSecond: event.target.value,
      },
    });
  };

  const handleClickGameData = (ele) => {
    localStorage.setItem("userGameId", JSON.stringify(ele));
  };
  const handleNavigate = (gameName) => {
    // setSelectedVal(ele?.gameName);
    const ele = imageList?.find((game) => game?.gameName === gameName);
    localStorage.setItem("userGameId", JSON.stringify(ele));
    // setUserGameId("");
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
      // setUserGameId(ele);
      // if (walletAddress) {
      localStorage.setItem("userGameId", JSON.stringify(ele));
      if (currentDateTime >= startDateTime && currentDateTime <= endDateTime) {
        if (expected_endtime >= currentDateTime || ele?.isRepeat) {
          navigate("/user/three-color-gamerules", {
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
      // } else {
      //   toast.error("Please connect wallet", {
      //     toastId: "customId",
      //   });
      // }
    } else {
      navigate("/user", { state: { message: "loginRequired" } });
    }
  };
  const closeConfirmRatingModal = () => {
    setNewGameRating(initialRatingValue);
    setOpenConfirmRating(false);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Index.Box className="dashbaord-user-main-page">
          <Index.Box className="dasboard-flex-user-main">
            <Index.Box className="left-dashboard-main-user">
              <Index.Box className="live-game-bg-main">
                <Index.Box className="live-game-pd-content">
                  <Index.Box className="live-game-flex-content">
                    <Index.Box className="livegame-col1">
                      <Index.Box className="live-game-text-details">
                        <Index.Typography
                          component="h5"
                          variant="h5"
                          className="live-game-title"
                        >
                          Live Games
                        </Index.Typography>
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="live-game-details-play"
                        >
                          6548 Playing
                        </Index.Typography>
                      </Index.Box>
                      <Index.Box className="number-betting-text-details">
                        <Index.Typography
                          component="h5"
                          variant="h5"
                          className="live-game-title"
                        >
                          Color Prediction
                        </Index.Typography>
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="live-game-details-play"
                        >
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s.
                        </Index.Typography>
                      </Index.Box>
                      <Index.Box className="play-now-live-btn">
                        <Index.Button
                          className="play-now-white-btn"
                          // onClick={() => setOpen(referralCode ? false : true)}
                          onClick={() => handleNavigate("Color Prediction")}
                        >
                          PLAY NOW
                        </Index.Button>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box className="livegame-col2">
                      <Index.Box className="right-live-game-img">
                        <img
                          src={PagesIndex.Jpg.casino}
                          className="casino-banner"
                          alt="casino"
                        />
                      </Index.Box>
                      {/* <Index.Box className="live-game-card-main-content">
              <Index.Box className="live-game-card">
                <Index.Box className="live-game-pd-card">
                  <Index.Box className="live-user-game-img">
                    <img src={PagesIndex.Png.liveuserone} />
                    <Index.Box className="live-user-game-num">
                      <Index.Typography component='p' variant='p' className="live-game-number-title">2</Index.Typography>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box className="live-game-user-details">
                    <Index.Typography component='h6' variant='h6' className='user-game-title'>Rocky</Index.Typography>
                    <Index.Typography component='p' variant='p' className='user-game-title-id'>@rocky6548</Index.Typography>
                    <Index.Box className="game-id-main-show">
                      <img src={PagesIndex.Svg.gamecontroller} className='game-controller' alt="controller" />
                      <span className="span-game-controller">9876541</span>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
              <Index.Box className="live-game-card">
                <Index.Box className="live-game-pd-card">
                  <Index.Box className="live-user-game-img user-scale-main">
                    <img src={PagesIndex.Png.liveusertwo} />
                    <Index.Box className="live-user-game-num">
                      <Index.Typography component='p' variant='p' className="live-game-number-title">1</Index.Typography>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box className="live-game-user-details">
                    <Index.Typography component='h6' variant='h6' className='user-game-title'>Sania Kapoor</Index.Typography>
                    <Index.Typography component='p' variant='p' className='user-game-title-id'>@sania_kapoor_12</Index.Typography>
                    <Index.Box className="game-id-main-show">
                      <img src={PagesIndex.Svg.gamecontroller} className='game-controller' alt="controller" />
                      <span className="span-game-controller">9876541</span>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
              <Index.Box className="live-game-card">
                <Index.Box className="live-game-pd-card">
                  <Index.Box className="live-user-game-img">
                    <img src={PagesIndex.Png.liveuserthree} />
                    <Index.Box className="live-user-game-num">
                      <Index.Typography component='p' variant='p' className="live-game-number-title">3</Index.Typography>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box className="live-game-user-details">
                    <Index.Typography component='h6' variant='h6' className='user-game-title'>Mansz</Index.Typography>
                    <Index.Typography component='p' variant='p' className='user-game-title-id'>@manxx99</Index.Typography>
                    <Index.Box className="game-id-main-show">
                      <img src={PagesIndex.Svg.gamecontroller} className='game-controller' alt="controller" />
                      <span className="span-game-controller">9876541</span>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box> */}
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>

              {/*  */}
              <Index.Box className="deposit-bonus-main-content desktop-banner-refferal">
                <Index.Box className="deposit-bonus-box col1-dash ">
                  {banner?.length && (
                    <Index.OwlCarousel
                      className="owl-theme owl-slider-main-content banner-slider-details"
                      loop
                      margin={10}
                      nav={true}
                      dots={false}
                      autoplay={true}
                      startPosition={0}
                      autoplayTimeout={10000}
                      responsive={bannerslider.bannerslider}
                      navText={[
                        // "<img src=" + PagesIndex.Svg.leftarrow + " >",
                        // "<img src=" + PagesIndex.Svg.leftarrow + " >",
                        `<img src=${PagesIndex.Svg.leftarrow}  alt="leftarrow"/>`,
                        `<img src=${PagesIndex.Svg.leftarrow} alt="rightarrow"/>`,
                      ]}
                      items={banner?.length}
                    >
                      {banner?.map((ele) => {
                        return (
                          <div class="item">
                            <img
                              src={
                                ele
                                  ? process.env.REACT_APP_IMG + ele[0]
                                  : PagesIndex.Png.deposit
                              }
                              className="deposit"
                              alt="Image not found"
                            />
                          </div>
                        );
                      })}
                    </Index.OwlCarousel>
                  )}
                </Index.Box>
                {referralCode ? (
                  <Index.Box className="deposit-bonus-box col2-dash">
                    <Index.Box className="refrral-details-user-dash">
                      <Index.Box className="copy-hash-id-flex">
                        <Index.Box className="form-control-details-auth">
                          <Index.Box className="icon-position-rel">
                            <Index.TextField
                              className="form-control custom-auth-user-control "
                              value={referralCode ? referCode : ""}
                            />
                          </Index.Box>
                        </Index.Box>
                        <Index.Box className="referral-link-title">
                          <Index.FormHelperText className="title-label-comman-user">
                            Referral Link
                          </Index.FormHelperText>
                        </Index.Box>
                        <Index.Box className="connect-wallet-btn-main copy-link-btn-dash ">
                          <Index.Button
                            className="connect-btn-main copy-icon-btn"
                            // onClick={copy}
                            onClick={(e) => {
                              copyField(originalReferCode);
                            }}
                          >
                            {copyTextHide ? (
                              <span> Copy Link</span>
                            ) : (
                              <span>Copied</span>
                            )}
                            {/* <img src={PagesIndex.Svg.copyicon} className="copyicon-img" alt="copy-icon" /> */}
                          </Index.Button>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                ) : (
                  ""
                )}
              </Index.Box>
              {/*  */}

              {/*  */}
              <Index.Box className="our-game-section-owl">
                <Index.Box className="our-game-title-details">
                  <Index.Typography
                    component="h5"
                    variant="h5"
                    className="game-title-our"
                  >
                    Trending Games
                  </Index.Typography>
                </Index.Box>
                {/* game card on mobile */}
                <Index.Box className="mobile-our-game-show">
                  <Index.Grid
                    container
                    spacing={3}
                    className="align-center-contenr"
                  >
                    {imageList?.map((ele, index) => {
                      if (ele?.isActive) {
                        return (
                          <Index.Grid item xs={6} sm={6} md={6}>
                            <Index.Box className="card-our-game-main">
                              <Index.Box className="card-game-our-pd">
                                <Index.Box className="our-game-img-content">
                                  <img
                                    src={
                                      ele
                                        ? process.env.REACT_APP_IMG +
                                          ele?.gameImage
                                        : PagesIndex.Png.ourgameone
                                    }
                                    className="our-game-bg"
                                    alt="our-game-content"
                                    onClick={() => {
                                      handlegameListimge(ele?._id, ele);
                                    }}
                                  />
                                </Index.Box>
                                <Index.Box className="our-game-details">
                                  <Index.Box
                                    className="flex-justify-game"
                                    onClick={() =>
                                      handlegameListimge(ele?._id, ele)
                                    }
                                  >
                                    <Index.Typography
                                      component="h6"
                                      variant="h6"
                                      className="number-betting"
                                    >
                                      {ele?.gameName}
                                    </Index.Typography>
                                  </Index.Box>

                                  <Index.Box className="star-list-content">
                                    <Index.Box className="flex-star-game">
                                      <Rating
                                        name={ele?.gameName}
                                        // value={ele?.ratingAverage}
                                        value={gameRatings[ele?.gameName] || 1}
                                        size="small"
                                        precision={0.5}
                                        className="star-game"
                                        onChange={(e, newValue) => {
                                          // e.stopPropagation();
                                          if (!token) {
                                            setOpen(true);
                                            return;
                                          }
                                          setNewGameRating({
                                            gameId: ele?._id,
                                            gameName: ele?.gameName,
                                            rating: newValue,
                                          });
                                          setOpenConfirmRating(true);
                                        }}
                                      />
                                    </Index.Box>
                                  </Index.Box>
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Grid>
                        );
                      }
                    })}
                  </Index.Grid>
                </Index.Box>
                {/* game card on desktop */}
                <Index.Box className="desk-our-game-show">
                  <Index.Box className="our-game-carousel">
                    {imageList?.length && (
                      <Index.OwlCarousel
                        className="owl-theme owl-slider-main-content our-game-slider"
                        loop={false}
                        dots={false}
                        nav={true}
                        autoplay={false}
                        responsive={ourgameslider.ourgameslider}
                        startPosition={0}
                        navText={[
                          `<img src=${PagesIndex.Svg.leftarrow}  alt="leftarrow"/>/>`,
                          `<img src=${PagesIndex.Svg.leftarrow}  alt="rightarrow"/>/>`,
                        ]}
                        margin={21}
                        onClick={() => setOpen(referralCode ? false : true)}
                        items={imageList?.length}
                      >
                        {imageList?.map((ele, index) => {
                          if (ele?.isActive) {
                            return (
                              <div class="item">
                                <Index.Box className="card-our-game-main">
                                  <Index.Box className="card-game-our-pd">
                                    <Index.Box className="our-game-img-content">
                                      <img
                                        src={
                                          ele
                                            ? process.env.REACT_APP_IMG +
                                              ele?.gameImage
                                            : PagesIndex.Png.ourgameone
                                        }
                                        className="our-game-bg"
                                        alt="our-game-content"
                                        onClick={() => {
                                          handlegameListimge(ele?._id, ele);
                                        }}
                                      />
                                    </Index.Box>
                                    <Index.Box className="our-game-details">
                                      <Index.Box
                                        className="flex-justify-game"
                                        onClick={() =>
                                          handlegameListimge(ele?._id, ele)
                                        }
                                      >
                                        <Index.Typography
                                          component="h6"
                                          variant="h6"
                                          className="number-betting"
                                        >
                                          {ele?.gameName}
                                        </Index.Typography>
                                      </Index.Box>

                                      <Index.Box className="star-list-content">
                                        {/* rating box */}
                                        <Index.Box className="flex-star-game">
                                          <Rating
                                            name={ele?.gameName}
                                            // value={ele?.ratingAverage}
                                            value={
                                              gameRatings[ele?.gameName] || 1
                                            }
                                            size="small"
                                            precision={0.5}
                                            className="star-game"
                                            // readOnly
                                            onChange={(e, newValue) => {
                                              // e.stopPropagation();
                                              if (!token) {
                                                setOpen(true);
                                                return;
                                              }
                                              setNewGameRating({
                                                gameId: ele?._id,
                                                gameName: ele?.gameName,
                                                rating: newValue,
                                              });
                                              setOpenConfirmRating(true);
                                            }}
                                          />
                                          {/* <Index.Typography
                                            component="p"
                                            variant="p"
                                            className="review-game-main"
                                          >

                                            {gameRatings[ele?.gameName] &&
                                              `(${gameRatings[ele?.gameName]})`}
                                          </Index.Typography> */}
                                          {/* {ele?.ratingAverage !== 0 &&
                                              `(${ele?.ratingAverage})`} */}
                                        </Index.Box>
                                      </Index.Box>
                                      <Index.Box className="our-game-details">
                                        <Index.Typography
                                          component="p"
                                          variant="p"
                                          className="game-details-content"
                                        >
                                          {ele?.description}
                                        </Index.Typography>
                                      </Index.Box>
                                    </Index.Box>
                                  </Index.Box>
                                </Index.Box>
                              </div>
                            );
                          }
                        })}
                      </Index.OwlCarousel>
                    )}
                  </Index.Box>
                </Index.Box>
              </Index.Box>
              <Index.Box className="deposit-bonus-main-content mobile-banner-refferal">
                <Index.Box className="deposit-bonus-box col1-dash ">
                  {banner?.length && (
                    <Index.OwlCarousel
                      className="owl-theme owl-slider-main-content banner-slider-details"
                      loop
                      margin={10}
                      nav={true}
                      dots={false}
                      autoplay={true}
                      startPosition={0}
                      autoplayTimeout={10000}
                      responsive={bannerslider.bannerslider}
                      navText={[
                        // "<img src=" + PagesIndex.Svg.leftarrow + " >",
                        // "<img src=" + PagesIndex.Svg.leftarrow + " >",
                        `<img src=${PagesIndex.Svg.leftarrow}  alt="leftarrow"/>`,
                        `<img src=${PagesIndex.Svg.leftarrow} alt="rightarrow"/>`,
                      ]}
                      items={banner?.length}
                    >
                      {banner?.map((ele) => {
                        return (
                          <div class="item">
                            <img
                              src={
                                ele
                                  ? process.env.REACT_APP_IMG + ele[0]
                                  : PagesIndex.Png.deposit
                              }
                              className="deposit"
                              alt="Image not found"
                            />
                          </div>
                        );
                      })}
                    </Index.OwlCarousel>
                  )}
                </Index.Box>
                {referralCode ? (
                  <Index.Box className="deposit-bonus-box col2-dash">
                    <Index.Box className="refrral-details-user-dash">
                      <Index.Box className="copy-hash-id-flex">
                        <Index.Box className="form-control-details-auth">
                          <Index.Box className="icon-position-rel">
                            <Index.TextField
                              className="form-control custom-auth-user-control "
                              value={referralCode ? referCode : ""}
                            />
                          </Index.Box>
                        </Index.Box>
                        <Index.Box className="referral-link-title">
                          <Index.FormHelperText className="title-label-comman-user">
                            Referral Link
                          </Index.FormHelperText>
                        </Index.Box>
                        <Index.Box className="connect-wallet-btn-main copy-link-btn-dash ">
                          <Index.Button
                            className="connect-btn-main copy-icon-btn"
                            // onClick={copy}
                            onClick={(e) => {
                              copyField(originalReferCode);
                            }}
                          >
                            {copyTextHide ? (
                              <span> Copy Link</span>
                            ) : (
                              <span>Copied</span>
                            )}
                            {/* <img src={PagesIndex.Svg.copyicon} className="copyicon-img" alt="copy-icon" /> */}
                          </Index.Button>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                ) : (
                  ""
                )}
              </Index.Box>

              <Index.Box className="top-weekly-bottom-list">
                <Index.Box
                  sx={{ width: 1 }}
                  className="grid-main grid-top-weekly"
                >
                  <Index.Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap={{ xs: 0, sm: 0, md: 0, lg: 0 }}
                    className="grid-inner-weekly"
                  >
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 6",
                        lg: "span 6",
                      }}
                      className="grid-column"
                    >
                      <Item className="grid-item">
                        <PagesIndex.TopWeeklyPlayer
                          type={"Weekly"}
                          data={weeklyPlayer}
                        />
                      </Item>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 6",
                        lg: "span 6",
                      }}
                      className="grid-column"
                    >
                      <Item className="grid-item">
                        <Index.Box className="header-logo-box">
                          <PagesIndex.TopWeeklyPlayer
                            type={"Monthly"}
                            data={monthlyPlayer}
                          />
                        </Index.Box>
                      </Item>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
              {/*  */}

              {/*  */}
              <Index.Box className="live-beats-main-table">
                <Index.Box className="live-beat-card-bg">
                  <Index.Box className="live-beat-padding">
                    <Index.Box className="live-beat-details">
                      <Index.Typography
                        component="h6"
                        variant="h6"
                        className="live-beat-title"
                      >
                        Live Bets
                      </Index.Typography>
                    </Index.Box>
                    <Index.TableContainer className="table-container-livebeat">
                      <Index.Table
                        aria-label="simple table"
                        className="table-livebeat"
                      >
                        <Index.TableHead className="table-head-livebeat">
                          <Index.TableRow className="table-row-livebeat">
                            <Index.TableCell className="table-th-livebeat">
                              Game
                            </Index.TableCell>
                            <Index.TableCell className="table-th-livebeat">
                              Name
                            </Index.TableCell>
                            <Index.TableCell className="table-th-livebeat">
                              Status
                            </Index.TableCell>
                            <Index.TableCell className="table-th-livebeat">
                              Bet amount
                            </Index.TableCell>
                          </Index.TableRow>
                        </Index.TableHead>
                        <Index.TableBody>
                          {allLiveBets?.map((liveBet) => (
                            <Index.TableRow
                              className="table-tr-livebeat"
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <Index.TableCell
                                scope="row"
                                className="table-td-livebeat"
                              >
                                <Index.Box className="flex-league-main">
                                  <img
                                    src={
                                      liveBet?.gameId?.gameImage
                                        ? process.env.REACT_APP_IMG +
                                          liveBet?.gameId?.gameImage
                                        : PagesIndex.Png.ourgameone
                                    }
                                    className="league-user"
                                    alt="league-user"
                                  />
                                  <Index.Typography
                                    component="p"
                                    variant="p"
                                    className="details-live-beat"
                                  >
                                    {liveBet?.gameId?.gameName}
                                  </Index.Typography>
                                </Index.Box>
                              </Index.TableCell>
                              <Index.TableCell className="table-td-livebeat">
                                <Index.Box className="flex-league-main-name">
                                  <img
                                    src={
                                      liveBet?.userId?.profile
                                        ? process.env.REACT_APP_IMG +
                                          // ? "http://192.168.1.3:3032/api/images/" +
                                          liveBet?.userId?.profile
                                        : PagesIndex.Png.leagueuser
                                    }
                                    className="league-user-img"
                                    alt="league-user"
                                  />
                                  <Index.Box className="league-id-details">
                                    <Index.Typography
                                      component="p"
                                      variant="p"
                                      className="title-user-name"
                                    >
                                      {liveBet?.userId?.fullName}
                                    </Index.Typography>
                                    <Index.Typography
                                      component="p"
                                      variant="p"
                                      className="title-user-idname"
                                    ></Index.Typography>
                                  </Index.Box>
                                </Index.Box>
                              </Index.TableCell>
                              <Index.TableCell className="table-td-livebeat">
                                <Index.Typography
                                  className="win-text-livebeat"
                                  component="p"
                                  variant="p"
                                >
                                  {liveBet?.status === "pending"
                                    ? "Pending"
                                    : liveBet?.isWin
                                    ? "Win"
                                    : "Loss"}
                                </Index.Typography>
                              </Index.TableCell>
                              <Index.TableCell className="table-td-livebeat">
                                <Index.Typography
                                  className="win-text-score"
                                  component="p"
                                  variant="p"
                                >
                                  {liveBet?.betAmount}
                                </Index.Typography>
                              </Index.TableCell>
                            </Index.TableRow>
                          ))}
                          {/* <Index.TableRow
                            className="table-tr-livebeat"
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <Index.TableCell
                              scope="row"
                              className="table-td-livebeat"
                            >
                              <Index.Box className="flex-league-main">
                                <img
                                  src={PagesIndex.Png.ourgametwo}
                                  className="league-user"
                                  alt="league-user"
                                />
                                <Index.Typography
                                  component="p"
                                  variant="p"
                                  className="details-live-beat"
                                >
                                  {" "}
                                  2 color betting
                                </Index.Typography>
                              </Index.Box>
                            </Index.TableCell>
                            <Index.TableCell className="table-td-livebeat">
                              <Index.Box className="flex-league-main-name">
                                <img
                                  src={PagesIndex.Png.leagueuser}
                                  className="league-user-img"
                                  alt="league-user"
                                />
                                <Index.Box className="league-id-details">
                                  <Index.Typography
                                    component="p"
                                    variant="p"
                                    className="title-user-name"
                                  >
                                    Fuerza Regia
                                  </Index.Typography>
                                  <Index.Typography
                                    component="p"
                                    variant="p"
                                    className="title-user-idname"
                                  >
                                    {" "}
                                    @fuerza_regia_aa9
                                  </Index.Typography>
                                </Index.Box>
                              </Index.Box>
                            </Index.TableCell>
                            <Index.TableCell className="table-td-livebeat">
                              <Index.Typography
                                className="win-text-livebeat"
                                component="p"
                                variant="p"
                              >
                                Win
                              </Index.Typography>
                            </Index.TableCell>
                            <Index.TableCell className="table-td-livebeat">
                              <Index.Typography
                                className="win-text-score"
                                component="p"
                                variant="p"
                              >
                                #12000
                              </Index.Typography>
                            </Index.TableCell>
                          </Index.TableRow>
                          <Index.TableRow
                            className="table-tr-livebeat"
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <Index.TableCell
                              scope="row"
                              className="table-td-livebeat"
                            >
                              <Index.Box className="flex-league-main">
                                <img
                                  src={PagesIndex.Png.ourgametwo}
                                  className="league-user"
                                  alt="league-user"
                                />
                                <Index.Typography
                                  component="p"
                                  variant="p"
                                  className="details-live-beat"
                                >
                                  {" "}
                                  2 color betting
                                </Index.Typography>
                              </Index.Box>
                            </Index.TableCell>
                            <Index.TableCell className="table-td-livebeat">
                              <Index.Box className="flex-league-main-name">
                                <img
                                  src={PagesIndex.Png.leagueuser}
                                  className="league-user-img"
                                  alt="league-user"
                                />
                                <Index.Box className="league-id-details">
                                  <Index.Typography
                                    component="p"
                                    variant="p"
                                    className="title-user-name"
                                  >
                                    Fuerza Regia
                                  </Index.Typography>
                                  <Index.Typography
                                    component="p"
                                    variant="p"
                                    className="title-user-idname"
                                  >
                                    {" "}
                                    @fuerza_regia_aa9
                                  </Index.Typography>
                                </Index.Box>
                              </Index.Box>
                            </Index.TableCell>
                            <Index.TableCell className="table-td-livebeat">
                              <Index.Typography
                                className="win-text-livebeat"
                                component="p"
                                variant="p"
                              >
                                Win
                              </Index.Typography>
                            </Index.TableCell>
                            <Index.TableCell className="table-td-livebeat">
                              <Index.Typography
                                className="win-text-score"
                                component="p"
                                variant="p"
                              >
                                #12000
                              </Index.Typography>
                            </Index.TableCell>
                          </Index.TableRow>
                          <Index.TableRow
                            className="table-tr-livebeat"
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <Index.TableCell
                              scope="row"
                              className="table-td-livebeat"
                            >
                              <Index.Box className="flex-league-main">
                                <img
                                  src={PagesIndex.Png.ourgamethree}
                                  className="league-user"
                                  alt="league-user"
                                />
                                <Index.Typography
                                  component="p"
                                  variant="p"
                                  className="details-live-beat"
                                >
                                  {" "}
                                  Number betting
                                </Index.Typography>
                              </Index.Box>
                            </Index.TableCell>
                            <Index.TableCell className="table-td-livebeat">
                              <Index.Box className="flex-league-main-name">
                                <img
                                  src={PagesIndex.Png.leagueuser}
                                  className="league-user-img"
                                  alt="league-user"
                                />
                                <Index.Box className="league-id-details">
                                  <Index.Typography
                                    component="p"
                                    variant="p"
                                    className="title-user-name"
                                  >
                                    Fuerza Regia
                                  </Index.Typography>
                                  <Index.Typography
                                    component="p"
                                    variant="p"
                                    className="title-user-idname"
                                  >
                                    {" "}
                                    @fuerza_regia_aa9
                                  </Index.Typography>
                                </Index.Box>
                              </Index.Box>
                            </Index.TableCell>
                            <Index.TableCell className="table-td-livebeat">
                              <Index.Typography
                                className="win-text-livebeat"
                                component="p"
                                variant="p"
                              >
                                Win
                              </Index.Typography>
                            </Index.TableCell>
                            <Index.TableCell className="table-td-livebeat">
                              <Index.Typography
                                className="win-text-score"
                                component="p"
                                variant="p"
                              >
                                #12000
                              </Index.Typography>
                            </Index.TableCell>
                          </Index.TableRow> */}
                        </Index.TableBody>
                      </Index.Table>
                    </Index.TableContainer>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
              {/*  */}
            </Index.Box>

            {/* <Index.Box
              className={
                !openChatDrawer
                  ? "right-dashboard-main-user header-left-active"
                  : "right-dashboard-main-user"
              }
            >
              <PageIndex.UserChat
                openChatMenu={!openChatDrawer}
                setOpenChatMenu={setOpenChatDrawer}
                setOpen={setOpen}
              />
            </Index.Box> */}

            {/* <CardAndCommunityBetting /> */}

            {/* <Index.Box className="right-dashboard-main-user">

              <Index.Box className="card-betting-list">
                <Index.Box className="card-betting-main">
                  <Index.Box className="betting-img-content">
                    <img
                      src={PagesIndex.Png.bettingone}
                      className="betting-img"
                      alt="betting"
                    />
                  </Index.Box>
                  <Index.Box className="betting-card-bg">
                    <Index.Box className="betting-card-pd">
                      <Index.Typography
                        component="h5"
                        variant="h5"
                        className="betting-title-right"
                      >
                        Card Betting
                      </Index.Typography>
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="betting-details-right"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been
                      </Index.Typography>
                      <Index.Box className="betting-card-btn-comman">
                        <PagesIndex.BlueButton
                          btnLabel="Play Now"
                          className="blue-btn-content"
                          onClick={() => setOpen(referralCode ? false : true)}
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="card-betting-main">
                  <Index.Box className="betting-img-content">
                    <img
                      src={PagesIndex.Png.bettingtwo}
                      className="betting-img"
                      alt="betting"
                    />
                  </Index.Box>
                  <Index.Box className="betting-card-bg">
                    <Index.Box className="betting-card-pd">
                      <Index.Typography
                        component="h5"
                        variant="h5"
                        className="betting-title-right"
                      >
                        Community Betting
                      </Index.Typography>
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="betting-details-right"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been
                      </Index.Typography>
                      <Index.Box className="betting-card-btn-comman">
                        <PagesIndex.BlueButton
                          btnLabel="Play Now"
                          className="blue-btn-content"
                          onClick={() => setOpen(referralCode ? false : true)}
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box> */}
          </Index.Box>
        </Index.Box>
      )}
      <Index.Modal
        open={openConfirmRating}
        onClose={() => {
          closeConfirmRatingModal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details two-color-betting bg-noblur"
      >
        <Index.Box sx={ratingModalStyle} className="modal-comman-inner-style">
          <Index.Box className="modal-cancel-btn">
            <Index.Button className="btn btn-cancel">
              <img
                src={PageIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
                onClick={() => {
                  closeConfirmRatingModal();
                }}
              />
            </Index.Button>
          </Index.Box>
          <Index.Box>
            <Index.Box className="delete-game-data-main">
              <Index.Box display="flex" gap={3} mb="20px">
                <Index.Box className="number-list-details">
                  <Index.Typography
                    className="number-bet-coin are-you-sure-text"
                    component="p"
                    variant="p"
                    pb={0}
                  >
                    {/* {`Rating`} */}
                  </Index.Typography>
                </Index.Box>
                <Index.Box className="flex-star-game">
                  <Rating
                    name={newGameRating.gameName}
                    value={newGameRating.rating}
                    size="small"
                    precision={0.5}
                    className="star-game"
                    readOnly
                    // onChange={(e, newValue) => {
                    //   setNewGameRating((prev)=>({...prev,rating: newValue}));
                    // }}
                  />
                  <Index.Typography
                    component="p"
                    variant="p"
                    className="review-game-main"
                  >
                    {newGameRating?.rating !== 0 && `(${newGameRating.rating})`}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
              <Index.Box className="deleteModel-btna1">
                <Index.Box className="btn-col">
                  <PagesIndex.BlueOutlineButton
                    variant="contained"
                    color="error"
                    btnLabel="Ok"
                    className="outline-blue-btn-content"
                    onClick={() => {
                      giveRating();
                    }}
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Modal>
    </>
  );
}

export default UserDashboard;
