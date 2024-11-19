// import React from 'react'

// const UserTransaction = () => {
//   return (
//     <div>UserTransaction</div>
//   )
// }

// export default UserTransaction

import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { styled, alpha } from "@mui/material/styles";
import "../../../../assets/style/global.css";
import { DatePicker } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import FileExcel from "../../../../component/admin/dashbord/FileExcel";
import Loader from "../../../../component/comman/loader/Loader";
import { useSelector } from "react-redux";
import PageIndex from "../../../pageIndex";
import UserTransactionModel from "./UserTransactionModel";

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

const UserTransaction = (props) => {
  console.log(props, 69);
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);
  console.log(permission, "111");
  const [view, setView] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [tranData, setTranData] = useState([]);
  const [excel, setExcel] = useState([]);
  const fileName = "myfile";
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [filterData, setFilterData] = useState([]);

  console.log(searchedData?.length, 57);

  useEffect(() => {
    const customHeadings = tranData?.map((item) => ({
      "Created Date": Index.moment(item.createdAt).format("DD/MM/YYYY"),
      "User Name": item?.userId?.fullName,
      "User Email": item?.userId?.email,
      "Network Type	": item?.tokenName,
      Amount: item?.tokenAmount,
      Type: item?.type,
    }));

    setExcel(customHeadings);
  }, [tranData]);

  // Pagination states and methods
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  // End Pagination

  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname == "/admin/transaction-history") {
      setView(true);
    } else {
      setView(false);
    }
  }, [pathname]);

  // transaction model
  const [openTransaction, setOpenTransaction] = useState(false);
  const handleCloseTransactionModel = () => setOpenTransaction(false);
  const handleOpenTransactionModel = () => setOpenTransaction(true);

  // search

  const handleSearch = (searched) => {
    // if (!searched) return setSearchedData(transactionData);
    let result = filterData.filter(
      (item) =>
        item?.userId?.fullName
          ?.toString()
          .toLowerCase()
          .includes(searched.toLowerCase()) ||
        item?.userId?.email
          ?.toString()
          .toLowerCase()
          .includes(searched.toLowerCase()) ||
        item?.tokenName
          ?.toString()
          .toLowerCase()
          .includes(searched.toLowerCase()) ||
        item?.tokenAmount
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
    //setUserlist(userlist);
    setSearchedData(transactionData);
    setTranData(transactionData);
  }, [transactionData]);

  // const gettTransactionList = async (id) => {
  //   const urlencoded = new URLSearchParams();
  //   urlencoded.append("userId", id);
  //   DataService.post(Api.TRANSACTION_SINGLE_USER, urlencoded)
  //     .then((res) => {
  //       setUserView(res.data.data);
  //     })
  //     .catch((e) => {
  //       toast.error(
  //         e.response.data.message ? e.response.data.message : e.message
  //       );
  //       navigate("/admin/login")
  //     });
  // };
  // useEffect(() => {
  //   gettTransactionList();
  // }, []);

  const getSingleTransaction = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("userId", props?.userId);
    await DataService.post(Api.GET_SINGLE_ADMIN_USER_TRANSACTION, urlencoded)
      .then((res) => {
        setTransactionData(res.data.data);
      })
      .catch((e) => {});
  };

  const getAllTransaction = () => {
    setLoading(true);
    DataService.get(Api.TRANSACTION)
      .then((res) => {
        setTransactionData(res.data.data);
        setFilterData(res.data.data);
        setSearchedData(res.data.data);
        setLoading(false);
      })
      .catch((e) => {
        // toast.error(
        //   e.res?.data?.message ? e.res?.data?.message : e.message
        // );
        setLoading(false);
      });
  };

  useEffect(() => {
    if (props?.userId) {
      getSingleTransaction();
    } else {
      getAllTransaction();
    }
  }, [props]);

  // TRANSACTION_SINGLE_USER

  function hideEmail(email) {
    if (email === undefined || email === "" || email === null) {
      return "-";
    } else {
      const [username, domain] = email.split("@");
      const hiddenUsername =
        username.substring(0, 2) + "*".repeat(username.length - 2);
      return hiddenUsername + "@" + domain;
    }
  }

  useEffect(() => {
    let filterdata = [];
    if (date) {
      filterdata = transactionData.filter(
        (item) => Index.moment(item?.createdAt).format("DD/MM/YYYY") === date
      );
      setFilterData(filterdata);
      setSearchedData(filterdata);
      setTranData(filterdata);
    } else {
      setSearchedData(transactionData);
      setFilterData(transactionData);
      setTranData(transactionData);
    }
  }, [date]);
  console.log(date, "date");
  const navigate = useNavigate();

  if (
    permission?.isAdmin == true ||
    (permission?.role?.Transaction?.View == true &&
      permission?.isAdmin == false)
  ) {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <Index.Box className="page-content-box">
            {/* <Index.Box className="barge-common-box"> */}
            {view ? (
              <Index.Box className="title-header">
                <Index.Box className="title-header-flex res-title-header-flex ">
                  <Index.Box className="title-main">
                    <Index.Typography
                      variant="p"
                      component="p"
                      className="page-title"
                    >
                      Transaction
                    </Index.Typography>
                  </Index.Box>

                  <Index.Box className="d-flex align-items-center res-set-search">
                    <Index.Box className="transation-date-picker admin-datepicker-main cus-date-color-main">
                      <DatePicker
                        clearable={true}
                        className="admin-datepicker-inner cus-date-color"
                        format="DD/MM/YYYY"
                        inputReadOnly={true}
                        onChange={(value) => {
                          let NewDate = "";
                          if (value) {
                            NewDate = Index.moment(value?.$d).format(
                              "DD/MM/YYYY"
                            );
                          }
                          setDate(NewDate);
                          // handleSearch(NewDate);
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

                    {permission?.isAdmin == true ||
                    (permission?.role?.Transaction?.View == true &&
                      permission?.isAdmin == false) ? (
                      <>
                        <Index.Box className="res-auto-left common-button blue-button res-blue-button">
                          <FileExcel apiData={excel} fileName={fileName} />
                        </Index.Box>
                      </>
                    ) : (
                      <></>
                    )}
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            ) : (
              ""
            )}
            <Index.Box
              className="common-button blue-button res-blue-button w-100-add-btn"
              sx={{ display: "flex", justifyContent: "end" }}
            >
              <Index.Box className="add-content-banner">
                <>
                  {" "}
                  <Index.Button
                    variant="contained"
                    disableRipple
                    onClick={() => {
                      // setApprovedId(data?._id);
                      // setApproveAmount(data?.amount);
                      handleOpenTransactionModel();
                    }}
                  >
                    <img
                      src={PageIndex.Svg.plus}
                      className="plus-main-content"
                    />
                    Add Transaction
                  </Index.Button>
                </>
              </Index.Box>
            </Index.Box>
            <Index.Box className="">
              <Index.TableContainer
                component={Index.Paper}
                className="table-container transaction-table-container"
              >
                <Index.Table
                  aria-label="simple table"
                  className="table-design-main barge-table transaction-table-main"
                >
                  <Index.TableHead className="transaction-table-head">
                    <Index.TableRow className="transaction-table-tr">
                      <Index.TableCell className="transaction-table-th">
                        Created Date
                      </Index.TableCell>
                      <Index.TableCell
                        align="left"
                        className="transaction-table-th"
                      >
                        User Name
                      </Index.TableCell>
                      <Index.TableCell
                        align="left"
                        className="transaction-table-th"
                      >
                        Email
                      </Index.TableCell>

                      {/* <Index.TableCell
                        align="left"
                        className="transaction-table-th"
                      >
                        Network Type
                      </Index.TableCell> */}

                      {/* <Index.TableCell
                    align="left"
                    className="transaction-table-th"
                  >
                    Network
                  </Index.TableCell> */}

                      <Index.TableCell
                        align="left"
                        className="transaction-table-th"
                      >
                        Amount
                      </Index.TableCell>
                      {/* <Index.TableCell
                        align="left"
                        className="transaction-table-th"
                      >
                        Coin
                      </Index.TableCell> */}
                      <Index.TableCell
                        align="left"
                        className="transaction-table-th"
                      >
                        Type
                      </Index.TableCell>
                      <Index.TableCell
                        align="left"
                        className="transaction-table-th"
                      >
                        Status
                      </Index.TableCell>
                      {/* <Index.TableCell align="left">Action</Index.TableCell> */}
                    </Index.TableRow>
                  </Index.TableHead>
                  <Index.TableBody className="transaction-table-tbody">
                    {searchedData?.length > 0 ? (
                      searchedData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item) => {
                          return (
                            <Index.TableRow
                              key={item}
                              className="transaction-table-tr"
                            >
                              <Index.TableCell
                                align="left"
                                className="transaction-table-td"
                              >
                                {Index.moment(item.createdAt).format(
                                  "DD/MM/YYYY"
                                ) || "-"}
                              </Index.TableCell>
                              <Index.TableCell
                                align="left"
                                className="transaction-table-td"
                              >
                                {item?.userId?.fullName || "-"}
                              </Index.TableCell>
                              <Index.TableCell
                                align="left"
                                className="transaction-table-td"
                              >
                                {hideEmail(item?.userId?.email)}
                              </Index.TableCell>

                              <Index.TableCell
                                align="left"
                                className="transaction-table-td"
                              >
                                {/* {item?.amount ? item?.amount : "-"} */}
                                {item?.amount ? item?.amount?.toFixed(2) : "-"}
                              </Index.TableCell>

                              {/* <Index.TableCell
                            align="left"
                            className="transaction-table-td"
                          >
                            {item?.networkChainId || "-"}
                          </Index.TableCell> */}

                              {/* <Index.TableCell
                                align="left"
                                className="transaction-table-td"
                              >
                                {parseFloat(
                                  item?.tokenDollorValue?.toFixed(2)
                                ) || "-"}
                              </Index.TableCell> */}
                              {/* <Index.TableCell
                                align="left"
                                className="transaction-table-td"
                              >
                                {
                              parseFloat(item?.tokenDollorValue.toFixed(2)) || "-"
                            }
                                -
                              </Index.TableCell> */}

                              {/* <Index.TableCell
                                align="left"
                                className="transaction-table-td"
                              >
                                {item?.type || "-"}
                              </Index.TableCell> */}
                              <Index.TableCell
                                align="left"
                                className="transaction-table-td"
                              >
                                {item?.requestType ? item?.requestType : "-"}
                              </Index.TableCell>
                              <Index.TableCell
                                align="left"
                                className="transaction-table-td"
                              >
                                {item?.status ? item?.status : "-"}
                              </Index.TableCell>
                              {/* <Index.TableCell align="left">
                              <Link className="more-details-content">
                                More Details
                              </Link>
                            </Index.TableCell> */}
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

            {/* <Index.Box className="pagination-design flex-end">
        <Index.Stack spacing={2}>
         
        </Index.Stack>
      </Index.Box> */}
            {searchedData?.length ? (
              <Index.TablePagination
                component="div"
                page={page}
                count={searchedData?.length}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                // rowsPerPageOptions={[10, 25, 50]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelDisplayedRows={(page) =>
                  `Records ${page.from} to ${
                    page.to === -1 ? page.count : page.to
                  } of ${page.count}`
                }
                className="paginationColor"
              />
            ) : (
              ""
            )}
          </Index.Box>
        )}

        <Index.Modal
          open={openTransaction}
          onClose={handleCloseTransactionModel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-comman-details"
        >
          <Index.Box sx={style} className="modal-comman-inner-style">
            <UserTransactionModel
              handleClose={handleCloseTransactionModel}
              // approvedId={approvedId}
              userId={props?.userId}
              // approveAmount={approveAmount}
              getSingleTransaction={getSingleTransaction}
              getUserDetails={props.getUserDetails}
            />
          </Index.Box>
        </Index.Modal>
      </>
    );
  } else {
    navigate("/admin");
  }
};

export default UserTransaction;
