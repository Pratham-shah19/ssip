import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import './OTP.css'
import { API } from "../../constants/API";
const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const email = localStorage.getItem("admin_email");

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmChange = (e) => {
    setConfirm(e.target.value);
  };

  const handlePassword = () => {
    if (password === confirm) {
      const obj = {
        password: password,
      };
      axios
        .patch(`${API.admin_server}/api/v1/admin/${email}/updatePassword`, obj)
        .then((res) => {
          const data = res;
          if (data.data.res === "success") {
            //le.log('success');
            //   localStorage.setItem('token',data.token);
            // <Navigate replace={true}  to="/owner-dashboard"/>\
            navigate("/");
          }
        })
        .catch((err) => {
          //le.log(err.response.data.msg,'fsdffdafa')
        });
    } else {
      alert("Please enter same password and confirm password");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-outer">
        <h1 className="otp-title">Enter New Password</h1>
        <input
          type="text"
          name="forget-password"
          id="forget-password"
          onChange={handlePasswordChange}
          value={password}
        />
        <h1 className="otp-title">Confirm Password</h1>
        <input
          type="text"
          name="forget-password-confirm"
          id="forget-password-confirm"
          onChange={handleConfirmChange}
          value={confirm}
        />
        <button type="button" onClick={handlePassword} className="otp-btn">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
