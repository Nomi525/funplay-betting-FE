import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { styled, alpha } from "@mui/material/styles";
// import { styled, alpha } from "@mui/material/styles";
import PagesIndex from "../../../pageIndex";
import PageIndex from "../../../pageIndex";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import FileExcel from "../../../../component/admin/dashbord/FileExcel";
import Loader from "../../../../component/comman/loader/Loader";
import { useSelector } from "react-redux";
// import DeleteUserData from "./DeleteUserData";

// for custom switch design
const IOSSwitch = Index.styled((props) => (
  <Index.Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 34,
  height: 20,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 3,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#2c62de",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 14,
    height: 14,
    boxShadow: "none",
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#8d9ac9" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

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

const UserManagement = () => {
  const navigate = PagesIndex.useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchedData, setSearchedData] = useState([]);
  const [userlist, setUserlist] = useState([]);
  const [excel, setExcel] = useState([]);
  const fileName = "myfile";
  // const [deleteId, setDeleteId] = useState();
  const [loading, setLoading] = useState(false);
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);

  // delete dataGame
  // const handleCloseDeleteData = () => setOpenDeleteData(false);
  // const handleOpenDeleteData = () => setOpenDeleteData(true);

  useEffect(() => {
    const customHeadings = searchedData.map((item) => ({
      "User Name": item?.fullName,
      "User Email": item?.email,
      Referral: item?.referralCode,
      // "Win" : item?.
      // "Loss" : item?.
      "Created Date": Index.moment(item.createdAt).format("DD/MM/YYYY"),
    }));

    setExcel(customHeadings);
  }, [searchedData]);

  const handleActiveStatus = (id) => {
    const data = new URLSearchParams();
    data.append("id", id);
    DataService.post(Api.ADMIN_ACTIVE_DEACTIVE, data).then((res) => {
      toast.success(res.data.message, {
        toastId: "customId",
      });
      getAllUserList();
    });
  };

  const handleView = (userId) => {
    navigate(`/admin/user-management/view/${userId}`);
  };
  // start Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  // End Pagination
  // search
  const handleSearch = (searched) => {
    if (!searched) return setSearchedData(userlist);
    setSearchedData(
      userlist.filter(
        (item) =>
          item?.fullName
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.email
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.referralCode
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          Index.moment(item?.createdAt)
            .format("DD/MM/YYYY")
            ?.toString()
            .toLowerCase()
            .includes(searched.toString().toLowerCase())
      )
    );
    setPage(0);
  };

  useEffect(() => {
    setSearchedData(userlist);
  }, [userlist]);

  // function hideEmail(email) {
  //   if (!email || email === undefined || email === "") {
  //     console.log("inside if", email, typeof email)
  //     return "-";
  //   } else {
  //     console.log("inside else", email)
  //     const [username, domain] = email?.split("@");
  //     const hiddenUsername = username?.substring(0, 2) + "*".repeat((username?.length) - 2);
  //    return hiddenUsername + "@" + domain;
  //   }

  // }

  function hideEmail(email) {
    if (!email || email === undefined || email === "") {
      return "-";
    } else {
      const [username, domain] = email?.split("@");
      if (username && username.length >= 2) {
        const hiddenUsername =
          username.substring(0, 2) + "*".repeat(username.length - 2);
        return hiddenUsername + "@" + domain;
      } else {
        // Handle the case where the username is too short to hide
        return email;
      }
    }
  }

  const hideReferral = (originalString) => {
    const ReferralLength = Math.max(originalString.length - 4, 0);
    const hideReferral =
      originalString.slice(0, 2) +
      "*".repeat(ReferralLength) +
      originalString.slice(-2);
    return hideReferral;
  };

  const getAllUserList = async () => {
    setLoading(true);
    await DataService.get(Api.ADMIN_GET_USER)
      .then((res) => {
        setUserlist(res.data.data);
        setLoading(false);
      })
      .catch((e) => {
        toast.error(
          e.res?.data?.message ? e.res?.data?.message : e.message
          // navigate("/admin/login")
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllUserList();
  }, []);

  if (
    permission?.role?.UserManagement?.View == false &&
    permission?.isAdmin == true
  ) {
    navigate("/admin");
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Index.Box className="page-content-box">
          <Index.Box className="barge-common-box">
            <Index.Box className="title-header">
              <Index.Box className="title-header-flex res-title-header-flex ipad-flex-small-content">
                <Index.Box className="title-main">
                  <Index.Typography
                    variant="p"
                    component="p"
                    className="page-title"
                  >
                    User Management
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

                  {permission?.isAdmin == true ||
                  (permission?.role?.UserManagement?.View == true &&
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
                className="table-container user-manage-container"
              >
                <Index.Table
                  aria-label="simple table"
                  className="table-design-main barge-table table-user-management"
                >
                  <Index.TableHead className="table-user-thead">
                    <Index.TableRow className="table-user-tr">
                      <Index.TableCell className="table-user-th">
                        Name
                      </Index.TableCell>
                      <Index.TableCell className="table-user-th">
                        Email
                      </Index.TableCell>
                      <Index.TableCell className="table-user-th">
                        Referral
                      </Index.TableCell>
                      {/* <Index.TableCell className="table-user-th" align="left">
                        Win
                      </Index.TableCell>
                      <Index.TableCell className="table-user-th" align="left">
                        {" "}
                        Loss
                      </Index.TableCell> */}
                      <Index.TableCell className="table-user-th" align="left">
                        Created Date
                      </Index.TableCell>

                      <Index.TableCell className="table-user-th" align="left">
                        Action
                      </Index.TableCell>
                    </Index.TableRow>
                  </Index.TableHead>
                  <Index.TableBody className="table-user-tbody">
                    {searchedData?.length ? (
                      searchedData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => {
                          return (
                            <Index.TableRow className="table-user-tr">
                              <Index.TableCell
                                align="left"
                                className="table-user-td"
                                onClick={() => {
                                  handleView(item?._id);
                                }}
                              >
                                <Index.Box className="user-name-cursor">
                                  {item?.fullName || "-"}
                                </Index.Box>
                              </Index.TableCell>
                              <Index.TableCell
                                align="left"
                                className="table-user-td"
                              >
                                {/* {item?.email || "-"} */}
                                {hideEmail(item?.email)}
                                {/* {item?.email} */}
                              </Index.TableCell>
                              <Index.TableCell
                                align="left"
                                className="table-user-td"
                              >
                                {/* {item?.referralCode || "-"} */}
                                {item?.referralCode
                                  ? hideReferral(item?.referralCode)
                                  : "-"}
                              </Index.TableCell>
                              {/* <Index.TableCell
                                align="left"
                                className="table-user-td"
                              >
                                -
                              </Index.TableCell>
                              <Index.TableCell
                                align="left"
                                className="table-user-td"
                              >
                                -
                              </Index.TableCell> */}

                              <Index.TableCell
                                align="left"
                                className="table-user-td"
                              >
                                {Index.moment(item.createdAt).format(
                                  "DD/MM/YYYY"
                                )}
                              </Index.TableCell>

                              <Index.TableCell
                                sx={{ display: "flex" }}
                                className="table-user-td"
                              >
                                <Index.Box className="user-manage-view-btn">
                                  {permission?.isAdmin == true ||
                                  (permission?.role?.UserManagement?.View ==
                                    true &&
                                    permission?.isAdmin == false) ? (
                                    <>
                                      <Index.Button
                                        className="table-view-btn"
                                        disableRipple
                                        onClick={() => {
                                          handleView(item?._id);
                                        }}
                                      >
                                        <img
                                          src={PagesIndex.Svg.eye}
                                          className="view-icon-btn"
                                        />
                                      </Index.Button>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {/* <Index.Button
                                  className="table-view-btn"
                                  disableRipple
                                  // onClick={() => {
                                  //   setDeleteId(item?._id);
                                  //   // setDeleteId(item?._id);
                                  //   handleOpenDeleteData();
                                  // }}
                                >
                                  <img
                                    src={PageIndex.Svg.deletetable}
                                    className="view-icon-btn"
                                  />
                                </Index.Button> */}

                                  {permission?.isAdmin == true ||
                                  (permission?.role?.UserManagement?.update ==
                                    true &&
                                    permission?.isAdmin == false) ? (
                                    <>
                                      <Index.Switch
                                        checked={item?.isActive}
                                        onClick={() =>
                                          handleActiveStatus(item?._id)
                                        }
                                        color="success"
                                      />
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </Index.Box>
                              </Index.TableCell>
                            </Index.TableRow>
                          );
                        })
                    ) : (
                      <Index.NoDataFound colSpan={7} />
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
          {/* <Index.Modal
          open={openDeleteData}
          onClose={handleCloseDeleteData}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-comman-details"
        >
          <Index.Box sx={style} className="modal-comman-inner-style">
            <DeleteUserData
              handleClose={handleCloseDeleteData}
              deleteId={deleteId}
              getAllUserList={getAllUserList}
            />
          </Index.Box>
        </Index.Modal> */}
        </Index.Box>
      )}
    </>
  );
};

export default UserManagement;
