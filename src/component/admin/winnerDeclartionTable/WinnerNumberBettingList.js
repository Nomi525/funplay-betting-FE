import React, { useState } from 'react'
import Index from '../../Index'
import PageIndex from '../../PageIndex'
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function WinnerNumberBettingList() {

    const [openEdit, setOpen] = React.useState(false);
    const handleOpenEdit = () => setOpen(true);
    const handleCloseEdit = () => setOpen(false);
    const navigate = useNavigate();
    const handleCommunityBetting = () => {
        navigate("/admin/Number-betting-edit");
      };

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
                                <Index.TableCell className="number-bet-th" align="left">Total Number of user </Index.TableCell>
                                <Index.TableCell className="number-bet-th" align="left">User Name</Index.TableCell>
                                <Index.TableCell className="number-bet-th" align="left">Total Bet Coins</Index.TableCell>
                                {/* <Index.TableCell className="number-bet-th" align="left">Date. of Completion</Index.TableCell> */}
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
                                        5
                                    </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                    <Index.Box className="game-name-details">
                                        Raaj Kumar
                                    </Index.Box>
                                </Index.TableCell>
                                <Index.TableCell className="number-bet-td">
                                    <Index.Box className="total-coin-details">
                                        25,000
                                    </Index.Box>
                                </Index.TableCell>
                                {/* <Index.TableCell className="number-bet-td">
                                    <Index.Box className="date-coin-details">
                                        27-09-2023
                                    </Index.Box>
                                </Index.TableCell> */}
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
                                                // onClick={handleOpenEdit}
                                                onClick={() => handleCommunityBetting()}
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

            <Index.Modal
                open={openEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-comman-details"
            >
                <Index.Box sx={style} className="modal-comman-inner-style">
                    <Index.Box className="modal-cancel-btn">
                        <Index.Button
                            className="btn btn-cancel"

                        >
                            <img
                                src={PageIndex.Svg.cancelmodal}
                                className="cancel-modal"
                                alt="modal-cancel"
                            />
                        </Index.Button>
                    </Index.Box>
                    <Index.Box className="winning-number-below-details">
                        <Index.Box className="input-design-div admin-design-div login-input-design-div">
                            <Index.Box className=" bluebox-text1">
                                <Index.Typography component="p" className="">
                                   Please Enter the winning number Below
                                </Index.Typography>
                            </Index.Box>
                            <Index.TextField
                                variant="filled"
                                className="admin-input-design input-placeholder"
                                name="email"
                                autoComplete="off"
                            />
                        </Index.Box>
                        <Index.Box className="flex-end-edit-modal">
                        <PageIndex.BlueOutlineButton btnLabel="Cancel"  className="outline-blue-btn-content" />
                        <PageIndex.BlueButton btnLabel="Submit" className="blue-btn-content" />
                        </Index.Box>
                    </Index.Box>
                </Index.Box>
            </Index.Modal>
        </>
    )
}
