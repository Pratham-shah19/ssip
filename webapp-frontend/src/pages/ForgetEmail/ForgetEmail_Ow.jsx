import React, {useState} from 'react'
// import { Link } from 'react-router-dom';
import axios from "axios";
// import './OTP.css'
import { Link, Navigate,useNavigate} from "react-router-dom";

const ForgetEmail = () => {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleForgetPassword = (e) => {
        const obj= 
      {
        email: email
      }
      ;
      console.log("vivek");
      axios.patch('http://127.0.0.1:2000/api/v1/canteen/forgotpassword',obj) .then(res => {
        const data=res;
        if(data.data.res==='Success'){
          console.log('success');
        //   localStorage.setItem('token',data.token);
          // <Navigate replace={true}  to="/owner-dashboard"/>\
          localStorage.setItem('email',email);
          navigate('/otp_ow');
  
        }})
      .catch(err => {
        console.log(err.response.data.msg,'fsdffdafa')
      });
    }

  return (
    <div className="otp-container">
        <div className="otp-outer">
            <h1 className="otp-title">Enter The E-Mail</h1>
            <input type="text" name="forget-email" id="forget-email" onChange={handleChange} value={email} />
            <button type="button" onClick={handleForgetPassword} className="otp-btn">SUBMIT</button>
        </div>
    </div>
  )
}

export default ForgetEmail;