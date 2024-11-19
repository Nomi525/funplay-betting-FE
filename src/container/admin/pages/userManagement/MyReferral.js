import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { useParams } from "react-router-dom";

export default function MyReferral(props) {
  const params = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [refDetails, setRefDetails] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const getReferralDetails = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("userId", params?.id);
    await DataService.post(
      Api.GET_SINGLE_ADMIN_USER_REFERRAL_DETAILS,
      urlencoded
    )
      .then((res) => {
        setRefDetails(res.data.data);
      })
      .catch((e) => {
        // toast.error(
        //   e.res?.data?.message ? e.res?.data?.message : e.message
        // );
        // navigate("/admin/login");
      });
  };

  // useEffect(() => {
  //   getReferralDetails();
  // }, []);

  useEffect(() => {
    if (params?.id) {
      getReferralDetails();
    }
  }, []);

  return (
    <>
      <Index.Box className="my-referral-details">
        <Index.Box className="">
          <Index.TableContainer
            component={Index.Paper}
            className="table-container my-referral-container"
          >
            <Index.Table
              aria-label="simple table"
              className="table-design-main barge-table my-referral-table"
            >
              <Index.TableHead className="my-referral-head">
                <Index.TableRow className="my-referral-tr">
                  <Index.TableCell className="my-referral-th">
                    User Name
                  </Index.TableCell>
                  <Index.TableCell className="my-referral-th">
                    Email
                  </Index.TableCell>
                  <Index.TableCell className="my-referral-th">
                    Referral
                  </Index.TableCell>
                  {/* <Index.TableCell className="my-referral-th" align="left">
                    Win
                  </Index.TableCell>
                  <Index.TableCell className="my-referral-th" align="left">
                    {" "}
                    Loss
                  </Index.TableCell> */}
                  <Index.TableCell className="my-referral-th" align="left">
                    Created Date
                  </Index.TableCell>
                </Index.TableRow>
              </Index.TableHead>
              {/* <Index.TableBody className="my-referral-tbody">
                {props?.userData?.useReferralCodeUsers &&
                props?.userData?.useReferralCodeUsers.length > 0 ? (
                  props?.userData?.useReferralCodeUsers.map((item, index) => {
                    return (
                      <Index.TableRow className="my-referral-tr">
                        <Index.TableCell
                          align="left"
                          className="my-referral-td"
                        >
                          {item?.referralUser?.fullName || "-"}
                        </Index.TableCell>
                        <Index.TableCell
                          align="left"
                          className="my-referral-td"
                        >
                          {item?.referralUser?.email || "-"}
                        </Index.TableCell>
                        <Index.TableCell
                          align="left"
                          className="my-referral-td"
                        >
                          {item?.referralUser?.referralCode || "-"}
                        </Index.TableCell>

                        <Index.TableCell
                          align="left"
                          className="my-referral-td"
                        >
                          -
                        </Index.TableCell>
                        <Index.TableCell
                          align="left"
                          className="my-referral-td"
                        >
                          -
                        </Index.TableCell>

                        <Index.TableCell
                          align="left"
                          className="my-referral-td"
                        >
                          {item?.createdAt
                            ? Index.moment(item?.createdAt).format("DD/MM/YYYY")
                            : "-"}
                        </Index.TableCell>
                      </Index.TableRow>
                    );
                  })
                ) : (
                  <Index.NoDataFound colSpan={6} />
                )}
              </Index.TableBody> */}
              <Index.TableBody className="banking-details-tbody">
                {refDetails && refDetails?.length > 0 ? (
                  refDetails.map((item, index) => {
                    return (
                      <Index.TableRow className="banking-details-row">
                        <Index.TableCell
                          align="left"
                          className="banking-details-td"
                        >
                          {item?.fullName ? item?.fullName : "-"}
                        </Index.TableCell>
                        <Index.TableCell
                          align="left"
                          className="banking-details-td"
                        >
                          {item?.email ? item?.email : "-"}
                        </Index.TableCell>
                        <Index.TableCell
                          align="left"
                          className="banking-details-td"
                        >
                          {item?.referralCode ? item?.referralCode : "-"}
                        </Index.TableCell>
                        <Index.TableCell
                          align="left"
                          className="banking-details-td"
                        >
                          {Index.moment(item.createdAt).format("DD/MM/YYYY") ||
                            "-"}
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
          {/* <Index.TablePagination
            className="paginationColor"
            component="div"
            page={page}
            count={props?.userData?.useReferralCodeUsers?.length}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={(page) =>
              `Records ${page.from} to ${
                page.to === -1 ? page.count : page.to
              } of ${page.count}`
            }
          /> */}
          {refDetails?.length && (
            <Index.TablePagination
              component="div"
              page={page}
              count={refDetails?.length}
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
      </Index.Box>
    </>
  );
}
