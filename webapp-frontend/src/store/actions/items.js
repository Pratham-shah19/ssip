// import item from '../../models/item';
import ColdBeverages from '../../DummyData/ColdBeverages'
import HotBeverages from '../../DummyData/HotBeverages';
import Starters from '../../DummyData/Starters';
import Dessert from '../../DummyData/Dessert';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
// const token = localStorage.getItem('token');
export const SET_ICECREAM = "SET_ICECREAM";
export const SET_MAINCOURSE = "SET_MAINCOURSE";
export const SET_STARTERS = "SET_STARTERS";

export const SET_ALLPRODUCT = "SET_ALLPRODUCT";


export const setAllProducts = () => {
    return async (dispatch,getState) =>{
        try{
            console.log('token');
            const token_main = getState().auth.token;
            // const token_main = localStorage.getItem('token');  
            console.log('token_blbalalala',token_main);
            const data =  await axios.post(
                "http://127.0.0.1:4000/api/v1/canteen/dish",{},{
                    headers:{
                        Authorization:`Bearer ${token_main}`
                    }
                }
            );
            console.log('----------data',data);
            dispatch({
                type: SET_ALLPRODUCT,
                AllItems: data
            })
        }catch(err){
            console.log('error',err);
            throw err;
        }
    }
}

export const setDummyHot = () => {
            return async (dispatch,getState) => {
                try{
                    console.log('token');
                    const token_main = getState().auth.token;
                    // const token_main = localStorage.getItem('token');  
                    console.log('token_blbalalala',token_main);
                    const data =  await axios.post(
                        "http://127.0.0.1:4000/api/v1/canteen/dishes/category",{},{
                            headers:{
                                Authorization:`Bearer ${token_main}`
                            }
                        }
                    );
                    console.log('data',data);
                    //console.log('data',data.data.data[0].category);
                    
                    if(data.status === 200){
                        console.log('You hitted');
                        const transformedIcecreams = [];
                        const transformedMainCourse = [];
                        const transformedStarters = [];
                        // const img = async (key) => {
                        //     console.log('url: ',`http://192.168.175.212:8080/${data.data.data[key].imageUrl}`);
                        //     const img_data = await axios.get(`http://192.168.175.212:8080/${data.data.data[key].imageUrl}`)
                        //     console.log(img_data);
                        //     return img_data;
                        // }
                        console.log('main_datacrea',data.data.data.IceCream)
                        for (const key in data.data.data.IceCream) {
                            console.log('key',key)
                            // A cart-item with an additional productId prop.
                            // console.log('_id',data.data.data[key]._id);
                            // console.log('price',data.data.data[key].price);
                            // console.log('name',data.data.data[key].name);
                            // console.log('img_data',img(key));
                            // src={`http://127.0.0.1:4000/public/${imgaUri}`}
                            //console.log('img_src_', `http://192.168.175.212:8080/${data.data.data[key].imageUrl}`)
                            transformedIcecreams.push({
                                
                                id: data?.data?.data?.IceCream[key]?._id,
                                price: data?.data?.data?.IceCream[key]?.price,
                                name: data.data.data?.IceCream[key]?.name,
                                url: data.data.data?.IceCream[key]?.imageUrl,
                                isAvailable: data.data.data?.IceCream[key]?.isAvailable
                                
                                // sum: state.cart.items[key].sum,
                    
                            });
                        }
                        for (const key in data.data.data.Starter) {
                            console.log('key',key)
                            // A cart-item with an additional productId prop.
                            // console.log('_id',data.data.data[key]._id);
                            // console.log('price',data.data.data[key].price);
                            // console.log('name',data.data.data[key].name);
                            // console.log('img_data',img(key));
                            // src={`http://127.0.0.1:4000/public/${imgaUri}`}
                           // console.log('img_src_', `http://192.168.175.212:8080/${data.data.data[key].imageUrl}`)
                            transformedStarters.push({
                                
                                id: data?.data?.data?.Starter[key]?._id,
                                price: data?.data?.data?.Starter[key]?.price,
                                name: data.data.data?.Starter[key]?.name,
                                url: data.data.data?.Starter[key]?.imageUrl,
                                isAvailable: data.data.data?.Starter[key]?.isAvailable
                                
                                // sum: state.cart.items[key].sum,
                    
                            });
                        }
                        for (const key in data.data.data.MainCourse) {
                            console.log('key',key)
                            // A cart-item with an additional productId prop.
                            // console.log('_id',data.data.data[key]._id);
                            // console.log('price',data.data.data[key].price);
                            // console.log('name',data.data.data[key].name);
                            // console.log('img_data',img(key));
                            // src={`http://127.0.0.1:4000/public/${imgaUri}`}
                            //console.log('img_src_', `http://192.168.175.212:8080/${data.data.data[key].imageUrl}`)
                            transformedMainCourse.push({
                                
                                id: data?.data?.data?.MainCourse[key]?._id,
                                price: data?.data?.data?.MainCourse[key]?.price,
                                name: data.data.data?.MainCourse[key]?.name,
                                url: data.data.data?.MainCourse[key]?.imageUrl,
                                isAvailable: data.data.data?.MainCourse[key]?.isAvailable
                                
                                // sum: state.cart.items[key].sum,
                    
                            });
                        }
                        console.log('transformer_icecream',transformedIcecreams);
                        console.log('transformer_starter',transformedStarters);
                        console.log('transformer_maincourse',transformedMainCourse);
                        dispatch({
                            type: SET_STARTERS,
                            products: transformedStarters
                        });
                        dispatch({
                            type: SET_MAINCOURSE,
                            products: transformedMainCourse
                        });
                        dispatch({
                            type: SET_ICECREAM,
                            products: transformedIcecreams
                        });
                    }
                    // if (!response.ok) {
                    //     throw new Error(
                    //     "Something went wrong with fetching the data from the server!"
                    //     );
                    // }
                    
                    
                }catch(err){
                    console.log('err',err);
                    console.log('Hello!fukciiccsiai');
                    throw err;
                }
            }
        }
    


