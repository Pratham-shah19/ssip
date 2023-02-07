import React from "react";
import "./QuantityBars.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as itemsActions from "../../store/actions/items";
import { API } from "../../constants/API";
const DetailBar = ({ id, url, name, quantity }) => {
  const [qty, setqty] = React.useState(0);
  const token_main = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const handlechange = async () => {
    const out = {
      quantity: parseInt(qty),
    };
    const data = await axios.post(
      `${API.canteen_server}/api/v1/canteen/modifyquantity/${id}`,
      out,
      {
        headers: {
          Authorization: `Bearer ${token_main}`,
        },
      }
    );
    if (data.data.res) {
      dispatch(itemsActions.setDummyHot());
      window.location.reload();
    }
  };
  return (
    <div className="qty-result">
      <img src={url} alt="pic" className="qty-img" />
      <p className="qty-name">{name}</p>
      <p className="qty-qty">{quantity}</p>
      <input
        type="number"
        value={qty}
        name="qty"
        id="qty"
        onChange={(e) => setqty(e.target.value)}
        placeholder="Enter the quantity"
        min={0}
      />
      <button type="button" onClick={handlechange} className="qty-btn">
        ADD
      </button>
    </div>
  );
};

export default DetailBar;
