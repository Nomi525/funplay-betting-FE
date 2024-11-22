// nuilesh
import NotificationsIcon from "@mui/icons-material/Notifications";
import TimerIcon from "@mui/icons-material/Timer";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import { getTotalCoins, userAmount } from "../../../../redux/user/userReducer";
import Index from "../../../Index";
import {
  default as PageIndex,
  default as PagesIndex,
} from "../../../pageIndex";
import PopupModal from "./PopupModal";
import ResponsiveTable from "./ResponsiveTable";

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
const GradientButton = styled(Button)(({ gradientFrom, gradientTo }) => ({
  background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
  color: "#fff",
  "&:hover": {
    background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
  },
  minWidth: "70px",
  minHeight: "40px",
  fontSize: "0.875rem",
}));

const data = [
  { period: "20230720321", price: "38832", number: "2", result: "Red" },
  { period: "20230720320", price: "36116", number: "6", result: "Green" },
  { period: "20230720319", price: "35908", number: "8", result: "Red" },
  { period: "20230720318", price: "38518", number: "8", result: "Violet" },
  { period: "20230720317", price: "35668", number: "2", result: "Green" },
  { period: "20230720316", price: "38642", number: "2", result: "Violet" },
  // Add more rows as needed
];

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

export default function ThreeColorBetting() {
  const [expanded, setExpanded] = React.useState("panel1");
  let timeRef = useRef(null);

  const handleChangeAccro = (panel, expanded) => {
    setExpanded(expanded == panel ? "" : panel);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const selectedSecond = location?.state?.selectedSecond;
  const seconds = location?.state?.second;
  const storedValue = localStorage.getItem("userGameId");
  const gameId = JSON.parse(storedValue);
  const userAmounts = useSelector(
    (state) => state?.UserReducer?.totalCoins?.totalCoin
  );

  const gameType = "Color Prediction";
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
  const [count, setCount] = useState(gameId.gameMinimumCoin);
  const [contract, setContract] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColourNumber, setSelectedColourNumber] = useState("");
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
  const startDate = moment(gameId?.gameTimeFrom).format("YYYY/MM/DD");
  const endDate = moment(gameId?.gameTimeTo).format("YYYY/MM/DD");
  const startDateTime = moment(startDate + " " + gameId?.gameDurationFrom);
  const endDateTime = moment(endDate + " " + gameId?.gameDurationTo);
  const currentDateTime = moment();
  const [winnerAnnounced, setWinnerAnnounced] = useState(false);
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

    allLiveBets,
    setAllLiveBets,
  ] = useOutletContext();

  //socket state

  const [socketTimer, setSocketTimer] = useState("");
  // const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalColor, setModalColor] = useState("");

  const increaseContract = (incrementValue) => {
    console.log("increaseCount-incrementValue", incrementValue);

    if (gameId.gameMaximumCoin <= count * incrementValue) {
      setContract(gameId.gameMaximumCoin);
    } else if (userAmounts < count * incrementValue) {
      toast.error("Balance is insufficient", {
        toastId: "customId",
      });
      // Optionally set IncDisableButtons here
    } else {
      setContract(incrementValue);
    }
  };

  const decreaseContract = (decrementValue) => {
    if (gameId.gameMinimumCoin <= count * decrementValue) {
      setContract(gameId.gameMaximumCoin);
    } else if (userAmounts < count * decrementValue) {
      toast.error("Balance is insufficient", {
        toastId: "customId",
      });
    } else {
      // setCount(count * decrementValue);
      setContract(count * decrementValue);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (title, color) => {
    if (socketTimer >= 0 && socketTimer <= 5) {
      // Prevent click action if timer is between 5 and 0
      return;
    }
    console.log(typeof title);
    console.log({ title });
    if (typeof title === "string") {
      setSelectedColor(title);
      setSelectedColourNumber(null);
    }
    if (typeof title === "number") {
      setSelectedColor(null);
      setSelectedColourNumber(title);
    }

    setModalTitle(title);
    setModalColor(color);
    setShow(true);
  };

  // Buttons will be disabled when socketTimer is between 5 and 0
  // const buttonsDisabled = socketTimer >= 0 && socketTimer <= 5;

  // Conditional style for buttons when `socketTimer` is in the range 5-0
  const buttonStyles = {
    notClickable: {
      backgroundColor: "#888", // Gray color to indicate inactive state
      cursor: "not-allowed",
    },
    clickable: {},
  };

  //socket call
  useEffect(() => {
    socket = io(Api.common.TIMER_SOCKET);
  }, []);
  const socketCall = () => {
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

  const getAllData = async (isCallingFirstTime) => {
    await DataService.get(
      `${Api.User.GET_ALL_GAME_PERIOAD}/${gameId?._id}?second=${selectedSecond}`
    )
      .then((res) => {
        let data = res?.data?.data;
        data?.reverse();
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
  console.log(firstTwentyAllRecords, "firstTwentyAllRecords");

  const formattedData = firstTwentyAllRecords.map((item) => ({
    period: item.period,
    price: item.startTime,
    // number: item.totalUsers,
    resultColor: item.winColour
      ? item.winColour.charAt(0).toUpperCase() + item.winColour.slice(1)
      : "?",
    resultNumber:
      item.winColourNumber !== null && item.winColourNumber !== undefined
        ? item.winColourNumber
        : "?",
  }));

  useEffect(() => {
    if (socketTimer <= 10) {
      setDisableButtons(true);
      setIsActiveOrange(false);
      setIsActiveBlue(false);
      setIsActive(false);
      setBattleModal(false);

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
      setShowWinnewModal(false);
    }
    if (socketTimer == 0) {
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
      `${Api.User.GAME_WINNER_LIST}/${gameType}/${gameId?._id}/${periodData?.period}?second=${selectedSecond}`
    )
      .then((res) => {
        if (res?.data?.data?.length) {
          console.log(res?.data?.data, "res?.data?.data");

          setGameWinnerUser(res?.data?.data?.[0]?.colourName);
          // setResponseMessage(res?.data?.data?.[0]?.colourName);
        } else {
          setResponseMessage(res?.data?.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (socketTimer == 5) {
      console.log("winnerDeclaration-socketTimer", socketTimer);
      console.log("responseMessage", responseMessage);

      winnerDeclaration();
    }

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
  }, [socketTimer]);

  useEffect(() => {
    return () => clearInterval(timeRef.current); // to clean up on unmount
  }, []);

  useEffect(() => {
    return () => setGameTimer("00:00:00"); // to clean up on unmount
  }, []);

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

  setTimeout(function () {}, 15000);

  setTimeout(function () {
    setTimeout(function () {}, 15000);
  }, 15000);

  const getGamePeriod = async () => {};
  useEffect(() => {
    if (selectedSecond && gameId?._id) {
      getGamePeriod();
    }
  }, [selectedSecond]);

  useEffect(() => {
    getSingleData();
    getAllData(1);
  }, []);

  var now = moment().format("hh:mm:ss A");

  const [isExecuting, setIsExecuting] = useState(false);

  const handleContractCountChange = (contractCount) => {
    setContract(contractCount);
    console.log("Updated contract count:", contractCount);
  };

  const startBattle = useCallback(() => {
    if (isExecuting) return; // Prevent multiple calls by checking execution state

    setIsExecuting(true);

    const data = {
      colourName: selectedColor || null,
      colourNumber: selectedColourNumber || null,
      betAmount: count,
      contract: contract,
      gameId: gameId?._id,
      gameType: gameType,
      period: periodData?.period,
      selectedTime: +selectedSecond,
    };

    if (userAmounts <= count) {
      toast.error("Balance is insufficient");
      setIsExecuting(false);
      return;
    }

    const executeBattle = async () => {
      try {
        const res = await DataService.post(Api.User.THREE_COLOR_BETTING, data);

        if ([200, 201].includes(res.data.status)) {
          setShow(true);
          socket?.emit("createColourBet");
          toast.success(res?.data?.message, { toastId: "customId" });

          getSingleData();
          dispatch(getTotalCoins());
          handleClose();

          // Reset state for buttons and user amount update
          setIsActiveOrange(false);
          setIsActiveBlue(false);
          setIsActive(false);

          dispatch(userAmount());
        }
      } catch (error) {
        console.error("Error in startBattle:", error);
        toast.error(error?.response?.data?.message || "An error occurred", {
          toastId: "customId",
        });
      } finally {
        setIsExecuting(false);
      }
    };

    executeBattle();
    setBattleModal(false);
  }, [
    isExecuting,
    selectedColor,
    selectedColourNumber,
    count,
    contract,
    gameId,
    gameType,
    periodData,
    selectedSecond,
    userAmounts,
    getSingleData,
    handleClose,
    dispatch,
  ]);

  const handleCloseWinnerModal = () => {
    setShowWinnewModal(false);
    setIsActiveOrange(false);
    setIsActiveBlue(false);
    setIsActive(false);
    setShow(false);
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

  const userGameRules = async () => {
    await DataService.get(Api.User.USER_GAME_RULES + "/" + gameId?._id)
      .then((res) => {
        setUserGameRulesId(res?.data?.data?.gameRules);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    userGameRules();
  }, [userGameRulesId]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleWinnerColor = () => {
    console.log(GameWinnerUser, "GameWinnerUser");

    if (GameWinnerUser) {
      setWinnerAnnounced(true);
      if (GameWinnerUser?.toLowerCase() == "red") {
        setResponseMessage(GameWinnerUser);

        document.querySelector(".button-landscape")?.classList.add("bg-blue");
        document
          .querySelector(".button-landscape-text")
          ?.classList.add("choose-color-text-remove");
        document
          .querySelector(".onclick-color-text")
          ?.classList.add("block-onlick-text");
        document
          .querySelector(".gaming-circle-count")
          ?.classList.add("wheels-stopped-red-three");
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
            ?.classList.remove("wheels-stopped-red-three");
        }, 1000);
      } else if (GameWinnerUser?.toLowerCase() == "green") {
        document.querySelector(".button-landscape")?.classList.add("bg-green");
        document
          .querySelector(".button-landscape-text")
          ?.classList.add("choose-color-text-remove");
        document
          .querySelector(".onclick-color-text")
          ?.classList.add("block-onlick-text");
        document
          .querySelector(".gaming-circle-count")
          ?.classList.add("wheels-stopped-green-three");
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
            ?.classList.remove("wheels-stopped-green-three");
        }, 1000);
      } else if (GameWinnerUser?.toLowerCase() == "violet") {
        document.querySelector(".button-landscape")?.classList.add("bg-orange");
        document
          .querySelector(".button-landscape-text")
          ?.classList.add("choose-color-text-remove");
        document
          .querySelector(".onclick-color-text")
          ?.classList.add("block-onlick-text");
        document
          .querySelector(".gaming-circle-count")
          ?.classList.add("wheels-stopped-orange-three");
        setTimeout(() => {
          setWinnerAnnounced(false);
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
            .querySelector(".gaming-circle-count")
            ?.classList.remove("wheels-stopped-orange-three");
        }, 1000);
      }
    }
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
              {/*  */}
              <Index.Box>
                <Index.Box>
                  {/*  */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center">
                      <NotificationsIcon sx={{ color: "#fff", mr: 1 }} />
                      <Typography variant="h6" color="white">
                        Period: {periodData?.period}{" "}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <TimerIcon sx={{ color: "#fff", mr: 1 }} />
                      <Typography variant="h6" color="white">
                        Count Down: {socketTimer > 0 ? socketTimer : <>0</>}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    p={{ xs: 2, sm: 4 }}
                    bgcolor="#000"
                    color="#fff"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      mb={4}
                      flexWrap="wrap"
                      width="100%"
                      maxWidth="800px"
                    >
                      {["green", "violet", "red"].map((colorName, index) => (
                        <Button
                          key={colorName}
                          onClick={() =>
                            handleShow(
                              colorName,
                              index === 0
                                ? "#4caf50"
                                : index === 1
                                ? "#9c27b0"
                                : "#f44336"
                            )
                          }
                          variant="contained"
                          color={
                            index === 0
                              ? "success"
                              : index === 1
                              ? "secondary"
                              : "error"
                          }
                          sx={{
                            ...(socketTimer >= 0 && socketTimer <= 5
                              ? buttonStyles["notClickable"]
                              : buttonStyles["clickable"]),
                            mx: 1,
                            mb: { xs: 2, sm: 0 },
                            minWidth: "70px",
                            minHeight: "40px",
                            fontSize: "0.875rem",
                          }}
                        >
                          Join {colorName}
                        </Button>
                      ))}
                    </Box>

                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      width="100%"
                      maxWidth="800px"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                        <Grid
                          item
                          xs={4}
                          key={num}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          {num === 0 || num === 5 ? (
                            <Button
                              onClick={() =>
                                handleShow(
                                  num,
                                  num === 0
                                    ? "linear-gradient(to right, #800080, #FF0000)"
                                    : "linear-gradient(to right, #800080, #008000)"
                                )
                              }
                              fullWidth
                              sx={{
                                ...(socketTimer >= 0 && socketTimer <= 5
                                  ? {
                                      backgroundColor: "#888", // Solid color for disabled state
                                      backgroundImage: "none",
                                      cursor: "not-allowed",
                                      opacity: 0.6,
                                      "&:hover": {
                                        background: `linear-gradient(to right, ${
                                          num === 0
                                            ? "#800080, #FF0000"
                                            : "#800080, #008000"
                                        })`,
                                      },
                                    }
                                  : {
                                      background: `linear-gradient(to right, ${
                                        num === 0
                                          ? "#800080, #FF0000"
                                          : "#800080, #008000"
                                      })`,
                                      cursor: "pointer",
                                      // "&:hover": {
                                      //   opacity: 0.9, // Optional hover effect for enabled state
                                      // },
                                    }),
                                color: "#fff",
                                minWidth: "70px",
                                minHeight: "40px",
                                fontSize: "0.875rem",
                              }}
                            >
                              {num}
                            </Button>
                          ) : (
                            <Button
                              onClick={() =>
                                handleShow(
                                  num,
                                  num % 2 === 0 ? "#4caf50" : "#f44336"
                                )
                              }
                              variant="contained"
                              color={num % 2 === 0 ? "success" : "error"}
                              fullWidth
                              sx={{
                                ...(socketTimer >= 0 && socketTimer <= 5
                                  ? buttonStyles["notClickable"]
                                  : buttonStyles["clickable"]),
                                minWidth: "70px",
                                minHeight: "40px",
                                fontSize: "0.875rem",
                                cursor:
                                  socketTimer >= 0 && socketTimer <= 5
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              {num}
                            </Button>
                          )}
                        </Grid>
                      ))}
                    </Grid>

                    <PopupModal
                      show={show}
                      handleClose={() => setShow(false)}
                      title={modalTitle}
                      color={modalColor}
                      startBattle={startBattle}
                      onContractCountChange={handleContractCountChange} // Pass the callback function
                      socketTimer={socketTimer}
                      // increaseContract={increaseContract}
                      // decreaseContract={decreaseContract}
                    />
                  </Box>
                  {/*  */}
                </Index.Box>
              </Index.Box>

              {/* Copy */}

              {/* my records */}
              <Index.Box className="my-record-margin">
                <Index.Box className="game-record-title">
                  <Index.Typography
                    className="record-title"
                    component="p"
                    variant="p"
                  >
                    My Records :
                  </Index.Typography>
                </Index.Box>

                {firstTwentyMyRecords.length ? (
                  <Index.Box className="game-records-details">
                    <Index.Box className="accordian-records-details">
                      {firstTwentyMyRecords?.map((ele, index) => {
                        const str = ele?.colourName;
                        const colourNumber = ele?.colourNumber;
                        const betSideUppercase = str
                          ? str.charAt(0).toUpperCase() + str.slice(1)
                          : ""; // Return an empty string or a default value if `str` is null/undefined

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
                                      {betSideUppercase
                                        ? "Selected Color:"
                                        : "Selected Number:"}
                                      <span>
                                        {
                                          betSideUppercase
                                            ? betSideUppercase // Show `betSideUppercase` if it has a value
                                            : colourNumber // Otherwise, show `colourNumber`
                                        }
                                      </span>
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
                                            {ele?.price * ele?.winningAmount}
                                          </span>
                                        </>
                                      ) : ele?.isWin == true ? (
                                        <>
                                          Winning coins (approx.) :
                                          <span>
                                            {ele?.price * ele?.winningAmount}
                                          </span>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </Index.Typography>
                                  </Index.Box>
                                  <Index.Box className="my-record-content-details"></Index.Box>
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

              {/* game record */}

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
                {/* copy */}
                <ResponsiveTable data={formattedData} />

                {isMoreGameRecords() ? (
                  <Index.Box className="more-right-record">
                    <Index.Box
                      className="more-link-content"
                      onClick={() => {
                        navigate("/user/three-color-betting/all-records", {
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
              </Index.Box>

              {/* My order */}

              <Index.Box className="my-record-details">
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
                      const betSideUppercase = str
                        ? str.charAt(0).toUpperCase() + str.slice(1)
                        : ""; // Return an empty string or a default value if `str` is null/undefined

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
            </Index.Box>
          </Index.Modal>
        </Index.Box>
      </Index.Box>
    </>
  );
}
