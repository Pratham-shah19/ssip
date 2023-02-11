import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import "./ConfirmOrder.css";
import Header from "../../components/Header_Home/Header";
// import HistoryIcon from "@mui/icons-material/History";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
import Summary from "../../components/Summary/Summary";
import Payment_Mode from "../../components/Payment_Mode/Payment_Mode";
import Payment_inputs from "../../components/Payment_Inputs/Payment_Inputs";
import * as CartAction from "../../store/actions/Cart";
import { useNavigate } from "react-router-dom";
import { API } from "../../constants/API";
import axios from "axios";
import DetailBar_Owner from "../../components/DetailBar_Owner/DetailBar_Owner";
const ConfirmOrder = () => {
  const [lastvalues, setLastValues] = useState();
  const [search, setSearch] = useState("");
  const [searchres, setSearchres] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const token = useSelector((state) => state.auth.token);
  const items = useSelector((state) => state.cart.items);
  const sid = useSelector((state) => state.items.sid);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const lastvaluesfun = () => {
      const _lastvalues = [];
      for (const key in items) {
        _lastvalues.push({
          dishId: items[key].id,
          qty: items[key].quantity,
        });
      }
      setLastValues(_lastvalues);
    };
    lastvaluesfun();
  }, [setLastValues | useSelector]);

  const handlepay = async () => {
    const obj = {
      items: lastvalues,
      price: cartTotalAmount,
      status: "NEW",
    };
    //le.log("obj_last", obj);
    const data = await Axios.post(
      `${API.canteen_server}/api/v1/canteen/addorder`,
      obj,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    //le.log("data.res", data.data.res);
    if (data.data.res === "Success") {
      const obj = {};
      const toatl = 0;
      dispatch(CartAction.setlastvalue(obj, toatl));
      // window.location.reload();
      navigate("/owner-dashboard/");
    }
  };

  const btn1_handle = () => {
    //le.log("kirtan");
    return <p>Hello</p>;
  };
  const btn2_handle = () => {
    navigate("/owner-dashboard/profileScreen");
  };
  async function handleChange(e) {
    console.log("e.target.value", e.target.value);
    setSearch(e.target.value);
    const data = await axios.get(
      `${API.canteen_server}/api/v1/canteen/subscriptionSearch?search=${e.target.value}`
    );
    console.log("data", data);
    setSearchres(data.data.data);
  }

  return (
    <div className="owner-dashboard-container">
      <div className="owner-inner-container">
        <div className="owner-left">
          <Sidebar />
        </div>

        <div className="sum_owner-right">
          <div className="header_handle">
            <Header
              title="Payment"
              btn2={btn2_handle}
              btn2title={<AccountCircleIcon sx={{ fontSize: 40 }} />}
            />
          </div>

          <div className="hr_line">
            <hr />
          </div>
          <div className="payment_inner">
            <div className="sum_owner-right-left">
              <div className="summary_order">
                <Summary />
                <div className="bill-buttons">
                  <button>CANCLE</button>
                  <button type="button" onClick={handlepay}>
                    PAY NOW
                  </button>
                </div>
              </div>
            </div>
            <hr className="ruler" />
            <div className="sum_owner-right_right">
              {/*Component for Search*/}
              <h1 className="sub-head">Subscription Purchases</h1>
              <div className="admin-search">
                <div className="admin-search-inner-ow">
                  <input
                    className="inp-qt"
                    type="text"
                    name="search"
                    onChange={handleChange}
                    id="search"
                    value={search}
                    placeholder="Search any customer"
                  />
                  <PersonSearchIcon
                    style={{ transform: "scale(1.5)", cursor: "pointer" }}
                  />
                </div>
                <div className="admin-search-results">
                  {searchres.length <= 0 ? (
                    <h1>Search Employee</h1>
                  ) : (
                    <div>
                      <div className="one-result3">
                        <p className="result-id">S_ID</p>
                        <p className="result-name">USERNAME</p>
                        <p className="avail">AVAILABLE</p>
                        <p className="avail">NEW</p>
                      </div>
                      {searchres.map((item) => {
                        return <DetailBar_Owner data={item} />;
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
