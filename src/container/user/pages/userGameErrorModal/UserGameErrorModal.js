import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import moment from "moment";

const UserGameErrorModal = ({ date }) => {
  var d1 = new Date();
  const Today = moment(d1).format("YYYY-MM-DD h:mm A");
  const time = moment().format("hh:mm A");
  const startDate = moment(date?.gameTimeFrom).format("YYYY-MM-DD");
  const endDate = moment(date?.gameTimeTo).format("YYYY-MM-DD h:mm A");

  const startDateTime = moment(startDate + " " + date?.gameDurationFrom);
  const currentDateTime = moment();

  var expected_endtime = moment(startDateTime).add(
    Number(date?.gameHours),
    "minutes");

  const getDate = Today <= startDate;
  return (
    <>
      <Index.Box className="number-betting-text-details text-cap-letter">
        <Index.Typography
          component="h5"
          variant="h5"
          className="live-game-title"
        >
          {/* {expected_endtime_second <= currentDateTime
            ? `${date?.gameName} will be available soon`
            : date?.isRepeat
            ? `${date?.gameName} will be available on ${startDate} at ${date?.gameDurationFrom}`
            : `${date?.gameName} will be available soon`} */}
          {expected_endtime >= currentDateTime
            ? `${date?.gameName} will be available on ${startDate} at ${date?.gameDurationFrom}`
            : date?.gameDurationTo < time
            ? `${date?.gameName} will be available soon`
            : date?.isRepeat
            ? `${date?.gameName} will be available soon`
            : `${date?.gameName} will be available soon`}
        </Index.Typography>
      </Index.Box>
    </>
  );
};

export default UserGameErrorModal;
