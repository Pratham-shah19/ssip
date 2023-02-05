// import item from '../../models/item';
import ColdBeverages from "../../DummyData/ColdBeverages";
import HotBeverages from "../../DummyData/HotBeverages";
import Starters from "../../DummyData/Starters";
import Dessert from "../../DummyData/Dessert";
import axios from "axios";
import { API } from "../../constants/API";
import { useSelector, useDispatch } from "react-redux";

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
      if (data.status === 200) {
        const transformedIcecreams = [];
        const transformedMainCourse = [];
        const transformedStarters = [];
        for (const key in data.data.data.IceCream) {
          transformedIcecreams.push({
            id: data?.data?.data?.IceCream[key]?._id,
            price: data?.data?.data?.IceCream[key]?.price,
            name: data.data.data?.IceCream[key]?.name,
            url: data.data.data?.IceCream[key]?.imageUrl,
            isAvailable: data.data.data?.IceCream[key]?.isAvailable,
          });
        }
        for (const key in data.data.data.Starter) {
          transformedStarters.push({
            id: data?.data?.data?.Starter[key]?._id,
            price: data?.data?.data?.Starter[key]?.price,
            name: data.data.data?.Starter[key]?.name,
            url: data.data.data?.Starter[key]?.imageUrl,
            isAvailable: data.data.data?.Starter[key]?.isAvailable,
          });
        }
        for (const key in data.data.data.MainCourse) {
          transformedMainCourse.push({
            id: data?.data?.data?.MainCourse[key]?._id,
            price: data?.data?.data?.MainCourse[key]?.price,
            name: data.data.data?.MainCourse[key]?.name,
            url: data.data.data?.MainCourse[key]?.imageUrl,
            isAvailable: data.data.data?.MainCourse[key]?.isAvailable,
          });
        }
        console.log("transformer_icecream", transformedIcecreams);
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
