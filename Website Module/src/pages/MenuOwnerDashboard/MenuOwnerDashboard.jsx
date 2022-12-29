import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Menu from "../../components/Menu/Menu";
import Header_Menu from "../../components/Header_Menu/Header_Menu";
import Rightbar from "../../components/RightBar/Rightbar";
import "./MenuOwnerDashboard.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";

const MenuOwnerDashboard = ({ token }) => {
  let [changed, setChanged] = React.useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    setChanged(false);
  }, []);
  const additems = () => {
    return <div>a</div>;
  };

  return (
    <div className="owner-or-dashboard-container">
      <div className="owner-or-inner-container">
        <div className="owner-or-left">
          <Sidebar />
        </div>
        <div className="owner-or-right">
          <div className="header-or">
            <Header_Menu
              title="Make Orders"
              btn1title="Add Qty"
              btn2={additems()}
              btn2title="Add Items"
            />
          </div>
          <div className="combine">
            <div className="owner-or-right-left">
              <Menu changed={changed} />
            </div>
            <div className="owner-or-right-right">
              <Rightbar />
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
  return {};
}
export default connect(mapStateToProps, mapStateToDispatch)(MenuOwnerDashboard);
