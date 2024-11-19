import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { styled } from "@mui/material/styles";
import "../../../../assets/style/global.css";
import PagesIndex from "../../../pageIndex";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ActionItem = styled(Index.MenuItem)(() => ({
  fontFamily: "poppins",
  lineHeight: "15px",
  fontSize: "14px",
  fontWeight: "400",
  color: "#595F69",
}));

const BankDetails = (props) => {
  const navigate = PagesIndex.useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionIndex, setActionIndex] = useState();
  const [bankData, setBankData] = useState([]);
  const params = useParams();

  console.log(params?.id, 26);

  const handleClickMenu = (e) => {
    setActionIndex();
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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

  // const getBankDetails = () => {
  //   DataService.get(Api.TRANSACTION_SINGLE_USER + "/" + props?.userData?._id )
  //     .then((res) => {
  //       setBankData(res.data.data);
  //       console.log(res.data.data,"BankData")
  //       })
  //     .catch((e) => {
  //          toast.error(
  //               e.res?.data?.message ? e.res?.data?.message : e.message
  //               // navigate("/admin/login")
  //             );
  //             });
  // };
  const getBankDetails = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("userId", params?.id);
    await DataService.post(Api.GET_SINGLE_ADMIN_USER_BANK_DETAILS, urlencoded)
      .then((res) => {
        setBankData(res.data.data);
      })
      .catch((e) => {
        // toast.error(
        //   e.res?.data?.message ? e.res?.data?.message : e.message
        // );
        // navigate("/admin/login");
      });
  };

  // useEffect(() => {
  //   getBankDetails();
  // }, []);

  useEffect(() => {
    if (params?.id) {
      getBankDetails();
    }
  }, [props]);

  return (
    <>
      <Index.Box className="page-content-box">
        <Index.Box className="">
          <Index.TableContainer
            component={Index.Paper}
            className="table-container transation-mt table-banking-container"
          >
            <Index.Table
              aria-label="simple table"
              className="table-design-main barge-table banking-details-table"
            >
              <Index.TableHead className="banking-details-head">
                <Index.TableRow className="banking-details-row">
                  <Index.TableCell align="left" className="banking-details-th">
                    Bank Name
                  </Index.TableCell>
                  <Index.TableCell align="left" className="banking-details-th">
                    {" "}
                    Branch Name
                  </Index.TableCell>
                  <Index.TableCell align="left" className="banking-details-th">
                    Account Holder
                  </Index.TableCell>
                  <Index.TableCell align="left" className="banking-details-th">
                    Account Number
                  </Index.TableCell>
                  <Index.TableCell align="left" className="banking-details-th">
                    IFSC Code
                  </Index.TableCell>
                </Index.TableRow>
              </Index.TableHead>
              <Index.TableBody className="banking-details-tbody">
                {bankData && bankData.length > 0 ? (
                  bankData.map((item, index) => {
                    return (
                      <Index.TableRow className="banking-details-row">
                        <Index.TableCell
                          align="left"
                          className="banking-details-td"
                        >
                          {/* {item?.userId?.bankDetails?.bankName}
                           */}
                          {item?.bankName ? item?.bankName : "-"}
                        </Index.TableCell>
                        <Index.TableCell
                          align="left"
                          className="banking-details-td"
                        >
                          {/* {item?.userId?.bankDetails?.branch} */}
                          {item?.branch ? item?.branch : "-"}
                        </Index.TableCell>
                        <Index.TableCell
                          align="left"
                          className="banking-details-td"
                        >
                          {/* {item?.userId?.bankDetails?.accountHolder} */}
                          {item?.accountHolder ? item?.accountHolder : "-"}
                        </Index.TableCell>
                        <Index.TableCell
                          align="left"
                          className="banking-details-td"
                        >
                          {/* {item?.userId?.bankDetails?.accountNumber} */}
                          {item?.accountNumber ? item?.accountNumber : "-"}
                        </Index.TableCell>
                        <Index.TableCell
                          align="left"
                          className="banking-details-td"
                        >
                          {/* {item?.userId?.bankDetails?.IFSCCode} */}
                          {item?.IFSCCode ? item?.IFSCCode : "-"}
                        </Index.TableCell>
                      </Index.TableRow>
                    );
                  })
                ) : (
                  <Index.NoDataFound colSpan={6} />
                )}
              </Index.TableBody>
            </Index.Table>
          </Index.TableContainer>
        </Index.Box>
        {/* <Index.Box className="pagination-design flex-end">
          <Index.TablePagination
            className="paginationColor"
            component="div"
            // page={page}
            // onPageChange={handleChangePage}
            // rowsPerPage={rowsPerPage}
            // rowsPerPageOptions={[10, 25, 50]}
            // onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={(page) =>
              `Records ${page.from} to ${
                page.to === -1 ? page.count : page.to
              } of ${page.count}`
            }
          />
        </Index.Box> */}
        {bankData?.length > 0 && (
          <Index.TablePagination
            component="div"
            page={page}
            count={bankData?.length}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            // rowsPerPageOptions={[10, 25, 50]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={(page) =>
              `Records ${page.from} to ${
                page.to === -1 ? page.count : page.to
              } of ${page.count}`
            }
            className="paginationColor"
          />
        )}
      </Index.Box>
    </>
  );
};

export default BankDetails;
