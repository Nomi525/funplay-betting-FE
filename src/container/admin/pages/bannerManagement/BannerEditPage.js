import React from 'react'
import Index from '../../../Index'
import PageIndex from '../../../pageIndex'

export default function BannerEditPage() {
    return (
        <>

            <Index.Box className="admin-comman-title-right">
                <Index.Box className="flex-user-management-inner">
                    <Index.Typography
                        className="admin-page-title hover"
                        variant="p"
                        component='p'
                    >
                        Banner Management
                    </Index.Typography>
                    <Index.ArrowForwardIosIcon className="ArrowForwardIosIcon-icon-right" />
                    <Index.Typography className="admin-page-title inner-sub-title" variant="p" component='p'>
                        Banner Edit
                    </Index.Typography>
                </Index.Box>
            </Index.Box>

            <Index.Box className="page-content-box view-box">
                <Index.Box className="barge-common-box">
                    <Index.Grid container className="grid-banner-view">
                        <Index.Grid item xs={12} sm={12} md={12} className="grid-banner-list mb-banner-list">
                            <Index.Typography
                                variant="label"
                                component="label"
                                className="input-label"
                            >
                                Banner Name
                            </Index.Typography>
                            <Index.Box className="input-design-div with-border">
                                <Index.TextField
                                    id="filled-hidden-label-normal"
                                    placeholder="Banner Name "
                                    variant="filled"
                                    className="admin-input-design input-placeholder"
                                    autoComplete="off"
                                    name="gameName"
                                />
                            </Index.Box>
                        </Index.Grid>
                        <Index.Grid item xs={12} sm={12} md={12} className="grid-banner-list mb-banner-list">
                            <Index.Typography
                                variant="label"
                                component="label"
                                className="input-label"
                            >
                                Banner Name
                            </Index.Typography>
                            <Index.Box className="input-design-div with-border banner-upload-details">
                                <Index.Box className="title-name-upload">
                                    <Index.Button variant="contained" component="label" className='upload-sign-btn custom-file-upload' disableRipple>
                                        Banner Upload
                                        <input hidden accept="image/*" multiple type="file" className='inputfile-upload ' />
                                    </Index.Button>
                                </Index.Box>
                            </Index.Box>
                        </Index.Grid>
                        <Index.Grid item xs={12} sm={6} md={12} className="grid-banner-list mb-banner-list">
                            <Index.Typography
                                variant="label"
                                component="label"
                                className="input-label"
                            >
                                Description
                            </Index.Typography>
                            <Index.Box className="input-design-div with-border banner-textarea main-content-textarea">
                                <Index.TextareaAutosize
                                    id="filled-hidden-label-normal"
                                    placeholder="Description"
                                    variant="filled"
                                    className="form-control custom-auth-user-control textarea-content-comman"
                                    autoComplete="off"
                                    name="gameName"
                                />
                            </Index.Box>
                        </Index.Grid>
                        <Index.Grid item xs={12} sm={6} md={12} className="grid-banner-list mb-banner-list">
                            <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn btn-admin-end" mt={3}>
                                <Index.Button variant="contained" >
                                    Submit
                                </Index.Button>
                            </Index.Box>
                        </Index.Grid>
                    </Index.Grid>
                </Index.Box>
            </Index.Box>


        </>
    )
}
