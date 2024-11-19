import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import MenuIcon from "@mui/icons-material/MoreVert";
import { styled, alpha } from "@mui/material/styles";
import "../../../../assets/style/global.css";
import PageIndex from "../../../pageIndex";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

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

const BannerManagement = () => {
    const navigate = PageIndex.useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [actionIndex, setActionIndex] = useState();
    const dispatch = useDispatch();


    const handleClickMenu = (e) => {
        setActionIndex();
        setAnchorEl(e.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };



    return (
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
                                    Banner Management
                                </Index.Typography>
                            </Index.Box>

                            <Index.Box className="d-flex align-items-center res-set-search">
                                <Search className="search admin-search-comman">
                                    <StyledInputBase
                                        placeholder="Search"
                                        inputProps={{ "aria-label": "search" }}
                                    />
                                </Search>

                                <Index.Box className="common-button blue-button res-blue-button ">
                                    <PageIndex.Link
                                        // to="/admin/new-game/add"
                                        className="no-text-decoration"
                                    //onClick={(e) => handleEdit(e)}
                                    >
                                        {" "}
                                        <Index.Button variant="contained" disableRipple>
                                        <img src={PageIndex.Svg.plus} className="plus-main-content"/>
                                            Add Banner
                                        </Index.Button>
                                    </PageIndex.Link>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Box>
                    <Index.Grid container spacing={3} mb={2}></Index.Grid>

                    <Index.Box className="">
                        <Index.TableContainer
                            component={Index.Paper}
                            className="table-container"
                        >
                            <Index.Table
                                aria-label="simple table"
                                className="table-design-main barge-table banner-management-table"
                            >
                                <Index.TableHead>
                                    <Index.TableRow>
                                        <Index.TableCell>Banner Image</Index.TableCell>
                                        <Index.TableCell align="left">Banner Name</Index.TableCell>
                                        <Index.TableCell align="left">Description</Index.TableCell>
                                        <Index.TableCell align="left">Action</Index.TableCell>
                                    </Index.TableRow>
                                </Index.TableHead>
                                <Index.TableBody>
                                    <Index.TableRow>
                                        <Index.TableCell>
                                            {" "}
                                            <img
                                                src={PageIndex.Png.deposit}
                                                className="deposit-banner-img"
                                            />
                                        </Index.TableCell>
                                        <Index.TableCell>Community Management</Index.TableCell>
                                        <Index.TableCell>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Index.TableCell>
                                        <Index.TableCell sx={{ display: "flex" }}>
                                            
                                            <PageIndex.Link className="table-view-btn" disableRipple >
                                                <img src={PageIndex.Svg.eye} className="view-icon-btn" />
                                            </PageIndex.Link>
                                            <PageIndex.Link className="table-view-btn" disableRipple>
                                                <img src={PageIndex.Svg.pencil} className="view-icon-btn" />
                                            </PageIndex.Link >
                                            <PageIndex.Link className="table-view-btn" disableRipple  >
                                                <img src={PageIndex.Svg.deletetable} className="view-icon-btn" />
                                            </PageIndex.Link >
                                        </Index.TableCell>
                                    </Index.TableRow>
                                    {/* ))
                  ) : (
                    <Index.TableRow>
                      <Index.TableCell
                        component="td"
                        variant="td"
                        scope="row"
                        className="no-data-in-list"
                        colSpan={12}
                        align="center"
                      >
                        No data available
                      </Index.TableCell>
                    </Index.TableRow>
                  ) */}
                                </Index.TableBody>
                            </Index.Table>
                        </Index.TableContainer>
                    </Index.Box>
                    <Index.Box className="pagination-design flex-end">
                        <Index.Stack spacing={2}>
                            <Index.Pagination
                            className="paginationColor"
                            // count={count}
                            // page={currentPage}
                            // onChange={handlePageChange}
                            />
                        </Index.Stack>
                    </Index.Box>
                </Index.Box>
            </Index.Box>
        </>
    );
};

export default BannerManagement;
