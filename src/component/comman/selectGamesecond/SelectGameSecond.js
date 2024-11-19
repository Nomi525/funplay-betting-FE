import React, { useState } from 'react'
import Index from '../../Index'
import PageIndex from '../../PageIndex'
import { useSelector } from 'react-redux';
import CardAndCommunityBetting from '../cardAndCommunityBetting/CardAndCommunityBetting';

export default function SelectGameSecond() {
    const [open , setOpen] = useState(false);
    const referralCode = useSelector((state) => state?.UserReducer?.userData?.referralCode)

    return (
        <>

            <Index.Box className="dashbaord-user-main-page">
                <Index.Box className="dasboard-flex-user-main">

                    <Index.Box className="left-dashboard-main-user">
                        <Index.Box className="page-content-game-details">
                            <Index.Box className="seconds-select-details-modal">
                                <Index.Box className="seconds-select-content">
                                    <Index.Box className="seconds-three-flex">
                                        <Index.Box className="second-divide-content second-onclick-active">
                                            <Index.Box className="second-check-content">
                                                <Index.Box className="second-main-border">
                                                    <Index.Box className="pd-second-content">
                                                        <Index.Box className="sec-inner-border-content">
                                                            <Index.Box className="inner-pd-content-details">
                                                                <Index.Typography component='p' variant="p" className="second-title">30</Index.Typography>
                                                            </Index.Box>
                                                        </Index.Box>
                                                    </Index.Box>
                                                </Index.Box>
                                                <Index.Box className="second-list-details">
                                                    <Index.Typography component='h5' variant="h5" className="second-title-list">Seconds</Index.Typography>
                                                </Index.Box>
                                            </Index.Box>
                                            <Index.Box className="check-content-img-list">
                                                <img src={PageIndex.Svg.seconduncheck} className="comman-check-img check-img-sec"></img>
                                                <img src={PageIndex.Svg.secondcheck} className="comman-check-img  uncheck-img-sec"></img>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="second-divide-content">
                                            <Index.Box className="second-check-content">
                                                <Index.Box className="second-main-border">
                                                    <Index.Box className="pd-second-content">
                                                        <Index.Box className="sec-inner-border-content">
                                                            <Index.Box className="inner-pd-content-details">
                                                                <Index.Typography component='p' variant="p" className="second-title">60</Index.Typography>
                                                            </Index.Box>
                                                        </Index.Box>
                                                    </Index.Box>
                                                </Index.Box>
                                                <Index.Box className="second-list-details">
                                                    <Index.Typography component='h5' variant="h5" className="second-title-list">Seconds</Index.Typography>
                                                </Index.Box>
                                            </Index.Box>
                                            <Index.Box className="check-content-img-list">
                                                <img src={PageIndex.Svg.secondcheck} className="comman-check-img uncheck-img-sec"></img>
                                                <img src={PageIndex.Svg.seconduncheck} className="comman-check-img check-img-sec"></img>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="second-divide-content">
                                            <Index.Box className="second-check-content">
                                                <Index.Box className="second-main-border">
                                                    <Index.Box className="pd-second-content">
                                                        <Index.Box className="sec-inner-border-content">
                                                            <Index.Box className="inner-pd-content-details">
                                                                <Index.Typography component='p' variant="p" className="second-title">120</Index.Typography>
                                                            </Index.Box>
                                                        </Index.Box>
                                                    </Index.Box>
                                                </Index.Box>
                                                <Index.Box className="second-list-details">
                                                    <Index.Typography component='h5' variant="h5" className="second-title-list">Seconds</Index.Typography>
                                                </Index.Box>
                                            </Index.Box>
                                            <Index.Box className="check-content-img-list">
                                                <img src={PageIndex.Svg.secondcheck} className="comman-check-img uncheck-img-sec"></img>
                                                <img src={PageIndex.Svg.seconduncheck} className="comman-check-img check-img-sec"></img>
                                            </Index.Box>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Box>

                    <CardAndCommunityBetting/>

                    {/* <Index.Box className="right-dashboard-main-user">
                        <Index.Box className="card-betting-list">
                            <Index.Box className="card-betting-main">
                                <Index.Box className="betting-img-content">
                                    <img src={PageIndex.Png.bettingone} className="betting-img" alt="betting" />
                                </Index.Box>
                                <Index.Box className="betting-card-bg">
                                    <Index.Box className="betting-card-pd">
                                        <Index.Typography component='h5' variant='h5' className="betting-title-right">Community Betting</Index.Typography>
                                        <Index.Typography component='p' variant='p' className="betting-details-right">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</Index.Typography>
                                        <Index.Box className="betting-card-btn-comman">
                                            <PageIndex.BlueButton btnLabel="Play Now" className="blue-btn-content"  onClick={() => setOpen(referralCode ? false : true)}/>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                            <Index.Box className="card-betting-main">
                                <Index.Box className="betting-img-content">
                                    <img src={PageIndex.Png.bettingtwo} className="betting-img" alt="betting" />
                                </Index.Box>
                                <Index.Box className="betting-card-bg">
                                    <Index.Box className="betting-card-pd">
                                        <Index.Typography component='h5' variant='h5' className="betting-title-right">Community Betting</Index.Typography>
                                        <Index.Typography component='p' variant='p' className="betting-details-right">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</Index.Typography>
                                        <Index.Box className="betting-card-btn-comman">
                                            <PageIndex.BlueButton btnLabel="Play Now" className="blue-btn-content" onClick={() => setOpen(referralCode ? false : true)} />
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Box> */}

                </Index.Box>
            </Index.Box>

        </>
    )
}
