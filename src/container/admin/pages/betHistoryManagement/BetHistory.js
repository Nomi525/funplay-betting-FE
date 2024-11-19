import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { styled, alpha } from "@mui/material/styles";
import "../../../../assets/style/global.css";
import PageIndex from "../../../pageIndex";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../component/comman/loader/Loader";
import Autocomplete from "@mui/material/Autocomplete";
import { Api } from "../../../../config/Api";
// import DeleteRoleModel from "./DeleteRoleModel";
import DataService from "../../../../config/DataService";
import { useSelector } from "react-redux";

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

const filterGameList = [
  { id: 1, name: "All", value: "all" },
  // { id: 2, name: "2 Color Betting", value: "2 Color Betting" },
  // { id: 3, name: "Color Prediction", value: "Color Prediction" },
  { id: 3, name: "Color Prediction", value: "Color Prediction" },
  // { id: 4, name: "Card Betting", value: "Card Betting" },
  // { id: 5, name: "Number Betting", value: "Number Betting" },
  // { id: 6, name: "Community Betting", value: "Community Betting" },
];
const BetHistory = () => {
  const navigate = useNavigate();
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);
  const [loading, setLoading] = useState(true);
  const [betList, setBetList] = useState([]);
  const [query, setQuery] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterByPriority, setFilterByPriority] = useState("");
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  console.log(searchedData, 75);
  console.log(filterData, 76);
  console.log(filterByPriority, 77);
  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getBetHistory = async () => {
    await DataService.get(Api.ADMIN_BET_HISTORY_LIST)
      .then((res) => {
        setLoading(false);
        setBetList(res?.data?.data);
        // setFilterData(res?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getBetHistory();
  }, []);

  // Initial data filter by game
  useEffect(() => {
    let filtered;
    if (filterByPriority && filterByPriority !== "all") {
      filtered = betList?.filter(
        (ele) => ele?.gameId?.gameName?.toLowerCase() === filterByPriority
      );
    } else {
      filtered = betList;
    }
    if (filtered?.length > 0) {
      setFilterData(filtered);
    } else {
      setFilterData([]);
    }
  }, [betList, filterByPriority]);

  // Search on table new

  useEffect(() => {
    const filtered = filterData?.filter((item) => {
      return !search
        ? item
        : item?.gameId?.gameName
            ?.toString()
            ?.toLowerCase()
            ?.includes(search?.toLowerCase()) ||
            item?.period
              ?.toString()
              ?.toLowerCase()
              ?.includes(search?.toLowerCase()) ||
            item?.userId?.fullName
              ?.toString()
              ?.toLowerCase()
              ?.includes(search?.toLowerCase());
    });

    if (filtered?.length > 0) {
      setSearchedData(filtered);
    } else {
      setSearchedData([]);
    }
  }, [filterData, search]);
  if (
    permission?.isAdmin == true ||
    (permission?.role?.BettingRecords?.View == true &&
      permission?.isAdmin == false)
  ) {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Index.Box className="page-content-box">
              <Index.Box className="barge-common-box">
                <Index.Box className="title-header">
                  <Index.Box className="title-header-flex res-title-header-flex">
                    <Index.Box className="title-main">
                      <Index.Typography
                        variant="p"
                        component="p"
                        className="page-title"
                      >
                        Betting Records
                      </Index.Typography>
                    </Index.Box>

                    <Index.Box className="d-flex align-items-center res-set-search deposit-req-main">
                      <Search className="search deposit-list-search-status deposit-req-filter deposit-filter-icon-main">
                        <Index.Box className="input-design-div deposit-req-with-border deposit-filter-icon">
                          <Autocomplete
                            disablePortal
                            className="invoice-select-drop"
                            id="combo-box-demo"
                            options={filterGameList}
                            getOptionLabel={(option) => option?.name}
                            renderOption={(props, option) => (
                              <Index.Box
                                component="li"
                                sx={{
                                  "& > img": { mr: 2, flexShrink: 0 },
                                  // backgroundColor: "#171b37",
                                }}
                                {...props}
                              >
                                {option?.name}
                              </Index.Box>
                            )}
                            defaultValue={filterGameList?.find(
                              (ele) => ele?.value == "all"
                            )}
                            onChange={(event, newValue) => {
                              setTimeout(() => {
                                setFilterByPriority(
                                  newValue?.name?.toLowerCase()
                                );
                              }, 1000);
                              setSearch("");
                            }}
                            renderInput={(params) => (
                              <Index.TextField
                                {...params}
                                placeholder="Select"
                                variant="outlined"
                              />
                            )}
                          />
                        </Index.Box>
                      </Search>
                      <Search className="search admin-search-comman cus-penalty-search-main">
                        <StyledInputBase
                          placeholder="Search"
                          inputProps={{ "aria-label": "search" }}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="cus-penalty-search"
                        />
                      </Search>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Grid container spacing={3} mb={2}></Index.Grid>

                <Index.Box className="">
                  <Index.TableContainer
                    component={Index.Paper}
                    className="table-container role-management-conatiner "
                  >
                    <Index.Table
                      aria-label="simple table"
                      className="table-design-main barge-table table-user-management"
                    >
                      <Index.TableHead>
                        <Index.TableRow>
                          <Index.TableCell align="left">Sr no</Index.TableCell>
                          <Index.TableCell align="left">
                            Period Id
                          </Index.TableCell>
                          <Index.TableCell align="left">
                            User Name
                          </Index.TableCell>
                          <Index.TableCell align="left">Game</Index.TableCell>
                          <Index.TableCell align="left">
                            Bet amount
                          </Index.TableCell>
                          <Index.TableCell align="left">
                            Win/Loss
                          </Index.TableCell>
                          <Index.TableCell align="left">Date</Index.TableCell>
                        </Index.TableRow>
                      </Index.TableHead>
                      <Index.TableBody>
                        {searchedData?.length ? (
                          <>
                            {" "}
                            {searchedData
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              ?.map((data, index) => (
                                <Index.TableRow key={index}>
                                  <Index.TableCell>{index + 1}</Index.TableCell>
                                  <Index.TableCell>
                                    {data?.period ? data?.period : "-"}
                                  </Index.TableCell>
                                  <Index.TableCell>
                                    {data?.userId?.fullName
                                      ? data?.userId?.fullName
                                      : "-"}
                                  </Index.TableCell>
                                  <Index.TableCell>
                                    {data?.gameId?.gameName
                                      ? data?.gameId?.gameName
                                      : "-"}
                                  </Index.TableCell>
                                  <Index.TableCell>
                                    {data?.betAmount ? data?.betAmount : "-"}
                                  </Index.TableCell>
                                  <Index.TableCell>
                                    {data?.isWin == false ? "Loss" : "Win"}
                                  </Index.TableCell>
                                  <Index.TableCell>
                                    {data?.createdAt
                                      ? Index.moment(data?.createdAt).format(
                                          "DD/MM/YYYY HH:mm"
                                        )
                                      : "-"}
                                  </Index.TableCell>
                                </Index.TableRow>
                              ))}
                          </>
                        ) : (
                          <>
                            <Index.NoDataFound colSpan={7} />
                          </>
                        )}
                      </Index.TableBody>
                    </Index.Table>
                  </Index.TableContainer>
                  {searchedData?.length ? (
                    <Index.TablePagination
                      className="paginationColor"
                      component="div"
                      page={page}
                      count={searchedData?.length}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelDisplayedRows={(page) =>
                        `Records ${page.from} to ${
                          page.to === -1 ? page.count : page.to
                        } of ${page.count}`
                      }
                    />
                  ) : (
                    ""
                  )}
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </>
        )}
      </>
    );
  } else {
    navigate("/admin");
  }
};

export default BetHistory;
