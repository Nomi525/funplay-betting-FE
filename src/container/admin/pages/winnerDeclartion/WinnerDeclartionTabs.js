import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { styled, alpha } from "@mui/material/styles";
import PageIndex from "../../../pageIndex";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import Loader from "../../../../component/comman/loader/Loader";
import { useSelector } from "react-redux";

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

export default function WinnerDeclartionTabs() {
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);
  const [gamelist, setGamelist] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCommunityBetting = (gameId, gameName, gameType, periodFor) => {
    // console.log(gameId,gameName,gameType,"uves45")
    if (gameType == "numberBetting") {
      navigate(`/admin/periods-table`, {
        state: { gameId: gameId, gameName: gameName, gameType: gameType },
      });
    } else if (gameType == "Color Prediction") {
      navigate(`/admin/periods-table`, {
        state: {
          gameId: gameId,
          gameName: gameName,
          gameType: gameType,
          periodFor: periodFor,
        },
      });
    } else if (gameType == "communityBetting") {
      navigate(`/admin/periods-table`, {
        state: { gameId: gameId, gameName: gameName, gameType: gameType },
      });
    } else if (gameType == "2colorBetting") {
      navigate(`/admin/periods-table`, {
        state: {
          gameId: gameId,
          gameName: gameName,
          gameType: gameType,
          periodFor: periodFor,
        },
      });
    } else if (gameType == "cardBetting") {
      navigate(`/admin/periods-table`, {
        state: {
          gameId: gameId,
          gameName: gameName,
          gameType: gameType,
          periodFor: periodFor,
        },
      });
    } else if (gameType == "penaltyBetting") {
      navigate(`/admin/periods-table`, {
        state: {
          gameId: gameId,
          gameName: gameName,
          gameType: gameType,
          periodFor: periodFor,
        },
      });
    }
  };

  // search

  const handleSearch = (searched) => {
    if (!searched) return setSearchedData(gamelist);
    setSearchedData(
      gamelist.filter(
        (item) =>
          item?.gameName
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.count
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.betAmount
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setSearchedData(gamelist);
  }, [gamelist]);

  const getAllGamesList = async () => {
    setLoading(true);
    await DataService.post(Api.ADMIN_GET_UPDATE_WINNERS_USER)
      .then((res) => {
        setLoading(false);
        setGamelist(res?.data?.data);
      })
      .catch((e) => {
        // toast.error(
        //   e.response.data.message ? e.response.data.message : e.message
        // );
      });
  };
  //   ADMIN_GET_USERS_WINNERS_COMMUNITY_BETTING
  useEffect(() => {
    getAllGamesList();
  }, []);

  console.log("4444", gamelist);

  if (
    permission?.isAdmin == true ||
    (permission?.role?.WinnerDeclaration?.View == true &&
      permission?.isAdmin == false)
  ) {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <Index.Box className="page-content-box">
            {/* <Index.Box className="title-main">
              <Index.Typography
                variant="p"
                component="p"
                className="page-title"
              >
                Winner Declaration
              </Index.Typography>
            </Index.Box> */}
            <Index.Box className="title-header">
              <Index.Box className="title-header-flex res-title-header-flex ipad-flex-small-content">
                <Index.Box className="title-main">
                  <Index.Typography
                    variant="p"
                    component="p"
                    className="page-title"
                  >
                    Winner Declaration
                  </Index.Typography>
                </Index.Box>

                <Index.Box className="d-flex align-items-center res-set-search">
                  <Search className="search admin-search-comman cus-penalty-search-main">
                    <StyledInputBase
                      placeholder="Search"
                      inputProps={{ "aria-label": "search" }}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="cus-penalty-search"
                    />
                  </Search>
                </Index.Box>
              </Index.Box>
            </Index.Box>

            {/* <Index.Box className="table-search-winner">
              <Index.Box className="input-search-details res-set-search">
                <Index.Box className="search admin-search-comman ">
                  <Search className="search admin-search-comman">
                    <StyledInputBase
                      placeholder="Search"
                      inputProps={{ "aria-label": "search" }}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </Search>
                </Index.Box>
              </Index.Box>
            </Index.Box> */}
            <Index.Box className="table-winner-details">
              <Index.TableContainer
                component={Index.Paper}
                className="table-container"
              >
                <Index.Table
                  aria-label="simple table"
                  className="table-design-main barge-table banner-management-table"
                >
                  <Index.TableHead className="number-bet-thead">
                    <Index.TableRow className="number-bet-tr">
                      <Index.TableCell className="number-bet-th">
                        Sr no
                      </Index.TableCell>
                      <Index.TableCell className="number-bet-th" align="left">
                        Game Name
                      </Index.TableCell>
                      <Index.TableCell className="number-bet-th" align="left">
                        Total User
                      </Index.TableCell>
                      <Index.TableCell className="number-bet-th" align="left">
                        Total Bet Amount
                      </Index.TableCell>
                      {/* <Index.TableCell className="number-bet-th" align="left">
                  Date. of Completion
                </Index.TableCell>
                <Index.TableCell className="number-bet-th" align="left">
                  Time of Completion
                </Index.TableCell> */}
                      <Index.TableCell className="number-bet-th" align="left">
                        Action
                      </Index.TableCell>
                    </Index.TableRow>
                  </Index.TableHead>
                  <Index.TableBody className="number-bet-tbody">
                    {searchedData?.map((ele, index) => {
                      return (
                        <Index.TableRow className="number-bet-tr">
                          <Index.TableCell className="number-bet-td">
                            <Index.Box className="sr-no-details">
                              {index + 1}
                            </Index.Box>
                          </Index.TableCell>
                          <Index.TableCell className="number-bet-td">
                            <Index.Box className="game-name-details">
                              {ele?.gameName}
                            </Index.Box>
                          </Index.TableCell>
                          <Index.TableCell className="number-bet-td">
                            <Index.Box className="game-name-details">
                              {ele?.totalUsers}
                            </Index.Box>
                          </Index.TableCell>
                          <Index.TableCell className="number-bet-td">
                            <Index.Box className="game-name-details">
                              {ele?.betAmount}
                            </Index.Box>
                          </Index.TableCell>
                          {/* <Index.TableCell className="number-bet-td">
                      <Index.Box className="date-coin-details">
                        27-09-2023
                      </Index.Box>
                    </Index.TableCell>
                    <Index.TableCell className="number-bet-td">
                      <Index.Box className="time-coin-details">13:30</Index.Box>
                    </Index.TableCell> */}
                          <Index.TableCell className="number-bet-td">
                            <Index.Box
                              className="action-details"
                              sx={{ display: "flex" }}
                            >
                              <Index.IconButton>
                                {permission?.isAdmin == true ||
                                (permission?.role?.WinnerDeclaration?.update ==
                                  true &&
                                  permission?.isAdmin == false) ? (
                                  <>
                                    <Index.Button
                                      className="table-view-btn"
                                      onClick={() =>
                                        handleCommunityBetting(
                                          ele?.gameId,
                                          ele?.gameName,
                                          ele?.gameType,
                                          ele?.periodFor
                                        )
                                      }
                                    >
                                      <img
                                        src={PageIndex.Svg.pencil}
                                        className="view-icon-btn"
                                      />
                                    </Index.Button>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </Index.IconButton>
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
        )}
      </>
    );
  } else {
    navigate("/admin");
  }
}
