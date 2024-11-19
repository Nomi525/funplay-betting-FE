import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { styled, alpha } from "@mui/material/styles";
import "../../../../assets/style/global.css";
import PageIndex from "../../../pageIndex";
import { useDispatch, useSelector } from "react-redux";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import DeleteGameData from "./DeleteGameData";
import FileExcel from "../../../../component/admin/dashbord/FileExcel";
import Loader from "../../../../component/comman/loader/Loader";

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

const GameManagement = () => {
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);
  console.log(permission, "111");
  const navigate = PageIndex.useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionIndex, setActionIndex] = useState();
  const [selectedData, setSelectedData] = useState({});
  const [searchedData, setSearchedData] = useState([]);
  const [gamelist, setGamelist] = useState([]);
  const [openDeleteData, setOpenDeleteData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const dispatch = useDispatch();
  const { state } = useLocation();
  // Pagination states and methods
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // delete dataGame
  const handleCloseDeleteData = () => setOpenDeleteData(false);
  const handleOpenDeleteData = () => setOpenDeleteData(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  // End Pagination
  const handleClickMenu = (e, index) => {
    setActionIndex(index);
    setAnchorEl(e.currentTarget);
  };
  // search
  const handleSearch = (searched) => {
    if (!searched) return setSearchedData(gamelist);
    setSearchedData(
      gamelist.filter(
        (item) =>
          item?.gameName
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.gameDuration
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
    setSearchedData(gamelist);
  }, [gamelist]);

  const [excel, setExcel] = useState([]);
  const fileName = "myfile";

  useEffect(() => {
    const customHeadings = searchedData.map((item) => ({
      "Game Name": item?.gameName,
      "Start Time": item?.gameDurationFrom,
      "End Time": item?.gameDurationTo,
      "Start Date": Index.moment(item.gameTimeFrom).format("DD-MM-YYYY"),
      "End Date": Index.moment(item.gameTimeTo).format("DD-MM-YYYY"),
      "Created Date": Index.moment(item.createdAt).format("YYYY-MM-DD h:mm A"),
    }));
    setExcel(customHeadings);
  }, [searchedData]);

  const handlePlusView = (selectedData) => {
    navigate("/admin/new-game/pluspage", { state: { selectedData } });
  };
  const handleGame = (selectedData) => {
    navigate("/admin/game-rules", { state: { selectedData } });
  };
  const handleView = (selectedData) => {
    navigate("/admin/new-game/viewpage", { state: { selectedData } });
  };

  const handleEdit = (selectedData, gameId) => {
    console.log(selectedData, "selectedData");

    // navigate("/admin/new-game/edit", { state: { selectedData } });
    if (selectedData.gameName === "Community Betting") {
      navigate("/admin/Add-community-betting", { state: { selectedData } });
    } else {
      navigate("/admin/new-game/edit", { state: { selectedData } });
    }
  };

  useEffect(() => {
    if (anchorEl == false) {
      setSelectedData({});
    }
  }, [anchorEl]);

  const getAllGamesList = async () => {
    setLoading(true);
    await DataService.get(Api.ADMIN_GAMES)
      .then((res) => {
        setLoading(false);
        setGamelist(res.data.data);
      })
      .catch((e) => {
        // toast.error(
        //   e.response.data.message ? e.response.data.message : e.message
        // );
      });
  };

  const handleActiveStatus = (id) => {
    const data = new URLSearchParams();
    data.append("gameId", id);
    DataService.post(Api.ADMIN_GAME_ACTIVE, data).then((res) => {
      toast.success(res.data.message);
      getAllGamesList();
    });
  };

  useEffect(() => {
    getAllGamesList();
  }, []);

  const [anchorsEl, setAnchorsEl] = React.useState(null);
  const opendots = Boolean(anchorsEl);
  const handleClickdots = (event) => {
    setAnchorsEl(event.currentTarget);
  };
  const handleClosedots = () => {
    setAnchorsEl(null);
  };

  if (
    permission?.isAdmin == true ||
    (permission?.role?.GameManagement?.View == true &&
      permission?.isAdmin == false)
  ) {
    return (
      <>
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
                    Game Management
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
                  (permission?.role?.GameManagement?.View == true &&
                    permission?.isAdmin == false) ? (
                    <>
                      <Index.Box className="common-button blue-button res-blue-button">
                        {/* <PageIndex.Link
                    to="/admin/new-game/add"
                    className="no-text-decoration"
                    //onClick={(e) => handleEdit(e)}
                  >
                    {" "}
                    <Index.Button variant="contained" disableRipple>
                      <img
                        src={PageIndex.Svg.plus}
                        className="plus-main-content"
                      />
                      Add Game
                    </Index.Button>
                  </PageIndex.Link> */}
                        <FileExcel apiData={excel} fileName={fileName} />
                      </Index.Box>
                    </>
                  ) : (
                    <></>
                  )}
                  <Index.Box></Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>

            <Index.Box className="">
              <Index.TableContainer
                component={Index.Paper}
                className="table-container table-game-container"
              >
                <Index.Table
                  aria-label="simple table"
                  className="table-design-main barge-table table-main-game"
                >
                  <Index.TableHead className="table-head-game">
                    <Index.TableRow className="table-head-tr">
                      <Index.TableCell className="table-head-th">
                        Game Image
                      </Index.TableCell>
                      <Index.TableCell className="table-head-th" align="left">
                        Game Name
                      </Index.TableCell>
                      <Index.TableCell className="table-head-th" align="left">
                        Start Time
                      </Index.TableCell>
                      <Index.TableCell className="table-head-th" align="left">
                        End Time
                      </Index.TableCell>
                      {/* <Index.TableCell className="table-head-th" align="left">
                      Member
                    </Index.TableCell> */}
                      <Index.TableCell className="table-head-th" align="left">
                        Created Date
                      </Index.TableCell>
                      <Index.TableCell className="table-head-th" align="left">
                        Start Date
                      </Index.TableCell>
                      <Index.TableCell className="table-head-th" align="left">
                        End Date
                      </Index.TableCell>

                      {permission.isAdmin == true ||
                      (permission.role?.GameManagement?.View == true &&
                        permission.isAdmin == false) ||
                      (permission.role?.GameManagement?.update == true &&
                        permission.isAdmin == false) ||
                      (permission.role?.GameManagement?.delete == true &&
                        permission.isAdmin == false) ? (
                        <Index.TableCell className="table-head-th" align="left">
                          Action
                        </Index.TableCell>
                      ) : (
                        <></>
                      )}
                    </Index.TableRow>
                  </Index.TableHead>
                  <Index.TableBody className="table-head-tbody">
                    {searchedData?.length ? (
                      searchedData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => {
                          return (
                            <Index.TableRow
                              key={index}
                              className="table-head-tr"
                            >
                              <Index.TableCell className="table-head-td">
                                {" "}
                                <img
                                  src={
                                    item?.gameImage
                                      ? process.env.REACT_APP_IMG +
                                        item?.gameImage
                                      : PageIndex.Png.usericon
                                  }
                                  className="game-add-member-profile"
                                />
                              </Index.TableCell>
                              <Index.TableCell className="table-head-td">
                                {item.gameName}{" "}
                              </Index.TableCell>
                              <Index.TableCell className="table-head-td">
                                {item?.gameDurationFrom || "-"}
                              </Index.TableCell>
                              <Index.TableCell className="table-head-td">
                                {item?.gameDurationTo || "-"}
                              </Index.TableCell>
                              {/* <Index.TableCell className="table-head-td">
                              -
                            </Index.TableCell> */}
                              <Index.TableCell className="table-head-td">
                                {Index.moment(item.createdAt).format(
                                  "YYYY-MM-DD h:mm A"
                                )}
                              </Index.TableCell>
                              <Index.TableCell className="table-head-td">
                                {Index.moment(item.gameTimeFrom).format(
                                  "DD-MM-YYYY"
                                )}
                              </Index.TableCell>
                              <Index.TableCell className="table-head-td">
                                {Index.moment(item.gameTimeTo).format(
                                  "DD-MM-YYYY"
                                )}
                              </Index.TableCell>
                              <Index.TableCell
                                className="table-head-td"
                                sx={{ display: "flex" }}
                              >
                                {permission?.isAdmin == true ||
                                (permission?.role?.GameManagement?.update ==
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
                                <Index.IconButton
                                  onClick={(e) => {
                                    setSelectedData(item);
                                    handleClickMenu(e, index);
                                  }}
                                >
                                  {/* <Index.Button
                                  className="table-view-btn"
                                  onClick={() => {
                                    handlePlusView(item);
                                  }}
                                >
                                  <img
                                    src={PageIndex.Png.plustable}
                                    className="view-icon-btn"
                                  />
                                </Index.Button> */}
                                  {/* <Index.Button
                                  className="table-view-btn"
                                  onClick={() => {
                                    handleGame(item);
                                  }}
                                >
                                  <img
                                    src={PageIndex.Png.plan}
                                    className="view-icon-btn"
                                  />
                                </Index.Button> */}
                                  {/* <Index.Button
                                  className="table-view-btn"
                                  onClick={() => {
                                    handleView(item);
                                  }}
                                >
                                  <img
                                    src={PageIndex.Svg.eye}
                                    className="view-icon-btn"
                                  />
                                </Index.Button> */}
                                  {/* <Index.Button
                                  className="table-view-btn"
                                  onClick={() => {
                                    handleEdit(item);
                                  }}
                                >
                                  <img
                                    src={PageIndex.Svg.pencil}
                                    className="view-icon-btn"
                                  />
                                </Index.Button> */}
                                  {/* <Index.Button
                                  className="table-view-btn"
                                  disableRipple
                                  onClick={() => {
                                    setDeleteId(item?._id);
                                    // setDeleteId(item?._id);
                                    handleOpenDeleteData();
                                  }}
                                >
                                  <img
                                    src={PageIndex.Svg.deletetable}
                                    className="view-icon-btn"
                                  />
                                </Index.Button> */}

                                  <Index.Box className="dots-details-btn">
                                    <Index.Button
                                      className="dots-btn-game"
                                      id="fade-button"
                                      aria-controls={
                                        opendots ? "fade-menu" : undefined
                                      }
                                      aria-haspopup="true"
                                      aria-expanded={
                                        opendots ? "true" : undefined
                                      }
                                      onClick={handleClickdots}
                                    >
                                      <img
                                        src={PageIndex.Png.dots}
                                        className="dots-hight"
                                      />
                                    </Index.Button>
                                    <Index.Menu
                                      className="dot-menu-details"
                                      id="fade-menu"
                                      MenuListProps={{
                                        "aria-labelledby": "fade-button",
                                      }}
                                      anchorEl={anchorsEl}
                                      open={opendots}
                                      transformOrigin={{
                                        horizontal: "right",
                                        vertical: "top",
                                      }}
                                      anchorOrigin={{
                                        horizontal: "right",
                                        vertical: "bottom",
                                      }}
                                      onClose={handleClosedots}
                                    >
                                      {permission?.isAdmin == true ||
                                      (permission?.role?.GameManagement
                                        ?.update == true &&
                                        permission?.isAdmin == false) ? (
                                        <>
                                          <Index.MenuItem
                                            onClick={() => {
                                              handlePlusView(
                                                searchedData?.[actionIndex]
                                              );
                                            }}
                                            className="dot-menuitem-details"
                                          >
                                            <Index.Button
                                              className="table-view-btn"
                                              onClick={() => {
                                                handlePlusView(
                                                  searchedData?.[actionIndex]
                                                );
                                              }}
                                            >
                                              Game Time
                                            </Index.Button>
                                          </Index.MenuItem>
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      {permission?.isAdmin == true ||
                                      (permission?.role?.GameManagement
                                        ?.update == true &&
                                        permission?.isAdmin == false) ? (
                                        <>
                                          <Index.MenuItem
                                            onClick={() => {
                                              handleGame(
                                                searchedData?.[actionIndex]
                                              );
                                            }}
                                            className="dot-menuitem-details"
                                          >
                                            <Index.Button
                                              className="table-view-btn"
                                              onClick={() => {
                                                handleGame(
                                                  searchedData?.[actionIndex]
                                                );
                                              }}
                                            >
                                              Game Rule
                                            </Index.Button>
                                          </Index.MenuItem>
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      {permission?.isAdmin == true ||
                                      (permission?.role?.GameManagement?.View ==
                                        true &&
                                        permission?.isAdmin == false) ? (
                                        <>
                                          <Index.MenuItem
                                            onClick={() => {
                                              handleView(
                                                searchedData?.[actionIndex]
                                              );
                                            }}
                                            className="dot-menuitem-details"
                                          >
                                            <Index.Button
                                              className="table-view-btn"
                                              onClick={() => {
                                                handleView(
                                                  searchedData?.[actionIndex]
                                                );
                                              }}
                                            >
                                              View
                                            </Index.Button>
                                          </Index.MenuItem>
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      {permission?.isAdmin == true ||
                                      (permission?.role?.GameManagement
                                        ?.update == true &&
                                        permission?.isAdmin == false) ? (
                                        <>
                                          <Index.MenuItem
                                            // onClick={handleClosedots}
                                            onClick={() => {
                                              handleEdit(
                                                searchedData?.[actionIndex]
                                              );
                                            }}
                                            className="dot-menuitem-details"
                                          >
                                            <Index.Button
                                              className="table-view-btn"
                                              onClick={() => {
                                                handleEdit(
                                                  searchedData?.[actionIndex]
                                                );
                                              }}
                                            >
                                              Edit
                                            </Index.Button>
                                          </Index.MenuItem>
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      {/* {permission?.isAdmin == true ||
                                      (permission?.role?.GameManagement
                                        ?.delete == true &&
                                        permission?.isAdmin == false) ? (
                                        <>
                                          <Index.MenuItem
                                            onClick={handleClosedots}
                                            className="dot-menuitem-details"
                                          >
                                            <Index.Button
                                              className="table-view-btn"
                                              disableRipple
                                              onClick={() => {
                                                setDeleteId(item?._id);
                                                handleOpenDeleteData();
                                              }}
                                            >
                                              Delete
                                            </Index.Button>
                                          </Index.MenuItem>
                                        </>
                                      ) : (
                                        <></>
                                      )} */}
                                    </Index.Menu>
                                  </Index.Box>
                                </Index.IconButton>
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
              ) : ""}
            </Index.Box>
          </Index.Box>
          <Index.Modal
            open={openDeleteData}
            onClose={handleCloseDeleteData}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-comman-details"
          >
            <Index.Box sx={style} className="modal-comman-inner-style">
              <DeleteGameData
                handleClose={handleCloseDeleteData}
                deleteId={deleteId}
                getAllGamesList={getAllGamesList}
              />
            </Index.Box>
          </Index.Modal>
        </Index.Box>
      </>
    );
  } else {
    navigate("/admin");
  }
};

export default GameManagement;
