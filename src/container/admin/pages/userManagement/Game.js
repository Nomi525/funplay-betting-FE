import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function Game(props) {
  const params = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [gamelist, setGamelist] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // const getAllGameList = async() => {
  // await  DataService.get(Api.ADMIN_GET_USER_WISE_GAME_LIST + "/" + props?.userData?._id )
  //     .then((res) => {
  //       setGamelist(res.data.data);

  //       })
  //     .catch((e) => {
  //         //  toast.error(
  //         //       e.res?.data?.message ? e.res?.data?.message : e.message
  //         //       // navigate("/admin/login")
  //         //     );
  //             });
  // };

  // useEffect(() => {
  //   getAllGameList();
  // }, []);

  const getGameList = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("userId", params?.id);
    await DataService.post(Api.GET_SINGLE_ADMIN_USER_GAME_DETAILS, urlencoded)
      .then((res) => {
        setGamelist(res.data.data);
      })
      .catch((e) => {
        // toast.error(
        //   e.res?.data?.message ? e.res?.data?.message : e.message
        // );
        // navigate("/admin/login");
      });
  };

  // useEffect(() => {
  //   getGameList();
  // }, []);

  useEffect(() => {
    if (params?.id) {
      getGameList();
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
                    Game Name
                  </Index.TableCell>
                  {/* <Index.TableCell className="my-referral-th" align="left">
                    Win
                  </Index.TableCell> */}

                  <Index.TableCell className="my-referral-th" align="left">
                    Bet
                  </Index.TableCell>
                  <Index.TableCell className="my-referral-th" align="left">
                    Status
                  </Index.TableCell>
                </Index.TableRow>
              </Index.TableHead>
              <Index.TableBody className="my-referral-tbody">
                {/* gamelist &&
                  gamelist > 0 ? */}
                {gamelist && gamelist?.length > 0 ? (
                  gamelist.map((item, index) => {
                    return (
                      <Index.TableRow className="my-referral-tr">
                        <Index.TableCell
                          align="left"
                          className="my-referral-td"
                        >
                          {/* {item?.gameId?.gameName || "-"} */}
                          {item?.gameId?.gameName
                            ? item?.gameId?.gameName
                            : "-"}
                        </Index.TableCell>
                        <Index.TableCell
                          align="left"
                          className="my-referral-td"
                        >
                          {item?.betAmount ? item?.betAmount : "-"}
                        </Index.TableCell>
                        <Index.TableCell
                          align="left"
                          className="my-referral-td"
                        >
                          {/* {item?.isWin === false ? "Loss" : "Win"} */}
                          {/* {item && item?.isWin === false ? "Loss" : "Win"} */}
                          {item?.status === "pending"
                            ? "Pending"
                            : item?.status === "fail"
                            ? "Loss"
                            : "Win"}
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
          {gamelist?.length > 0 && (
            <Index.TablePagination
              className="paginationColor"
              component="div"
              page={page}
              // count={props?.userData?.useReferralCodeUsers?.length}
              count={gamelist?.length}
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
    </>
  );
}
