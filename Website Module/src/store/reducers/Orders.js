import {
  SET_NEWORDERS,
  SET_OLDORDERS,
  SET_ORDERID,
  MAKE_OLDORDER,
  SET_COUNT,
} from "../actions/Orders";

const initialState = {
  newOrders: [],
  oldOrders: [],
  orderid: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWORDERS:
      return {
        ...state,
        newOrders: action.newOrders, //we get updated/latets items form db
      };
    case SET_OLDORDERS:
      return {
        ...state,
        oldOrders: action.oldOrders, //we get updated/latets items form db
      };
    case SET_ORDERID:
      return {
        ...state,
        orderId: action.orderId,
      };
    default:
      return state;
  }
  return state;
};
