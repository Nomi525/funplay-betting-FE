import React, { useEffect, useState } from "react";
import Index from "../../../container/Index";
import { styled, alpha } from "@mui/material/styles";
import PageIndex from "../../PageIndex";
import { useLocation, useNavigate } from "react-router-dom";
import { Api } from "../../../config/Api";
import DataService from "../../../config/DataService";
import Loader from "../../comman/loader/Loader";
// Search Bar CSS
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
// Search Bar CSS
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

export default function PeriodsTable() {
  const [timeList, setTimeList] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  let id = state?.gameId;
  let type = state?.gameType;

  // Handle Edit Button
  const handleCommunityBetting = (periodId, totalUser, time) => {
    if (type == "numberBetting") {
      navigate(`/admin/Number-betting-edit`, {
        state: {
          gameId: id,
          gameType: type,
          periodId: periodId,
          totalUser: totalUser,
        },
      });
    } else if (type == "Color Prediction") {
      navigate(`/admin/three-color-betting-edit`, {
        state: {
          gameId: id,
          gameType: type,
          periodId: periodId,
          periodFor: time,
        },
      });
    } else if (type == "2colorBetting") {
      navigate(`/admin/two-color-betting-edit`, {
        state: {
          gameId: id,
          gameType: type,
          periodId: periodId,
          periodFor: time,
        },
      });
    } else if (type == "communityBetting") {
      navigate(`/admin/community-betting-swap`, {
        state: { gameId: id, gameType: type, periodId: periodId },
      });
    } else if (type == "cardBetting") {
      navigate(`/admin/card-betting-edit`, {
        state: {
          gameId: id,
          gameType: type,
          periodId: periodId,
          periodFor: time,
        },
      });
    } else if (type == "penaltyBetting") {
      navigate(`/admin/penalty-betting-edit`, {
        state: {
          gameId: id,
          gameType: type,
          periodId: periodId,
          periodFor: time,
        },
      });
    }
  };

  // search bar
  const handleSearch = (searched) => {
    if (!searched) return setSearchedData(timeList);
    setSearchedData(
      timeList.filter((item) =>
        item?.period?.toString().toLowerCase().includes(searched.toLowerCase())
      )
    );
  };

  // Get All Game List
  const getAllGamesList = () => {
    setLoading(true);
    DataService.get(`${Api.ADMIN_GAME_PERIODS}/${type}/${id}`)
      .then((res) => {
        setLoading(false);
        setTimeList(res?.data?.data);
        setSearchedData(res?.data?.data);
      })
      .catch((e) => {
        // toast.error(
        //   e.response.data.message ? e.response.data.message : e.message
        // );
      });
  };

  const getAllGamesTimeList = () => {
    setLoading(true);
    DataService.get(`${Api.ADMIN_PERIODS_SELECTED_TIME_LIST}/${type}/${id}`)
      .then((res) => {
        setLoading(false);
        setTimeList(res?.data?.data);
        setSearchedData(res?.data?.data);
      })
      .catch((e) => {
        // toast.error(
        //   e.response.data.message ? e.response.data.message : e.message
        // );
      });
  };

  useEffect(() => {
    if (
      type == "2colorBetting" ||
      type == "Color Prediction" ||
      type == "cardBetting" ||
      type == "penaltyBetting"
    ) {
      getAllGamesTimeList();
    } else {
      getAllGamesList();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Index.Box className="periods-tables-details">
          <Index.Box className="title-header">
            <Index.Box className="title-header-flex res-title-header-flex  ipad-flex-small-content">
              <Index.Box className="d-flex align-items-center res-set-search mt-0px-res">
                <Search className="search admin-search-comman">
                  <StyledInputBase
                    placeholder="Search"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Search>
              </Index.Box>

              <Index.Box className="common-button blue-button res-blue-button w-100-add-btn ">
                <Index.Button
                  variant="contained"
                  onClick={() => navigate("/admin/winner-declartion")}
                >
                  <img src={PageIndex.Png.back} className="back-btn-spacing" />
                  Back
                </Index.Button>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          {/* <Index.Box className="title-header">
            <Index.Box className="flex-just-edit-list">
              <Index.Box className="title-header-flex ipad-flex-small-content flex-direction-mobile">
                <Index.Box className="table-search-winner periodstable-listing">
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
                </Index.Box>
                <Index.Box className="common-button blue-button flex-start save-btn ">
                  <Index.Button
                    variant="contained"
                    onClick={() => navigate("/admin/winner-declartion")}
                  >
                    <img
                      src={PageIndex.Png.back}
                      className="back-btn-spacing"
                    />
                    Back
                  </Index.Button>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box> */}
          <Index.Box className="table-winner-details periods-table-details">
            <Index.TableContainer
              component={Index.Paper}
              className="table-container number-manage-container transaction-table-container"
            >
              <Index.Table
                aria-label="simple table"
                className="table-design-main barge-table number-bet-table transaction-table-main"
              >
                <Index.TableHead className="number-bet-thead">
                  <Index.TableRow className="number-bet-tr">
                    <Index.TableCell className="number-bet-th">
                      Sr no
                    </Index.TableCell>
                    <Index.TableCell className="number-bet-th" align="left">
                      Periods Id
                    </Index.TableCell>
                    {type == "2colorBetting" ||
                    type == "Color Prediction" ||
                    type == "cardBetting" ||
                    type == "penaltyBetting" ? (
                      <Index.TableCell className="number-bet-th" align="left">
                        Time Slot (sec)
                      </Index.TableCell>
                    ) : null}

                    <Index.TableCell className="number-bet-th" align="left">
                      Action
                    </Index.TableCell>
                  </Index.TableRow>
                </Index.TableHead>
                <Index.TableBody className="number-bet-tbody">
                  {searchedData && searchedData?.length > 0 ? (
                    searchedData?.map((item, index) => {
                      return (
                        <Index.TableRow className="number-bet-tr">
                          <Index.TableCell className="number-bet-td">
                            <Index.Box className="sr-no-details">
                              {index + 1}
                            </Index.Box>
                          </Index.TableCell>
                          <Index.TableCell className="number-bet-td">
                            <Index.Box className="game-name-details">
                              {item?.period}
                            </Index.Box>
                          </Index.TableCell>
                          {type == "2colorBetting" ||
                          type == "Color Prediction" ||
                          type == "cardBetting" ||
                          type == "penaltyBetting" ? (
                            <Index.TableCell className="number-bet-td">
                              <Index.Box className="game-name-details">
                                {item?.selectedTime}
                              </Index.Box>
                            </Index.TableCell>
                          ) : null}

                          <Index.TableCell className="number-bet-td">
                            <Index.Box
                              className="action-details"
                              sx={{ display: "flex" }}
                            >
                              <Index.IconButton>
                                <Index.Button
                                  className="table-view-btn"
                                  onClick={() =>
                                    handleCommunityBetting(
                                      item?.period,
                                      item?._id,
                                      item?.selectedTime
                                    )
                                  }
                                >
                                  <img
                                    src={PageIndex.Svg.pencil}
                                    className="view-icon-btn"
                                  />
                                </Index.Button>
                              </Index.IconButton>
                            </Index.Box>
                          </Index.TableCell>
                        </Index.TableRow>
                      );
                    })
                  ) : (
                    <Index.NoDataFound colSpan={6} />
                  )}
                </Index.TableBody>
              </Index.Table>
            </Index.TableContainer>
          </Index.Box>
        </Index.Box>
      )}
    </>
  );
}
