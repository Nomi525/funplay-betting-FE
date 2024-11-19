import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import MenuIcon from "@mui/icons-material/MoreVert";
import { styled, alpha } from "@mui/material/styles";
import "../../../../assets/style/global.css";
import PageIndex from "../../../pageIndex";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import "../../../../assets/style/global.css";
import FileExcel from "../../../../component/admin/dashbord/FileExcel";
import Loader from "../../../../component/comman/loader/Loader";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import WithdrawalApprove from "./WithdrawalApprove";
import WithdrawalReject from "./WithdrawalReject";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "antd";
import { useOutletContext } from "react-router-dom";

// import WithdrawalApprove from "./WithdrawalApprove";
// import WithdrawalReject from "./WithdrawalReject";

const filterMaintenanceList = [
  { id: 1, name: "All", value: "all" },
  { id: 4, name: "Pending", value: "Pending" },
  { id: 2, name: "Approved", value: "Approved" },
  { id: 3, name: "Rejected", value: "Rejected" },
];

const approveReqStyle = {
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
const rejectReqStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "600px",
  bgcolor: "background.paper",
  border: "0px",
  backgroundColor: "#090d29",
  borderRadius: "15px",
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

const ActionItem = styled(Index.MenuItem)(() => ({
  fontFamily: "poppins",
  lineHeight: "15px",
  fontSize: "14px",
  fontWeight: "400",
  color: "#595F69",
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

let cryptoShortName = {
  Bitcoin: "BTC",
  BNB: "BNB",
  Polygon: "PLG",
  Ethereum: "ETH",
};

const WithDrawal = () => {
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);
  console.log(permission, "111");
  const [withdrawalData, setWithdrawalData] = useState([]);
  const navigate = PageIndex.useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionIndex, setActionIndex] = useState();
  const [withdrawalList, setWithdrawalList] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const dispatch = useDispatch();
  const [excel, setExcel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approvedId, setApprovedId] = useState("");
  const [rejectedId, setRejectedId] = useState("");
  const [openApprovedData, setOpenApprovedData] = useState(false);
  const [openRejectedData, setOpenRejectedData] = useState(false);

  const [query, setQuery] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterByPriority, setFilterByPriority] = useState("");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(null);
  const { notifyUser, setNotifyUser, notifyUserId, setNotifyUserId } =
    useOutletContext();

  // const [searchedData, setSearchedData] = useState([]);

  const [showModal, setShowModal] = useState(true);
  const [openModalId, setOpenModalId] = useState();

  const showDetails = (item, action) => {
    setOpenModalId(item?._id);
    if (openModalId === item?._id && action === "up") {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
    // setTankerLoadingDetail(item);
  };

  const fileName = "Withdrawal request";
  const handleCloseApprovedData = () => {
    setApprovedId("");
    setOpenApprovedData(false);
  };
  const handleOpenApprovedData = () => {
    setRejectedId("");
    setOpenApprovedData(true);
  };

  const handleCloseRejectedData = () => setOpenRejectedData(false);
  const handleOpenRejectedData = () => setOpenRejectedData(true);
  useEffect(() => {
    const customHeadings = withdrawalData.map((item) => ({
      "Created Date": Index.moment(item.updatedAt).format("DD/MM/YYYY"),
      Name: item?.userId?.fullName,
      Email: item?.email,
      Type: item?.type,
      Currency: item?.currency,
      //  " Network Chain" : item.networkChainId,
      Amount: item.requestedAmount,
      // "Amount ($)": item.tokenDollorValue?.toLocaleString("en-IN", {
      //   minimumFractionDigits: 2,
      //   maximumFractionDigits: 2,
      // }),
      Status: item.status,
    }));
    setExcel(customHeadings);
  }, [withdrawalData]);

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

  const handleClickMenu = (e) => {
    setActionIndex();
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = (row) => {
    navigate("/admin/new-member/add", { state: { row, edit: "Edit" } });
  };

  // search

  // const handleSearch = (searched) => {
  //   if (!searched) return setSearchedData(withdrawalData);
  //   setSearchedData(
  //     withdrawalData.filter(
  //       (item) =>
  //         item?.fullName
  //           ?.toString()
  //           .toLowerCase()
  //           .includes(searched.toLowerCase()) ||
  //         item?.email
  //           ?.toString()
  //           .toLowerCase()
  //           .includes(searched.toLowerCase()) ||
  //         item?.networkChainId
  //           ?.toString()
  //           .toLowerCase()
  //           .includes(searched.toLowerCase()) ||
  //         item?.tokenName
  //           ?.toString()
  //           .toLowerCase()
  //           .includes(searched.toLowerCase()) ||
  //         item?.tokenAmount
  //           ?.toString()
  //           .toLowerCase()
  //           .includes(searched.toLowerCase()) ||
  //         item?.tokenDollorValue
  //           ?.toLocaleString("en-IN", {
  //             minimumFractionDigits: 2,
  //             maximumFractionDigits: 2,
  //           })
  //           .toString()
  //           .toLowerCase()
  //           .includes(searched.toLowerCase()) ||
  //         item?.type
  //           ?.toString()
  //           .toLowerCase()
  //           .includes(searched.toLowerCase()) ||
  //         Index.moment(item?.createdAt)
  //           .format("DD/MM/YYYY")
  //           ?.toString()
  //           .toLowerCase()
  //           .includes(searched.toString().toLowerCase())
  //     )
  //   );
  //   setPage(0);
  // };

  useEffect(() => {
    //setUserlist(userlist);
    setSearchedData(withdrawalData);
  }, [withdrawalData]);

  // useEffect(() => {
  //   const urlencoded = new URLSearchParams();
  //   // urlencoded.append("transactionId", "transactionId");
  //   // urlencoded.append("requestType", "requestType");
  //   // DataService.get(Api.WITHDRAWAL_LIST, urlencoded)
  //   setLoading(true);
  //   DataService.get(Api.WITHDRAWAL_LIST, urlencoded)
  //     .then((res) => {
  //       const data = res?.data?.data.filter((val) => {
  //         return val.type === "withdrawal";
  //       });

  //       setWithdrawalData(data);
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       // toast.error(
  //       //   e.res?.data?.message ? e.res?.data?.message : e.message
  //       // );
  //       setLoading(false);
  //     });
  // }, []);

  const getWithdrawalRequest = async () => {
    setLoading(true);
    DataService.get(Api.WITHDRAWAL_LIST)
      .then((res) => {
        // const data = res?.data?.data.filter((val) => {
        //   return val.type === "withdrawal";
        // });
        setWithdrawalData(res?.data?.data);
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.res?.data?.message ? e.res?.data?.message : e.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    let filtered;
    let filterDate = [];
    if (filterByPriority && filterByPriority !== "all") {
      filtered = withdrawalData?.filter(
        (ele) => ele?.status?.toLowerCase() === filterByPriority
      );
    } else {
      filtered = withdrawalData;
    }
    if (date) {
      filterDate = filtered.filter(
        (item) => Index.moment(item?.createdAt).format("DD/MM/YYYY") === date
      );
      setFilterData(filterDate);
    } else {
      setFilterData(filtered);
    }
  }, [withdrawalData, filterByPriority, date]);

  // Search on table new

  useEffect(() => {
    const filtered = filterData?.filter((item) => {
      return !search
        ? item
        : item?.userId?.fullName
            ?.toString()
            ?.toLowerCase()
            .includes(search?.toLowerCase()) ||
            item?.requestedAmount
              ?.toString()
              ?.toLowerCase()
              .includes(search?.toLowerCase()) ||
            item?.email
              ?.toString()
              ?.toLowerCase()
              .includes(search?.toLowerCase()) ||
            (item.type === "Fiat Currency" &&
              item?.currency
                ?.toString()
                ?.toLowerCase()
                .includes(search?.toLowerCase())) ||
            (item.type === "Crypto Currency" &&
              cryptoShortName[item.tokenName]
                ?.toString()
                ?.toLowerCase()
                .includes(search?.toLowerCase()));
    });

    if (filtered?.length > 0) {
      setSearchedData(filtered);
    } else {
      setSearchedData([]);
    }
  }, [filterData, search]);

  useEffect(() => {
    getWithdrawalRequest();
  }, []);

  if (
    permission?.isAdmin == true ||
    (permission?.role?.WithdrawlRequest?.View == true &&
      permission?.isAdmin == false)
  ) {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <Index.Box className="page-content-box">
            <Index.Box className="barge-common-box">
              <Index.Box className="title-header">
                <Index.Box className="title-header-flex res-title-header-flex ipad-flex-small-content">
                  {/* responsive class for multiple button - res-title-header-flex */}
                  <Index.Box className="title-main">
                    <Index.Typography
                      variant="p"
                      component="p"
                      className="page-title"
                    >
                      Withdrawal Request
                    </Index.Typography>
                  </Index.Box>

                  {/* <Index.Box className="res-auto-left-none common-button blue-button res-blue-button">
            <Search className="search admin-search-comman">
                <StyledInputBase
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </Search>
              <FileExcel apiData={excel} fileName={fileName} />
            </Index.Box> */}
                  <Index.Box className="d-flex align-items-center res-set-search deposit-req-main">
                    <Index.Box className="add-game-dropdown status-select">
                      <Index.Box className=" signin-drop-details">
                        <Index.FormControl
                          className="formcontrol_login sign-in-inner-form"
                          // fullWidth
                          // sx={{minWidth: "140px"}}
                        >
                          <Index.Select
                            // name="gameMode"
                            // placeholder="mode"
                            className="currency-select-drop"
                            displayEmpty
                            value={filterByPriority}
                            label="Status"
                            onChange={(event, newValue) => {
                              console.log(event.target.value, "409", newValue);
                              setTimeout(() => {
                                setFilterByPriority(
                                  event.target.value?.toLowerCase()
                                );
                              }, 1000);
                              // setSearch("");
                            }}
                            // inputProps={{ "aria-label": "Without label" }}
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
                          // defaultValue={filterMaintenanceList?.find(
                          //   (ele) => ele?.value == "all"
                          // )}
                          onChange={(event, newValue) => {
                            setTimeout(() => {
                              setFilterByPriority(
                                newValue?.name?.toLowerCase()
                              );
                            }, 1000);
                            // setSearch("");
                          }}
                          renderInput={(params) => (
                            <Index.TextField
                              {...params}
                              placeholder="Select request"
                              variant="outlined"
                            />
                          )}
                        />
                      </Index.Box>
                    </Search> */}
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
                        showToday={false}
                      />
                    </Index.Box>
                    <Search className="search admin-search-comman cus-penalty-search-main">
                      <StyledInputBase
                        placeholder="Search"
                        inputProps={{ "aria-label": "search" }}
                        // value={query}
                        // onChange={(e) => setQuery(e.target.value)}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="cus-penalty-search"
                      />
                    </Search>

                    {permission?.isAdmin == true ||
                    (permission?.role?.WithdrawlRequest?.View == true &&
                      permission?.isAdmin == false) ? (
                      <>
                        <Index.Box
                          Box
                          className="res-auto-left common-button blue-button res-blue-button"
                        >
                          <FileExcel apiData={excel} fileName={fileName} />
                        </Index.Box>
                      </>
                    ) : (
                      <></>
                    )}
                  </Index.Box>
                </Index.Box>
              </Index.Box>

              <Index.Box className="">
                <Index.TableContainer
                  component={Index.Paper}
                  className="table-container table-withdrawal-conatiner"
                >
                  <Index.Table
                    aria-label="simple table"
                    className="table-design-main barge-table table-withdrawal-details"
                  >
                    <Index.TableHead className="table-withdeawal-head">
                      <Index.TableRow className="table-withdeawal-tr">
                        {/* <Index.TableCell align="left">Sr no</Index.TableCell> */}

                        <Index.TableCell className="table-withdeawal-th">
                          Date & Time
                        </Index.TableCell>
                        {/* <Index.TableCell className="table-withdeawal-th">
                    Network Chain
                  </Index.TableCell> */}
                        <Index.TableCell className="table-withdeawal-th">
                          Name
                        </Index.TableCell>
                        {/* <Index.TableCell className="table-withdeawal-th">
                          Email
                        </Index.TableCell> */}
                        <Index.TableCell
                          className="table-withdeawal-th"
                          align="left"
                        >
                          Currency type
                        </Index.TableCell>
                        <Index.TableCell
                          className="table-withdeawal-th"
                          align="left"
                        >
                          Currency
                        </Index.TableCell>
                        <Index.TableCell
                          className="table-withdeawal-th"
                          align="left"
                        >
                          Amount
                        </Index.TableCell>
                        <Index.TableCell
                          className="table-withdeawal-th"
                          align="left"
                        >
                          Status
                        </Index.TableCell>
                        <Index.TableCell
                          className="banner-management-th"
                          align="left"
                        >
                          {permission.isAdmin == true ||
                          (permission.role?.WithdrawlRequest?.update == true &&
                            permission.isAdmin == false) ? (
                            <Index.Box>Action</Index.Box>
                          ) : (
                            <></>
                          )}
                        </Index.TableCell>
                        {/* <Index.TableCell align="left">Action</Index.TableCell> */}
                        <Index.TableCell align="left"></Index.TableCell>

                        {/* <Index.TableCell
                          className="table-withdeawal-th"
                          align="left"
                        >
                          Status
                        </Index.TableCell> */}
                      </Index.TableRow>
                    </Index.TableHead>
                    <Index.TableBody>
                      {console.log({ searchedData })}
                      {searchedData.length ? (
                        searchedData
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => {
                            return (
                              <>
                                <Index.TableRow
                                  key={item._id}
                                  className="table-withdeawal-tr"
                                >
                                  {/* <Index.TableCell>{index + 1}</Index.TableCell> */}

                                  <Index.TableCell className="table-withdeawal-td">
                                    {item?.createdAt
                                      ? Index.moment(item?.createdAt).format(
                                          "DD/MM/YYYY hh:mm A"
                                        )
                                      : "-"}
                                  </Index.TableCell>
                                  {/* <Index.TableCell className="table-withdeawal-td">
                            {item.networkChainId}
                          </Index.TableCell> */}
                                  <Index.TableCell className="table-withdeawal-td">
                                    {item.userId?.fullName
                                      ? item.userId?.fullName
                                      : "-"}
                                  </Index.TableCell>
                                  {/* <Index.TableCell className="table-withdeawal-td">
                                    {item.email ? item.email : "-"}
                                  </Index.TableCell> */}
                                  <Index.TableCell className="table-withdeawal-td">
                                    {item.type}
                                  </Index.TableCell>
                                  <Index.TableCell className="table-withdeawal-td">
                                    {/* {item.currency ? item.currency : "-"} */}
                                    {/* {item.type == "Crypto Currency"
                                      ? item.tokenName
                                        ? item.tokenName
                                        : "-"
                                      : item.currency
                                      ? item.currency
                                      : "-"} */}
                                    {item.type == "Crypto Currency"
                                      ? item.tokenName
                                        ? cryptoShortName[item.tokenName]
                                        : "-"
                                      : item.currency
                                      ? item.currency
                                      : "-"}
                                  </Index.TableCell>
                                  <Index.TableCell className="table-withdeawal-td">
                                    {item.requestedAmount}
                                  </Index.TableCell>
                                  <Index.TableCell className="table-withdeawal-td">
                                    {item.status}
                                  </Index.TableCell>
                                  <Index.TableCell
                                    className="banner-management-td"
                                    // sx={{ display: "flex" }}
                                  >
                                    {permission?.isAdmin == true ||
                                    (permission?.role?.WithdrawlRequest
                                      ?.update == true &&
                                      permission?.isAdmin == false) ? (
                                      <>
                                        <Index.Button
                                          className="table-view-btn"
                                          disableRipple
                                          onClick={() => {
                                            setNotifyUserId(item?.userId._id);
                                            setApprovedId(item?._id);
                                            handleOpenApprovedData();
                                          }}
                                          disabled={
                                            item?.status === "Approved" ||
                                            item?.status === "Rejected"
                                          }
                                        >
                                          <DoneIcon color="primary" />{" "}
                                        </Index.Button>
                                        <Index.Button
                                          className="table-view-btn"
                                          disableRipple
                                          onClick={() => {
                                            setNotifyUserId(item?.userId._id);
                                            setRejectedId(item?._id);
                                            handleOpenRejectedData();
                                          }}
                                          disabled={
                                            item?.status === "Approved" ||
                                            item?.status === "Rejected"
                                          }
                                        >
                                          <ClearIcon color="error" />
                                        </Index.Button>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {/* <MenuIcon className="action-menu-icon" /> */}
                                  </Index.TableCell>
                                  <Index.TableCell>
                                    {showModal ? (
                                      item?._id == openModalId ? (
                                        <Index.IconButton
                                          aria-label="expand row"
                                          size="small"
                                        >
                                          {/* <Index.KeyboardArrowDownIcon
                                            onClick={() =>
                                              showDetails(data, "down")
                                            }
                                            sx={{ color: "white" }}
                                          /> */}
                                          <Index.KeyboardArrowUpIcon
                                            onClick={() =>
                                              showDetails(item, "up")
                                            }
                                            sx={{ color: "white" }}
                                          />
                                        </Index.IconButton>
                                      ) : (
                                        <Index.IconButton
                                          aria-label="expand row"
                                          size="small"
                                        >
                                          {/* <Index.KeyboardArrowUpIcon
                                            onClick={() =>
                                              showDetails(data, "up")
                                            }
                                            sx={{ color: "white" }}
                                          /> */}
                                          <Index.KeyboardArrowDownIcon
                                            onClick={() =>
                                              showDetails(item, "down")
                                            }
                                            sx={{ color: "white" }}
                                          />
                                        </Index.IconButton>
                                      )
                                    ) : (
                                      <Index.IconButton
                                        aria-label="expand row"
                                        size="small"
                                      >
                                        {/* <Index.KeyboardArrowUpIcon
                                          onClick={() =>
                                            showDetails(data, "up")
                                          }
                                          sx={{ color: "white" }}
                                        /> */}
                                        <Index.KeyboardArrowDownIcon
                                          onClick={() =>
                                            showDetails(item, "down")
                                          }
                                          sx={{ color: "white" }}
                                        />
                                      </Index.IconButton>
                                    )}
                                  </Index.TableCell>
                                </Index.TableRow>
                                {showModal && item?._id == openModalId && (
                                  <Index.TableRow className="dep-req-table-row">
                                    <Index.TableCell
                                      colSpan={10}
                                      className="table-view-data "
                                    >
                                      <Index.Collapse
                                        in={showModal}
                                        timeout="auto"
                                        unmountOnExit
                                      >
                                        <Index.Box className="set-edit-timing-box pd-loading-details">
                                          <Index.Grid container spacing={2}>
                                            <Index.Grid
                                              item
                                              xs={12}
                                              sm={12}
                                              md={12}
                                            >
                                              <Index.Box className="title-header-flex order-loading-details">
                                                <Index.Box className="title-main order-loading-content">
                                                  <Index.Typography
                                                    variant="p"
                                                    component="p"
                                                    className="page-title order-loading-title"
                                                  >
                                                    Details
                                                  </Index.Typography>
                                                </Index.Box>
                                              </Index.Box>
                                            </Index.Grid>
                                            <Index.Grid
                                              item
                                              xs={12}
                                              sm={12}
                                              md={3}
                                            >
                                              <Index.Box className="input-design-div with-border withdrwal-detail-box">
                                                <Index.Typography
                                                  variant="p"
                                                  component="p"
                                                  className="page-title order-loading-title"
                                                >
                                                  Payment Method
                                                </Index.Typography>
                                                <span>
                                                  {item?.paymentMethod
                                                    ? item?.paymentMethod
                                                    : "-"}
                                                </span>
                                              </Index.Box>
                                            </Index.Grid>
                                            <Index.Grid
                                              item
                                              xs={12}
                                              sm={12}
                                              md={3}
                                            >
                                              <Index.Box className="input-design-div with-border withdrwal-detail-box">
                                                <Index.Typography
                                                  variant="p"
                                                  component="p"
                                                  className="page-title order-loading-title"
                                                >
                                                  Bank Account Name / Upi ID
                                                </Index.Typography>

                                                {item.paymentMethod ==
                                                "Bank Account"
                                                  ? item.bankAccount?.bankName
                                                    ? item.bankAccount?.bankName
                                                    : "-"
                                                  : item.upiId
                                                  ? item.upiId
                                                  : "-"}
                                              </Index.Box>
                                            </Index.Grid>
                                            <Index.Grid
                                              item
                                              xs={12}
                                              sm={12}
                                              md={3}
                                            >
                                              <Index.Box className="input-design-div with-border withdrwal-detail-box">
                                                <Index.Typography
                                                  variant="p"
                                                  component="p"
                                                  className="page-title order-loading-title"
                                                >
                                                  Branch
                                                </Index.Typography>
                                                {item.bankAccount
                                                  ? item.bankAccount?.branch
                                                  : "-"}
                                              </Index.Box>
                                            </Index.Grid>
                                            <Index.Grid
                                              item
                                              xs={12}
                                              sm={12}
                                              md={3}
                                            >
                                              <Index.Box className="input-design-div with-border withdrwal-detail-box">
                                                <Index.Typography
                                                  variant="p"
                                                  component="p"
                                                  className="page-title order-loading-title"
                                                >
                                                  Account Holder
                                                </Index.Typography>
                                                {item.bankAccount
                                                  ? item.bankAccount
                                                      ?.accountHolder
                                                  : "-"}
                                              </Index.Box>
                                            </Index.Grid>
                                            <Index.Grid
                                              item
                                              xs={12}
                                              sm={12}
                                              md={3}
                                            >
                                              <Index.Box className="input-design-div with-border withdrwal-detail-box">
                                                <Index.Typography
                                                  variant="p"
                                                  component="p"
                                                  className="page-title order-loading-title"
                                                >
                                                  Account Number
                                                </Index.Typography>
                                                {item.bankAccount
                                                  ? item.bankAccount
                                                      ?.accountNumber
                                                  : "-"}
                                              </Index.Box>
                                            </Index.Grid>
                                            <Index.Grid
                                              item
                                              xs={12}
                                              sm={12}
                                              md={3}
                                            >
                                              <Index.Box className="input-design-div with-border withdrwal-detail-box">
                                                <Index.Typography
                                                  variant="p"
                                                  component="p"
                                                  className="page-title order-loading-title"
                                                >
                                                  IFSC Code
                                                </Index.Typography>
                                                {item.bankAccount
                                                  ? item.bankAccount?.IFSCCode
                                                  : "-"}
                                              </Index.Box>
                                            </Index.Grid>
                                            {/* <Index.Grid
                                              item
                                              xs={12}
                                              sm={12}
                                              md={3}
                                            >
                                              <Index.Box className="input-design-div with-border">
                                                <Index.Typography
                                                  variant="p"
                                                  component="p"
                                                  className="page-title order-loading-title"
                                                >
                                                  Upi ID
                                                </Index.Typography>

                                                {item?.emailgf
                                                  ? item?.emailt
                                                  : "-"}
                                              </Index.Box>
                                            </Index.Grid> */}
                                            <Index.Grid
                                              item
                                              xs={12}
                                              sm={12}
                                              md={3}
                                            >
                                              <Index.Box className="input-design-div with-border withdrwal-detail-box">
                                                <Index.Typography
                                                  variant="p"
                                                  component="p"
                                                  className="page-title order-loading-title"
                                                >
                                                  Email
                                                </Index.Typography>

                                                {item?.email
                                                  ? item?.email
                                                  : "-"}
                                              </Index.Box>
                                            </Index.Grid>

                                            {/* <Index.Grid
                                              item
                                              xs={12}
                                              sm={12}
                                              md={3}
                                            >
                                              <Index.Box className="input-design-div with-border">
                                                Email
                                                {item?.transactionScreenShort && (
                                                  <Index.Button
                                                    onClick={() => {
                                                      window.open(
                                                        `${
                                                          process.env
                                                            .REACT_APP_IMG +
                                                          item?.transactionScreenShort
                                                        }`
                                                      );
                                                    }}
                                                   
                                                  >
                                                    {item?.transactionScreenShort !=
                                                    ""
                                                      ? item?.transactionScreenShort
                                                      : "-"}
                                                  </Index.Button>
                                                )}
                                              </Index.Box>
                                            </Index.Grid> */}
                                          </Index.Grid>
                                        </Index.Box>
                                      </Index.Collapse>
                                    </Index.TableCell>
                                  </Index.TableRow>
                                )}
                              </>
                            );
                          })
                      ) : (
                        <Index.NoDataFound
                          colSpan={9}
                          message={"No withdrawal request found"}
                        />
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
                    // rowsPerPageOptions={[10, 25, 50]}
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
        )}
        <Index.Modal
          open={openApprovedData}
          onClose={handleCloseApprovedData}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-comman-details"
        >
          <Index.Box sx={approveReqStyle} className="modal-comman-inner-style">
            <WithdrawalApprove
              handleClose={handleCloseApprovedData}
              approvedId={approvedId}
              getWithdrawalRequest={getWithdrawalRequest}
            />
          </Index.Box>
        </Index.Modal>
        <Index.Modal
          open={openRejectedData}
          onClose={handleCloseRejectedData}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-comman-details"
        >
          <Index.Box sx={rejectReqStyle}>
            <WithdrawalReject
              handleClose={handleCloseRejectedData}
              rejectedId={rejectedId}
              getWithdrawalRequest={getWithdrawalRequest}
            />
          </Index.Box>
        </Index.Modal>
      </>
    );
  } else {
    navigate("/admin");
  }
};

export default WithDrawal;
