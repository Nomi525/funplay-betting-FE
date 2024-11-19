import React from "react";
import Index from "../../Index";

export default function BlueButton(props) {
  return (
    <>
      <Index.Box className="blue-btn-main">
        <Index.Button
          className={props.className}
          type={props.type}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.btnLabel}
        </Index.Button>
      </Index.Box>

      {/* {/ use this button like below demo /}
      {/ <Index.BlueButton btnLabel="View Button"/> /} */}
    </>
  );
}
