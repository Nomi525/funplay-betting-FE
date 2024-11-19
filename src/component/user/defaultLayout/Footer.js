import React from "react";
import Index from "../../Index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

export default function Footer({ selectedVal, setSelectedVal }) {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location?.pathname, 7);
  const currentYear = moment().format("YYYY");
  return (
    <>
      <Index.Box className="user-footer-details">
        <Index.Box className="left-copyright-content">
          <Index.Box className="copyright-title-details">
            <Index.Typography
              component="p"
              variant="p"
              className="copy-details-footer"
            >
              {" "}
              &#169; {currentYear} <Index.Link>Club99X</Index.Link> , All rights
              reserved.
            </Index.Typography>
          </Index.Box>
        </Index.Box>
        <Index.Box className="right-cms-content">
          <Index.List className="list-footer-content">
            {location?.pathname != "/user/terms-condition" ? (
              <Index.ListItem
                className="list-item-content-details"
                onClick={() => {
                  setSelectedVal("Terms and Conditions");
                  navigate("/user/terms-condition");
                }}
              >
                <Link className="page-footer-referances">
                  Terms and Conditions
                </Link>
              </Index.ListItem>
            ) : (
              <Index.ListItem
                className="list-item-content-details"
                onClick={() => {
                  setSelectedVal("Privacy Policy");
                  navigate("/user/privacy-policy");
                }}
              >
                <Link className="page-footer-referances">Privacy Policy</Link>
              </Index.ListItem>
            )}

            {/* <Index.ListItem className="list-item-content-details">
              <Link className="page-footer-referances" to="/user/contact-us">
                Contact Us
              </Link>
            </Index.ListItem> */}
          </Index.List>
        </Index.Box>
      </Index.Box>
    </>
  );
}
