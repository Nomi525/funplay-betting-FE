import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PenalityBetting from "./PenalityBetting";
import PropTypes from "prop-types";
import { styled, alpha } from "@mui/material/styles";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import { useParams, useLocation } from "react-router-dom";

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

const GameRules = () => {
  const [tabId, setTabId] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [game, setGame] = useState([]);
  const [selectedId, setSelectedID] = useState({});
  const params = useParams();
  const location = useLocation();
  const row = location?.state?.selectedData;

  const handleChange = (event, newValue) => {
    setTabId(newValue);
  };

  const getAllGamesList = async() => {
  await  DataService.get(Api.ADMIN_GAMES)
      .then((res) => {
        setGameList(res.data.data);
        setTabId(res?.data?.data[0]?._id)
      })
      .catch((e) => {
        // toast.error(
        //   e.response.data.message ? e.response.data.message : e.message
        // );
      });
  };
  useEffect(() => {
    getAllGamesList();
  }, []);

  return (
  
      <Index.Grid container>
        <Index.Grid item mt={3} mb={3} className="viewgame-date">
          <Index.Tabs
            value={tabId}
            onChange={handleChange}
            className="view-game-tab-details"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
         
            {gameList.length &&
              gameList.map((val, index) => {
                return (
                  <Index.Tab
                    label={val.gameName}
                    className="user-details-btn view-game-tab-inner-title"
                    value={val._id}
                  />
                );
              })}
           
             {/* <Index.Tab
              label="Penality Betting"
              {...a11yProps(1)}
              className="view-game-tab-inner-title"
            />
            <Index.Tab
              label="Card Betting"
              {...a11yProps(2)}
              className="view-game-tab-inner-title"
            />
            <Index.Tab
              label=" Color Betting"
              {...a11yProps(3)}
              className="view-game-tab-inner-title"
            />
            <Index.Tab
              label=" Coummnity Betting"
              {...a11yProps(4)}
              className="view-game-tab-inner-title"
            />  */}
         </Index.Tabs>

          <Index.Box className="main-user-details-tab">
            <Index.Box className="main-user-inner-tab">
              {/* 
                  <Index.Box className="flex-main-content-user">
                    <Index.Box className="view-date-picker admin-datepicker-main">
                      <DatePicker format={"DD/MM/YYYY"} className="admin-datepicker-inner" />
                    </Index.Box>
                    <Index.Box className="d-flex align-items-center res-set-search">
                      <Search className="search admin-search-comman">
                        <StyledInputBase
                          placeholder="Search"
                          inputProps={{ "aria-label": "search" }}
                        />
                      </Search>
                    </Index.Box>
                  </Index.Box> */}
            {/* <CustomTabPanel >
            {game?.length &&
              game?.map((val, index) => {
              
                return (
                  <>
                    <NumberBetting gameId={val?._id} gameName={val?.gameName} />
                  </>
               );
            })}  
</CustomTabPanel> */}
            
              <CustomTabPanel  >
                <PenalityBetting tabId={tabId} />
              </CustomTabPanel>

              {/* <CustomTabPanel value={value} index={2}>
                <CardBetting />
              </CustomTabPanel>

              <CustomTabPanel value={value} index={3}>
                <ColorBetting />
              </CustomTabPanel>

              <CustomTabPanel value={value} index={4}>
                <CoummnityBetting />
              </CustomTabPanel> */}
            </Index.Box>
          </Index.Box>
        </Index.Grid>
      </Index.Grid>
 
  );
};
export default GameRules;
