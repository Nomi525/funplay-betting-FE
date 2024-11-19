import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import { useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Api } from "../../../../config/Api";

var socket;
export default function UserLayout() {
  const param = useParams();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [gameRules, setGameRules] = useState(false);
  const [userGameId, setUserGameId] = useState();
  const [date, setDate] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [gameRuleError, setGameRuleError] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(
    location?.pathname == "/user/withdraw" ? true : false
  );
  const [totalAmount, setTotalAmount] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState();
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openChatDrawer, setOpenChatDrawer] = useState(true);
  const [allLiveBets, setAllLiveBets] = useState([]);
  const [selectedVal, setSelectedVal] = useState();
  // const [openSignIn, setOpenSignIn] = useState(false);

  const handleOpenGameRules = () => setGameRules(true);
  const handleCloseGameRules = () => {
    setGameRules(false);
    setDate("");
  };

  // const handleOpenSignIn = () => {
  //   setOpenSignIn(true);
  //   // setReferCode("");
  // };
  const [openChat, setOpenChat] = useState(false);
  const handleOpenChat = () => {
    setOpenChat(!openChat);
  };
  const handleLiveBets = () => {
    setInterval(() => {
      socket?.emit("createColourBet");
    }, 5000);
  };
  useEffect(() => {
    socket = io(Api.common.BASE_URL);
    socket.emit("createColourBet");
    socket.on("response", async (liveBetsData) => {
      if (liveBetsData?.liveBets) {
        setAllLiveBets(liveBetsData?.liveBets);
      }
    });
    handleLiveBets();
    return () => {
      socket.off("response");
    };
  }, []);

  return (
    <>
      <Index.Box className="user-outlet-main-content">
        <Index.Box
          onClick={() => {
            document.body.classList[!openMenu ? "add" : "remove"](
              "header-override"
            );
            setOpenMenu(!openMenu);
          }}
          class={`overlay-section mobile-show ${
            openMenu ? "overlay-mobile-active" : ""
          }`}
          id="overlays"
        >
          {" "}
        </Index.Box>
        <Index.Box
          className={`user-sidebar-outlet-content ${
            openMenu ? "header-left-active" : ""
          }`}
        >
          <PageIndex.Sidebar
            openMenu={openMenu}
            setOpenModal={setOpenModal}
            openModal={openModal}
            open={open}
            // handleOpenSignIn={handleOpenSignIn}
            setOpen={setOpen}
            setOpenMenu={setOpenMenu}
            setOpenWithdraw={setOpenWithdraw}
            handleCloseGameRules={handleCloseGameRules}
            handleOpenGameRules={handleOpenGameRules}
            userGameId={userGameId}
            setUserGameId={setUserGameId}
            date={date}
            setDate={setDate}
            walletAddress={walletAddress}
            selectedVal={selectedVal}
            setSelectedVal={setSelectedVal}
          />
        </Index.Box>
        <Index.Box className="user-outlet-right-content">
          <Index.Box className="top-header-content-outlet">
            <PageIndex.Header
              openChat={openChat}
              handleOpenChat={handleOpenChat}
              open={open}
              setOpen={setOpen}
              handleOpen={handleOpen}
              handleClose={handleClose}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              openWithdraw={openWithdraw}
              setOpenWithdraw={setOpenWithdraw}
              gameRules={gameRules}
              setGameRules={setGameRules}
              setUserGameId={setUserGameId}
              userGameId={userGameId}
              date={date}
              setDate={setDate}
              gameRuleError={gameRuleError}
              setGameRuleError={setGameRuleError}
              totalAmount={totalAmount}
              setTotalAmount={setTotalAmount}
              handleOpenGameRules={handleOpenGameRules}
              handleCloseGameRules={handleCloseGameRules}
              setOpenModal={setOpenModal}
              openModal={openModal}
              walletAddress={walletAddress}
              setWalletAddress={setWalletAddress}
              openDeposit={openDeposit}
              setOpenDeposit={setOpenDeposit}
              // setOpenChatDrawer={setOpenChatDrawer}
              // openChatDrawer={openChatDrawer}
            />
          </Index.Box>
          <Index.Box className="user-content-inner-data">
            <Index.Box className="user-inner-content-scroll">
              <Index.Box
                className={
                  location?.pathname !== "/user/number-betting"
                    ? location?.pathname == "/user/three-color-betting" ||
                      location?.pathname == "/user/two-color-betting"
                      ? "pd-inner-comman-user mobile-overflow-content"
                      : "pd-inner-comman-user "
                    : "pd-inner-comman-user number-betting-pd"
                }
              >
                <PageIndex.Outlet
                  context={[
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
                  ]}
                />
              </Index.Box>

              <Index.Box className="footer-comman-layout">
                <PageIndex.Footer
                  selectedVal={selectedVal}
                  setSelectedVal={setSelectedVal}
                />
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
