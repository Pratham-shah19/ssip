import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import * as AuthActions from "../../store/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { API } from "../../constants/API";
const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setadminEmail] = useState("");
  const [adminPassword, setadminPassword] = useState("");
  const [ownerEmail, setownerEmail] = useState("");
  const [ownerPassword, setownerPassword] = useState("");
  const [adminauthObject, setadminAuthObject] = useState({});
  const [ownerauthObject, setownerAuthObject] = useState({});
  const [Error, setError] = useState("");
  const [isError, issetError] = useState(false);
  const [Owner_isError, Owner_issetError] = useState(false);
  const [Owner_Error, Owner_setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token_main = useSelector((state) => state.auth.token);
  //le.log(" vivek",token_main);
  const handleOwnerLogin = () => {};

  const handleAdminLogin = () => {
    setadminAuthObject({
      email: adminEmail,
      password: adminPassword,
    });
    //le.log('admin_login_obj',adminauthObject)
  };
  const token = useSelector((state) => state.auth.token);
  const token_admin = useSelector((state) => state.auth.token_admin);
  useEffect(() => {
    if (token) {
      navigate("/owner-dashboard");
    }
    if (token_admin) {
      navigate("/admin-dashboard");
    }
  });

  const handlePassword_Admin = (e) => {
    setadminPassword(e.target.value);
    //le.log("Admin Object:",adminauthObject);
  };
  const handleEmail_Admin = (e) => {
    setadminEmail(e.target.value);
    //le.log("Admin Object:",adminauthObject);
  };
  const handlePassword_Owner = (e) => {
    setownerPassword(e.target.value);
    //le.log("owner Object:",ownerPassword);
  };
  const handleEmail_Owner = (e) => {
    //le.log("e.target.value:",e.target.value);
    setownerEmail(e.target.value);
    //le.log("owner Object:",ownerauthObject);
  };
  const handle_Trans_admin = () => {
    setIsAdmin(false);
  };
  const handle_Trans_Can = () => {
    setIsAdmin(true);
  };

  const handle_login_admin = () => {
    const obj = {
      email: adminEmail,
      password: adminPassword,
    };
    axios
      .post(`${API.auth_server}/api/v1/admin/login`, obj)
      .then((res) => {
        const data = res;
        //le.log('data.dat.token',data.data.token);
        if (data.data.token) {
          //le.log('success');
          // localStorage.setItem('token',data.token);

          dispatch(AuthActions.setTokenadmin(data.data.token));
          // <Navigate replace={true}  to="/owner-dashboard"/>\
        }
      })
      .catch((err) => {
        console.log(err);
        issetError(true);
        setError(err.response.data.msg);
        throw err.response.data.msg;
        //le.log(err.response.data.msg,'fsdffdafa')
      });
    //le.log('admin_obj',obj);
  };
  const handle_login_owner = async () => {
    const obj = {
      email: ownerEmail,
      password: ownerPassword,
    };
    axios
      .post(`${API.auth_server}/api/v1/canteen/login`, obj)
      .then((res) => {
        const data = res;
        //le.log('data_own',data.data.token);
        if (data.data.token) {
          dispatch(AuthActions.setToken(data.data.token));
          //le.log('success',data.data.token);
          // localStorage.setItem('token',data.data.token);
          // const token = localStorage.getItem('token');
          // //le.log(token);

          // <Navigate replace={true}  to="/owner-dashboard"/>\
          navigate("/owner-dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        Owner_issetError(true);
        Owner_setError(err.response.data.msg);
        console.log(obj.email, obj.password);
        throw err.response.data.msg;
      });
  };
  function showerror(err) {
    console.log("lol");
    return <p className="error">{err}</p>;
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
              // className={Owner_isError ? "ow-er-ow ow-er" : "ow-er-ow"}
            />
            {Owner_isError && showerror(Owner_Error)}
            {/* <Link to="/owner-dashboard"> */}
            <Link to="/forget-email_ow">
              <p>
                forget password?<a className="forget-pass">click here</a>
              </p>
            </Link>
            <button type="button" onClick={handle_login_owner}>
              Log In
            </button>
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
            {isError && showerror(Error)}
            <Link to="/forget-email">
              {/* <button type="button">Forget Password</button> */}
              <p>
                forget password?<a className="forget-pass">click here</a>
              </p>
            </Link>
            <button type="button" onClick={handle_login_admin}>
              Log In
            </button>
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
              <button id="ownerLogIn" onClick={handle_Trans_Can}>
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
