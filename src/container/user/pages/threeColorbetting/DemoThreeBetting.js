import React, { useEffect, useState } from 'react'
import Index from '../../../Index'
import PagesIndex from '../../../pageIndex'
import { useOutletContext } from 'react-router-dom';
import PageIndex from '../../../pageIndex';
import CardAndCommunityBetting from '../../../../component/comman/cardAndCommunityBetting/CardAndCommunityBetting';


export default function DemoThreeBetting() {

    setTimeout(function () {
        document.getElementById("choose-multiple-id")?.classList.add("choose-d-block");

        setTimeout(function () {
            document.getElementById("choose-multiple-id")?.classList.remove("choose-d-block");
        }, 15000);

        document.querySelector(".button-landscape-inner")?.classList.add('choose-span-remove');
        document.querySelector(".timer-title")?.classList.add('timer-remover');
        document.querySelector(".multiline-title")?.classList.add('multiline-title-added');
        document.querySelectorAll('.button-item').forEach(function (elem) {
            elem?.classList.add('disabled_rounded');
        });
        document.querySelector(".game-amount-details")?.classList.add('disabled_rounded');



    }, 15000);

    setTimeout(function () {
        document.getElementById("line-single-id")?.classList.add("line-single-none");
        setTimeout(function () {
            document.getElementById("line-single-id")?.classList.remove("line-single-none");
        }, 15000);
        setTimeout(function () {
            document.querySelector(".button-landscape-inner")?.classList.remove('choose-span-remove');
            document.querySelector(".timer-title")?.classList.remove('timer-remover');
            document.querySelector(".multiline-title")?.classList.remove('multiline-title-added');
            document.querySelectorAll('.button-item').forEach(function (elem) {
                elem?.classList.remove('disabled_rounded');
            });
            document.querySelector(".game-amount-details")?.classList.remove('disabled_rounded');

        }, 15000);


    }, 15000);

    const [open, setOpen] = useOutletContext()

    // 

    const [isActive, setIsActive] = useState(false);
    const [isActiveOrange, setIsActiveOrange] = useState(false);
    const [isActiveBlue, setIsActiveBlue] = useState(false);
    const [isActiveUpDown, setIsActiveUpDown] = useState(false);

    const handleClick = event => {
        if (isActive) {
            document.querySelector(".button-landscape")?.classList.remove('bg-green');
            document.querySelector(".onclick-color-text")?.classList.remove('block-onlick-text');
            document.querySelector(".button-landscape-text")?.classList.remove('choose-color-text-remove');
            document.querySelector(".button-control-inner")?.classList.remove('cursor');
        } else {
            document.querySelector(".button-landscape")?.classList.add('bg-green');
            document.querySelector(".button-landscape-text")?.classList.add('choose-color-text-remove');
            document.querySelector(".onclick-color-text")?.classList.add('block-onlick-text');
            document.querySelector(".button-control-inner")?.classList.add('cursor');
        }
        setIsActive(current => !current);
        document.querySelector(".button-landscape")?.classList.remove('bg-blue');
        document.querySelector(".button-landscape")?.classList.remove('bg-orange');
    };

    const handleClickOrange = event => {
        if (isActiveOrange) {
            document.querySelector(".button-landscape")?.classList.remove('bg-orange');
            document.querySelector(".onclick-color-text")?.classList.remove('block-onlick-text');
            document.querySelector(".button-landscape-text")?.classList.remove('choose-color-text-remove');
            document.querySelector(".button-control-inner")?.classList.remove('cursor');
        } else {
            document.querySelector(".button-landscape")?.classList.add('bg-orange');
            document.querySelector(".button-landscape-text")?.classList.add('choose-color-text-remove');
            document.querySelector(".onclick-color-text")?.classList.add('block-onlick-text');
            document.querySelector(".button-control-inner")?.classList.add('cursor');
        }
        setIsActiveOrange(current => !current);
        document.querySelector(".button-landscape")?.classList.remove('bg-blue');
        document.querySelector(".button-landscape")?.classList.remove('bg-green');
    };

    const handleClickBlue = event => {
        if (isActiveBlue) {
            document.querySelector(".button-landscape")?.classList.remove('bg-blue');
            document.querySelector(".onclick-color-text")?.classList.remove('block-onlick-text');
            document.querySelector(".button-landscape-text")?.classList.remove('choose-color-text-remove');
            document.querySelector(".button-control-inner")?.classList.remove('cursor');
        } else {
            document.querySelector(".button-landscape")?.classList.add('bg-blue');
            document.querySelector(".button-landscape-text")?.classList.add('choose-color-text-remove');
            document.querySelector(".onclick-color-text")?.classList.add('block-onlick-text');
            document.querySelector(".button-control-inner")?.classList.add('cursor');
        }
        setIsActiveBlue(current => !current);
        document.querySelector(".button-landscape")?.classList.remove('bg-green');
        document.querySelector(".button-landscape")?.classList.remove('bg-orange');
    };

    const handleClickUpDown = event => {
        setIsActiveUpDown(current => !current);
        document.querySelectorAll('.hidden-user-gaming').forEach(function (elem) {
            elem?.classList.toggle('user-game-details-none');
            document.querySelector(".user-data-game-show")?.classList.toggle('height-remove');
        });
    };

    const handleRemoveBg = event => {
        let bgExist = document.querySelector(".button-landscape")?.classList.contains('bg-green');
        if (bgExist) {
            document.querySelector(".button-landscape")?.classList.remove('bg-green');
            document.querySelector(".down-active-btn")?.classList.add('value-show-green');
            document.querySelector(".onclick-color-text")?.classList.remove('block-onlick-text')
            document.querySelector(".button-landscape-text")?.classList.remove('choose-color-text-remove')
            document.querySelector(".onclick-prices-hidden")?.classList.remove('remove-price-onclick-green')
            setTimeout(function () {
                document.getElementById("choose-multiple-id")?.classList.add("choose-d-block");
                setTimeout(function () {
                    document.getElementById("choose-multiple-id")?.classList.remove("choose-d-block");
                }, 150);
            }, 100);

        }

        let bgExistOrange = document.querySelector(".button-landscape")?.classList.contains('bg-orange');
        if (bgExistOrange) {
            document.querySelector(".button-landscape")?.classList.remove('bg-orange');
            document.querySelector(".down-active-btn")?.classList.add('value-show-orange');
            document.querySelector(".onclick-color-text")?.classList.remove('block-onlick-text')
            document.querySelector(".button-landscape-text")?.classList.remove('choose-color-text-remove')
            document.querySelector(".onclick-prices-hidden")?.classList.remove('remove-price-onclick-orange')
            setTimeout(function () {
                document.getElementById("choose-multiple-id")?.classList.add("choose-d-block");
                setTimeout(function () {
                    document.getElementById("choose-multiple-id")?.classList.remove("choose-d-block");
                }, 150);
            }, 100);

        }

        let bgExistBlue = document.querySelector(".button-landscape")?.classList.contains('bg-blue');
        if (bgExistBlue) {
            document.querySelector(".button-landscape")?.classList.remove('bg-blue');
            document.querySelector(".down-active-btn")?.classList.add('value-show-blue');
            document.querySelector(".onclick-color-text")?.classList.remove('block-onlick-text')
            document.querySelector(".button-landscape-text")?.classList.remove('choose-color-text-remove')
            // document.querySelector(".onclick-prices-hidden")?.classList.remove('remove-price-onclick-blue')
            setTimeout(function () {
                document.getElementById("choose-multiple-id")?.classList.add("choose-d-block");
                setTimeout(function () {
                    document.getElementById("choose-multiple-id")?.classList.remove("choose-d-block");
                }, 150);
            }, 100);

        }
    }

    // 


    return (
        <>



            <Index.Box className="dashbaord-user-main-page">
                <Index.Box className="dasboard-flex-user-main">
                    <Index.Box className="left-dashboard-main-user">
                        {/*  */}


                        <Index.Box className="betting-three-main" >
                            <Index.Box className="spin-ball-strike-content">

                            </Index.Box>
                            <Index.Box className="game-spin-main-content">
                                <Index.Box className="game-spin-details">
                                    <Index.Box className="spin-arrow-content"></Index.Box>
                                    <Index.Box className="game-content-rounded">
                                        <Index.Box className="gaming-brun">
                                            <Index.Box className="gaming-circle-count">
                                            </Index.Box>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                            <Index.Box className="user-data-game-show">
                                <Index.Box className="user-show-details">
                                    <Index.Box className="up-dow-user-data-arrow">
                                        <Index.Button className='down-up-btn' onClick={handleClickUpDown}>
                                            <img src={PagesIndex.Svg.downbetting} className='down-betting' />
                                        </Index.Button>
                                    </Index.Box>
                                    <Index.Box className="user-row-details">
                                        <Index.Box className="sky-blue-details-content list-flex-calc">
                                            <Index.Box className="total-play-list-details">
                                                <Index.Box className="user-list-flex-content">
                                                    <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                    <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                </Index.Box>
                                                <Index.Box className="user-list-total-flex">
                                                    <Index.Typography variant='p' component='p' className="user-name-details-player">Player</Index.Typography>
                                                    <Index.Typography variant='p' component='p' className="user-name-prices-player">Total</Index.Typography>
                                                </Index.Box>
                                            </Index.Box>
                                            <Index.Box className="betting-user-details hidden-user-gaming">
                                                <Index.Box className="betting-player-sky-details">
                                                    <Index.Box className="user-list-flex-content mb-player-betting">
                                                        <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                        <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                    </Index.Box>
                                                    <Index.Box className="user-list-flex-content mb-player-betting">
                                                        <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                        <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                    </Index.Box>
                                                    <Index.Box className="user-list-flex-content mb-player-betting">
                                                        <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                        <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                    </Index.Box>
                                                    <Index.Box className="user-list-flex-content mb-player-betting">
                                                        <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                        <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                    </Index.Box>
                                                </Index.Box>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="orange-details-content list-flex-calc">
                                            <Index.Box className="total-play-list-details">
                                                <Index.Box className="user-list-flex-content">
                                                    <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                    <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                </Index.Box>
                                                <Index.Box className="user-list-total-flex">
                                                    <Index.Typography variant='p' component='p' className="user-name-details-player">Player</Index.Typography>
                                                    <Index.Typography variant='p' component='p' className="user-name-prices-player">Total</Index.Typography>
                                                </Index.Box>
                                            </Index.Box>
                                            <Index.Box className="betting-user-details hidden-user-gaming">
                                                <Index.Box className="betting-player-sky-details">
                                                    <Index.Box className="user-list-flex-content mb-player-betting">
                                                        <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                        <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                    </Index.Box>
                                                    <Index.Box className="user-list-flex-content mb-player-betting">
                                                        <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                        <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                    </Index.Box>
                                                    <Index.Box className="user-list-flex-content mb-player-betting">
                                                        <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                        <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                    </Index.Box>
                                                    <Index.Box className="user-list-flex-content mb-player-betting">
                                                        <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                        <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                    </Index.Box>
                                                </Index.Box>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="green-details-content list-flex-calc">
                                            <Index.Box className="total-play-list-details">
                                                <Index.Box className="user-list-flex-content">
                                                    <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                    <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                </Index.Box>
                                                <Index.Box className="user-list-total-flex">
                                                    <Index.Typography variant='p' component='p' className="user-name-details-player">Player</Index.Typography>
                                                    <Index.Typography variant='p' component='p' className="user-name-prices-player">Total</Index.Typography>
                                                </Index.Box>
                                            </Index.Box>
                                            <Index.Box className="betting-user-details hidden-user-gaming">
                                                <Index.Box className="betting-player-sky-details ">
                                                    <Index.Box className="user-list-flex-content mb-player-betting">
                                                        <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                        <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                    </Index.Box>
                                                    <Index.Box className="user-list-flex-content mb-player-betting">
                                                        <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                        <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                    </Index.Box>
                                                    <Index.Box className="user-list-flex-content mb-player-betting">
                                                        <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                        <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                    </Index.Box>
                                                    <Index.Box className="user-list-flex-content mb-player-betting">
                                                        <Index.Typography variant='p' component='p' className="user-name-details">Tasty Gecko</Index.Typography>
                                                        <Index.Typography variant='p' component='p' className="user-name-prices">$72.00</Index.Typography>
                                                    </Index.Box>
                                                </Index.Box>
                                            </Index.Box>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                            <Index.Box className="game-controller-details">
                                <Index.Box className="game-amount-details">
                                    <Index.Box className="game-amount-title">Bet Amount</Index.Box>
                                    <Index.Box className="game-amount-inner">
                                        <Index.Box className="game-amount-landscape">
                                            <Index.Box className="amount-landscape-inner">
                                                <Index.Box className="amount-landscape-center">
                                                    <Index.Typography className="game-amount-landscape-label" variant='label' component='label'></Index.Typography>
                                                    <Index.TextField
                                                        className="amount-form-control"
                                                        type="email"
                                                        name="email"
                                                        value="$80"
                                                    />
                                                </Index.Box>
                                                <Index.Box className="amount-landscape-game-btns">
                                                    <Index.Box className="game-amount-landscape-btn game-topleft">
                                                        max
                                                    </Index.Box>
                                                    <Index.Box className="game-amount-landscape-btn game-topright">
                                                        +
                                                    </Index.Box>
                                                    <Index.Box className="game-amount-landscape-btn game-bottomleft">
                                                        -
                                                    </Index.Box>
                                                    <Index.Box className="game-amount-landscape-btn game-bottomright">
                                                        max
                                                    </Index.Box>
                                                </Index.Box>
                                            </Index.Box>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                                <Index.Box className="button-game-user-list">
                                    <Index.Box className="button-inner-list">
                                       
                                        <Index.Box className="button-item game-green-btn">
                                            <Index.Box className="button-led-game"></Index.Box>
                                            <Index.Box className="button-sum-game"></Index.Box>
                                            <Index.Box
                                                onClick={(e) => handleClickBlue(e)}
                                                className={`button-btn-game ${isActiveBlue ? "down-active-btn" : ""
                                                    }`}>
                                                <span className="price-value-details">X2</span>
                                                <span className="cancel-span" >Cancel</span>
                                            </Index.Box>
                                            <Index.Box className="onclick-prices-hidden remove-price-onclick-blue">
                                                <span className="onclick-bet-price">$80.00</span>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="button-item game-orange-btn">
                                            <Index.Box className="button-led-game"></Index.Box>
                                            <Index.Box className="button-sum-game"></Index.Box>
                                            <Index.Box
                                                onClick={handleClickOrange}
                                                className={`button-btn-game ${isActiveOrange ? "down-active-btn" : ""
                                                    }`}>
                                                <span className="price-value-details">X2</span>
                                                <span className="cancel-span">Cancel</span>
                                            </Index.Box>
                                            <Index.Box className="onclick-prices-hidden remove-price-onclick-orange">
                                                <span className="onclick-bet-price">$80.00</span>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="button-item game-purple-btn">
                                            <Index.Box className="button-led-game"></Index.Box>
                                            <Index.Box className="button-sum-game"></Index.Box>
                                            <Index.Box onClick={handleClick}
                                                className={`button-btn-game ${isActive ? "down-active-btn" : ""
                                                    }`}>
                                                <span className="price-value-details">X2</span>
                                                <span className="cancel-span">Cancel</span>
                                            </Index.Box>
                                            <Index.Box className="onclick-prices-hidden remove-price-onclick-green">
                                                <span className="onclick-bet-price">$80.00</span>
                                            </Index.Box>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                                <Index.Box className="button-control-game">
                                    <Index.Box className="button-control-inner">
                                        <Index.Box className="button-landscape" onClick={(e) => handleRemoveBg(e)}>
                                            <Index.Box className="button-landscape-inner" >
                                                <span className="button-landscape-text" id='rotate-choose-none'>Choose color</span>
                                                <span className="onclick-color-text" >Place bet</span>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="choose-process">
                                            <Index.Box className="liner-border-choose" id="line-single-id">
                                                <Index.Box className="button-await-details">
                                                </Index.Box>
                                                <Index.Box className="border-timer-rounded ">
                                                    <svg viewBox="0 0 64 64"><circle r="25%" cx="50%" cy="50%" stroke-width="0.6" fill-opacity="0" stroke="#05ff00"></circle></svg>
                                                </Index.Box>
                                            </Index.Box>
                                            <Index.Box className="choose-mutiple-rounded choose-d-done" id="choose-multiple-id">
                                                <Index.Box className="multi-line-border">
                                                    <img src={PageIndex.Svg.loaderimg} className='loader-img-multi'></img>
                                                </Index.Box>
                                            </Index.Box>
                                            <Index.Box className="multiple-line-timer-show">
                                                <Index.Typography className='multiline-title' variant='p' component='p'>05:35<span>s</span></Index.Typography>
                                            </Index.Box>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="timer-right-control">
                                        <Index.Typography className='timer-title' variant='p' component='p'>05:35<span>s</span></Index.Typography>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                        {/*  */}

                        {/* <Index.Box class="wrap" >
                                <Index.Box class="inner">
                                    <Index.Box class="game">
                                        <Index.Box class="game__current"></Index.Box>
                                        <Index.Box class="game__inner">
                                            <Index.Box class="game__brum">
                                                <Index.Box class="game__circle"></Index.Box>
                                            </Index.Box>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box> */}

                    </Index.Box>

                    <CardAndCommunityBetting/>

                    {/* <Index.Box className="right-dashboard-main-user">
                        <Index.Box className="card-betting-list">
                            <Index.Box className="card-betting-main">
                                <Index.Box className="betting-img-content">
                                    <img src={PagesIndex.Png.bettingone} className="betting-img" alt="betting" />
                                </Index.Box>
                                <Index.Box className="betting-card-bg">
                                    <Index.Box className="betting-card-pd">
                                        <Index.Typography component='h5' variant='h5' className="betting-title-right">Community Betting</Index.Typography>
                                        <Index.Typography component='p' variant='p' className="betting-details-right">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</Index.Typography>
                                        <Index.Box className="betting-card-btn-comman">
                                            <PagesIndex.BlueButton btnLabel="Play Now" className="blue-btn-content" onClick={() => setOpen(true)} />
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                            <Index.Box className="card-betting-main">
                                <Index.Box className="betting-img-content">
                                    <img src={PagesIndex.Png.bettingtwo} className="betting-img" alt="betting" />
                                </Index.Box>
                                <Index.Box className="betting-card-bg">
                                    <Index.Box className="betting-card-pd">
                                        <Index.Typography component='h5' variant='h5' className="betting-title-right">Community Betting</Index.Typography>
                                        <Index.Typography component='p' variant='p' className="betting-details-right">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</Index.Typography>
                                        <Index.Box className="betting-card-btn-comman">
                                            <PagesIndex.BlueButton btnLabel="Play Now" className="blue-btn-content" onClick={() => setOpen(true)} />
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
