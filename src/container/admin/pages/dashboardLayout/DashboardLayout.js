import React, { useEffect, useState } from "react";
import Index from "../../../../component/Index";
import Sidebar from "../../../../component/admin/defaultLayout/Sidebar";
import "./dashboard.css";
import "./dashboard.responsive.css";
import PageIndex from "../../../pageIndex";
import { toast } from "react-toastify";
import { NavLink, useLocation } from "react-router-dom";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/admin/adminslice/AdminSlice";
import { styled, alpha } from "@mui/material/styles";
import { io } from "socket.io-client";
// const ENDPOINT = "http://192.168.1.7:3032";
const ENDPOINT = "https://bett.appworkdemo.com";

var socket;

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

const DashboardLayout = () => {
  const navigate = PageIndex.useNavigate();
  const [profileList, setProfileList] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const dispatch = useDispatch();
  const [notifyUser, setNotifyUser] = useState(false);
  const [notifyUserId, setNotifyUserId] = useState("");
  const flag = useLocation().state?.flag;
  const adminData = useSelector((state) => state.AdminReducer.adminData);

  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
    document.body.classList["add"]("menu-set-main");
  };

  const handleClose2 = () => {
    setAnchorEl(null);
    document.body.classList["remove"]("menu-set-main");
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out successfully", {
      toastId: "customId",
    });
  };

  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList[open ? "add" : "remove"]("body-no-class");
  }, [open]);

  const getAllProfileData = async () => {
    await DataService.get(Api.PROFILE_GET)
      .then((res) => {
        setProfileList(res?.data?.data);
      })
      .catch((e) => {
        toast.error(
          e.response?.data?.message ? e.response?.data?.message : e?.message,
          {
            toastId: "customId",
          }
        );
      });
  };

  useEffect(() => {
    getAllProfileData();
  }, [flag]);

  // const handleSearch = (searched) => {
  //   // if (!searched) return setSearchedData(transactionData);
  //   let result = filterData.filter(
  //     (item) =>
  //       item?.userId?.fullName
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(searched.toLowerCase()) ||
  //       item?.userId?.email
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(searched.toLowerCase()) ||
  //       item?.tokenName
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(searched.toLowerCase()) ||
  //       item?.tokenAmount
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(searched.toLowerCase()) ||

  //       Index.moment(item?.createdAt)
  //         .format("DD/MM/YYYY")
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(searched.toString().toLowerCase())
  //   )
  //   // setSearchedData(
  //   //   result
  //   // );
  //   // setPage(0);
  // };
  useEffect(() => {
    socket = io(Api.common.BASE_URL);
    let data = {
      room_id: 2,
      userId: adminData?._id,
      isAdmin: true,
    };
    socket.emit("join-notification-room", data);
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (notifyUserId) {
      console.log({ notifyUserId });
      socket.emit("new-notification", notifyUserId);
    }
  }, [notifyUser]);

  return (
    <div className="main-dashboard">
      <Index.Box
        className={`${open ? "overlay" : ""}`}
        onClick={() => setOpen((e) => !e)}
      ></Index.Box>
      <Sidebar setOpen={setOpen} open={open} />
      <Index.Box className="right-dashboard-content">
        <Index.Box className={`main-header ${!open ? "" : "pl-none"}`}>
          <Index.Box
            className="collapse-btn"
            onClick={() => setOpen((e) => !e)}
          >
            <img src={PageIndex.Svg.collapse} />
          </Index.Box>
          <Index.Box className="head-right">
            {/* <img src={PageIndex.Svg.search} className="search-icon" /> */}

            {/* <Search className="search admin-search-comman">
                  <StyledInputBase
                    placeholder="Search"
                    inputProps={{ "aria-label": "search" }}
                    // onChange={(e) => handleSearch(e.target.value)}
                  />
                </Search> */}

            <img src={PageIndex.Svg.bell} className="bell-icon" />
          </Index.Box>

          <Index.Box className="admin-header-right">
            <Index.Box className="admin-header-drop-main">
              <Index.Button
                className="drop-header-btn"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick2}
              >
                <Index.Box className="head-right">
                  <Index.Box className="header-user-detail">
                    <Index.Typography variant="p" className="head-user-title">
                      {profileList?.firstName}
                    </Index.Typography>
                    <Index.Typography variant="p" className="head-user-mail">
                      {profileList?.email}
                    </Index.Typography>
                  </Index.Box>
                  <img
                    src={
                      profileList?.profile
                        ? process.env.REACT_APP_IMG + profileList?.profile
                        : PageIndex.Png.usericon
                    }
                    // src={PageIndex.Png.usericon}
                    className="headprofile"
                  />
                </Index.Box>
              </Index.Button>
            </Index.Box>
            <Index.Menu
              className="drop-header-menu admin-header-profile-ul"
              id="basic-menu"
              anchorEl={anchorEl}
              open={open2}
              onClose={handleClose2}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <PageIndex.Link to="/admin/edit-profile">
                <Index.MenuItem
                  onClick={handleClose2}
                  className="drop-header-menuitem"
                >
                  <img
                    src={PageIndex.Svg.profilegrey}
                    className="drop-header"
                  />{" "}
                  Profile
                </Index.MenuItem>
              </PageIndex.Link>
              <PageIndex.Link to="/admin/change-password">
                <Index.MenuItem
                  onClick={handleClose2}
                  className="drop-header-menuitem"
                >
                  <img src={PageIndex.Svg.settings} className="drop-header" />
                  Change Password
                </Index.MenuItem>
              </PageIndex.Link>
              <PageIndex.Link to="/admin/login">
                <Index.MenuItem
                  onClick={() => {
                    handleLogout();
                  }}
                  className="drop-header-menuitem logout-profile"
                >
                  <img src={PageIndex.Svg.logout} className="drop-header" />
                  Logout
                </Index.MenuItem>
              </PageIndex.Link>
            </Index.Menu>
          </Index.Box>
        </Index.Box>
        <Index.Box className="middle-content-scroll">
          <Index.Box
            className={`admin-panel-content ${!open ? "" : "pl-none"}`}
          >
            <PageIndex.Outlet
              context={{
                notifyUser,
                setNotifyUser,
                notifyUserId,
                setNotifyUserId,
              }}
            />
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </div>
  );
};

export default DashboardLayout;
