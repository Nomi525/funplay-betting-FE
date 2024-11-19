import React, { useEffect, useRef, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import NumberBettingModal from "./NumberBettingModal";
import { useDispatch, useSelector } from "react-redux";
import { getTotalCoins, userAmount } from "../../../../redux/user/userReducer";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
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

export default function UserNumberBetting() {
  const location = useLocation();
  let timeRef = useRef(null);
  const userAmounts = useSelector(
    (state) => state?.UserReducer?.totalCoins?.totalCoin
  );
  const [isAnimationStop, setIsAnimationStop] = useState(false);
  const [selectedBall, setSelectedBall] = useState("");
  const [showSelectedBall, setShowSelectedBall] = useState("");
  const [isHighLightBall, setIsHighLightBall] = useState(false);
  const [openConrimModal, setOpenConfimModal] = useState(false);
  const [selectedAmount, setSeletedAmount] = useState("");
  const [allRecodrs, setAllRecodrs] = useState([]);
  const [disable, setDisable] = useState(true);
  const [myRecords, setMyRecords] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [expanded, setExpanded] = React.useState("panel1");
  const [showWinnewModal, setShowWinnewModal] = useState(false);
  const [showTimeWinnerModal, setShowTimeWinnerModal] = useState(false);
  const handleCloseModal = () => setOpenConfimModal(false);
  const [gameTimer, setGameTimer] = useState("");
  const [periodData, setPeriodData] = useState({});
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const navigate = useNavigate();
  const storedValue = localStorage.getItem("userGameId");
  const gameId = JSON.parse(storedValue);
  const dispatch = useDispatch();
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
  useEffect(() => {
    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState == "visible") {
        getGamePeriod();
      }
    });
  }, []);
  // This is all user records
  const getAllRecodrs = async () => {
    await DataService?.get(
      Api.User.GET_ALL_NUMBER_GAME_PERIOD + "/" + gameId?._id
    )
      .then((res) => {
        setAllRecodrs(res?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  // This is single user records
  const getSingleRecodrs = async () => {
    await DataService?.get(Api.User.GET_MY_RECORDS + "/" + gameId?._id)
      .then((res) => {
        setMyRecords(res?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  let firstTwentyAllRecords =
    window.innerWidth < 768
      ? allRecodrs?.slice(1, 3)
      : allRecodrs?.slice(1, 21);

  const firstTwentyMyRecords = myRecords.slice(0, 10);

  const isMoreGameRecords = () => {
    const isMobile = window.innerWidth < 768;
    return isMobile ? allRecodrs?.length >= 3 : allRecodrs?.length >= 20;
  };

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
      handleCloseModal();
      setSelectedBall("");
      setSeletedAmount();
      setDisable(true);
      setDisableBtn(true);
    }
    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      setGameTimer("00:00:00");
      return "00:00:00";
    }
    setGameTimer(countDown);
    return countDown;
  };

  useEffect(() => {
    if (gameTimer == "00:00:20") {
      setDisableBtn(true);
    }
    if (gameTimer == "00:00:00") {
      setDisableBtn(false);
      setIsAnimationStop(false);
    }
  }, [gameTimer]);
  // This is game periods code

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
  // Game time is start
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
      if (timer === "00:00:00") {
        clearInterval(timeRef.current);
        setTimeout(() => {
          getGamePeriod();
          getAllRecodrs();
          getSingleRecodrs();
          setShowWinnewModal(false);
          setResponseMessage("");
          setShowTimeWinnerModal(false);
        }, 4000);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timeRef.current); // to clean up on unmount
  }, []);

  useEffect(() => {
    if (Object.keys(periodData).length > 0) {
      periodData.endTime = moment
        .unix(periodData?.endTime)
        .format("hh:mm:ss A");
      calculateGameTime(periodData);
    }
  }, [periodData]);

  const handleOpenModal = () => {
    if (userAmounts <= 0 || selectedAmount > userAmounts) {
      setOpenDeposit(true);
      return;
    }
    // if (!walletAddress) {
    //   setOpen(true);
    //   return;
    // }
    if (userAmounts >= selectedAmount) {
      setOpenConfimModal(true);
    } else {
      toast.error("balance is insufficient", {
        toastId: "customId",
      });
    }
  };

  const handleChangeAmount = (amount) => {
    setSeletedAmount(amount);
  };
  // This is stop ball animation code
  const handleStopAnimation = (flag, count) => {
    if (gameTimer == "00:00:20") {
      setDisableBtn(true);
    } else {
      setIsAnimationStop(flag);
      setSelectedBall(count);
      setIsHighLightBall(true);
    }
  };

  useEffect(() => {
    if (isHighLightBall) {
      setTimeout(() => {
        setIsHighLightBall(false);
      }, 6000);
    }
  }, [isHighLightBall]);

  // This is winner declar code
  const winnerDeclaration = async () => {
    await DataService?.get(
      Api.User.GAME_WINNER_LIST_NUMBER_BETTING +
        "/" +
        gameId?._id +
        "/" +
        periodData?.period
    )
      .then((res) => {
        if (res?.data?.data?.[0]?.number) {
          
          setResponseMessage(
            `Victory Alert! The Winning Number is ${res?.data?.data?.[0]?.number}`
          );
        } else {
          setResponseMessage(res?.data?.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // This is number  code
  const userAddNumberBetting = () => {
    const data = {
      gameId: gameId?._id,
      number: +selectedBall,
      betAmount: parseInt(selectedAmount),
      rewardsCoins: parseInt(selectedAmount),
      winAmount: 0,
      lossAmount: 0,
      period: periodData?.period,
    };
    let token = localStorage.getItem("token");
    DataService.post(Api.User.USER_ADD_NUMBERBETTING, data)
      .then((res) => {
        if (res.data.status === 200 || res.data.status === 201) {
          setShowTimeWinnerModal(true);
          socket?.emit("createColourBet");
          getSingleRecodrs();
          dispatch(getTotalCoins());
          setTimeout(() => {
            setIsAnimationStop(false);
          }, 3000);

          toast.success(res?.data?.message, {
            toastId: "customId",
          });
          dispatch(userAmount())
            .then((res) => {
              toast.success(res?.data?.message, {
                toastId: "customId",
              });
            })
            .catch((error) => {});
        }

        setTimeout(() => {
          setSelectedBall("");
          setSeletedAmount("");
          setDisable(true);
        }, 2300);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };
  useEffect(() => {
    if (selectedAmount && selectedBall && periodData?.period) {
      setDisable(false);
    }
  }, [selectedAmount, selectedBall, periodData?.period]);

  useEffect(() => {
    if (gameTimer == "00:00:05") {
      winnerDeclaration();
    }
    if (gameTimer == "00:00:00") {
      dispatch(getTotalCoins());

      if (responseMessage) {
        setShowWinnewModal(true);
        setTimeout(() => setShowWinnewModal(false), 3000);
      }
    }
  }, [gameTimer]);

  useEffect(() => {
    getAllRecodrs();
    getSingleRecodrs();
  }, []);

  useEffect(() => {
    if (gameId?._id) {
      getGamePeriod();
    }
  }, []);

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

  const handleChangeAccro = (panel, expanded) => {
    setExpanded(expanded == panel ? "" : panel);
  };

  const betAmount = [
    {
      betAmount: 50,
    },
    {
      betAmount: 100,
    },
    {
      betAmount: 200,
    },
    {
      betAmount: 300,
    },
    {
      betAmount: 400,
    },
    {
      betAmount: 500,
    },
    {
      betAmount: 600,
    },
    {
      betAmount: 900,
    },
  ];

  useEffect(() => {
    if (selectedBall !== "") {
      setShowSelectedBall(selectedBall);
    }
  }, [selectedBall]);
  return (
    <>
      <Index.Modal
        open={showWinnewModal}
        onClose={() => {
          setShowWinnewModal(false);
          setResponseMessage("");
          setShowTimeWinnerModal(false);
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
                  setShowWinnewModal(false);
                  setResponseMessage("");
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
                  {/* {GameWinerUser? `Victory Alert! The Winning Number is ${GameWinerUser}` : responseMessage} */}
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
                      setResponseMessage("");
                      setShowTimeWinnerModal(false);
                    }}
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Modal>
      <Index.Box className="row-numberbetting">
        <Index.Box className="col7-number">
          <Index.Box className="bg-number-betting">
            <Index.Box className="number-bet-scroll">
              <Index.Box
                className={
                  isAnimationStop
                    ? "pos-number-details center-justify-ball"
                    : "pos-number-details "
                }
              >
                <Index.Box className="flex-content">
                  <Index.Box
                    className={
                      disableBtn
                        ? "ball-container ball-number-disabled"
                        : "ball-container"
                    }
                  >
                    {[...Array(100)].splice(1, 10).map((item, index) => {
                      let count = index + 1;
                      return (
                        <>
                          <Index.Box
                            class={
                              disableBtn
                                ? `ball color-${count}`
                                : isAnimationStop
                                ? selectedBall == count
                                  ? ` ball color-${count} animation-stop`
                                  : ` ball color-${count}`
                                : `ball color-${count} clock-rotated-${
                                    (index + 1) % 2 == 0 ? "right" : "left"
                                  }`
                            }
                            onClick={() => handleStopAnimation(true, count)}
                          >
                            <span>{count}</span>
                          </Index.Box>
                        </>
                      );
                    })}
                  </Index.Box>
                  <Index.Box
                    className={
                      disableBtn
                        ? "ball-container ball-number-disabled"
                        : "ball-container"
                    }
                  >
                    {[...Array(100)].splice(11, 20).map((item, index) => {
                      let count = index + 11;
                      return (
                        <>
                          {count < 21 && (
                            <Index.Box
                              class={
                                disableBtn
                                  ? `ball color-${count}`
                                  : isAnimationStop
                                  ? selectedBall == count
                                    ? ` ball color-${count} animation-stop`
                                    : ` ball color-${count}`
                                  : `ball color-${count} clock-rotated-${
                                      (index + 1) % 2 == 0 ? "right" : "left"
                                    }`
                              }
                              onClick={() => handleStopAnimation(true, count)}
                            >
                              <span>{count}</span>
                            </Index.Box>
                          )}
                        </>
                      );
                    })}
                  </Index.Box>
                  <Index.Box
                    className={
                      disableBtn
                        ? "ball-container ball-number-disabled"
                        : "ball-container"
                    }
                  >
                    {[...Array(100)].splice(21, 30).map((item, index) => {
                      let count = index + 21;
                      return (
                        <>
                          {count < 31 && (
                            <Index.Box
                              class={
                                disableBtn
                                  ? `ball color-${count}`
                                  : isAnimationStop
                                  ? selectedBall == count
                                    ? ` ball color-${count} animation-stop`
                                    : ` ball color-${count}`
                                  : `ball color-${count} clock-rotated-${
                                      count % 2 == 0 ? "right" : "left"
                                    }`
                              }
                              onClick={() => handleStopAnimation(true, count)}
                            >
                              <span>{count}</span>
                            </Index.Box>
                          )}
                        </>
                      );
                    })}
                  </Index.Box>
                  <Index.Box
                    className={
                      disableBtn
                        ? "ball-container ball-number-disabled"
                        : "ball-container"
                    }
                  >
                    {[...Array(100)].splice(31, 40).map((item, index) => {
                      let count = index + 31;
                      return (
                        <>
                          {count < 41 && (
                            <Index.Box
                              class={
                                disableBtn
                                  ? `ball color-${count}`
                                  : isAnimationStop
                                  ? selectedBall == count
                                    ? ` ball color-${count} animation-stop`
                                    : ` ball color-${count}`
                                  : `ball color-${count} clock-rotated-${
                                      count % 2 == 0 ? "right" : "left"
                                    }`
                              }
                              onClick={() => handleStopAnimation(true, count)}
                            >
                              <span>{count}</span>
                            </Index.Box>
                          )}
                        </>
                      );
                    })}
                  </Index.Box>
                  <Index.Box
                    className={
                      disableBtn
                        ? "ball-container ball-number-disabled"
                        : "ball-container"
                    }
                  >
                    {[...Array(100)].splice(41, 50).map((item, index) => {
                      let count = index + 41;
                      return (
                        <>
                          {count < 51 && (
                            <Index.Box
                              class={
                                disableBtn
                                  ? `ball color-${count}`
                                  : isAnimationStop
                                  ? selectedBall == count
                                    ? ` ball color-${count} animation-stop`
                                    : ` ball color-${count}`
                                  : `ball color-${count} clock-rotated-${
                                      count % 2 == 0 ? "right" : "left"
                                    }`
                              }
                              onClick={() => handleStopAnimation(true, count)}
                            >
                              <span>{count}</span>
                            </Index.Box>
                          )}
                        </>
                      );
                    })}
                  </Index.Box>
                  <Index.Box
                    className={
                      disableBtn
                        ? "ball-container ball-number-disabled"
                        : "ball-container"
                    }
                  >
                    {[...Array(100)].splice(51, 60).map((item, index) => {
                      let count = index + 51;
                      return (
                        <>
                          {count < 61 && (
                            <Index.Box
                              class={
                                disableBtn
                                  ? `ball color-${count}`
                                  : isAnimationStop
                                  ? selectedBall == count
                                    ? ` ball color-${count} animation-stop`
                                    : ` ball color-${count}`
                                  : `ball color-${count} clock-rotated-${
                                      count % 2 == 0 ? "right" : "left"
                                    }`
                              }
                              onClick={() => handleStopAnimation(true, count)}
                            >
                              <span>{count}</span>
                            </Index.Box>
                          )}
                        </>
                      );
                    })}
                  </Index.Box>
                  <Index.Box
                    className={
                      disableBtn
                        ? "ball-container ball-number-disabled"
                        : "ball-container"
                    }
                  >
                    {[...Array(100)].splice(61, 70).map((item, index) => {
                      let count = index + 61;
                      return (
                        <>
                          {count < 71 && (
                            <Index.Box
                              class={
                                disableBtn
                                  ? `ball color-${count}`
                                  : isAnimationStop
                                  ? selectedBall == count
                                    ? ` ball color-${count} animation-stop`
                                    : ` ball color-${count}`
                                  : `ball color-${count} clock-rotated-${
                                      count % 2 == 0 ? "right" : "left"
                                    }`
                              }
                              onClick={() => handleStopAnimation(true, count)}
                            >
                              <span>{count}</span>
                            </Index.Box>
                          )}
                        </>
                      );
                    })}
                  </Index.Box>
                  <Index.Box
                    className={
                      disableBtn
                        ? "ball-container ball-number-disabled"
                        : "ball-container"
                    }
                  >
                    {[...Array(100)].splice(71, 80).map((item, index) => {
                      let count = index + 71;
                      return (
                        <>
                          {count < 81 && (
                            <Index.Box
                              class={
                                disableBtn
                                  ? `ball color-${count}`
                                  : isAnimationStop
                                  ? selectedBall == count
                                    ? ` ball color-${count} animation-stop`
                                    : ` ball color-${count}`
                                  : `ball color-${count} clock-rotated-${
                                      count % 2 == 0 ? "right" : "left"
                                    }`
                              }
                              onClick={() => handleStopAnimation(true, count)}
                            >
                              <span>{count}</span>
                            </Index.Box>
                          )}
                        </>
                      );
                    })}
                  </Index.Box>
                  <Index.Box
                    className={
                      disableBtn
                        ? "ball-container ball-number-disabled"
                        : "ball-container"
                    }
                  >
                    {[...Array(100)].splice(81, 90).map((item, index) => {
                      let count = index + 81;
                      return (
                        <>
                          {count < 91 && (
                            <Index.Box
                              class={
                                disableBtn
                                  ? `ball color-${count}`
                                  : isAnimationStop
                                  ? selectedBall == count
                                    ? ` ball color-${count} animation-stop`
                                    : ` ball color-${count}`
                                  : `ball color-${count} clock-rotated-${
                                      count % 2 == 0 ? "right" : "left"
                                    }`
                              }
                              onClick={() => handleStopAnimation(true, count)}
                            >
                              <span>{count}</span>
                            </Index.Box>
                          )}
                        </>
                      );
                    })}
                  </Index.Box>
                  <Index.Box
                    className={
                      disableBtn
                        ? "ball-container ball-number-disabled"
                        : "ball-container"
                    }
                  >
                    {[...Array(100)].splice(90, 100).map((item, index) => {
                      let count = index + 91;
                      return (
                        <>
                          <Index.Box
                            class={
                              disableBtn
                                ? `ball color-${count}`
                                : isAnimationStop
                                ? selectedBall == count
                                  ? ` ball color-${count} animation-stop`
                                  : ` ball color-${count}`
                                : `ball color-${count} clock-rotated-${
                                    count % 2 == 0 ? "right" : "left"
                                  }`
                            }
                            onClick={() => handleStopAnimation(true, count)}
                          >
                            <span>{count}</span>
                          </Index.Box>
                        </>
                      );
                    })}
                  </Index.Box>
                </Index.Box>
                <Index.Box
                  className={
                    isHighLightBall ? `block-onclick-ball` : "d-none-block-ball"
                  }
                >
                  <Index.Box className="main-center-ball">
                    <Index.Box
                      className={`ball color-${showSelectedBall}  centerball-content`}
                    >
                      <span>{showSelectedBall}</span>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <Index.Box className="col5-number">
          <Index.Box className="number-bet-details">
            <Index.Box className="number-bet-timer-content">
              <Index.Box className="timer-contentpd-details">
                <Index.Box className="bet-timer-details">
                  <Index.Typography
                    component="p"
                    variant="p"
                    className="timer-title-bet"
                  >
                    Bet Timer :{" "}
                  </Index.Typography>
                  <Index.Box className="countdown-text resend-main">
                    <Index.Typography
                      component="p"
                      variant="p"
                      className="timer-show-details"
                    >
                      {gameTimer}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
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
            <Index.Box className="number-details-main">
              {/* <Index.Box className="number-bet-title">
                  <Index.Typography component="h5" variant="h5">
                    ADD BET
                  </Index.Typography>
                </Index.Box> */}
              {/* <Index.Box className="bet-timer-details">
                <Index.Typography
                  component="p"
                  variant="p"
                  className="timer-title-bet"
                >
                  Bet Timer :{" "}
                </Index.Typography>
                <Index.Box className="countdown-text resend-main">
                  <Index.Typography
                    component="p"
                    variant="p"
                    className="timer-show-details"
                  >
                    {gameTimer}
                  </Index.Typography>
                </Index.Box>
              </Index.Box> */}

              {selectedBall ? (
                <Index.Box className="ball-selected-details">
                  <Index.Box className="ball-title-content">
                    <Index.Typography
                      component="h4"
                      variant="h4"
                      className="ball-title-h4"
                    >
                      Selected Ball{" "}
                    </Index.Typography>
                  </Index.Box>
                  <Index.Box className="selected-ul-details">
                    <Index.Box class="ball-container ">
                      {selectedBall && (
                        <Index.Box>
                          {/* className={isHighLightBall ? `block-content` : "d-none-selected"} */}
                          {/* d-none-selected */}
                          <Index.Box className={`ball color-${selectedBall} `}>
                            <span>{selectedBall}</span>
                          </Index.Box>
                        </Index.Box>
                      )}
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              ) : (
                ""
              )}
              <Index.Box className="pd-number-betting-details">
                <Index.Box className="ball-bet-amount-content">
                  <Index.Box className="betting-border-list">
                    <Index.Box className="betting-amount-flex">
                      <Index.Typography
                        className="bet-amount-details"
                        variant="p"
                        component="p"
                      >
                        Bet Amount
                      </Index.Typography>
                      <Index.Typography
                        name="betAmount"
                        className="bet-amount-prices"
                        variant="p"
                        component="p"
                      >
                        {selectedAmount}
                      </Index.Typography>

                      <Index.Typography
                        className="bet-amount-usdt"
                        variant="p"
                        component="p"
                      >
                        {/* USDT */}
                        Coin
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="bet-coin-num-list">
                  <Index.Box className="flex-bet-list-ul">
                    {betAmount
                      ?.filter(
                        (ele) =>
                          ele?.betAmount >= gameId?.gameMinimumCoin &&
                          ele?.betAmount <= gameId?.gameMaximumCoin
                      )
                      .map((ele) => {
                        return (
                          <Index.Box className="number-list-details">
                            <Index.Button
                              disabled={disableBtn}
                              onClick={() => handleChangeAmount(ele?.betAmount)}
                              className={
                                selectedAmount == ele?.betAmount
                                  ? "bg-num-bet-conetnt active-bg"
                                  : "bg-num-bet-conetnt"
                              }
                            >
                              <Index.Typography
                                className="number-bet-coin"
                                component="p"
                                variant="p"
                              >
                                {ele?.betAmount}
                              </Index.Typography>
                            </Index.Button>
                          </Index.Box>
                        );
                      })}
                  </Index.Box>
                </Index.Box>
                <Index.Box className="bet-now-btn-list">
                  <Index.Box className="betting-card-btn-comman">
                    <PageIndex.BlueButton
                      btnLabel="BID NOW"
                      className="blue-btn-content"
                      onClick={handleOpenModal}
                      disabled={disable}
                    />
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
            {/* <Index.Box className="bet-number-content-scroll">
                            <Index.Box className="bet-coin-num-list">
                                <Index.Box className="flex-bet-list-ul">
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>50</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>100</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt active-bg">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>200</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt active-bg">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>300</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>400</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>500</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>600</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>900</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                        <Index.Box className="bet-bottom-number-content">
                            <Index.Box className="num-bet-value-flex">
                                <Index.Box className="number-value-input">
                                    <Index.TextField
                                        className="number-input-fleid"
                                        value="500000"
                                    />
                                </Index.Box>
                                <Index.Box className="done-btn-number">
                                    <Index.Box className="betting-card-btn-comman">
                                        <PageIndex.BlueButton btnLabel="Done" className="blue-btn-content" />
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                            <Index.Box className="bet-now-flex-content">
                                <Index.Box className="flex-count-num">
                                    <Index.Button onClick={incrementCount} className="count-button">+</Index.Button>
                                    <Index.Box className="count-num-show">{count}</Index.Box>
                                    <Index.Button onClick={decrementCount} className="count-button">-</Index.Button>
                                </Index.Box>
                                <Index.Box className="bet-btn-now">
                                    <Index.Box className="betting-card-btn-comman">
                                        <PageIndex.BlueButton btnLabel="BID NOW" className="blue-btn-content" />
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box> */}
          </Index.Box>
        </Index.Box>

        <Index.Modal
          open={openConrimModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-comman-details bg-noblur"
        >
          <Index.Box sx={style} className="modal-comman-inner-style">
            <NumberBettingModal
              handleClose={handleCloseModal}
              userAddNumberBetting={userAddNumberBetting}
              handleOpen={handleOpenModal}
              setShowWinnewModal={setShowWinnewModal}
              gameId={gameId}
              selectedAmount={selectedAmount}
            />
          </Index.Box>
        </Index.Modal>
      </Index.Box>

      <Index.Box className="number-record-pd">
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
            <Index.Box className="game-details-uldetails">
              {/* {myRecords?.map((val) => {
                return (
                  <>
                    <Index.ListItem className="game-record--listitem">
                      <Index.Box className="record-box-content">
                        <Index.Box className="comman-bg-record red-bg-record">
                          <Index.Typography
                            component="p"
                            variant="p"
                            className="comman-text-content"
                          >
                            {val?.number}
                          </Index.Typography>
                        </Index.Box>
                        <Index.Box className="game-record-number-id">
                          <Index.Typography
                            component="p"
                            variant="p"
                            className="recordid-text-content"
                          >
                            {val?.period}
                          </Index.Typography>
                        </Index.Box>
                      </Index.Box>
                    </Index.ListItem>
                  </>
                );
              })} */}

              <Index.Box className="accordian-records-details">
                {firstTwentyMyRecords?.map((ele, index) => {
                  return (
                    <Index.Accordion
                      className="accordian-main-record"
                      expanded={expanded === index + 1}
                      onChange={() => handleChangeAccro(index + 1, expanded)}
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
                          {ele?.period}
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
                                Selected number:<span>{ele?.number}</span>
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
                  <Index.Link
                    className="more-link-content"
                    to="/user/number-betting/my-records"
                  >
                    More &#8811;
                  </Index.Link>
                </Index.Box>
              ) : (
                ""
              )}
            </Index.Box>
          ) : (
            <Index.Typography
              className="my-record-no-data-found"
              component="p"
              variant="p"
            >
              No record found
            </Index.Typography>
          )}
        </Index.Box>
        <Index.Box className="number-betting-records  pb-30px">
          <Index.Box className="game-records-details">
            <Index.Box className="game-record-title">
              <Index.Typography
                className="record-title"
                component="p"
                variant="p"
              >
                {" "}
                Game Records :
              </Index.Typography>
            </Index.Box>
            <Index.Box className="game-details-uldetails">
              <Index.List className="game-records-ul">
                <Index.ListItem className="game-record--listitem">
                  <Index.Box className="record-box-content">
                    <Index.Box
                      className={`comman-bg-record ball color-${selectedBall}`}
                    >
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
                        {/* {periodData?.period ? periodData?.period : ""} */}
                        {periodData?.period
                          ? periodData?.period?.toString()?.slice(-3)
                          : "-"}
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.ListItem>

                {firstTwentyAllRecords?.map((val) => {
                  return (
                    <>
                      <Index.ListItem className="game-record--listitem">
                        <Index.Box className="record-box-content">
                          <Index.Box
                            className={
                              val?.winNumber
                                ? `number-ball-details ball color-${val?.winNumber}`
                                : `comman-bg-record ball color-${selectedBall}`
                            }
                          >
                            <Index.Typography
                              component="p"
                              variant="p"
                              className="comman-text-content"
                            >
                              {val?.winNumber ? val?.winNumber : "?"}
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="game-record-number-id">
                            <Index.Typography
                              component="p"
                              variant="p"
                              className="recordid-text-content"
                            >
                              {/* {val?.period} */}
                              {val?.period
                                ? val?.period?.toString()?.slice(-3)
                                : "-"}
                            </Index.Typography>
                          </Index.Box>
                        </Index.Box>
                      </Index.ListItem>
                    </>
                  );
                })}
                <Index.ListItem className="game-record--listitem"></Index.ListItem>
              </Index.List>

              {isMoreGameRecords() ? (
                <Index.Box className="more-right-record">
                  <Index.Link
                    className="more-link-content"
                    to="/user/number-betting/all-records"
                  >
                    More &#8811;
                  </Index.Link>
                </Index.Box>
              ) : (
                ""
              )}
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
