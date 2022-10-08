import React from 'react';
import "./Header_Menu.css";
import { Link } from "react-router-dom";

const Header_Menu =({title,btn1title,btn2,btn2title}) => {
    return(
        <div className="head_container">
            <div className="head_left">
                <p className='text_Header'>{title}</p>
            </div>
            <div className="head_right">
            <Link to="/owner-dashboard/add-qty">
                <div className="btn1_css">
                    <button type="button" className="btn1">{btn1title}</button>
                </div>
                </Link>
                <Link to="/owner-dashboard/menu/add-item">
                        <button type="button" className="btn2" onClick={btn2}>{btn2title}</button>
                    </Link>
                
            </div>  
        </div>
    );
}   

export default Header_Menu;