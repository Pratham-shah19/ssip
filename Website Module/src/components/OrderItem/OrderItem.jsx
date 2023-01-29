import React from "react";
import { useSelector, useDispatch } from "react-redux";

const OrderItem = ({ dishname, qty }) => {
  const orderId = useSelector((state) => state.Orders.orderId);
  // console.log('orderId',orderId);
  return (
    <div className="data">
      <div className="Name">
        <p className="data_text">{dishname}</p>
      </div>
      <div className="Qty">
        <p className="data_text">{qty}</p>
      </div>
    </div>
  );
};

export default OrderItem;
