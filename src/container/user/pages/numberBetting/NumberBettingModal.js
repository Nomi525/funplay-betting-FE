import React from "react";
import Index from "../../../Index";
import deleteIcon from "../../../../../src/assets/svg/deleteIcon.svg"
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import "../../../../../src/assets/style/global.css";
import PagesIndex from "../../../pageIndex";
import "../../../admin/pages/gameManagement/AddGame.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function NumberBettingModal(props) {
  const { handleClose, userAddNumberBetting ,setShowWinnewModal , gameData,selectedAmount} = props;
  const navigate = useNavigate()


  return (
    <>
      <Index.Box >
        <Index.Box className="delete-game-data-main">
         <Index.Box marginTop={3}>
         <h3 className="deleteModel-heading">You want to bet {selectedAmount} coin </h3>
         </Index.Box>
          <Index.Box className="deleteModel-btna1" >
            <Index.Box className="btn-col">
              <PagesIndex.BlueOutlineButton
                variant="contained"
                onClick={handleClose}
                color="error"
                btnLabel="Cancel"
                className="outline-blue-btn-content"
              />

            </Index.Box>
            <Index.Box className="btn-col">
              <PagesIndex.BlueButton
             onClick={()=>{
                userAddNumberBetting();
                handleClose()
                setShowWinnewModal(false)
                navigate("/user/number-betting", {
                  state: {
                    gameData: gameData,
                  },
                })
             }}
                variant="contained" btnLabel="Confirm"
                className="blue-btn-content"  />
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
