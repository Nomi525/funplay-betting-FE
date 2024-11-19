import React, { useEffect, useState } from 'react'
import Index from '../../Index'
import PageIndex from '../../PageIndex'
import { useNavigate } from 'react-router-dom';
import { Api } from '../../../config/Api';
import DataService from '../../../config/DataService';


export default function WinnerCommunityBettingList({value}) {
    const [gamelist, setGamelist] = useState([]);
    const navigate = useNavigate();
    const handleCommunityBetting = (id) => {
        navigate(`/admin/community-betting-swap/${id}`);
      };

      const getAllGamesList = async() => {
       await DataService.post(Api.ADMIN_GET_UPDATE_WINNERS_USER)
          .then((res) => {
          })
          .catch((e) => {
            // toast.error(
            //   e.response.data.message ? e.response.data.message : e.message
            // );
          });
      };
    //   ADMIN_GET_USERS_WINNERS_COMMUNITY_BETTING
    useEffect(()=>{
        getAllGamesList();
    },[gamelist])
    return (
        <>

            <Index.Box className="table-search-winner">
                <Index.Box className="input-search-details res-set-search">
                    <Index.Box className="search admin-search-comman ">
                        <Index.TextField
                            className="number-input-fleid"
                            placeholder='Search'
                        />
                    </Index.Box>

                </Index.Box>
            </Index.Box>

            <Index.Box className="table-winner-details">
                <Index.TableContainer
                    component={Index.Paper}
                    className="table-container number-manage-container"
                >
                    <Index.Table
                        aria-label="simple table"
                        className="table-design-main barge-table number-bet-table"
                    >
                        <Index.TableHead className="number-bet-thead">
                            <Index.TableRow className="number-bet-tr">
                                <Index.TableCell className="number-bet-th">Sr no</Index.TableCell>
                                <Index.TableCell className="number-bet-th" align="left">Game Name</Index.TableCell>
                                <Index.TableCell className="number-bet-th" align="left">Total Bet Coins</Index.TableCell>
                                <Index.TableCell className="number-bet-th" align="left">Dt. of Completion</Index.TableCell>
                                <Index.TableCell className="number-bet-th" align="left">Time of Completion</Index.TableCell>
                                <Index.TableCell className="number-bet-th" align="left">Action</Index.TableCell>
                            </Index.TableRow>
                        </Index.TableHead>
                        <Index.TableBody className="number-bet-tbody">
                            <Index.TableRow className="number-bet-tr">
                                <Index.TableCell className="number-bet-td">
                                    <Index.Box className="sr-no-details">
                                        1
                                    </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                    <Index.Box className="game-name-details">
                                        Community Betting
                                    </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                    <Index.Box className="total-coin-details">
                                        25,000
                                    </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                    <Index.Box className="date-coin-details">
                                        27-09-2023
                                    </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                    <Index.Box className="time-coin-details">
                                        13:30
                                    </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                    <Index.Box className="action-details" sx={{ display: "flex" }}>
                                        <Index.IconButton
                                        >

                                            <Index.Button
                                                className="table-view-btn"
                                            >
                                                <img
                                                    src={PageIndex.Svg.eye}
                                                    className="view-icon-btn"
                                                />
                                            </Index.Button>
                                            <Index.Button
                                                className="table-view-btn"
                                                onClick={() => handleCommunityBetting("6549d7130c68bdbfbde00fe4")}
                                            >
                                                <img
                                                    src={PageIndex.Svg.pencil}
                                                    className="view-icon-btn"
                                                />
                                            </Index.Button>
                                        </Index.IconButton>
                                    </Index.Box>
                                </Index.TableCell>

                            </Index.TableRow>
                        </Index.TableBody>
                    </Index.Table>
                </Index.TableContainer>
            </Index.Box>




        </>
    )
}
