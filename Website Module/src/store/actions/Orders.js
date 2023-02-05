import { API } from "../../constants/API";
import axios from "axios";
export const SET_NEWORDERS = "SET_NEWORDERS";
export const SET_OLDORDERS = "SET_OLDORDERS";
export const SET_ORDERID = "SET_ORDERID";
export const setNewOrders = (newOrders) => {
  return async (dispatch, getState) => {
    try {
      const token_main = getState().auth.token;
      console.log("token_blbalalala", token_main);
      const data = await axios.get(
        `${API.canteen_server}/api/v1/canteen/order/current`,
        {
          headers: {
            Authorization: `Bearer ${token_main}`,
          },
        }
      );
      dispatch({
        type: SET_NEWORDERS,
        newOrders: data.data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const setOldOrders = () => {
  return async (dispatch, getState) => {
    try {
      const token_main = getState().auth.token;
      const data = await axios.post(
        `${API.canteen_server}/api/v1/canteen/order/history`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token_main}`,
          },
        }
      );
      dispatch({
        type: SET_OLDORDERS,
        oldOrders: data.data.data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const setOrderId = (orderId) => {
  // console.log("Ordersdispatch(OrderAction.makeoldorder());.js", orderId);
  return {
    type: SET_ORDERID,
    orderId: orderId,
  };
};
