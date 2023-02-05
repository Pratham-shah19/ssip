import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import "./OTP.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { API } from "../../constants/API";
const OTP = () => {
  const [otp, setOtp] = React.useState("");

  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleOtp = () => {
    const obj = {
      otp: otp,
    };
    //le.log("vivek");
    //le.log(email);
    axios
      .post(`${API.canteen_server}/api/v1/canteenotpvalidate/${email}`, obj)
      .then((res) => {
        const data = res;
        if (data.data.res === "Success") {
          //le.log('success');
          //   localStorage.setItem('token',data.token);
          // <Navigate replace={true}  to="/owner-dashboard"/>\
          navigate("/forget-password_ow");
        }
      })
      .catch((err) => {
        //le.log(err.response.data.msg,'fsdffdafa')
      });
  };

  return (
    <div className="otp-container">
      <div className="otp-outer" style={{ width: "70%" }}>
        {/* <h1 className="otp-title">Enter The OTP</h1>
            <MuiOtpInput value={otp} onChange={handleChange} />
            <button type="button" onClick={handleOtp} className="otp-btn">SUBMIT</button> */}

        <div className="f-e-upper">
          <div className="round">
            <LockOpenIcon className="lock-icon" />
          </div>
        </div>
        <div className="f-e-lower">
          <h1 className="otp-title">Enter The OTP</h1>
          <MuiOtpInput
            value={otp}
            onChange={handleChange}
            className="otp-boxes"
          />
          <button type="button" onClick={handleOtp} className="otp-btn">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;
