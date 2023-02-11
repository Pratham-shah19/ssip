import { combineReducers } from 'redux';



import CartReducer from './Cart'
import ItemsReducer from './items';
import CustomerReducer from './Customers'
import AuthReducer from './auth';
import OrderReducer from './Orders';
import WalletReducer from './wallet';

const appReducer = combineReducers({
    cart: CartReducer,
    items: ItemsReducer,
    customer:CustomerReducer,
    auth: AuthReducer,
    Orders : OrderReducer,
    wallet: WalletReducer
})