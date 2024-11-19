import React, { useEffect, useState } from "react";
import Index from "../../../Index";
// import "./AddGame.css";
import PageIndex from "../../../pageIndex";
import { useLocation } from "react-router-dom";

export default function ViewBanner() {
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [time, setTime] = useState([]);
  const [winner, setWinner] = useState([]);
  const location = useLocation();
  const row = location?.state?.selectedData;

  useEffect(() => {
    setWinner(row?.winnersPercentage);
  }, [winner]);
  useEffect(() => {
    setTime(row?.gameSecond);
  }, [time]);

  function handleImage(image) {
    setFile(URL.createObjectURL(image));
  }

  let initialValues = {
    gameName: "",
    gameImage: "",
    gameDuration: "",
  };

  return (
    <>
      <Index.Box className="page-content-box">
        <Index.Box className="barge-common-box">
          <Index.Box className="title-header">
            <Index.Box className="title-header-flex">
              <Index.Box className="title-main mb-10">
                <Index.Typography
                  variant="p"
                  component="p"
                  className="page-title"
                >
                  Game Details
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>

          <PageIndex.Formik initialValues={initialValues} enableReinitialize>
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Index.Box className="view-game-manage-details">
                  <Index.Grid container spacing={3}>
                    <Index.Grid item xs={12} sm={12} md={12}>
                      {/* <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Game Image
                      </Index.Typography> */}
                      <Index.Box className="input-design-div with-border">
                        <label htmlFor="upload-photo">
                          {/* <input
                            style={{ display: "none" }}
                            id="upload-photo"
                            name="uploadphoto"
                            type="file"
                            onChange={(e) => {
                              setFieldValue("uploadphoto", e.target.files[0]);
                              handleImage(e.target.files[0])
                            }}
                          /> */}
                          <Index.Box className="banner-border-profile ">
                            {image ? (
                              <>
                                <Index.Avatar
                                  alt="Remy Sharp"
                                  className="add-game-img"
                                  src={
                                    URL.createObjectURL(image) ||
                                    URL.createObjectURL(row?.gameImage)
                                  }
                                  // src={values?.gameImage ? process.env.REACT_APP_IMG +values?.gameImage : URL.createObjectURL(image)}
                                />
                              </>
                            ) : (
                              <>
                                <Index.Avatar
                                  alt="Remy Sharp"
                                  className="add-game-img"
                                  src={
                                    row?.gameImage &&
                                    process.env.REACT_APP_IMG + row?.gameImage
                                  }
                                />
                              </>
                            )}
                          </Index.Box>
                        </label>
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        Game Name
                      </Index.Typography>
                      <Index.Box className="input-label-box-admin">
                        {row?.gameName}
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        Start Date
                      </Index.Typography>
                      <Index.Box className="input-label-box-admin">
                        {Index.moment(row?.gameTimeFrom).format("DD/MM/YYYY")}
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        End Date
                      </Index.Typography>
                      <Index.Box className="input-label-box-admin">
                        {Index.moment(row?.gameTimeTo).format("DD/MM/YYYY")}
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        Game Start Time
                      </Index.Typography>
                      <Index.Box className="input-label-box-admin">
                        {row?.gameDurationFrom}
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        Game End Time
                      </Index.Typography>
                      <Index.Box className="input-label-box-admin">
                        {row?.gameDurationTo}
                      </Index.Box>
                    </Index.Grid>
                    {row?.gameName === "Community Betting" ||
                    row?.gameName === "Card betting" ||
                    row?.gameName === "Number Betting" ? (
                      <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-design-div with-border view-game-details-content view-mb-label"
                        >
                          Game Duration
                        </Index.Typography>
                        <Index.Box className="input-label-box-admin">
                          {row?.gameHours}
                        </Index.Box>
                      </Index.Grid>
                    ) : null}

                    <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        Minimum Coin
                      </Index.Typography>
                      <Index.Box className="input-label-box-admin">
                        {row?.gameMinimumCoin}
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        Maximum Coin
                      </Index.Typography>
                      <Index.Box className="input-label-box-admin">
                        {row?.gameMaximumCoin}
                      </Index.Box>
                    </Index.Grid>
                    {row?.gameName === "Community Betting" ? (
                      <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-design-div with-border view-game-details-content view-mb-label"
                        >
                          Winning Amount
                        </Index.Typography>
                        <Index.Box className="input-label-box-admin">
                          {row?.gameWinningAmount}
                        </Index.Box>
                      </Index.Grid>
                    ) : null}
                    {row?.gameName === "Community Betting" ? (
                      <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-design-div with-border view-game-details-content view-mb-label"
                        >
                          No. of winners
                        </Index.Typography>
                        <Index.Box className="input-label-box-admin">
                          {row?.noOfWinners}
                        </Index.Box>
                      </Index.Grid>
                    ) : null}
                    <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        Mode
                      </Index.Typography>
                      <Index.Box className="input-label-box-admin">
                        {row?.gameMode}
                      </Index.Box>
                    </Index.Grid>

                    {row?.gameName === "2 Color Betting" ||
                    row?.gameName === "Color Prediction" ||
                    row?.gameName === "Penalty Betting" ? (
                      <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-design-div with-border view-game-details-content view-mb-label"
                        >
                          Second
                        </Index.Typography>
                        <Index.Box className="input-label-box-admin">
                          {/* {time?.map((item, index) => {
                            return (
                              <>
                                <Index.Typography>
                             {item}
                             {index == time.length - 1
                               ? "% "
                               : "% ,"}
                           </Index.Typography>
                              </>
                            );
                          })} */}
                          {time?.join(",")}
                        </Index.Box>
                      </Index.Grid>
                    ) : null}

                    {row?.gameName === "Community Betting" ? (
                      <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-design-div with-border view-game-details-content view-mb-label"
                        >
                          Entry Fee
                        </Index.Typography>
                        <Index.Box className="input-label-box-admin">
                          {row?.betAmount}
                        </Index.Box>
                      </Index.Grid>
                    ) : null}

                    {row?.gameName === "Community Betting" ? (
                      <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-design-div with-border view-game-details-content view-mb-label"
                        >
                          Winners Percentage
                        </Index.Typography>
                        <Index.Box className="input-label-box-admin">
                          <Index.Box className="flex-percentage">
                            {winner?.map((item, index) => {
                              return (
                                <>
                                  <Index.Typography>
                                    {item}
                                    {index == winner.length - 1 ? "% " : "% ,"}
                                  </Index.Typography>
                                </>
                              );
                            })}
                          </Index.Box>
                          {/* {time?.join(",")} */}
                        </Index.Box>
                      </Index.Grid>
                    ) : null}

                    {row?.gameName === "2 Color Betting" ||
                    row?.gameName === "Color Prediction" ||
                    row?.gameName === "Penalty Betting" ||
                    row?.gameName === "Card betting" ||
                    row?.gameName === "Number Betting" ? (
                      <Index.Grid item xs={12} sm={4} lg={4} md={4}>
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-design-div with-border view-game-details-content view-mb-label"
                        >
                          Description
                        </Index.Typography>
                        <Index.Box className="textarea-label-box-admin">
                          {row?.description}
                        </Index.Box>
                      </Index.Grid>
                    ) : null}
                  </Index.Grid>
                </Index.Box>
              </form>
            )}
          </PageIndex.Formik>
          <Index.Box
            className="common-button blue-button res-blue-button"
            marginTop={5}
          >
            <PageIndex.Link
              to="/admin/game-management"
              className="no-text-decoration"
              //onClick={(e) => handleEdit(e)}
            >
              {" "}
              <Index.Button variant="contained" disableRipple>
                <img src={PageIndex.Png.back} className="back-btn-spacing" />
                Back
              </Index.Button>
            </PageIndex.Link>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
