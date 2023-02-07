import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import QuantityBars from "../../components/QuantityBars/QuantityBars";
import "./AddQuantity.css";
import * as ItemsActions from "../../store/actions/items";
import { useSelector, useDispatch, connect } from "react-redux";
import axios from "axios";
import * as itemsActions from "../../store/actions/items";
import Unknown from "../../components/Unknown/Unknown";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";
const AddQuantity = ({
  token,
  Items,
  setAllProducts,
  qtyError,
  setqtyError,
}) => {
  console.log("Add Quantity", Items.data.data);
  // Items = Items.data.data;
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [onRefreshing, setOnRefreshing] = React.useState(false);
  const [error, setError] = React.useState(false);
  let [loading, setloading] = useState(true);
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  function handlePopup() {
    alert("error" + qtyError);
  }
  useEffect(() => {
    // console.log("Items", Items);
    if (qtyError) {
      setqtyError("");
      handlePopup();
    } else {
      // const interval = setInterval(() => {

      //   setTime(Date.now());
      // }, 5000);
      // return () => {
      //   clearInterval(interval);
      // };
      setAllProducts();
      setloading(false);
    }
  }, []);

  return (
    <>
      {loading === false ? (
        <div className="owner-or-dashboard-container">
          <div className="owner-or-inner-container">
            <div className="owner-or-left">
              <Sidebar />
            </div>
            <div className="owner-or-right">
              <div className="quantity-top">
                <h3 className="quantity-title">Item Quantity</h3>
              </div>
              <div className="quantity-bars">
                {Items ? (
                  Items.data.data.map((item) => {
                    return (
                      <Unknown
                        id={item._id}
                        url={item.imageUrl}
                        name={item.name}
                        quantity={item.quantity}
                      />
                    );
                  })
                ) : (
                  <h1>No Item</h1>
                )}
                {qtyError && handlePopup()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    Items: state.items.AllItems,
    qtyError: state.items.qtyError,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setAllProducts: () => {
      return dispatch(itemsActions.setAllProducts());
    },
    setqtyError: (msg) => {
      return dispatch(itemsActions.setqtyError(msg));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddQuantity);
