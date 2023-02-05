import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import "./AdminRegister.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../../constants/API";
const AdminRegister = () => {
  const clickHandler = async (e) => {
    const obj = {
      name: document.f1.name.value,
      email: document.f1.email.value,
      password: document.f1.password.value,
      address: document.f1.address.value,
    };
    //le.log(obj);
    const data = await Axios.post(
      `${API.auth_server}/api/v1/user/register`,
      obj
    );
    //le.log("add_data", data);
  };
  const token_main = useSelector((state) => state.auth.token_admin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token_main) {
      navigate("/");
    }
  }, []);
  return (
    <div className="admin-container">
      <div className="admin-outer">
        <AdminNavbar />
        <div className="admin-register">
          <form name="f1">
            <div className="form-cell">
              <div className="form-left">
                <h4>Name : </h4>
              </div>
              <div className="form-right">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Name"
                  required
                />
              </div>
            </div>
            <div className="form-cell">
              <div className="form-left">
                <h4>E-mail : </h4>
              </div>
              <div className="form-right">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter E-mail"
                  required
                />
              </div>
            </div>
            <div className="form-cell">
              <div className="form-left">
                <h4>Password : </h4>
              </div>
              <div className="form-right">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  required
                />
              </div>
            </div>
            <div className="form-cell">
              <div className="form-left">
                <h4>Address : </h4>
              </div>
              <div className="form-right">
                <textarea
                  name="address"
                  id="address"
                  placeholder="Enter Address"
                  required
                />
              </div>
            </div>
            <input
              type="submit"
              value="SUBMIT"
              onClick={clickHandler}
              className="submit-btn"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
