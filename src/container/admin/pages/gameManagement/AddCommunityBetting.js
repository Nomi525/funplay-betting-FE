import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import { getIn } from "formik";
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
import { Formik, Field, FieldArray } from "formik";

export default function AddCommunityBetting() {
  const navigate = Index.useNavigate();
  const location = useLocation();
  const params = useParams();
  const row = location?.state?.selectedData;
  const [gameImage, setGameImage] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [communityList, setCommunityList] = useState([]);
  const [startMinDate, setStartDate] = useState(new Date());
  const [disabled, setDisabled] = useState(true);
  const [winnnerTotalAmount, setWinnerTotalAmount] = useState(0);
  const [winnerErrorMessage, setWinnerErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    time: row?.winnersPercentage.length
      ? row?.winnersPercentage.map((time) => ({ winnersPercentage: time }))
      : [
          {
            winnersPercentage: "",
          },
        ],
    gameName: row?.gameName,
    gameImage: "",
    gameTimeFrom: row?.gameTimeFrom ? dayjs(row?.gameTimeFrom) : null,
    gameTimeTo: row?.gameTimeTo ? dayjs(row?.gameTimeTo) : null,
    gameHours: row?.gameHours ? row?.gameHours : "",
    gameWinningAmount: row?.gameWinningAmount ? row?.gameWinningAmount : "",
    noOfWinners: row?.noOfWinners ? row?.noOfWinners : "",
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
    betAmount: row?.betAmount ? row?.betAmount : "",
    minSlot: row?.minSlot ? row?.minSlot : "",
    maxSlot: row?.maxSlot ? row?.maxSlot : "",
  });

  console.log(row, "fatma");

  const handleFormSubmit = async (values) => {
    let newTime = values.time.map((item) => item.winnersPercentage);

    console.log(newTime, "NewTime");

    if (errorMessage == "") {
      const formdata = new FormData();
      formdata.append("gameName", values.gameName);
      newTime.forEach((element, index) => {
        formdata.append(`winnersPercentage[${index}]`, element);
      });
      formdata.append("gameImage", values.gameImage);
      formdata.append("gameTimeFrom", values.gameTimeFrom);
      formdata.append("gameTimeTo", values.gameTimeTo);
      formdata.append("gameHours", values.gameHours);
      formdata.append("betAmount", values.betAmount);
      formdata.append("gameWinningAmount", values.gameWinningAmount);
      formdata.append("noOfWinners", values.noOfWinners);

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
      formdata.append("minSlot", values.minSlot);
      formdata.append("maxSlot", values.maxSlot);

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
    }
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

  // const id = localStorage.getItem("id");
  // const getAllCommunityList = () => {
  //   DataService.get(Api.ADMIN_GET_SINGLE_LIST_COMMUNITY_BETTING)
  //     .then((res) => {
  //       let row = res.data.data;

  //       setInitialValues({
  //         gameImage: "",
  //         gameName: row?.gameName ? row?.gameName : "",
  //         gameStartDate: row?.gameStartDate ? dayjs(row?.gameStartDate) : null,
  //         gameTimeTo: row?.gameTimeTo ? dayjs(row?.gameTimeTo) : null,
  //         gameHours: row?.gameHours ? row?.gameHours : "",
  //         winningAmount: row?.winningAmount ? row?.winningAmount : "",
  //         noOfWinners: row?.noOfWinners ? row?.noOfWinners : "",

  //         gameDurationFrom: row?.gameDurationFrom
  //           ? new Date().toISOString().split("T")[0] + "T" + row?.gameDurationFrom
  //           : "",
  //         gameDurationTo: row?.gameDurationTo
  //           ? new Date().toISOString().split("T")[0] + "T" + row?.gameDurationTo
  //           : "",
  //         gameMode: row?.gameMode ? row?.gameMode : "",
  //         gameMaximumCoin: row?.gameMaximumCoin ? row?.gameMaximumCoin : "",
  //         gameMinimumCoin: row?.gameMinimumCoin ? row?.gameMinimumCoin : "",
  //       });
  //     })
  //     .catch((e) => {});
  // };
  // useEffect(() => {
  //   //getAllCommunityList();
  // }, []);
  console.log(row?.gameImage, 178);

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
                {row ? "Edit Community Betting" : "Add Community Betting"}
              </Index.Typography>
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <PageIndex.Formik
          enableReinitialize={true}
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
              {console.log(errors, "errors")}
              <Index.Box className="mb-game-community-details">
                <Index.Grid container spacing={3}>
                  <Index.Grid item xs={12} sm={12} md={12} lg={12}>
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
                                      gameImage &&
                                      URL.createObjectURL(gameImage)
                                    }
                                    // src={values?.gameImage ? `http://35.177.56.74:3032/images/${values?.gameImage}` : URL.createObjectURL(image)}
                                  />
                                </>
                              ) : (
                                <>
                                  <Index.Avatar
                                    alt="Remy Sharp"
                                    className="add-game-img"
                                    // src={
                                    //   row?.gameImage
                                    //     ? `http://35.177.56.74:3032/images/${row?.gameImage}`
                                    //     : PageIndex.Png.usericon
                                    // }
                                    src={
                                      row?.gameImage &&
                                      process.env.REACT_APP_IMG + row?.gameImage
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

                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
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

                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
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

                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
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

                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
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

                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
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

                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Game duration
                    </Index.Typography>
                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        id="filled-hidden-label-normal"
                        placeholder="Game Duration"
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        // autoComplete="off"
                        name="gameHours"
                        // onChange={handleChange}
                        value={values.gameHours}
                        type="text"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const value = e.target.value;
                          console.log("528: ", value);
                          // if (
                          //   (/^[1-9]\d*$/.test(value) &&
                          //     value >= 1 &&
                          //     value <= 60) ||
                          //   value === ""
                          // ) {
                          //   setFieldValue("gameHours", value);
                          // }
                          if (/^[1-9]\d*$/.test(value) || value === "") {
                            setFieldValue("gameHours", value);
                          }
                        }}
                        sx={{ mb: 3 }}
                        helperText={
                          touched.gameHours && errors.gameHours
                        }
                        error={Boolean(
                          errors.gameHours && touched.gameHours
                        )}
                      />
                    </Index.Box>
                  </Index.Grid>
                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
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
                        // type="text"
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
                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
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

                  {/* <Index.Grid item xs={12} sm={6} md={3}>
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
                    </Index.Grid> */}

                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Winning Amount<span className="red-star">*</span>
                    </Index.Typography>
                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder="Winning Amount"
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        autoComplete="off"
                        name="gameWinningAmount"
                        type="number"
                        onWheel={(event) => event.target.blur()}
                        onBlur={handleBlur}
                        value={values.gameWinningAmount}
                        onChange={(e) => {
                          // Use a regular expression to allow only numbers
                          const coinValue = e.target.value
                            .replace(/[^0-9]/g, "")
                            .slice(0, 5);
                          setFieldValue("gameWinningAmount", coinValue);
                        }}
                        helperText={
                          touched.gameWinningAmount && errors.gameWinningAmount
                        }
                        error={Boolean(
                          errors.gameWinningAmount && touched.gameWinningAmount
                        )}
                      />
                    </Index.Box>
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      No. of winners<span className="red-star">*</span>
                    </Index.Typography>
                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        id="filled-hidden-label-normal"
                        placeholder="No of Winners"
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        autoComplete="off"
                        name="noOfWinners"
                        onWheel={(event) => event.target.blur()}
                        // onChange={handleChange}
                        onChange={(e) => {
                          let value = e.target.value;
                          setFieldValue("noOfWinners", value);
                          let noOfWinner = [];
                          for (let i = 0; i < value; i++) {
                            noOfWinner.push({ winnersPercentage: "" });
                          }
                          setFieldValue("noOfWinners", e.target.value);
                          setFieldValue("time", noOfWinner);
                        }}
                        value={values.noOfWinners}
                        type="number"
                        // onChange={(e) => {
                        //   // Use a regular expression to allow only numbers
                        //   const coinValue = e.target.value
                        //     .replace(/[^0-9]/g, "")
                        //     .slice(0, 5);
                        //   setFieldValue("noOfWinners", coinValue);
                        // }}
                        helperText={touched.noOfWinners && errors.noOfWinners}
                        error={Boolean(
                          errors.noOfWinners && touched.noOfWinners
                        )}
                      />
                    </Index.Box>
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Game Mode
                    </Index.Typography>
                    {/* <Index.Box className="add-game-dropdown"> */}
                    {/* <Index.Box className=" signin-drop-details">
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
                        </Index.Box> */}
                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        id="filled-hidden-label-normal"
                        placeholder="Enter Game Rounds"
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        // autoComplete="off"
                        name="gameMode"
                        defaultValue={"Manual"}
                        onChange={handleChange}
                        value={values.gameMode}
                        type="text"
                        disabled
                        helperText={touched.gameMode && errors.gameMode}
                        error={Boolean(errors.gameMode && touched.gameMode)}
                      />
                    </Index.Box>
                    {/* </Index.Box> */}
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Entry Fee<span className="red-star">*</span>
                    </Index.Typography>

                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder=" Entry Fee "
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        autoComplete="off"
                        name="betAmount"
                        type="number"
                        onWheel={(event) => event.target.blur()}
                        onBlur={handleBlur}
                        // onChange={handleChange}
                        value={values.betAmount}
                        helperText={touched.betAmount && errors.betAmount}
                        error={Boolean(errors.betAmount && touched.betAmount)}
                        // sx={{ mb: 3 }}
                        // onKeyDown={(e) => {
                        //   if (e.key === " " && e.target.value.trim() === "") {
                        //     e.preventDefault();
                        //   }
                        // }}
                        onChange={(e) => {
                          // Use a regular expression to allow only numbers
                          const amount = e.target.value
                            .replace(/[^0-9]/g, "")
                            .slice(0, 5);
                          setFieldValue("betAmount", amount);
                        }}
                      />
                    </Index.Box>
                  </Index.Grid>
                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Minimum Slot<span className="red-star">*</span>
                    </Index.Typography>

                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder="Enter minimum slot"
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        autoComplete="off"
                        name="minSlot"
                        type="number"
                        onWheel={(event) => event.target.blur()}
                        onBlur={handleBlur}
                        // onChange={handleChange}
                        value={values.minSlot}
                        helperText={touched.minSlot && errors.minSlot}
                        error={Boolean(errors.minSlot && touched.minSlot)}
                        // sx={{ mb: 3 }}
                        // onKeyDown={(e) => {
                        //   if (e.key === " " && e.target.value.trim() === "") {
                        //     e.preventDefault();
                        //   }
                        // }}
                        onChange={(e) => {
                          // Use a regular expression to allow only numbers
                          const input = e.target.value;
                          if (!isNaN(input)) {
                            const inputValue = input.replace(/\D/g, ""); // Remove non-numeric characters
                            handleChange({
                              target: {
                                name: "minSlot",
                                value: inputValue,
                              },
                            });
                          }
                          // const slot = e.target.value
                          // .replace(/[^0-9]/g, "")
                          // .slice(0, 5);
                          // setFieldValue("minSlot", slot);
                        }}
                      />
                    </Index.Box>
                  </Index.Grid>
                  <Index.Grid item xs={12} sm={6} md={4} lg={3}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Maximum Slot<span className="red-star">*</span>
                    </Index.Typography>

                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder="Enter maximum slot"
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        autoComplete="off"
                        name="maxSlot"
                        type="number"
                        onWheel={(event) => event.target.blur()}
                        onBlur={handleBlur}
                        // onChange={handleChange}
                        value={values.maxSlot}
                        helperText={touched.maxSlot && errors.maxSlot}
                        error={Boolean(errors.maxSlot && touched.maxSlot)}
                        // sx={{ mb: 3 }}
                        // onKeyDown={(e) => {
                        //   if (e.key === " " && e.target.value.trim() === "") {
                        //     e.preventDefault();
                        //   }
                        // }}
                        onChange={(e) => {
                          // Use a regular expression to allow only numbers
                          const input = e.target.value;
                          if (!isNaN(input)) {
                            const inputValue = input.replace(/\D/g, ""); // Remove non-numeric characters
                            handleChange({
                              target: {
                                name: "maxSlot",
                                value: inputValue,
                              },
                            });
                          }
                        }}
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
                </Index.Grid>
                <Index.Grid container sx={{ marginTop: "unset" }} spacing={3}>
                  {/* <Index.Grid item xs={12} sm={6} md={3}> */}
                  <FieldArray name="time">
                    {({ insert, remove, push }) => (
                      <Index.Grid item xs={12} sm={6} md={4} lg={3}>
                        {values.time.length > 0 &&
                          values?.time?.map((time, index) => {
                            return (
                              <>
                                <Index.Typography
                                  variant="label"
                                  component="label"
                                  className="input-label"
                                >
                                  Winner {index + 1}
                                </Index.Typography>
                                {console.log(values?.time, ":values?.time")}

                                <Index.Box className="winner-plus-details">
                                  <Index.Box className="percentage-position">
                                    <Index.Box className="input-design-div with-border">
                                      <Index.TextField
                                        id="filled-hidden-label-normal"
                                        variant="filled"
                                        className="admin-input-design input-placeholder"
                                        autoComplete="off"
                                        // onChange={handleChange}
                                        // name={`winner.${index}.winnerName`}
                                        name={`time.${index}.winnersPercentage`}
                                        onWheel={(event) => event.target.blur()}
                                        // value={
                                        //   values.winner[index].winnerName
                                        // }

                                        value={
                                          values?.time[index]?.winnersPercentage
                                        }
                                        type="number"
                                        error={Boolean(
                                          getIn(
                                            errors,
                                            `time.${index}.winnersPercentage`
                                          )
                                        )}
                                        helperText={
                                          getIn(
                                            errors,
                                            `time.${index}.winnersPercentage`
                                          ) || ""
                                        }
                                        onChange={(e) => {
                                          let num = Number(e.target.value);
                                          if (num === "" || num <= 100) {
                                            setFieldValue(
                                              `time.${index}.winnersPercentage`,
                                              num || ""
                                            );
                                            let sum = values?.time.reduce(
                                              (acc, curr, i) =>
                                                index === i
                                                  ? Number(acc) + Number(num)
                                                  : Number(acc) +
                                                    Number(
                                                      curr.winnersPercentage
                                                    ),
                                              0
                                            );

                                            if (+sum > 100) {
                                              setErrorMessage(
                                                "winner total percentage can not be greater than 100"
                                              );
                                              setFieldValue(
                                                `time.${index}.winnersPercentage`,
                                                num || ""
                                              );
                                            } else {
                                              setFieldValue(
                                                `time.${index}.winnersPercentage`,
                                                num || ""
                                              );
                                              setErrorMessage("");
                                            }
                                          }
                                        }}
                                      />
                                      <Index.Box className="percentage-details">
                                        <Index.Typography>%</Index.Typography>
                                      </Index.Box>
                                    </Index.Box>
                                  </Index.Box>

                                  <Index.Box>
                                    {index === 0 ? (
                                      <Index.Button
                                        type="button"
                                        className={
                                          values?.time?.length <
                                          values?.noOfWinners
                                            ? "secondary btn-plustable"
                                            : "secondary btn-plustable btn-disable"
                                        }
                                        onClick={() => {
                                          if (
                                            values?.time?.length <
                                            values?.noOfWinners
                                          ) {
                                            push({ winnersPercentage: "" });
                                          }
                                        }}
                                      >
                                        <img
                                          src={PageIndex.Png.btnplus}
                                          className=" plus-icon-btn"
                                        />
                                      </Index.Button>
                                    ) : (
                                      <Index.Button
                                        type="button"
                                        className="secondary btn-plustable"
                                        onClick={() => remove(index)}
                                      >
                                        <img
                                          src={PageIndex.Png.btnminus}
                                          className="minus-icon-btn"
                                        />
                                      </Index.Button>
                                    )}
                                  </Index.Box>
                                </Index.Box>
                              </>
                            );
                          })}
                      </Index.Grid>
                    )}
                  </FieldArray>

                  {/* </Index.Grid> */}
                  {/* <Index.Grid item xs={12} sm={6} md={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Winner 1
                      </Index.Typography>
                      <Index.Box className="winner-plus-details">
                        <Index.Box className="input-design-div with-border">
                          <Index.Box className="percentage-position">
                            <Index.TextField
                              id="filled-hidden-label-normal"
                              variant="filled"
                              className="admin-input-design input-placeholder"
                              autoComplete="off"
                              name="winner 1"
                              type="number"
                            />
                            <Index.Box className="percentage-details">
                              <Index.Typography>%</Index.Typography>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                        <Index.Box>
                          <Index.Button
                            type="button"
                            className="secondary btn-plustable"
                          >
                            <img
                              src={PageIndex.Png.btnplus}
                              className=" plus-icon-btn"
                            />
                          </Index.Button>
                        </Index.Box>
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
                      <Index.Box className="winner-plus-details">
                        <Index.Box className="input-design-div with-border">
                          <Index.Box className="percentage-position">
                            <Index.TextField
                              id="filled-hidden-label-normal"
                              variant="filled"
                              className="admin-input-design input-placeholder"
                              autoComplete="off"
                              name="winner 1"
                              type="number"
                            />
                            <Index.Box className="percentage-details">
                              <Index.Typography>%</Index.Typography>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                        <Index.Box>
                          <Index.Button
                            type="button"
                            className="secondary btn-plustable"
                          >
                            <img
                              src={PageIndex.Png.btnplus}
                              className=" plus-icon-btn"
                            />
                          </Index.Button>
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid> */}
                </Index.Grid>
              </Index.Box>
              <Index.Typography className="error-message-color">
                {errorMessage}
              </Index.Typography>

              <Index.Box className="add-game-button">
                <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                  <Index.Button
                    variant="contained"
                    onClick={() => navigate("/admin/game-management")}
                  >
                    <img
                      src={PageIndex.Png.back}
                      className="back-btn-spacing"
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
