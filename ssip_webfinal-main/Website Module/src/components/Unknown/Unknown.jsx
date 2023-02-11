import React from "react";
import "./Unknown.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as itemsActions from "../../store/actions/items";
import "reactjs-popup/dist/index.css";
import { API } from "../../constants/API";
const Unknown = ({ id, name, url, quantity }) => {
  const [qty, setqty] = React.useState(0);
  const [updatedqty, setupdatedqty] = React.useState(quantity);
  const [Error, setError] = React.useState("");
  const token_main = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  function handleQtyEror() {
    dispatch(itemsActions.setqtyError(Error));
  }
  const handlechange = async () => {
    const out = {
      quantity: parseInt(qty),
    };
    if (parseInt(qty) + updatedqty < 15) {
      setError("Total quantity should be greater than 15");
      handleQtyEror();
    } else {
      await axios
        .post(
          `${API.canteen_server}/api/v1/canteen/modifyquantity/${id}`,
          out,
          {
            withCredentials: false,
            headers: {
              Authorization: `Bearer ${token_main}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          }
        )
        .then((response) => {
          alert("Item Quantity updated");
          dispatch(itemsActions.setDummyHot());
          setupdatedqty(parseInt(qty) + updatedqty);
          setqty(0);
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  return (
    <div className="menu_card_container">
      <div className="menu_items">
        <div className="menu_item">
          <div className="left">
            <img src={url} className="menu_card_img" alt="" />
          </div>
          <div className="right">
            <div className="info">
              <h3>{name}</h3>
              <p className="avail">Available: {updatedqty}</p>
              <div className="new">
                New:{" "}
                <input
                  type="number"
                  value={qty}
                  name="qty"
                  id="qty"
                  onChange={(e) => setqty(e.target.value)}
                  placeholder="Enter the quantity"
                  min={0}
                />
              </div>
            </div>
            <button onClick={handlechange} className="menu_card_btn">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unknown;
