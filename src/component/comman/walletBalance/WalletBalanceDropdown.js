import React from 'react'
import Index from '../../Index'
import PageIndex from '../../PageIndex'

export default function WalletBalanceDropdown() {


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>

            <Index.Box className="wallet-balance-main-content">
                <Index.IconButton
                    onClick={handleClick}
                    size="small"
                    className='icon-btn-wallet'
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Index.Box className="wallet-num-list block-wallet">
                        <Index.Box className="wallet-bg-main">
                            <Index.Box className="wallet-pd-content">
                                <img
                                    src={PageIndex.Png.dollar}
                                    className="wallet-main"
                                    alt="wallet"
                                />
                                <Index.Typography
                                    component="p"
                                    variant="p"
                                    className="wallet-number"
                                >
                                    00

                                </Index.Typography>
                            </Index.Box>
                        </Index.Box>

                    </Index.Box>
                </Index.IconButton>
            </Index.Box>
            <Index.Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                className='menu-details-wallets'
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                          
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Index.Typography className='wallet-title-inner'>
                   Cashler
                </Index.Typography>
                <Index.MenuItem onClick={handleClose} className='wallet-menu-item'>
                    <Index.Button className='wallet-btn-content'>
                        <Index.Box className="wallet-icon-listing">
                            <Index.Box className="flx-wallet-icon">
                                <img src={PageIndex.Svg.ethereum} className="wallet-icons-inner"></img>
                                <Index.Typography variant='p' className='wallet-title-details'>ETH</Index.Typography>
                            </Index.Box>
                            <Index.Box className="walllet-price-show">
                                <span>$</span>0.00
                            </Index.Box>
                        </Index.Box>
                    </Index.Button>
                </Index.MenuItem>
                <Index.MenuItem onClick={handleClose} className='wallet-menu-item'>
                    <Index.Button className='wallet-btn-content'>
                        <Index.Box className="wallet-icon-listing">
                            <Index.Box className="flx-wallet-icon">
                                <img src={PageIndex.Svg.ethereum} className="wallet-icons-inner"></img>
                                <Index.Typography variant='p' className='wallet-title-details'>LFI</Index.Typography>
                            </Index.Box>
                            <Index.Box className="walllet-price-show">
                                <span>$</span>0.00
                            </Index.Box>
                        </Index.Box>
                    </Index.Button>
                </Index.MenuItem>
                <Index.MenuItem onClick={handleClose} className='wallet-menu-item'>
                    <Index.Button className='wallet-btn-content active-wallet-balance'>
                        <Index.Box className="wallet-icon-listing">
                            <Index.Box className="flx-wallet-icon">
                                <img src={PageIndex.Svg.ethereum} className="wallet-icons-inner"></img>
                                <Index.Typography variant='p' className='wallet-title-details'>LFI</Index.Typography>
                                <img src={PageIndex.Svg.information} className="info-wallet-details"></img>
                            </Index.Box>
                            <Index.Box className="walllet-price-show">
                                <img className='lock-wallet-icon' src={PageIndex.Svg.lock}></img>
                                <span>$</span>0.00
                            </Index.Box>
                        </Index.Box>
                    </Index.Button>
                </Index.MenuItem>
                <Index.MenuItem onClick={handleClose} className='wallet-menu-item'>
                    <Index.Button className='wallet-btn-content'>
                        <Index.Box className="wallet-icon-listing">
                            <Index.Box className="flx-wallet-icon">
                                <img src={PageIndex.Svg.ethereum} className="wallet-icons-inner"></img>
                                <Index.Typography variant='p' className='wallet-title-details'>LFI</Index.Typography>
                            </Index.Box>
                            <Index.Box className="walllet-price-show">
                                <span>$</span>0.00
                            </Index.Box>
                        </Index.Box>
                    </Index.Button>
                </Index.MenuItem>
                <Index.MenuItem onClick={handleClose} className='wallet-menu-item'>
                    <Index.Button className='wallet-btn-content'>
                        <Index.Box className="wallet-icon-listing">
                            <Index.Box className="flx-wallet-icon">
                                <img src={PageIndex.Svg.ethereum} className="wallet-icons-inner"></img>
                                <Index.Typography variant='p' className='wallet-title-details'>LFI</Index.Typography>
                            </Index.Box>
                            <Index.Box className="walllet-price-show">
                                <span>$</span>0.00
                            </Index.Box>
                        </Index.Box>
                    </Index.Button>
                </Index.MenuItem>
                <Index.MenuItem className='wallet-menu-item'>
                    <Index.Box className="wallet-deposit-btn">
                    <PageIndex.BlueButton btnLabel="Deposit" className="blue-btn-content"/>
                    </Index.Box>
                </Index.MenuItem>
                <Index.MenuItem className='wallet-menu-item'>
                    <Index.Box className="wallet-withdrawel-btn">
                    <PageIndex.BlueOutlineButton btnLabel="Withdrawal"  className="outline-blue-btn-content" />
                    </Index.Box>
                </Index.MenuItem>
            </Index.Menu>


        </>
    )
}
