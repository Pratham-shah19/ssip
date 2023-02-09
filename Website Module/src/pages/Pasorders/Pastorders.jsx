import React from "react";

const Pastorder = () => {
  return <div className="lol"></div>;
};

export default Pastorder;

// import React,{useEffect,useState,useCallback} from "react";
// import HistoryIcon from '@mui/icons-material/History';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// import Sidebar from "../../components/Sidebar/Sidebar";
// import Home from "../../components/Home/Home";
// import "./HomeOwnerDashboard.css";
// import Header from "../../components/Header_Home/Header";
// import CollapsibleBox from "../../components/Collapsible/CollapsibleBox";
// import * as OrdersActions from "../../store/actions/Orders"
// import {useSelector, useDispatch } from 'react-redux';

// const HomeOwnerDashboard = () => {
//   let [newOrders,setNewOrders] = useState([]);
//   let [loading,setloading] = useState(true);
//   const newOrder = useSelector((state) =>state.Orders.newOrders);
//   //le.log('order1',newOrder);
//   const dispatch = useDispatch();

//   const btn1_handle = () => {
//     //le.log("User");
//     return(
//       <p>Hello</p>
//       );
//   }
//   const btn2_handle = () => {
//     return(
//       <p>lol</p>
//     );
//   }

//   const loadProducts = useCallback(
// 		async () => {
// 			try {
// 				await dispatch(OrdersActions.setNewOrders());
//         setNewOrders(newOrder)
//         //le.log('orders',newOrder);
// 			} catch (err) {
// 				//le.log(err.message);
// 			}
// 		},
// 		[ dispatch ]
// 	);
//   useEffect(
// 		() => {
// 			loadProducts().then(() => setloading(false));
// 		},
// 		[]
// 	);

//   return (
//     <div className="owner-dashboard-container">
//       <div className="owner-inner-container">
//         <div className="owner-left">
//           <Sidebar/>
//         </div>
//         <div className="owner-right">
//           <div className="header_handle">

//             <Header
//               title="Current Orders"
//               btn1={btn1_handle}
//               btn1title={<HistoryIcon sx={{ fontSize: 40 }}/>}
//               btn2="btn2_handle"
//               btn2title={<AccountCircleIcon sx={{ fontSize: 40}}/>}
//             />

//           </div>

//           <div className="hr_line">
//             <hr />
//           </div>
//             <div className="home_comp">

//             {!loading &&
//             newOrder.map((item) => {
//             //le.log(item.price);
//             //le.log('orders',newOrder);
//             return <CollapsibleBox _button={item.data.button} orderId={item.data._id} item_arr={item.items} otp={item.data.otp} cust_name={item.userdetail.username}/>
//             })}
//             {/* <CollapsibleBox/>
//             <CollapsibleBox/>
//             <CollapsibleBox/>
//             <CollapsibleBox/>
//             <CollapsibleBox/>
//             <CollapsibleBox/>
//             <CollapsibleBox/>
//             <CollapsibleBox/> */}
//             </div>

//         </div>
//       </div>
//     </div>
//   );
// };
