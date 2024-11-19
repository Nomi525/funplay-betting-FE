import React from "react";
import Index from "../../../Index";
import deleteIcon from "../../../../../src/assets/svg/deleteIcon.svg"
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import PagesIndex from "../../../pageIndex";
import { toast } from "react-toastify";


export default function DeleteCurrencyData(props) {
  const { handleClose,deleteId ,getAllCurrencyList} = props;
  const handledelete = (deleteId) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("currencyCoinId", deleteId);
   
      DataService.post(Api.Admin_currency_delete, urlencoded)
        .then((res) => {
         console.log(res?.data,"data")
          toast.success(res.data.message,{
            toastId:"customId"
          });
          handleClose();
          getAllCurrencyList();
        })
        .catch((e) => {
          toast.error(
            e.response.data.message ? e.response.data.message : e.message,{
              toastId:"customId"
            }
          );
        });
    
  };

  return (
    <>
      <Index.Box>
      <Index.Box className="delete-game-data-main">

          <Index.Box>
         <h3 className="deleteModel-heading">Are you sure you want to delete currancy?</h3>
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
                className="blue-btn-content"  onClick={()=> handledelete(deleteId)} />
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
