import React, { useEffect, useState } from "react";
import PageIndex from "../../PageIndex";
import Index from "../../Index";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DataService from "../../../config/DataService";
import { Api } from "../../../config/Api";
import FileExcel from "../dashbord/FileExcel";
import { styled, alpha } from "@mui/material";
import { toast } from "react-toastify";
import Loader from "../../comman/loader/Loader";

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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(Index.InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PenaltyBettingList() {
  const navigate = useNavigate();
  const { state } = useLocation();
  let id = state?.gameId;
  let type = state?.gameType;
  let periodId = state?.periodId;
  let time = state?.periodFor;
  const decodedTitle = decodeURIComponent(state?.gameName);
  const titleWithoutSpaces = decodedTitle.replace(/\s/g, ""); // Removes all spaces

  const [colorBet, setColorBet] = useState([]);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [searchedData, setSearchedData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [totalBetCoins, setTotalBetCoins] = useState(0);
  const [totalBetUser, setTotalBetUser] = useState(0);
  const [excel, setExcel] = useState([]);
  const [error, setError] = useState("");
  const fileName = "myfile";
  const [winnerPenalty, setWinnerPenalty] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [winnerModel, setWinnerModel] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");
  const [betDetails, setBetDetails] = useState([]);
  const [loading, setLoading] = useState(false);

 

  const handleCloseModel = () => setOpenModel(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseWinnerModel = () => setWinnerModel(false);
  const handleOpenWinnerModel = () => setWinnerModel(true);

  // Download CSV file button
  useEffect(() => {
    const customHeadings = colorBet?.map((item) => ({
      Penalty: item?.betSide,
      "Total Bet Coins": item?.totalBetAmount,
      "No. of users	": item?.totalUser,
    }));

    setExcel(customHeadings);
  }, [colorBet]);

  // search Bar
  const handleSearch = (searched) => {
    if (!searched) return setSearchedData(colorBet);
    setSearchedData(
      colorBet?.filter(
        (item) =>
          item?.betSide
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.totalBetAmount
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.totalUser
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase())
      )
    );
  };
  // All penalty game list
  const getAllPenaltyList = async () => {
    setLoading(true);
    // DataService.get(
    //   Api.ADMIN_GET_USERS_WINNERS_COMMUNITY_BETTING + "/" + titleWithoutSpaces
    // )
    await DataService.get(
      `${Api.ADMIN_GAME_PERIODS}/${type}/${id}?periodFor=${time}`
    )
      .then((res) => {
       
        // setColorBet(res.data.data);
        // setSearchedData(res.data.data.getAllUsers);
        // console.log(res?.data?.data, "data");
        // new
        // setColorArryPeriod(()=>{
        //   return res.data.data
        // })
        setTimeout(() => {
          setLoading(false);
        }, 1500);
        setSelectedData(
          res.data.data.filter((row) => row.period == periodId)[0].periodId
        );

        const filteredData = res.data.data.filter(
          (row) => row.period == periodId
        )[0].penaltybettingsData;

        let sortedData = filteredData.sort((a, b) => {
          if (sortingOrder === "asc") {
            return a.totalBetAmount - b.totalBetAmount;
          } else {
            return b.totalBetAmount - a.totalBetAmount;
          }
        });

        // Update state with sorted data
        setColorBet(sortedData);
        setSearchedData(sortedData);
        // setColorBet(
        //   res.data.data.filter((row) => row.period == periodId)[0]
        //     .penaltybettingsData
        // );
        // setSearchedData(
        //   res.data.data.filter((row) => row.period == periodId)[0]
        //     .penaltybettingsData
        // );

        setBetDetails(
          res?.data?.data?.filter((row) => row.period == periodId)?.[0]
            ?.leastBetData?.[0]
        );

        let totalBetCoins = res.data.data
          .find((row) => row.period == periodId)
          ?.penaltybettingsData?.reduce(
            (acumulator, b) => acumulator + b.totalBetAmount,
            0
          );
        let totalUser = res.data.data
          .find((row) => row.period == periodId)
          ?.colourbettingsData?.reduce(
            (acumulator, b) => acumulator + b.totalUser,
            0
          );

    
        setTotalBetCoins(totalBetCoins);
        setTotalBetUser(res.data.data[0].totalUsers);
        // setLoading(false);
      })
      .catch((e) => {
        // toast.error(e.res?.data?.message ? e.res?.data?.message : e.message);
        setLoading(false);
      });
  };

  // select the game name
  const handlePenaltyNameChange = (nameColor) => {
    setWinnerPenalty(nameColor);
    setSelectedData([]);
    colorBet.getAllUsers?.map((ele) => {
      if (nameColor == ele?.colourName) {
        setSelectedData((prev) => {
          // return [...prev,ele?.userId?._id]
          return [...prev, ele?._id];
        });
      }
    });
  };

  // Winner model
  const WinnerDeclarePenalty = () => {
    if (winnerPenalty === "") {
      setError(`Please select winning penalty`);
    } else if (
      colorBet.length == 1 ||
      colorBet.some((row) => row.betSide == winnerPenalty)
    ) {
      setError();
      const data = {
        gameId: id,
        winBetSide: winnerPenalty,
        winnerId: periodId,
        periodFor: time,
      };
      DataService.post(Api.ADMIN_DECLARE_WINNER_PENALTY_BETTING, data)
        .then((res) => {
          handleOpenWinnerModel();
          setWinnerMessage(
            `Win penalty ${winnerPenalty} is added successfully! `
          );
          handleCloseModel();
          getAllPenaltyList();
        })
        .catch((e) => {
          // toast.error(
          //   e.response.data.message ? e.response.data.message : e.message
          // );
        });
    } else {
      // toast.error(`No record found for this ${winnerColor} color`)
      setError(`Please select proper winning penalty`);
    }
  };

  // const statusUpdate = () => {
  //   console.log("update called", 255);
  //   let sortedData = colorBet?.sort((a, b) => {
  //     if (sortingOrder === "asc") {
  //       return a.totalBetAmount - b.totalBetAmount;
  //     } else {
  //       return b.totalBetAmount - a.totalBetAmount;
  //     }
  //   });
  const statusUpdate = () => {
    
    let newData = [...colorBet];
    let sortedData = newData?.sort((a, b) => {
      if (sortingOrder === "asc") {
        return a.totalBetAmount - b.totalBetAmount;
      } else {
        return b.totalBetAmount - a.totalBetAmount;
      }
    });
    // Update state with sorted data
    setSearchedData(sortedData);
  };

  useEffect(() => {
    statusUpdate();
  }, [sortingOrder]);

  // Function to toggle sorting order
  const toggleSortingOrder = () => {
    setSortingOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  useEffect(() => {
    getAllPenaltyList();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Index.Box className="page-content-box">
          <Index.Box className="barge-common-box">
            <Index.Box className="title-header">
              <Index.Box className="flex-just-edit-list">
                <Index.Box className="title-header-flex w-100-unset">
                  <Index.Box className="title-main back-title mb-10">
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
                          } else if (state?.gameType == "3colorBetting") {
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
                          } else if (state?.gameType == "penaltyBetting") {
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
                    <Index.Typography
                      variant="p"
                      component="p"
                      className="page-title"
                    >
                      Penalty Betting
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="export-details-content-num">
                  {/* <Index.Button
                  variant="contained"
                  type="primary"
                  className="fil_Button"
                >
                  <img
                    src={PageIndex.Svg.downloadcsv}
                    className="svg-download-csv"
                  />
                  Export
                </Index.Button> */}
                  <FileExcel apiData={excel} fileName={fileName} />
                </Index.Box>
              </Index.Box>
            </Index.Box>

            <Index.Box className="number-bet-details">
              <Index.Grid
                container
                spacing={3}
                className="align-center-contenr"
              >
                <Index.Grid item xs={12} sm={12} md={12}>
                  <Index.Box className="number-details-content">
                    <Index.Box className="total-bet-coins-content">
                      <Index.Box className="flex-bet-content">
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
                      <Index.Box className="flex-bet-content">
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
                          {totalBetCoins}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box className="total-bet-coins-content">
                      <Index.Box className="flex-bet-content">
                        <Index.Typography
                          component="h5"
                          variant="h5"
                          className="flex-bet-title"
                        >
                          Total Bet :
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

                    <Index.Box className="total-bet-coins-content">
                      <Index.Box className="flex-bet-content">
                        <Index.Typography
                          component="h5"
                          variant="h5"
                          className="flex-bet-title"
                        >
                          Least Bet Coins:
                        </Index.Typography>
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="flex-bet-value"
                        >
                          {betDetails?.totalBetAmount
                            ? betDetails?.totalBetAmount
                            : "-"}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>

                    <Index.Box className="total-bet-coins-content">
                      <Index.Box className="flex-bet-content">
                        <Index.Typography
                          component="h5"
                          variant="h5"
                          className="flex-bet-title"
                        >
                          Least Bet Side :
                        </Index.Typography>
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="flex-bet-value"
                        >
                          {betDetails?.betSide ? betDetails?.betSide : "-"}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
                <Index.Grid item xs={12} sm={12} md={12} lg={8}>
                  <Index.Box className="declaration-winner-details">
                    <Index.Grid container className="decalar-details-grid">
                      <Index.Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        className="decalar-inner-grid"
                      >
                        <Index.Box className="declaration-winner-title">
                          <Index.Typography
                            className="declaration-title-content"
                            variant="h3"
                            component="h3"
                          >
                            declaration of winners
                          </Index.Typography>
                        </Index.Box>
                      </Index.Grid>
                      <Index.Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        className="decalar-inner-grid"
                      >
                        <Index.Box className="btn-winning-number">
                          <PageIndex.BlueButton
                            btnLabel="Winning Penalty"
                            className="blue-btn-content"
                            // onClick={handleOpenModel}
                            onClick={() => {
                              // setDeleteId(item?._id);
                              handleOpenModel();
                            }}
                          />
                        </Index.Box>
                      </Index.Grid>
                    </Index.Grid>
                  </Index.Box>
                </Index.Grid>
              </Index.Grid>
              <Index.Grid container spacing={3}>
                <Index.Grid item xs={12} sm={12} md={12}>
                  <Index.Box className="total-bet-number">
                    <Index.Box className="total-bet-list-details search-between">
                      <Index.Typography
                        component="p"
                        variant="p"
                        className="total-bet-title"
                      >
                        Total Bet Coins Per Penalty
                      </Index.Typography>
                      <Index.Box className="input-details-winner-value winner-filter-btn-box">
                        <Index.Box className="winner-filter-btn-box-main">
                          <Index.Button
                            variant="contained"
                            disableRipple
                            className="winner-filter-btn"
                            onClick={toggleSortingOrder}
                          >
                            Bet Coin Filter
                          </Index.Button>
                        </Index.Box>
                        <Index.Box className="input-design-div with-border">
                          <Search className="mr-search-details">
                            <StyledInputBase
                              className="admin-input-design input-placeholder"
                              placeholder="Search"
                              inputProps={{ "aria-label": "search" }}
                              onChange={(e) => handleSearch(e.target.value)}
                            />
                          </Search>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>

                    <Index.Box className="bet-prices-details">
                      <Index.TableContainer
                        component={Index.Paper}
                        className="table-container number-manage-container"
                      >
                        <Index.Table
                          aria-label="simple table"
                          className="table-design-main barge-table number-bet-table"
                        >
                          <Index.TableHead className="number-bet-thead">
                            <Index.TableRow className="number-bet-tr">
                              <Index.TableCell className="number-bet-th">
                                Penalty
                              </Index.TableCell>
                              <Index.TableCell
                                className="number-bet-th"
                                align="left"
                              >
                                Total Bet Coins
                              </Index.TableCell>
                              <Index.TableCell
                                className="number-bet-th"
                                align="left"
                              >
                                No. of bets
                              </Index.TableCell>
                            </Index.TableRow>
                          </Index.TableHead>
                          <Index.TableBody className="number-bet-tbody">
                            {searchedData?.map((item) => {
                              return (
                                <Index.TableRow className="number-bet-tr">
                                  <Index.TableCell className="number-bet-td">
                                    <Index.Box className="sr-no-details">
                                      {item?.betSide}
                                    </Index.Box>
                                  </Index.TableCell>
                                  <Index.TableCell className="number-bet-td">
                                    <Index.Box className="game-name-details">
                                      {item?.totalBetAmount}
                                    </Index.Box>
                                  </Index.TableCell>
                                  <Index.TableCell className="number-bet-td">
                                    <Index.Box className="total-coin-details">
                                      {item?.totalUser}
                                    </Index.Box>
                                  </Index.TableCell>
                                  {/* <Index.TableCell className="number-bet-td">
                                  <Index.Box className="total-coin-details">
                                    {item?.createdAt}
                                  </Index.Box>
                                </Index.TableCell> */}
                                </Index.TableRow>
                              );
                            })}
                          </Index.TableBody>
                        </Index.Table>
                      </Index.TableContainer>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
              </Index.Grid>
            </Index.Box>
          </Index.Box>
          <Index.Modal
            open={openModel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-comman-details"
          >
            <Index.Box sx={style} className="modal-comman-inner-style">
              <Index.Box className="modal-cancel-btn">
                <Index.Button
                  className="btn btn-cancel"
                  onClick={() => {
                    handleCloseModel();
                    setError();
                  }}
                >
                  <img
                    src={PageIndex.Svg.cancelmodal}
                    className="cancel-modal"
                    alt="modal-cancel"
                  />
                </Index.Button>
              </Index.Box>
              <Index.Box className="winning-number-below-details">
                <Index.Box className="input-design-div admin-design-div login-input-design-div">
                  <Index.Box className=" bluebox-text1">
                    <Index.Typography component="p" className="">
                      Please select the winning penalty below
                    </Index.Typography>
                  </Index.Box>
                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                    <Index.Box className="add-game-dropdown">
                      <Index.Box className=" signin-drop-details">
                        <Index.FormControl className="formcontrol_login sign-in-inner-form">
                          <Index.Select
                            onChange={(e) => {
                              handlePenaltyNameChange(e.target.value);
                              setError("");
                            }}
                            // value={values.winColour}
                            name="winBetSide"
                            // placeholder="mode"
                            className="currency-select-drop"
                            displayEmpty
                            renderValue={
                              winnerPenalty !== ""
                                ? undefined
                                : () => "Select Penalty"
                            }
                          >
                            <Index.MenuItem
                              value={"left"}
                              className="currency-select-menu"
                              name="left"
                            >
                              Left Penalty
                            </Index.MenuItem>
                            <Index.MenuItem
                              value={"right"}
                              className="currency-select-menu"
                              name="right"
                            >
                              Right Penalty
                            </Index.MenuItem>
                          </Index.Select>
                        </Index.FormControl>
                        <Index.Typography
                          component="p"
                          className="number_betting_error"
                        >
                          {error}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Grid>
                </Index.Box>
                <Index.Box className="flex-end-edit-modal">
                  <PageIndex.BlueOutlineButton
                    btnLabel="Cancel"
                    className="outline-blue-btn-content"
                    onClick={() => {
                      handleCloseModel();
                      setError("");
                    }}
                  />
                  <PageIndex.BlueButton
                    btnLabel="Submit"
                    className="blue-btn-content"
                    onClick={WinnerDeclarePenalty}
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Modal>
          <Index.Modal
            open={winnerModel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-comman-details"
          >
            <Index.Box sx={style} className="modal-comman-inner-style">
              <Index.Box className="winning-number-below-details">
                <Index.Box className="input-design-div admin-design-div login-input-design-div">
                  <Index.Box className=" bluebox-text1">
                    <Index.Typography component="p" className="">
                      {/* winner is successfuly */}
                      {winnerMessage}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="flex-end-edit-modal">
                  <PageIndex.BlueOutlineButton
                    btnLabel="Ok"
                    className="outline-blue-btn-content"
                    // onClick={handleCloseWinnerModel}
                    onClick={() => {
                      if (state.gameType == "numberBetting") {
                        navigate(`/admin/periods-table`, {
                          state: {
                            gameId: state.gameId,
                            gameName: state.gameName,
                            gameType: state.gameType,
                          },
                        });
                      } else if (state.gameType == "3colorBetting") {
                        navigate(`/admin/periods-table`, {
                          state: {
                            gameId: state.gameId,
                            gameName: state.gameName,
                            gameType: state.gameType,
                          },
                        });
                      } else if (state.gameType == "communityBetting") {
                        navigate(`/admin/periods-table`, {
                          state: {
                            gameId: state.gameId,
                            gameName: state.gameName,
                            gameType: state.gameType,
                          },
                        });
                      } else if (state.gameType == "2colorBetting") {
                        navigate(`/admin/periods-table`, {
                          state: {
                            gameId: state.gameId,
                            gameName: state.gameName,
                            gameType: state.gameType,
                          },
                        });
                      } else if (state.gameType == "penaltyBetting") {
                        navigate(`/admin/periods-table`, {
                          state: {
                            gameId: state.gameId,
                            gameName: state.gameName,
                            gameType: state.gameType,
                          },
                        });
                      }
                    }}
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Modal>
        </Index.Box>
      )}
    </>
  );
}
