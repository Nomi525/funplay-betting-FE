import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import { DatePicker } from "antd";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import dayjs from "dayjs";
import { useLocation, useParams } from "react-router-dom";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function CommunityBetting() {
  const navigate = Index.useNavigate();
  const location = useLocation();
  const params = useParams();
  const row = location?.state?.selectedData;


  
  const [gameImage, setGameImage] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [communityList, setCommunityList] = useState([]);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [initialValues, setInitialValues] = useState({
    gameImage: "",
    startDate:  null,
    endDate:  null,
    gameRounds: "",
    winningAmount: "",
    noOfWinners: "",
    winner1: "",
    winner2: "",
    winner3: "",
    winner4: "",
    gameFromTime: "",
    gameToTime: "",
    gameMode: "",
    gameMaximumCoin: "",
    gameMinimumCoin: "",
  });

  const handleFormSubmit = async (values) => {
    const formdata = new FormData();
    formdata.append("gameImage", values.gameImage);
    formdata.append("startDate", values.startDate);
    formdata.append("endDate", values.endDate);
    formdata.append("gameRounds", values.gameRounds);
    formdata.append("winningAmount", values.winningAmount);
    formdata.append("noOfWinners", values.noOfWinners);
    formdata.append("winner1", values.winner1);
    formdata.append("winner2", values.winner2);
    formdata.append("winner3", values.winner3);
    formdata.append("winner4", values.winner4);
    formdata.append(
      "gameFromTime",
      moment(
        values.gameFromTime.$d ? values.gameFromTime.$d : values.gameFromTime
      ).format("HH:mm")
    );
    formdata.append(
      "gameToTime",
      moment(
        values.gameToTime.$d ? values.gameToTime.$d : values.gameToTime
      ).format("HH:mm")
    );
    formdata.append("gameMode", values.gameMode);
    formdata.append("gameMaximumCoin", values.gameMaximumCoin);
    formdata.append("gameMinimumCoin", values.gameMinimumCoin);

    if (row?._id) {
      formdata.append("communityBettingId", row?._id);
    }

    DataService.post(Api.ADMIN_ADD_EDIT_COMMUNITY_BETTING, formdata)
      .then((res) => {
        localStorage.setItem("id", res?.data?.data?._id);
        toast.success(res.data.message, {
          toastId: "customId",
        });
        getAllCommunityList();
        navigate("/admin", {
          state: { id: res.data.data._id },
        });
      })

      .catch((e) => {
        toast.error(
          e.response?.data?.message ? e.response?.data?.message : e.message,
          {
            toastId: "customId",
          }
        );
      });
  };

  const id = localStorage.getItem("id");
  const getAllCommunityList = async() => {
   await DataService.get(Api.ADMIN_GET_SINGLE_LIST_COMMUNITY_BETTING)
      .then((res) => {
        let row = res.data.data;

        setInitialValues({
          gameImage: "",
          startDate: row?.startDate ? dayjs(row?.startDate) : null,
          endDate: row?.endDate ? dayjs(row?.endDate) : null,
          gameRounds: row?.gameRounds ? row?.gameRounds : "",
          winningAmount: row?.gameMinimumCoin ? row?.gameMinimumCoin : "",
          noOfWinners: row?.noOfWinners ? row?.noOfWinners : "",
          winner1: row?.winner1 ? row?.winner1 : "",
          winner2: row?.winner2 ? row?.winner2 : "",
          winner3: row?.winner3 ? row?.winner3 : "",
          winner4: row?.winner4 ? row?.winner4 : "",
          gameFromTime: row?.gameFromTime
            ? new Date().toISOString().split("T")[0] + "T" + row?.gameFromTime
            : "",
          gameToTime: row?.gameToTime
            ? new Date().toISOString().split("T")[0] + "T" + row?.gameToTime
            : "",
          gameMode: row?.gameMode ? row?.gameMode : "",
          gameMaximumCoin: row?.gameMaximumCoin ? row?.gameMaximumCoin : "",
          gameMinimumCoin: row?.gameMinimumCoin ? row?.gameMinimumCoin : "",
        });
      
      })
      .catch((e) => {
      
      });
  };
  useEffect(() => {
    getAllCommunityList();
  }, []);

  return (

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
                  Add Community Betting
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <PageIndex.Formik
            enableReinitialize
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={PageIndex.validationCommunityBetting}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <Index.Stack
                component="form"
                spacing={2}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Index.Box className="">
                  <Index.Grid container spacing={3}>
                    <Index.Grid item xs={12} sm={12} md={12}>
                      <Index.Box className="file-upload-details">
                  <Index.Button component="label" variant="contained" className="upload-community-game">
                  <Index.Box className="input-design-div with-border">
                        <label
                          htmlFor="upload-photo"
                          className="upload-banner-details"
                        >
                          <input
                            style={{ display: "none" }}
                            id="upload-photo"
                            name="gameImage"
                            className="upload-banner-input"
                            type="file"
                            onChange={(e) => {
                              if (e.target.files.length !== 0) {
                                setGameImage(e.target.files[0]);
                                setFieldValue("gameImage", e.target.files[0]);
                              } else {
                                setGameImage("");
                              }
                            }}
                          />

                          {/* {
                              values.gameImage &&  <img 
                              src={URL.createObjectURL(values.gameImage)}
                              sx={{ width: 56, height: 56 }}
                              />
                            } */}

                          <Index.Box className="upload-banner-content">
                            {gameImage ? (
                              <>
                                <Index.Avatar
                                  alt="Remy Sharp"
                                  className="add-game-img"
                                  //src={URL.createObjectURL(image) || URL.createObjectURL(values.gameImage)  }
                                  src={
                                    gameImage && URL.createObjectURL(gameImage)
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
                                    process.env.REACT_APP_IMG +row?.gameImage
                                  }
                                />
                              </>
                            )}
                            {errors.gameImage && (
                              <Index.FormHelperText error>
                                {errors.gameImage}
                              </Index.FormHelperText>
                            )}
                          </Index.Box>
                        </label>
                      </Index.Box>
                    <VisuallyHiddenInput type="file" />
                  </Index.Button>
                </Index.Box>
                      
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Start Date<span className="red-star">*</span>
                      </Index.Typography>

                      <Index.Box className=" signin-drop-details">
                      <Index.Box className="transation-date-picker admin-datepicker-main user-datepicker-content">
                        <DatePicker
                          className="admin-datepicker-inner"
                          format="DD/MM/YYYY"
                          name="startDate"
                          placeholder="Start Date"
                          disabledDate={(current) =>
                            current.isBefore(moment().subtract(1, "day"))
                          }
                          value={values.startDate}
                          onChange={(date) => {
                            setFieldValue("startDate", date);
                            setFieldValue("endDate", "");
                          }}
                          onBlur={handleBlur}
                        />
                        {touched.startDate && errors.startDate && (
                          <Index.FormHelperText error>
                            {errors.startDate}
                          </Index.FormHelperText>
                        )}
                      </Index.Box>
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        End Date<span className="red-star">*</span>
                      </Index.Typography>
                      <Index.Box className=" signin-drop-details">
                        <Index.Box className="transation-date-picker admin-datepicker-main user-datepicker-content">
                          <DatePicker
                            className="admin-datepicker-inner"
                            format="DD/MM/YYYY"
                            name="endDate"
                            placeholder="End Date"
                            value={values.endDate}
                            onChange={(date) => {
                              setFieldValue("endDate", date);
                            }}
                            disabledDate={(current) =>
                              current.isBefore(
                                moment(values?.gameTimeFrom?.$d).subtract(
                                  0,
                                  "day"
                                )
                              )
                            }
                            onBlur={handleBlur}
                          />
                          {touched.endDate && errors.endDate && (
                            <Index.FormHelperText error>
                              {errors.endDate}
                            </Index.FormHelperText>
                          )}
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Game rounds / day
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          id="filled-hidden-label-normal"
                          placeholder="Enter Game Rounds"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          // autoComplete="off"
                          name="gameRounds"
                          onChange={handleChange}
                          value={values.gameRounds}
                          type="text"
                        />
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Winning amount<span className="red-star">*</span>
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Enter Winning Amount"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="winningAmount"
                          type="number"
                          onWheel={ event => event.target.blur() }
                          onBlur={handleBlur}
                          value={values.winningAmount}
                          onChange={(e) => {
                            // Use a regular expression to allow only numbers
                            const coinValue = e.target.value
                              .replace(/[^0-9]/g, "")
                              .slice(0, 5);
                            setFieldValue("winningAmount", coinValue);
                          }}
                          helperText={
                            touched.winningAmount && errors.winningAmount
                          }
                          error={Boolean(
                            errors.winningAmount && touched.winningAmount
                          )}
                        />
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        No. of winners
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          id="filled-hidden-label-normal"
                          placeholder="No of Winners"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="noOfWinners"
                          onChange={handleChange}
                          value={values.noOfWinners}
                          type="number"
                          onWheel={ event => event.target.blur() }
                        />
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Winner 1
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          id="filled-hidden-label-normal"
                          placeholder="Winner 1"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="winner1"
                          value={values.winner1}
                          type="text"
                          onChange={handleChange}
                        />
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Winner 2
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          id="filled-hidden-label-normal"
                          placeholder="Winner 2"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="winner2"
                          value={values.winner2}
                          onChange={handleChange}
                          type="text"
                        />
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Winner 3
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          id="filled-hidden-label-normal"
                          placeholder="Winner 3"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="winner3"
                          value={values.winner3}
                          onChange={handleChange}
                          type="text"
                        />
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Winner 4
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          id="filled-hidden-label-normal"
                          placeholder="Winner 4"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="winner4"
                          value={values.winner4}
                          onChange={handleChange}
                          type="text"
                        />
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Game From Time<span className="red-star">*</span>
                      </Index.Typography>

                      {/* <Index.Box className=" signin-drop-details">
                  <Index.Box className="transation-date-picker admin-datepicker-main user-datepicker-content">
                    <DatePicker
                      className="admin-datepicker-inner"
                      format="DD/MM/YYYY"
                      name="gameTimeFrom"
                      placeholder="Start Date"
                    />
                  </Index.Box>
                </Index.Box> */}
                      <Index.Box className="timer-list-content">
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          className="timer-picker-main"
                        >
                          <DemoContainer
                            components={["DesktopTimePicker"]}
                            className="timer-picker-list"
                          >
                            <DesktopTimePicker
                              className="picker-input-list"
                              name="gameFromTime"
                              format="hh:mm A"
                              value={dayjs(values.gameFromTime)}
                              onChange={(e) => setFieldValue("gameFromTime", e)}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Index.Box>
                      {errors.gameFromTime && touched.gameFromTime && (
                        <Index.FormHelperText error>
                          {errors.gameFromTime}
                        </Index.FormHelperText>
                      )}
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Game To Time<span className="red-star">*</span>
                      </Index.Typography>
                      {/* <Index.Box className=" signin-drop-details">
                  <Index.Box className="transation-date-picker admin-datepicker-main user-datepicker-content">
                    <DatePicker
                      className="admin-datepicker-inner"
                      format="DD/MM/YYYY"
                      name="gameTimeFrom"
                      placeholder="Start Date"
                    />
                  </Index.Box>
                </Index.Box> */}
                      <Index.Box className="timer-list-content">
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          className="timer-picker-main"
                        >
                          <DemoContainer
                            components={["DesktopTimePicker"]}
                            className="timer-picker-list"
                          >
                            <DesktopTimePicker
                              className="picker-input-list"
                              name="gameToTime"
                              format="hh:mm A"
                              value={dayjs(values.gameToTime)}
                              onChange={(e) => setFieldValue("gameToTime", e)}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Index.Box>
                      {errors.gameToTime && touched.gameToTime && (
                        <Index.FormHelperText error>
                          {errors.gameToTime}
                        </Index.FormHelperText>
                      )}
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Game Mode<span className="red-star">*</span>
                      </Index.Typography>
                      <Index.Box className="add-game-dropdown">
                        <Index.Box className=" signin-drop-details">
                          <Index.FormControl className="formcontrol_login sign-in-inner-form">
                            <Index.Select
                              onChange={handleChange}
                              value={values.gameMode}
                              name="gameMode"
                              // placeholder="mode"
                              className="currency-select-drop"
                              displayEmpty
                              renderValue={
                                values?.gameMode !== ""
                                  ? undefined
                                  : () => "Select your mode"
                              }
                            >
                              <Index.MenuItem
                                value={"Auto"}
                                className="currency-select-menu"
                              >
                                Auto
                              </Index.MenuItem>
                              <Index.MenuItem
                                value={"Manual"}
                                className="currency-select-menu"
                                name="INR"
                              >
                                Manual
                              </Index.MenuItem>
                            </Index.Select>
                          </Index.FormControl>
                          {errors.gameMode && touched.gameMode && (
                            <Index.FormHelperText error>
                              {errors.gameMode}
                            </Index.FormHelperText>
                          )}
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Maximum Coins<span className="red-star">*</span>
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        {/* <Index.TextField
                    id="filled-hidden-label-normal"
                    placeholder="Maximum Coins"
                    variant="filled"
                    className="admin-input-design input-placeholder"
                    autoComplete="off"
                    name="coin"
                    type="text"
                  /> */}
                        <Index.TextField
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Maximum Coin"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="gameMaximumCoin"
                          type="text"
                          onBlur={handleBlur}
                          value={values.gameMaximumCoin}
                          onChange={(e) => {
                            // Use a regular expression to allow only numbers
                            const coinValue = e.target.value
                              .replace(/[^0-9]/g, "")
                              .slice(0, 5);
                            setFieldValue("gameMaximumCoin", coinValue);
                          }}
                          helperText={
                            touched.gameMaximumCoin && errors.gameMaximumCoin
                          }
                          error={Boolean(
                            errors.gameMaximumCoin && touched.gameMaximumCoin
                          )}
                        />
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Minimum Coins<span className="red-star">*</span>
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        {/* <Index.TextField
                    id="filled-hidden-label-normal"
                    placeholder="Minimum Coins"
                    variant="filled"
                    className="admin-input-design input-placeholder"
                    autoComplete="off"
                    name="coin"
                    type="text"
                  /> */}
                        <Index.TextField
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Minimum Coin"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="gameMinimumCoin"
                          type="text"
                          onBlur={handleBlur}
                          value={values.gameMinimumCoin}
                          onChange={(e) => {
                            // Use a regular expression to allow only numbers
                            const coinValue = e.target.value
                              .replace(/[^0-9]/g, "")
                              .slice(0, 5);
                            setFieldValue("gameMinimumCoin", coinValue);
                          }}
                          helperText={
                            touched.gameMinimumCoin && errors.gameMinimumCoin
                          }
                          error={Boolean(
                            errors.gameMinimumCoin && touched.gameMinimumCoin
                          )}
                        />
                      </Index.Box>
                    </Index.Grid>
                  </Index.Grid>
                </Index.Box>

                <Index.Box className="add-game-button">
                  <Index.Box
                    className="common-button blue-button flex-start save-btn add-submit-btn"
                  >
                    <Index.Button
                      variant="contained"
                      onClick={() => navigate("/admin")}
                    >
                      <img
                        src={PageIndex.Png.back}
                        className="back-btn-spacing"
                      />
                      Back
                    </Index.Button>
                  </Index.Box>
                  <Index.Box
                    className="common-button blue-button flex-start save-btn add-submit-btn"
                  >
                    <Index.Button variant="contained" type="submit">
                      Submit
                    </Index.Button>
                  </Index.Box>
                </Index.Box>
              </Index.Stack>
            )}
          </PageIndex.Formik>
        </Index.Box>
      </Index.Box>
  );
}
