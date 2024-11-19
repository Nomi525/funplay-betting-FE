import React from "react";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Index from "../../../container/Index";
import PageIndex from "../../PageIndex";

export default function FileExcel({ apiData, fileName }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <>
      <Index.Box className="export-btn-main ml-export">
        <Index.Button
          variant="contained"
          type="primary"
          className="fil_Button"
          onClick={(e) => exportToCSV(apiData, fileName)}
        >
          <img src={PageIndex.Svg.downloadcsv} className="svg-download-csv"/>
          Download CSV
        </Index.Button>
      </Index.Box>
    </>
  );
}
