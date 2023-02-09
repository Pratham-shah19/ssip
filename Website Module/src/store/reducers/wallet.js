import {
  SET_WALLET_PRICE,
  SET_TOTALCUSTOMER,
  SET_ORDER_HISTORY,
} from "../actions/wallet";

const initialState = {
  orderHistory: [],
  Wallet: 0,
  totalCustomers: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: action.orderHistory, //we get updated/latets items form db
      };
    case SET_WALLET_PRICE:
      return {
        ...state,
        Wallet: action.wallet,
      };
    case SET_TOTALCUSTOMER:
      return {
        ...state,
        totalCustomers: action.totalCustomers,
      };
    default:
      return state;
  }
};
