import React, { useEffect, useRef, useState, useMemo } from "react";
import Index from "../../../Index";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getTotalCoins, userAmount } from "../../../../redux/user/userReducer";
import moment from "moment";
import PagesIndex from "../../../pageIndex";
import PageIndex from "../../../pageIndex";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
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
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

var socket;

export default function UserPenaltyBetting() {
  const location = useLocation();
  const navigate = useNavigate();
  let timeRef = useRef(null);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState("panel1");
  const [responseMessage, setResponseMessage] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [minBtn, setMinBtn] = useState(false);
  const [maxBtn, setMaxBtn] = useState(false);

  console.log(minBtn, maxBtn, 74);
  const [winningSide, setWinningSide] = useState("");
  const [battleModal, setBattleModal] = useState(false);
  const [showWinnewModal, setShowWinnewModal] = useState(false);
  const [betSide, setBetSide] = useState("");
  const [betsides, setBetSides] = useState("");
  const selectedSecond = location?.state?.selectedSecond;
  const storedValue = localStorage.getItem("userGameId");
  const gameId = JSON.parse(storedValue);
  const [count, setCount] = useState(gameId?.gameMinimumCoin);
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

  const userAmounts = useSelector(
    (state) => state?.UserReducer?.totalCoins?.totalCoin
  );
  const handleChangeAccro = (panel, expanded) => {
    setExpanded(expanded == panel ? "" : panel);
  };

  const footballDirection = (className, standingMen, walkingMen) => {
    console.log(className, "130");
    const elem = document.getElementById("football-container");
    elem.classList.add(className);
    setTimeout(() => {
      elem.classList.remove(className);
    }, 5000);
    if (standingMen) {
      const elem = (document.getElementById(standingMen).style.display =
        "none");
      // elem.classList.remove(className)
      setTimeout(() => {
        const elem = (document.getElementById(standingMen).style.display =
          "block");
      }, 2000);
    }
    if (walkingMen) {
      const elem = (document.getElementById(walkingMen).style.display =
        "block");
      // elem.classList.add(className)
      setTimeout(() => {
        const elem = (document.getElementById(walkingMen).style.display =
          "none");
      }, 2000);
    }
  };
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

  const getSingleData = async () => {
    await DataService.get(
      `${Api.User.GET_MY_RECORD}/${gameId?._id}?second=${selectedSecond}`
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
      `${Api.User.GET_ALL_RECORD}/${gameId?._id}?second=${selectedSecond}`
    )
      .then((res) => {
        let data = res?.data?.data;
        // data?.reverse();
        // if(isCallingFirstTime){
        //   data = data.slice(1)
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

  const winnerDeclaration = async () => {
    await DataService.get(
      `${Api.User.PENALTY_WINNER_RESULT}/${gameId?._id}/${periodData?.period}?second=${selectedSecond}`
    )
      .then((res) => {
        if (res?.data?.data?.[0]?.betSide) {
          
          setWinningSide(res?.data?.data?.[0]?.betSide);
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
      winnerDeclaration();
    }
    // if (socketTimer == 0) {
    //   setTimeout(() => {
    //     socketCall();
    //   }, 1000);
    //   dispatch(getTotalCoins());

    //   if (responseMessage) {
    //     setShowWinnewModal(true);
    //     setTimeout(() => setShowWinnewModal(false), 3000);
    //   }
    //   if (winningSide) {
    //     footballDirection(
    //       `${winningSide?.toLowerCase()}-football`,
    //       "standing-mens",
    //       "walk-position"
    //     );
    //   }
    // }
    if (socketTimer == 0) {
      dispatch(getTotalCoins());

      if (responseMessage) {
        setShowWinnewModal(true);
      }
      if (winningSide) {
        footballDirection(
          `${winningSide?.toLowerCase()}-football`,
          "standing-mens",
          "walk-position"
        );
      }
      setTimeout(() => {
        getGamePeriod();
        handleCloseWinnerModal();
        // socketCall();
      }, 4000);
      getSingleData();
      getAllData();
    }
    console.log("317: ", periodData)
  }, [socketTimer]);

  const calculateGameTime = (periodData) => {
    clearInterval(timeRef.current);
    timeRef.current = setInterval(() => {
      var currentDate = moment().format("YYYY/MM/DD");

      const endDateTime = moment(currentDate + " " + periodData?.endTime);
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

      if (hours <= 0 && minutes <= 0 && seconds <= 0) {
        setGameTimer("00:00:00");
        clearInterval(timeRef.current);
        setTimeout(() => {
          getGamePeriod();
          handleCloseWinnerModal();
        }, 4000);
        getSingleData();
        getAllData();
        return "00:00:00";
      } else {
        setGameTimer(countDown);
      }
      return countDown;
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
      betSide: betsides,
      selectedTime: selectedSecond,
    };
    if (userAmounts <= count) {
      toast.error("balance is insufficient");
    } else {
      DataService.post(Api.User.CREATE_PENALTY_BET, data)
        .then((res) => {
          if (res.data.status === 200 || res.data.status === 201) {
            toast.success(res?.data?.message, {
              toastId: "customId",
            });
            socket?.emit("createColourBet");
            getSingleData();
            dispatch(getTotalCoins());

            // footballDirection(betSide, "standing-mens", "walk-position");
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
    console.log(decrementValue, 376);
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
    }
  }, [socketTimer]);

  const handleCloseWinnerModal = () => {
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
                    betsides.charAt(0).toUpperCase() + betsides.slice(1)
                  } penalty `}
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
            <Index.Box className="penalty-game-content">
              <Index.Box className="audience-img-cotent">
                <img
                  src={PageIndex.Png.stadim}
                  className="stadim-img"
                  alt="stadim"
                ></img>
              </Index.Box>

              <Index.Box className="penalty-game-football">
                <Index.Box className="stadium-light-main-content">
                  <img
                    src={PageIndex.Png.lightcontent}
                    className="lightcontent-penalty"
                    alt="light-user"
                  ></img>
                </Index.Box>
                {/* left right football net */}
                <Index.Box className="penalty-max-content">
                  <Index.Box className="penalty-main-net-details">
                    <Index.Box className="penalty-left-net-details">
                      <img
                        src={PageIndex.Svg.yellow}
                        className="net-left-content"
                        alt="net"
                      ></img>
                      <Index.Box className="penalty-main-title">
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="penalty-title"
                        >
                          Left
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box className="penalty-main-net-details">
                    <Index.Box className="penalty-right-net-details">
                      <Index.Box className="penalty-main-title penalty-main-title-right">
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="penalty-title"
                        >
                          right
                        </Index.Typography>
                      </Index.Box>
                      <img
                        src={PageIndex.Svg.orange}
                        className="net-right-content"
                        alt="orange"
                      ></img>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box className="penalty-game-ground-img">
                  <img
                    src={PageIndex.Png.greenground}
                    className="ground-content-list"
                    alt="greenground"
                  ></img>
                  <Index.Box
                    className="shadow-img-bottom ball-container"
                    id={"football-container"}
                  >
                    {/* <div class="ball-pen">
                    </div> */}
                    <img
                      src={PageIndex.Png.ball}
                      className="ball-pen"
                      alt="ball "
                    ></img>
                    {/* <Index.Box className="penalty-ball-details">
                    <img src={PageIndex.Png.ball} className="ball-football-content"></img>
                  </Index.Box> */}
                  </Index.Box>
                  {/* <Index.Box className="mens-kick-ball-main">
                    <PageIndex.Penaltymens />
                  </Index.Box> */}
                  <Index.Box className={`standing-mens`} id="standing-mens">
                    <Index.Box className="standing-men-content"></Index.Box>
                  </Index.Box>
                  <Index.Box className={`walk-position`} id="walk-position">
                    <Index.Box className="walk-container">
                      <Index.Box className="walk"> </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                {/* circular timer  */}
                <Index.Box className="penalty-timer-details">
                  <Index.Box className="timer-progress-details">
                    <Index.Box className="timer-progress-bg">
                      <Index.Box
                        className="timer-text-pro"
                        id={"base-timer-label"}
                      ></Index.Box>
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
              </Index.Box>
            </Index.Box>

            <Index.Box className="penalty-bet-details">
              <Index.Box className="bet-amount-bg-content">
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
                            onClick={(e) => {
                              if (userAmounts <= 0 || count > userAmounts) {
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
                                  toast.error("balance is insufficient");
                                } else if (!disableButtons) {
                                  setBetSides("left");
                                  setBetSide("left-football");
                                  setBattleModal(true);
                                }
                              }
                            }}
                          >
                            Bet Left
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

                                // if (!isNaN(minCoin) && !isNaN(maxCoin)) {
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
                              onClick={() => decreaseCount(5)}
                              // disabled={disableButtons || minBtn}
                              disabled={
                                disableButtons ||
                                count - 4 <= gameId?.gameMinimumCoin
                              }
                            >
                              -
                            </Index.Button>
                          </Index.Box>
                          <Index.Box className="place-plus-bet-right">
                            <Index.Button
                              className="plus-bet-btn-card"
                              onClick={() => increaseCount(5)}
                              // disabled={disableButtons || maxBtn}
                              disabled={
                                disableButtons ||
                                count + 4 >= gameId?.gameMaximumCoin
                              }
                            >
                              +
                            </Index.Button>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                      <Index.Box className="penalty-flex-content desktop-btn-bet">
                        <Index.Box className="places-brt-main-btn">
                          <Index.Button
                            // className="place-btn-content"

                            className={
                              !isValidBetAmount || disableButtons
                                ? "place-btn-content btn-disabled-content"
                                : "place-btn-content"
                            }
                            onClick={(e) => {
                              if (userAmounts <= 0 || count > userAmounts) {
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
                                  toast.error("balance is insufficient");
                                } else if (!disableButtons) {
                                  setBetSides("right");
                                  setBetSide("right-football");
                                  setBattleModal(true);
                                }
                              }
                            }}
                            // onClick={() =>
                            //   footballDirection(
                            //     "right-football",
                            //     "standing-mens",
                            //     "walk-position"
                            //   )
                            // }
                          >
                            Bet Right
                          </Index.Button>
                        </Index.Box>
                      </Index.Box>
                      <Index.Box className="flex-mobile-bet-btn">
                        <Index.Box className="penalty-flex-content">
                          <Index.Box className="places-brt-main-btn">
                            <Index.Button
                              className={
                                !isValidBetAmount || disableButtons
                                  ? "place-btn-content btn-disabled-content"
                                  : "place-btn-content"
                              }
                              // className="place-btn-content"
                              onClick={(e) => {
                                if (selectedSecond == "") {
                                  toast.error("Ple select game time");
                                } else {
                                  if (userAmounts < count) {
                                    toast.error("balance is insufficient");
                                  } else if (!disableButtons) {
                                    setBetSides("left");
                                    setBetSide("left-football");
                                    setBattleModal(true);
                                  }
                                }
                              }}
                              // onClick={() =>
                              //   footballDirection(
                              //     "left-football",
                              //     "standing-mens",
                              //     "walk-position"
                              //   )
                              // }
                            >
                              Bet Left
                            </Index.Button>
                          </Index.Box>
                        </Index.Box>
                        <Index.Box className="penalty-flex-content">
                          <Index.Box className="places-brt-main-btn">
                            <Index.Button
                              // className="place-btn-content"

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
                                    toast.error("balance is insufficient");
                                  } else if (!disableButtons) {
                                    setBetSides("right");
                                    setBetSide("right-football");
                                    setBattleModal(true);
                                  }
                                }
                              }}
                              // onClick={() =>
                              //   footballDirection(
                              //     "right-football",
                              //     "standing-mens",
                              //     "walk-position"
                              //   )
                              // }
                            >
                              Bet Right
                            </Index.Button>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>

            {/* my records */}

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
                      const str = ele?.betSide;
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
                                    Selected penalty:
                                    <span>
                                      {betSideUppercase + " " + "penalty"}
                                    </span>
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
                      <Index.Box
                        className="more-link-content"
                        onClick={() => {
                          navigate("/user/penalty-betting/my-records", {
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
                    let Color_firstCharacter;
                    let winBetSide;
                    if(userData?.winBetSides?.length){
                      winBetSide = userData?.winBetSides[0]
                      Color_firstCharacter = userData?.winBetSides[0]?.charAt(0)?.toUpperCase();
                    }
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
                                winBetSide == "left"
                                  ? "green-bg-record"
                                  : winBetSide == "right"
                                  ? "red-bg-record"
                                  : null
                              }`}
                            >
                              <Index.Typography
                                component="p"
                                variant="p"
                                className="comman-text-content"
                              >
                                {winBetSide
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
                        navigate("/user/penalty-betting/all-records", {
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
