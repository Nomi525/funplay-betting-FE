import React, { useEffect, useState } from "react";
import Index from "../../Index";
import PageIndex from "../../PageIndex";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DataService from "../../../config/DataService";
import { Api } from "../../../config/Api";
import { toast } from "react-toastify";
import FileExcel from "../dashbord/FileExcel";
import { styled, alpha } from "@mui/material";
import "../../../assets/style/global.css";
import Loader from "../../comman/loader/Loader";

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

export default function NumberBettingEdit() {
  const navigate = useNavigate();
  const { state } = useLocation();
  let id = state?.gameId;
  let type = state?.gameType;
  let periodId = state?.periodId;
  let totalUsers = state?.totalUsers;
  const decodedTitle = decodeURIComponent(state?.gameName);
  const titleWithoutSpaces = decodedTitle.replace(/\s/g, ""); // Removes all spaces
  const [numberBet, setNumberBet] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [totalBetCoins, setTotalBetCoins] = useState(0);
  const [totalBetUser, setTotalBetUser] = useState(0);
  const [excel, setExcel] = useState([]);
  const fileName = "myfile";
  const [winnerNumber, setWinnerNumber] = useState("");
  const [numId, setNumId] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [error, setError] = useState("");
  // const [openEdit, setOpen] = React.useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [winnerModel, setWinnerModel] = useState(false);
  const [betDetails, setBetDetails] = useState([]);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const handleCloseModel = () => {
    setOpenModel(false);
    setWinnerNumber("");
  };
  const handleOpenModel = () => setOpenModel(true);
  const handleOpenWinnerModel = () => setWinnerModel(true);

  // Download CSV file
 
  useEffect(() => {
    const customHeadings = numberBet?.map((item) => ({
      Numbers: item?.number,
      "Total Bet Coins": item?.totalBetAmount,
      "No. of users	": item?.totalUsers,
    }));
    setExcel(customHeadings);
  }, [numberBet]);

  // search bar
  const handleSearch = (searched) => {
    if (!searched) return setSearchedData(numberBet);
    setSearchedData(
      numberBet?.filter(
        (item) =>
          item?.number
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.totalBetAmount
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.totalUsers
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase())
      )
    );
  };

  // Winner Model
  const WinnerDeclareNumber = (periodId) => {
    // if (winnerNumber < 1 || winnerNumber > 100) {
    //   setError(`Allow only 0 to 100 numbers.`);
    // } else
    if (winnerNumber === "") {
      setError(`Please enter winning number`);
    } else if (
      numberBet.length == 1 ||
      numberBet.some((row) => row.number == winnerNumber)
    ) {
      setError();
      const data = {
        gameId: id,
        winNumber: winnerNumber,
        winnerId: periodId,
      };

      // return false;
      DataService.post(Api.ADMIN_DECLARE_WINNER_NUMBER_BETTING, data)
        .then((res) => {
          // setGamelist(res?.data?.data);
          // toast.success(res.data.message)
          handleOpenWinnerModel();
          setWinnerMessage(
            `Win number ${winnerNumber} is added successfully! `
          );
          handleCloseModel();
          getAllNumberList();
        })
        .catch((e) => {
          // toast.error(
          //   e.response.data.message ? e.response.data.message : e.message
          // );
        });
    }
    // else if(winnerNumber){

    // }
    else {
      // toast.error(`No record found for this ${winnerNumber} number`);
      setError(`Please enter proper winning number`);
    }
  };

  // All game list
  const getAllNumberList = async () => {
    setLoading(true);
    // DataService.get(
    //   Api.ADMIN_GET_USERS_WINNERS_COMMUNITY_BETTING + "/" + titleWithoutSpaces
    // )
    await DataService.get(`${Api.ADMIN_GAME_PERIODS}/${type}/${id}`)
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
        setSelectedData(
          res.data.data.filter((row) => row.period == periodId)[0].periodId
        );

        const filteredData = res.data.data.filter(
          (row) => row.period == periodId
        )[0].numberBettingsData;

        let sortedData = filteredData.sort((a, b) => {
          if (sortingOrder === "asc") {
            return a.totalBetAmount - b.totalBetAmount;
          } else {
            return b.totalBetAmount - a.totalBetAmount;
          }
        });

        // Update state with sorted data
        setNumberBet(sortedData);
        setSearchedData(sortedData);
        // setNumberBet(
        //   res.data.data.filter((row) => row.period == periodId)[0]
        //     .numberBettingsData
        // );
        // setSearchedData(
        //   res.data.data.filter((row) => row.period == periodId)[0]
        //     .numberBettingsData
        // );

        setBetDetails(
          res?.data?.data?.filter((row) => row.period == periodId)?.[0]
            ?.leastBetNumbers?.[0]
        );

        let totalBetCoins = res.data.data
          .find((row) => row.period == periodId)
          ?.numberBettingsData?.reduce(
            (acumulator, b) => acumulator + b.totalBetAmount,
            0
          );
        let totalUsers = res.data.data
          .find((row) => row.period == periodId)
          ?.numberBettingsData?.reduce(
            (acumulator, b) => acumulator + b.totalUsers,
            0
          );
        setTotalBetCoins(totalBetCoins);
        setTotalBetUser(res.data.data[0].totalUsers);
      })
      .catch((e) => {
        // toast.error(e.res?.data?.message ? e.res?.data?.message : e.message);
        setLoading(false);
      });
  };

  // Select the game Name
  const handleNumberNameChange = (nameNumber) => {
    setWinnerNumber(nameNumber);
    // setSelectedData([]);
    numberBet.getAllUsers?.map((ele) => {
      if (nameNumber == ele?.number) {
        setSelectedData((prev) => {
          // return [...prev,ele?.userId?._id]
          return [...prev, ele?._id];
        });
      }
    });
  };

  const statusUpdate = () => {
    let newData = [...numberBet];
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
    getAllNumberList();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Index.Box className="page-content-box">
          <Index.Box className="barge-common-box">
            <Index.Box className="title-header">
              <Index.Box className="flex-just-edit-list ">
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
                      Number Betting
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="export-details-content-num">
                  {/* <Index.Button
                                    variant="contained"
                                    type="primary"
                                    className="fil_Button"
                                >
                                    <img src={PageIndex.Svg.downloadcsv} className="svg-download-csv" />
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
                <Index.Grid item xs={12} sm={12} md={12} lg={8}>
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
                          Least Bet Number :
                        </Index.Typography>
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="flex-bet-value"
                        >
                          {betDetails?.number ? betDetails?.number : "-"}
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
                <Index.Grid item xs={12} sm={12} md={10} lg={8}>
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
                            btnLabel="Winning number"
                            className="blue-btn-content"
                            onClick={() => {
                              // setDeleteId(item?._id);
                              handleOpenModel();
                              setError();
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
                        Total Bet Coins Per Number
                      </Index.Typography>
                      <Index.Box className="input-details-winner-value  winner-filter-btn-box">
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
                                Numbers
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
                                      {item?.number}
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
                    setError("");
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
                      Please Enter the winning number Below
                    </Index.Typography>
                  </Index.Box>
                  <Index.TextField
                    variant="filled"
                    className="admin-input-design input-placeholder"
                    type="number"
                    name="winNumber"
                    autoComplete="off"
                    onWheel={(event) => event.target.blur()}
                    value={winnerNumber}
                    // onChange={(e) => setWinnerNumber(e.target.value)}
                    // onChange={(e) => {
                    //   let num = e.target.value;
                    //   console.log(num,"fatma565")
                    //   if ((num === '' || (num > 0 && num <= 100 ))){
                    //     handleNumberNameChange(e.target.value);
                    //   }
                    // }}
                    onChange={(e) => {
                      let num = e.target.value;
                      var regExp = new RegExp("^\\d+$");

                      if (
                        (num === "" || regExp.test(num)) &&
                        (num === "" || (num > 0 && num <= 100))
                      ) {
                        handleNumberNameChange(num);
                        setError("");
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Index.Box>
                <Index.Typography
                  component="p"
                  className="number_betting_error"
                >
                  {error}
                </Index.Typography>

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
                    // type="submit"
                    className="blue-btn-content"
                    onClick={() => WinnerDeclareNumber(periodId)}
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
              {/* <Index.Box className="modal-cancel-btn">
              <Index.Button
                className="btn btn-cancel"
                onClick={handleCloseWinnerModel}
              >
                <img
                  src={PageIndex.Svg.cancelmodal}
                  className="cancel-modal"
                  alt="modal-cancel"
                />
              </Index.Button>
            </Index.Box> */}
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
