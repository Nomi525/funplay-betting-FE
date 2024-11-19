import React, { useEffect, useRef, useState } from "react";
import Index from "../../../Index";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import moment from "moment";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { getTotalCoins, userAmount } from "../../../../redux/user/userReducer";
import PagesIndex from "../../../pageIndex";
import PageIndex from "../../../pageIndex";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import CardAndCommunityBetting from "../../../../component/comman/cardAndCommunityBetting/CardAndCommunityBetting";
import { io } from "socket.io-client";
const Accordion = styled((props) => (
  <Index.MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <Index.MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

//  <img className="card-flip-middle-content" src={PageIndex.Png.cardbet} />;
// const cardsImages = [
//   { img: PageIndex.Png.clubs_2, name: "clubs_2" },
//   { img: PageIndex.Png.clubs_3, name: "clubs_3" },
//   { img: PageIndex.Png.clubs_4, name: "clubs_4" },
//   { img: PageIndex.Png.clubs_5, name: "clubs_5" },
//   { img: PageIndex.Png.clubs_6, name: "clubs_6" },
//   { img: PageIndex.Png.clubs_7, name: "clubs_7" },
//   { img: PageIndex.Png.clubs_8, name: "clubs_8" },
//   { img: PageIndex.Png.clubs_9, name: "clubs_9" },
//   { img: PageIndex.Png.clubs_10, name: "clubs_10" },
//   { img: PageIndex.Png.clubs_ace, name: "clubs_ace" },
//   { img: PageIndex.Png.clubs_jack, name: "clubs_jack" },
//   { img: PageIndex.Png.clubs_king, name: "clubs_king" },
//   { img: PageIndex.Png.clubs_queen, name: "clubs_queen" },
//   { img: PageIndex.Png.diamonds_2, name: "diamonds_2" },
//   { img: PageIndex.Png.diamonds_3, name: "diamonds_3" },
//   { img: PageIndex.Png.diamonds_4, name: "diamonds_4" },
//   { img: PageIndex.Png.diamonds_5, name: "diamonds_5" },
//   { img: PageIndex.Png.diamonds_6, name: "diamonds_6" },
//   { img: PageIndex.Png.diamonds_7, name: "diamonds_7" },
//   { img: PageIndex.Png.diamonds_8, name: "diamonds_8" },
//   { img: PageIndex.Png.diamonds_9, name: "diamonds_9" },
//   { img: PageIndex.Png.diamonds_10, name: "diamonds_10" },
//   { img: PageIndex.Png.diamonds_ace, name: "diamonds_ace" },
//   { img: PageIndex.Png.diamonds_jack, name: "diamonds_jack" },
//   { img: PageIndex.Png.diamonds_king, name: "diamonds_queen" },
//   { img: PageIndex.Png.hearts_2, name: "hearts_2" },
//   { img: PageIndex.Png.hearts_3, name: "hearts_3" },
//   { img: PageIndex.Png.hearts_4, name: "hearts_4" },
//   { img: PageIndex.Png.hearts_5, name: "hearts_5" },
//   { img: PageIndex.Png.hearts_6, name: "hearts_6" },
//   { img: PageIndex.Png.hearts_7, name: "hearts_7" },
//   { img: PageIndex.Png.hearts_8, name: "hearts_8" },
//   { img: PageIndex.Png.hearts_9, name: "hearts_9" },
//   { img: PageIndex.Png.hearts_10, name: "hearts_10" },
//   { img: PageIndex.Png.hearts_ace, name: "hearts_ace" },
//   { img: PageIndex.Png.hearts_jack, name: "hearts_jack" },
//   { img: PageIndex.Png.hearts_king, name: "hearts_king" },
//   { img: PageIndex.Png.hearts_queen, name: "hearts_queen" },
//   { img: PageIndex.Png.joker_red, name: "joker_red" },
//   { img: PageIndex.Png.joker_black, name: "joker_black" },
//   { img: PageIndex.Png.spades_2, name: "spades_2" },
//   { img: PageIndex.Png.spades_3, name: "spades_3" },
//   { img: PageIndex.Png.spades_4, name: "spades_4" },
//   { img: PageIndex.Png.spades_5, name: "spades_5" },
//   { img: PageIndex.Png.spades_6, name: "spades_6" },
//   { img: PageIndex.Png.spades_7, name: "spades_7" },
//   { img: PageIndex.Png.spades_8, name: "spades_8" },
//   { img: PageIndex.Png.spades_9, name: "spades_9" },
//   { img: PageIndex.Png.spades_10, name: "spades_10" },
//   { img: PageIndex.Png.spades_ace, name: "spades_ace" },
//   { img: PageIndex.Png.spades_jack, name: "spades_jack" },
//   { img: PageIndex.Png.spades_king, name: "spades_king" },
//   { img: PageIndex.Png.spades_queen, name: "spades_queen" },
// ];

const cardsImages = [
  { img: PageIndex.Png.clubs_2, name: "2" },
  { img: PageIndex.Png.clubs_3, name: "3" },
  { img: PageIndex.Png.clubs_4, name: "4" },

  { img: PageIndex.Png.diamonds_5, name: "5" },
  { img: PageIndex.Png.diamonds_6, name: "6" },
  { img: PageIndex.Png.spades_8, name: "8" },

  { img: PageIndex.Png.spades_9, name: "9" },
  { img: PageIndex.Png.hearts_10, name: "10" },

  { img: PageIndex.Png.spades_ace, name: "A" },

  { img: PageIndex.Png.spades_jack, name: "J" },
  { img: PageIndex.Png.spades_king, name: "K" },
  { img: PageIndex.Png.spades_queen, name: "Q" },

  // { img: PageIndex.Png.clubs_3, name: "clubs_3" },
  // { img: PageIndex.Png.clubs_4, name: "clubs_4" },
  // { img: PageIndex.Png.clubs_5, name: "clubs_5" },
  // { img: PageIndex.Png.clubs_6, name: "clubs_6" },
  // { img: PageIndex.Png.clubs_7, name: "clubs_7" },
  // { img: PageIndex.Png.clubs_8, name: "clubs_8" },
  // { img: PageIndex.Png.clubs_9, name: "clubs_9" },
  // { img: PageIndex.Png.clubs_10, name: "clubs_10" },
  // { img: PageIndex.Png.clubs_ace, name: "clubs_ace" },
  // { img: PageIndex.Png.clubs_jack, name: "clubs_jack" },
  // { img: PageIndex.Png.clubs_king, name: "clubs_king" },
  // { img: PageIndex.Png.clubs_queen, name: "clubs_queen" },
  // { img: PageIndex.Png.diamonds_2, name: "diamonds_2" },
  // { img: PageIndex.Png.diamonds_3, name: "diamonds_3" },
  // { img: PageIndex.Png.diamonds_4, name: "diamonds_4" },
  // { img: PageIndex.Png.diamonds_5, name: "diamonds_5" },
  // { img: PageIndex.Png.diamonds_6, name: "diamonds_6" },
  // { img: PageIndex.Png.diamonds_7, name: "diamonds_7" },
  // { img: PageIndex.Png.diamonds_8, name: "diamonds_8" },
  // { img: PageIndex.Png.diamonds_9, name: "diamonds_9" },
  // { img: PageIndex.Png.diamonds_10, name: "diamonds_10" },
  // { img: PageIndex.Png.diamonds_ace, name: "diamonds_ace" },
  // { img: PageIndex.Png.diamonds_jack, name: "diamonds_jack" },
  // { img: PageIndex.Png.diamonds_king, name: "diamonds_queen" },
  // { img: PageIndex.Png.hearts_2, name: "hearts_2" },
  // { img: PageIndex.Png.hearts_3, name: "hearts_3" },
  // { img: PageIndex.Png.hearts_4, name: "hearts_4" },
  // { img: PageIndex.Png.hearts_5, name: "hearts_5" },
  // { img: PageIndex.Png.hearts_6, name: "hearts_6" },
  // { img: PageIndex.Png.hearts_7, name: "hearts_7" },
  // { img: PageIndex.Png.hearts_8, name: "hearts_8" },
  // { img: PageIndex.Png.hearts_9, name: "hearts_9" },
  // { img: PageIndex.Png.hearts_10, name: "hearts_10" },
  // { img: PageIndex.Png.hearts_ace, name: "hearts_ace" },
  // { img: PageIndex.Png.hearts_jack, name: "hearts_jack" },
  // { img: PageIndex.Png.hearts_king, name: "hearts_king" },
  // { img: PageIndex.Png.hearts_queen, name: "hearts_queen" },
  // { img: PageIndex.Png.joker_red, name: "joker_red" },
  // { img: PageIndex.Png.joker_black, name: "joker_black" },
  // { img: PageIndex.Png.spades_2, name: "spades_2" },
  // { img: PageIndex.Png.spades_3, name: "spades_3" },
  // { img: PageIndex.Png.spades_4, name: "spades_4" },
  // { img: PageIndex.Png.spades_5, name: "spades_5" },
  // { img: PageIndex.Png.spades_6, name: "spades_6" },
  // { img: PageIndex.Png.spades_7, name: "spades_7" },
  // { img: PageIndex.Png.spades_8, name: "spades_8" },
  // { img: PageIndex.Png.spades_9, name: "spades_9" },
  // { img: PageIndex.Png.spades_10, name: "spades_10" },
  // { img: PageIndex.Png.spades_ace, name: "spades_ace" },
  // { img: PageIndex.Png.spades_jack, name: "spades_jack" },
  // { img: PageIndex.Png.spades_king, name: "spades_king" },
  // { img: PageIndex.Png.spades_queen, name: "spades_queen" },
];

var socket;

export default function UserCardBetting() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedSecond = location?.state?.selectedSecond;
  const storedValue = localStorage.getItem("userGameId");
  const gameId = JSON.parse(storedValue);

  const [expanded, setExpanded] = React.useState("panel1");
  let timeRef = useRef(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [time, setTime] = useState([]);
  const [disableButtons, setDisableButtons] = useState(false);
  const [minBtn, setMinBtn] = useState(false);
  const [maxBtn, setMaxBtn] = useState(false);
  const [battleModal, setBattleModal] = useState(false);
  const [showWinnewModal, setShowWinnewModal] = useState(false);
  const [betSide, setBetSide] = useState("");
  const [count, setCount] = useState(gameId?.gameMinimumCoin);
  const dispatch = useDispatch();
  const [singleuserList, setSingleUserList] = useState([]);
  const [getallGameData, setGetallGameData] = useState([]);
  const [gameTimer, setGameTimer] = useState("");
  const [hours, minutess, secondss] = gameTimer.split(":").map(Number);
  const totalSeconds = hours * 3600 + minutess * 60 + secondss;
  const [periodData, setPeriodData] = useState({});
  const startDate = moment(gameId?.gameTimeFrom).format("YYYY/MM/DD ");
  const endDate = moment(gameId?.gameTimeTo).format("YYYY/MM/DD");
  const startDateTime = moment(startDate + " " + gameId?.gameDurationFrom);
  const endDateTime = moment(endDate + " " + gameId?.gameDurationTo);
  const currentDateTime = moment();
  const [isValidBetAmount, setIsValidBetAmount] = useState(false);

  console.log(totalSeconds, 241);

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
    openChatDrawer,
    setOpenChatDrawer,
    allLiveBets,
    setAllLiveBets,
  ] = useOutletContext();

  //socket state

  const [socketTimer, setSocketTimer] = useState("");

  //socket call
  useEffect(() => {
    socket = io(Api.common.TIMER_SOCKET);
  }, []);
  const socketCall = () => {
    // const data = {
    //   gameId: location?.state?.ele?._id,
    //   duration: selectedSecond,
    // };

    // socket.emit("startTimer", data);
    // console.log(data, "data152");
    // socket.on("timer", (data) => {
    //   if (data?.gameId == location?.state?.ele?._id) {
    //     setSocketTimer(data?.remainingTime);
    //   }
    // });
    const data = {
      gameId: location?.state?.ele?._id,
      second: selectedSecond,
    };
    socket.emit("requestPeriod", data);
    socket.on("updateTimer", (data) => {
      // if (data?.gameId == location?.state?.ele?._id) {
      setSocketTimer(data?.seconds);
      setPeriodData(data?.periodData);
      // }
    });
  };

  useEffect(() => {
    socketCall();
  }, []);

  const handleChangeAccro = (panel, expanded) => {
    setExpanded(expanded == panel ? "" : panel);
  };
  const userAmounts = useSelector(
    (state) => state?.UserReducer?.totalCoins?.totalCoin
  );
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
      `${Api.User.GET_CARD_MY_RECORDS}/${gameId?._id}?second=${selectedSecond}`
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

  const getAllData = (isCallingFirstTime) => {
    DataService.get(
      `${Api.User.GET_ALL_CARD_GAME_PERIOD}/${gameId?._id}?second=${selectedSecond}`
    )
      .then((res) => {
        let data = res?.data?.data;
        data.reverse();
        // if(isCallingFirstTime){
        //   data = data?.slice(1)
        // }
        setGetallGameData(data);
      })

      .catch((error) => {
        toast.error(error?.data?.message, {
          toastId: "customId",
        });
      });
  };
  let firstTwentyAllRecords =
    window.innerWidth < 768
      ? getallGameData?.slice(0, 3)
      : getallGameData?.slice(0, 20);

  const firstTwentyMyRecords = singleuserList.slice(0, 10);

  const isMoreGameRecords = () => {
    const isMobile = window.innerWidth < 768;
    return isMobile
      ? getallGameData?.length >= 3
      : getallGameData?.length >= 20;
  };

  // card flip logics
  const [winningCard, setWinningCard] = useState(null);

  console.log(winningCard, 344);

  const winnerDeclaration = async () => {
    await DataService.get(
      `${Api.User.CARD_WINNER_RESULT}/${gameId?._id}/${periodData?.period}?second=${selectedSecond}`
    )
      .then((res) => {
        console.log(res?.data, 267);
        console.log(res?.data?.data?.[0]?.colourName, 352);
        const cardNumber = res?.data?.message.split(" ").pop(); // Extract card number
        const winningCardInfo = cardsImages?.find(
          (card) => card?.name == cardNumber
        );
        console.log(winningCardInfo, 288);
        setWinningCard(winningCardInfo);

        // card logic end

        if (res?.data?.data?.length == 0) {
          // setResponseMessage(
          //   `Victory Alert! The Winning Number is ${res?.data?.data?.[0]?.colourName}`
          // );
          // card flip logic
          // const { message, data } = res?.data;
          // console.log(res, 282);
          // console.log(message, data, 283);
          // if (res?.data?.message.includes("Winning Card")) {
          // console.log("371 ");
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

  useEffect(() => {
    if (socketTimer == 5) {
      winnerDeclaration();
    }
    // if (socketTimer == 0) {
    //   setTimeout(() => {
    //     socketCall();
    //   }, 1000);
    //   dispatch(userAmount())
    //     .then((res) => {
    //       toast.success(res?.data?.message, {
    //         toastId: "customId",
    //       });
    //     })
    //     .catch((error) => {
    //       toast.error(error?.data?.message, {
    //         toastId: "customId",
    //       });
    //     });
    //   if (responseMessage) {
    //     console.log(responseMessage, 408);
    //     setShowWinnewModal(true);
    //     setTimeout(() => setShowWinnewModal(false), 3000);
    //   }
    // }
    if (socketTimer == 0) {
      dispatch(getTotalCoins());
      dispatch(userAmount())
        .then((res) => {
          toast.success(res?.data?.message, {
            toastId: "customId",
          });
        })
        .catch((error) => {
          toast.error(error?.data?.message, {
            toastId: "customId",
          });
        });
      if (responseMessage) {
        setShowWinnewModal(true);
        setTimeout(() => {
          handleCloseWinnerModal();
        }, 3000);
      }
      setTimeout(() => {
        getGamePeriod();
        // socketCall();
      }, 4000);
      getSingleData();
      getAllData();
    }
  }, [socketTimer]);

  const calculateGameTime = (periodData) => {
    clearInterval(timeRef.current);
    timeRef.current = setInterval(() => {
      var timer = getCountdown(periodData?.endTime);

      if (timer === "00:00:00") {
        clearInterval(timeRef.current);
        setTimeout(() => {
          getGamePeriod();
          handleCloseWinnerModal();
        }, 4000);
        getSingleData();
        getAllData();
      }
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timeRef.current); // to clean up on unmount
  }, []);

  useEffect(() => {
    return () => setGameTimer("00:00:00"); // to clean up on unmount
  }, []);

  // useEffect(() => {
  //   if (Object.keys(periodData).length > 0) {
  //     periodData.endTime = moment
  //       .unix(periodData?.endTime)
  //       .format("hh:mm:ss A");
  //     calculateGameTime(periodData);
  //   }
  // }, [periodData]);

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

  const getGamePeriod = async () => {
    // await DataService?.get(
    //   `${Api.User.GET_GAME_PERIOD}/${gameId?._id}?second=${selectedSecond}`
    // )
    //   .then((res) => {
    //     if (res?.status == 200) {
    //       setPeriodData(res?.data?.data);
    //     } else {
    //       navigate("/user");
    //       toast.error("Game available soon", {
    //         toastId: "customId",
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     navigate("/user");
    //     toast.error("Game available soon", {
    //       toastId: "customId",
    //     });
    //   });
  };

  useEffect(() => {
    if (selectedSecond && gameId?._id) {
      getGamePeriod();
    }
  }, []);

  useEffect(() => {
    getSingleData();
    getAllData(1);
  }, []);

  // function
  const startBattle = () => {
    const data = {
      betAmount: count,
      gameId: gameId?._id,
      period: periodData?.period,
      card: betSide,
      selectedTime: selectedSecond,
    };
    if (userAmounts <= count) {
      toast.error("balance is insufficient");
    } else {
      DataService.post(Api.User.CREATE_CARD_BET, data)
        .then((res) => {
          if (res.data.status === 200 || res.data.status === 201) {
            socket?.emit("createColourBet");
            toast.success(res?.data?.message, {
              toastId: "customId",
            });
            getSingleData();
            dispatch(getTotalCoins());
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
          toast.error(error?.response?.data?.message, {
            toastId: "customId",
          });
        });
    }
    setBattleModal(false);
  };

  const increaseCount = (incrementValue) => {
    if (incrementValue) {
      setMinBtn(false);
    }
    if (gameId?.gameMaximumCoin <= count + incrementValue) {
      setCount(gameId?.gameMaximumCoin);
    } else if (userAmounts >= count + incrementValue) {
      setCount(count + incrementValue);
    } else {
      toast.error("Balance is insufficient", {
        toastId: "customId",
      });
    }
    if (gameId?.gameMaximumCoin === count) {
      // toast.error(`Maximum coin is ${gameId?.gameMaximumCoin}`, {
      //   toastId: "customId",
      // });
      setMaxBtn(true);
      setMinBtn(false);
    }
  };

  const decreaseCount = (decrementValue) => {
    if (decrementValue) {
      setMaxBtn(false);
    }
    if (gameId?.gameMinimumCoin <= count - decrementValue) {
      if (count >= decrementValue) {
        setCount(count - decrementValue);
      }
    } else if (gameId?.gameMinimumCoin >= count - decrementValue) {
      // toast.error(`Minimum coin is ${gameId?.gameMinimumCoin}`, {
      //   toastId: "customId",
      // });
      setMinBtn(true);
      setMaxBtn(false);
    }
  };
  useEffect(() => {
    if (socketTimer <= 20) {
      setDisableButtons(true);
      setBattleModal(false);
    } else {
      setDisableButtons(false);
      // setShowWinnewModal(false)
    }
  }, [socketTimer]);

  const handleCloseWinnerModal = () => {
    setResponseMessage("");
    setShowWinnewModal(false);
  };
  const totalSecondRound = (selectedSecond / selectedSecond) * 100;
  const pandingSecond = (socketTimer / selectedSecond) * 100;
  const getColor = () => {
    return socketTimer <= 10
      ? "red"
      : socketTimer >= 10 && socketTimer <= 30
      ? "orange"
      : socketTimer >= 30 && socketTimer <= 60
      ? "yellow"
      : socketTimer >= 60 && socketTimer <= 100
      ? "green"
      : "green";
  };

  useEffect(() => {
    if (
      !count ||
      parseInt(count) < parseInt(gameId?.gameMinimumCoin) ||
      parseInt(count) > parseInt(gameId?.gameMaximumCoin)
    ) {
      setIsValidBetAmount(false);
    } else {
      setIsValidBetAmount(true);
    }
  }, [count]);

  return (
    <>
      <Index.Modal
        open={showWinnewModal}
        onClose={() => {
          handleCloseWinnerModal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details modal-blur-common-remove"
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
                      // setWinningCard("");
                    }}
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Modal>

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
                  {`You want to bet ${count} coin for ${
                    betSide.charAt(0).toUpperCase() + betSide.slice(1)
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

      <Index.Box className="dashbaord-user-main-page">
        <Index.Box className="dasboard-flex-user-main">
          <Index.Box className="left-dashboard-main-user">
            <Index.Box className="card-betting-main-details">
              <Index.Box className="card-bet-row">
                <Index.Box className="card-col1">
                  <Index.Box className="card-bet-bg">
                    <Index.Box className="card-pd-bet">
                      <Index.Box className="card-bet-video">
                        <img
                          src={PageIndex.Png.cardbetting}
                          className="card-betting-video"
                        ></img>
                        {/* <video className="card-betting-video" autoPlay loop>
                                                    <source src={PageIndex.Video.Video1} type="video/mp4" alt="banner video" />
                                                </video> */}
                      </Index.Box>
                      {/* <Index.Box className="low-hight-card-main">
                        <Index.Box className="low-hight-card-flex">
                          <Index.Typography
                            className="low-card-title"
                            component="h5"
                            variant="h5"
                          >
                            Low Card
                          </Index.Typography>
                          <Index.Typography
                            className="high-card-title"
                            component="h5"
                            variant="h5"
                          >
                            High Card
                          </Index.Typography>
                        </Index.Box>
                      </Index.Box> */}
                      <Index.Box className="card-flip-small-video">
                        <Index.Box className="card-flip-small-bg">
                          <img
                            src={PageIndex.Png.cardbet}
                            className="card-small-bet-img"
                          ></img>
                        </Index.Box>
                      </Index.Box>
                      <Index.Box className="timer-progress-details">
                        <Index.Box className="timer-progress-bg">
                          {/* <Index.Box className="timer-text-pro">
                          {totalSeconds > 0 ? totalSeconds : <>0</>}
                          </Index.Box> */}
                          {/* <Index.Box className="progress-timer-green">
                            <img
                              src={PageIndex.Svg.subtract}
                              className="subtract-img"
                            ></img>
                          </Index.Box> */}
                          <CircularProgressbar
                            value={totalSecondRound - pandingSecond}
                            styles={buildStyles({
                              textSize: "16px",
                              textColor: getColor(),
                              pathColor: getColor(),
                              trailColor: "#d6d6d6",
                            })}
                          />
                          <Index.Box className="timer-text-details">
                            {`${socketTimer ? socketTimer : 0}`}
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box className="card-low-high-bet-list">
                      <Index.Box className="pd-card-low-details">
                        <Index.Box className="flex-low-high-card">
                          <Index.Box className="low-card-content">
                            {/* <Index.Typography component="p" variant='p' className="low-card-time">2.00</Index.Typography> */}
                            <Index.Box className="low-card-main-btn">
                              <Index.Button className="low-card-btn-list">
                                <span>Low Card</span>
                              </Index.Button>
                              {/* <Index.Typography component="p" variant='p' className="low-card-value">0</Index.Typography> */}
                            </Index.Box>
                          </Index.Box>
                          <Index.Box className="card-show-content">
                            <Index.Box className="card-details-middle">
                              <Index.Box className="card-bg-details">
                                {winningCard && socketTimer == 0 ? (
                                  <img
                                    className={
                                      socketTimer == 0 &&
                                      winningCard != undefined
                                        ? "card-flip-middle-content"
                                        : "card-flip-middle-content-second"
                                    }
                                    src={winningCard?.img}
                                  />
                                ) : (
                                  <img
                                    className={
                                      socketTimer == 0 &&
                                      winningCard != undefined
                                        ? "card-flip-middle-content"
                                        : "card-flip-middle-content-second"
                                    }
                                    src={PageIndex.Png.cardbet}
                                  />
                                )}
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                          <Index.Box className="high-card-content">
                            {/* <Index.Typography component="p" variant='p' className="high-card-time">2.00</Index.Typography> */}
                            <Index.Box className="high-card-main-btn">
                              <Index.Button className="high-card-btn-list">
                                <span>high Card</span>
                              </Index.Button>
                              {/* <Index.Typography component="p" variant='p' className="high-card-value">0</Index.Typography> */}
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                        {/* <Index.Box className="min-max-value-details">
                          <Index.Typography
                            component="p"
                            variant="p"
                            className="min-value-details"
                          >
                            MIN:<span>10</span>
                          </Index.Typography>
                          <Index.Typography
                            component="p"
                            variant="p"
                            className="max-value-details"
                          >
                            MAX:<span>100</span>
                          </Index.Typography>
                        </Index.Box> */}
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box className="card-col3">
                  <Index.Box className="bid-details-contentg">
                    <Index.Box className="bid-amount-main-details">
                      {/* <Index.Box className="bet-amount-details">
                        <Index.Typography
                          className="amount-details-bet"
                          component="h5"
                          variant="h5"
                        >
                          bet amount (USDT):<span>100.00</span>
                        </Index.Typography>
                      </Index.Box> */}
                    </Index.Box>
                    <Index.Box className="bet-amount-bg-content">
                      <Index.Box className="pd-bet-content">
                        {/* <Index.Box className="bet-flex-content">
                                                    <Index.Box className="price-bet-bid-content">
                                                        <Index.Box className="price-content-bit">
                                                            <Index.List className="price-list-bit">
                                                                <Index.ListItem className="price-content-bit">
                                                                    <img className="group-img-bit" src={PageIndex.Png.groupred}></img>
                                                                </Index.ListItem>
                                                                <Index.ListItem className="price-content-bit">
                                                                    <img className="group-img-bit" src={PageIndex.Png.groupblue}></img>
                                                                </Index.ListItem>
                                                                <Index.ListItem className="price-content-bit">
                                                                    <img className="group-img-bit" src={PageIndex.Png.grouporange}></img>
                                                                </Index.ListItem>
                                                                <Index.ListItem className="price-content-bit bid-active">
                                                                    <img className="group-img-bit" src={PageIndex.Png.groupyellow}></img>
                                                                </Index.ListItem>
                                                                <Index.ListItem className="price-content-bit">
                                                                    <img className="group-img-bit" src={PageIndex.Png.grouppink}></img>
                                                                </Index.ListItem>
                                                                <Index.ListItem className="price-content-bit">
                                                                    <img className="group-img-bit" src={PageIndex.Png.grouppurple}></img>
                                                                </Index.ListItem>
                                                                <Index.ListItem className="price-content-bit">
                                                                    <img className="group-img-bit" src={PageIndex.Png.groupgreen}></img>
                                                                </Index.ListItem>
                                                                <Index.ListItem className="price-content-bit">
                                                                    <img className="group-img-bit" src={PageIndex.Png.groupsky}></img>
                                                                </Index.ListItem>
                                                            </Index.List>
                                                        </Index.Box>
                                                    </Index.Box>
                                                    <Index.Box className="price-bet-or-details">
                                                        <Index.Box className="price-or-text">
                                                            OR
                                                        </Index.Box>
                                                    </Index.Box>
                                                    <Index.Box className="price-bet-input-details">
                                                        <Index.Box className="price-input-details-content">
                                                            <Index.Box className="input-design-div with-border">
                                                                <Index.TextField
                                                                    id="filled-hidden-label-normal"
                                                                    placeholder="Enter Amount"
                                                                    variant="filled"
                                                                    className="admin-input-design input-placeholder"
                                                                    autoComplete="off"
                                                                    name="coin"
                                                                    type="text"
                                                                />
                                                            </Index.Box>
                                                        </Index.Box>
                                                    </Index.Box>
                                                </Index.Box>
                                                <Index.Box className="places-brt-main-btn">
                                                    <Index.Button className="place-btn-content">
                                                        Place Bid
                                                    </Index.Button>
                                                </Index.Box> */}
                        <Index.Box className="card-bet-details-con">
                          <Index.Box className="bet-flex-content flex-gap-penalty">
                            <Index.Box className="bet-user-card-content">
                              <Index.Box className="penalty-flex-content desktop-btn-bet">
                                <Index.Box className="places-brt-main-btn">
                                  <Index.Button
                                    className={
                                      !isValidBetAmount || disableButtons
                                        ? "place-btn-content btn-disabled-content"
                                        : "place-btn-content"
                                    }
                                    // className="place-btn-content"
                                    onClick={(e) => {
                                      if (
                                        userAmounts <= 0 ||
                                        count > userAmounts
                                      ) {
                                        setOpenDeposit(true);
                                        return;
                                      }
                                      // if (!walletAddress) {
                                      //   setOpen(true);
                                      //   return;
                                      // }
                                      if (selectedSecond == "") {
                                        toast.error("Ple select game time");
                                      } else {
                                        if (userAmounts < count) {
                                          toast.error(
                                            "balance is insufficient"
                                          );
                                        } else if (!disableButtons) {
                                          setBetSide("low");
                                          setBattleModal(true);
                                        }
                                      }
                                    }}
                                  >
                                    Bet low card
                                  </Index.Button>
                                </Index.Box>
                              </Index.Box>
                              <Index.Box className="price-bet-input-details">
                                <Index.Box className="price-input-details-content">
                                  <Index.Box className="input-design-div with-border">
                                    <Index.TextField
                                      id="filled-hidden-label-normal"
                                      placeholder="Enter Amount"
                                      variant="filled"
                                      className="admin-input-design input-placeholder"
                                      autoComplete="off"
                                      name="coin"
                                      type="text"
                                      onWheel={(event) => event.target.blur()}
                                      disabled={disableButtons}
                                      value={count}
                                      onChange={(e) => {
                                        let batValue = e.target.value.replace(
                                          /\D/g,
                                          ""
                                        );
                                        if (batValue.startsWith("0")) {
                                          batValue = batValue.substring(1);
                                        }
                                        if (!isNaN(batValue)) {
                                          setCount(+batValue);
                                        }
                                        // if(!e.target.value){
                                        //   setCount(gameId?.gameMinimumCoin);
                                        //   return;
                                        // }
                                        // const value = parseInt(e.target.value);
                                        // const minCoin = parseInt(
                                        //   gameId?.gameMinimumCoin
                                        // );
                                        // const maxCoin = parseInt(
                                        //   gameId?.gameMaximumCoin
                                        // );

                                        // if (
                                        //   !isNaN(minCoin) &&
                                        //   !isNaN(maxCoin)
                                        // ) {
                                        //   // Check conditions and set count accordingly
                                        //   if (value < minCoin) {
                                        //     setCount(minCoin);
                                        //   } else if (value > maxCoin) {
                                        //     setCount(maxCoin);
                                        //   } else {
                                        //     setCount(value);
                                        //   }
                                        // }
                                      }}
                                    />
                                  </Index.Box>
                                  <Index.Box className="place-plus-bet-left">
                                    <Index.Button
                                      className="plus-bet-btn-card"
                                      // disabled={disableButtons}
                                      // onClick={() => decreaseCount(5)}
                                      onClick={() => decreaseCount(5)}
                                      disabled={disableButtons || count - 4 <= gameId?.gameMinimumCoin}
                                    >
                                      -
                                    </Index.Button>
                                  </Index.Box>
                                  <Index.Box className="place-plus-bet-right">
                                    <Index.Button
                                      className="plus-bet-btn-card"
                                      // disabled={disableButtons}
                                      // onClick={() => increaseCount(5)}
                                      onClick={() => increaseCount(5)}
                                      disabled={disableButtons || count + 4 >= gameId?.gameMaximumCoin}
                                    >
                                      +
                                    </Index.Button>
                                  </Index.Box>
                                </Index.Box>
                              </Index.Box>
                              <Index.Box className="penalty-flex-content desktop-btn-bet">
                                <Index.Box className="places-brt-main-btn">
                                  <Index.Button
                                    className={
                                      !isValidBetAmount || disableButtons
                                        ? "place-btn-content btn-disabled-content"
                                        : "place-btn-content"
                                    }
                                    onClick={(e) => {
                                      if (
                                        userAmounts <= 0 ||
                                        count > userAmounts
                                      ) {
                                        setOpenDeposit(true);
                                        return;
                                      }
                                      // if (!walletAddress) {
                                      //   setOpen(true);
                                      //   return;
                                      // }

                                      if (selectedSecond == "") {
                                        toast.error("Ple select game time");
                                      } else {
                                        if (userAmounts < count) {
                                          toast.error(
                                            "balance is insufficient"
                                          );
                                        } else if (!disableButtons) {
                                          setBetSide("high");
                                          setBattleModal(true);
                                        }
                                      }
                                    }}
                                  >
                                    Bet high card
                                  </Index.Button>
                                </Index.Box>
                              </Index.Box>
                              <Index.Box className="flex-mobile-bet-btn">
                                <Index.Box className="penalty-flex-content">
                                  <Index.Box className="places-brt-main-btn">
                                    <Index.Button
                                      className={
                                        disableButtons
                                          ? "place-btn-content btn-disabled-content"
                                          : "place-btn-content"
                                      }
                                      // className="place-btn-content"
                                      onClick={(e) => {
                                        if (selectedSecond == "") {
                                          toast.error("Ple select game time");
                                        } else {
                                          if (userAmounts < count) {
                                            toast.error(
                                              "balance is insufficient"
                                            );
                                          } else if (!disableButtons) {
                                            setBetSide("low");
                                            setBattleModal(true);
                                          }
                                        }
                                      }}
                                    >
                                      Bet low card
                                    </Index.Button>
                                  </Index.Box>
                                </Index.Box>
                                <Index.Box className="penalty-flex-content ">
                                  <Index.Box className="places-brt-main-btn">
                                    <Index.Button
                                      className={
                                        !isValidBetAmount || disableButtons
                                          ? "place-btn-content btn-disabled-content"
                                          : "place-btn-content"
                                      }
                                      onClick={(e) => {
                                        if (selectedSecond == "") {
                                          toast.error("Ple select game time");
                                        } else {
                                          if (userAmounts < count) {
                                            toast.error(
                                              "balance is insufficient"
                                            );
                                          } else if (!disableButtons) {
                                            setBetSide("high");
                                            setBattleModal(true);
                                          }
                                        }
                                      }}
                                    >
                                      Bet right card
                                    </Index.Button>
                                  </Index.Box>
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="bet-user-card-content">
                                                            <Index.Box className="bet-amount-title">
                                                                <Index.Typography component='p' variant='p' className='bet-amount-title-content'>Bet Timer </Index.Typography>
                                                            </Index.Box>
                                                            <Index.Box className="card-bet-timer-main">
                                                                <Index.Box className="card-pd-timer">
                                                                    <Index.Typography component='h5' variant='h5' className='timer-card-title'>00 : 00</Index.Typography>
                                                                </Index.Box>
                                                            </Index.Box>
                                                        </Index.Box> */}
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>

            {/* my records */}
            {firstTwentyMyRecords.length ? (
              <Index.Box className="game-records-details">
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
                        const str = ele?.card;
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
                                      Selected card:
                                      <span>{betSideUppercase}</span>
                                    </Index.Typography>
                                  </Index.Box>
                                  <Index.Box className="my-record-content-details">
                                    <Index.Typography
                                      className="period-my-record"
                                      component="p"
                                      variant="p"
                                    >
                                      Bet Status:
                                      <span>Successful</span>
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
                            navigate("/user/card-betting/my-records", {
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
            ) : (
              <></>
            )}

            {/* Game Records */}

            <Index.Box className="game-records-details">
              <Index.Box className="game-record-title">
                <Index.Typography
                  className="record-title"
                  component="p"
                  variant="p"
                >
                  {" "}
                  Game Records : {periodData?.period}
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
                    const Color_firstCharacter = userData?.card
                      ?.charAt(0)
                      ?.toUpperCase();
                      if(userData?.period == periodData?.period){
                        return (<></>)
                      }
                    return (
                      <>
                        <Index.ListItem className="game-record--listitem">
                          <Index.Box className="record-box-content">
                            <img
                              src={PageIndex.Png.cardbet}
                              className="card-small-bet-img card-game-record"
                            ></img>
                            <Index.Box className="game-record-number-id">
                              <Index.Typography
                                component="p"
                                variant="p"
                                className="recordid-text-content"
                              >
                                {/* {`${userData?.period} (${
                                  userData?.card ? Color_firstCharacter : "?"
                                })`} */}
                                {`${userData?.period?.toString()?.slice(-3)} (${
                                  userData?.card ? Color_firstCharacter : "?"
                                })`}
                              </Index.Typography>
                            </Index.Box>
                          </Index.Box>
                        </Index.ListItem>
                      </>
                    );
                  })}
                </Index.List>

                {/* <Index.List className="game-records-ul">
                  {firstTwentyAllRecords?.map((userData) => {
                    return (
                      <>
                        <Index.ListItem className="game-record--listitem">
                        
                          <Index.ListItem className="game-record--listitem">
                            <Index.Box className="record-box-content">
                              <img
                                src={PageIndex.Png.cardbet}
                                className="card-small-bet-img card-game-record"
                              ></img>
                              <Index.Box className="game-record-number-id">
                                <Index.Typography
                                  component="p"
                                  variant="p"
                                  className="recordid-text-content"
                                >
                                  {`${userData?.card} (${userData?.period})`}
                                </Index.Typography>
                              </Index.Box>
                            </Index.Box>
                          </Index.ListItem>
                        </Index.ListItem>
                      </>
                    );
                  })}

              
                </Index.List> */}
                {isMoreGameRecords() ? (
                  <Index.Box className="more-right-record">
                    <Index.Box
                      className="more-link-content"
                      onClick={() => {
                        navigate("/user/card-betting/all-records", {
                          state: {
                            getallGameData: getallGameData,
                            selectedSecond: selectedSecond,
                            ele: location?.state?.ele,
                          },
                        });
                      }}
                    >
                      More &#8811;
                    </Index.Box>
                  </Index.Box>
                ) : (
                  ""
                )}
                {/* {firstTwentyAllRecords.length >= 20 ? (
                  <Index.Box className="more-right-record">
                    <Index.Link
                      className="more-link-content"
                      to="/user/card-betting/all-records"
                    >
                      More &#8811;
                    </Index.Link>
                  </Index.Box>
                ) : (
                  ""
                )} */}
              </Index.Box>
            </Index.Box>
          </Index.Box>

          <Index.Box
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
          </Index.Box>

          {/* <CardAndCommunityBetting /> */}

          {/* <Index.Box className="right-dashboard-main-user">
            <Index.Box className="card-betting-list">
              <Index.Box className="card-betting-main">
                <Index.Box className="betting-img-content">
                  <img
                    src={PageIndex.Png.bettingone}
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
                      <PageIndex.BlueButton
                        btnLabel="Play Now"
                        className="blue-btn-content"
                        // onClick={() => setOpen(true)}
                      />
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
              <Index.Box className="card-betting-main">
                <Index.Box className="betting-img-content">
                  <img
                    src={PageIndex.Png.bettingtwo}
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
                      <PageIndex.BlueButton
                        btnLabel="Play Now"
                        className="blue-btn-content"
                        // onClick={() => setOpen(true)}
                      />
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box> */}
        </Index.Box>
      </Index.Box>
    </>
  );
}
