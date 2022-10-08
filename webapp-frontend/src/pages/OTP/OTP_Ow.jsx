import React from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import './OTP.css'
import { Link, Navigate,useNavigate} from "react-router-dom";
import axios from 'axios';

const OTP = () => {
  const [otp, setOtp] = React.useState('')

  const email = localStorage.getItem('email');

  const navigate = useNavigate();

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  const handleOtp = () => {
    const obj= 
      {
        otp:otp
      }
      ;
      console.log("vivek");
      console.log(email);
      axios.post(`http://127.0.0.1:4000/api/v1/canteenotpvalidate/${email}`,obj) .then(res => {
        const data=res;
        if(data.data.res==='Success'){
          console.log('success');
        //   localStorage.setItem('token',data.token);
          // <Navigate replace={true}  to="/owner-dashboard"/>\
          navigate('/forget-password_ow');
  
        }})
      .catch(err => {
        console.log(err.response.data.msg,'fsdffdafa')
      });
  }

  return (
    <div className="otp-container">
        <div className="otp-outer" style={{width:"70%",}}>
            <h1 className="otp-title">Enter The OTP</h1>
            <MuiOtpInput value={otp} onChange={handleChange} />
            <button type="button" onClick={handleOtp} className="otp-btn">SUBMIT</button>
        </div>
    </div>
  )
}

export default OTP;