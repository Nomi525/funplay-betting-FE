import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import "../../../../../assets/style/global.css";
import { useNavigate } from "react-router-dom";
import Index from "../../../../Index";
import DataService from "../../../../../config/DataService";
import { Api } from "../../../../../config/Api";
import Loader from "../../../../../component/comman/loader/Loader";
import PageIndex from "../../../../pageIndex";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import ManualDepositApprove from "./ManualDepositApprove";
import ManualDepositReject from "./ManualDepositReject";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "antd";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

// import ClearIcon from "@mui/icons-material/Clear";
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
const style1 = {
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
  { id: 4, name: "Pending", value: "Pending" },
  { id: 2, name: "Approved", value: "Approved" },
  { id: 3, name: "Rejected", value: "Rejected" },
];
const ManualDepositList = () => {
  const navigate = useNavigate();
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);
  const [loading, setLoading] = useState(true);
  const [depositList, setDepositList] = useState([]);
  const [query, setQuery] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterByPriority, setFilterByPriority] = useState("");
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  console.log(depositList, 77);
  console.log(query, 84);
  console.log(filterData, 85);
  const [date, setDate] = useState(null);
  const [openApprovedData, setOpenApprovedData] = useState(false);
  const [openRejectedData, setOpenRejectedData] = useState(false);

  const [approvedId, setApprovedId] = useState("");
  const [approveAmount, setApproveAmount] = useState("");
  const [rejectedId, setRejectedId] = useState("");

  const [showModal, setShowModal] = useState(true);
  const [openModalId, setOpenModalId] = useState();

  const showDetails = (item, action) => {
    console.log(action, 104);
    setOpenModalId(item?._id);
    if (openModalId === item?._id && action === "up") {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  const handleCloseApprovedData = () => setOpenApprovedData(false);
  const handleOpenApprovedData = () => setOpenApprovedData(true);

  const handleCloseRejectedData = () => setOpenRejectedData(false);
  const handleOpenRejectedData = () => setOpenRejectedData(true);
  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [user, setUser] = useState("");
  const { notifyUser, setNotifyUser, notifyUserId, setNotifyUserId } =
    useOutletContext();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // image model

  // const [userImg, setUserImg] = useState("");
  // const [open, setOpen] = useState(false);
  // const handleOpen = (img) => {
  //   setOpen(true);
  //   setUserImg(img);
  // };
  // console.log(userImg, 122);
  // const handleClose = () => setOpen(false);

  // image model close

  const getDepositRequest = async () => {
    await DataService.get(Api.ADMIN_GET_DEPOSIT_REQUEST)
      .then((res) => {
        setLoading(false);
        setDepositList(res?.data?.data);
        // setFilterData(res?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setFilterData(depositList);
  }, [depositList]);

  // useEffect(() => {
  //   if (!query) return setFilterData(depositList);
  //   setFilterData(
  //     depositList?.filter((item) =>
  //       query == "all"
  //         ? item
  //         : item?.userId?.fullName
  //             ?.toString()
  //             ?.toLowerCase()
  //             .includes(query?.toLowerCase()) ||
  //           item?.amount
  //             ?.toString()
  //             ?.toLowerCase()
  //             .includes(query?.toLowerCase()) ||
  //           item?.UTRId?.toString()
  //             ?.toLowerCase()
  //             .includes(query?.toLowerCase())
  //     )
  //   );
  //   setPage(0);
  // }, [query]);

  useEffect(() => {
    getDepositRequest();
  }, []);

  // useEffect(() => {
  //   let filterDate = [];
  //   if (date) {
  //     filterDate = depositList.filter(
  //       (item) => Index.moment(item?.createdAt).format("DD/MM/YYYY") === date
  //     );
  //     setFilterData(filterDate);
  //   } else {
  //     setFilterData(depositList);
  //   }
  // }, [date]);

  // const handleStatusFilter = (status) => {
  //   console.log(status, 173);
  //   const filteredData = depositList?.filter((item) =>
  //     status == "all"
  //       ? item
  //       : item?.status
  //           ?.toString()
  //           ?.toLowerCase()
  //           .includes(status?.toLowerCase())
  //   );
  //   setFilterData(filteredData);
  //   setPage(0);
  // };

  // Initial data filter by game
  // useEffect(() => {
  //   let filtered;
  //   let filterDate =[]
  //   if (filterByPriority && filterByPriority !== "all") {
  //     filtered = depositList?.filter(
  //       (ele) => ele?.status?.toLowerCase() === filterByPriority
  //     ) &&    filterDate = [];
  //   if (date) {
  //     filterDate = depositList.filter(
  //       (item) => Index.moment(item?.createdAt).format("DD/MM/YYYY") === date
  //     );
  //   } else {
  //     filtered = depositList;
  //   }
  //   if (filtered?.length > 0) {
  //     setFilterData(filtered);
  //   } else {
  //     setFilterData([]);
  //   }
  // }, [depositList, filterByPriority, date]);

  useEffect(() => {
    let filtered;
    let filterDate = [];
    if (filterByPriority && filterByPriority !== "all") {
      filtered = depositList?.filter(
        (ele) => ele?.status?.toLowerCase() === filterByPriority
      );
    } else {
      filtered = depositList;
    }
    if (date) {
      filterDate = filtered.filter(
        (item) => Index.moment(item?.createdAt).format("DD/MM/YYYY") === date
      );
      setFilterData(filterDate);
    } else {
      setFilterData(filtered);
    }
  }, [depositList, filterByPriority, date]);

  // Search on table new

  useEffect(() => {
    const filtered = filterData?.filter((item) => {
      return !search
        ? item
        : item?.userId?.fullName
            ?.toString()
            ?.toLowerCase()
            .includes(search?.toLowerCase()) ||
            item?.userId?.currency
              ?.toString()
              ?.toLowerCase()
              .includes(search?.toLowerCase()) ||
            item?.amount
              ?.toString()
              ?.toLowerCase()
              .includes(search?.toLowerCase()) ||
            item?.UTRId?.toString()
              ?.toLowerCase()
              .includes(search?.toLowerCase());
    });

    if (filtered?.length > 0) {
      setSearchedData(filtered);
    } else {
      setSearchedData([]);
    }
  }, [filterData, search]);
  if (
    permission?.isAdmin == true ||
    (permission?.role?.DepositRequest?.View == true &&
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
                        Deposit Request
                      </Index.Typography>
                    </Index.Box>

                    <Index.Box className="d-flex align-items-center res-set-search deposit-req-main">
                      {/* <Search className="search deposit-list-search-status">
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
                              }}
                              {...props}
                            >
                              {option?.name}
                            </Index.Box>
                          )}
                          defaultValue={filterMaintenanceList?.find(
                            (ele) => ele?.value == "all"
                          )}
                          onChange={(event, newValue) =>
                            handleStatusFilter(newValue?.value)
                          }
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
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Grid container spacing={3} mb={2}></Index.Grid>

                <Index.Box className="">
                  <Index.TableContainer
                    component={Index.Paper}
                    className="table-container table-game-container dep-rq-table-main"
                  >
                    <Index.Table
                      aria-label="simple table"
                      className="table-design-main barge-table table-main-game dep-rq-table"
                    >
                      <Index.TableHead>
                        <Index.TableRow>
                          <Index.TableCell align="left">Sr no</Index.TableCell>
                          {/* <Index.TableCell align="left">Image</Index.TableCell> */}

                          <Index.TableCell align="left">
                            User Name
                          </Index.TableCell>
                          <Index.TableCell align="left">
                            Currency
                          </Index.TableCell>
                          <Index.TableCell align="left">Amount</Index.TableCell>
                          <Index.TableCell align="left">UTR Id</Index.TableCell>
                          <Index.TableCell align="left">Date</Index.TableCell>
                          <Index.TableCell align="left">Status</Index.TableCell>

                          <Index.TableCell
                            className="banner-management-th"
                            align="left"
                          >
                            {permission.isAdmin == true ||
                            (permission.role?.DepositRequest?.update == true &&
                              permission.isAdmin == false) ? (
                              <Index.Box>Action</Index.Box>
                            ) : (
                              <></>
                            )}
                          </Index.TableCell>
                          {/* <Index.TableCell align="left">Action</Index.TableCell> */}
                          <Index.TableCell align="left"></Index.TableCell>
                        </Index.TableRow>
                      </Index.TableHead>
                      <Index.TableBody>
                        {searchedData?.length ? (
                          <>
                            {searchedData
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              ?.map((data, index) => (
                                <>
                                  <Index.TableRow key={index}>
                                    <Index.TableCell>
                                      {index + 1}
                                    </Index.TableCell>
                                    {/* <Index.TableCell className="table-head-td">
                                    {" "}
                                    <img
                                      src={
                                        data?.transactionScreenShort != ""
                                          ? process.env.REACT_APP_IMG +
                                            data?.transactionScreenShort
                                          : PageIndex.Png.usericon
                                      }
                                      className="game-add-member-profile"
                                      // alt="No Image"
                                    />
                                  </Index.TableCell> */}

                                    {/* <Index.TableCell style={{ padding: 0 }}>
                                  <div>
                                    <Index.Button
                                      onClick={() => {
                                        handleOpen(
                                          data?.transactionScreenShort
                                        );
                                      }}
                                    >
                                      <Index.Box className="user-main-img user-img-open-align">
                                        {data?.transactionScreenShort != "" ? (
                                          <img
                                            // src={`${
                                            //   process.env.REACT_APP_IMAGE_URL
                                            // }/users/${
                                            //   data?.image ? data?.image : ""
                                            // }`}
                                            src={
                                              data?.transactionScreenShort != ""
                                                ? process.env.REACT_APP_IMG +
                                                  data?.transactionScreenShort
                                                : ""
                                            }
                                            alt=""
                                            className="deposit-img-model"
                                          />
                                        ) : (
                                          <Index.Box className="user-no-img">
                                            No image
                                          </Index.Box>
                                        )}
                                      </Index.Box>
                                    </Index.Button>
                                    <Index.Modal
                                      open={open}
                                      onClose={handleClose}
                                      aria-labelledby="modal-modal-title"
                                      aria-describedby="modal-modal-description"
                                    >
                                      <Index.Box sx={style}>
                                        <ClearIcon
                                          className="model-close-icon"
                                          onClick={handleClose}
                                        />
                                        <Index.Typography
                                          id="modal-modal-title"
                                          variant="h6"
                                          component="h2"
                                        >
                                          <Index.Box>
                                            <img
                                              // src={`${process.env.REACT_APP_IMAGE_URL}/users/${userImg}`}
                                              src={
                                                data?.transactionScreenShort !=
                                                ""
                                                  ? process.env.REACT_APP_IMG +
                                                    userImg
                                                  : ""
                                              }
                                              alt=""
                                              className="deposit-img"
                                            />
                                          </Index.Box>
                                        </Index.Typography>
                                      </Index.Box>
                                    </Index.Modal>
                                  </div>
                                </Index.TableCell> */}
                                    <Index.TableCell>
                                      {data?.userId?.fullName
                                        ? data?.userId?.fullName
                                        : "-"}
                                    </Index.TableCell>
                                    <Index.TableCell>
                                      {data?.userId?.currency
                                        ? data?.userId?.currency
                                        : "-"}
                                    </Index.TableCell>
                                    <Index.TableCell>
                                      {data?.amount ? data?.amount : "-"}
                                    </Index.TableCell>
                                    <Index.TableCell>
                                      {data?.UTRId ? data?.UTRId : "-"}
                                    </Index.TableCell>
                                    <Index.TableCell>
                                      {data?.createdAt
                                        ? Index.moment(data?.createdAt).format(
                                            "DD/MM/YYYY hh:mm A"
                                          )
                                        : "-"}
                                    </Index.TableCell>
                                    <Index.TableCell>
                                      {data?.status ? data?.status : "-"}
                                    </Index.TableCell>
                                    {/* <Index.TableCell>
                                <DoneIcon color="primary" />{" "}
                                <ClearIcon color="error" />
                              </Index.TableCell> */}
                                    <Index.TableCell
                                      className="banner-management-td"
                                      // sx={{ display: "flex" }}
                                    >
                                      {/* <Index.Button
                                      className="table-view-btn"
                                      disableRipple
                                      onClick={() => {
                                        setNotifyUserId(data?.userId._id);
                                        setApprovedId(data?._id);
                                        handleOpenApprovedData();
                                      }}
                                      disabled={data?.status === "Approved"}
                                    >
                                      <DoneIcon color="primary" />{" "}
                                    </Index.Button>
                                    <Index.Button
                                      className="table-view-btn"
                                      disableRipple
                                      onClick={() => {
                                        setNotifyUserId(data?.userId._id);
                                        setRejectedId(data?._id);
                                        handleOpenRejectedData();
                                      }}
                                      disabled={
                                        data?.status === "Approved" ||
                                        data?.status === "Rejected"
                                      }
                                    >
                                      <ClearIcon color="error" />
                                    </Index.Button> */}

                                      {permission?.isAdmin == true ||
                                      (permission?.role?.DepositRequest
                                        ?.update == true &&
                                        permission?.isAdmin == false) ? (
                                        <>
                                          <Index.Button
                                            className="table-view-btn"
                                            disableRipple
                                            onClick={() => {
                                              setNotifyUserId(data?.userId._id);
                                              setApprovedId(data?._id);
                                              setApproveAmount(data?.amount);
                                              handleOpenApprovedData();
                                            }}
                                            // disabled={data?.status === "Approved"}
                                            disabled={
                                              data?.status === "Approved" ||
                                              data?.status === "Rejected"
                                            }
                                          >
                                            <DoneIcon color="primary" />{" "}
                                          </Index.Button>
                                          <Index.Button
                                            className="table-view-btn"
                                            disableRipple
                                            onClick={() => {
                                              setNotifyUserId(data?.userId._id);
                                              setRejectedId(data?._id);
                                              handleOpenRejectedData();
                                            }}
                                            disabled={
                                              data?.status === "Approved" ||
                                              data?.status === "Rejected"
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
                                        data?._id == openModalId ? (
                                          <Index.IconButton
                                            aria-label="expand row"
                                            size="small"
                                          >
                                            <Index.KeyboardArrowUpIcon
                                              onClick={() =>
                                                showDetails(data, "up")
                                              }
                                              sx={{ color: "white" }}
                                            />
                                          </Index.IconButton>
                                        ) : (
                                          <Index.IconButton
                                            aria-label="expand row"
                                            size="small"
                                          >
                                            <Index.KeyboardArrowDownIcon
                                              onClick={() =>
                                                showDetails(data, "down")
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
                                          <Index.KeyboardArrowDownIcon
                                            onClick={() =>
                                              showDetails(data, "down")
                                            }
                                            sx={{ color: "white" }}
                                          />
                                        </Index.IconButton>
                                      )}
                                    </Index.TableCell>
                                  </Index.TableRow>
                                  {showModal && data?._id == openModalId && (
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
                                                <Index.Box className="input-design-div with-border">
                                                  <Index.Typography
                                                    variant="p"
                                                    component="p"
                                                    className="page-title order-loading-title"
                                                  >
                                                    Payment Method
                                                  </Index.Typography>
                                                  <span>
                                                    {data?.UPIMethod
                                                      ? data?.UPIMethod
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
                                                <Index.Box className="input-design-div with-border">
                                                  <Index.Typography
                                                    variant="p"
                                                    component="p"
                                                    className="page-title order-loading-title"
                                                  >
                                                    Reference number
                                                  </Index.Typography>

                                                  {data?.UTRId
                                                    ? data?.UTRId
                                                    : "-"}
                                                </Index.Box>
                                              </Index.Grid>
                                              <Index.Grid
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
                                                    Phone Number
                                                  </Index.Typography>

                                                  {data?.mobileNumber
                                                    ? data?.mobileNumber
                                                    : "-"}
                                                </Index.Box>
                                              </Index.Grid>

                                              <Index.Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={3}
                                              >
                                                <Index.Box className="input-design-div with-border">
                                                  {/* <Index.Typography
                                                    variant="p"
                                                    component="p"
                                                    className="page-title order-loading-title"
                                                  >
                                                    Image
                                                  </Index.Typography> */}
                                                  {data?.transactionScreenShort && (
                                                    <Index.Button
                                                      onClick={() => {
                                                        window.open(
                                                          `${
                                                            process.env
                                                              .REACT_APP_IMG +
                                                            data?.transactionScreenShort
                                                          }`
                                                        );
                                                      }}
                                                      // onClick={() => {
                                                      //   window.open(
                                                      //     `${
                                                      //       "http://localhost:3032/api/images/" +
                                                      //       data?.transactionScreenShort
                                                      //     }`
                                                      //   );
                                                      // }}
                                                    >
                                                      {data?.transactionScreenShort !=
                                                      ""
                                                        ? data?.transactionScreenShort
                                                        : "-"}
                                                    </Index.Button>
                                                  )}
                                                </Index.Box>
                                              </Index.Grid>
                                            </Index.Grid>
                                          </Index.Box>
                                        </Index.Collapse>
                                      </Index.TableCell>
                                    </Index.TableRow>
                                  )}
                                </>
                              ))}
                          </>
                        ) : (
                          <>
                            <Index.NoDataFound colSpan={10} />
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

              <Index.Modal
                open={openApprovedData}
                onClose={handleCloseApprovedData}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-comman-details"
              >
                <Index.Box sx={style} className="modal-comman-inner-style">
                  <ManualDepositApprove
                    handleClose={handleCloseApprovedData}
                    approvedId={approvedId}
                    approveAmount={approveAmount}
                    getDepositRequest={getDepositRequest}
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
                <Index.Box sx={style1}>
                  <ManualDepositReject
                    handleClose={handleCloseRejectedData}
                    rejectedId={rejectedId}
                    getDepositRequest={getDepositRequest}
                  />
                </Index.Box>
              </Index.Modal>
            </Index.Box>
          </>
        )}
      </>
    );
  } else {
    navigate("/admin");
  }
};

export default ManualDepositList;
