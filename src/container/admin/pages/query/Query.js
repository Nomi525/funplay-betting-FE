import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import MenuIcon from "@mui/icons-material/MoreVert";
import { styled, alpha } from "@mui/material/styles";
import "../../../../assets/style/global.css";
import PagesIndex from "../../../pageIndex";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import "../../../../assets/style/global.css";
import PageIndex from "../../../pageIndex";

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

const Query = () => {
  const [queryData, setQueryData] = useState([]);
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);
  console.log(permission, "111");
  const navigate = PagesIndex.useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionIndex, setActionIndex] = useState();
  const dispatch = useDispatch();

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

  const handleView = (queryData) => {
    navigate("/admin/viewquery", { state: { queryData } });
  };

  async function smpFunc() {
    const urlencoded = new URLSearchParams();
    // urlencoded.append("transactionId", "transactionId");
    // urlencoded.append("requestType", "requestType");
    await DataService.get(Api.ADMIN_GET_QUERY, urlencoded)
      .then((res) => {
        setQueryData(res.data ? res.data.data : "No query availale");
      })
      .catch((e) => {
        //   toast.error(e.response.data.message ? e.response.data.message : e.message );
      });
  }

  useEffect(() => {
    smpFunc();
  }, []);

  if (
    permission?.isAdmin == true ||
    (permission?.role?.Query?.View == true && permission?.isAdmin == false)
  ) {
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
                    Query
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Box>
            <Index.Grid container spacing={3} mb={2}></Index.Grid>

            <Index.Box className="">
              <Index.TableContainer
                component={Index.Paper}
                className="table-container query-table-container"
              >
                <Index.Table
                  aria-label="simple table"
                  className="table-design-main  barge-table query-table-details"
                >
                  <Index.TableHead className="query-table-head">
                    <Index.TableRow className="query-table-tr">
                      <Index.TableCell className="query-table-th">
                        Name
                      </Index.TableCell>
                      <Index.TableCell className="query-table-th">
                        Email
                      </Index.TableCell>
                      <Index.TableCell className="query-table-th" align="left">
                        Phone Number
                      </Index.TableCell>
                      <Index.TableCell className="query-table-th" align="left">
                        Description
                      </Index.TableCell>
                      <Index.TableCell className="query-table-th" align="left">
                        Action
                      </Index.TableCell>
                    </Index.TableRow>
                  </Index.TableHead>
                  <Index.TableBody className="query-table-tbody">
                    {queryData.length ? (
                      queryData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((val) => {
                          return (
                            <Index.TableRow
                              key={val}
                              className="query-table-tr"
                            >
                              <Index.TableCell className="query-table-td">
                                {val.userName}
                              </Index.TableCell>
                              <Index.TableCell className="query-table-td">
                                {val.email}
                              </Index.TableCell>
                              <Index.TableCell className="query-table-td">
                                {val.mobileNumber}
                              </Index.TableCell>
                              <Index.TableCell className="query-table-td">
                                <Index.Box className="description-ellipsis-comman">
                                  {val.description}
                                </Index.Box>
                              </Index.TableCell>
                              <Index.TableCell>
                                <Index.IconButton
                                  onClick={(e) => {
                                    setQueryData(val);
                                    handleClickMenu(e);
                                  }}
                                >
                                  {permission?.isAdmin == true ||
                                  (permission?.role?.Query?.View == true &&
                                    permission?.isAdmin == false) ? (
                                    <>
                                      <Index.Button
                                        className="table-view-btn"
                                        onClick={() => {
                                          handleView(val);
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
                                </Index.IconButton>
                              </Index.TableCell>
                            </Index.TableRow>
                          );
                        })
                    ) : (
                      <Index.NoDataFound colSpan={5} />
                    )}
                  </Index.TableBody>
                </Index.Table>
              </Index.TableContainer>

              {queryData?.length && (
                <Index.TablePagination
                  className="paginationColor"
                  component="div"
                  page={page}
                  count={queryData?.length}
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
            {/* <Index.Box className="pagination-design flex-end">
            <Index.Stack spacing={2}>
              <Index.Pagination
              count={count}
              page={currentPage}
              onChange={handlePageChange}
              />
            </Index.Stack>
          </Index.Box> */}
          </Index.Box>
        </Index.Box>
      </>
    );
  } else {
    navigate("/admin");
  }
};

export default Query;
