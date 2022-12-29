import React, { useEffect, useState } from "react";
import Cartitem from "./cart_item/Cartitem";
import "./Rightbar.css";
import * as cartActions from "../../store/actions/Cart";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Rightbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  // console.log('total amount: ' + cartTotalAmount);
  const cartItems = useSelector((state) => {
    // TRANSFORM AN OBJECT INTO AN ARRAY
    const transformedCartItems = [];
    // console.log('third.five:',state.cart.items);
    for (const key in state.cart.items) {
      // console.log('key',key)
      // A cart-item with an additional productId prop.
      transformedCartItems.push({
        productId: state.cart.items[key].id,
        quantity: state.cart.items[key].quantity,
        productPrice: state.cart.items[key].productPrice,
        productTitle: state.cart.items[key].productTitle,
        url: state.cart.items[key].url,
        sum: state.cart.items[key].sum,
      });
      // console.log(key);
    }
    // console.log(transformedCartItems);

    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const sendOrderHandler = () => {
    navigate("/owner-dashboard/confirmOrder");
  };

  const renderCartItems = (cartItems) => {
    // console.log('cartitems:',cartItems);
    return (
      <div className="cart_item_main">
        {cartItems.map((item) => {
          // console.log('item.id:', item.productId);
          // console.log('item.price:', item.productPrice);
          return (
            <Cartitem
              title={item.productTitle}
              amount={item.productPrice}
              quantity={item.quantity}
              id={item.productId}
              // title="tea"
              // amount="12"
              // quantity="2"
              url={item.url}
              // onRemove={() => dispatch(cartActions[item.productId].removeFromCart(cartItems.item.productId))}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="cart_handler">
      <div className="add_cart_main">
        <button type="button" onClick={sendOrderHandler} className="add_cart">
          Add to Cart
          <p className="rightbar_total">total : {cartTotalAmount}</p>
        </button>
      </div>

      <div className="label_cart">
        <p className="item_lab_cart">Item</p>
        <p className="item_lab_qty">Qty</p>
        <p className="item_lab_price">Price</p>
      </div>
      <div className="cart_item_main_main">{renderCartItems(cartItems)}</div>
    </div>
  );
};

export default Rightbar;
