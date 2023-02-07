import { API } from "../../constants/API";
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

export const setWalletPrice = () => {
  return async (dispatch, getState) => {
    try {
      const token_main = getState().auth.token_admin;
      await fetch(`${API.admin_server}/api/v1/admin/Sachivalaya/details`, {
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
      const token_main = getState().auth.token_admin;

      console.log("token_main lower", token_main);
      const data = await axios.get(
        `${API.admin_server}/api/v1/admin/orders`,
        { status: "COMPLETED" },
        {
          headers: {
            Authorization: `Bearer ${token_main}`,
          },
        }
      );

      console.log("data_newORder", data);
      console.log("data", data.data.data[0]);
      dispatch({
        type: SET_ORDER_HISTORY,
        orderHistory: data.data.data,
      });
    } catch (err) {
      // console.log("error", err);
      // console.log("Hello!fukciiccsiai-----------------");
      throw err;
    }
  };
};
