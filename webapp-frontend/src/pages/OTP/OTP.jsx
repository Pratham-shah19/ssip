import React from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import './OTP.css'
import { Link, Navigate,useNavigate} from "react-router-dom";
import axios from 'axios';
import CollapsibleBox from '../../components/Collapsible/CollapsibleBox';

const OTP = () => {
  const [otp, setOtp] = React.useState('')

  const email = localStorage.getItem('admin_email');

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
      axios.post(`http://127.0.0.1:5000/api/v1/admin/${email}/validateOTP`,obj) .then(res => {
        const data=res;
        console.log('res_admin',res);
       // console.log();
        if(data.data.res==='success'){
          console.log('success');
        //   localStorage.setItem('token',data.token);
          // <Navigate replace={true}  to="/owner-dashboard"/>\
          navigate('/forget-password');
  
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