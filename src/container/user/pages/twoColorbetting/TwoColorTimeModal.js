import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import deleteIcon from "../../../../../src/assets/svg/deleteIcon.svg"
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import "../../../../../src/assets/style/global.css";
import PagesIndex from "../../../pageIndex";
import "../../../admin/pages/gameManagement/AddGame.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function TwoColorTimeModal({ setSelectedSeconds, handleClose, handleCloseGameRules, setStartTimer, setFixSecond }) {
  const location = useLocation();
  // const gameId = location?.state?.id?>_id;
  const storedValue = localStorage.getItem("userGameId");
  const gameId = JSON.parse(storedValue);
  const navigate = useNavigate()
  const [selectedSecond, setSeletedAmount] = useState("");
  const [val, setVal] = useState(selectedSecond);
  const [time, setTime] = useState(gameId?.gameTime);

  const handleChangeAmount = (amount) => {
    setSeletedAmount(amount)
    setStartTimer(false)
    setFixSecond(amount)
  }

  // const userGetNumberBetting = () => {
  //   DataService.get(Api.User.USER_GET_SINGLE_GAMETIME + "/" + gameId)
  //     .then((res) => {
  //       setTime(res?.data?.data?.gameTime)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     });
  // }

  // useEffect(() => {
  //   userGetNumberBetting()
  // }, [])


  return (
    <>
      <Index.Box >
        <Index.Box className="delete-game-data-main">
          <Index.Box className="number-list-details">
            <Index.Box className="second-listbtn-main">
              {time && time?.map((ele) => {
                return (
                  <Index.Typography className={`${selectedSecond == ele ? 'number-bet-coin second-list-button selected-game-time' : 'number-bet-coin second-list-button'}`} component='p' variant='p' onClick={() => handleChangeAmount(ele)}>{ele}</Index.Typography>
                )
              })}
            </Index.Box>
          </Index.Box>
          {/* <Index.Box className="number-list-details"
          >
            <Index.Button onClick={() => handleChangeAmount(100)} className={selectedSecond == 100 ? "bg-num-bet-conetnt active-bg" : "bg-num-bet-conetnt"}  >
              <Index.Typography className='number-bet-coin' component='p' variant='p'>100</Index.Typography>
            </Index.Button>
          </Index.Box> */}
          {/* <Index.Box className="number-list-details"
          >
            <Index.Button onClick={() => handleChangeAmount(80)} className={selectedSecond == 80 ? "bg-num-bet-conetnt active-bg" : "bg-num-bet-conetnt"}  >
              <Index.Typography className='number-bet-coin' component='p' variant='p'>80</Index.Typography>
            </Index.Button>
          </Index.Box> */}

          <Index.Box className="deleteModel-btna1" >
            <Index.Box className="btn-col">
              <PagesIndex.BlueOutlineButton
                variant="contained"

                onClick={() => {
                    if (val === selectedSecond) {
                      toast.error('Please select game time', {
                        toastId: "customId"
                      })
                    } else {
                      // handleClose(); handleCloseGameRules(); navigate("/user/number-betting", {
                      //   state: {
                      //     selectedSecond: selectedSecond,
                      //   },
                      // })
                      setSelectedSeconds(selectedSecond);
                      // handleClose(); handleCloseGameRules(); navigate("/user/two-color-betting", {
                      //   state: {
                      //     selectedSecond: selectedSecond,
                      //   },
                      // })
                    }
  
                  }}

                color="error"
                btnLabel="Ok"
                className="outline-blue-btn-content"
              />

            </Index.Box>

          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
