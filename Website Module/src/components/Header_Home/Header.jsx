import React from "react";
import "./Header.css";

const Header = ({ title, btn1, btn1title, btn2, btn2title }) => {
  return (
    <div className="head_container">
      <div className="head_left">
        <p className="text_Header">{title}</p>
      </div>
      <div className="head_right">
        {btn1 && (
          <div className="btn1_css">
            <button type="button" className="btn1" onClick={btn1}>
              {btn1title}
            </button>
          </div>
        )}

        <button type="button" className="btn2" onClick={btn2}>
          {btn2title}
        </button>
      </div>
    </div>
  );
};

export default Header;
