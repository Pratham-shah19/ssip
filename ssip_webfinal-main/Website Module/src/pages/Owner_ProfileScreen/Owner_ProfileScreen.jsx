import React, { useEffect, useState } from "react";
import "./Owner_ProfileScreen.css";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as AuthActions from "../../store/actions/auth";
const Owner_ProfileScreen = ({ token, logout }) => {
  const navigate = useNavigate();
  const _logout = () => {
    logout();
    navigate("/");
  };
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });
  return (
    <div className="admin-container">
      <div className="admin-outer">
        {/* <AdminNavbar /> */}
        <div className="profile-container">
          <div className="profile-left">
            <div className="profile-pic">
              <img
                src="https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png"
                alt=""
              />
            </div>
            <div className="profile-btns">
              <input type="file" name="CHANGE PHOTO" className="profile-btn" />
              <input
                type="button"
                onClick={_logout}
                value="LOG OUT"
                className="profile-btn"
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="profile-right">
            <div className="profile-right-top">
              <EditIcon className="edit-icon" />
            </div>
            <div className="profile-right-bottom">
              <div className="field-cell">
                <div className="field-name">Name</div>
                <div className="field-colon">:</div>
                <div className="field-value">Himanshu Soni</div>
              </div>
              <div className="field-cell">
                <div className="field-name">Mobile No.</div>
                <div className="field-colon">:</div>
                <div className="field-value">+911234567890</div>
              </div>
              <div className="field-cell">
                <div className="field-name">E-mail</div>
                <div className="field-colon">:</div>
                <div className="field-value">himu@gcet.ac.in</div>
              </div>
              <div className="field-cell">
                <div className="field-name">Gender</div>
                <div className="field-colon">:</div>
                <div className="field-value">Male</div>
              </div>
              <div className="field-cell">
                <div className="field-name">ID</div>
                <div className="field-colon">:</div>
                <div className="field-value">AB537291</div>
              </div>
              <div className="field-cell">
                <div className="field-name">D.O.B.</div>
                <div className="field-colon">:</div>
                <div className="field-value">29-02-1996</div>
              </div>
              <div className="field-cell">
                <div className="field-name">Aadhar No.</div>
                <div className="field-colon">:</div>
                <div className="field-value">1234 567 890</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}
function mapStateToDispatch(dispatch) {
  return {
    logout: () => {
      return dispatch(AuthActions.logout());
    },
  };
}
export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Owner_ProfileScreen);
