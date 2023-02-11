import { ADD_TO_CART,REMOVE_FROM_CART,CONFIRM_CART,DECREMENT_QTY, SET_LASTVALUES,SET_RESET} from '../actions/Cart';
import CartItem from '../../models/CartItem'

const initialState = {
    items: {},
    totalAmount:0,
    // cartId: 0
}




export default (state = initialState,action)=>{
    switch(action.type){
        case ADD_TO_CART: 
            console.log('action.product',action.product);
            const addedProduct = action.product;
            const prodPrice = addedProduct.price
            const produrl = addedProduct.url
            const prodTitle = addedProduct.name
            const prodId = addedProduct.id
    
            
            let obj={};
            console.log('two.five',state.items);
            var updatedOrNewCartItem;
            if (state.items[addedProduct.id]) {
				// updatedOrNewCartItem = new CartItem(
                //     prodId,
				// 	state.items[addedProduct.id].quantity + 1,
				// 	prodPrice,
				// 	prodTitle,
				// 	state.items[addedProduct.id].sum + prodPrice,
                //     produrl,
				// );
                
                obj={
                    productPrice: prodPrice,
                    productTitle: prodTitle,
                    quantity: state.items[addedProduct.id].quantity + 1,
                    id: prodId,
                    url: produrl,
                    sum: state.items[addedProduct.id].sum + prodPrice
                }
                updatedOrNewCartItem = obj;
			} else {
                obj= {
                    productPrice: prodPrice,
                    productTitle: prodTitle,
                    // quantity: state.items[addedProduct.id].quantity,
                    quantity: 1,
                    id: prodId,
                    url: produrl,
                    sum: prodPrice
                }
				updatedOrNewCartItem = obj;
            }
            console.log('third',updatedOrNewCartItem);
            return {
				...state, // actually redundant
				items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
				totalAmount: state.totalAmount + prodPrice
			};

        case DECREMENT_QTY:
            const transformedCartItems = [];
            for (const key in state.items) {
                //console.log('key', state.items)
                transformedCartItems.push({
                    productId: state.items[key].id,
                    productTitle: state.items[key].productTitle,
                    productPrice: state.items[key].productPrice,
                    quantity: state.items[key].quantity,
                    sum: state.items[key].sum,
                    url: state.items[key].url
                });
            }
            // let lastvalues= [];
            // for (const key in state.items) {
            //     //console.log('key', state.items)
            //     lastvalues.push({
            //         productId: state.items[key].id,
            //         quantity: state.items[key].quantity,
            //     });
            // }
            // console.log('transformed',transformedCartItems,action.productId);

            let selectedCartItem_dec = transformedCartItems.find(o => o.productId === action.productId);              
            //console.log('selectedCartItem_dec',selectedCartItem_dec);
            const currentQty_dec = selectedCartItem_dec.quantity;
            let updatedCartItems_dec;
            if (currentQty_dec > 1) {
                // const updatedCartItem_dec = new CartItem(
                //     action.productId,
                //     selectedCartItem_dec.quantity - 1,
                //     // selectedCartItem_dec.url,
                //     selectedCartItem_dec.productPrice,
                //     selectedCartItem_dec.productTitle,
                //     selectedCartItem_dec.sum - selectedCartItem_dec.productPrice
                // );
                let obj;
                obj={
                    productPrice: selectedCartItem_dec.productPrice,
                    productTitle: selectedCartItem_dec.productTitle,
                    quantity: selectedCartItem_dec.quantity - 1,
                    id: action.productId,
                    url: selectedCartItem_dec.url,
                    sum: selectedCartItem_dec.sum - selectedCartItem_dec.productPrice
                }
                updatedCartItems_dec = obj;
                updatedCartItems_dec = { ...state.items, [action.productId]: updatedCartItems_dec };
            } else {
                updatedCartItems_dec = { ...state.items };
                delete updatedCartItems_dec[action.productId];
            }
            return {
                ...state,
                items: updatedCartItems_dec,
                totalAmount: state.totalAmount - selectedCartItem_dec.productPrice
            };

        case REMOVE_FROM_CART:
            const transformedCartItems_remove = [];
            for (const key in state.items) {
                //console.log('key', state.items)
                transformedCartItems_remove.push({
                    productId: state.items[key].id,
                    productTitle: state.items[key].productTitle,
                    productPrice: state.items[key].productPrice,
                    quantity: state.items[key].quantity,
                    sum: state.items[key].sum,
                    url: state.items[key].url
                });
            }

            let selectedCartItem = transformedCartItems_remove.find(o => o.productId === action.productId);              
            let updatedCartItems;
            
            updatedCartItems = { ...state.items };
            delete updatedCartItems[action.productId];
            
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice*selectedCartItem.quantity
            };
        
        case SET_RESET: 
            return{
                items : initialState.items,
                totalAmount: initialState.totalAmount
            }
        
        // case SET_LASTVALUES:
        //     const _lastvalues = [];
        //     for (const key in state.items) {
        //         //console.log('key', state.items)
        //         _lastvalues.push({
        //             productId: state.items[key].id,
        //             quantity: state.items[key].quantity,
        //         });
        //     }
        //     return{
        //         ...state,
        //         lastvalues: _lastvalues
        //     }


        default:
            return state;
        }

}