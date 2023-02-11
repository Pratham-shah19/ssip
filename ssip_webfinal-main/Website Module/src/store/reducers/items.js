import {
  SET_ICECREAM,
  SET_MAINCOURSE,
  SET_STARTERS,
  SET_ALLPRODUCT,
  DELETE_PRODUCT,
  SET_QTYERROR,
  SET_SID,
  msg,
  SET_ID,
} from "../actions/items";

const initialState = {
  IceCream: [],
  MainCourse: [],
  Starter: [],
  AllItems: [],
  del_itemid: 0,
  qtyError: "",
  sid: 0,
  id: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ID:
      return {
        ...state,
        id: action.id,
      };
    case SET_SID:
      return {
        ...state,
        sid: action.sid,
      };
    case SET_QTYERROR:
      return {
        ...state,
        qtyError: action.qtymsg,
      };
    case SET_ICECREAM:
      return {
        ...state,
        IceCream: action.products, //we get updated/latets items form db
      };
    case SET_MAINCOURSE:
      return {
        ...state,
        MainCourse: action.products, //we get updated/latets items form db
      };
    case SET_STARTERS:
      // console.log('icre_reducer',action.product)
      return {
        ...state,
        Starter: action.products, //we get updated/latets items form db
      };
    case SET_ALLPRODUCT:
      console.log("all_order", action.AllItems);
      return {
        ...state,
        AllItems: action.AllItems, //we get updated/latets
      };
    case DELETE_PRODUCT:
      console.log("delete_product", action.del_itemid);
      return {
        ...state,
        del_itemid: action.del_itemid,
      };
    default:
      return state;
  }
  return state;
};
