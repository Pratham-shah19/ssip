import React from 'react';  
import './Summary_Cart_Items.css';

const Summary_Cart_Items = ({url,title,quantity,amount}) => {

    return(
        <div className="sum_items_cart">       
            <div className="img_comp">        
                <img src={url} alt="pic" className="sum_img_src"/>
            </div>
            <div className="title_qty_comp">
                <p className='sum_item_title'>
                    {title}
                </p>
                <p className='sum_item_qty'>
                    Quantity: {quantity}
                </p>
            </div>
            <div className="price_comp">
                <p className='sum_item_price'>
                    Price : {amount}
                </p>
            </div>
            
    </div>
    );
}
export default Summary_Cart_Items;