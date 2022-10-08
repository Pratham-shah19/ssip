import axios from "axios";
export const SET_WALLET_PRICE = "SET_WALLET_PRICE";
export const SET_ORDER_HISTORY = "SET_ORDER_HISTORY";

export const setWalletPrice = () => {
    return async(dispatch,getState) => {
        try{
            console.log('Entered Price: ');
            
            const token_main = getState().auth.token_admin;
            console.log('token_main', token_main);
            // const data =  await axios.get(
            //     "http://127.0.0.1:8069/api/v1/admin/Sachivalaya/details",
            //     {
            //         headers:{
            //             Authorization:`Bearer ${token_main}`
            //         }
            //     }

            // );

            await fetch("http://127.0.0.1:5000/api/v1/admin/Sachivalaya/details",{
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token_main}`
                },
            }).then(response => response.json())
            .then(responseJson => {
                var jsonData = responseJson;
                var data = jsonData.data;
                console.log('data',data[0].wallet);
                dispatch({
                    type: SET_WALLET_PRICE,
                    wallet: data[0].wallet
                })
        })
        
            // const data = await res.json();

        }
        catch(err){
            console.log('err',err);
        }
    }
}



export const setOrderHistory = () => {
    return async (dispatch,getState) => {
        try{
            console.log('token');
            const token_main = getState().auth.token_admin;
            // const token_main = localStorage.getItem('token');  
            console.log('token_blbalalala',token_main);
        
            await fetch(
                "http://127.0.0.1:8069/api/v1/admin/orders",
                {
                    method: 'POST',
                    headers:{
                        Authorization:`Bearer ${token_main}`
                    },
                    body: {status:"COMPLETED"},
                }
            ).then(response => response.json())
            .then(responseJson => {
                var jsonData = responseJson;
                var data = jsonData.data;

                console.log('_________data',jsonData);
                // dispatch({
                //     type: SET_WALLET_PRICE,
                //     wallet: data[0].wallet
                // })
        })
            //console.log('data_newORder',data);
            //console.log('data',data.data.data[0]);
            // dispatch({
            //     type: SET_ORDER_HISTORY,
            //     orderHistory: data.data.data
            // });
        }catch(err){
            console.log('error',err);
            console.log('Hello!fukciiccsiai-----------------')
            throw err;
        }
    // return{
    //     type: SET_NEWORDERS,
    //     newOrders: newOrders,
    // }
    
}}

