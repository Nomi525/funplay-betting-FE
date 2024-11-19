import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { styled } from "@mui/material/styles";
import "../../../../assets/style/global.css";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { useParams } from "react-router-dom";

const ActionItem = styled(Index.MenuItem)(() => ({
  fontFamily: "poppins",
  lineHeight: "15px",
  fontSize: "14px",
  fontWeight: "400",
  color: "#595F69",
}));

const UserWallet = (props) => {
  const params = useParams();
  const [walletData, setWalletData] = useState([]);
  console.log(walletData?.walletAddress, 20);
  const hideWalletAddress = (originalString) => {
    const walletAddressLength = Math.max(originalString.length - 6, 0);
    const hideWalletAddress =
      originalString.slice(0, 3) +
      "*".repeat(walletAddressLength) +
      originalString.slice(-3);
    return hideWalletAddress;
  };

  console.log(walletData?.walletAddress, 30);

  const getWalletDetails = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("userId", params?.id);
    await DataService.post(Api.GET_SINGLE_ADMIN_USER_WALLET_DETAILS, urlencoded)
      .then((res) => {
        console.log(res, 33);
        setWalletData(res.data.data);
      })
      .catch((e) => {
        // toast.error(
        //   e.res?.data?.message ? e.res?.data?.message : e.message
        // );
        // navigate("/admin/login");
      });
  };

  // useEffect(() => {
  //   getWalletDetails();
  // }, []);

  useEffect(() => {
    if (params?.id) {
      getWalletDetails();
    }
  }, []);

  return (
    <>
      <Index.Box className="page-content-box">
        <Index.Box className="">
          <Index.TableContainer
            component={Index.Paper}
            className="table-container transation-mt"
          >
            <Index.Table
              aria-label="simple table"
              className="table-design-main barge-table"
            >
              <Index.TableHead>
                <Index.TableRow>
                  <Index.TableCell align="left">Wallet Address</Index.TableCell>
                  <Index.TableCell align="left">
                    {" "}
                    Remaining Coins
                  </Index.TableCell>
                  <Index.TableCell align="left"> Total Deposit</Index.TableCell>
                </Index.TableRow>
              </Index.TableHead>
              {/* <Index.TableBody>
                <Index.TableRow>
                  <Index.TableCell align="left">
                    {props?.userData?.wallet[0]?.walletAddress
                      ? hideWalletAddress(
                          props?.userData?.wallet[0]?.walletAddress
                        )
                      : "-"}
                  </Index.TableCell>
                  <Index.TableCell align="left">-</Index.TableCell>
                  <Index.TableCell align="left">
                    {Number(props?.userData?.walletAmount)?.toFixed(0) || 0}
                  </Index.TableCell>
                </Index.TableRow>
              </Index.TableBody> */}
              <Index.TableBody className="banking-details-tbody">
                {/* {walletData && walletData.length > 0 ? (
                  walletData.map((item, index) => {
                    return ( */}
                <Index.TableRow className="banking-details-row">
                  <Index.TableCell align="left" className="banking-details-td">
                    {walletData?.walletAddress
                      ? walletData?.walletAddress
                      : "-"}
                  </Index.TableCell>
                  <Index.TableCell align="left" className="banking-details-td">
                    {walletData?.TotalCoin
                      ? walletData?.TotalCoin?.toFixed(2)
                      : "-"}
                  </Index.TableCell>
                  <Index.TableCell align="left" className="banking-details-td">
                    {walletData?.TotalDeposit ? walletData?.TotalDeposit : "-"}
                  </Index.TableCell>
                </Index.TableRow>
                {/* );
                  })
                ) : (
                  <Index.NoDataFound colSpan={6} />
                )} */}
              </Index.TableBody>
            </Index.Table>
          </Index.TableContainer>
        </Index.Box>
        {/* <Index.Box className="pagination-design flex-end">
          <Index.Stack spacing={2}>
            <Index.Pagination
            // count={count}
            // page={currentPage}
            // onChange={handlePageChange}
            />
          </Index.Stack>
        </Index.Box> */}
        {/* <Index.TablePagination
          component="div"
          page={page}
          count={walletData?.length}
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
        /> */}
      </Index.Box>
    </>
  );
};

export default UserWallet;
