import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './OTP.css'

const NewPassword = () => {

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const email = localStorage.getItem("admin_email");

    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmChange = (e) => {
        setConfirm(e.target.value);
    }

    const handlePassword = () => {
        if(password === confirm) {
            const obj= 
      {
        password:password
      }
      ;
      console.log("vivek");
      console.log(email);
      axios.patch(`http://127.0.0.1:5000/api/v1/admin/${email}/updatePassword`,obj) .then(res => {
        const data=res;
        if(data.data.res==='success'){
          console.log('success');
        //   localStorage.setItem('token',data.token);
          // <Navigate replace={true}  to="/owner-dashboard"/>\
          navigate('/');
  
        }})
      .catch(err => {
        console.log(err.response.data.msg,'fsdffdafa')
      });
        }
        else {
            alert('Please enter same password and confirm password')
        }
    }

  return (
    <div className="otp-container">
        <div className="otp-outer">
            <h1 className="otp-title">Enter New Password</h1>
            <input type="text" name="forget-password" id="forget-password" onChange={handlePasswordChange} value={password} />
            <h1 className="otp-title">Confirm Password</h1>
            <input type="text" name="forget-password-confirm" id="forget-password-confirm" onChange={handleConfirmChange} value={confirm} />
            <button type="button" onClick={handlePassword} className="otp-btn">SUBMIT</button>
        </div>
    </div>
  )
}

export default NewPassword;