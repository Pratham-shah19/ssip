
import {SET_CUSTOMERS} from '../actions/Customers'

const initialState ={
    CUSTOMERS: []
}

export default (state= initialState,action) => {
    switch(action.type){
        case SET_CUSTOMERS:
            return{
                ...state,
                CUSTOMERS: action.customers   //we get updated/latets items form db
            }
        default:
            return state;
    
    }
}


