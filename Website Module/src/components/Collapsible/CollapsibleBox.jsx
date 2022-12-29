import React, { useState } from "react";
import "./CollapsibleBox.css";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import Collapsible from "react-collapsible";
import OrderItem from "../OrderItem/OrderItem";
import * as OrderAction from "../../store/actions/Orders";
import { useSelector, useDispatch, connect } from "react-redux";
import axios from "axios";
import ReactDOM from "react-dom";

import * as WalletActions from "../../store/actions/wallet";
const CollapsibleBox = ({
  orderId,
  otp,
  cust_name,
  item_arr,
  _button,
  token_main,
  setOrderID,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => {
    setOpen(!open);
  };

  const labels = () => {
    return (
      <div className="labels">
        <div className="order_main">
          <p className="orders">Order</p>
        </div>
        <div className="qty_main">
          <p className="qty">Quantity</p>
        </div>
      </div>
    );
  };
  const completedHandler = async () => {
    const completedButton_action = await axios.post(
      `http://127.0.0.1:4000/api/v1/canteen/guestcompletedbutton/${orderId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token_main}` },
      }
    );
    function completedButton() {
      completedButton_action;
      console.log("completed");
      setOrderID(orderId);
    }
    const conditional_render = () => {
      if (cust_name !== "Guest") {
        return (
          <div className="competed">
            <div
              type="button"
              className="completed1"
              onClick={completedHandler}
            >
              <p className="completed_text">OTP: {otp}</p>
            </div>
          </div>
        );
      } else {
        <div className="competed">
          <button
            type="button"
            className="completed1"
            onClick={completedButton()}
          >
            <p className="completed_text">Completed</p>
          </button>
        </div>;
      }
    };

    return <div className="btns">{conditional_render()}</div>;
  };

  const dropped = () => {
    return (
      <div className="dropped">
        {labels()}
        {item_arr &&
          item_arr.map((item) => {
            return <OrderItem dishname={item.dishName} qty={item.qty} />;
          })}

        {_button != true ? (
          <div className="competed">
            <div type="button" className="completed1">
              <p className="completed_text">OTP: {otp}</p>
            </div>
          </div>
        ) : (
          <div className="competed">
            <button
              type="button"
              className="completed1"
              onClick={completedHandler}
            >
              <p className="completed_text">Completed</p>
            </button>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="collapse">
      <Collapsible
        trigger={
          <div className="box">
            <div className="box-left">
              <p className="box-title">OrderId: {orderId}</p>
              <p className="box-value">Customer Name: {cust_name}</p>
            </div>
            <div className="btn">
              <button className="toggle" onClick={toggle}>
                {<ArrowDropDownCircleIcon sx={{ fontSize: 40 }} />}{" "}
              </button>
            </div>
          </div>
        }
      >
        {dropped()}
      </Collapsible>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    token_main: state.auth.token,
  };
}
function mapStateToDispatch(dispatch) {
  return {
    setOrderID: (orderId) => {
      return dispatch(OrderAction.setOrderId(orderId));
    },
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(CollapsibleBox);
