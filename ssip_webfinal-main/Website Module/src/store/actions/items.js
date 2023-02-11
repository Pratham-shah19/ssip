// import item from '../../models/item';

import axios from "axios";
import { API } from "../../constants/API";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
// const token = localStorage.getItem('token');
export const SET_ICECREAM = "SET_ICECREAM";
export const SET_MAINCOURSE = "SET_MAINCOURSE";
export const SET_STARTERS = "SET_STARTERS";

export const SET_ALLPRODUCT = "SET_ALLPRODUCT";

export const SET_QTYERROR = "SET_QTYERROR";
export const SET_SID = "SET_SID";
export const SET_ID = "SET_ID";

export const setId = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_ID,
        id: id,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const setsid = (sid) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_SID,
        sid: sid,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const setqtyError = (msg) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_QTYERROR,
        qtymsg: msg,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const deleteProduct = (del_itemid) => {
  return async (dispatch, getState) => {
    try {
      const token_main = getState().auth.token;
      await axios.get(
        `${API.canteen_server}/api/v1/canteen/deletebtn/${del_itemid}`,
        {
          headers: {
            Authorization: `Bearer ${token_main}`,
          },
        }
      );
      dispatch({
        type: DELETE_PRODUCT,
        del_itemid: del_itemid,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const setAllProducts = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const data = await axios.get(
        `${API.canteen_server}/api/v1/canteen/dish`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: SET_ALLPRODUCT,
        AllItems: data,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const setDummyHot = () => {
  return async (dispatch, getState) => {
    try {
      const token_main = getState().auth.token;
      const data = await axios.post(
        `${API.canteen_server}/api/v1/canteen/dishes/category`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token_main}`,
          },
        }
      );
      console.log("entered");
      if (data.status === 200) {
        const transformedIcecreams = [];
        const transformedMainCourse = [];
        const transformedStarters = [];
        console.log("200", data.data.data);
        for (const key in data.data.data?.["Beverages/Dessert"]) {
          transformedIcecreams.push({
            id: data?.data?.data?.["Beverages/Dessert"][key]?._id,
            price: data?.data?.data?.["Beverages/Dessert"][key]?.price,
            name: data.data.data?.["Beverages/Dessert"][key]?.name,
            url: data.data.data?.["Beverages/Dessert"][key]?.imageUrl,
            isAvailable:
              data.data.data?.["Beverages/Dessert"][key]?.isAvailable,
          });
        }
        for (const key in data.data.data?.["Breakfast/Snacks"]) {
          transformedStarters.push({
            id: data.data.data?.["Breakfast/Snacks"][key]?._id,
            price: data.data.data?.["Breakfast/Snacks"][key]?.price,
            name: data.data.data?.["Breakfast/Snacks"][key]?.name,
            url: data.data.data?.["Breakfast/Snacks"][key]?.imageUrl,
            isAvailable: data.data.data?.["Breakfast/Snacks"][key]?.isAvailable,
          });
        }
        for (const key in data.data.data?.["MainCourse"]) {
          transformedMainCourse.push({
            id: data?.data?.data?.["MainCourse"][key]?._id,
            price: data?.data?.data?.["MainCourse"][key]?.price,
            name: data.data.data?.["MainCourse"][key]?.name,
            url: data.data.data?.["MainCourse"][key]?.imageUrl,
            isAvailable: data.data.data?.["MainCourse"][key]?.isAvailable,
          });
        }
        dispatch({
          type: SET_STARTERS,
          products: transformedStarters,
        });
        dispatch({
          type: SET_MAINCOURSE,
          products: transformedMainCourse,
        });
        dispatch({
          type: SET_ICECREAM,
          products: transformedIcecreams,
        });
      }
    } catch (err) {
      throw err;
    }
  };
};
