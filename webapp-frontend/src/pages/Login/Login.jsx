import React from "react";
import { useState,useEffect } from "react";
import { Link, Navigate,useNavigate} from "react-router-dom";
import "./Login.css";
import axios from "axios";
import * as AuthActions from '../../store/actions/auth'
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setadminEmail] = useState('');
  const [adminPassword, setadminPassword] = useState('');
  const [ownerEmail, setownerEmail] = useState('');
  const [ownerPassword, setownerPassword] = useState('');
  const [adminauthObject, setadminAuthObject] = useState({});
  const [ownerauthObject, setownerAuthObject] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token_main = useSelector((state) => state.auth.token);
  console.log(" vivek",token_main);
  const handleOwnerLogin = () => {
    
  };

  const handleAdminLogin = () => {
    setadminAuthObject(
      {
        email: adminEmail,
        password: adminPassword
      }
    )
    console.log('admin_login_obj',adminauthObject)

  };
  const token = useSelector((state) => state.auth.token);
  const token_admin = useSelector((state) => state.auth.token_admin);
  useEffect(() => {
    if(token){
      navigate('/owner-dashboard');
    }
    if(token_admin){
      navigate('/admin-dashboard');
    }
  })

  const handlePassword_Admin = (e) => {
    setadminPassword(e.target.value);
    console.log("Admin Object:",adminauthObject);
  }
  const handleEmail_Admin = (e) => {
    setadminEmail(e.target.value);
    console.log("Admin Object:",adminauthObject);
  }
  const handlePassword_Owner = (e) => {
    setownerPassword(e.target.value);
    console.log("owner Object:",ownerPassword);
  }
  const handleEmail_Owner = (e) => {
    console.log("e.target.value:",e.target.value);
    setownerEmail(e.target.value);
    console.log("owner Object:",ownerauthObject);
  }
  const handle_Trans_admin = () =>{
    setIsAdmin(false);
  }
  const handle_Trans_Can = () => {
    setIsAdmin(true);
  }
  
  const handle_login_admin = () => {
    let data;
    const obj={
                email: adminEmail,
                password: adminPassword
              };
    axios.post('http://127.0.0.1:2000/api/v1/admin/login',obj) .then(res => {
        const data=res;
        console.log('data.dat.token',data.data.token);
        if(data.data.token){
          console.log('success');
          // localStorage.setItem('token',data.token);

          dispatch(AuthActions.setTokenadmin(data.data.token));
          // <Navigate replace={true}  to="/owner-dashboard"/>\
          
  
        }})
      .catch(err => {
        console.log(err.response.data.msg,'fsdffdafa')
      });
      console.log('admin_obj',obj);
  }
  const handle_login_owner = async () => {
      const obj= 
      {
        email: ownerEmail,
        password: ownerPassword
      }
      ;
      axios.post('http://127.0.0.1:2000/api/v1/canteen/login',obj) .then(res => {
        const data=res;
        console.log('data_own',data.data.token);
        if(data.data.token){
          dispatch(AuthActions.setToken(data.data.token));
          console.log('success',data.data.token);
          // localStorage.setItem('token',data.data.token);
          // const token = localStorage.getItem('token');  
          // console.log(token);
          
          // <Navigate replace={true}  to="/owner-dashboard"/>\
          navigate('/owner-dashboard');
  
        }})
      .catch(err => {
        console.log(err.response.data.msg,'fsdffdafa')
      });
    
      
  }
  return (
    <div className="outer-login">
      <div
        className={isAdmin ? "container right-panel-active" : "container"}
        id="main"
      >
        <div className="owner">
          <form action="#">
            <h1>Login For Owner</h1>

            <p>Use your provided E-mail and Password for login</p>
            <input
              type="text"
              name="email"
              placeholder="Enter Your E-mail"
              required
              value={ownerEmail}
              onChange={(e) => handleEmail_Owner(e)}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={ownerPassword}
              onChange={(e) => handlePassword_Owner(e)}
              required
            />
            {/* <Link to="/owner-dashboard"> */}
            <Link to="/forget-email_ow">
            <p>forget password?<a className="forget-pass">click here</a></p>
              </Link>
              <button type="button" onClick={handle_login_owner}>Log In</button>
            {/* </Link> */}
          </form>
        </div>
        <div className="admin">
          <form action="#">
            <h1>Login For Admin</h1>

            <p>Use your registered E-mail and Password for login</p>
            <input
              type="text"
              name="email"
              placeholder="Enter Your E-mail"
              onChange={(e) => handleEmail_Admin(e)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              onChange={(e) => handlePassword_Admin(e)}
              required
            />
              <Link to="/forget-email">
              {/* <button type="button">Forget Password</button> */}
              <p>forget password?<a className="forget-pass">click here</a></p>
              </Link>
                <button type="button" onClick={handle_login_admin}>Log In</button>
          
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-left">
              <h1>Are You An Admin?</h1>
              <p>Click the below button for login as Admin</p>
              <button id="adminLogIn" onClick={handle_Trans_admin}>
                Admin Login
              </button>
            </div>
            <div className="overlay-right">
              <h1>Are You A Canteen Owner?</h1>
              <p>Click the below button for login as Canteen Owner</p>
              <button id="ownerLogIn"onClick={handle_Trans_Can}>
                Owner Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="error-box">
        Incorrect Password
      </div> */}
    </div>
  );
};

export default Login;
