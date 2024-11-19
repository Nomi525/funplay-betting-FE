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
import Autocomplete from "@mui/material/Autocomplete";

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

const filterMaintenanceList = [
  { id: 1, name: "All", value: "all" },
  { id: 4, name: "Pending", value: "Pending" },
  { id: 2, name: "Approved", value: "Approved" },
  { id: 3, name: "Rejected", value: "Rejected" },
];
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

const TransationHistory = () => {
  const loading = useSelector((state) => state?.UserReducer?.loading);
  const [transationData, setTransationData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [filterByPriority, setFilterByPriority] = useState("");
  const [date, setDate] = useState(null);

  console.log(searchedData, 61);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const transationHistory = async () => {
    try {
      const depositRes = await DataService.get(
        Api.User.GET_USER_DEPOSIT_REQUEST
      );
      const withdrawRes = await DataService.get(
        Api.User.GET_USER_WITHDRAW_REQUEST
      );

      const combinedData = [...depositRes.data.data, ...withdrawRes.data.data];
      combinedData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setTransationData(combinedData);
    } catch (error) {
      toast.error(
        error.response?.data?.message
          ? error.response?.data?.message
          : error.message
      );
    }
  };

  useEffect(() => {
    transationHistory();
  }, []);

  useEffect(() => {
    setFilterData(transationData);
  }, [transationData]);

  useEffect(() => {
    let filtered;
    let filterDate = [];
    if (filterByPriority && filterByPriority !== "all") {
      filtered = transationData?.filter(
        (ele) => ele?.status?.toLowerCase() === filterByPriority
      );
    } else {
      filtered = transationData;
    }
    if (date) {
      filterDate = filtered.filter(
        (item) => Index.moment(item?.createdAt).format("DD/MM/YYYY") === date
      );
      setFilterData(filterDate);
    } else {
      setFilterData(filtered);
    }
  }, [transationData, filterByPriority, date]);

  useEffect(() => {
    const filtered = filterData?.filter((item) => {
      return !search
        ? item
        : item?.amount
            ?.toString()
            ?.toLowerCase()
            .includes(search?.toLowerCase()) ||
            item?.requestedAmount
              ?.toString()
              ?.toLowerCase()
              .includes(search?.toLowerCase()) ||
            (!item?.tokenName &&
              item?.userId.currency
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase())) ||
            item?.tokenName
              ?.toString()
              ?.toLowerCase()
              .includes(search?.toLowerCase()) ||
            item?.requestType
              ?.toString()
              ?.toLowerCase()
              .includes(search?.toLowerCase());
    });

    if (filtered?.length > 0) {
      setSearchedData(filtered);
    } else {
      setSearchedData([]);
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
                  Transaction History
                </Index.Typography>
              </Index.Box>

              <Index.Box className="d-flex align-items-center res-set-search deposit-req-main">
                {/* <Search className="search deposit-list-search-status deposit-req-filter">
                  <Index.Box className="input-design-div deposit-req-with-border">
                    <Autocomplete
                      disablePortal
                      className="invoice-select-drop"
                      id="combo-box-demo"
                      options={filterMaintenanceList}
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
                      defaultValue={filterMaintenanceList?.find(
                        (ele) => ele?.value == "all"
                      )}
                      onChange={(event, newValue) => {
                        setTimeout(() => {
                          setFilterByPriority(newValue?.name?.toLowerCase());
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
                </Search> */}
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
                          Select
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
                <Index.Box className="transation-date-picker admin-datepicker-main cus-date-color-main">
                  <DatePicker
                    clearable={true}
                    className="admin-datepicker-inner cus-date-color"
                    format="DD/MM/YYYY"
                    inputReadOnly={true}
                    onChange={(value) => {
                      let NewDate = "";
                      if (value) {
                        NewDate = Index.moment(value?.$d).format("DD/MM/YYYY");
                      }
                      setDate(NewDate);
                      // handleSearch(NewDate);
                    }}
                    showToday={false}
                  />
                </Index.Box>
                <Search className="search admin-search-comman cus-penalty-search-main">
                  <StyledInputBase
                    placeholder="Search"
                    inputProps={{ "aria-label": "search" }}
                    // onChange={(e) => handleSearch(e.target.value)}
                    onChange={(e) => setSearch(e.target.value)}
                    className="cus-penalty-search"
                  />
                </Search>
              </Index.Box>
            </Index.Box>
          </Index.Box>

          <Index.Box className="transaction-table-user-history responsive">
            <Index.TableContainer
              component={Index.Paper}
              className="table-container transaction-container-user responsive"
            >
              <Index.Table
                aria-label="simple table"
                className="table-design-main barge-table transaction-table-user"
              >
                <Index.TableHead className="transaction-table-thead-user">
                  <Index.TableRow className="transaction-user-tr">
                    <Index.TableCell className="transaction-user-th">
                      Created Date
                    </Index.TableCell>

                    <Index.TableCell
                      className="transaction-user-th"
                      align="left"
                    >
                      Amount
                    </Index.TableCell>
                    {/* <Index.TableCell className="transaction-user-th" align="left">
                    Network
                  </Index.TableCell> */}
                    <Index.TableCell
                      className="transaction-user-th"
                      align="left"
                    >
                      Currency Type
                    </Index.TableCell>
                    <Index.TableCell
                      className="transaction-user-th"
                      align="left"
                    >
                      Request Type
                    </Index.TableCell>
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((ele) => {
                      return (
                        <Index.TableBody className="transaction-user-tbody">
                          <Index.TableRow className="transaction-user-tr">
                            <Index.TableCell
                              align="left"
                              className="transaction-user-td"
                            >
                              {/* {Index.moment(ele?.createdAt).format(
                                "DD/MM/YYYY"
                              ) || "-"} */}
                              {ele?.createdAt
                                ? Index.moment(ele?.createdAt).format(
                                    "DD/MM/YYYY hh:mm A"
                                  )
                                : "-"}
                            </Index.TableCell>

                            <Index.TableCell
                              align="left"
                              className="transaction-user-td"
                            >
                              {ele?.amount || ele?.requestedAmount || ele?.tokenAmount}
                            </Index.TableCell>

                            <Index.TableCell
                              align="left"
                              className="transaction-user-td"
                            >
                              {/* {ele?.type ? ele?.type  : "-"} */}
                              {ele?.type == "Crypto Currency"
                                ? ele?.tokenName
                                  ? ele?.tokenName
                                  : "-"
                                : ele?.userId.currency
                                ? ele?.userId.currency
                                : "-"}
                            </Index.TableCell>
                            <Index.TableCell
                              align="left"
                              className="transaction-user-td"
                            >
                              {ele?.requestType}
                            </Index.TableCell>
                            <Index.TableCell
                              align="left"
                              className="transaction-user-td"
                            >
                              {ele?.status}
                            </Index.TableCell>
                          </Index.TableRow>
                        </Index.TableBody>
                      );
                    })
                ) : (
                  <Index.NoDataFound colSpan={6} />
                )}
              </Index.Table>
              {searchedData?.length && (
                <Index.TablePagination
                  component="div"
                  page={page}
                  className="paginationColor"
                  count={searchedData?.length}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[10, 25, 50]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  // labelDisplayedRows={(page) =>
                  //   `Records ${page.from} to ${page.to === -1 ? page.count : page.to
                  //   } of ${page.count}`
                  // }
                />
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

export default TransationHistory;
