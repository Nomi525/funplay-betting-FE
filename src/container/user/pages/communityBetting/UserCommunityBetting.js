import React, { useState, useEffect, useRef, useMemo } from "react";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { toast } from "react-toastify";
import { Api } from "../../../../config/Api";
import PagesIndex from "../../../pageIndex";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DataService from "../../../../config/DataService";
import { getTotalCoins, userAmount } from "../../../../redux/user/userReducer";
import moment from "moment";

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

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#2e60ea" : "#308fe8",
  },
}));

export default function UserCommunityBetting() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let timeRef = useRef(null);
  const userAmounts = useSelector(
    (state) => state?.UserReducer?.totalCoins?.totalCoin
  );
  const second = location?.state?.selectedSecond;
  const storedValue = localStorage.getItem("userGameId");
  const gameId = JSON.parse(storedValue);

  console.log(gameId, 54);

  const [betAmount, setBeatAmunt] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [showWinnewModal, setShowWinnewModal] = useState(false);
  const [showTimeWinnerModal, setShowTimeWinnerModal] = useState(false);
  const [singleuserList, setSingleUserList] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [loginUserData, setLoginUserData] = useState([]);
  const [alluser, setAlluser] = useState([]);
  const [lastDayWinner, setLastDayWinner] = useState([]);
  const [lastDayWinnerList, setLastDayWinnerList] = useState([]);
  const [battleModal, setBattleModal] = useState(false);

  const [gameTimer, setGameTimer] = useState("");
  const [periodData, setPeriodData] = useState({});
  const [slotsBooked, setSlotsBooked] = useState(0);
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const firstTwentyMyRecords = loginUserData.slice(0, 10);
  const [
    open,
    setOpen,
    popUp,
    setPopUp,
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
    openChatDrawer,
    setOpenChatDrawer,
    socket,
    allLiveBets,
    setAllLiveBets,
  ] = useOutletContext();

  const getSingleData = async () => {
    await DataService.get(Api.User.GET_ALL_GAME_PERIOAD + "/" + gameId?._id)
      .then((res) => {
        setSingleUserList(res?.data?.data);
      })

      .catch((error) => {
        toast.error(error?.data?.message, {
          toastId: "customId",
        });
      });
  };
  const getSlotsBooked = async () => {
    await DataService.post(Api.User.GET_SLOTS_BOOKED_IN_COMMUNITY_BETTING, {
      periodId: periodData?.period,
    })
      .then((res) => {
        setSlotsBooked(res?.data?.data.slotBooked);
        // setSingleUserList(res?.data?.data);
      })

      .catch((error) => {
        toast.error(error?.data?.message, {
          toastId: "customId",
        });
      });
  };

  useEffect(() => {
    if (gameId.maxSlot === slotsBooked) {
      setDisableButtons(true);
    }
  }, [slotsBooked]);

  const handleGetData = async () => {
    await DataService?.get(Api.User.GET_COMMUNITY_WINNER_USER)
      .then((res) => {
        setLastDayWinnerList(res?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., display an error message to the user
      });

    DataService?.get(Api.User.GET_COMMUNITY_LOGIN_USER + "/" + gameId?._id)
      .then((res) => {
        setLoginUserData(res?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., display an error message to the user
      });

    DataService?.get(Api.User.GET_COMMUNITY_DAY_USER + "/" + gameId?._id)
      .then((res) => {
        setLastDayWinner(res?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., display an error message to the user
      });
  };

  useEffect(() => {
    handleGetData();
    getSingleData();
  }, []);

  // const handleOpenBeatModal = (e) => {
  //
  // }

  const handleOpenModal = (e) => {
    if (userAmounts >= e) {
      setBeatAmunt(e);
      setBattleModal(true);
    } else {
      toast.error("balance is insufficient", {
        toastId: "customId",
      });
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState == "visible") {
        getGamePeriod();
      }
    });
  }, []);

  useEffect(() => {
    if (gameId?._id) {
      getGamePeriod();
    }
  }, []);

  const getCountdown = (endtime) => {
    var timeIn24 = moment(endtime, "hh:mm:ss A").format("HH:mm:ss");
    var currentDate = moment().format("DD/MM/YYYY");
    const endDateTime = moment(
      currentDate + " " + timeIn24,
      "DD/MM/YYYY HH:mm:ss"
    ).format("YYYY-MM-DD HH:mm:ss");

    // another date
    var now = moment().format("YYYY-MM-DD HH:mm:ss");
    const momentDate1 = moment(endDateTime, "YYYY-MM-DD HH:mm:ss");
    const momentDate2 = moment(now, "YYYY-MM-DD HH:mm:ss");

    const differenceInMilliseconds = momentDate1.diff(momentDate2);

    // Convert the difference to a duration
    const duration = moment.duration(differenceInMilliseconds);
    console.log(duration, "duration");
    //Get Days and subtract from duration
    var days = duration.days();
    duration.subtract(days, "days");

    //Get hours and subtract from duration
    var hours = duration.hours();
    duration.subtract(hours, "days2");

    //Get Minutes and subtract from duration
    var minutes = duration.minutes();
    duration.subtract(minutes, "minutes");

    //Get seconds
    var seconds = duration.seconds();

    let countDown = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    setTime({
      hours: +hours,
      minutes: +minutes,
      seconds: +seconds,
    });
    if (+hours == 0 && +minutes == 0 && +seconds <= 20) {
      // if (+minutes == 0 && +seconds == 0 && showTimeWinnerModal) {
      //   setShowWinnewModal(true);
      // }
      setDisableButtons(true);
    }
    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      setGameTimer("00:00:00");

      return "00:00:00";
    }
    setGameTimer(countDown);
    return countDown;
  };

  const getGamePeriod = async () => {
    setPeriodData({});
    await DataService?.get(Api.User.GET_GAME_PERIOD + "/" + gameId?._id)
      .then((res) => {
        if (res?.status == 200) {
          setPeriodData(res?.data?.data);
        } else {
          navigate("/user");
          toast.error("Game available soon", {
            toastId: "customId",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error?.response?.status == 400) {
          navigate("/user");
          toast.error("Game available soon", {
            toastId: "customId",
          });
        }
      });
  };

  console.log(periodData?.period, "all2");
  const liveData = async () => {
    if (periodData?.period) {
      await DataService?.get(
        Api.User.GET_ALL_COMMUNITY +
          "/" +
          gameId?._id +
          "/" +
          periodData?.period
      )
        .then((res) => {
          setAlluser(res?.data?.data?.getAllLiveBet);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // Handle the error, e.g., display an error message to the user
        });
    }
  };
  useEffect(() => {
    liveData();
  }, [periodData]);

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         console.log("inside interval");
  //         liveData()
  //     }, 15000);
  //     console.log("inside useEffect");

  //     return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  //   }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(new Date(), "11111");
      liveData();
    }, 5000);

    return () => clearInterval(interval);
  }, [periodData]);

  const calculateGameTime = (periodData) => {
    clearInterval(timeRef.current);
    timeRef.current = setInterval(() => {
      var timer = getCountdown(periodData?.endTime);

      var now = moment().format("YYYY/MM/DD");
      var endDateTime = moment(now + " " + periodData?.endTime);
      var currentDateTime = moment();

      // expected_endtime>=currentDateTime || ele?.isRepeat
      var expected_endtime = moment(endDateTime).add(
        Number(periodData?.gameHours),
        "hours"
      );
      if (timer !== "00:00:20" || slotsBooked < gameId.maxSlot) {
        getSlotsBooked();
      }
      if (timer === "00:00:00") {
        clearInterval(timeRef.current);

        setTimeout(() => {
          getGamePeriod();
          handleGetData();
          setDisableButtons(false);
          setShowTimeWinnerModal(false);
          setShowWinnewModal(false);

          //   getAllRecodrs();
          //   getSingleRecodrs();
        }, 4000);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timeRef.current); // to clean up on unmount
  }, []);

  useEffect(() => {
    if (Object.keys(periodData).length > 0) {
      console.log(
        moment.unix(periodData?.endTime).format("hh:mm:ss"),
        "check time"
      );
      periodData.endTime = moment
        .unix(periodData?.endTime)
        .format("hh:mm:ss A");
      calculateGameTime(periodData);
    }
  }, [periodData]);

  useEffect(() => {
    if (gameTimer == "00:00:20" && showTimeWinnerModal) {
      setResponseMessage("Winner will be announced soon");
      console.log("in 1", responseMessage);
    }
    if (gameTimer == "00:00:00" && showTimeWinnerModal) {
      dispatch(userAmount())
        .then((res) => {
          toast.success(res?.data?.message, {
            toastId: "customId",
          });
        })
        .catch((error) => {});
      if (responseMessage) {
        setShowWinnewModal(true);
        setTimeout(() => setShowWinnewModal(false), 3000);
      }
    }
  }, [gameTimer, showTimeWinnerModal]);

  const [isDisabled, setIsDisabled] = useState(false);

  const startBattle = () => {
    setIsDisabled(true);
    const data = {
      betAmount: betAmount, // aamount
      gameId: gameId?._id,
      period: periodData?.period,
    };
    DataService.post(Api.User.ADD_COMMUNITY_BEAT, data)
      .then((res) => {
        if (res.data.status === 200 || res.data.status === 201) {
          setShowTimeWinnerModal(true);
          socket?.emit("createColourBet");
          handleGetData();
          dispatch(getTotalCoins());
          liveData();
          toast.success(res?.data?.message, {
            toastId: "customId",
          });
          setIsDisabled(false);
          setBattleModal(false);
          dispatch(userAmount())
            .then((res) => {
              toast.success(res?.data?.message, {
                toastId: "customId",
              });
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };

  const [winnerslider, setslider] = useState({
    winnerslider: {
      0: {
        items: 1,
      },
      279: {
        items: 3,
      },
      768: {
        items: 3,
      },
      1024: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  });

  var now = moment().format("hh:mm:ss A");

  // useEffect(() => {
  //   if (periodData?.startTime && periodData?.endTime) {
  //     if (
  //       now >= moment.unix(periodData?.startTime).format("hh:mm:ss A") &&
  //       now <= periodData?.endTime
  //     ) {
  //       console.log("done");
  //     } else {
  //       toast.error("Game will start soon");
  //       navigate("/user");
  //     }
  //   }
  // }, [periodData?.startTime, periodData?.endTime]);

  function formatDate(date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const timeOptions = { hour: "2-digit", minute: "2-digit" };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
      date
    );

    return `${formattedTime} ${formattedDate}`;
  }

  const selectedItem = useMemo(() => {
    return (
      <Index.Box className="user-winner-listing">
        <Index.Box className="winner-slider">
          {lastDayWinner?.length !== 0 ? (
            <Index.OwlCarousel
              className="owl-theme owl-slider-main-content-winner"
              margin={10}
              nav={false}
              dots={true}
              loop={false}
              autoplay={false}
              startPosition={0}
              responsive={winnerslider.winnerslider}
              items={lastDayWinner?.length}
            >
              {lastDayWinner?.map((ele, index) => {
                return (
                  <div class="item">
                    <Index.Box className="live-game-card">
                      <Index.Box className="live-game-pd-card">
                        <Index.Box className="live-user-game-img">
                          <img
                            src={
                              ele?.userId?.profile
                                ? process.env.REACT_APP_IMG +
                                  ele?.userId?.profile
                                : PagesIndex.Png.user
                            }
                            alt="liveuserone"
                          />
                          <Index.Box className="live-user-game-num">
                            <Index.Typography
                              component="p"
                              variant="p"
                              className="live-game-number-title"
                            >
                              {index + 1}
                            </Index.Typography>
                          </Index.Box>
                        </Index.Box>
                        <Index.Box className="live-game-user-details">
                          <Index.Typography
                            component="h6"
                            variant="h6"
                            className="user-game-title"
                          >
                            {ele?.userId?.fullName}
                          </Index.Typography>
                          <Index.Box className="game-id-main-show">
                            <img
                              src={PageIndex.Svg.gamecontroller}
                              className="game-controller"
                              alt="controller"
                            />
                            <span className="span-game-controller">
                              {ele?.rewardAmount}
                            </span>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </div>
                );
              })}
            </Index.OwlCarousel>
          ) : (
            <Index.OwlCarousel
              className="owl-theme owl-slider-main-content-winner"
              margin={10}
              nav={false}
              dots={true}
              loop={false}
              autoplay={false}
              startPosition={0}
              responsive={winnerslider.winnerslider}
              items={3}
            >
              <>
                <div class="item">
                  <Index.Box className="live-game-card">
                    <Index.Box className="live-game-pd-card">
                      <Index.Box className="live-user-game-img">
                        <img src={PagesIndex.Png.user} alt="liveuserone" />
                        <Index.Box className="live-user-game-num">
                          <Index.Typography
                            component="p"
                            variant="p"
                            className="live-game-number-title"
                          >
                            {1}
                          </Index.Typography>
                        </Index.Box>
                      </Index.Box>
                      <Index.Box className="live-game-user-details"></Index.Box>
                    </Index.Box>
                  </Index.Box>
                </div>
                <div class="item">
                  <Index.Box className="live-game-card">
                    <Index.Box className="live-game-pd-card">
                      <Index.Box className="live-user-game-img">
                        <img src={PagesIndex.Png.user} alt="liveuserone" />
                        <Index.Box className="live-user-game-num">
                          <Index.Typography
                            component="p"
                            variant="p"
                            className="live-game-number-title"
                          >
                            {2}
                          </Index.Typography>
                        </Index.Box>
                      </Index.Box>
                      <Index.Box className="live-game-user-details"></Index.Box>
                    </Index.Box>
                  </Index.Box>
                </div>
                <div class="item">
                  <Index.Box className="live-game-card">
                    <Index.Box className="live-game-pd-card">
                      <Index.Box className="live-user-game-img">
                        <img src={PagesIndex.Png.user} alt="liveuserone" />
                        <Index.Box className="live-user-game-num">
                          <Index.Typography
                            component="p"
                            variant="p"
                            className="live-game-number-title"
                          >
                            {3}
                          </Index.Typography>
                        </Index.Box>
                      </Index.Box>
                      <Index.Box className="live-game-user-details"></Index.Box>
                    </Index.Box>
                  </Index.Box>
                </div>
              </>
            </Index.OwlCarousel>
          )}
        </Index.Box>
      </Index.Box>
    );
  }, [lastDayWinner]);

  return (
    <>
      <Index.Modal
        open={showWinnewModal}
        onClose={() => {
          setShowWinnewModal(false);
          // setGameWinnerUser([]);
          // setResponseMessage("");
          setShowTimeWinnerModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details bg-noblur"
      >
        <Index.Box sx={style} className="modal-comman-inner-style">
          <Index.Box className="modal-cancel-btn">
            <Index.Button className="btn btn-cancel">
              <img
                src={PageIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
                onClick={() => {
                  setShowWinnewModal(false);
                  // setGameWinnerUser([]);
                  // setResponseMessage("");
                  setShowTimeWinnerModal(false);
                }}
              />
            </Index.Button>
          </Index.Box>
          <Index.Box>
            <Index.Box className="delete-game-data-main">
              <Index.Box className="number-list-details">
                <Index.Typography
                  className="number-bet-coin are-you-sure-text"
                  component="p"
                  variant="p"
                >
                  {responseMessage}
                </Index.Typography>
              </Index.Box>
              <Index.Box className="deleteModel-btna1">
                <Index.Box className="btn-col">
                  <PageIndex.BlueOutlineButton
                    variant="contained"
                    color="error"
                    btnLabel="Ok"
                    className="outline-blue-btn-content"
                    onClick={() => {
                      setShowWinnewModal(false);
                      // setGameWinnerUser([]);
                      // setResponseMessage("");
                      setShowTimeWinnerModal(false);
                    }}
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Modal>

      <Index.Box className="community-main-content">
        <Index.Box className="community-main-title">
          <Index.Box className="flex-community-timer">
            <Index.Typography className="community-betting-details">
              Community Betting
            </Index.Typography>
            <Index.Box className="community-timer-main-content">
              <Index.Typography
                className="timer-commuity-page"
                component="h5"
                variant="h5"
              >
                Timer :{" "}
                <span className="timer-span-community">{gameTimer}</span>
              </Index.Typography>
            </Index.Box>
          </Index.Box>
          <Index.Box className="period-id-number-bet">
            <Index.Typography
              component="p"
              variant="p"
              className="timer-title-bet period-data"
            >
              Period Id : {periodData?.period ? periodData?.period : ""}
            </Index.Typography>
          </Index.Box>
        </Index.Box>

        <Index.Box className="community-row-content">
          <Index.Box className="community-col1">
            <Index.Box className="community-row-content">
              <Index.Box className="community-col6">
                <Index.Box className="progress-content-community">
                  <Index.Box className="flex-max-prices">
                    <Index.Box className="max-prize-content">
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="max-prize-title"
                      >
                        Max Prize Pool :{" "}
                        <span>
                          ₹
                          {gameId?.betAmount && gameId?.maxSlot
                            ? gameId?.betAmount * gameId?.maxSlot
                            : "-"}
                        </span>
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="fee-entry-content">
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="entry-fees-title"
                      >
                        Entry :{" "}
                        <span>
                          ₹{gameId?.betAmount ? gameId?.betAmount : "-"}
                        </span>
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box className="entry-bet-fee">
                    <Index.Box className="entry-fee-title">
                      <Index.Typography
                        className="entry-fee-content"
                        component="h5"
                        variant="h5"
                      >
                        Entry / Bet FEE
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box
                      className={
                        disableButtons
                          ? "entry-feee-show btn-disabled-content"
                          : "entry-feee-show"
                      }
                    >
                      <Index.Box className="entry-free-price">
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="entry-fee-price"
                          onClick={() => {
                            // if (!walletAddress) {
                            //   setOpen(true);
                            //   return;
                            // }
                            if (
                              userAmounts <= 0 ||
                              gameId?.betAmount > userAmounts
                            ) {
                              setOpenDeposit(true);
                              return;
                            }
                            !disableButtons &&
                              handleOpenModal(gameId?.betAmount);
                          }}
                          aria-disabled
                        >
                          {gameId?.betAmount}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box className="progress-content-bet">
                    <BorderLinearProgress
                      variant="determinate"
                      value={
                        slotsBooked === gameId?.maxSlot
                          ? 100
                          : (slotsBooked * 100) / gameId?.maxSlot
                      }
                      className="border-progress-bet"
                    />
                    <Index.Box className="progress-flex-content">
                      <Index.Typography
                        className="spots-text-details-left"
                        component="p"
                        variant="p"
                      >
                        {gameId?.maxSlot - slotsBooked} slots left
                      </Index.Typography>
                      <Index.Typography
                        className="spots-text-right"
                        component="p"
                        variant="p"
                      >
                        {gameId?.maxSlot} slots
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box className="flexible-main-content-details">
                    <Index.Box className="flex-flexible-content">
                      <Index.Box className="left-flexible-content">
                        <Index.List className="flexible-list">
                          <Index.ListItem className="flexble-listitem">
                            <img
                              src={PageIndex.Png.oneex}
                              className="flexible-img-content"
                              alt="one x"
                            />
                            <Index.Typography
                              component="p"
                              variant="p"
                              className="flexible-prices"
                            >
                              ₹300
                            </Index.Typography>
                          </Index.ListItem>
                          <Index.ListItem className="flexble-listitem">
                            <img
                              src={PageIndex.Png.trophy}
                              className="flexible-img-content"
                              alt="trophy"
                            />
                            <Index.Typography
                              component="p"
                              variant="p"
                              className="flexible-prices"
                            >
                              21 %
                            </Index.Typography>
                          </Index.ListItem>
                          <Index.ListItem className="flexble-listitem">
                            <img
                              src={PageIndex.Png.letterm}
                              className="flexible-img-content"
                              alt="letter"
                            />
                            <Index.Typography
                              component="p"
                              variant="p"
                              className="flexible-prices"
                            >
                              Upto 11
                            </Index.Typography>
                          </Index.ListItem>
                        </Index.List>
                      </Index.Box>
                      <Index.Box className="right-flexible-content">
                        <Index.List className="flexible-list">
                          <Index.ListItem className="flexble-listitem">
                            <img
                              src={PageIndex.Png.rupee}
                              className="flexible-img-content"
                              alt="rupee"
                            />
                            <Index.Typography
                              component="p"
                              variant="p"
                              className="flexible-prices"
                            >
                              flexible
                            </Index.Typography>
                          </Index.ListItem>
                        </Index.List>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="community-betting-img">
                  <img
                    src={PageIndex.Png.community}
                    className="community-bet-img"
                    alt="community"
                  />
                </Index.Box>
              </Index.Box>
              <Index.Box className="community-col6">
                <Index.Box className="padding-fee-price">
                  <Index.Box className="bg-img-winner">
                    <img
                      src={PageIndex.Png.fees}
                      className="winner-bg"
                      alt="fees"
                    ></img>
                  </Index.Box>
                  <Index.Box className="winner-prices-main">
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="winner-amount"
                    >
                      <span>INR</span>
                      <br />
                      1000000
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
                {selectedItem}
                {/* <Index.Box className="user-winner-listing">
                  <Index.Box className="winner-slider">
                    {lastDayWinner?.length !== 0 && (
                      <Index.OwlCarousel
                        className="owl-theme owl-slider-main-content-winner"
                        // autoplayTimeout={5000}
                        margin={10}
                        nav={false}
                        dots={true}
                        loop={false}
                        autoplay={false}
                        startPosition={0}
                        responsive={winnerslider.winnerslider}
                        items={lastDayWinner?.length}
                        // item={3}
                      >
                        {lastDayWinner?.map((ele, index) => {
                          return (
                            <div class="item">
                              <Index.Box className="live-game-card">
                                <Index.Box className="live-game-pd-card">
                                  <Index.Box className="live-user-game-img">
                                    <img
                                      src={
                                        process.env.REACT_APP_IMG +
                                        ele?.userId?.profile
                                      }
                                      alt="liveuserone"
                                    />
                                    <Index.Box className="live-user-game-num">
                                      <Index.Typography
                                        component="p"
                                        variant="p"
                                        className="live-game-number-title"
                                      >
                                        {index + 1}
                                      </Index.Typography>
                                    </Index.Box>
                                  </Index.Box>
                                  <Index.Box className="live-game-user-details">
                                    <Index.Typography
                                      component="h6"
                                      variant="h6"
                                      className="user-game-title"
                                    >
                                      {ele?.userId?.fullName}
                                    </Index.Typography>
                                    <Index.Box className="game-id-main-show">
                                      <img
                                        src={PageIndex.Svg.gamecontroller}
                                        className="game-controller"
                                        alt="controller"
                                      />
                                      <span className="span-game-controller">
                                        {ele?.rewardAmount}
                                      </span>
                                    </Index.Box>
                                  </Index.Box>
                                </Index.Box>
                              </Index.Box>
                            </div>
                          );
                        })}
                      </Index.OwlCarousel>
                    )}
                  </Index.Box>
                </Index.Box> */}
                <Index.Box className="winner-distribution-main">
                  <Index.Box className="winner-main-title">
                    <Index.Typography
                      className="entry-winner-content"
                      component="h5"
                      variant="h5"
                    >
                      Winner distribution
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
              <Index.Box className="community-col12">
                <Index.Box className="winner-distribution-main">
                  {/* <Index.Box className="winner-main-title">
                                        <Index.Typography className='entry-winner-content' component='h5' variant='h5'>Winner distribution</Index.Typography>
                                    </Index.Box> */}

                  <Index.Box className="winner-distribute-self">
                    <Index.Box className="main-description-details">
                      <Index.Typography
                        component="h3"
                        variant="h3"
                        className="self-main-title"
                      >
                        My Records
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="winner-listing-details">
                      <Index.List className="winner-list">
                        <Index.ListItem className="winner-listitem">
                          <Index.Box className="flex-winner">
                            <Index.Typography
                              className="community-bet-color "
                              variant="h5"
                              component="h5"
                            >
                              Periods
                            </Index.Typography>
                            <Index.Typography
                              className=" community-bet-color"
                              variant="h5"
                              component="h5"
                            >
                              Coin
                            </Index.Typography>
                            <Index.Typography
                              className=" community-bet-color"
                              variant="p"
                              component="p"
                            >
                              Email
                            </Index.Typography>
                            <Index.Typography
                              className="community-bet-color"
                              variant="p"
                              component="p"
                            >
                              Open Time
                            </Index.Typography>
                            <Index.Typography
                              className="community-bet-color"
                              variant="p"
                              component="p"
                            >
                              Status
                            </Index.Typography>
                          </Index.Box>
                        </Index.ListItem>

                        {firstTwentyMyRecords.length ? (
                          <>
                            {firstTwentyMyRecords?.map((ele) => {
                              const date = new Date(ele?.createdAt); // Replace with your date
                              const formattedDate = formatDate(date);
                              return (
                                <Index.ListItem className="winner-listitem">
                                  <Index.Box className="flex-winner">
                                    <Index.Typography
                                      className="winner-id-table calc-commuity-width com-"
                                      variant="h5"
                                      component="h5"
                                    >
                                      {ele?.period}
                                    </Index.Typography>
                                    <Index.Typography
                                      className="winner-email-id calc-commuity-width"
                                      variant="h5"
                                      component="h5"
                                    >
                                      {ele?.betAmount}
                                    </Index.Typography>
                                    <Index.Typography
                                      className="winner-email-id calc-commuity-width"
                                      variant="p"
                                      component="p"
                                    >
                                      {ele?.userId?.email}
                                    </Index.Typography>
                                    <Index.Typography
                                      className="winner-time-date calc-commuity-width"
                                      variant="p"
                                      component="p"
                                    >
                                      {formattedDate}
                                    </Index.Typography>
                                    <Index.Typography className="accordian-main-record-title calc-commuity-width">
                                      <span
                                        className={
                                          ele?.status == "pending"
                                            ? "yellow-span"
                                            : ele?.isWin == true
                                            ? "green-text-order"
                                            : "red-text-order"
                                        }
                                      >
                                        {ele?.status == "pending"
                                          ? "Pending"
                                          : ele?.isWin == true
                                          ? "Won"
                                          : "Loss"}
                                      </span>
                                    </Index.Typography>
                                  </Index.Box>
                                </Index.ListItem>
                              );
                            })}
                            {firstTwentyMyRecords.length >= 10 ? (
                              <Index.Box className="more-right-record more-community-content">
                                <Index.Link
                                  className="more-link-content"
                                  to="/user/community-betting/my-records"
                                >
                                  More &#8811;
                                </Index.Link>
                              </Index.Box>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <Index.Box className="my-record-content-details record-content-none">
                            <Index.Typography
                              className="my-record-data-not-found record-in-center"
                              component="p"
                              variant="p"
                            >
                              No record found
                            </Index.Typography>
                          </Index.Box>
                        )}
                      </Index.List>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>

          <Index.Box className="community-col2">
            <Index.Box className="community-content-timer-details">
              <Index.Box className="live-bet-community-row">
                <Index.Box className="live-bet-col1">
                  <Index.Box className="live-bet-components">
                    <Index.Box className="live-bet-details-main">
                      <Index.Typography
                        component="h5"
                        variant="h5"
                        className="live-title-bet-content"
                      >
                        Live Bets
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box className="live-bet-details">
                    <Index.List className="list-livebet-item">
                      {alluser &&
                        alluser?.map((ele) => {
                          console.log(ele, "eleeee");
                          return (
                            <Index.ListItem className="list-livebet-community-details">
                              <Index.Box className="live-user-bet-details">
                                <Index.Box className="live-user-img">
                                  <img
                                    src={
                                      ele?.userId?.profile
                                        ? process.env.REACT_APP_IMG +
                                          ele?.userId?.profile
                                        : PageIndex.Png.usericon
                                    }
                                    className="usericon-profile"
                                  ></img>
                                </Index.Box>
                                <Index.Box className="user-live-border-list">
                                  <Index.Box className="user-name-list">
                                    <Index.Typography
                                      component="p"
                                      variant="p"
                                      className="user-name-live-bet"
                                    >
                                      {ele?.userId?.fullName}
                                    </Index.Typography>
                                  </Index.Box>
                                  <Index.Box className="value-user-live-bet">
                                    <Index.Typography
                                      component="p"
                                      variant="p"
                                      className="user-bet-value"
                                    >
                                      {ele?.betAmount}{" "}
                                      {ele?.betAmount == 1000
                                        ? "k"
                                        : ele?.betAmount == 100000
                                        ? "M"
                                        : null}
                                    </Index.Typography>
                                  </Index.Box>
                                </Index.Box>
                              </Index.Box>
                            </Index.ListItem>
                          );
                        })}
                    </Index.List>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="live-bet-col1">
                  <Index.Box className="live-winner-components">
                    <Index.Box className="live-winner-details-main">
                      <Index.Typography
                        component="h5"
                        variant="h5"
                        className="live-title-winner-content"
                      >
                        Last day winners
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box className="live-winner-lastday">
                    <Index.Box className="live-bet-details">
                      <Index.List className="list-livebet-item">
                        {lastDayWinner?.map((ele) => {
                          return (
                            <Index.ListItem className="list-livebet-community-details">
                              <Index.Box className="live-user-bet-details">
                                <Index.Box className="live-user-img">
                                  <img
                                    src={
                                      ele?.userId?.profile
                                        ? process.env.REACT_APP_IMG +
                                          ele?.userId?.profile
                                        : PageIndex.Png.usericon
                                    }
                                    className="usericon-profile"
                                  ></img>
                                </Index.Box>
                                <Index.Box className="user-live-border-list">
                                  <Index.Box className="user-name-list">
                                    <Index.Typography
                                      component="p"
                                      variant="p"
                                      className="user-name-live-bet"
                                    >
                                      {ele?.userId?.fullName}
                                    </Index.Typography>
                                  </Index.Box>
                                  <Index.Box className="value-user-live-bet">
                                    <Index.Typography
                                      component="p"
                                      variant="p"
                                      className="user-bet-value"
                                    >
                                      {ele?.rewardAmount}{" "}
                                      {ele?.rewardAmount == 1000
                                        ? "k"
                                        : ele?.rewardAmount == 100000
                                        ? "M"
                                        : null}
                                    </Index.Typography>
                                  </Index.Box>
                                </Index.Box>
                              </Index.Box>
                            </Index.ListItem>
                          );
                        })}
                      </Index.List>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <Index.Modal
            open={battleModal}
            onClose={() => {
              setBattleModal(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-comman-details bg-noblur"
          >
            <Index.Box sx={style} className="modal-comman-inner-style">
              <Index.Box className="modal-cancel-btn">
                <Index.Button className="btn btn-cancel">
                  <img
                    src={PageIndex.Svg.cancelmodal}
                    className="cancel-modal"
                    alt="modal-cancel"
                    onClick={() => {
                      setBattleModal(false);
                    }}
                  />
                </Index.Button>
              </Index.Box>
              <Index.Box>
                <Index.Box className="delete-game-data-main">
                  <Index.Box className="number-list-details">
                    <Index.Typography
                      className="number-bet-coin are-you-sure-text"
                      component="p"
                      variant="p"
                    >
                      {`You want to bet ${betAmount} coin `}
                    </Index.Typography>
                  </Index.Box>
                  <Index.Box className="deleteModel-btna1">
                    <Index.Box className="btn-col">
                      <PagesIndex.BlueOutlineButton
                        disabled={isDisabled}
                        variant="contained"
                        color="error"
                        btnLabel="Ok"
                        className="outline-blue-btn-content"
                        onClick={() => startBattle()}
                      />
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Modal>
        </Index.Box>
      </Index.Box>
    </>
  );
}
