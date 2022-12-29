import axios from "axios";
export const SET_NEWORDERS = "SET_NEWORDERS";
export const SET_OLDORDERS = "SET_OLDORDERS";
export const SET_ORDERID = "SET_ORDERID";
// export const MAKE_OLDORDER = "MAKE_OLDORDER";

// export const makeoldorder = (oldorderid) => {
//   return async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: MAKE_OLDORDER,
//         oldorderid: oldorderid,
//       });
//     } catch (err) {
//       throw err;
//     }
//   };
// };
export const setNewOrders = (newOrders) => {
  return async (dispatch, getState) => {
    try {
      // console.log('token');
      const token_main = getState().auth.token;
      // const token_main = localStorage.getItem('token');
      console.log("token_blbalalala", token_main);
      const data = await axios.get(
        "http://127.0.0.1:4000/api/v1/canteen/order/current",

        {
          headers: {
            Authorization: `Bearer ${token_main}`,
          },
        }
      );
      // console.log('data_newORder',data);
      // console.log('data',data.data.data[0]);
      dispatch({
        type: SET_NEWORDERS,
        newOrders: data.data.data,
      });
    } catch (err) {
      // console.log('Hello!fukciiccsiai-----------------')
      throw err;
    }
    // return{
    //     type: SET_NEWORDERS,
    //     newOrders: newOrders,
    // }
  };
};
export const setOldOrders = () => {
  return async (dispatch, getState) => {
    try {
      // console.log('token');
      const token_main = getState().auth.token;
      // const token_main = localStorage.getItem('token');
      // console.log('token_blbalalala',token_main);
      const data = await axios.post(
        "http://127.0.0.1:4000/api/v1/canteen/order/history",
        {},
        {
          headers: {
            Authorization: `Bearer ${token_main}`,
          },
        }
      );
      // console.log('data_oldORder',data);
      // console.log('data',data.data.data[0]);
      dispatch({
        type: SET_OLDORDERS,
        oldOrders: data.data.data,
      });
    } catch (err) {
      // console.log('Hello!fukciiccsiaiOld-----------------')
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
