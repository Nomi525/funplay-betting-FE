import React, { useState } from "react";
import Index from "../../Index";
import PageIndex from "../../PageIndex";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
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
const CardAndCommunityBetting = () => {
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState("");
  const referralCode = useSelector(
    (state) => state?.UserReducer?.userData?.referralCode
  );
  const walletAddress = localStorage.getItem("walletAddress");
  const navigate = useNavigate();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    // navigate("/user")
    setDate("");
  };

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
    // setSelectedVal(ele?.gameName);
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
      if (walletAddress) {
        localStorage.setItem("userGameId", JSON.stringify(ele));
        if (
          currentDateTime >= startDateTime &&
          currentDateTime <= endDateTime
        ) {
          if (expected_endtime >= currentDateTime || ele?.isRepeat) {
            if (ele?.gameName === "Community Betting") {
              navigate("/user/community-betting-gamerules", {
                state: {
                  ele: ele,
                },
              });
            } else if (ele?.gameName === "Card Betting") {
              navigate("/user/card-betting-gamerules", {
                state: {
                  ele: ele,
                },
              });
            }
            setOpenModal(false);
          } else {
            setOpenModal(true);
          }
        } else {
          setOpenModal(true);
        }
      } else {
        toast.error("Please connect wallet", {
          toastId: "customId",
        });
      }
    } else {
      navigate("/user", { state: { message: "loginRequired" } });
    }
  };
  return (
    <>
      <Index.Box className="right-dashboard-main-user">
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
                  <PageIndex.BlueButton
                    btnLabel="Play Now"
                    className="blue-btn-content"
                    onClick={() =>
                      handleNavigate(
                        JSON.parse(localStorage.getItem("cardBetting"))
                      )
                    }
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
                    onClick={() =>
                      handleNavigate(
                        JSON.parse(localStorage.getItem("communityBetting"))
                      )
                    }
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
      <Index.Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-comman-details"
      >
        <Index.Box sx={style} className="modal-comman-inner-style">
          <Index.Box className="modal-cancel-btn">
            <Index.Button
              className="btn btn-cancel"
              handleOpenModal={handleOpenModal}
            >
              <img
                src={PageIndex.Svg.cancelmodal}
                className="cancel-modal"
                alt="modal-cancel"
                onClick={() => {
                  handleCloseModal();
                  setDate("");
                }}
              />
            </Index.Button>
          </Index.Box>
          <Index.Box className="otp-main-component">
            <PageIndex.UserGameErrorModal
              setOpenModal={setOpenModal}
              date={date}
              openModal={openModal}
              // userGameId={userGameId}
              // handleCloseGameRules={handleCloseGameRules}
            />
          </Index.Box>
        </Index.Box>
      </Index.Modal>
    </>
  );
};

export default CardAndCommunityBetting;
