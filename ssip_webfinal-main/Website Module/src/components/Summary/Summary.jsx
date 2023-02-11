import React, { useEffect, useState } from "react";
import Summary_item from "./Summary_item/Summary_item";
import "./Summary.css";
import * as cartActions from "../../store/actions/Cart";
import { useSelector, useDispatch } from "react-redux";

const Summary = () => {
  const [empty, setEmpty] = useState(true);
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  console.log("total amount: " + cartTotalAmount);
  const cartItems = useSelector((state) => {
    // TRANSFORM AN OBJECT INTO AN ARRAY
    const transformedCartItems = [];
    console.log("cart.item:", state.cart.items);
    for (const key in state.cart.items) {
      console.log("key", key);
      // A cart-item with an additional productId prop.
      console.log("fourth", state.cart.items);

      transformedCartItems.push({
        productId: state.cart.items[key].id,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        url: state.cart.items[key].url,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
      // console.log(key);
    }
    // console.log(transformedCartItems);
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const renderCartItems = (cartItems) => {
    console.log("cartitems:", cartItems);
    return (
      <div className="sum_cart_item_main">
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            return (
              <Summary_item
                title={item.productTitle}
                amount={item.productPrice}
                quantity={item.quantity}
                id={item.productId}
                url={item.url}
              />
            );
          })
        ) : (
          <h1 style={{ textAlign: "center" }}>No Items</h1>
        )}
      </div>
    );
  };

  return (
    <div className="sum_cart_handler">
      <div className="summary_title">
        <p className="summary_title_text">Order Summary</p>
      </div>
      <hr />
      <div className="sum_cart_item_main_main">
        {renderCartItems(cartItems)}
      </div>
      <hr />
      {cartItems.length > 0 ? (
        <div className="Sub_total">
          <p className="Sub_total_text">Subtotal : {cartTotalAmount}</p>
          <p className="Sub_total_text_GST">
            GST(18%) : {Math.round(cartTotalAmount * 0.18)}
          </p>
          <hr />
          <p className="Sub_total_text_TOTAL">
            Total : {cartTotalAmount + Math.round(cartTotalAmount * 0.18)}₹
          </p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Summary;
