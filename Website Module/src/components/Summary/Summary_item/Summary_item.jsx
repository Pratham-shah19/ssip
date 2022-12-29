import React, { useState, useEffect } from "react";
import "./Summary_item.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { queryByTestId } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";

import * as cartActions from "../../../store/actions/Cart";
import Summary_Cart_Items from "./Summary_Cart_items/Summary_Cart_Items";

const Cartitem = ({ id, title, amount, quantity, url, onRemove }) => {
  // console.log('url',url);
  return (
    <div className="sum_contianer">
      <Summary_Cart_Items
        id={id}
        url={url}
        title={title}
        amount={amount}
        quantity={quantity}
      />
    </div>
  );
};

export default Cartitem;
