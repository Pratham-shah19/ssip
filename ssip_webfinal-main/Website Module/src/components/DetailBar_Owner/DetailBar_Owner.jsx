import React from "react";
import "./DetailBar_Owner.css";
import axios from "axios";
import { API } from "../../constants/API";
import { useDispatch, useSelector } from "react-redux";
import * as ItemsActions from "../../store/actions/items";
const DetailBar_Owner = ({ data }) => {
  let [qty, setqty] = React.useState(0);
  // console.log("DetailBar", data);
  const dispatch = useDispatch();
  const handleclick = async () => {
    const res = await axios.post(
      `${API.canteen_server}/api/v1/canteen/decrementSubsQuantity/${data._id}`,

      { headers: {} }
    );
    dispatch(ItemsActions.setsid(data._id));
    window.location.reload();
    console.log("DetailBar", res);
  };
  return (
    <div className="one-result2">
      <p className="result-id">{data.subscription_id}</p>
      <p className="result-name">{data.username}</p>
      <p className="avail">Available: {data.quantity}</p>
      <div className="new">
        New:
        <input
          type="number"
          value={qty}
          className="in-qty"
          name="qty"
          id="qty"
          onChange={(e) => setqty(e.target.value)}
          placeholder="Enter the quantity"
          min={0}
        />
      </div>
      <button onClick={handleclick} className="dtbar">
        Done
      </button>
    </div>
  );
};

export default DetailBar_Owner;
