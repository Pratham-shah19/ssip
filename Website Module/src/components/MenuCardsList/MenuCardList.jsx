import React, { useState } from "react";
import Cards from "../Card/Cards";

import "./MenuCardList.css";

const MenuCardList = ({ data }) => {
  // console.log('menucardlist',data);
  return (
    <div className="menu-card-list-container">
      {data.map((item) => {
        return (
          <Cards
            id={item.id}
            name={item.name}
            url={item.url}
            price={item.price}
            rating={item.rating}
            category={item.category}
            available={item.isAvailable}
          />
        );
      })}
    </div>
  );
};

export default MenuCardList;
