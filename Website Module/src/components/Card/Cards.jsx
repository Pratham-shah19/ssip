import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import GradeIcon from "@mui/icons-material/Grade";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/Cart";
import item from "../../models/item";
import * as itemsActions from "../../store/actions/items";
import "./Cards.css";
import { display } from "@mui/system";

const Cards = ({ id, url, name, price, category, rating, available }) => {
  const [isOut, setIsOut] = useState(false);
  const [isOutItem, setIsOutItem] = useState(available);

  const dispatch = useDispatch();
  // console.log(available)
  const handleBuy = () => {
    // console.log('second_url',url);
    if (url) {
      let selectedProduct = {
        id: id,
        url: url,
        name: name,
        price: price,
        // 'category': category,
        // 'rating': rating
      };
      // console.log('button is working',selectedProduct);
      dispatch(cartActions.addTocart(selectedProduct));
    }
  };

  return (
    <div
      className="menu-card-container"
      onMouseOver={() => setIsOut(true)}
      onMouseOut={() => setIsOut(false)}
    >
      <div className="menu-upper">
        <img src={url} alt="pic" className="img_src" />
        <div className={!isOutItem ? "layer showing" : "layer hidden"}>
          Item is out of stock
        </div>
      </div>
      <div className="menu-middle">
        <div className="res-row">
          <div className="res-name">{name}</div>
          <div className="rating-box">
            <div className="ratings">
              <h3>1</h3>
            </div>
            <div className="star">
              <GradeIcon size="6px" />
            </div>
          </div>
        </div>
      </div>

      <div className="menu-lower">
        {!isOutItem ? (
          <div className="buy-box">
            <p className="price" style={{ textDecoration: "line-through" }}>
              ₹{price}
            </p>
            <div
              className="buy-btn"
              style={{
                textDecoration: "line-through",
                marginTop: "-15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Buy
            </div>
            {/* margin-top: -15px; display: flex; align-items: center;
            justify-content: center; */}
          </div>
        ) : (
          <div className="buy-box">
            <p className="price">₹{price}</p>
            <button className="buy-btn" onClick={handleBuy}>
              Buy
            </button>
          </div>
        )}
      </div>
      <div
        className={
          isOut ? "visible dustbin-container" : "not-visible dustbin-container"
        }
      >
        {!isOutItem ? (
          <DeleteIcon
            style={{
              border: "none",
              background: "none",
              paddingTop: "5px",
              display: "none",
            }}
          />
        ) : (
          <DeleteIcon
            style={{ paddingTop: "5px" }}
            onClick={() => {
              dispatch(itemsActions.deleteProduct(id));
              setIsOutItem(!isOutItem);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Cards;
