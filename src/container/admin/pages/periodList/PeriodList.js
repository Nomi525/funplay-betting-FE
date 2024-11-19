import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { styled, alpha } from "@mui/material/styles";
import PageIndex from "../../../pageIndex";
import { Await, useLocation, useNavigate } from "react-router-dom";
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

export default function PeriodList() {
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);
  const [periodList, setPeriodList] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  let id = state?.gameId;
  let type = state?.gameType;
  console.log(id, "type");

  // Pagination states and methods
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
  };
  // End Pagination

  // search
  const handleSearch = (searched) => {
    if (!searched) return setSearchedData(periodList);
    setSearchedData(
      periodList.filter(
        (item) =>
          item?.gameName
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.period
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.totalUsers
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.totalBetAmount
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.winner
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase())
      )
    );
    setPage(0);
  };

  const getAllPeriodList = async () => {
    setLoading(true);
    await DataService.get(Api.ADMIN_PERIODS_LIST)
      .then((res) => {
        setLoading(false);
        setPeriodList(res?.data?.data);
        setSearchedData(res?.data?.data);
      })
      .catch((e) => {
        // toast.error(
        //   e.response.data.message ? e.response.data.message : e.message
        // );
      });
  };

  useEffect(() => {
    getAllPeriodList();
  }, []);

  if (
    permission?.isAdmin == true ||
    (permission?.role?.Periods?.View == true && permission?.isAdmin == false)
  ) {
    // ADMIN_PERIODS_LIST
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <Index.Box className="page-content-box">
            <Index.Box className="title-main">
              <Index.Typography
                variant="p"
                component="p"
                className="page-title"
              >
                Periods List
              </Index.Typography>
            </Index.Box>
            <Index.Box className="page-content-box">
              <Index.Box className="table-search-winner">
                <Index.Box className="input-search-details res-set-search">
                  <Index.Box className="search admin-search-comman ">
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
              <Index.Box className="table-winner-details">
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
                        <Index.TableCell className="number-bet-th" align="left">
                          Slot Time
                        </Index.TableCell>
                        <Index.TableCell className="number-bet-th" align="left">
                          Game Name
                        </Index.TableCell>
                        <Index.TableCell className="number-bet-th" align="left">
                          Total Users
                        </Index.TableCell>
                        <Index.TableCell className="number-bet-th" align="left">
                          Total betAmount
                        </Index.TableCell>
                        <Index.TableCell className="number-bet-th" align="left">
                          Total bet count
                        </Index.TableCell>
                        <Index.TableCell className="number-bet-th" align="left">
                          Winner
                        </Index.TableCell>
                      </Index.TableRow>
                    </Index.TableHead>
                    <Index.TableBody className="number-bet-tbody">
                      {searchedData?.length ? (
                        searchedData
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => {
                            const displayedIndex =
                              page * rowsPerPage + index + 1;
                            return (
                              <Index.TableRow className="number-bet-tr">
                                <Index.TableCell className="number-bet-td">
                                  <Index.Box className="sr-no-details">
                                    {" "}
                                    {displayedIndex}
                                  </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                  <Index.Box className="game-name-details">
                                    {item?.period}
                                  </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                  <Index.Box className="game-name-details">
                                    {item?.periodFor}
                                  </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                  <Index.Box className="game-name-details">
                                    {item?.gameName}
                                  </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                  <Index.Box className="game-name-details">
                                    {item?.totalUsers}
                                  </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                  <Index.Box className="game-name-details">
                                    {item?.totalBetAmount}
                                  </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                  <Index.Box className="game-name-details">
                                    -
                                  </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                  <Index.Box className="game-name-details">
                                    {/* {item?.winner} */}
                                    {item?.winner ? item?.winner : "-"}
                                  </Index.Box>
                                </Index.TableCell>
                              </Index.TableRow>
                            );
                          })
                      ) : (
                        <Index.NoDataFound colSpan={8} />
                      )}
                    </Index.TableBody>
                  </Index.Table>
                </Index.TableContainer>
              </Index.Box>
              {searchedData?.length ? (
                <Index.TablePagination
                  className="paginationColor"
                  component="div"
                  page={page}
                  count={searchedData?.length}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  // labelDisplayedRows={(page) =>
                  //   `Records ${page.from} to ${
                  //     page.to === -1 ? page.count : page.to
                  //   } of ${page.count}`
                  // }
                />
              ) : (
                ""
              )}
            </Index.Box>
          </Index.Box>
        )}
      </>
    );
  } else {
    navigate("/admin");
  }
}
