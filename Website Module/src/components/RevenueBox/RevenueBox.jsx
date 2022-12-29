import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";

const RevenueBox = () => {
  const percentage = 75;
  return (
    <div>
      <p className="revenue-title box-title">Total Revenue</p>
      <div style={{ width: 120, height: 120, margin: "auto" }}>
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
      </div>
      <p className="center para">Total sales made today</p>
      <p className="center amount">₹2561</p>
      <p className="center desc">
        Previous transaction processing. Last Payment may not be included.
      </p>
      <div className="revenue-box-bottom">
        <div className="revenue-data">
          <p>Target</p>
          <div className="values red">
            <KeyboardArrowDownSharpIcon />
            <p>₹310</p>
          </div>
        </div>
        <div className="revenue-data">
          <p>Last Week</p>
          <div className="values green">
            <KeyboardArrowUpSharpIcon />
            <p>₹620</p>
          </div>
        </div>
        <div className="revenue-data">
          <p>Last Month</p>
          <div className="values green">
            <KeyboardArrowUpSharpIcon />
            <p>₹560</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueBox;
