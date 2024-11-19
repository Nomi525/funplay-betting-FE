import React, { useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import { DatePicker } from "antd";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Formik } from "formik";

export default function CardBetting() {
  const navigate = Index.useNavigate();
  const location = useLocation();
  const row = location?.state?.selectedData;
  const [gameImage, setGameImage] = useState("");
  const [startMinDate, setStartDate] = useState(new Date());
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
    gameName: row?.gameName,
    gameImage: "",
    gameTimeFrom: row?.gameTimeFrom ? dayjs(row?.gameTimeFrom) : null,
    gameTimeTo: row?.gameTimeTo ? dayjs(row?.gameTimeTo) : null,
    gameHours: row?.gameHours ? row?.gameHours : "",
    repeat: row?.isRepeat ? row?.isRepeat : false,
    gameDurationFrom: row?.gameDurationFrom
      ? moment(row?.gameDurationFrom, "hh:mm A").format()
      : "",
    gameDurationTo: row?.gameDurationTo
      ? moment(row?.gameDurationTo, "hh:mm A").format()
      : "",
    gameMode: "Manual",
    gameMaximumCoin: row?.gameMaximumCoin ? row?.gameMaximumCoin : "",
    gameMinimumCoin: row?.gameMinimumCoin ? row?.gameMinimumCoin : "",
    description: row?.description ? row?.description : "",
  });

  console.log(row, "fatma");

  const handleFormSubmit = async (values) => {
    const formdata = new FormData();
    formdata.append("gameName", values.gameName);
    formdata.append("gameImage", values.gameImage);
    formdata.append("gameTimeFrom", values.gameTimeFrom);
    formdata.append("gameTimeTo", values.gameTimeTo);
    formdata.append("gameHours", values.gameHours);
    formdata.append(
      "gameDurationFrom",
      moment(new Date(values.gameDurationFrom)).format("hh:mm A")
    );
    formdata.append(
      "gameDurationTo",
      moment(new Date(values.gameDurationTo)).format("hh:mm A")
    );
    formdata.append("gameMode", values.gameMode);
    formdata.append("gameMaximumCoin", values.gameMaximumCoin);
    formdata.append("gameMinimumCoin", values.gameMinimumCoin);
    formdata.append("isRepeat", values.repeat);
    formdata.append("description", values.description);
    if (row?._id) {
      formdata.append("gameId", row?._id);
    }
    DataService.post(Api.ADMIN_ADD, formdata)
      .then((res) => {
        localStorage.setItem("id", res?.data?.data?._id);
        toast.success(res.data.message, {
          toastId: "customId",
        });
        // getAllCommunityList();
        navigate("/admin/game-management", {
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

  const currentLiveTime = dayjs(); // Get the current time
  const currentTime = new Date();
  const initialAMPM = currentLiveTime.format("A"); // Get AM or PM from the current time

  const shouldDisableTime = (time) => {
    const selectedTime = dayjs(time);

    // Check if the selected time is before the current time
    return (
      selectedTime.isBefore(currentLiveTime, "minute") ||
      selectedTime.format("A") !== initialAMPM
    );
  };

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
                Card Betting
              </Index.Typography>
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <PageIndex.Formik
          enableReinitialize
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={PageIndex.validationSchemaCardBetting}
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
              <Index.Box className="mb-game-community-details">
                <Index.Grid container spacing={3}>
                  <Index.Grid item xs={12} sm={12} md={12}>
                    <Index.Box className="file-upload-details">
                      <Index.Button
                        component="label"
                        variant="contained"
                        className="upload-community-game"
                      >
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
                            <Index.Box className="upload-banner-content">
                              {gameImage ? (
                                <Index.Avatar
                                  alt="Remy Sharp"
                                  className="add-game-img"
                                  src={
                                    gameImage && URL.createObjectURL(gameImage)
                                  }
                                />
                              ) : (
                                <Index.Avatar
                                  alt="Remy Sharp"
                                  className="add-game-img"
                                  src={
                                    row?.gameImage &&
                                    `http://35.177.56.74:3032/images/${row?.gameImage}`
                                  }
                                />
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
                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Game Name<span className="red-star">*</span>
                    </Index.Typography>

                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder=" Game Name "
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        autoComplete="off"
                        name="gameName"
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.gameName}
                        helperText={touched.gameName && errors.gameName}
                        error={Boolean(errors.gameName && touched.gameName)}
                        sx={{ mb: 3 }}
                        onKeyDown={(e) => {
                          if (e.key === " " && e.target.value.trim() === "") {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Index.Box>
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
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
                          name="gameTimeFrom"
                          placeholder="Start Date"
                          disabledDate={(current) =>
                            current.isBefore(moment().subtract(1, "day"))
                          }
                          value={values.gameTimeFrom}
                          onChange={(date) => {
                            setFieldValue("gameTimeFrom", date);
                            setFieldValue("gameTimeTo", "");
                          }}
                          onBlur={handleBlur}
                        />
                        {touched.gameTimeFrom && errors.gameTimeFrom && (
                          <Index.FormHelperText error>
                            {errors.gameTimeFrom}
                          </Index.FormHelperText>
                        )}
                      </Index.Box>
                    </Index.Box>
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
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
                          name="gameTimeTo"
                          placeholder="End Date"
                          value={values.gameTimeTo}
                          onChange={(date) => {
                            setFieldValue("gameTimeTo", date);
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
                        {touched.gameTimeTo && errors.gameTimeTo && (
                          <Index.FormHelperText error>
                            {errors.gameTimeTo}
                          </Index.FormHelperText>
                        )}
                      </Index.Box>
                    </Index.Box>
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      // className="input-label width"
                      className="input-label"
                    >
                      Game Bet Timer
                      <span className="red-star"> * </span>
                    </Index.Typography>

                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        type="text"
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder="Game Duration"
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        autoComplete="off"
                        name="gameHours"
                        // type="number"
                        onBlur={handleBlur}
                        value={values.gameHours}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            (/^[1-9]\d*$/.test(value) &&
                              value > 0 &&
                              value <= 50) ||
                            value === ""
                          ) {
                            setFieldValue("gameHours", value);
                          }
                        }}
                        sx={{ mb: 3 }}
                        helperText={touched.gameHours && errors.gameHours}
                        error={Boolean(errors.gameHours && touched.gameHours)}
                      />
                    </Index.Box>
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Game From Time<span className="red-star">*</span>
                    </Index.Typography>
                    <Index.Box className="timer-list-content">
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        className="timer-picker-main"
                      >
                        <DemoContainer
                          components={["DesktopTimePicker"]}
                          className="timer-picker-list"
                        >
                          {/* <DesktopTimePicker
                              className="picker-input-list"
                              name="gameDurationFrom"
                              disablePast={
                                currentTime <= values?.gameTimeFrom &&
                                  values?.gameDurationFrom
                                  ? false
                                  : true
                              }
                              format="hh:mm A"
                              minDate={startMinDate}
                              value={dayjs(values.gameDurationFrom)}
                              ampm={!initialAMPM ? true : false}
                              onChange={(e) =>
                                setFieldValue("gameDurationFrom", e)
                              }
                            /> */}
                          <DesktopTimePicker
                            className="picker-input-list"
                            name="gameDurationFrom"
                            disablePast={
                              currentTime <= values?.gameTimeFrom &&
                              values?.gameDurationFrom
                                ? false
                                : true
                            }
                            format="hh:mm A"
                            value={dayjs(values.gameDurationFrom)}
                            onChange={(e) =>
                              setFieldValue("gameDurationFrom", e)
                            }
                            // defaultValue={dayjs("2022-04-17T15:30")}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Index.Box>
                    {errors.gameDurationFrom && touched.gameDurationFrom && (
                      <Index.FormHelperText error>
                        {errors.gameDurationFrom}
                      </Index.FormHelperText>
                    )}
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Game To Time<span className="red-star">*</span>
                    </Index.Typography>
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
                            name="gameDurationTo"
                            // format="hh:mm A"
                            format="hh:mm A"
                            value={dayjs(values.gameDurationTo)}
                            onChange={(e) => setFieldValue("gameDurationTo", e)}
                            // defaultValue={dayjs("2022-04-17T15:30")}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Index.Box>
                    {errors.gameDurationTo && touched.gameDurationTo && (
                      <Index.FormHelperText error>
                        {errors.gameDurationTo}
                      </Index.FormHelperText>
                    )}
                  </Index.Grid>
                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label width"
                    >
                      Mode<span className="red-star">&nbsp;*</span>
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
                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Minimum Coins<span className="red-star">*</span>
                    </Index.Typography>
                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder="Minimum Coin"
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        autoComplete="off"
                        name="gameMinimumCoin"
                        // type="number"
                        onBlur={handleBlur}
                        value={values.gameMinimumCoin}
                        onChange={(e) => {
                          !isNaN(e.target.value) && handleChange(e);
                          setFieldValue("gameMaximumCoin", "");
                        }}
                        InputProps={{
                          inputProps: {
                            maxLength: 2,
                          },
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

                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Maximum Coins<span className="red-star">*</span>
                    </Index.Typography>
                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder="Maximum Coin"
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        autoComplete="off"
                        name="gameMaximumCoin"
                        // type="text"
                        onBlur={handleBlur}
                        value={values.gameMaximumCoin}
                        onChange={(e) => {
                          !isNaN(e.target.value) && handleChange(e);
                        }}
                        InputProps={{
                          inputProps: {
                            maxLength: 3,
                          },
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

                  <Index.Grid item xs={12} sm={6} md={6} lg={3}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label width"
                    >
                      Repeat<span className="red-star">&nbsp;*</span>
                    </Index.Typography>
                    <Index.Switch
                      name="repeat"
                      checked={values?.repeat}
                      onChange={(e) => {
                        setFieldValue("repeat", e.target.checked);
                      }}
                    />
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={12} md={12} lg={12}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label width"
                    >
                      Description<span className="red-star">*</span>
                    </Index.Typography>
                    <Index.Box className="input-design-div with-border banner-textarea main-content-textarea">
                      <Index.TextareaAutosize
                        type="text"
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder="Description"
                        variant="filled"
                        className="admin-input-design input-placeholder form-control custom-auth-user-control textarea-content-comman"
                        autoComplete="off"
                        name="description"
                        onBlur={handleBlur}
                        value={values.description}
                        onChange={handleChange}
                        helperText={touched.description && errors.description}
                        onKeyDown={(e) => {
                          if (e.key === " " && e.target.value.trim() === "") {
                            e.preventDefault();
                          }
                        }}
                        InputProps={{
                          inputProps: {
                            maxLength: 500,
                          },
                        }}
                        // error={Boolean(
                        //   errors.description && touched.description
                        // )}
                        sx={{ mb: 3 }}
                      />
                      {touched.description && errors.description && (
                        <Index.FormHelperText error>
                          {errors.description}
                        </Index.FormHelperText>
                      )}
                    </Index.Box>
                  </Index.Grid>
                </Index.Grid>
              </Index.Box>

              <Index.Box className="add-game-button">
                <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                  <Index.Button
                    variant="contained"
                    onClick={() => navigate("/admin/game-management")}
                  >
                    <img
                      src={PageIndex.Png.back}
                      className="back-btn-spacing"
                      alt="back"
                    />
                    Back
                  </Index.Button>
                </Index.Box>
                <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
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
