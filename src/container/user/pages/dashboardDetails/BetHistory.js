import React, { useEffect, useState } from "react";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { styled, alpha } from "@mui/material/styles";
import "../../../../assets/style/global.css";
import { DatePicker } from "antd";
import Index from "../../../Index";
import { useSelector } from "react-redux";
import { Moment } from "moment";
import Loader from "../../../../component/comman/loader/Loader";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import PageIndex from "../../../pageIndex";

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
const filterMaintenanceList = [
  { id: 1, name: "All", value: "all" },
  { id: 4, name: "Pending", value: "pending" },
  { id: 2, name: "Win", value: "successfully" },
  { id: 3, name: "Loss", value: "fail" },
];

const BetHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loading = useSelector((state) => state?.UserReducer?.loading);
  const [searchedData, setSearchedData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [betHistory, setBetHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [filterByPriority, setFilterByPriority] = useState("");
  const [date, setDate] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [filterByGame, setFilterByGame] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const getGameList = async () => {
    await DataService.get(Api.User.USER_GAMES)
      .then((res) => {
        console.log("75: ", res?.data?.data);
        setGameList(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserBetHistory = async () => {
    await DataService.get(Api.User.BET_HISTORY)
      .then((res) => {
        // setLoading(false);
        setBetHistory(res?.data?.data);
        // setFilterData(res?.data?.data);
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setFilterData(betHistory);
  }, [betHistory]);

  useEffect(() => {
    getGameList();
    getUserBetHistory();
  }, []);

  useEffect(() => {
    let filtered;
    let filterDate = [];
    if (filterByPriority && filterByPriority !== "all") {
      filtered = betHistory?.filter(
        (ele) => ele?.status?.toLowerCase() === filterByPriority
      );
    } else {
      filtered = betHistory;
    }
    if (filterByGame && filterByGame !== "all") {
      filtered = filtered?.filter((ele) => ele?.gameId._id === filterByGame);
    }
    if (date) {
      filterDate = filtered.filter(
        (item) => Index.moment(item?.createdAt).format("DD/MM/YYYY") === date
      );
      setFilterData(filterDate);
    } else {
      setFilterData(filtered);
    }
  }, [betHistory, filterByPriority, filterByGame, date]);

  useEffect(() => {
    if (!search) {
      setSearchedData(filterData);
    } else {
      const filtered = filterData?.filter((item) => {
        return (
          item?.betAmount
            ?.toString()
            ?.toLowerCase()
            .includes(search?.toLowerCase()) ||
          item?.period
            ?.toString()
            ?.toLowerCase()
            .includes(search?.toLowerCase()) ||
          item?.gameId?.gameName
            ?.toString()
            ?.toLowerCase()
            .includes(search?.toLowerCase())
        );
      });

      if (filtered?.length > 0) {
        setSearchedData(filtered);
      } else {
        setSearchedData([]);
      }
    }
  }, [filterData, search]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Index.Box className="page-content-box">
          <Index.Box className="title-header">
            <Index.Box className="title-header-flex res-title-header-flex flex-w-100-transaction">
              <Index.Box className="title-main">
                <Index.Typography
                  variant="p"
                  component="p"
                  className="page-title"
                >
                  Bet History
                </Index.Typography>
              </Index.Box>

              <Index.Box className="d-flex align-items-center res-set-search gap-blue-btn-user">
                {/* <Index.Box className="transation-date-picker admin-datepicker-main mr-datepicker cus-date-color-main">
                  <DatePicker
                    clearable={true}
                    inputReadOnly={true}
                    className="admin-datepicker-inner cus-date-color"
                    format="DD/MM/YYYY"
                    onChange={(value) => {
                      let NewDate = "";
                      if (value) {
                        NewDate = Index.moment(value?.$d).format("DD/MM/YYYY");
                      }
                      handleSearch(NewDate);
                    }}
                    disabledDate={(current) => {
                      let customDate = Index.moment().format("YYYY-MM-DD");
                      return (
                        current >=
                        Index.moment(customDate, "YYYY-MM-DD").add(1, "day")
                      );
                    }}
                  />
                </Index.Box> */}
                <Index.Box className="add-game-dropdown game-select">
                  <Index.Box className=" signin-drop-details">
                    <Index.FormControl className="formcontrol_login sign-in-inner-form">
                      <Index.Select
                        className="currency-select-drop"
                        displayEmpty
                        value={filterByGame}
                        label="Game"
                        onChange={(event, newValue) => {
                          setTimeout(() => {
                            setFilterByGame(event.target.value);
                          }, 1000);
                        }}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <Index.MenuItem
                          value=""
                          className="currency-select-menu select-menu-hide"
                          sx={{ display: "none" }}
                          // disabled
                        >
                          Select Game
                        </Index.MenuItem>
                        <Index.MenuItem
                          key={"all-games"}
                          value={"all"}
                          className="currency-select-menu"
                        >
                          All
                        </Index.MenuItem>
                        {gameList.map((val) => (
                          <Index.MenuItem
                            key={val._id}
                            value={val._id}
                            className="currency-select-menu"
                          >
                            {val.gameName}
                          </Index.MenuItem>
                        ))}
                      </Index.Select>
                    </Index.FormControl>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="add-game-dropdown status-select">
                  <Index.Box className=" signin-drop-details">
                    <Index.FormControl className="formcontrol_login sign-in-inner-form">
                      <Index.Select
                        className="currency-select-drop"
                        displayEmpty
                        value={filterByPriority}
                        label="Status"
                        onChange={(event, newValue) => {
                          setTimeout(() => {
                            setFilterByPriority(
                              event.target.value?.toLowerCase()
                            );
                          }, 1000);
                          // setSearch("");
                        }}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <Index.MenuItem
                          value=""
                          className="currency-select-menu select-menu-hide"
                          sx={{ display: "none" }}
                          // disabled
                        >
                          Select Status
                        </Index.MenuItem>
                        {filterMaintenanceList.map((val) => (
                          <Index.MenuItem
                            key={val.id}
                            value={val.value?.toLowerCase()}
                            className="currency-select-menu"
                          >
                            {val.name}
                          </Index.MenuItem>
                        ))}
                      </Index.Select>
                    </Index.FormControl>
                  </Index.Box>
                </Index.Box>
                <Search className="search admin-search-comman cus-penalty-search-main">
                  <StyledInputBase
                    placeholder="Search"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => setSearch(e.target.value)}
                    className="cus-penalty-search"
                  />
                </Search>
              </Index.Box>
            </Index.Box>
          </Index.Box>

          <Index.Box className="transaction-table-user-history">
            <Index.TableContainer
              component={Index.Paper}
              className="table-container transaction-container-user"
            >
              <Index.Table
                aria-label="simple table"
                className="table-design-main barge-table transaction-table-user dashboard-bet-table"
              >
                <Index.TableHead className="transaction-table-thead-user">
                  <Index.TableRow className="transaction-user-tr">
                    <Index.TableCell className="transaction-user-th">
                      Date and Time
                    </Index.TableCell>
                    <Index.TableCell className="transaction-user-th">
                      Period
                    </Index.TableCell>
                    <Index.TableCell
                      className="transaction-user-th"
                      align="left"
                    >
                      Game
                    </Index.TableCell>
                    <Index.TableCell
                      className="transaction-user-th"
                      align="left"
                    >
                      Selected Slot
                    </Index.TableCell>
                    <Index.TableCell
                      className="transaction-user-th"
                      align="left"
                    >
                      Bet Amount
                    </Index.TableCell>
                    {/* <Index.TableCell
                      className="transaction-user-th"
                      align="left"
                    >
                      Winning Amount
                    </Index.TableCell>
                    <Index.TableCell
                      className="transaction-user-th"
                      align="left"
                    >
                      Loose Amount
                    </Index.TableCell> */}
                    <Index.TableCell
                      className="transaction-user-th"
                      align="left"
                    >
                      Status
                    </Index.TableCell>
                  </Index.TableRow>
                </Index.TableHead>
                {searchedData?.length ? (
                  searchedData
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((ele) => {
                      return (
                        <Index.TableBody className="transaction-user-tbody">
                          <Index.TableRow className="transaction-user-tr">
                            <Index.TableCell
                              align="left"
                              className="transaction-user-td"
                            >
                              {ele?.createdAt
                                ? Index.moment(ele?.createdAt).format(
                                    "DD/MM/YYYY hh:mm A"
                                  )
                                : "-"}
                            </Index.TableCell>
                            {/* <Index.TableCell
                            align="left"
                            className="transaction-user-td"
                          >
                            {ele?.networkChainId}
                          </Index.TableCell> */}
                            <Index.TableCell
                              align="left"
                              className="transaction-user-td"
                            >
                              {ele?.period}
                            </Index.TableCell>
                            <Index.TableCell
                              align="left"
                              className="transaction-user-td"
                            >
                              {ele?.gameId?.gameName}
                            </Index.TableCell>
                            <Index.TableCell
                              align="left"
                              className="transaction-user-td"
                            >
                              {ele?.selectedTime} seconds
                            </Index.TableCell>
                            <Index.TableCell
                              align="left"
                              className="transaction-user-td"
                            >
                              {ele?.betAmount}
                            </Index.TableCell>
                            {/* <Index.TableCell
                            align="left"
                            className="transaction-user-td"
                          >
                            {ele?.rewardAmount}
                          </Index.TableCell>
                          <Index.TableCell
                            align="left"
                            className="transaction-user-td"
                          >
                            {ele?.lossAmount}
                          </Index.TableCell> */}
                            <Index.TableCell
                              align="left"
                              className="transaction-user-td"
                            >
                              {ele?.status === "pending"
                                ? "Pending"
                                : ele?.isWin
                                ? "Win"
                                : "Loss"}
                            </Index.TableCell>
                          </Index.TableRow>
                        </Index.TableBody>
                      );
                    })
                ) : (
                  <Index.NoDataFound colSpan={6} />
                )}
              </Index.Table>
              {searchedData?.length ? (
                <Index.TablePagination
                  className="paginationColor"
                  component="div"
                  page={page}
                  count={searchedData?.length}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[10, 25, 50]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              ) : (
                ""
              )}
            </Index.TableContainer>
          </Index.Box>
          <Index.Box className="pagination-design flex-end">
            <Index.Stack spacing={2}></Index.Stack>
          </Index.Box>
        </Index.Box>
      )}
    </>
  );
};

export default BetHistory;
