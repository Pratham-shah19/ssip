export const SET_TOKEN = "SET_TOKEN";
export const SET_TOKEN_ADMIN = "SET_TOKEN_ADMIN";
export const RESET_TOKEN = "RESET_TOKEN";
export const SET_LOADED = "SET_LOADED";
export const SET_HIST_LOADED = "SET_HIST_LOADED";
export const setHistloaded = (Histflag) => {
  return {
    type: SET_HIST_LOADED,
    Histflag: Histflag,
  };
};
export const setloaded = (flag) => {
  return {
    type: SET_LOADED,
    flag: flag,
  };
};
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
