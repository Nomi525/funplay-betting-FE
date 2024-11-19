import React from "react";
import Index from "../../../Index";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import "../../../../../src/assets/style/global.css";
import PagesIndex from "../../../pageIndex";
import "../gameManagement/AddGame.css";

export default function DeleteGameData(props) {
  const { handleClose, deleteId, getAllGamesList } = props;

  const handledelete = (id) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("gameId", deleteId);

    DataService.post(Api.ADMIN_GAME_DELETE, urlencoded)
      .then((res) => {
       
        toast.success(res.data.message,{
          toastId:"customId"
        });
        handleClose();
        getAllGamesList();
      })
      .catch((e) => {
        toast.error(
          e.response.data.message ? e.response.data.message : e.message,{  toastId:"customId"}
        );
      });

  };

  return (
    <>
      <Index.Box >
        <Index.Box className="delete-game-data-main">
         <Index.Box marginTop={3}>
         <h3 className="deleteModel-heading">Are you sure you want to delete game?</h3>
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
                variant="contained" btnLabel="Confirm"
                className="blue-btn-content" onClick={handledelete} />
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
