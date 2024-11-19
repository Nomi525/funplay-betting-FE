import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PagesIndex from "../../../pageIndex";
import { styled, alpha } from "@mui/material/styles";
import Transaction from "../transaction/Transaction";
import PropTypes from "prop-types";
import BankDetails from "./BankDetails";
import CreditDebit from "./CreditDebit";
import Game from "./Game";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import UserWallet from "./UserWallet";
import Loader from "../../../../component/comman/loader/Loader";
import { useSelector } from "react-redux";
import UserTransaction from "./UserTransaction";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Index.Typography>{children}</Index.Typography>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const StyledBadge = styled(Index.Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

const shapeCircleStyles = { borderRadius: "50%" };
const rectangle = <Index.Box component="span" />;
const circle = <Index.Box component="span" sx={{ ...shapeCircleStyles }} />;

const ViewGame = () => {
  const navigate = PagesIndex.useNavigate();
  const params = useParams();
  const [value, setValue] = useState(0);
  const [userView, setUserView] = useState([]);
  const [loading, setLoading] = useState(false);
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUserManagement = () => {
    navigate("/admin/user-management");
  };

  const getUserDetails = async (id) => {
    setLoading(true);
    const urlencoded = new URLSearchParams();
    urlencoded.append("userId", id);
    await DataService.post(Api.ADMIN_SINGLE_USER, urlencoded)
      .then((res) => {
        setUserView(res.data.data);
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.res?.data?.message ? e.res?.data?.message : e.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    getUserDetails(params?.id);
  }, [params?.id]);

  // if (
  //   permission?.role?.UserManagement?.View == false &&
  //   permission?.isAdmin == true
  // ) {
  //   navigate("/admin");
  // }
  console.log(userView?.wallet?.[0]?.isConnected, "user");
  return (
    <>
      <Index.Box className="admin-comman-title-right">
        <Index.Box className="flex-user-management-inner">
          <Index.Typography
            className="admin-page-title hover"
            variant="p"
            component="p"
            onClick={() => handleUserManagement()}
          >
            User Management
          </Index.Typography>
          <Index.ArrowForwardIosIcon className="ArrowForwardIosIcon-icon-right" />
          <Index.Typography
            className="admin-page-title inner-sub-title"
            variant="p"
            component="p"
          >
            User Details
          </Index.Typography>
        </Index.Box>
      </Index.Box>

      <Index.Box className="page-content-box view-box">
        {loading ? (
          <Loader />
        ) : (
          <Index.Box className="barge-common-box">
            <Index.Box className="">
              <Index.Grid container sx={{ alignItems: "center" }}>
                <Index.Grid item xs={12} sm={12} md={2} lg={1}>
                  <Index.Box className="input-design-div with-border">
                    <label htmlFor="upload-photo">
                      <Index.Box mb={3}>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent=" "
                        >
                          {rectangle}
                          <Index.Avatar
                            src={userView?.profile || "-"}
                            className="view-game-img"
                          >
                            <img
                              src={
                                userView?.profile
                                  ? process.env.REACT_APP_IMG +
                                    userView?.profile
                                  : PagesIndex.Png.user
                              }
                              className="view-game-img"
                              alt="bell"
                            ></img>
                          </Index.Avatar>
                        </StyledBadge>
                      </Index.Box>
                    </label>
                  </Index.Box>
                </Index.Grid>
                <Index.Grid item xs={12} sm={12} md={10} lg={11}>
                  <Index.List className="list-user-game">
                    <Index.ListItem className="user-manage-details-inner">
                      <Index.Box className="flex-user-manage">
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-label line-height user-title-management"
                        >
                          User Name :
                        </Index.Typography>
                        <Index.Typography
                          variant="p"
                          component="p"
                          className="input-user-desc"
                        >
                          {userView?.fullName || "-"}
                        </Index.Typography>
                      </Index.Box>
                    </Index.ListItem>
                    <Index.ListItem className="user-manage-details-inner">
                      <Index.Box className="flex-user-manage">
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-label line-height user-title-management"
                        >
                          Email Id :
                        </Index.Typography>
                        <Index.Typography
                          variant="p"
                          component="p"
                          className="input-user-desc"
                        >
                          {userView?.email || "-"}
                        </Index.Typography>
                      </Index.Box>
                    </Index.ListItem>
                    <Index.ListItem className="user-manage-details-inner">
                      <Index.Box className="flex-user-manage">
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-label line-height user-title-management"
                        >
                          Current Funds :
                        </Index.Typography>
                        <Index.Typography
                          variant="p"
                          component="p"
                          className="input-user-desc"
                        >
                          {Number(userView?.convertedCoin)?.toFixed(2) || 0}
                        </Index.Typography>
                      </Index.Box>
                    </Index.ListItem>
                    <Index.ListItem className="user-manage-details-inner">
                      <Index.Box className="flex-user-manage">
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-label line-height user-title-management"
                        >
                          Wallet Connected :
                        </Index.Typography>
                        <Index.Typography
                          variant="p"
                          component="p"
                          className="input-user-desc"
                        >
                          {userView?.wallet?.[0]?.isConnected ? "Yes" : "No"}

                          {/* {userView?.walletConnected} */}
                        </Index.Typography>
                      </Index.Box>
                    </Index.ListItem>
                    <Index.ListItem className="user-manage-details-inner">
                      <Index.Box className="flex-user-manage">
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-label line-height user-title-management"
                        >
                          Total Referral :
                        </Index.Typography>
                        <Index.Typography
                          variant="p"
                          component="p"
                          className="input-user-desc"
                        >
                          {userView?.useReferralCodeUsers?.length}
                        </Index.Typography>
                      </Index.Box>
                    </Index.ListItem>
                    <Index.ListItem className="user-manage-details-inner">
                      <Index.Box className="flex-user-manage">
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-label line-height user-title-management"
                        >
                          User Registration Date :
                        </Index.Typography>
                        <Index.Typography
                          variant="p"
                          component="p"
                          className="input-user-desc"
                        >
                          {Index.moment(userView?.createdAt).format(
                            "DD/MM/YYYY"
                          )}
                        </Index.Typography>
                      </Index.Box>
                    </Index.ListItem>
                  </Index.List>
                </Index.Grid>
              </Index.Grid>
            </Index.Box>
          </Index.Box>
        )}

        <Index.Box>
          <Index.Grid container>
            <Index.Grid item mt={3} mb={3} className="viewgame-date">
              <Index.Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                className="view-game-tab-details"
              >
                <Index.Tab
                  label="Transaction"
                  className="user-details-btn view-game-tab-inner-title"
                  {...a11yProps(0)}
                />
                <Index.Tab
                  label="Banking Info "
                  {...a11yProps(1)}
                  className="view-game-tab-inner-title"
                />
                <Index.Tab
                  label="Credit/Debit"
                  {...a11yProps(2)}
                  className="view-game-tab-inner-title"
                />
                <Index.Tab
                  label=" User Wallet Info"
                  {...a11yProps(3)}
                  className="view-game-tab-inner-title"
                />
                <Index.Tab
                  label=" My Referral"
                  {...a11yProps(4)}
                  className="view-game-tab-inner-title"
                />
                <Index.Tab
                  label=" Game"
                  {...a11yProps(5)}
                  className="view-game-tab-inner-title"
                />
              </Index.Tabs>

              <Index.Box className="main-user-details-tab">
                <Index.Box className="main-user-inner-tab">
                  <CustomTabPanel value={value} index={0}>
                    <Index.Box className="transaction-bg-details-user">
                      {/* <Transaction userId={params?.id} /> */}
                      <UserTransaction
                        userId={params?.id}
                        getUserDetails={getUserDetails}
                      />
                    </Index.Box>
                  </CustomTabPanel>

                  <CustomTabPanel value={value} index={1}>
                    {/* <BankDetails bankdetails={userView} /> */}
                    <BankDetails userData={userView} />
                  </CustomTabPanel>

                  <CustomTabPanel value={value} index={2}>
                    <CreditDebit userId={params?.id} />
                  </CustomTabPanel>

                  <CustomTabPanel value={value} index={3}>
                    <UserWallet userData={userView} />
                  </CustomTabPanel>

                  <CustomTabPanel value={value} index={4}>
                    <PagesIndex.MyReferral userData={userView} />
                  </CustomTabPanel>

                  <CustomTabPanel value={value} index={5}>
                    <PagesIndex.Game userData={userView} />
                  </CustomTabPanel>
                </Index.Box>
              </Index.Box>
            </Index.Grid>
          </Index.Grid>
        </Index.Box>
      </Index.Box>
    </>
  );
};

export default ViewGame;
