import React, { useEffect, useRef, useState } from "react";
import Index from "../../../Index";
import PagesIndex from "../../../pageIndex";
import PageIndex from "../../../pageIndex";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getTotalCoins, userAmount } from "../../../../redux/user/userReducer";
import moment from "moment";
import CardAndCommunityBetting from "../../../../component/comman/cardAndCommunityBetting/CardAndCommunityBetting";
import { io } from "socket.io-client";

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

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Index.Box className="tab-details-content-top three-main-tabes">
          <Index.Typography className="tab-details-inner three-inner-tabs-details">
            {children}
          </Index.Typography>
        </Index.Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

var socket;

export default function TwoColorBetting() {
  const [expanded, setExpanded] = React.useState("panel1");
  let timeRef = useRef(null);

  const handleChangeAccro = (panel, expanded) => {
    setExpanded(expanded == panel ? "" : panel);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const selectedSecond = location?.state?.selectedSecond;

  console.log(selectedSecond, 74);

  const storedValue = localStorage.getItem("userGameId");
  const gameId = JSON.parse(storedValue);

  const userAmounts = useSelector(
    (state) => state?.UserReducer?.totalCoins?.totalCoin
  );
  const userAmounts1 = useSelector((state) => state?.UserReducer);

  const gameType = "2colorBetting";
  const [responseMessage, setResponseMessage] = useState("");
  const [time, setTime] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isActiveOrange, setIsActiveOrange] = useState(false);
  const [isActiveBlue, setIsActiveBlue] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [IncDisableButtons, setIncDisableButtons] = useState(false);
  const [DncDisableButtons, setDncDisableButtons] = useState(false);
  const [battleModal, setBattleModal] = useState(false);
  const [showWinnewModal, setShowWinnewModal] = useState(false);
  const [count, setCount] = useState(gameId?.gameMinimumCoin);
  const [selectedColor, setSelectedColor] = useState("");
  const [GameWinnerUser, setGameWinnerUser] = useState("");
  const dispatch = useDispatch();
  const [singleuserList, setSingleUserList] = useState([]);
  const [getallGameData, setGetallGameData] = useState([]);
  const [userGameRulesId, setUserGameRulesId] = useState();
  const [show, setShow] = useState(false);
  const [gameTimer, setGameTimer] = useState("");
  const [hours, minutess, secondss] = gameTimer.split(":").map(Number);
  const totalSeconds = hours * 3600 + minutess * 60 + secondss;
  const [periodData, setPeriodData] = useState({});
  const startDate = moment(gameId?.gameTimeFrom).format("YYYY/MM/DD ");
  const endDate = moment(gameId?.gameTimeTo).format("YYYY/MM/DD");
  const startDateTime = moment(startDate + " " + gameId?.gameDurationFrom);
  const endDateTime = moment(endDate + " " + gameId?.gameDurationTo);
  const currentDateTime = moment();
  const [winnerAnnounced, setWinnerAnnounced] = useState(false);
  console.log(periodData, "period check");

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
  ] = useOutletContext();

  //socket state

  const [socketTimer, setSocketTimer] = useState("");

  //socket call
  useEffect(() => {
    socket = io(Api.common.TIMER_SOCKET);
  }, []);
  const socketCall = () => {
    const data = {
      gameId: location?.state?.ele?._id,
      second: selectedSecond,
    };

    // socket.emit("startTimer", data);
    // socket.on("timer", (data) => {
    //   if (data?.gameId == location?.state?.ele?._id) {
    //     setSocketTimer(data?.remainingTime);
    //   }
    // });
    socket.emit("requestPeriod", data);
    socket.on("updateTimer", (data) => {
      if (
        data.periodData?.gameId?._id == location?.state?.ele?._id &&
        data.periodData?.periodFor == selectedSecond
      ) {
        setSocketTimer(data?.seconds);
        setPeriodData(data?.periodData);
      }
      // if (data?.gameId == location?.state?.ele?._id) {

      // }
    });
  };

  useEffect(() => {
    socketCall();
  }, []);

  useEffect(() => {
    if (startDateTime >= currentDateTime && endDateTime <= currentDateTime) {
      navigate("/user");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState == "visible" && periodData?.length > 0) {
        getGamePeriod();
      }
    });
  }, []);

  const getCountdown = (endtime) => {
    var currentDate = moment().format("YYYY/MM/DD");

    const endDateTime = moment(currentDate + " " + endtime);
    // another date
    var now = moment();
    var duration = moment.duration(endDateTime.diff(now));
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

    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      setGameTimer("00:00:00");
      return "00:00:00";
    }
    setGameTimer(countDown);
    return countDown;
  };

  const getSingleData = async () => {
    await DataService.get(
      `${Api.User.GET_SINGLE_GAME_PERIOAD}/${gameId?._id}?second=${selectedSecond}`
    )

      .then((res) => {
        setSingleUserList(res?.data?.data);
      })

      .catch((error) => {
        toast.error(error?.data?.message, {
          toastId: "customId",
        });
      });
  };

  const getAllData = async (t) => {
    await DataService.get(
      `${Api.User.GET_ALL_GAME_PERIOAD}/${gameId?._id}?second=${selectedSecond}`
    )

      .then((res) => {
        let data = res?.data?.data;
        data?.reverse();
        // if (t == 1) {
        //   data = data.slice(1);
        // }

        setGetallGameData(data);
      })

      .catch((error) => {
        toast.error(error?.data?.message, {
          toastId: "customId",
        });
      });
  };
  // let firstTwentyAllRecords = getallGameData.slice(1, 21);
  // let firstTwentyMyRecords = singleuserList.slice(0, 10);
  let firstTwentyAllRecords =
    window.innerWidth < 768
      ? getallGameData?.slice(0, 3)
      : getallGameData?.slice(0, 20);
  let firstTwentyMyRecords = singleuserList.slice(0, 10);

  const isMoreGameRecords = () => {
    const isMobile = window.innerWidth < 768;
    return isMobile
      ? getallGameData?.length >= 3
      : getallGameData?.length >= 20;
  };

  useEffect(() => {
    if (socketTimer <= 10) {
      // toast.error("")
      setDisableButtons(true);
      setBattleModal(false);
      setIsActiveOrange(false);
      setIsActiveBlue(false);
      setIsActive(false);
      if (isActiveOrange) {
        document
          .querySelector(".button-landscape")
          ?.classList.remove("bg-orange");
        document
          .querySelector(".onclick-color-text")
          ?.classList.remove("block-onlick-text");
        document
          .querySelector(".button-landscape-text")
          ?.classList.remove("choose-color-text-remove");
        document
          .querySelector(".button-control-inner")
          ?.classList.remove("cursor");
      }
      if (isActiveBlue) {
        document
          .querySelector(".button-landscape")
          ?.classList.remove("bg-blue");
        document
          .querySelector(".onclick-color-text")
          ?.classList.remove("block-onlick-text");
        document
          .querySelector(".button-landscape-text")
          ?.classList.remove("choose-color-text-remove");
        document
          .querySelector(".button-control-inner")
          ?.classList.remove("cursor");
      }
      if (isActive) {
        document
          .querySelector(".button-landscape")
          ?.classList.remove("bg-green");
        document
          .querySelector(".onclick-color-text")
          ?.classList.remove("block-onlick-text");
        document
          .querySelector(".button-landscape-text")
          ?.classList.remove("choose-color-text-remove");
        document
          .querySelector(".button-control-inner")
          ?.classList.remove("cursor");
      }
    } else {
      setDisableButtons(false);
    }
    // if (totalSeconds == 0) {
    //   setIsActiveOrange(false);
    //   setIsActiveBlue(false);
    //   setIsActive(false);
    //   if (isActiveOrange) {
    //     document
    //       .querySelector(".button-landscape")
    //       ?.classList.remove("bg-orange");
    //     document
    //       .querySelector(".onclick-color-text")
    //       ?.classList.remove("block-onlick-text");
    //     document
    //       .querySelector(".button-landscape-text")
    //       ?.classList.remove("choose-color-text-remove");
    //     document
    //       .querySelector(".button-control-inner")
    //       ?.classList.remove("cursor");
    //   }
    //   if (isActiveBlue) {
    //     document
    //       .querySelector(".button-landscape")
    //       ?.classList.remove("bg-blue");
    //     document
    //       .querySelector(".onclick-color-text")
    //       ?.classList.remove("block-onlick-text");
    //     document
    //       .querySelector(".button-landscape-text")
    //       ?.classList.remove("choose-color-text-remove");
    //     document
    //       .querySelector(".button-control-inner")
    //       ?.classList.remove("cursor");
    //   }
    //   if (isActive) {
    //     document
    //       .querySelector(".button-landscape")
    //       ?.classList.remove("bg-green");
    //     document
    //       .querySelector(".onclick-color-text")
    //       ?.classList.remove("block-onlick-text");
    //     document
    //       .querySelector(".button-landscape-text")
    //       ?.classList.remove("choose-color-text-remove");
    //     document
    //       .querySelector(".button-control-inner")
    //       ?.classList.remove("cursor");
    //   }
    // }

    if (socketTimer <= 10 && show == true) {
      setIsActiveOrange(false);
      setIsActiveBlue(false);
      setIsActive(false);
      if (isActiveOrange) {
        document
          .querySelector(".button-landscape")
          ?.classList.remove("bg-orange");
        document
          .querySelector(".onclick-color-text")
          ?.classList.remove("block-onlick-text");
        document
          .querySelector(".button-landscape-text")
          ?.classList.remove("choose-color-text-remove");
        document
          .querySelector(".button-control-inner")
          ?.classList.remove("cursor");
      }
      if (isActiveBlue) {
        document
          .querySelector(".button-landscape")
          ?.classList.remove("bg-blue");
        document
          .querySelector(".onclick-color-text")
          ?.classList.remove("block-onlick-text");
        document
          .querySelector(".button-landscape-text")
          ?.classList.remove("choose-color-text-remove");
        document
          .querySelector(".button-control-inner")
          ?.classList.remove("cursor");
      }
      if (isActive) {
        document
          .querySelector(".button-landscape")
          ?.classList.remove("bg-green");
        document
          .querySelector(".onclick-color-text")
          ?.classList.remove("block-onlick-text");
        document
          .querySelector(".button-landscape-text")
          ?.classList.remove("choose-color-text-remove");
        document
          .querySelector(".button-control-inner")
          ?.classList.remove("cursor");
      }
    }
  }, [socketTimer]);

  const winnerDeclaration = async () => {
    await DataService?.get(
      // Api.User.GAME_WINNER_LIST +
      //   "/" +
      //   gameType +
      //   "/" +
      //   gameId?._id +
      //   "/" +
      //   periodData?.period
      `${Api.User.GAME_WINNER_LIST}/${gameType}/${gameId?._id}/${periodData?.period}?second=${selectedSecond}`
    )
      .then((res) => {
        if (res?.data?.data?.length) {
          setGameWinnerUser(res?.data?.data?.[0]?.colourName);
          console.log("434", res);
        } else {
          console.log("436", res);
          setResponseMessage(res?.data?.message);
        }

        // dispatch(userAmount())
        //   .then((res) => {
        //     toast.success(res?.data?.message, {
        //       toastId: "customId",
        //     });
        //   })
        //   .catch((error) => {
        //     toast.error(error?.data?.message, {
        //       toastId: "customId",
        //     });
        //   });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // useEffect(() => {
  //     if (totalSeconds == 5) {
  //     }
  // }, [totalSeconds])

  useEffect(() => {
    if (socketTimer == 5) {
      winnerDeclaration();
    }
    // if (socketTimer == 0) {
    //   setTimeout(() => {
    //     socketCall();
    //   }, 1000);
    //   handleWinnerColor();
    //   dispatch(getTotalCoins());
    //   if (responseMessage) {
    //     setShowWinnewModal(true);
    //     setTimeout(() => setShowWinnewModal(false), 9000);
    //   }
    //   // setShowWinnewModal(true);
    // }
    if (socketTimer == 0) {
      handleWinnerColor();
      dispatch(getTotalCoins());
      if (responseMessage) {
        setShowWinnewModal(true);
        setTimeout(() => {
          handleCloseWinnerModal();
        }, 3000);
      }
      setTimeout(() => {
        setShow(false);
        setGameWinnerUser("");
        setShowWinnewModal(false);
        setResponseMessage("");
        // socketCall();
      }, 1000);

      getGamePeriod();
      getSingleData();
      getAllData();
    }
    console.log("503: ", socketTimer);
  }, [socketTimer]);

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
        "minutes"
      );
      if (timer === "00:00:00") {
        clearInterval(timeRef.current);
        setTimeout(() => {
          getGamePeriod();
          handleCloseWinnerModal();
          setShow(false);
          setGameWinnerUser("");
        }, 4000);
        getSingleData();
        getAllData();
      }
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timeRef.current); // to clean up on unmount
  }, []);

  // useEffect(() => {
  //   if (Object.keys(periodData).length > 0) {
  //     periodData.endTime = moment
  //       .unix(periodData?.endTime)
  //       .format("hh:mm:ss A");
  //     calculateGameTime(periodData);
  //   }
  // }, [periodData]);

  useEffect(() => {
    if (selectedSecond) {
      document
        .querySelector(".button-landscape-inner")
        ?.classList.add("choose-span-remove");
      document
        .getElementById("line-single-id")
        ?.classList.add("line-single-none");
      document
        .getElementById("choose-multiple-id")
        ?.classList.add("choose-d-block");
      document
        .querySelector(".multiline-title")
        ?.classList.add("multiline-title-added");
    }
  }, [selectedSecond]);

  setTimeout(function () {
    document.querySelector(".timer-title")?.classList.add("timer-remover");
  }, 15000);

  setTimeout(function () {
    document
      .getElementById(".gaming-circle-count")
      ?.classList.add("gaming-cricle-first-sec");
  }, 90000);
  setTimeout(function () {
    document
      .getElementById(".gaming-circle-count")
      ?.classList.remove("gaming-cricle-first-sec");
  }, 10000);

  setTimeout(function () {
    setTimeout(function () {
      document.querySelector(".timer-title")?.classList.remove("timer-remover");
    }, 15000);
  }, 15000);

  const getGamePeriod = async () => {
    // await DataService?.get(
    //   `${Api.User.GET_GAME_PERIOD}/${gameId?._id}?second=${selectedSecond}`
    // )
    //   .then((res) => {
    //     if (res?.status == 200) {
    //       // console.log(res?.status, 532);
    //       setPeriodData(res?.data?.data);
    //       } else {
    //         navigate("/user");
    //         toast.error("Game availble soon", {
    //           toastId: "customId",
    //         });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error, "477");
    //     navigate("/user");
    //     toast.error("Game available soon", {
    //       toastId: "customId",
    //     });
    //   });
  };
  useEffect(() => {
    // console.log(selectedSecond, gameId?._id, 553);
    // setTimeout(getGamePeriod, 1000);
    if (selectedSecond && gameId?._id) {
      getGamePeriod();
    }
  }, []);

  var now = moment().format("hh:mm:ss A");
  console.log(now, 554);
  // useEffect(() => {
  //   if (periodData?.startTime && periodData?.endTime) {
  //     if (
  //       now >= moment.unix(periodData?.startTime).format("hh:mm:ss A") &&
  //       now <= periodData?.endTime
  //     ) {
  //       console.log("in if  done");
  //     } else {
  //       toast.error("Game will start soon");
  //       navigate("/user");
  //     }
  //   }
  // }, [periodData?.startTime, periodData?.endTime]);
  useEffect(() => {
    getSingleData();
    getAllData(1);
  }, []);

  const handleClickGreen = () => {
    if (userAmounts <= 0 || count > userAmounts) {
      setOpenDeposit(true);
      return;
    }
    setIsActiveOrange(false);
    setIsActiveBlue(false);
    setSelectedColor("green");
    if (isActive) {
      document.querySelector(".button-landscape")?.classList.remove("bg-green");
      document
        .querySelector(".onclick-color-text")
        ?.classList.remove("block-onlick-text");
      document
        .querySelector(".button-landscape-text")
        ?.classList.remove("choose-color-text-remove");
      document
        .querySelector(".button-control-inner")
        ?.classList.remove("cursor");
    } else {
      document.querySelector(".button-landscape")?.classList.add("bg-green");
      document
        .querySelector(".button-landscape-text")
        ?.classList.add("choose-color-text-remove");
      document
        .querySelector(".onclick-color-text")
        ?.classList.add("block-onlick-text");
      document.querySelector(".button-control-inner")?.classList.add("cursor");
    }
    setIsActive((current) => !current);
    document.querySelector(".button-landscape")?.classList.remove("bg-blue");
    document.querySelector(".button-landscape")?.classList.remove("bg-orange");
  };

  const handleClickBlue = () => {
    if (userAmounts <= 0 || count > userAmounts) {
      setOpenDeposit(true);
      return;
    }
    setIsActive(false);
    setIsActiveOrange(false);
    setSelectedColor("red");
    if (isActiveBlue) {
      document.querySelector(".button-landscape")?.classList.remove("bg-blue");
      document
        .querySelector(".onclick-color-text")
        ?.classList.remove("block-onlick-text");
      document
        .querySelector(".button-landscape-text")
        ?.classList.remove("choose-color-text-remove");
      document
        .querySelector(".button-control-inner")
        ?.classList.remove("cursor");
    } else {
      document.querySelector(".button-landscape")?.classList.add("bg-blue");
      document
        .querySelector(".button-landscape-text")
        ?.classList.add("choose-color-text-remove");
      document
        .querySelector(".onclick-color-text")
        ?.classList.add("block-onlick-text");
      document.querySelector(".button-control-inner")?.classList.add("cursor");
    }
    setIsActiveBlue((current) => !current);
    document.querySelector(".button-landscape")?.classList.remove("bg-green");
    document.querySelector(".button-landscape")?.classList.remove("bg-orange");
  };

  const handleRemoveBg = (event) => {
    let bgExist = document
      .querySelector(".button-landscape")
      ?.classList.contains("bg-green");
    if (bgExist) {
      document.querySelector(".button-landscape")?.classList.remove("bg-green");
      document
        .querySelector(".down-active-btn")
        ?.classList.add("value-show-green");
      document
        .querySelector(".onclick-color-text")
        ?.classList.remove("block-onlick-text");
      document
        .querySelector(".button-landscape-text")
        ?.classList.remove("choose-color-text-remove");
      document
        .querySelector(".onclick-prices-hidden")
        ?.classList.remove("remove-price-onclick-green");

      setTimeout(function () {
        document
          .getElementById("choose-multiple-id")
          ?.classList.add("choose-d-block");
        setTimeout(function () {}, 150);
      }, 100);
    }

    let bgExistOrange = document
      .querySelector(".button-landscape")
      ?.classList.contains("bg-orange");
    if (bgExistOrange) {
      document
        .querySelector(".button-landscape")
        ?.classList.remove("bg-orange");
      document
        .querySelector(".down-active-btn")
        ?.classList.add("value-show-orange");
      document
        .querySelector(".onclick-color-text")
        ?.classList.remove("block-onlick-text");
      document
        .querySelector(".button-landscape-text")
        ?.classList.remove("choose-color-text-remove");
      document
        .querySelector(".onclick-prices-hidden")
        ?.classList.remove("remove-price-onclick-orange");
      setTimeout(function () {
        document
          .getElementById("choose-multiple-id")
          ?.classList.add("choose-d-block");
        setTimeout(function () {}, 150);
      }, 100);
    }

    let bgExistBlue = document
      .querySelector(".button-landscape")
      ?.classList.contains("bg-blue");
    if (bgExistBlue) {
      document.querySelector(".button-landscape")?.classList.remove("bg-blue");
      document
        .querySelector(".down-active-btn")
        ?.classList.add("value-show-blue");
      document
        .querySelector(".onclick-color-text")
        ?.classList.remove("block-onlick-text");
      document
        .querySelector(".button-landscape-text")
        ?.classList.remove("choose-color-text-remove");
      document
        .querySelector(".onclick-prices-hidden")
        ?.classList.remove("remove-price-onclick-blue");
      setTimeout(function () {
        document
          .getElementById("choose-multiple-id")
          ?.classList.add("choose-d-block");
        setTimeout(function () {}, 150);
      }, 100);
    }
  };
  // functions
  const startBattle = async () => {
    const data = {
      colourName: selectedColor,
      betAmount: count,
      gameId: gameId?._id,
      gameType: gameType,
      period: periodData?.period,
      selectedTime: +selectedSecond,
    };
    console.log("period: ", periodData?.period);
    if (userAmounts < count) {
      toast.error("balance is insufficient");
    } else {
      await DataService.post(Api.User.THREE_COLOR_BETTING, data)
        .then((res) => {
          if (res.data.status === 200 || res.data.status === 201) {
            setShow(true);
            getSingleData();
            dispatch(getTotalCoins());

            toast.success(res?.data?.message, {
              toastId: "customId",
              // autoClose: 5000,
            });
          }

          setIsActiveOrange(false);
          setIsActiveBlue(false);
          setIsActive(false);
          if (isActiveOrange) {
            document
              .querySelector(".button-landscape")
              ?.classList.remove("bg-orange");
            document
              .querySelector(".onclick-color-text")
              ?.classList.remove("block-onlick-text");
            document
              .querySelector(".button-landscape-text")
              ?.classList.remove("choose-color-text-remove");
            document
              .querySelector(".button-control-inner")
              ?.classList.remove("cursor");
          }
          if (isActiveBlue) {
            document
              .querySelector(".button-landscape")
              ?.classList.remove("bg-blue");
            document
              .querySelector(".onclick-color-text")
              ?.classList.remove("block-onlick-text");
            document
              .querySelector(".button-landscape-text")
              ?.classList.remove("choose-color-text-remove");
            document
              .querySelector(".button-control-inner")
              ?.classList.remove("cursor");
          }
          if (isActive) {
            document
              .querySelector(".button-landscape")
              ?.classList.remove("bg-green");
            document
              .querySelector(".onclick-color-text")
              ?.classList.remove("block-onlick-text");
            document
              .querySelector(".button-landscape-text")
              ?.classList.remove("choose-color-text-remove");
            document
              .querySelector(".button-control-inner")
              ?.classList.remove("cursor");
          }

          dispatch(userAmount())
            .then((res) => {
              toast.success(res?.data?.message, {
                toastId: "customId",
              });
            })
            .catch((error) => {});
        })
        .catch((error) => {
          console.log("error", error);
          toast.error(error?.response?.data?.message, {
            toastId: "customId",
          });
        });
    }
    setBattleModal(false);
  };

  const handleCloseWinnerModal = () => {
    setShowWinnewModal(false);
    setIsActiveOrange(false);
    setIsActiveBlue(false);
    setIsActive(false);
    setShow(false);
  };

  const increaseCount = (incrementValue) => {
    if (gameId.gameMaximumCoin <= count + incrementValue) {
      setCount(gameId.gameMaximumCoin);
    } else if (userAmounts >= count + incrementValue) {
      setCount(count + incrementValue);
    } else {
      toast.error("Balance is insufficient", {
        toastId: "customId",
      });
    }
  };

  const decreaseCount = (decrementValue) => {
    if (gameId.gameMinimumCoin <= count - decrementValue) {
      if (count >= decrementValue) {
        setCount(count - decrementValue);
      }
    }
  };

  const userGameRules = async () => {
    await DataService.get(Api.User.USER_GAME_RULES + "/" + gameId?._id)
      .then((res) => {
        setUserGameRulesId(res?.data?.data?.gameRules);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (gameId.gameMaximumCoin == count) {
      setIncDisableButtons(true);
    } else {
      setIncDisableButtons(false);
    }
    if (gameId.gameMinimumCoin == count) {
      setDncDisableButtons(true);
    } else {
      setDncDisableButtons(false);
    }
  }, [count]);

  useEffect(() => {
    userGameRules();
  }, [userGameRulesId]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleWinnerColor = () => {
    if (GameWinnerUser) {
      setWinnerAnnounced(true);
      if (GameWinnerUser.toLowerCase() == "red") {
        document.querySelector(".button-landscape")?.classList.add("bg-blue");
        document
          .querySelector(".button-landscape-text")
          ?.classList.add("choose-color-text-remove");
        document
          .querySelector(".onclick-color-text")
          ?.classList.add("block-onlick-text");
        document
          .querySelector(".gaming-circle-count")
          ?.classList.add("wheels-stopped-red");
        setTimeout(() => {
          setWinnerAnnounced(false);
          document
            .querySelector(".button-landscape")
            ?.classList.remove("bg-blue");
          document
            .querySelector(".onclick-color-text")
            ?.classList.remove("block-onlick-text");
          document
            .querySelector(".button-landscape-text")
            ?.classList.remove("choose-color-text-remove");
          document
            .querySelector(".gaming-circle-count")
            ?.classList.remove("wheels-stopped-red");
        }, 1000);
      } else if (GameWinnerUser.toLowerCase() == "green") {
        document.querySelector(".button-landscape")?.classList.add("bg-green");
        document
          .querySelector(".button-landscape-text")
          ?.classList.add("choose-color-text-remove");
        document
          .querySelector(".onclick-color-text")
          ?.classList.add("block-onlick-text");
        document
          .querySelector(".gaming-circle-count")
          ?.classList.add("wheels-stopped-green");
        setTimeout(() => {
          setWinnerAnnounced(false);
          document
            .querySelector(".button-landscape")
            ?.classList.remove("bg-green");
          document
            .querySelector(".onclick-color-text")
            ?.classList.remove("block-onlick-text");
          document
            .querySelector(".button-landscape-text")
            ?.classList.remove("choose-color-text-remove");
          document
            .querySelector(".gaming-circle-count")
            ?.classList.remove("wheels-stopped-green");
        }, 1000);
      }
    }
  };

  // useEffect(()=> {
  //   if(userAmounts <= 0 || gameId.gameMinimumCoin > userAmounts || gameId.gameMaximumCoin > userAmounts){
  //     setIsActive(false);
  //     setIsActiveOrange(false);
  //     setIsActiveBlue(false);
  //   }
  // }, [userAmounts])

  const closeBetConfirmModal = () => {
    setIsActiveOrange(false);
    setIsActiveBlue(false);
    setIsActive(false);
    if (isActiveOrange) {
      document
        .querySelector(".button-landscape")
        ?.classList.remove("bg-orange");
      document
        .querySelector(".onclick-color-text")
        ?.classList.remove("block-onlick-text");
      document
        .querySelector(".button-landscape-text")
        ?.classList.remove("choose-color-text-remove");
      document
        .querySelector(".button-control-inner")
        ?.classList.remove("cursor");
    }
    if (isActiveBlue) {
      document.querySelector(".button-landscape")?.classList.remove("bg-blue");
      document
        .querySelector(".onclick-color-text")
        ?.classList.remove("block-onlick-text");
      document
        .querySelector(".button-landscape-text")
        ?.classList.remove("choose-color-text-remove");
      document
        .querySelector(".button-control-inner")
        ?.classList.remove("cursor");
    }
    if (isActive) {
      document.querySelector(".button-landscape")?.classList.remove("bg-green");
      document
        .querySelector(".onclick-color-text")
        ?.classList.remove("block-onlick-text");
      document
        .querySelector(".button-landscape-text")
        ?.classList.remove("choose-color-text-remove");
      document
        .querySelector(".button-control-inner")
        ?.classList.remove("cursor");
    }
    setBattleModal(false);
  };

  return (
    <>
      <Index.Modal
        open={showWinnewModal}
        onClose={() => {
          handleCloseWinnerModal();
          setShow(false);
          setGameWinnerUser("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details modal-blur-common-remove "
      >
        <Index.Box sx={style} className="modal-comman-inner-style">
          <Index.Box className="modal-cancel-btn">
            <Index.Button className="btn btn-cancel">
              <img
                src={PageIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
                onClick={() => {
                  {
                    handleCloseWinnerModal();
                    setShow(false);
                    setGameWinnerUser("");
                  }
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
                  <PagesIndex.BlueOutlineButton
                    variant="contained"
                    color="error"
                    btnLabel="Ok"
                    className="outline-blue-btn-content"
                    onClick={() => {
                      handleCloseWinnerModal();
                      setShow(false);
                    }}
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Modal>

      <Index.Box className="dashbaord-user-main-page">
        <Index.Box className="dasboard-flex-user-main">
          <Index.Box className="left-dashboard-main-user">
            {/*  */}
            <Index.Box className="betting-three-main">
              <Index.Box className="spin-ball-strike-content"></Index.Box>
              <Index.Box className="game-spin-main-content">
                <Index.Box className="game-spin-details">
                  <Index.Box
                    className={
                      socketTimer == 0
                        ? "spin-arrow-content"
                        : "spin-arrow-content animation-spin-details"
                    }
                    // className="spin-arrow-content animation-spin-details"
                  ></Index.Box>
                  <Index.Box className="game-content-rounded">
                    <Index.Box className="gaming-brun">
                      <Index.Box
                        className={
                          socketTimer == 0
                            ? // ? "gaming-circle-count"
                              // : "gaming-circle-count wheels-rotated"
                              "gaming-circle-count two-wheel-bg"
                            : "gaming-circle-count two-wheel-bg wheels-rotated"
                        }
                        // className="gaming-circle-count wheels-rotated"
                        id={"gaming-circle-count"}
                        // className={second == 30 ?"gaming-circle-count gaming-cricle-first-sec": second == 60 ?"gaming-circle-count gaming-cricle-second-sec":second == 120 ?"gaming-circle-count gaming-cricle-third-sec":"gaming-circle-count"}
                      ></Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
              {/* <Index.Box className="user-data-game-show">
                <Index.Box className="user-show-details">
                  <Index.Box className="tab-details-setting tab-three-details">
                    <Index.Box className="three-color-betting-tabs tab-account-user">
                      <Index.Box
                        sx={{ borderBottom: 1, borderColor: "divider" }}
                        className="tab-three-bet tab-border-user"
                      >
                        <Index.Tabs
                          value={value}
                          onChange={handleChange}
                          variant="scrollable"
                          scrollButtons
                          allowScrollButtonsMobile
                          aria-label="scrollable force tabs example"
                          className="tab-three-user-bet-content tab-content-user"
                        >
                          <Index.Tab
                            label="My Order"
                            {...a11yProps(0)}
                            className="tab-btn-details"
                          />
                        </Index.Tabs>

                        <CustomTabPanel value={value} index={0}>
                          <Index.Box className="user-listitem-details">
                            <Index.Box className="period-order-one">
                              <Index.Box className="myorder-thead-title">
                                <Index.Typography
                                  component="p"
                                  variant="p"
                                  className="myorder-comman-title"
                                >
                                  Period
                                </Index.Typography>
                              </Index.Box>
                              {singleuserList?.map((data) => {
                                if (data?.isWin == true) {
                                  return (
                                    <Index.Box className="myorder-description-details">
                                      <Index.Box className="myorder-desc-periods comman-myorder-description">
                                        <Index.Typography
                                          component="p"
                                          variant="p"
                                          className="myorder-periods-details-show comman-order-show"
                                        >
                                          {data?.period}
                                        </Index.Typography>
                                      </Index.Box>
                                    </Index.Box>
                                  );
                                }
                              })}
                            </Index.Box>
                            <Index.Box className="select-order-two">
                              <Index.Box className="myorder-thead-title">
                                <Index.Typography
                                  component="p"
                                  variant="p"
                                  className="myorder-comman-title"
                                >
                                  Select
                                </Index.Typography>
                              </Index.Box>

                              {singleuserList?.map((data) => {
                                const str = data?.colourName;
                                const betSideUppercase =
                                  str.charAt(0).toUpperCase() + str.slice(1);
                                if (data?.isWin == true) {
                                  return (
                                    <Index.Box className="select-description-details">
                                      <Index.Box className="myorder-desc-select comman-myorder-description">
                                        <Index.Typography
                                          component="p"
                                          variant="p"
                                          className={`myorder-select-details-show comman-order-show ${
                                            data?.colourName == "red"
                                              ? "red-text-order"
                                              : data?.colourName == "orange"
                                              ? "orange-text-order"
                                              : data?.colourName == "green" &&
                                                "green-text-order"
                                          }`}
                                        >
                                          {betSideUppercase}
                                        </Index.Typography>
                                      </Index.Box>
                                    </Index.Box>
                                  );
                                }
                              })}
                            </Index.Box>

                            <Index.Box className="amount-order-three">
                              <Index.Box className="myorder-thead-title">
                                <Index.Typography
                                  component="p"
                                  variant="p"
                                  className="myorder-comman-title"
                                >
                                  Amount
                                </Index.Typography>
                              </Index.Box>

                              {singleuserList?.map((data) => {
                                if (data?.isWin == true) {
                                  return (
                                    <Index.Box className="amount-description-details">
                                      <Index.Box className="myorder-desc-amount comman-myorder-description text-center">
                                        <Index.Typography
                                          component="p"
                                          variant="p"
                                          className="myorder-amount-details-show comman-order-show"
                                        >
                                          {data?.price}
                                        </Index.Typography>
                                      </Index.Box>
                                    </Index.Box>
                                  );
                                }
                              })}
                            </Index.Box>
                          </Index.Box>
                        </CustomTabPanel>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box> */}
              <Index.Box className="game-controller-details">
                <Index.Box className="game-amount-details">
                  <Index.Box className="game-amount-title">
                    Bet Amount
                  </Index.Box>
                  <Index.Box className="game-amount-inner">
                    <Index.Box className="game-amount-landscape">
                      <Index.Box className="amount-landscape-inner">
                        <Index.Box className="amount-landscape-center">
                          <Index.Typography
                            className="game-amount-landscape-label"
                            variant="label"
                            component="label"
                          ></Index.Typography>
                          <Index.TextField
                            className="amount-form-control"
                            type="number"
                            onWheel={(event) => event.target.blur()}
                            name="number"
                            disabled={disableButtons}
                            value={count}
                            onChange={(e) => {
                              if (!e.target.value) {
                                setCount(gameId.gameMinimumCoin);
                                return;
                              }
                              const value = parseInt(e.target.value);
                              const minCoin = parseInt(gameId.gameMinimumCoin);
                              const maxCoin = parseInt(gameId.gameMaximumCoin);

                              if (!isNaN(minCoin) && !isNaN(maxCoin)) {
                                // Check conditions and set count accordingly
                                if (value < minCoin) {
                                  setCount(minCoin);
                                } else if (value > maxCoin) {
                                  setCount(maxCoin);
                                } else {
                                  setCount(value);
                                }
                              }
                            }}
                          />
                        </Index.Box>
                        <Index.Box className="amount-landscape-game-btns">
                          <Index.Box
                            className="game-amount-landscape-btn game-topleft"
                            disabled={disableButtons || IncDisableButtons}
                            onClick={() => setCount(gameId.gameMaximumCoin)}
                          >
                            max
                          </Index.Box>
                          <Index.Box
                            className="game-amount-landscape-btn game-topright"
                            disabled={disableButtons || IncDisableButtons}
                            onClick={() => increaseCount(5)}
                          >
                            +
                          </Index.Box>
                          <Index.Box
                            className="game-amount-landscape-btn game-bottomleft"
                            disabled={disableButtons || DncDisableButtons}
                            onClick={() => decreaseCount(5)}
                          >
                            -
                          </Index.Box>
                          <Index.Box
                            className="game-amount-landscape-btn game-bottomright"
                            disabled={disableButtons || DncDisableButtons}
                            onClick={() => setCount(gameId.gameMinimumCoin)}
                          >
                            min
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                {/* Select color buttons */}
                <Index.Box className="button-game-user-list two-color-bet-game-width ">
                  <Index.Box className="button-inner-list">
                    <Index.Button
                      className="button-item game-green-btn"
                      disabled={disableButtons}
                    >
                      <Index.Box className="button-led-game"></Index.Box>
                      <Index.Box className="button-sum-game"></Index.Box>
                      <Index.Box
                        onClick={(e) => {
                          handleClickBlue();
                        }}
                        className={`button-btn-game ${
                          isActiveBlue ? "down-active-btn" : ""
                        }`}
                      >
                        <span className="price-value-details">Red</span>
                        <span className="cancel-span">Cancel</span>
                      </Index.Box>
                      <Index.Box className="onclick-prices-hidden remove-price-onclick-blue">
                        {/* <span className="onclick-bet-price">$80.00</span> */}
                      </Index.Box>
                    </Index.Button>
                    <Index.Button
                      className="button-item game-purple-btn"
                      disabled={disableButtons}
                    >
                      <Index.Box className="button-led-game"></Index.Box>
                      <Index.Box className="button-sum-game"></Index.Box>
                      <Index.Box
                        onClick={(e) => {
                          handleClickGreen();
                        }}
                        className={`button-btn-game ${
                          isActive ? "down-active-btn" : ""
                        }`}
                      >
                        <span className="price-value-details">Green</span>
                        <span className="cancel-span">Cancel</span>
                      </Index.Box>
                      <Index.Box className="onclick-prices-hidden remove-price-onclick-green">
                        {/* <span className="onclick-bet-price">$80.00</span> */}
                      </Index.Box>
                    </Index.Button>
                  </Index.Box>
                </Index.Box>
                {/* Place bet and timer circle */}
                <Index.Box className="button-control-game two-btn-control-game">
                  <Index.Box className="button-control-inner">
                    <Index.Box
                      className="button-landscape"
                      onClick={(e) => {
                        // if (!walletAddress) {
                        //   setOpen(true); // connect to wallet
                        //   return;
                        // }
                        if (selectedSecond == "") {
                          toast.error("Please select game time");
                        }
                        if (userAmounts <= count) {
                          toast.error("balance is insufficient");
                        } else {
                          handleRemoveBg(e);
                          setBattleModal(true);
                        }
                      }}
                    >
                      <Index.Box className="button-landscape-inner">
                        <span
                          className="button-landscape-text"
                          id="rotate-choose-none"
                        >
                          Choose color
                        </span>
                        <span className="onclick-color-text">
                          {winnerAnnounced
                            ? `${GameWinnerUser} color won.`
                            : "Place bet"}
                        </span>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box className="choose-process">
                      <Index.Box
                        className="liner-border-choose"
                        id="line-single-id"
                      >
                        <Index.Box className="button-await-details"></Index.Box>
                        <Index.Box className="border-timer-rounded ">
                          <svg viewBox="0 0 64 64">
                            <circle
                              r="25%"
                              cx="50%"
                              cy="50%"
                              stroke-width="0.6"
                              fill-opacity="0"
                              stroke="#65cc01"
                            ></circle>
                          </svg>
                        </Index.Box>
                      </Index.Box>
                      <Index.Box
                        className="choose-mutiple-rounded choose-d-done"
                        id="choose-multiple-id"
                      >
                        <Index.Box className="multi-line-border">
                          <img
                            src={PageIndex.Svg.loaderimg}
                            className="loader-img-multi"
                          ></img>
                        </Index.Box>
                      </Index.Box>
                      <Index.Box className="multiple-line-timer-show">
                        <Index.Typography
                          className="multiline-title"
                          variant="p"
                          component="p"
                        >
                          <Index.Box className="countdown-text resend-main">
                            {socketTimer > 0 ? socketTimer : <>0</>}
                          </Index.Box>
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box className="timer-right-control">
                    <Index.Typography
                      className="timer-title"
                      variant="p"
                      component="p"
                    ></Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>

            {/* my records */}
            <Index.Box className="my-record-margin">
              <Index.Box className="game-record-title">
                <Index.Typography
                  className="record-title"
                  component="p"
                  variant="p"
                >
                  {" "}
                  My Records :
                </Index.Typography>
              </Index.Box>

              {firstTwentyMyRecords.length ? (
                <Index.Box className="game-records-details">
                  <Index.Box className="accordian-records-details">
                    {firstTwentyMyRecords?.map((ele, index) => {
                      const str = ele?.colourName;
                      const betSideUppercase =
                        str.charAt(0).toUpperCase() + str.slice(1);
                      return (
                        <Index.Accordion
                          className="accordian-main-record"
                          expanded={expanded === index + 1}
                          onChange={() =>
                            handleChangeAccro(index + 1, expanded)
                          }
                        >
                          <Index.AccordionSummary
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                            className="accordian-summary-record"
                            expandIcon={
                              <Index.ExpandMoreIcon className="accordian-icon-record" />
                            }
                          >
                            {/* <Index.Typography className="accordian-main-record-title">{ele?.period} <span className='yellow-span'>Wait!</span></Index.Typography> */}
                            <Index.Typography className="accordian-main-record-title">
                              {ele?.period}{" "}
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
                          </Index.AccordionSummary>
                          <Index.AccordionDetails className="accordian-inner-details-record">
                            <Index.Typography className="accordian-inner-description">
                              <Index.Typography
                                component="h4"
                                variant="h4"
                                className="accoro-details-title"
                              >
                                Period Details
                              </Index.Typography>
                              <Index.Box className="my-record-details">
                                <Index.Box className="my-record-content-details">
                                  <Index.Typography
                                    className="period-my-record"
                                    component="p"
                                    variant="p"
                                  >
                                    Period id:<span>{ele?.period}</span>
                                  </Index.Typography>
                                </Index.Box>
                                <Index.Box className="my-record-content-details">
                                  <Index.Typography
                                    className="period-my-record"
                                    component="p"
                                    variant="p"
                                  >
                                    Bet coins:<span>{ele?.price}</span>
                                  </Index.Typography>
                                </Index.Box>
                                <Index.Box className="my-record-content-details">
                                  <Index.Typography
                                    className="period-my-record"
                                    component="p"
                                    variant="p"
                                  >
                                    Selected color:
                                    <span>{betSideUppercase}</span>
                                  </Index.Typography>
                                </Index.Box>
                                <Index.Box className="my-record-content-details">
                                  <Index.Typography
                                    className="period-my-record"
                                    component="p"
                                    variant="p"
                                  >
                                    Bet status:
                                    <span>Successful</span>
                                  </Index.Typography>
                                </Index.Box>
                                <Index.Box className="my-record-content-details">
                                  <Index.Typography
                                    className="period-my-record"
                                    component="p"
                                    variant="p"
                                  >
                                    Created at:
                                    <span>
                                      {moment(ele?.betCreatedAt).format(
                                        "YYYY-MM-D, hh:mm "
                                      )}
                                    </span>
                                  </Index.Typography>
                                </Index.Box>
                                <Index.Box className="my-record-content-details">
                                  <Index.Typography
                                    className="period-my-record"
                                    component="p"
                                    variant="p"
                                  >
                                    {ele?.status == "pending" ? (
                                      <>
                                        Winning coins (approx.) :
                                        <span>
                                          {ele?.price * ele?.winningAmount +
                                            ele?.price}
                                        </span>
                                      </>
                                    ) : ele?.isWin == true ? (
                                      <>
                                        Winning coins (approx.) :
                                        <span>
                                          {ele?.price * ele?.winningAmount +
                                            ele?.price}
                                        </span>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </Index.Typography>
                                </Index.Box>
                                <Index.Box className="my-record-content-details">
                                  {/* <Index.Typography className="period-my-record" component='p' variant='p'>Result:<span>Pending</span></Index.Typography> */}
                                </Index.Box>
                              </Index.Box>
                            </Index.Typography>
                          </Index.AccordionDetails>
                        </Index.Accordion>
                      );
                    })}
                  </Index.Box>
                  {firstTwentyMyRecords.length >= 10 ? (
                    <Index.Box className="more-right-record">
                      <Index.Box
                        className="more-link-content"
                        onClick={() => {
                          navigate("/user/three-color-betting/my-records", {
                            state: {
                              singleuserList: singleuserList,
                              selectedSecond: selectedSecond,
                              ele: location?.state?.ele,
                            },
                          });
                        }}
                        // to="/user/three-color-betting/my-records"
                      >
                        More &#8811;
                      </Index.Box>
                    </Index.Box>
                  ) : (
                    ""
                  )}
                </Index.Box>
              ) : (
                <Index.Box className="my-record-content-details">
                  <Index.Typography
                    className="my-record-data-not-found"
                    component="p"
                    variant="p"
                  >
                    No record found
                  </Index.Typography>
                </Index.Box>
              )}
            </Index.Box>

            {/* game records */}

            <Index.Box className="game-records-details">
              <Index.Box className="game-record-title">
                <Index.Typography
                  className="record-title"
                  component="p"
                  variant="p"
                >
                  {" "}
                  Game Records : {periodData?.period}{" "}
                </Index.Typography>
              </Index.Box>
              <Index.Box className="game-details-uldetails">
                <Index.List className="game-records-ul">
                  <Index.ListItem className="game-record--listitem">
                    <Index.Box className="record-box-content">
                      {/* <Index.Box className="comman-bg-record red-bg-record"> */}
                      <Index.Box className={`comman-bg-record`}>
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="comman-text-content"
                        >
                          {"?"}
                        </Index.Typography>
                      </Index.Box>
                      <Index.Box className="game-record-number-id">
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="recordid-text-content"
                        >
                          {/* {periodData?.period} */}
                          {periodData?.period
                            ? periodData?.period?.toString()?.slice(-3)
                            : "-"}
                        </Index.Typography>

                        {/* <Index.Typography component='p' variant='p' className='recordid-text-content'>{userData?.count?.toString().padStart(4, '0')}</Index.Typography> */}
                      </Index.Box>
                    </Index.Box>
                  </Index.ListItem>

                  {firstTwentyAllRecords?.map((userData) => {
                    const Color_firstCharacter = userData?.winColour
                      ?.charAt(0)
                      ?.toUpperCase();
                      if(userData?.period == periodData?.period){
                        return (<></>)
                      }
                    return (
                      <>
                        <Index.ListItem className="game-record--listitem">
                          <Index.Box className="record-box-content">
                            {/* <Index.Box className="comman-bg-record red-bg-record"> */}
                            <Index.Box
                              className={`comman-bg-record ${
                                userData?.winColour == "orange"
                                  ? "green-bg-record"
                                  : userData?.winColour == "red"
                                  ? "red-bg-record"
                                  : userData?.winColour == "green"
                                  ? "orange-bg-record"
                                  : null
                              }`}
                            >
                              <Index.Typography
                                component="p"
                                variant="p"
                                className="comman-text-content"
                              >
                                {userData?.winColour
                                  ? Color_firstCharacter
                                  : "?"}
                              </Index.Typography>
                            </Index.Box>
                            <Index.Box className="game-record-number-id">
                              <Index.Typography
                                component="p"
                                variant="p"
                                className="recordid-text-content"
                              >
                                {/* {userData?.period} */}
                                {userData?.period
                                  ? userData?.period?.toString()?.slice(-3)
                                  : "-"}
                              </Index.Typography>
                              {/* <Index.Typography component='p' variant='p' className='recordid-text-content'>{userData?.totalUsers}</Index.Typography> */}
                              {/* <Index.Typography component='p' variant='p' className='recordid-text-content'>{userData?.count?.toString().padStart(4, '0')}</Index.Typography> */}
                            </Index.Box>
                          </Index.Box>
                        </Index.ListItem>
                      </>
                    );
                  })}
                </Index.List>
                {isMoreGameRecords() ? (
                  <Index.Box className="more-right-record">
                    <Index.Box
                      className="more-link-content"
                      onClick={() => {
                        navigate("/user/two-color-betting/all-records", {
                          state: {
                            getallGameData: getallGameData,
                            selectedSecond: selectedSecond,
                            ele: location?.state?.ele,
                          },
                        });
                      }}
                      // to="/user/two-color-betting/my-records"
                    >
                      More &#8811;
                    </Index.Box>
                  </Index.Box>
                ) : (
                  ""
                )}
              </Index.Box>
            </Index.Box>

            {/* my orders */}

            <Index.Box className="my-record-details">
              {/* <Index.Box className="game-record-title">
                <Index.Typography
                  className="record-title"
                  component="p"
                  variant="p"
                >
                  My Orders :
                </Index.Typography>
              </Index.Box> */}
              {singleuserList.some((data) => data && data.isWin === true) && (
                <Index.Box className="game-record-title">
                  <Index.Typography
                    className="record-title"
                    component="p"
                    variant="p"
                  >
                    My Orders :
                  </Index.Typography>
                </Index.Box>
              )}
              <Index.Box className="user-listitem-details user-listitem-details-two-color">
                <Index.Box className="period-order-one">
                  {/* <Index.Box className="myorder-thead-title">
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="myorder-comman-title"
                    >
                      Period
                    </Index.Typography>
                  </Index.Box> */}
                  {singleuserList.some(
                    (data) => data && data.isWin === true
                  ) && (
                    <Index.Box className="myorder-thead-title">
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="myorder-comman-title"
                      >
                        Periods
                      </Index.Typography>
                    </Index.Box>
                  )}

                  {singleuserList?.map((data) => {
                    if (data?.isWin == true) {
                      return (
                        <Index.Box className="myorder-description-details">
                          <Index.Box className="myorder-desc-periods comman-myorder-description">
                            <Index.Typography
                              component="p"
                              variant="p"
                              className="myorder-periods-details-show comman-order-show"
                            >
                              {data?.period}
                            </Index.Typography>
                          </Index.Box>
                        </Index.Box>
                      );
                    }
                  })}
                </Index.Box>

                <Index.Box className="select-order-two">
                  {/* <Index.Box className="myorder-thead-title">
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="myorder-comman-title"
                    >
                      Selected Color
                    </Index.Typography>
                  </Index.Box> */}

                  {singleuserList.some(
                    (data) => data && data.isWin === true
                  ) && (
                    <Index.Box className="myorder-thead-title">
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="myorder-comman-title"
                      >
                        Selected Color
                      </Index.Typography>
                    </Index.Box>
                  )}

                  {singleuserList?.map((data) => {
                    const str = data?.colourName;
                    const betSideUppercase =
                      str.charAt(0).toUpperCase() + str.slice(1);
                    if (data?.isWin == true) {
                      return (
                        <Index.Box className="select-description-details">
                          <Index.Box className="myorder-desc-select comman-myorder-description">
                            <Index.Typography
                              component="p"
                              variant="p"
                              className={`myorder-select-details-show comman-order-show ${
                                data?.colourName == "red"
                                  ? "red-text-order"
                                  : data?.colourName == "orange"
                                  ? "orange-text-order"
                                  : data?.colourName == "green" &&
                                    "green-text-order"
                              }`}
                            >
                              {betSideUppercase}
                            </Index.Typography>
                          </Index.Box>
                        </Index.Box>
                      );
                    }
                  })}
                </Index.Box>
                {/* <Index.Box className="result-order-three">
                  <Index.Box className="myorder-thead-title">
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="myorder-comman-title"
                    >
                      Result
                    </Index.Typography>
                  </Index.Box>
                  {singleuserList?.map((data) => {
                    if (data?.isWin == true) {
                      return (
                        <Index.Box className="result-description-details">
                          <Index.Box className="myorder-desc-result comman-myorder-description">
                            <Index.Typography
                              component="p"
                              variant="p"
                              className={
                                data?.isWin == true
                                  ? "myorder-price-details-show comman-order-show win-text-color"
                                  : "myorder-price-details-show comman-order-show"
                              }
                            >
                              {data?.isWin == true ? "Win" : "Loss"}
                            </Index.Typography>
                          </Index.Box>
                        </Index.Box>
                      );
                    }
                  })}
                </Index.Box> */}
                <Index.Box className="amount-order-three">
                  {singleuserList.some(
                    (data) => data && data.isWin === true
                  ) && (
                    <Index.Box className="myorder-thead-title">
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="myorder-comman-title"
                      >
                        Amount
                      </Index.Typography>
                    </Index.Box>
                  )}
                  {/* <Index.Box className="myorder-thead-title">
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="myorder-comman-title"
                    >
                      Amount
                    </Index.Typography>
                  </Index.Box> */}

                  {singleuserList?.map((data) => {
                    if (data?.isWin == true) {
                      return (
                        <Index.Box className="amount-description-details">
                          <Index.Box className="myorder-desc-amount comman-myorder-description">
                            <Index.Typography
                              component="p"
                              variant="p"
                              className="myorder-amount-details-show comman-order-show"
                            >
                              {data?.price}
                            </Index.Typography>
                          </Index.Box>
                        </Index.Box>
                      );
                    }
                  })}
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>

          {/* <CardAndCommunityBetting /> */}
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
        </Index.Box>

        <Index.Modal
          open={battleModal}
          onClose={() => {
            setBattleModal(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-comman-details two-color-betting bg-noblur"
        >
          <Index.Box sx={style} className="modal-comman-inner-style">
            <Index.Box className="modal-cancel-btn">
              <Index.Button className="btn btn-cancel">
                <img
                  src={PageIndex.Svg.cancelmodal}
                  className="cancel-modal"
                  alt="modal-cancel"
                  onClick={() => {
                    closeBetConfirmModal();
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
                    {`You want to bet ${count} coin for ${
                      selectedColor.charAt(0).toUpperCase() +
                      selectedColor.slice(1)
                    } `}
                  </Index.Typography>
                </Index.Box>
                <Index.Box className="deleteModel-btna1">
                  <Index.Box className="btn-col">
                    <PagesIndex.BlueOutlineButton
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
    </>
  );
}
