import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import "./Cms.css";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import Parser from "html-react-parser";

const UserPrivacyPolice = () => {
  const [privacyPolicy, stePrivacyPolicy] = useState({
    title: "",
    description: "",
  });
  // user aboutus api call
  const getAllAboutus = async () => {
    await DataService.get(Api.User.CMS_DETAILS)
      .then((res) => {
        stePrivacyPolicy(res?.data?.data?.privacyPolicy);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllAboutus();
  }, []);

  return (
    <>
      <Index.Box className="admin-comman-title-right">
        <Index.Typography className="admin-page-title" variant="h5">
          Privacy policy
        </Index.Typography>
      </Index.Box>
      <Index.Box className="input-design-div admin-design-div login-input-design-div">
        {/* <Index.Typography className="cms-content" variant="h6">
          {aboutUs?.title}
        </Index.Typography> */}
        <Index.Typography className="cms-content" variant="h6">
          {privacyPolicy?.description ? Parser(privacyPolicy?.description) : ""}
        </Index.Typography>
      </Index.Box>
    </>
  );
};

export default UserPrivacyPolice;
