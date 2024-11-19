import React from 'react'
import Index from '../../../Index'
import PageIndex from '../../../pageIndex'

export default function BannerViewPage() {
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
            Banner Details
          </Index.Typography>
        </Index.Box>
      </Index.Box>

      <Index.Box className="page-content-box view-box">
        <Index.Box className="barge-common-box">
          <Index.Grid container className="grid-banner-view">
            <Index.Grid item xs={12} sm={6} md={6} className="grid-banner-list">
              <Index.Box className="banner-list-details user-manage-details-inner">
                <Index.Box className="flex-user-manage banner-img-content">
                  <Index.Typography
                    variant="label"
                    component="label"
                    className="input-label line-height user-title-management"
                  >
                    Banner Image : 
                  </Index.Typography>
                  <Index.Typography
                    variant="p"
                    component="p"
                    className="input-user-desc"
                  >
                    <img src={PageIndex.Png.deposit} className="deposit-banner-view" />
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Grid>
            <Index.Grid item xs={12} sm={12} md={12} className="grid-banner-list">
              <Index.Box className="banner-list-details user-manage-details-inner">
                <Index.Box className="flex-user-manage banner-img-content">
                  <Index.Typography
                    variant="label"
                    component="label"
                    className="input-label line-height user-title-management "
                  >
                    Banner Name :
                  </Index.Typography>
                  <Index.Typography
                    variant="p"
                    component="p"
                    className="input-user-desc"
                  >
                    Community Betting
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Grid>
            <Index.Grid item xs={12} sm={6} md={12} className="grid-banner-list">
              <Index.Box className="banner-list-details user-manage-details-inner">
                <Index.Box className="flex-user-manage banner-img-content">
                  <Index.Typography
                    variant="label"
                    component="label"
                    className="input-label line-height user-title-management"
                  >
                    Description :
                  </Index.Typography>
                  <Index.Typography
                    variant="p"
                    component="p"
                    className="input-user-desc"
                  >
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Grid>
            <Index.Grid item xs={12} sm={6} md={12} className="grid-banner-list">
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
