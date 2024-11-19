import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import Loader from "../../../../component/comman/loader/Loader";
import Parser from "html-react-parser";
import { toast } from "react-toastify";
import CardAndCommunityBetting from "../../../../component/comman/cardAndCommunityBetting/CardAndCommunityBetting";

export default function CommunityGameRules() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const data = location?.state;
  localStorage.setItem("manual", data?.ele?.gameMode);
  const [loader, setLoader] = useState(true);
  const [userGameRulesId, setUserGameRulesId] = useState("");
  const htmlString = userGameRulesId;
  const withoutImgTag = htmlString.replace(/<img[^>]*>/g, "");
  const navigate = useNavigate();
  const [
    ,
    ,
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
    setOpenChatDrawer
  ] = useOutletContext();

  const referralCode = useSelector(
    (state) => state?.UserReducer?.userData?.referralCode
  );
  const [hours, setHours] = useState();
  console.log(hours, "hours");

  const userGameRules = async () => {
    setLoader(true);
    await DataService.get(Api.User.USER_GAME_RULES + "/" + data?.ele?._id)
      .then((res) => {
        setUserGameRulesId(res?.data?.data?.gameRules);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  useEffect(() => {
    userGameRules();
  }, [userGameRulesId]);

  useEffect(() => {
    if (hours) {
      navigate("/user/community-betting", {
        state: {
          data: data,
        },
      });
    }
  }, [hours]);
  const getTimeInHourAndMinute = (time) => {
    let hours = Math.floor(time / 60);
    let minutes = time % 60;
    // return hours + "h " + minutes + "m";
    return hours + "h " + (minutes == 0 ? "" : minutes + "m");
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <Index.Box className="dashbaord-user-main-page">
          <Index.Box className="dasboard-flex-user-main">
            <Index.Box className="left-dashboard-main-user">
              <Index.Box className="page-content-game-details">
                <Index.Box className="seconds-select-details-modal">
                  <Index.Box className="bet-details-img">
                    <img
                      src={
                        process.env.REACT_APP_IMG +
                        location?.state?.ele?.gameImage
                      }
                      alt="community-color-bet"
                      className="center-bet-img contain-img"
                    ></img>
                  </Index.Box>
                  <Index.Box className="seconds-select-content">
                    <Index.Box className="seconds-three-flex">
                      <Index.Box
                        className="second-divide-content second-onclick-active"
                        onClick={() => setHours(+data?.ele?.gameHours)}
                      >
                        <Index.Box className="second-check-content">
                          <Index.Box className="second-main-border">
                            <Index.Box className="pd-second-content">
                              <Index.Box className="sec-inner-border-content">
                                <Index.Box className="inner-pd-content-details">
                                  <Index.Typography
                                    component="p"
                                    variant="p"
                                    className="second-title"
                                  >
                                    {getTimeInHourAndMinute(data?.ele?.gameHours)}
                                    {/* <span className="second-title-list">
                                      Hours
                                    </span> */}
                                  </Index.Typography>
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                        {/* <Index.Box className="check-content-img-list">
                          <img
                            src={PageIndex.Svg.secondcheck}
                            className="comman-check-img uncheck-img-sec"
                          ></img>
                          <img
                            src={PageIndex.Svg.seconduncheck}
                            className="comman-check-img check-img-sec"
                          ></img>
                        </Index.Box> */}
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box className="game-rules-content">
                  <Index.Box className="game-rules-color-bets">
                    <Index.Box className="game-list-title">
                      <Index.Typography
                        className="game-title"
                        component="p"
                        variant="p"
                      >
                        Game Rules
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="game-list-details-content">
                      <Index.List className="game-list-main">
                        <Index.ListItem className="game-listitem-details">
                          {withoutImgTag ? Parser(withoutImgTag) : ""}
                        </Index.ListItem>
                      </Index.List>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box className="game-rules-btns-list">
                  <Index.Box className="game-back-rule">
                    <PageIndex.BlueOutlineButton
                      className="outline-blue-btn-content"
                      btnLabel="Back"
                      onClick={() => {
                        navigate("/user");
                      }}
                    />
                  </Index.Box>
                  {/* <Index.Box className="proceed-btn-blue">
                    <PageIndex.BlueButton
                      btnLabel="Proceed"
                      className="blue-btn-content"

                      onClick={() => {
                        // if (hours) {
                          navigate("/user/community-betting", {
                            state: {
                              data: data,
                            },
                          })
                        // } else {
                        //   toast.error('Please select game time', {
                        //     toastId: "customId"
                        //   })

                        // }

                      }}
                    // onClick={()=>{navigate("/user/number-betting", {
                    //   state: {
                    //     data: data,
                    //   },
                    // })}}

                    />
                  </Index.Box> */}
                </Index.Box>
              </Index.Box>
            </Index.Box>

            <Index.Box
              className={!openChatDrawer ? "right-dashboard-main-user header-left-active" : "right-dashboard-main-user"}
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
                          onClick={() => setOpen(referralCode ? false : true)}
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
    </>
  );
}
