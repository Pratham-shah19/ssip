import Customers from "../../DummyData/Customer";
import { API } from "../../constants/API";
import axios from "axios";
import { useSelector } from "react-redux";
export const SET_CUSTOMERS = "SET_CUSTOMERS";
export const setCustomers = (name) => {
  return async (dispatch, getState) => {
    try {
      // const token_main = useSelector((state) => state.auth.token_admin);
      const token_main = getState().auth.token_admin;
      console.log("token_main", token_main);

      const data = await axios.get(
        `${API.admin_server}/api/v1/admin/customers?name=${name}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token_main}`,
          },
        }
      );

      dispatch({
        type: SET_CUSTOMERS,
        customers: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
