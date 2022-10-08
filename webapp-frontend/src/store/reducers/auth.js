import { SET_TOKEN,SET_TOKEN_ADMIN } from "../actions/auth";

const initialState ={
    token:'',
    token_admin: ''
}

export default (state= initialState,action) => {
    switch(action.type){
        case SET_TOKEN:
            return{
                ...state,
                token: action.token   //we get updated/latets items form db
            }
        case SET_TOKEN_ADMIN:
            return{
                ...state,
                token_admin: action.token   //we get updated/latets items form db
            }
        default:
            return state;
    }
    
    return state;
}
