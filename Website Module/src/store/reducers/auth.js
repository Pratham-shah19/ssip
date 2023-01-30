import {
  SET_TOKEN,
  SET_LOADED,
  SET_TOKEN_ADMIN,
  RESET_TOKEN,
  SET_HIST_LOADED,
} from "../actions/auth";

const initialState = {
  token: "",
  token_admin: "",
  flag: false,
  Histflag: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token, //we get updated/latets items form db
      };
    case SET_TOKEN_ADMIN:
      return {
        ...state,
        token_admin: action.token, //we get updated/latets items form db
      };
    case RESET_TOKEN:
      return {
        ...state,
        token_admin: action.token,
        token: action.token,
        flag: false,
        Histflag: false,
      };
    case SET_LOADED:
      return { ...state, flag: action.flag };
    case SET_HIST_LOADED:
      return { ...state, Histflag: action.Histflag };
    default:
      return state;
  }
};
