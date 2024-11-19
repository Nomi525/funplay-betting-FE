import Index from "../../../Index";
import "../../../../assets/style/global.css";
import PagesIndex from "../../../pageIndex";
import { useEffect, useState } from "react";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const CreditDebit = (props) => {
  const navigate = PagesIndex.useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [creditData, setCreditData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [tranData, setTranData] = useState([]);

  const params = useParams();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // const getCreditDataList = async () => {
  //   const urlencoded = new URLSearchParams();
  //   urlencoded.append("userId", params?.id);
  //   await DataService.post(Api.TRANSACTION_SINGLE_USER, urlencoded)
  //     .then((res) => {
  //       setCreditData(
  //         res?.data?.data?.filter((row) => row?.type === "deposit")
  //       );
  //     })
  //     .catch((e) => {
  //       // toast.error(
  //       //   e.res?.data?.message ? e.res?.data?.message : e.message
  //       // );
  //       // navigate("/admin/login");
  //     });
  // };
  const getSingleCreditDataList = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("userId", props?.userId);
    await DataService.post(Api.GET_SINGLE_ADMIN_USER_TRANSACTION, urlencoded)
      .then((res) => {
        setCreditData(res.data.data);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    if (props?.userId) {
      getSingleCreditDataList();
    }
  }, []);

  // const getCreditDataList = () => {
  //   DataService.post(Api.ADMIN_SINGLE_USER)
  //     .then((res) => {
  //       setCreditData(res.data.data);
  //     })
  //     .catch((e) => {
  //       toast.error(
  //         e.response.data.message ? e.response.data.message : e.message
  //       );
  //       // navigate("/admin/login");
  //     });
  // };

  // useEffect(() => {
  //   getCreditDataList();
  // }, []);
  useEffect(() => {
    //setUserlist(userlist);
    setSearchedData(creditData);
    setTranData(creditData);
  }, [creditData]);

  function hideEmail(email) {
    if (email === undefined || email === "" || email === null) {
      return "-";
    } else {
      const [username, domain] = email.split("@");
      const hiddenUsername =
        username.substring(0, 2) + "*".repeat(username.length - 2);
      return hiddenUsername + "@" + domain;
    }
  }

  return (
    <>
      <Index.Box className="page-content-box">
        {/* <Index.Box className="">
          <Index.TableContainer
            component={Index.Paper}
            className="table-container transation-mt credit-debit-container"
          >
            <Index.Table
              aria-label="simple table"
              className="table-design-main barge-table credit-debit-table"
            >
              <Index.TableHead className="credit-debit-head">
                <Index.TableRow className="credit-debit-tr">
                  <Index.TableCell className="credit-debit-th">Created Date</Index.TableCell>
                  <Index.TableCell className="credit-debit-th" align="left">User Name</Index.TableCell>
                  <Index.TableCell className="credit-debit-th" align="left"> Email</Index.TableCell>

                  <Index.TableCell className="credit-debit-th" align="left">Deposit</Index.TableCell>
                </Index.TableRow>
              </Index.TableHead>
              <Index.TableBody className="credit-debit-tbody">
                {creditData &&
                  creditData.length ?
                  creditData.map((item, index) => {
                 
                    return (
                      <Index.TableRow className="credit-debit-tr">
                        <Index.TableCell className="credit-debit-td" align="left">
                          {" "}
                          {Index.moment(item.createdAt).format("DD/MM/YYYY")}
                        </Index.TableCell>
                        <Index.TableCell align="left">
                          {item?.userId?.fullName || "-"}
                        </Index.TableCell>

                        <Index.TableCell className="credit-debit-td" align="left">
                          {item?.userId?.email || "-"}
                        </Index.TableCell>

                        <Index.TableCell  className="credit-debit-td"align="left">{item?.type || "-"}</Index.TableCell>
                      </Index.TableRow>
                    );
                  })
                : <Index.NoDataFound colSpan={4} />
                }
              </Index.TableBody>
            </Index.Table>
          </Index.TableContainer>
        </Index.Box> */}
        <Index.Box className="">
          <Index.TableContainer
            component={Index.Paper}
            className="table-container transaction-table-container"
          >
            <Index.Table
              aria-label="simple table"
              className="table-design-main barge-table transaction-table-main"
            >
              <Index.TableHead className="transaction-table-head">
                <Index.TableRow className="transaction-table-tr">
                  <Index.TableCell className="transaction-table-th">
                    Created Date
                  </Index.TableCell>
                  <Index.TableCell
                    align="left"
                    className="transaction-table-th"
                  >
                    User Name
                  </Index.TableCell>
                  <Index.TableCell
                    align="left"
                    className="transaction-table-th"
                  >
                    Email
                  </Index.TableCell>

                  {/* <Index.TableCell
                        align="left"
                        className="transaction-table-th"
                      >
                        Network Type
                      </Index.TableCell> */}

                  {/* <Index.TableCell
                    align="left"
                    className="transaction-table-th"
                  >
                    Network
                  </Index.TableCell> */}

                  <Index.TableCell
                    align="left"
                    className="transaction-table-th"
                  >
                    Amount
                  </Index.TableCell>
                  {/* <Index.TableCell
                        align="left"
                        className="transaction-table-th"
                      >
                        Coin
                      </Index.TableCell> */}
                  <Index.TableCell
                    align="left"
                    className="transaction-table-th"
                  >
                    Type
                  </Index.TableCell>
                  <Index.TableCell
                    align="left"
                    className="transaction-table-th"
                  >
                    Status
                  </Index.TableCell>
                  {/* <Index.TableCell align="left">Action</Index.TableCell> */}
                </Index.TableRow>
              </Index.TableHead>
              <Index.TableBody className="transaction-table-tbody">
                {searchedData.length ? (
                  searchedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => {
                      return (
                        <Index.TableRow
                          key={item}
                          className="transaction-table-tr"
                        >
                          <Index.TableCell
                            align="left"
                            className="transaction-table-td"
                          >
                            {Index.moment(item.createdAt).format(
                              "DD/MM/YYYY"
                            ) || "-"}
                          </Index.TableCell>
                          <Index.TableCell
                            align="left"
                            className="transaction-table-td"
                          >
                            {item?.userId?.fullName || "-"}
                          </Index.TableCell>
                          <Index.TableCell
                            align="left"
                            className="transaction-table-td"
                          >
                            {hideEmail(item?.userId?.email)}
                          </Index.TableCell>

                          <Index.TableCell
                            align="left"
                            className="transaction-table-td"
                          >
                            {/* {item?.amount ? item?.amount : "-"} */}
                            {item?.amount ? item?.amount?.toFixed(2) : "-"}
                          </Index.TableCell>

                          <Index.TableCell
                            align="left"
                            className="transaction-table-td"
                          >
                            {item?.requestType ? item?.requestType : "-"}
                          </Index.TableCell>
                          <Index.TableCell
                            align="left"
                            className="transaction-table-td"
                          >
                            {item?.status ? item?.status : "-"}
                          </Index.TableCell>
                          {/* <Index.TableCell align="left">
                              <Link className="more-details-content">
                                More Details
                              </Link>
                            </Index.TableCell> */}
                        </Index.TableRow>
                      );
                    })
                ) : (
                  <Index.NoDataFound colSpan={8} />
                )}
              </Index.TableBody>
            </Index.Table>
          </Index.TableContainer>
        </Index.Box>
        {/* <Index.Box className="pagination-design flex-end">
          <Index.TablePagination
            className="paginationColor"
            component="div"
            page={page}
            count={creditData.length}
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
        </Index.Box> */}
        {searchedData?.length ? (
          <Index.TablePagination
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
            className="paginationColor"
          />
        ) : (
          ""
        )}
      </Index.Box>
    </>
  );
};

export default CreditDebit;
