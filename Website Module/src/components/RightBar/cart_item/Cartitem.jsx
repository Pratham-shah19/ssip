import React, { useState, useEffect } from "react";
import "./Cartitem.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { queryByTestId } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../../store/actions/Cart";
const Cartitem = ({ id, title, amount, quantity, url, onRemove }) => {
  const [qty, setQty] = useState(quantity);
  const [amt, setAmt] = useState(amount);
  const dispatch = useDispatch();

  // useEffect(() => {

  // })

  const handleplus = () => {
    // console.log('id.cart',id)
    // console.log('url_cartitems',url)
    let selectedProduct = {
      id: id,
      url: url,
      name: title,
      price: amount,
      // 'category': category,
      // 'rating': rating
    };
    dispatch(cartActions.addTocart(selectedProduct));
  };

  // useEffect(  //It will be called for Hot Beverages only
  // 	() => {
  // 		setIsLoading(true);
  // 		loadProductsHot().then(() => setIsLoading(false));
  //         console.log('Products   loaded successfully');
  // 	},
  // 	[ dispatch, loadProductsHot ]
  // );

  const handleminus = () => {
    dispatch(cartActions.decFromCart(id));
  };

  const handleremove = () => {
    dispatch(cartActions.removeFromCart(id));
  };

  return (
    <div className="contianer">
      <div className="main_items_cart">
        <p className="main_item_cart">{title}</p>
        <p className="main_item_qty">{quantity}</p>
        <p className="main_item_price">{amount}</p>
      </div>
      <div className="cart_button">
        <div className="buttons">
          <div className="button1" type="button" onClick={handleplus}>
            <div className="plus_minus">+</div>
          </div>
          {/*
           */}
          <div className="button2" type="button" onClick={handleminus}>
            <div className="plus_minus">-</div>
          </div>
        </div>
        <div className="remove_button">
          <div type="button" className="remove" onClick={handleremove}>
            <DeleteIcon sx={{ fontSize: 35 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;
