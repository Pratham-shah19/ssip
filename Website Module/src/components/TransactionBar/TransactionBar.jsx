import React, { useState } from "react";
import "./TransactionBar.css";

const DetailBar = ({ id, price }) => {
  return (
    <div className="one-result">
      <div className="transaction-left">
        <p className="result-id">id: {id}</p>
        {/* <p className="result-name">Transaction No. : </p> */}
      </div>
      <div className="transaction-rightt">
        <p className="result-number">Price: {price}</p>
      </div>
    </div>
  );
};

export default DetailBar;
