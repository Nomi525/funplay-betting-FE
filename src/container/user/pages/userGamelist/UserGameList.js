import React from 'react'
import Index from '../../../Index'
import PageIndex from '../../../pageIndex'

export default function UserGameList() {
    return (
        <>

            <Index.Box className="game-list-details">
                <Index.Box sx={{ width: 1 }} className="grid-main grid-top-weekly">
                    <Index.Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={{ xs: 0, sm: 0, md: 0, lg: 0 }} className="grid-inner-weekly">
                        <Index.Box gridColumn={{ xs: "span 12", sm: "span 6", md: "span 4", lg: "span 4" }} className="grid-column mb-30px-form">
                            <Index.Box className="card-our-game-main">
                                <Index.Box className="card-game-our-pd">
                                    <Index.Box className="our-game-img-content">
                                        <img src={PageIndex.Png.ourgameone} className='our-game-bg' alt="our-game-content" />
                                    </Index.Box>
                                    <Index.Box className="our-game-details">
                                        <Index.Typography component='h6' variant='h6' className='number-betting'>Number Betting</Index.Typography>
                                        <Index.Box className="star-list-content">
                                            <Index.Box className="flex-star-game">
                                                <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                            </Index.Box>
                                            <Index.Typography component='p' variant='p' className="review-game-main">(1200)</Index.Typography>
                                        </Index.Box>
                                        <Index.Box className="our-game-details">
                                            <Index.Typography component='p' variant='p' className="game-details-content">Lorem Ipsum is simply dummy text of the printing.</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                        <Index.Box gridColumn={{ xs: "span 12", sm: "span 6", md: "span 4", lg: "span 4" }} className="grid-column mb-30px-form">
                            <Index.Box className="card-our-game-main">
                                <Index.Box className="card-game-our-pd">
                                    <Index.Box className="our-game-img-content">
                                        <img src={PageIndex.Png.ourgametwo} className='our-game-bg' alt="our-game-content" />
                                    </Index.Box>
                                    <Index.Box className="our-game-details">
                                        <Index.Typography component='h6' variant='h6' className='number-betting'>Community Betting</Index.Typography>
                                        <Index.Box className="star-list-content">
                                            <Index.Box className="flex-star-game">
                                                <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                            </Index.Box>
                                            <Index.Typography component='p' variant='p' className="review-game-main">(354)</Index.Typography>
                                        </Index.Box>
                                        <Index.Box className="our-game-details">
                                            <Index.Typography component='p' variant='p' className="game-details-content">Lorem Ipsum is simply dummy text of the printing.</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                        <Index.Box gridColumn={{ xs: "span 12", sm: "span 6", md: "span 4", lg: "span 4" }} className="grid-column mb-30px-form">
                            <Index.Box className="card-our-game-main">
                                <Index.Box className="card-game-our-pd">
                                    <Index.Box className="our-game-img-content">
                                        <img src={PageIndex.Png.ourgamethree} className='our-game-bg' alt="our-game-content" />
                                    </Index.Box>
                                    <Index.Box className="our-game-details">
                                        <Index.Typography component='h6' variant='h6' className='number-betting'>3 Colour Betting</Index.Typography>
                                        <Index.Box className="star-list-content">
                                            <Index.Box className="flex-star-game">
                                                <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                            </Index.Box>
                                            <Index.Typography component='p' variant='p' className="review-game-main">(6548)</Index.Typography>
                                        </Index.Box>
                                        <Index.Box className="our-game-details">
                                            <Index.Typography component='p' variant='p' className="game-details-content">Lorem Ipsum is simply dummy text of the printing.</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                        <Index.Box gridColumn={{ xs: "span 12", sm: "span 6", md: "span 4", lg: "span 4" }} className="grid-column mb-30px-form">
                        <Index.Box className="card-our-game-main">
                      <Index.Box className="card-game-our-pd">
                        <Index.Box className="our-game-img-content">
                          <img src={PageIndex.Png.ourgamefour} className='our-game-bg' alt="our-game-content" />
                        </Index.Box>
                        <Index.Box className="our-game-details">
                          <Index.Typography component='h6' variant='h6' className='number-betting'>2 Colour Betting</Index.Typography>
                          <Index.Box className="star-list-content">
                            <Index.Box className="flex-star-game">
                              <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                              <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                              <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                              <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                              <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                            </Index.Box>
                            <Index.Typography component='p' variant='p' className="review-game-main">(98445)</Index.Typography>
                          </Index.Box>
                          <Index.Box className="our-game-details">
                            <Index.Typography component='p' variant='p' className="game-details-content">Lorem Ipsum is simply dummy text of the printing.</Index.Typography>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                        </Index.Box>
                        <Index.Box gridColumn={{ xs: "span 12", sm: "span 6", md: "span 4", lg: "span 4" }} className="grid-column mb-30px-form">
                            <Index.Box className="card-our-game-main">
                                <Index.Box className="card-game-our-pd">
                                    <Index.Box className="our-game-img-content">
                                        <img src={PageIndex.Png.ourgamefive} className='our-game-bg' alt="our-game-content" />
                                    </Index.Box>
                                    <Index.Box className="our-game-details">
                                        <Index.Typography component='h6' variant='h6' className='number-betting'>
                                            Card Betting</Index.Typography>
                                        <Index.Box className="star-list-content">
                                            <Index.Box className="flex-star-game">
                                                <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                            </Index.Box>
                                            <Index.Typography component='p' variant='p' className="review-game-main">(1200)</Index.Typography>
                                        </Index.Box>
                                        <Index.Box className="our-game-details">
                                            <Index.Typography component='p' variant='p' className="game-details-content">Lorem Ipsum is simply dummy text of the printing.</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                        <Index.Box gridColumn={{ xs: "span 12", sm: "span 6", md: "span 4", lg: "span 4" }} className="grid-column mb-30px-form">
                            <Index.Box className="card-our-game-main">
                                <Index.Box className="card-game-our-pd">
                                    <Index.Box className="our-game-img-content">
                                        <img src={PageIndex.Png.ourgamesix} className='our-game-bg' alt="our-game-content" />
                                    </Index.Box>
                                    <Index.Box className="our-game-details">
                                        <Index.Typography component='h6' variant='h6' className='number-betting'>Penalty Betting</Index.Typography>
                                        <Index.Box className="star-list-content">
                                            <Index.Box className="flex-star-game">
                                                <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.yellowstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                                <img src={PageIndex.Svg.blackstar} className="star-game" alt="star-game" />
                                            </Index.Box>
                                            <Index.Typography component='p' variant='p' className="review-game-main">(1200)</Index.Typography>
                                        </Index.Box>
                                        <Index.Box className="our-game-details">
                                            <Index.Typography component='p' variant='p' className="game-details-content">Lorem Ipsum is simply dummy text of the printing.</Index.Typography>
                                        </Index.Box>
                                    </Index.Box>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                    </Index.Box>
                </Index.Box>
            </Index.Box>

        </>
    )
}
