import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PagesIndex from "../../../pageIndex";
import PageIndex from "../../../pageIndex";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../../component/comman/loader/Loader";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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

export default function CommunityBettingSwap() {
  const navigate = Index.useNavigate();
  const { state } = useLocation();
  let id = state?.gameId;
  let distributionCoin = state?.distributionCoin;
  let type = state?.gameType;
  console.log(state?.gameType, "type18");
  let periodId = state?.periodId;
  const params = useParams();
  const decodedTitle = decodeURIComponent(state?.gameName);
  const titleWithoutSpaces = decodedTitle.replace(/\s/g, ""); // Removes all spaces
  const [gamelist, setGamelist] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [userId, setUserId] = useState([]);
  // const [totalBetCoins,setTotalBetCoins] = useState(0)
  const [totalBetAmount, setTotalBetAmount] = useState(0);
  const [totalBetUser, setTotalBetUser] = useState(0);
  const [searchedData, setSearchedData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [winnerList, setWinnerList] = useState([]);
  const [battleModal, setBattleModal] = useState(false);
  const [distributionAmount, setDistributionAmount] = useState("");
  const [remainingBalance, setRemainingBalance] = useState();
  const [winnUserNo, setWinnUserNo] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  console.log(winnerList, "winnerList");
  const [loading, setLoading] = useState(false);
  // console.log(totalBetAmount, 51);

  const handleSelectWinner = (e, ele) => {
    const { value, checked } = e.target;
    if (checkedIds?.length) {
      setUserId(userId.filter((id) => id !== ele?.userId));
      setCheckedIds(checkedIds.filter((id) => id !== value));
    }
    if (winnUserNo === undefined || checkedIds.length < winnUserNo) {
      // Check if the item is already selected
      const isItemAlreadySelected = checkedIds.includes(value);

      if (checked && !isItemAlreadySelected) {
        // If checked and not already selected, add the item to the state
        setUserId([...userId, ele?.userId]);
        setCheckedIds([...checkedIds, value]);
      } else if (!checked && isItemAlreadySelected) {
        // If unchecked and already selected, remove the item from the state
        setUserId(userId.filter((id) => id !== ele?.userId));
        setCheckedIds(checkedIds.filter((id) => id !== value));
      }
    } else {
      let data = checkedIds.filter((ele) => ele == value);
      // console.log("sxasx", data?.length)
      // toast.error(`Maximum ${winnUserNo} users selected!`);
    }
  };

  const getAllWinnerList = () => {
    setLoading(true);
    DataService.get(`${Api.ADMIN_GET_USERS_WINNERS_COMMUNITY_BETTING}/${type}`)
      .then((res) => {
        setWinnerList(
          res?.data?.data?.getAllWinners?.filter(
            (row) => row.period == periodId
          )
        );
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        // setWinnerList(
        //   res.data.data.filter((row) => row.period == periodId)[0].periodId
        // );
        // const winner = res.data.data.getAllWinners?.filter((row)=>{
        //  return row?.period == periodId
        // })
        // setWinnerList(winner);
      })
      .catch((e) => {
        // toast.error(
        //   e.response.data.message ? e.response.data.message : e.message
        // );
        setLoading(false);
      });
  };

  const updateWinnerDeclare = () => {
    const data = {
      winnerIds: userId,
      gameId: id,
      distributionCoin: +distributionAmount,
      period: +periodId,
    };
    // const data = {userIds:userId,gameId:checkedIds}
    DataService.post(Api.ADMIN_UPDATE_DECLARE_WINNER, data)
      .then((res) => {
        // setGamelist(res?.data?.data);
        setCheckedIds([]);
        getAllWinnerList();
        getAllGamesList();
        setBattleModal(false);
        toast.success(res?.data?.message, {
          toastId: "customId",
        });
        setSearchedData();
      })
      .catch((e) => {
        toast.error(
          e.response.data.message ? e.response.data.message : e.message
        );
      });
  };

  const getAllGamesList = () => {
    DataService.get(`${Api.ADMIN_GAME_PERIODS}/${type}/${id}`)
      .then((res) => {
        setSelectedData(
          res.data.data.filter((row) => row.period == periodId)[0].periodId
        );
        setGamelist(
          res.data.data.filter((row) => row.period == periodId)[0]
            .comunityBettingData
        );
        setSearchedData(
          res.data.data.filter((row) => row.period == periodId)[0]
            .comunityBettingData
        );
        setData(
          res.data.data.filter((row) => row.period == periodId)[0]
            .comunityBettingData
        );

        let totalBetAmount = res.data.data
          .find((row) => row.period == periodId)
          ?.comunityBettingData?.reduce(
            (acumulator, b) => acumulator + b.betAmount,
            0
          );
        let totalBetUser = res.data.data.find((row) => row.period == periodId)
          ?.comunityBettingData?.length;

        setTotalBetAmount(totalBetAmount);
        setTotalBetUser(res.data.data[0].totalUsers);

        // setLoading(false);
      })
      .catch((e) => {
        // toast.error(e.res?.data?.message ? e.res?.data?.message : e.message);
        // setLoading(false);
      });
  };

  const getUserGame = async () => {
    await DataService.get(Api.User.USER_GAMES)
      .then((res) => {
        let data = res?.data?.data?.filter(
          (ele) => ele?.gameName == "Community Betting"
        );
        setWinnUserNo(data?.[0]?.noOfUsers);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getUserGame();
  }, []);

  useEffect(() => {
    getAllGamesList();
    getAllWinnerList();
  }, []);

  const handleSwap = () => {
    let currentIndex = data?.length;
    let temporaryValue, randomIndex;
    const shuffledData = [...data];
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = shuffledData[currentIndex];
      shuffledData[currentIndex] = shuffledData[randomIndex];
      shuffledData[randomIndex] = temporaryValue;
    }
    setSearchedData(shuffledData);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <Index.Box className="page-content-box">
            <Index.Box className="barge-common-box">
              <Index.Box className="title-header">
                <Index.Box className="flex-just-edit-list ">
                  <Index.Box className="title-header-flex justify-space-list-content">
                    <Index.Box className="title-main mb-10">
                      <Index.Typography
                        variant="p"
                        component="p"
                        className="page-title"
                      >
                        Community Betting
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="add-game-button community-back-right">
                      <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                        <Index.Button
                          variant="contained"
                          onClick={() => {
                            if (state?.gameType == "numberBetting") {
                              navigate(`/admin/periods-table`, {
                                state: {
                                  gameId: state?.gameId,
                                  gameName: state?.gameName,
                                  gameType: state?.gameType,
                                },
                              });
                            } else if (state?.gameType == "Color Prediction") {
                              navigate(`/admin/periods-table`, {
                                state: {
                                  gameId: state?.gameId,
                                  gameName: state?.gameName,
                                  gameType: state?.gameType,
                                },
                              });
                            } else if (state?.gameType == "communityBetting") {
                              navigate(`/admin/periods-table`, {
                                state: {
                                  gameId: state?.gameId,
                                  gameName: state?.gameName,
                                  gameType: state?.gameType,
                                },
                              });
                            } else if (state?.gameType == "2colorBetting") {
                              navigate(`/admin/periods-table`, {
                                state: {
                                  gameId: state?.gameId,
                                  gameName: state?.gameName,
                                  gameType: state?.gameType,
                                },
                              });
                            }
                          }}
                        >
                          <img
                            src={PageIndex.Png.back}
                            className="back-btn-spacing"
                          />
                          Back
                        </Index.Button>
                      </Index.Box>

                      <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                        <Index.Button
                          variant="contained"
                          type="submit"
                          onClick={() => {
                            if (distributionAmount == "") {
                              setError(`Distribution amount is required`);
                            } else {
                              setBattleModal(true);
                              setError("");
                            }
                          }}
                          disabled={!distributionAmount || !checkedIds.length}
                        >
                          submit
                        </Index.Button>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>

              <Index.Box className="community-bet-swap">
                <Index.Box className="community-title-details">
                  <Index.Box className="number-details-content">
                    <Index.Box className="total-bet-coins-content swap-btn-mb-details">
                      <Index.Box className="flex-bet-content ">
                        <Index.Typography
                          component="h5"
                          variant="h5"
                          className="flex-bet-title"
                        >
                          Periods ID :
                        </Index.Typography>
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="flex-bet-value"
                        >
                          {periodId}
                        </Index.Typography>
                      </Index.Box>
                      <Index.Box className="flex-bet-content ">
                        <Index.Typography
                          component="h5"
                          variant="h5"
                          className="flex-bet-title"
                        >
                          Total Bet Coins :
                        </Index.Typography>
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="flex-bet-value"
                        >
                          {totalBetAmount}
                        </Index.Typography>
                      </Index.Box>
                      <Index.Box className="total-bet-coins-content">
                        <Index.Box className="flex-bet-content">
                          <Index.Typography
                            component="h5"
                            variant="h5"
                            className="flex-bet-title"
                          >
                            Total User :
                          </Index.Typography>
                          <Index.Typography
                            component="p"
                            variant="p"
                            className="flex-bet-value"
                          >
                            {totalBetUser}
                          </Index.Typography>
                        </Index.Box>
                      </Index.Box>

                      <Index.Box className="flex-bet-content   mb-15px-swap">
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="flex-bet-title mr-community-bet"
                        >
                          Distribution Amount
                        </Index.Typography>
                        <Index.Box className="input-design-div with-border">
                          <Index.TextField
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            placeholder="Distribution Amount"
                            variant="filled"
                            className="admin-input-design input-placeholder"
                            autoComplete="off"
                            name="distributionCoin"
                            type="number"
                            onWheel={(event) => event.target.blur()}
                            value={distributionAmount}
                            onChange={(e) => {
                              let num = e.target.value;
                              if (
                                num === "" ||
                                (num > 0 && num <= totalBetAmount)
                              ) {
                                setDistributionAmount(num);
                                setRemainingBalance(totalBetAmount - num);
                                setError("");
                              }
                            }}
                          />
                        </Index.Box>
                      </Index.Box>

                      <Index.Typography
                        component="p"
                        className="number_betting_error"
                      >
                        {error}
                      </Index.Typography>

                      <Index.Box className="flex-bet-content  mb-15px-swap swapping">
                        <Index.Box className="flex-bet-box">
                          <Index.Typography
                            variant="label"
                            component="label"
                            className="flex-bet-title  mr-community-bet"
                          >
                            Remaining Amount
                          </Index.Typography>
                          <Index.Box className="input-design-div with-border">
                            <Index.TextField
                              hiddenLabel
                              id="filled-hidden-label-normal"
                              placeholder="Remaining Amount"
                              variant="filled"
                              className="admin-input-design input-placeholder"
                              autoComplete="off"
                              name="remainingblance"
                              type="number"
                              onWheel={(event) => event.target.blur()}
                              disabled
                              value={remainingBalance}
                              defaultValue={totalBetAmount}
                            />
                          </Index.Box>
                        </Index.Box>

                        <Index.Box className="input-design-div with-border">
                          <Index.Box className="image-box">
                            <img
                              src={PageIndex.Svg.swap}
                              className="swap-button"
                              onClick={handleSwap}
                            />
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="community-swap-details">
                  <Index.Grid
                    container
                    className="community-swap-container"
                    spacing={2}
                  >
                    <Index.Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      className="community-inner-grid"
                    >
                      <Index.Box className="bet-amount-swap-details">
                        <Index.List className="bet-swap-list title-detail-swap">
                          <Index.ListItem className="bet-swap-listitem">
                            <Index.Box className="check-list-content col-list-comman"></Index.Box>
                            <Index.Box className="user-bet-details col-list-comman">
                              <Index.Box className="user-bet-title-details">
                                <Index.Typography
                                  component="p"
                                  variant="p"
                                  className="user-title-content"
                                >
                                  User
                                </Index.Typography>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="user-bet-amount-details col-list-comman">
                              <Index.Box className="user-bet-title-amount">
                                <Index.Typography
                                  component="p"
                                  variant="p"
                                  className="user-amount-title-content"
                                >
                                  Bet amount
                                </Index.Typography>
                              </Index.Box>
                            </Index.Box>
                          </Index.ListItem>
                        </Index.List>
                        <Index.List className="bet-swap-list inner-details-height-content">
                          {console.log(searchedData, "data")}
                          {searchedData?.map((ele) => {
                            return (
                              <Index.ListItem className="bet-swap-listitem">
                                <Index.Box className="check-list-content col-list-comman">
                                  <Index.Checkbox
                                    value={ele?.userId}
                                    {...label}
                                    className="checkbox-main-content"
                                    onChange={(e) => {
                                      handleSelectWinner(e, ele);
                                    }}
                                    checked={checkedIds?.some(
                                      (e) => e === ele?.userId
                                    )}
                                    // checked={checkedIds.includes(ele?._id)}
                                  />
                                </Index.Box>
                                <Index.Box className="user-bet-details col-list-comman">
                                  <Index.Box className="user-bet-title-details">
                                    <Index.Typography
                                      component="p"
                                      variant="p"
                                      className="user-title-content"
                                    >
                                      {/* {ele?.userId?.fullName} */}
                                      {console.log(ele?.userName, "1111")}
                                      {ele?.userName}
                                    </Index.Typography>
                                  </Index.Box>
                                </Index.Box>
                                <Index.Box className="user-bet-amount-details col-list-comman">
                                  <Index.Box className="user-bet-title-amount">
                                    <Index.Typography
                                      component="p"
                                      variant="p"
                                      className="user-amount-title-content"
                                    >
                                      {/* {ele?.betAmount} */}
                                      {ele?.betAmount}
                                    </Index.Typography>
                                  </Index.Box>
                                </Index.Box>
                              </Index.ListItem>
                            );
                          })}
                        </Index.List>
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      className="community-inner-grid"
                    >
                      <Index.Box className="winner-checkbox-click-details">
                        <Index.Box className="winner-check-details">
                          <Index.Typography
                            component="h5"
                            variant="h5"
                            className="winner-center-title"
                          >
                            Winner
                          </Index.Typography>
                        </Index.Box>
                        <Index.Box className="winner-list-details-checl-show inner-details-height-content">
                          <Index.List className="winner-list-show">
                            {winnerList?.map((ele) => {
                              return (
                                <Index.ListItem className="winner-listitem-show">
                                  <Index.Box className="winner-grid-one">
                                    <Index.Box className="winner-user-name-list">
                                      <Index.Typography
                                        component="p"
                                        variant="p"
                                        className="winner-user-title-name"
                                      >
                                        {ele?.userId?.fullName}
                                      </Index.Typography>
                                    </Index.Box>
                                  </Index.Box>
                                  <Index.Box className="winner-grid-one">
                                    <Index.Box className="winner-user-name-prices">
                                      <Index.Typography
                                        component="p"
                                        variant="p"
                                        className="winner-user-title-name-prices"
                                      >
                                        {ele?.rewardAmount}
                                      </Index.Typography>
                                    </Index.Box>
                                  </Index.Box>
                                </Index.ListItem>
                              );
                            })}
                          </Index.List>
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>
                  </Index.Grid>
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
            className="modal-comman-details"
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
                  <Index.Box className="community-text-center number-list-details">
                    <Index.Typography
                      className="number-bet-coin are-you-sure-text"
                      component="p"
                      variant="p"
                    >
                      {`Are you sure you want to Distribution Amount ${distributionAmount}`}
                    </Index.Typography>
                  </Index.Box>
                  <Index.Box className="deleteModel-btna1">
                    <Index.Box className="btn-col">
                      <PagesIndex.BlueOutlineButton
                        variant="contained"
                        color="error"
                        btnLabel="OK"
                        className="outline-blue-btn-content"
                        onClick={() => updateWinnerDeclare()}
                      />
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Modal>
        </>
      )}
    </>
  );
}
