export const SET_TOKEN = "SET_TOKEN";
export const SET_TOKEN_ADMIN = "SET_TOKEN_ADMIN";
export const RESET_TOKEN = "RESET_TOKEN";
export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token: token,
  };
};

export const setTokenadmin = (token) => {
  return {
    type: SET_TOKEN_ADMIN,
    token: token,
  };
};
export const logout = () => {
  console.log("LOGOUT");
  return {
    type: RESET_TOKEN,
    token: "",
  };
};
