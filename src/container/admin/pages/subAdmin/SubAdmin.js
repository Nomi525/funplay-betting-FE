import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { styled, alpha } from "@mui/material/styles";
import "../../../../assets/style/global.css";
import PageIndex from "../../../pageIndex";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../component/comman/loader/Loader";

import { Api } from "../../../../config/Api";

import DataService from "../../../../config/DataService";
import DeleteSubAdmin from "./DeleteSubAdmin";

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

const SubAdmin = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [subadminList, setSubadminList] = useState([]);
  const [query, setQuery] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [openDeleteData, setOpenDeleteData] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // delete model

  const handleCloseDeleteData = () => setOpenDeleteData(false);
  const handleOpenDeleteData = () => setOpenDeleteData(true);

  const getSubAdminList = async () => {
    await DataService.get(Api.GET_SUBADMIN)
      .then((res) => {
        setLoading(false);
        setSubadminList(res?.data?.data);
        setFilterData(res?.data?.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (!query) return setFilterData(subadminList);
    setFilterData(
      subadminList?.filter(
        (item) =>
          item?.role?.Role_type?.toLowerCase().includes(query?.toLowerCase()) ||
          item?.firstName?.toLowerCase().includes(query?.toLowerCase()) ||
          item?.lastName?.toLowerCase().includes(query?.toLowerCase()) ||
          item?.email?.toLowerCase().includes(query?.toLowerCase())
      )
    );
    setPage(0);
  }, [query]);

  useEffect(() => {
    getSubAdminList();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                      Sub Admin List
                    </Index.Typography>
                  </Index.Box>

                  <Index.Box className="d-flex align-items-center res-set-search">
                    <Search className="search admin-search-comman cus-penalty-search-main">
                      <StyledInputBase
                        placeholder="Search"
                        inputProps={{ "aria-label": "search" }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="cus-penalty-search"
                      />
                    </Search>

                    <Index.Box className="common-button blue-button res-blue-button ">
                      <PageIndex.Link
                        className="no-text-decoration w-100-add-btn"
                        to={"/admin/add-subAdmin"}
                      >
                        <Index.Button variant="contained" disableRipple>
                          <img
                            src={PageIndex.Svg.plus}
                            className="plus-main-content"
                          />
                          Add SubAdmin
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
                  className="table-container subadmin-container"
                >
                  <Index.Table
                    aria-label="simple table"
                    className="table-design-main barge-table  subadmin-table"
                  >
                    <Index.TableHead>
                      <Index.TableRow>
                        <Index.TableCell align="left">
                          Firstname
                        </Index.TableCell>
                        <Index.TableCell align="left">Lastname</Index.TableCell>
                        <Index.TableCell align="left">Email</Index.TableCell>
                        <Index.TableCell align="left">Role</Index.TableCell>
                        <Index.TableCell align="left">Action</Index.TableCell>
                      </Index.TableRow>
                    </Index.TableHead>
                    <Index.TableBody>
                      {filterData?.length > 0 ? (
                        <>
                          {filterData?.map((data, index) => (
                            <Index.TableRow key={index}>
                              <Index.TableCell>
                                {data?.firstName}
                              </Index.TableCell>
                              <Index.TableCell>
                                {data?.lastName}
                              </Index.TableCell>
                              <Index.TableCell>{data?.email}</Index.TableCell>
                              <Index.TableCell>
                                {data?.role?.Role_type}
                              </Index.TableCell>
                              <Index.TableCell sx={{ display: "flex" }}>
                                <Index.Button
                                  className="table-view-btn"
                                  onClick={() =>
                                    navigate(`/admin/add-subAdmin`, {
                                      state: { row: data },
                                    })
                                  }
                                >
                                  <img
                                    src={PageIndex.Svg.pencil}
                                    className="view-icon-btn"
                                  />
                                </Index.Button>
                                <Index.Button
                                  className="table-view-btn"
                                  disableRipple
                                  onClick={() => {
                                    setDeleteId(data?._id);

                                    handleOpenDeleteData();
                                  }}
                                >
                                  <img
                                    src={PageIndex.Svg.deletetable}
                                    className="view-icon-btn"
                                  />
                                </Index.Button>
                              </Index.TableCell>
                            </Index.TableRow>
                          ))}
                        </>
                      ) : (
                        <>
                          <Index.NoDataFound colSpan={5} />
                        </>
                      )}
                    </Index.TableBody>
                  </Index.Table>
                </Index.TableContainer>
                {filterData?.length && (
                  <Index.TablePagination
                    className="paginationColor"
                    component="div"
                    page={page}
                    count={filterData?.length}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
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
                <DeleteSubAdmin
                  handleClose={handleCloseDeleteData}
                  deleteId={deleteId}
                  getAllBannerList={getSubAdminList}
                />
              </Index.Box>
            </Index.Modal>
          </Index.Box>
        </>
      )}
    </>
  );
};

export default SubAdmin;