// export const setDummyStart = () => {
//     return async(dispatch) => {
//         try{
//         // dispatch({
//         //     type: SET_PRODUCTS,
//         //     products: Starters
//         // });
//         }
//         catch(err){
//             console.log(err);
//         }
//     }
// }

// export const setDummyDes = () => {
//     return async(dispatch) => {
//         try{
//         // dispatch({
//         //     type: SET_PRODUCTS,
//         //     products: Dessert
//         // });
//         }
//         catch(err){
//             console.log(err);
//         }
//     }
// }




// export const setDummyCold = () => {
//     return async(dispatch) => {
//         try{
//         // dispatch({
//         //     type: SET_PRODUCTS,
//         //     products: ColdBeverages
//         // });
//         }
//         catch(err){
//             console.log(err);
//         }
//     }
// }


// // export const fetchItems =() =>{
// //     return async (dispatch, getState) => {
// //         const userId = getState().auth.userId;
// //         try{
// //             const response = await fetch(
// //                 ""
// //             );
// //             if (!response.ok) {
// //                 throw new Error(
// //                 "Something went wrong with fetching the data from the server!"
// //                 );
// //             }
// //             const resData = await response.json();
// //             const loadedProducts = [];

// //             for (const key in resData) {
// //                 loadedProducts.push(
// //                 new Product(
// //                     key,
// //                     resData[key].title,
// //                     resData[key].imageUrl,
// //                     resData[key].category,
// //                     resData[key].price
// //                 )
// //                 );
// //             }
// //             dispatch({
// //                 type: SET_PRODUCTS,
// //                 products: loadedProducts,
// //             });
// //         }catch(err){
// //             throw err;
// //         }
// //     }
// // }