import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { useLocation } from "react-router-dom";
import { Formik, Field, FieldArray } from "formik";

const PlusTable = () => {
  const navigate = Index.useNavigate();
  const location = useLocation();
  const row = location?.state?.selectedData;
  const [timeList, setTimeList] = useState([]);
  const initialValues = {
    gameName: row?.gameName ? row?.gameName : "",
    time: row?.gameTime.length
      ? row?.gameTime.map((time) => ({ gameTime: time }))
      : [
          {
            gameTime: "",
          },
        ],
  };

  const handleFormSubmit = async (values) => {
    //   let newTime = values.time.map((item) =>
    //   moment(item.gameTime.$d).format("HH:mm")
    // );
    let newTime = values.time.map((item) => item.gameTime);

    const data = {
      gameId: row?._id,
      gameName: values?.gameName,
      gameTime: newTime,
    };
    // if (row?._id) {
    //   data.id = row?._id;
    // }
    DataService.post(Api.ADMIN_ADD, data)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/admin/game-management");
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

  return (
    <>
      <Index.Box className="page-content-box">
        <Index.Box className="barge-common-box">
          <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
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
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Index.Box className="">
                  <Index.Grid container spacing={3}>
                    {/* {console.log(values, "uves78")} */}
                    <Index.Grid item xs={12} sm={6} md={5} lg={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        // className="input-label"
                        className="input-label width"
                      >
                        Game Name
                        <span className="red-star">*</span>
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
                          value={values.gameName}
                          onChange={handleChange}
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
                    <Index.Grid item xs={12} sm={6} md={5} lg={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Game Duration
                        <span className="red-star">*</span>
                      </Index.Typography>
                      <FieldArray name="time">
                        {({ insert, remove, push }) => (
                          <div className="mt-none-game-duration">
                            {values.time.length > 0 &&
                              values.time.map((time, index) => {
                                return (
                                  <>
                                    <div className="row-time-main" key={index}>
                                      {/* <div className="col-one-time">
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
                                              name={`time.${index}.gameTime`}
                                              format="HH:mm"
                                              value={dayjs(
                                                values.time[index].gameTime
                                              )}
                                              onChange={(e) =>
                                                setFieldValue(
                                                  `time.${index}.gameTime`,
                                                  e
                                                )
                                              }
                                            />
                                          </DemoContainer>
                                        </LocalizationProvider>
                                      </Index.Box>
                                      {errors.gameTime && touched.gameTime && (
                                        <Index.FormHelperText error>
                                          {errors.gameTime}
                                        </Index.FormHelperText>
                                      )}
                                    </div> */}

                                      <Index.Box className=" signin-drop-details row-time-width admin-dropdown-details">
                                        <Index.FormControl className="formcontrol_login sign-in-inner-form">
                                          <Index.Select
                                            className="currency-select-drop"
                                            onChange={handleChange}
                                            // value={values?.time[index]?.gameTime}
                                            value={values.time[index].gameTime}
                                            // value={values.time[index].gameTime? values.time[index].gameTime.length- 1 ===index ? " " : ","}
                                            // name="gameTime"
                                            name={`time.${index}.gameTime`}
                                            // placeholder="mode"
                                            // displayEmpty
                                            // renderValue={
                                            //   values?.gameTime !== ""
                                            //     ? undefined
                                            //     : () => "Select your mode"
                                            // }
                                            // disabled={()=>
                                            //   {
                                            //     if(values.time.find((ele)=>ele.gameTime == "120")){
                                            //       return true
                                            //     }
                                            //     return false;
                                            //   }
                                            // }
                                          >
                                            <Index.MenuItem
                                              value={"30"}
                                              name="30"
                                              className="currency-select-menu"
                                              disabled={values.time.some(
                                                (ele) => ele.gameTime === "30"
                                              )}
                                            >
                                              30
                                            </Index.MenuItem>
                                            <Index.MenuItem
                                              value={"60"}
                                              className="currency-select-menu"
                                              name="60"
                                              disabled={values.time.some(
                                                (ele) => ele.gameTime === "60"
                                              )}
                                            >
                                              60
                                            </Index.MenuItem>
                                            <Index.MenuItem
                                              value={"120"}
                                              className="currency-select-menu"
                                              name="120"
                                              disabled={values.time.some(
                                                (ele) => ele.gameTime === "120"
                                              )}
                                            >
                                              120
                                            </Index.MenuItem>
                                          </Index.Select>
                                        </Index.FormControl>
                                        {errors.gameTime &&
                                          touched.gameTime && (
                                            <Index.FormHelperText error>
                                              {errors.gameTime}
                                            </Index.FormHelperText>
                                          )}
                                      </Index.Box>

                                      {index === 0 ? (
                                        <button
                                          type="button"
                                          className="secondary btn-plustable"
                                          onClick={() => {
                                            values?.time.length < 3 &&
                                              push({ gameTime: "" });
                                          }}
                                        >
                                          <img
                                            src={PageIndex.Png.btnplus}
                                            className=" plus-icon-btn"
                                          />
                                        </button>
                                      ) : (
                                        <button
                                          type="button"
                                          className="secondary btn-plustable"
                                          onClick={() => remove(index)}
                                        >
                                          <img
                                            src={PageIndex.Png.btnminus}
                                            className="minus-icon-btn"
                                          />
                                        </button>
                                      )}
                                    </div>
                                  </>
                                );
                              })}
                          </div>
                        )}
                      </FieldArray>
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
          </Formik>
        </Index.Box>
      </Index.Box>
    </>
  );
};
export default PlusTable;
