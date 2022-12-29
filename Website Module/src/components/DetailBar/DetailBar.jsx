import React from "react";
import "./DetailBar.css";

const DetailBar = ({ data }) => {
  // console.log("DetailBar", data);
  return (
    <div className="one-result">
      <p className="result-id">{data._id}</p>
      <p className="result-name">{data.name}</p>
      <p className="result-email">{data.email}</p>
      <p className="result-number">{data.wallet}</p>
    </div>
  );
};

export default DetailBar;
