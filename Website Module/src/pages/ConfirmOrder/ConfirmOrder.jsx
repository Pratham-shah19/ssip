import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import "./ConfirmOrder.css";
import Header from "../../components/Header_Home/Header";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Axios from "axios";

import Summary from "../../components/Summary/Summary";
import Payment_Mode from "../../components/Payment_Mode/Payment_Mode";
import Payment_inputs from "../../components/Payment_Inputs/Payment_Inputs";
import * as CartAction from "../../store/actions/Cart";
import { useNavigate } from "react-router-dom";
import { API } from "../../constants/API";
const ConfirmOrder = () => {
  const [lastvalues, setLastValues] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const token = useSelector((state) => state.auth.token);
  const items = useSelector((state) => state.cart.items);
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
    //le.log("items_last", items);
  };

  const btn1_handle = () => {
    //le.log("kirtan");
    return <p>Hello</p>;
  };

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
              btn1={btn1_handle}
              btn1title={<HistoryIcon sx={{ fontSize: 40 }} />}
              btn2="btn2_handle"
              btn2title={<AccountCircleIcon sx={{ fontSize: 40 }} />}
            />
          </div>

          <div className="hr_line">
            <hr />
          </div>
          <div className="payment_inner">
            <div className="sum_owner-right-left">
              <div className="payment_inputs">
                <Payment_inputs />
              </div>
              <div className="payment_mode">
                <p className="Input_Text">Select Payment Method</p>
                <Payment_Mode />
              </div>
              <div className="bill-buttons">
                <button>CANCLE!!!!!!!!!1</button>
                <button type="button" onClick={handlepay}>
                  PAY NOW
                </button>
              </div>
            </div>
            <div className="sum_owner-right_right">
              <div className="summary_order">
                <Summary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
