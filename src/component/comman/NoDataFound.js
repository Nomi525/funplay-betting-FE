import React from "react";
import Index from "../../container/Index";

const NoDataFound = ({ colSpan, message }) => {
  return (
    <Index.TableRow>
      <Index.TableCell align="center" colSpan={colSpan}>
        {message || "No record found"}
      </Index.TableCell>
    </Index.TableRow>
  );
};

export default NoDataFound;
