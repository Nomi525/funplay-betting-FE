import { alpha, styled } from "@mui/material/styles";
import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../../assets/style/global.css";
import Loader from "../../../../component/comman/loader/Loader";
import Index from "../../../Index";
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

const ThreeColorMyRecord = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state?.singleuserList;
  console.log(data, "3data");
  const loading = useSelector((state) => state?.UserReducer?.loading);
  const storedValue = localStorage.getItem("userGameId");
  const gameId = JSON.parse(storedValue);
  const [searchedData, setSearchedData] = useState([]);
  const [page, setPage] = useState(0);
  const selectedSecond = location?.state?.selectedSecond;
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleSearch = (searched) => {
    let result = data.filter(
      (item) =>
        item?.period
          ?.toString()
          .toLowerCase()
          .includes(searched.toLowerCase()) ||
        item?.colourName
          ?.toString()
          .toLowerCase()
          .includes(searched.toLowerCase()) ||
        item?.price
          ?.toString()
          .toLowerCase()
          .includes(searched.toLowerCase()) ||
        Index.moment(item?.createdAt)
          .format("DD/MM/YYYY")
          ?.toString()
          .toLowerCase()
          .includes(searched.toString().toLowerCase())
    );

    setSearchedData(result);
    setPage(0);
  };

  useEffect(() => {
    setSearchedData(data);
  }, [data]);

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
                  My Records
                </Index.Typography>
              </Index.Box>

              <Index.Box className="d-flex align-items-center res-set-search gap-blue-btn-user">
                <Index.Box className="common-button blue-button flex-start save-btn ">
                  <Index.Button
                    variant="contained"
                    onClick={() =>
                      navigate("/user/three-color-betting", {
                        state: {
                          selectedSecond: selectedSecond,
                          ele: location?.state?.ele,
                        },
                      })
                    }
                  >
                    <img
                      src={PageIndex.Png.back}
                      className="back-btn-spacing"
                    />
                    Back
                  </Index.Button>
                </Index.Box>
                <Index.Box className="transation-date-picker admin-datepicker-main mr-datepicker cus-date-color-main">
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
                </Index.Box>
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

          <Index.Box className="transaction-table-user-history">
            <Index.TableContainer
              component={Index.Paper}
              className="table-container transaction-container-user"
            >
              <Index.Table
                aria-label="simple table"
                className="table-design-main barge-table transaction-table-user"
              >
                <Index.TableHead className="transaction-table-thead-user">
                  <Index.TableRow className="transaction-user-tr">
                    <Index.TableCell className="transaction-user-th">
                      Periods
                    </Index.TableCell>

                    <Index.TableCell
                      className="transaction-user-th"
                      align="left"
                    >
                      {/* Result */}
                      Bet
                    </Index.TableCell>
                    <Index.TableCell
                      className="transaction-user-th"
                      align="left"
                    >
                      Coin
                    </Index.TableCell>
                    

                    <Index.TableCell
                      className="transaction-user-th"
                      align="left"
                    >
                      Open Time
                    </Index.TableCell>
                  </Index.TableRow>
                </Index.TableHead>
                {searchedData?.length ? (
                  searchedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((ele) => {
                      return (
                        <Index.TableBody className="transaction-user-tbody">
                          <Index.TableRow className="transaction-user-tr">
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
                              {ele?.colourName}
                            </Index.TableCell>
                            <Index.TableCell
                              align="left"
                              className="transaction-user-td"
                            >
                              {ele?.price}
                            </Index.TableCell>
                            <Index.TableCell
                              align="left"
                              className="transaction-user-td"
                            >
                             
                              {ele?.date
                                ? Index.moment(ele?.date).format("DD/MM/YYYY")
                                : "-"}
                            </Index.TableCell>
                          </Index.TableRow>
                        </Index.TableBody>
                      );
                    })
                ) : (
                  <Index.NoDataFound colSpan={6} />
                )}
              </Index.Table>

              <Index.TablePagination
                component="div"
                page={page}
                className="paginationColor"
                count={searchedData?.length}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
                onRowsPerPageChange={handleChangeRowsPerPage}
               
              />
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

export default ThreeColorMyRecord;
