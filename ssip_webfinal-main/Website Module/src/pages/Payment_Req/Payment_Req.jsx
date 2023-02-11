import React, { useEffect, useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Sidebar from "../../components/Sidebar/Sidebar";
// import "./HomeOwnerDashboard.css";
import Header from "../../components/Header_Home/Header";
import CollapsibleBox from "../../components/Collapsible/CollapsibleBox";
import * as OrdersActions from "../../store/actions/Orders";
import * as AuthActions from "../../store/actions/auth";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { API } from "../../constants/API";
const Payment_Req = () => {
  let navigate = useNavigate();
  //   let [loading, setloading] = useState(true);
  //   const navigate = useNavigate();
  const btn1_handle = () => {
    navigate("/owner-history");
  };
  const btn2_handle = () => {
    navigate("/owner-dashboard/profileScreen");
  };

  return (
    <div className="owner-dashboard-container">
      <div className="owner-inner-container">
        <div className="owner-left">
          <Sidebar />
        </div>
        <div className="owner-right">
          <div className="header_handle">
            <Header
              title="Current Orders"
              btn1={btn1_handle}
              btn1title={<HistoryIcon sx={{ fontSize: 40 }} />}
              btn2={btn2_handle}
              btn2title={<AccountCircleIcon sx={{ fontSize: 40 }} />}
            />
          </div>

          <div className="hr_line">
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}
function mapStateToDispatch(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapStateToDispatch)(Payment_Req);
