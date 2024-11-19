import React, { useEffect, useState } from 'react'
import Index from '../../../Index'
import PageIndex from '../../../pageIndex'

export default function UserNumberBetting() {

    const [isAnimationStop, setIsAnimationStop] = useState(false);
    const [selectedBall, setSelectedBall] = useState([])

    const handleStopAnimation = (flag, count) => {

        let newFeatures = [...selectedBall, count]
        setIsAnimationStop(flag)
        setSelectedBall(newFeatures)
    }




    return (
        <>


            <Index.Box className="row-numberbetting">
                <Index.Box className="col7-number">
                    <Index.Box className="flex-content">

                        <Index.Box class="ball-container">
                            {
                                [...Array(100)].splice(1, 10).map((item, index) => {
                                    let count = index + 1;
                                    return (
                                        <>

                                            <Index.Box class={isAnimationStop ? selectedBall.length && selectedBall?.includes(count) ? ` ball color-${count} animation-stop` : ` ball color-${count}` : `ball color-${count} clock-rotated-${(index + 1) % 2 == 0 ? "right" : "left"}`} onClick={() => handleStopAnimation(true, count)}>
                                                <span>{count}</span>
                                            </Index.Box>

                                        </>
                                    )
                                })
                            }
                        </Index.Box>
                        <Index.Box class="ball-container">
                            {
                                [...Array(100)].splice(11, 20).map((item, index) => {
                                    let count = index + 11
                                    return (
                                        <>
                                            {count < 21 &&
                                                <Index.Box class={isAnimationStop ? selectedBall.length && selectedBall?.includes(count) ? ` ball color-${count} animation-stop` : ` ball color-${count}` : `ball color-${count} clock-rotated-${(index + 1) % 2 == 0 ? "right" : "left"}`} onClick={() => handleStopAnimation(true, count)}>
                                                    <span>{count}</span>
                                                </Index.Box>
                                            }

                                        </>
                                    )
                                })
                            }
                        </Index.Box>
                        <Index.Box class="ball-container">
                            {
                                [...Array(100)].splice(21, 30).map((item, index) => {
                                    let count = index + 21
                                    return (
                                        <>
                                            {count < 31 &&
                                                <Index.Box class={isAnimationStop ? selectedBall.length && selectedBall?.includes(count) ? ` ball color-${count} animation-stop` : ` ball color-${count}` : `ball color-${count} clock-rotated-${(count) % 2 == 0 ? "right" : "left"}`} onClick={() => handleStopAnimation(true, count)}>
                                                    <span>{count}</span>
                                                </Index.Box>
                                            }


                                        </>
                                    )
                                })
                            }
                        </Index.Box>
                        <Index.Box class="ball-container">
                            {
                                [...Array(100)].splice(31, 40).map((item, index) => {
                                    let count = index + 31
                                    return (
                                        <>
                                            {count < 41 &&
                                                <Index.Box class={isAnimationStop ? selectedBall.length && selectedBall?.includes(count) ? ` ball color-${count} animation-stop` : ` ball color-${count}` : `ball color-${count} clock-rotated-${(count) % 2 == 0 ? "right" : "left"}`} onClick={() => handleStopAnimation(true, count)}>
                                                    <span>{count}</span>
                                                </Index.Box>
                                            }


                                        </>
                                    )
                                })
                            }
                        </Index.Box>
                        <Index.Box class="ball-container">
                            {
                                [...Array(100)].splice(41, 50).map((item, index) => {
                                    let count = index + 41

                                    return (
                                        <>
                                            {count < 51 &&
                                                <Index.Box class={isAnimationStop ? selectedBall.length && selectedBall?.includes(count) ? ` ball color-${count} animation-stop` : ` ball color-${count}` : `ball color-${count} clock-rotated-${(count) % 2 == 0 ? "right" : "left"}`} onClick={() => handleStopAnimation(true, count)}>
                                                    <span>{count}</span>
                                                </Index.Box>
                                            }


                                        </>
                                    )
                                })
                            }
                        </Index.Box>
                        <Index.Box class="ball-container">
                            {
                                [...Array(100)].splice(51, 60).map((item, index) => {

                                    let count = index + 51
                                    return (
                                        <>
                                            {count < 61 &&
                                                <Index.Box class={isAnimationStop ? selectedBall.length && selectedBall?.includes(count) ? ` ball color-${count} animation-stop` : ` ball color-${count}` : `ball color-${count} clock-rotated-${(count) % 2 == 0 ? "right" : "left"}`} onClick={() => handleStopAnimation(true, count)}>
                                                    <span>{count}</span>
                                                </Index.Box>
                                            }


                                        </>
                                    )
                                })
                            }
                        </Index.Box>
                        <Index.Box class="ball-container">
                            {
                                [...Array(100)].splice(61, 70).map((item, index) => {
                                    let count = index + 61
                                    return (
                                        <>
                                            {count < 71 &&
                                                <Index.Box class={isAnimationStop ? selectedBall.length && selectedBall?.includes(count) ? ` ball color-${count} animation-stop` : ` ball color-${count}` : `ball color-${count} clock-rotated-${(count) % 2 == 0 ? "right" : "left"}`} onClick={() => handleStopAnimation(true, count)}>
                                                    <span>{count}</span>
                                                </Index.Box>}



                                        </>
                                    )
                                })
                            }
                        </Index.Box>
                        <Index.Box class="ball-container">
                            {
                                [...Array(100)].splice(71, 80).map((item, index) => {
                                    let count = index + 71
                                    return (
                                        <>
                                            {count < 81 &&
                                                <Index.Box class={isAnimationStop ? selectedBall.length && selectedBall?.includes(count) ? ` ball color-${count} animation-stop` : ` ball color-${count}` : `ball color-${count} clock-rotated-${(count) % 2 == 0 ? "right" : "left"}`} onClick={() => handleStopAnimation(true, count)}>
                                                    <span>{count}</span>
                                                </Index.Box>
                                            }


                                        </>
                                    )
                                })
                            }
                        </Index.Box>
                        <Index.Box class="ball-container">
                            {
                                [...Array(100)].splice(81, 90).map((item, index) => {
                                    let count = index + 81
                                    return (
                                        <>
                                            {count < 91 &&
                                                <Index.Box class={isAnimationStop ? selectedBall.length && selectedBall?.includes(count) ? ` ball color-${count} animation-stop` : ` ball color-${count}` : `ball color-${count} clock-rotated-${(count) % 2 == 0 ? "right" : "left"}`} onClick={() => handleStopAnimation(true, count)}>
                                                    <span>{count}</span>
                                                </Index.Box>

                                            }

                                        </>
                                    )
                                })
                            }
                        </Index.Box>
                        <Index.Box class="ball-container">
                            {
                                [...Array(100)].splice(90, 100).map((item, index) => {
                                    let count = index + 91
                                    return (
                                        <>

                                            <Index.Box class={isAnimationStop ? selectedBall.length && selectedBall?.includes(count) ? ` ball color-${count} animation-stop` : ` ball color-${count}` : `ball color-${count} clock-rotated-${(count) % 2 == 0 ? "right" : "left"}`} onClick={() => handleStopAnimation(true, count)}>
                                                <span>{count}</span>
                                            </Index.Box>



                                        </>
                                    )
                                })
                            }
                        </Index.Box>

                    </Index.Box >
                </Index.Box>
                <Index.Box className="col5-number">
                    <Index.Box className="number-bet-details">

                        <Index.Box className="number-bet-timer-content">
                            <Index.Box className="timer-contentpd-details">
                                <Index.Box className="number-bet-title">
                                    <Index.Typography component='h5' variant='h5'>ADD BET</Index.Typography>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                        <Index.Box className="number-details-main">
                            <Index.Box className="bet-timer-details">
                                <Index.Typography component='p' variant='p' className='timer-title-bet'>Bet Timer : </Index.Typography>
                                <Index.Typography component='p' variant='p' className='timer-show-details'>03:00:00</Index.Typography>
                            </Index.Box>
                            <Index.Box className="ball-selected-details">
                                <Index.Box className="ball-title-content">
                                    <Index.Typography component='h4' variant='h4' className="ball-title-h4">Selected Balls</Index.Typography>
                                </Index.Box>
                                <Index.Box className="selected-ul-details">
                                    <Index.Box class="ball-container  ">
                                        <Index.Box class="ball color-5 ">
                                            <span>5</span>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                            <Index.Box className="pd-number-betting-details">
                                <Index.Box className="ball-bet-amount-content">
                                    <Index.Box className="betting-border-list">
                                        <Index.Box className="betting-amount-flex">
                                            <Index.Typography className="bet-amount-details" variant='p' component='p'>Bet Amount</Index.Typography>
                                            <Index.Typography className="bet-amount-prices" variant='p' component='p'>200.00</Index.Typography>
                                            <Index.Typography className="bet-amount-usdt" variant='p' component='p'>USDT</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                                <Index.Box className="bet-coin-num-list">
                                    <Index.Box className="flex-bet-list-ul">
                                        <Index.Box className="number-list-details">
                                            <Index.Box className="bg-num-bet-conetnt">
                                                <Index.Typography className='number-bet-coin' component='p' variant='p'>50</Index.Typography>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="number-list-details">
                                            <Index.Box className="bg-num-bet-conetnt">
                                                <Index.Typography className='number-bet-coin' component='p' variant='p'>100</Index.Typography>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="number-list-details">
                                            <Index.Box className="bg-num-bet-conetnt active-bg">
                                                <Index.Typography className='number-bet-coin' component='p' variant='p'>200</Index.Typography>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="number-list-details">
                                            <Index.Box className="bg-num-bet-conetnt active-bg">
                                                <Index.Typography className='number-bet-coin' component='p' variant='p'>300</Index.Typography>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="number-list-details">
                                            <Index.Box className="bg-num-bet-conetnt">
                                                <Index.Typography className='number-bet-coin' component='p' variant='p'>400</Index.Typography>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="number-list-details">
                                            <Index.Box className="bg-num-bet-conetnt">
                                                <Index.Typography className='number-bet-coin' component='p' variant='p'>500</Index.Typography>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="number-list-details">
                                            <Index.Box className="bg-num-bet-conetnt">
                                                <Index.Typography className='number-bet-coin' component='p' variant='p'>600</Index.Typography>
                                            </Index.Box>
                                        </Index.Box>
                                        <Index.Box className="number-list-details">
                                            <Index.Box className="bg-num-bet-conetnt">
                                                <Index.Typography className='number-bet-coin' component='p' variant='p'>900</Index.Typography>
                                            </Index.Box>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                                <Index.Box className="bet-now-btn-list">
                                    <Index.Box className="betting-card-btn-comman">
                                        <PageIndex.BlueButton btnLabel="BID NOW" className="blue-btn-content" />
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                        {/* <Index.Box className="bet-number-content-scroll">
                            <Index.Box className="bet-coin-num-list">
                                <Index.Box className="flex-bet-list-ul">
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>50</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>100</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt active-bg">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>200</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt active-bg">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>300</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>400</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>500</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>600</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="number-list-details">
                                        <Index.Box className="bg-num-bet-conetnt">
                                            <Index.Typography className='number-bet-coin' component='p' variant='p'>900</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                        <Index.Box className="bet-bottom-number-content">
                            <Index.Box className="num-bet-value-flex">
                                <Index.Box className="number-value-input">
                                    <Index.TextField
                                        className="number-input-fleid"
                                        value="500000"
                                    />
                                </Index.Box>
                                <Index.Box className="done-btn-number">
                                    <Index.Box className="betting-card-btn-comman">
                                        <PageIndex.BlueButton btnLabel="Done" className="blue-btn-content" />
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                            <Index.Box className="bet-now-flex-content">
                                <Index.Box className="flex-count-num">
                                    <Index.Button onClick={incrementCount} className="count-button">+</Index.Button>
                                    <Index.Box className="count-num-show">{count}</Index.Box>
                                    <Index.Button onClick={decrementCount} className="count-button">-</Index.Button>
                                </Index.Box>
                                <Index.Box className="bet-btn-now">
                                    <Index.Box className="betting-card-btn-comman">
                                        <PageIndex.BlueButton btnLabel="BID NOW" className="blue-btn-content" />
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box> */}
                    </Index.Box>
                </Index.Box>
            </Index.Box>

        </>
    )
}
