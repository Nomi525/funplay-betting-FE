import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { styled, alpha } from "@mui/material/styles";
import "../../../../assets/style/global.css";
import PageIndex from "../../../pageIndex";
import { useNavigate } from "react-router-dom";
// import DeleteRoleModel from "./DeleteRoleModel";
import DataService from "../../../../config/DataService";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../../../redux/user/userReducer";
import DeleteBankData from "./DeleteBankData";

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

const UserBankDetailsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [betList, setBetList] = useState([]);
  const [query, setQuery] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterByPriority, setFilterByPriority] = useState("");
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const userDetail = useSelector((state) => state?.UserReducer?.userData);
  const userToken = useSelector((state) => state?.UserReducer?.token);
  const [temp, setTemp] = useState("");
  let token = localStorage.getItem("token");

  const [openDeleteData, setOpenDeleteData] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleCloseDeleteData = () => setOpenDeleteData(false);
  const handleOpenDeleteData = () => setOpenDeleteData(true);

  // console.log(userDetail?.bankDetails, 255);
  // console.log(searchedData, 75);
  // console.log(filterData, 76);
  // console.log(filterByPriority, 77);
  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // useEffect(() => {
  //   setSearchedData(userDetail?.bankDetails?.reverse());
  // }, []);

  useEffect(() => {
    // Reverse the order of the bankDetails array
    const reversedData = Object.values(userDetail?.bankDetails)?.reverse();
    setSearchedData(reversedData);
  }, []);

  const handleSearch = (searched) => {
    if (!searched) return setSearchedData(userDetail?.bankDetails);
    setSearchedData(
      userDetail?.bankDetails?.filter(
        (item) =>
          item?.bankName
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.branch
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.accountHolder
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.accountNumber
            ?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          item?.IFSCCode?.toString()
            .toLowerCase()
            .includes(searched.toLowerCase())
      )
    );
    setPage(0);
  };

  return (
    <>
      <Index.Box className="page-content-box">
        <Index.Box className="barge-common-box">
          <Index.Box className="title-header">
            <Index.Box className="title-header-flex res-title-header-flex flex-w-100-transaction">
              <Index.Box className="title-main">
                <Index.Typography
                  variant="p"
                  component="p"
                  className="page-title"
                >
                  Bank Details
                </Index.Typography>
              </Index.Box>
              <Index.Box className="d-flex align-items-center res-set-search">
                <Search className="search admin-search-comman">
                  <StyledInputBase
                    placeholder="Search"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Search>
              </Index.Box>
            </Index.Box>
          </Index.Box>

          <Index.Box className="main-bank-details-tables">
            <Index.TableContainer
              component={Index.Paper}
              className="table-container bank-details-conatiner"
            >
              <Index.Table
                aria-label="simple table"
                className="table-design-main barge-table bank-details-table"
              >
                <Index.TableHead className="bankdetails-thead">
                  <Index.TableRow className="bankdetails-tr">
                    <Index.TableCell className="bankdetails-th">
                      {" "}
                      Bank Name
                    </Index.TableCell>
                    <Index.TableCell className="bankdetails-th">
                      Branch
                    </Index.TableCell>
                    <Index.TableCell className="bankdetails-th" align="left">
                      {" "}
                      Account Holder Name
                    </Index.TableCell>
                    <Index.TableCell align="left" className="bankdetails-th">
                      {" "}
                      Account Number
                    </Index.TableCell>
                    <Index.TableCell align="left" className="bankdetails-th">
                      {" "}
                      IFSC Code
                    </Index.TableCell>
                    <Index.TableCell align="left" className="bankdetails-th">
                      {" "}
                      Action
                    </Index.TableCell>
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
                          <Index.TableRow className="bankdetails-tr">
                            <Index.TableCell
                              align="left"
                              className="bankdetails-td"
                            >
                              {data?.bankName ? data?.bankName : "-"}
                            </Index.TableCell>
                            <Index.TableCell
                              align="left"
                              className="bankdetails-td"
                            >
                              {data?.branch ? data?.branch : "-"}
                            </Index.TableCell>
                            <Index.TableCell
                              align="left"
                              className="bankdetails-td"
                            >
                              {data?.accountHolder ? data?.accountHolder : "-"}
                            </Index.TableCell>
                            <Index.TableCell
                              align="left"
                              className="bankdetails-td"
                            >
                              {data?.accountNumber ? data?.accountNumber : "-"}
                            </Index.TableCell>

                            <Index.TableCell
                              align="left"
                              className="bankdetails-td"
                            >
                              {data?.IFSCCode ? data?.IFSCCode : "-"}
                            </Index.TableCell>
                            <Index.TableCell
                              align="left"
                              className="bankdetails-td"
                            >
                              <Index.Button
                                className="table-view-btn"
                                disableRipple
                                onClick={() => {
                                  setDeleteId(data?._id);
                                  // setDeleteId(item?._id);
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
                      <Index.NoDataFound colSpan={8} />
                    </>
                  )}
                </Index.TableBody>
              </Index.Table>
              <Index.TablePagination
                component="div"
                page={page}
                className="paginationColor"
                count={searchedData?.length}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                // labelDisplayedRows={(page) =>
                //   `Records ${page.from} to ${page.to === -1 ? page.count : page.to
                //   } of ${page.count}`
                // }
              />
            </Index.TableContainer>
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
            <DeleteBankData
              handleClose={handleCloseDeleteData}
              deleteId={deleteId}
              // getAllBannerList={getAllBannerList}
            />
          </Index.Box>
        </Index.Modal>
      </Index.Box>
    </>
  );
};

export default UserBankDetailsList;
