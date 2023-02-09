import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import axios from "axios";
// import './OTP.css'
import { Link, Navigate, useNavigate } from "react-router-dom";
import OTP from "../OTP/OTP";
import "./ForgetEmail.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { API } from "../../constants/API";
const ForgetEmail = () => {
  const [email, setEmail] = useState("");
  const [Error, setError] = useState("");
  const [successMail, setSuccessMail] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgetPassword = (e) => {
    const obj = {
      email: email,
    };
    //le.log("vivek");
    console.log(obj);
    axios
      .patch(`${API.auth_server}/api/v1/admin/forgotpassword`, obj)
      .then((res) => {
        const data = res;
        if (data.data.res === "Success") {
          //le.log('success');
          localStorage.setItem("admin_email", email);
          // <Navigate replace={true}  to="/owner-dashboard"/>\
          setSuccessMail(true);
        }
      })
      .catch((err) => {
        console.log(err.response.data.msg, "fsdffdafa");
        setError(err.response.data.msg);
        throw err;
      });
  };
  const handleTest = () => {
    localStorage.setItem("email", email);
    setSuccessMail(true);
  };
  function handleOTP() {
    return <OTP />;
  }

  return (
    <>
      {!successMail ? (
        <div className="otp-container">
          <div className="otp-outer">
            {/* <h1 className="otp-title">Enter The E-Mail</h1>
        <input
          type="text"
          name="forget-email"
          id="forget-email"
          onChange={handleChange}
          value={email}
        />
        {Error && <p>{Error}</p>}
        {successMail && handleOTP()}
        {!successMail && (
          <button
            type="button"
            onClick={handleForgetPassword}
            className="otp-btn"
          >
            SUBMIT
          </button>
        )}
        <button type="button" onClick={handleTest} className="otp-btn">
          TEST
        </button> */}

            <div className="f-e-upper">
              <div className="round-e">
                <LockOpenIcon className="lock-icon" fontSize="large" />
              </div>
            </div>
            <div className="f-e-lower">
              <h1 className="otp-title">Enter The E-Mail</h1>
              <input
                type="text"
                name="forget-email"
                id="forget-email"
                onChange={handleChange}
                value={email}
              />
              {Error && <p>{Error}</p>}
              {!successMail && (
                <button
                  type="button"
                  onClick={handleForgetPassword}
                  className="otp-btn"
                >
                  SUBMIT
                </button>
              )}

              <button type="button" onClick={handleTest} className="otp-btn">
                Test
              </button>
            </div>
          </div>
        </div>
      ) : (
        handleOTP()
      )}
    </>
  );
};

export default ForgetEmail;
