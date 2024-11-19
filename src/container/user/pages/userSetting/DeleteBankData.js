import React from "react";
import Index from "../../../Index";
import deleteIcon from "../../../../../src/assets/svg/deleteIcon.svg";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import PagesIndex from "../../../pageIndex";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userProfile } from "../../../../redux/user/userReducer";

export default function DeleteBankData(props) {
  const { handleClose, deleteId } = props;
  const dispatch = useDispatch();

  const handledelete = (deleteId) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("bankDetailId", deleteId);

    DataService.post(Api.User.USER_BANK_DELETE, urlencoded)
      .then((res) => {
        // console.log(res, 21);
        toast.success(res.data.message, {
          toastId: "customId",
        });
        handleClose();
        // getAllBannerList();
        dispatch(userProfile());
      })
      .catch((e) => {
        toast.error(
          e.response.data.message ? e.response.data.message : e.message,
          {
            toastId: "customId",
          }
        );
      });
  };

  return (
    <>
      <Index.Box>
        <Index.Box className="delete-game-data-main">
          <Index.Box>
            <h3 className="deleteModel-heading">
              Are you sure you want to delete bank record?
            </h3>
          </Index.Box>

          <Index.Box className="deleteModel-btna1">
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
                variant="contained"
                btnLabel="Confirm"
                className="blue-btn-content"
                onClick={() => handledelete(deleteId)}
              />
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
