import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import "./Cms.css";
import { Api } from "../../../../config/Api";
import Parser from "html-react-parser";
import DataService from "../../../../config/DataService";

const UserContactUs = () => {
  const [contactUs, setContactUs] = useState({
    title: "",
    description: "",
  });

  // user contactUs api call
  const getAllContactUs = async() => {
  await  DataService.get(Api.User.CMS_DETAILS)
      .then((res) => {
        setContactUs(res?.data?.data?.privacyPolicy);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllContactUs();
  }, []);

  return (
    <>
      {" "}
      <Index.Box className="admin-comman-title-right">
        <Index.Typography className="admin-page-title" variant="h5">
          Contact Us
        </Index.Typography>
      </Index.Box>
      <Index.Box className="input-design-div admin-design-div login-input-design-div">
        {/* <Index.Typography className="cms-content" variant="h6">
          {contactUs?.title}
        </Index.Typography> */}
        <Index.Typography className="cms-content" variant="h6">
          {contactUs?.description ? Parser(contactUs?.description) : ""}
        </Index.Typography>
      </Index.Box>
    </>
  );
};

export default UserContactUs;
