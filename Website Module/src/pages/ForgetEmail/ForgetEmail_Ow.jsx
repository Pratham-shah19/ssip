import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import axios from "axios";
// import './OTP.css'
import { Link, Navigate, useNavigate } from "react-router-dom";

import OTW_Ow from "../OTP/OTP_Ow";
const ForgetEmail = () => {
  const [Error, setError] = useState("");
  const [email, setEmail] = useState("");
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
    axios
      .patch("http://127.0.0.1:2000/api/v1/canteen/forgotpassword", obj)
      .then((res) => {
        const data = res;
        if (data.data.res === "Success") {
          //le.log('success');
          //   localStorage.setItem('token',data.token);
          // <Navigate replace={true}  to="/owner-dashboard"/>\
          localStorage.setItem("email", email);
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
  function handleOtp() {
    return <OTW_Ow />;
  }
  return (
    <div className="otp-container">
      <div className="otp-outer">
        <h1 className="otp-title">Enter The E-Mail</h1>
        <input
          type="text"
          name="forget-email"
          id="forget-email"
          onChange={handleChange}
          value={email}
        />
        {Error && <p>{Error}</p>}
        {successMail && handleOtp()}
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
  );
};

export default ForgetEmail;
