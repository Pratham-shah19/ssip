
import {SET_ICECREAM,SET_MAINCOURSE,SET_STARTERS,SET_ALLPRODUCT} from '../actions/items'

const initialState ={
    IceCream: [],
    MainCourse:[],
    Starter:[],
    AllItems:[]
}

export default (state= initialState,action) => {
    switch(action.type){
        case SET_ICECREAM:
            return{
                ...state,
                IceCream: action.products   //we get updated/latets items form db
            }
        case SET_MAINCOURSE:
            return{
                ...state,
                MainCourse: action.products   //we get updated/latets items form db
            }
        case SET_STARTERS:
            console.log('icre_reducer',action.product)
            return{
                ...state,
                Starter: action.products   //we get updated/latets items form db
            }
        case SET_ALLPRODUCT:
            console.log('all_order',action.AllItems)
            return{
                ...state,
                AllItems: action.AllItems //we get updated/latets
            }
        default:
            return state;
    }
    return state;
}