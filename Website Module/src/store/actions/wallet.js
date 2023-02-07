<<<<<<< HEAD
import { API } from "../../constants/API";
=======
>>>>>>> upstream/main
import axios from "axios";
export const SET_WALLET_PRICE = "SET_WALLET_PRICE";
export const SET_ORDER_HISTORY = "SET_ORDER_HISTORY";
export const SET_TOTALCUSTOMER = "SET_TOTALCUSTOMER";
export const setTotalCustomers = () => {
  return async (dispatch, getState) => {
    try {
      const token_main = getState().auth.token_admin;
      console.log("upper", token_main);
      const data = await axios.get(
        `${API.admin_server}/api/v1/admin/totalcustomers`,
        {
          withCredentials: false,
          headers: {
            Authorization: `Bearer ${token_main}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      );

      console.log("wallet_data", data);
      dispatch({
        type: SET_TOTALCUSTOMER,
        totalCustomers: data,
      });
    } catch (err) {
      throw err;
    }
  };
};

<<<<<<< HEAD
export const setWalletPrice = () => {
  return async (dispatch, getState) => {
    try {
      const token_main = getState().auth.token_admin;
      await fetch(`${API.admin_server}/api/v1/admin/Sachivalaya/details`, {
=======
      await fetch("http://127.0.0.1:5000/api/v1/admin/Sachivalaya/details", {
>>>>>>> upstream/main
        method: "GET",
        headers: {
          Authorization: `Bearer ${token_main}`,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          var jsonData = responseJson;
          var data = jsonData.data;
          // console.log("data", data[0].wallet);
          dispatch({
            type: SET_WALLET_PRICE,
            wallet: data[0].wallet,
          });
        });
    } catch (err) {
      throw err;
    }
  };
};

export const setOrderHistory = () => {
  return async (dispatch, getState) => {
    try {
<<<<<<< HEAD
      const token_main = getState().auth.token_admin;

      console.log("token_main lower", token_main);
      const data = await axios.get(
        `${API.admin_server}/api/v1/admin/orders`,
        { status: "COMPLETED" },
=======
      const token_main = getState().auth.token;
      //   //   console.log("token_main", token_main);
      //   await fetch("http://127.0.0.1:4000/api/v1/admin/orders", {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${token_main}`,
      //     },
      //     body: { status: "COMPLETED" },
      //   })
      //     .then((response) => response.json())
      //     .then((responseJson) => {
      //       var jsonData = responseJson;
      //       var data = jsonData.data;
      //       console.log("_________data", jsonData);
      //       //         // dispatch({
      //       //         //     type: SET_WALLET_PRICE,
      //       //         //     wallet: data[0].wallet
      //       //         // })
      //     });
      //console.log('data_newORder',data);
      //console.log('data',data.data.data[0]);
      // dispatch({
      //     type: SET_ORDER_HISTORY,
      //     orderHistory: data.data.data
      // });
      //   console.log("called_fetchhistoy");
      // console.log("token_main succeed");
      const data = await axios.get(
        "http://127.0.0.1:4000/api/v1/canteen/order/history",

>>>>>>> upstream/main
        {
          headers: {
            Authorization: `Bearer ${token_main}`,
          },
        }
      );
<<<<<<< HEAD

      console.log("data_newORder", data);
      console.log("data", data.data.data[0]);
=======
      // console.log("data_history", data.data.data);
>>>>>>> upstream/main
      dispatch({
        type: SET_ORDER_HISTORY,
        orderHistory: data.data.data,
      });
<<<<<<< HEAD
=======
      //   const orders = data.data.data;
      //   //   setOrders(orders);
      //   conose.log("orderswallers", orders);
>>>>>>> upstream/main
    } catch (err) {
      // console.log("error", err);
      // console.log("Hello!fukciiccsiai-----------------");
      throw err;
    }
  };
};
