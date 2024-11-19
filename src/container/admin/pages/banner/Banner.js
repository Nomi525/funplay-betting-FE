import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import MenuIcon from "@mui/icons-material/MoreVert";
import { styled, alpha } from "@mui/material/styles";
import "../../../../assets/style/global.css";
import PageIndex from "../../../pageIndex";
import { useDispatch, useSelector } from "react-redux";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import moment from "moment";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import DeleteBannerData from "../banner/DeleteBannerData";

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

const Banner = () => {
  //const [addData, setAddData] = useState([]);
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);
  const navigate = PageIndex.useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionIndex, setActionIndex] = useState();
  const [selectedData, setSelectedData] = useState({});
  const [searchedData, setSearchedData] = useState([]);
  const [userlist, setUserlist] = useState([]);

  const [openDeleteData, setOpenDeleteData] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const dispatch = useDispatch();
  const { state } = useLocation();

  // search

  const handleSearch = (searched) => {
    if (!searched) return setSearchedData(userlist);
    setSearchedData(
      userlist.filter((item) =>
        item?.bannerName?.toLowerCase().includes(searched.toLowerCase())
      )
    );
    setPage(0);
  };

  useEffect(() => {
    //setUserlist(userlist);
    setSearchedData(userlist);
  }, [userlist]);

  // Pagination states and methods
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // delete dataGame

  const handleCloseDeleteData = () => setOpenDeleteData(false);
  const handleOpenDeleteData = () => setOpenDeleteData(true);

  // const handleCloseDeleteData = () => {
  //   setOpenDeleteData(false);
  //   setDeleteId("");
  // }
  // const handleOpenDeleteData = () => {
  //   setOpenDeleteData(true);
  //   setDeleteId("");
  // }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  // End Pagination

  const handleClickMenu = (e) => {
    // setDeleteId("");
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    // setDeleteId("");
    setAnchorEl(null);
  };

  const handleView = (selectedData) => {
    navigate("/admin/new-banner/viewpage", { state: { selectedData } });
  };

  const handleEdit = (selectedData) => {
    navigate("/admin/new-banner/edit", { state: { selectedData } });
    // navigate("/admin/new-member/add", { state: { row, edit: "Edit" } });
  };

  useEffect(() => {
    if (anchorEl == false) {
      setSelectedData({});
    }
  }, [anchorEl]);

  // const userDelete = (id) => {
  //   const urlencoded = new URLSearchParams();
  //   urlencoded.append("bannerId", id);
  //     DataService.post(Api.ADMIN_BANNER_DELETE, urlencoded)
  //       .then((res) => {
  //         toast.success(res.data.message);
  //         getAllBannerList();
  //       })
  //       .catch((e) => {
  //         toast.error(
  //           e.response.data.message ? e.response.data.message : e.message
  //         );
  //       });

  // };

  const getAllBannerList = async () => {
    await DataService.get(Api.ADMIN_BANNER)
      .then((res) => {
        setUserlist(res.data.data);
      })
      .catch((e) => {
        // toast.error(
        //   e.response.data.message ? e.response.data.message : e.message
        // );
      });
  };

  useEffect(() => {
    getAllBannerList();
  }, []);

  if (
    permission?.isAdmin == true ||
    (permission?.role?.BannerManagement?.View == true &&
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
                    Banner Management
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

                  {/* <Index.Box className="common-button blue-button res-blue-button mr-btn-right">
            
                </Index.Box> */}

                  <Index.Box className="common-button blue-button res-blue-button w-100-add-btn">
                    <Index.Box className="add-content-banner">
                      {permission?.isAdmin == true ||
                      (permission?.role?.BannerManagement?.create == true &&
                        permission?.isAdmin == false) ? (
                        <>
                          <PageIndex.Link
                            to="/admin/new-banner/add"
                            className="no-text-decoration"
                            //onClick={(e) => handleEdit(e)}
                          >
                            {" "}
                            <Index.Button variant="contained" disableRipple>
                              <img
                                src={PageIndex.Svg.plus}
                                className="plus-main-content"
                              />
                              Add Banner
                            </Index.Button>
                          </PageIndex.Link>
                        </>
                      ) : (
                        <></>
                      )}
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>

            <Index.Box className="">
              <Index.TableContainer
                component={Index.Paper}
                className="table-container banner-manage-container"
              >
                <Index.Table
                  aria-label="simple table"
                  className="table-design-main barge-table banner-management-table"
                >
                  <Index.TableHead className="banner-management-thead">
                    <Index.TableRow className="banner-management-tr">
                      <Index.TableCell className="banner-management-th">
                        Banner Image
                      </Index.TableCell>
                      <Index.TableCell
                        className="banner-management-th"
                        align="left"
                      >
                        Banner Name
                      </Index.TableCell>
                      <Index.TableCell
                        className="banner-management-th"
                        align="left"
                      >
                        Banner Description{" "}
                      </Index.TableCell>

                      {permission.isAdmin == true ||
                      (permission.role?.BannerManagement?.delete == true &&
                        permission.isAdmin == false) ||
                      (permission.role?.BannerManagement?.update == true &&
                        permission.isAdmin == false) ||
                      (permission.role?.BannerManagement?.View == true &&
                        permission.isAdmin == false) ? (
                        <Index.TableCell
                          className="banner-management-th"
                          align="left"
                        >
                          Action
                        </Index.TableCell>
                      ) : (
                        <></>
                      )}
                    </Index.TableRow>
                  </Index.TableHead>
                  <Index.TableBody className="banner-management-tbody">
                    {searchedData.length ? (
                      searchedData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => {
                          console.log(item?.bannerImage);
                          return (
                            <Index.TableRow
                              key={index}
                              className="banner-management-tr"
                            >
                              <Index.TableCell className="banner-management-td">
                                {" "}
                                <img
                                  src={
                                    item?.bannerImage?.length
                                      ? process.env.REACT_APP_IMG +
                                        item?.bannerImage
                                      : PageIndex.Png.usericon
                                  }
                                  className="game-add-member-profile"
                                />
                              </Index.TableCell>
                              <Index.TableCell className="banner-management-td">
                                {item.bannerName}
                              </Index.TableCell>
                              <Index.TableCell className="banner-management-td">
                                <Index.Box className="description-ellipsis-comman">
                                  {item?.bannerDescription || "-"}
                                </Index.Box>
                              </Index.TableCell>
                              <Index.TableCell
                                className="banner-management-td"
                                sx={{ display: "flex" }}
                              >
                                <Index.IconButton
                                  onClick={(e) => {
                                    setSelectedData(item);
                                    handleClickMenu(e);
                                  }}
                                >
                                  {permission?.isAdmin == true ||
                                  (permission?.role?.BannerManagement?.View ==
                                    true &&
                                    permission?.isAdmin == false) ? (
                                    <>
                                      <Index.Button
                                        className="table-view-btn"
                                        onClick={() => {
                                          handleView(item);
                                        }}
                                      >
                                        <img
                                          src={PageIndex.Svg.eye}
                                          className="view-icon-btn"
                                        />
                                      </Index.Button>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  {permission?.isAdmin == true ||
                                  (permission?.role?.BannerManagement?.update ==
                                    true &&
                                    permission?.isAdmin == false) ? (
                                    <>
                                      <Index.Button
                                        className="table-view-btn"
                                        onClick={() => {
                                          handleEdit(item);
                                        }}
                                      >
                                        <img
                                          src={PageIndex.Svg.pencil}
                                          className="view-icon-btn"
                                        />
                                      </Index.Button>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  {permission?.isAdmin == true ||
                                  (permission?.role?.BannerManagement?.delete ==
                                    true &&
                                    permission?.isAdmin == false) ? (
                                    <>
                                      <Index.Button
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
                                      </Index.Button>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  {/* <MenuIcon className="action-menu-icon" /> */}
                                </Index.IconButton>

                                {/* <Index.Menu
                                  id="demo-positioned-menu"
                                  aria-labelledby="demo-positioned-button"
                                  anchorEl={anchorEl}
                                  keepMounted
                                  elevation={2}
                                  open={Boolean(anchorEl)}
                                  onClose={handleCloseMenu}
                                  anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                  }}
                                > 

                                
                                  <ActionItem
                                    className="action-text"
                                    onClick={() => {
                                      handleView()}}
                                  >
                                    {" "}
                                    View
                                  </ActionItem>
                                  <ActionItem
                                    className="action-text"
                                    onClick={() => {
                                      
                                      handleEdit(item,index)
                                    }}
                                  >
                                    {" "}
                                    Edit
                                  </ActionItem>
                                  <ActionItem
                                    className="action-text"
                                    
                                    onClick={() =>{
                                       userDelete(selectedData?._id)
                                       setAnchorEl(null); 
                                    }}

                                    // onClick={() => {
                                    //   handleOpenDeleteData();
                                    //   setDeleteId(item?._id);
                                    //   setAnchorEl(null);
                                    // }}
                                  >
                                    Delete

                                  </ActionItem>
                                </Index.Menu> */}
                              </Index.TableCell>
                            </Index.TableRow>
                          );
                        })
                    ) : (
                      <Index.NoDataFound colSpan={4} />
                    )}
                  </Index.TableBody>
                </Index.Table>
              </Index.TableContainer>
              {searchedData?.length && (
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
              )}
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
              <DeleteBannerData
                handleClose={handleCloseDeleteData}
                deleteId={deleteId}
                getAllBannerList={getAllBannerList}
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

export default Banner;
