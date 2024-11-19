import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import "./AddGame.css";
import PageIndex from "../../../pageIndex";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { useLocation } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { DesktopDateRangePicker } from "@mui/x-date-pickers-pro/DesktopDateRangePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
// import { DesktopTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddGame = () => {
  const navigate = Index.useNavigate();
  const location = useLocation();
  const [gameImage, setGameImage] = useState("");
  const row = location?.state?.selectedData;
  console.log(row, "row1");
  const currentDate = new Date().toISOString().split("T")[0];
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [startMinDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  console.log(loading, 68);
  //   const handleWeekChange = (event) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setPersonName(
  //       // On autofill we get a stringified value.
  //       typeof value === "string" ? value.split(",") : value
  //     );
  //  };

  // Initital values

  let initialValues = {
    gameName: row?.gameName,
    gameImage: "",
    gameMode: row?.gameMode ? row?.gameMode : "",
    gameHours: row?.gameHours ? row?.gameHours : "",
    gameSecond: row?.gameSecond.length ? row?.gameSecond : [],
    // gameDurationFrom: row?.gameDurationFrom ? row?.gameDurationFrom : "",
    gameDurationFrom: row?.gameDurationFrom
      ? moment(row?.gameDurationFrom, "hh:mm A").format()
      : "",
    gameDurationTo: row?.gameDurationTo
      ? moment(row?.gameDurationTo, "hh:mm A").format()
      : "",
    description: row?.description ? row?.description : "",
    gameTimeFrom: row?.gameTimeFrom ? dayjs(row?.gameTimeFrom) : null,
    gameTimeTo: row?.gameTimeTo ? dayjs(row?.gameTimeTo) : null,
    gameMinimumCoin: row?.gameMinimumCoin ? row?.gameMinimumCoin : "",
    gameMaximumCoin: row?.gameMaximumCoin ? row?.gameMaximumCoin : "",
    repeat: row?.isRepeat ? row?.isRepeat : false,
    winningCoin: row?.winningCoin ? Number(row?.winningCoin) : "",
    // week:row?.week ? row?.week : [],
    // gameTimeFrom: dayjs(row?.gameTimeFrom ? row?.gameTimeFrom : null),
    // gameTimeTo: dayjs(row?.gameTimeTo ? row?.gameTimeTo : null),
  };
  console.log("initialValues", initialValues, row?.winningCoin);

  // if (row) {
  //   initialValues = {
  //     gameName: row?.gameName ? row?.gameName : "",
  //     // gameImage: row?.gameImage ? row?.gameImage : "",
  //     gameImage: image ? image : row?.gameImage,
  //     gameDuration: row?.gameDuration ? row?.gameDuration : "",
  //   };
  // }

  const handleFormSubmit = async (values) => {
    setLoading(true);
    console.log(values, "values");
    const formdata = new FormData();
    formdata.append("gameName", values.gameName);
    // formdata.append("gameDurationFrom", values.gameDuration);
    formdata.append(
      "gameDurationFrom",
      moment(new Date(values.gameDurationFrom)).format("hh:mm A")
    );
    formdata.append(
      "gameDurationTo",
      moment(new Date(values.gameDurationTo)).format("hh:mm A")
    );
    formdata.append("isRepeat", values.repeat);
    formdata.append("gameHours", values.gameHours);
    formdata.append("description", values.description);
    formdata.append("gameTimeFrom", values.gameTimeFrom);
    formdata.append("gameTimeTo", values.gameTimeTo);
    formdata.append("gameMode", values.gameMode);
    formdata.append("winningCoin", values.winningCoin);
    // formdata.append("gameSecond", values.gameSecond.forEach());
    values.gameSecond.forEach((item, index) =>
      formdata.append(`gameSecond[${index}]`, item)
    );
    formdata.append("gameMinimumCoin", values.gameMinimumCoin);
    formdata.append("gameMaximumCoin", values.gameMaximumCoin);
    // formdata.append("week", values.week);

    formdata.append("gameImage", values.gameImage);
    console.log(values.repeat, "repet");
    if (row?._id) {
      formdata.append("gameId", row?._id);
    }
    DataService.post(Api.ADMIN_ADD, formdata)
      .then((res) => {
        console.log(res, 152);
        toast.success(res.data.message, {
          toastId: "customId",
        });
        navigate("/admin/game-management", {
          state: { id: res.data.data._id },
        });
        setLoading(false);
      })
      .catch((e) => {
        toast.error(
          e.response?.data?.message ? e.response?.data?.message : e.message,
          {
            toastId: "customId",
          }
        );
        setLoading(false);
      });
  };

  console.log(row, "row");
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
                {row?._id ? "Edit Game" : "Add Game"}
              </Index.Typography>
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <PageIndex.Formik
          enableReinitialize
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={
            row?.gameName == "Color Prediction" ||
            row?.gameName == "2 Color Betting" ||
            row?.gameName == "Penalty Betting" ||
            row?.gameName == "Card Betting"
              ? PageIndex.validationSchemaColorBeatAddGame
              : PageIndex.validationSchemaAddGame
          }
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
              {console.log(values, "values.gameSecond", errors)}
              <Index.Box className="">
                <Index.Grid container spacing={3}>
                  <Index.Grid item xs={12} sm={12} md={12}>
                    <Index.Button>
                      <Index.Box className="input-design-div with-border">
                        <label
                          htmlFor="upload-photo"
                          className="upload-banner-details"
                        >
                          <input
                            hidden
                            id="upload-photo"
                            name="gameImage"
                            className="upload-banner-input"
                            type="file"
                            accept="image/*"
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
                                  // alt="Remy Sharp"
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
                                  // alt="Remy Sharp"
                                  className="add-game-img"
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
                    </Index.Button>
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Game Name <span className="red-star">*</span>
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
                        value={values.gameName}
                        helperText={touched.gameName && errors.gameName}
                        error={Boolean(errors.gameName && touched.gameName)}
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
                      className="input-label width"
                    >
                      Start Date<span className="red-star">*</span>
                    </Index.Typography>
                    <Index.Box className="transation-date-picker admin-datepicker-main user-datepicker-content">
                      <DatePicker
                        className="admin-datepicker-inner"
                        format="DD/MM/YYYY"
                        name="gameTimeFrom"
                        inputReadOnly={true}
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
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label width"
                    >
                      End Date<span className="red-star">*</span>
                    </Index.Typography>
                    <Index.Box className="transation-date-picker admin-datepicker-main user-datepicker-content">
                      <DatePicker
                        className="admin-datepicker-inner"
                        format="DD/MM/YYYY"
                        name="gameTimeTo"
                        placeholder="End Date"
                        inputReadOnly={true}
                        value={values.gameTimeTo}
                        onChange={(date) => {
                          setFieldValue("gameTimeTo", date);
                        }}
                        disabledDate={(current) =>
                          current.isBefore(
                            moment(values?.gameTimeFrom?.$d).subtract(0, "day")
                          )
                        }
                        // onChange={(value) => {
                        //   if (value) {
                        //     setFieldValue(
                        //       "gameTimeTo",
                        //       Index.moment(value?.$d).format("DD/MM/YYYY")
                        //     );
                        //   }
                        // }}
                        onBlur={handleBlur}
                      />
                      {touched.gameTimeTo && errors.gameTimeTo && (
                        <Index.FormHelperText error>
                          {errors.gameTimeTo}
                        </Index.FormHelperText>
                      )}
                    </Index.Box>
                  </Index.Grid>

                  {row?.gameName == "Community Betting" ||
                  row?.gameName == "Number Betting" ? (
                    <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label width"
                      >
                        Game Bet Timer
                        <span className="red-star">*</span>
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
                            // if (
                            //   (/^[1-9]\d*$/.test(value) &&
                            //     value > 0 &&
                            //     value <= 50) ||
                            //   value === ""
                            // ) {
                            //   setFieldValue("gameHours", value);
                            // }
                            if (/^[1-9]\d*$/.test(value) || value === "") {
                              setFieldValue("gameHours", value);
                            }
                          }}
                          // sx={{ mb: 3 }}
                          helperText={touched.gameHours && errors.gameHours}
                          error={Boolean(errors.gameHours && touched.gameHours)}
                        />
                      </Index.Box>
                    </Index.Grid>
                  ) : null}

                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label width"
                    >
                      Game from Time
                      <span className="red-star">*</span>
                    </Index.Typography>

                    {/* <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          type="number"
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Game Duration"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="gameDurationFrom"
                          onBlur={handleBlur}
                          value={values.gameDurationFrom}
                          onChange={handleChange}
                          helperText={
                            touched.gameDurationFrom && errors.gameDurationFrom
                          }
                          error={Boolean(
                            errors.gameDurationFrom && touched.gameDurationFrom
                          )}
                          sx={{ mb: 3 }}
                        />
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
                      className="input-label width"
                    >
                      Game To Time<span className="red-star">*</span>
                    </Index.Typography>

                    {/* <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          type="number"
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Game Duration"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="gameDuration"
                          onBlur={handleBlur}
                          value={values.gameDuration}
                          onChange={handleChange}
                          helperText={
                            touched.gameDuration && errors.gameDuration
                          }
                          error={Boolean(
                            errors.gameDuration && touched.gameDuration
                          )}
                        // sx={{ mb: 3 }}
                        />
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

                  {row?.gameName == "Color Prediction" ||
                  row?.gameName == "2 Color Betting" ||
                  row?.gameName == "Card Betting" ||
                  row?.gameName == "Penalty Betting" ? (
                    <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label width"
                      >
                        Second<span className="red-star">&nbsp;*</span>
                      </Index.Typography>
                      <Index.Box className="add-game-dropdown">
                        <Index.Box className=" signin-drop-details">
                          <Index.FormControl className="formcontrol_login sign-in-inner-form">
                            <Index.Select
                              multiple
                              // onChange={handleChange}
                              onChange={(e) => {
                                if (e.target.value == "") {
                                  return setFieldValue("gameSecond", []);
                                }
                                setFieldValue("gameSecond", e.target.value);
                              }}
                              value={values.gameSecond}
                              name="gameSecond"
                              // placeholder="mode"
                              className="currency-select-drop"
                              displayEmpty
                              // renderValue={(selected) =>
                              //   selected.length !== 0 ? row?.gameSecond[0].split(',').map(Number) == selected ? null : selected.join(', ') : selected.join(', ')
                              // }
                            >
                              <Index.MenuItem
                                value={
                                  row?.gameName == "Penalty Betting" ||
                                  row?.gameName == "Card Betting"
                                    ? "80"
                                    : "30"
                                }
                                className="currency-select-menu"
                                name="INR"
                              >
                                {row?.gameName == "Penalty Betting" ||
                                row?.gameName == "Card Betting"
                                  ? "80"
                                  : "30"}
                                {/* 30 */}
                              </Index.MenuItem>
                              <Index.MenuItem
                                value={
                                  row?.gameName == "Penalty Betting" ||
                                  row?.gameName == "Card Betting"
                                    ? "120"
                                    : "60"
                                }
                                className="currency-select-menu"
                                name="INR"
                              >
                                {row?.gameName == "Penalty Betting" ||
                                row?.gameName == "Card Betting"
                                  ? "120"
                                  : "60"}
                                {/* 60 */}
                              </Index.MenuItem>
                              <Index.MenuItem
                                value={
                                  row?.gameName == "Penalty Betting" ||
                                  row?.gameName == "Card Betting"
                                    ? "180"
                                    : "120"
                                }
                                className="currency-select-menu"
                                name="INR"
                              >
                                {/* 120 */}
                                {row?.gameName == "Penalty Betting" ||
                                row?.gameName == "Card Betting"
                                  ? "180"
                                  : "120"}
                              </Index.MenuItem>
                            </Index.Select>
                          </Index.FormControl>
                          {errors.gameSecond && touched.gameSecond && (
                            <Index.FormHelperText error>
                              {errors.gameSecond}
                            </Index.FormHelperText>
                          )}
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>
                  ) : null}

                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
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

                  {/* <Index.Grid item xs={12} sm={4} md={4} lg={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label width"
                      >
                        Week
                      </Index.Typography>
                      <Index.Box className=" signin-drop-details">
                       <FormControl className="form-control-menu-week">
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            className="form-select-week"
                            name="week"
                            // value={personName}
                            value={values.week}
                            // onChange={handleWeekChange}
                            onChange={(event)=>{
                              const {
                                target: { value },
                              } = event;
                              setFieldValue(
                                "week",
                                // On autofill we get a stringified value.
                                typeof value === "string" ? value.split(",") : value
                              );
                            }}
                            // onChange={handleChange}
                            // input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                             displayEmpty
                            renderValue={
                             values?.week.length 
                                ? undefined
                                : () => "Select your week"
                            }
                          > {names.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, personName, theme)}
                              >
                                {name}
                               </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {errors.week && touched.week && (
                          <Index.FormHelperText error>
                            {errors.week}
                          </Index.FormHelperText>
                        )}
                      </Index.Box>
                    </Index.Grid> */}
                  <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      {row?.gameName == "Community Betting"
                        ? " Game Coin"
                        : " Minimum Coin"}
                      <span className="red-star">*</span>
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
                        onBlur={handleBlur}
                        value={values.gameMinimumCoin}
                        onChange={(e) => {
                          !isNaN(e.target.value) && handleChange(e);
                        }}
                        InputProps={{
                          inputProps: {
                            maxLength: 3,
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
                  {row?.gameName == "Community Betting" ? null : (
                    <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Maximum Coin<span className="red-star">*</span>
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
                          // type="number"
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
                          // onChange={handleChange}
                          helperText={
                            touched.gameMaximumCoin && errors.gameMaximumCoin
                          }
                          error={Boolean(
                            errors.gameMaximumCoin && touched.gameMaximumCoin
                          )}
                        />
                      </Index.Box>
                    </Index.Grid>
                  )}

                  {row?.gameName == "Community Betting" ? null : (
                    <Index.Grid item xs={12} sm={6} md={6} lg={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Winning Coin<span className="red-star">*</span>
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Winning Coin"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="winningCoin"
                          // type="text"
                          onBlur={handleBlur}
                          value={values.winningCoin}
                          onChange={(e) => {
                            !isNaN(e.target.value) && handleChange(e);
                          }}
                          InputProps={{
                            inputProps: {
                              maxLength: 3,
                            },
                          }}
                          helperText={touched.winningCoin && errors.winningCoin}
                          error={Boolean(
                            errors.winningCoin && touched.winningCoin
                          )}
                        />
                      </Index.Box>
                    </Index.Grid>
                  )}

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
                    <Index.Button
                      variant="contained"
                      type="submit"
                      disabled={loading}
                    >
                      {/* {row?._id ? "Update" : "Submit"} */}
                      {loading ? (
                        <Index.CircularProgress color="secondary" size={20} />
                      ) : row?._id ? (
                        "Update"
                      ) : (
                        "Submit"
                      )}
                    </Index.Button>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Stack>
          )}
        </PageIndex.Formik>
      </Index.Box>
    </Index.Box>
  );
};
export default AddGame;
