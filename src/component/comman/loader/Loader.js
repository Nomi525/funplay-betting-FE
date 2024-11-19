
import React from "react";
import "../loader/Loader.css";

export default function Loader() {
  return (

    <>
       {/* <div className="spinner-container">
      <div class="loader"></div>
   </div> */}

      <div className="loader-center">
        <div class="loader loader-1">
          <div class="loader-outter"></div>
          <div class="loader-inner"></div>
        </div>
      </div>
    </>
  );
}