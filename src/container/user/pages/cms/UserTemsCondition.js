import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import "./Cms.css";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import Parser from "html-react-parser";

const UserTemsCondition = () => {
  const [termsConditionData, setTermsConditionData] = useState({
    title: "",
    description: "",
  });

  console.log(termsConditionData, 14);

  localStorage.getItem("token");
  //  user teams and condition api call
  const getAllTermsConditionData = async () => {
    await DataService.get(Api.User.CMS_DETAILS)
      .then((res) => {
        console.log(res, 21);
        setTermsConditionData(res?.data?.data?.termsAndCondition);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllTermsConditionData();
  }, []);

  return (
    <>
      {" "}
      <Index.Box className="admin-comman-title-right">
        <Index.Typography className="admin-page-title" variant="h5">
          Terms & Condition
        </Index.Typography>
      </Index.Box>
      <Index.Box className="input-design-div admin-design-div login-input-design-div">
        {/* <Index.Typography className="cms-content" variant="h6">
          {termsConditionData?.title}
        </Index.Typography> */}
        <Index.Typography className="cms-content" variant="h6">
          {termsConditionData?.description
            ? Parser(termsConditionData?.description)
            : ""}
        </Index.Typography>
      </Index.Box>
    </>
  );
};

export default UserTemsCondition;
