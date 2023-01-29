export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'; 
export const DECREMENT_QTY = 'DECREMENT_QTY';
export const CONFIRM_CART = 'CONFIRM_CART';
export const SET_LASTVALUES = 'SET_LASTVALUES';
export const SET_RESET = 'SET_RESET';

export const setlastvalue = (props) => {
    return{
        type: SET_RESET,
        items: props.items,
        totalAmount: props.totalAmount
    }
}



export const addTocart = (product) => {
    return{
        type: ADD_TO_CART,
        product: product   
    }
}


export const removeFromCart = (productId) => {
    return{
        type: REMOVE_FROM_CART,
        productId: productId
    }
}

export const decFromCart = (productId) => {
    return{
        type: DECREMENT_QTY,
        productId: productId
    }
}

export const confirmCart =(productList) => {
    return{
        type: CONFIRM_CART,
        productList: 'productList',
    }
}