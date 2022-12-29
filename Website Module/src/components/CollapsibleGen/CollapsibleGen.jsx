import React, { useState } from "react";
import "./CollapsibleGen.css";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import Collapsible from "react-collapsible";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as WalletActions from "../../store/actions/wallet";
import OrderItem from "../OrderItem/OrderItem";

const CollapsibleGen = ({ orderId, otp, cust_name, item_arr, _button }) => {
  const [open, setOpen] = useState(false);
  // // const [otp,setOtp] = useState(0);
  // const [_orderId, setorderId] = useState(0);
  // const [_qty, setqty] = useState(0);
  const dispatch = useDispatch();
  const labels = () => {
    return (
      <div className="labels">
        <div className="order_main">
          <p className="orders">Order</p>
        </div>
        <div className="qty_main">
          <p className="qty">Quantity</p>
        </div>
      </div>
    );
  };
  const dropped = () => {
    // console.log("Dropped Clicke");
    return (
      <div className="dropped">
        {labels()}
        {item_arr &&
          item_arr.map((item) => {
            return <OrderItem dishname={item.dishName} qty={item.qty} />;
          })}
      </div>
    );
  };
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div className="collapse">
      <Collapsible
        trigger={
          <div className="box">
            <div className="box-left">
              <p className="box-title">OrderId: {orderId}</p>
              <p className="box-value">Customer Name: {cust_name}</p>
            </div>
            <div className="btn">
              <button className="toggle" onClick={toggle}>
                {<ArrowDropDownCircleIcon sx={{ fontSize: 40 }} />}{" "}
              </button>
            </div>
          </div>
        }
      >
        {dropped()}
      </Collapsible>
    </div>
  );
};

export default CollapsibleGen;

// const CollapsibleBox = ({ orderId, otp, cust_name, item_arr, _button }) => {
//   const [open, setOpen] = useState(false);
//   // const [otp,setOtp] = useState(0);
//   const [_orderId, setorderId] = useState(0);
//   const [_qty, setqty] = useState(0);
//   const token_main = useSelector((state) => state.auth.token);
//   console.log(token_main, "token_main");
//   const dispatch = useDispatch();
//   dispatch(OrderAction.setOrderId(orderId));

//   const toggle = () => {
//     setOpen(!open);
//   };
//   console.log("order_disbes", orderId, cust_name);

//   const labels = () => {
//     return (
//       <div className="labels">
//         <div className="order_main">
//           <p className="orders">Order</p>
//         </div>
//         <div className="qty_main">
//           <p className="qty">Quantity</p>
//         </div>
//       </div>
//     );
//   };

//   const completedHandler = async () => {
//     const completedButton = await axios.post(
//       `http://127.0.0.1:4000/api/v1/canteen/guestcompletedbutton/${orderId}`,
//       {},
//       {
//         headers: { Authorization: `Bearer ${token_main}` },
//       }
//     );
//     console.log("completed_Button", completedButton);

//     const abortHandler = () => {};
//     const conditional_render = () => {
//       if (cust_name !== "Guest") {
//         return (
//           <div className="competed">
//             <div
//               type="button"
//               className="completed1"
//               onClick={completedHandler()}
//             >
//               <p className="completed_text">OTP: {otp}</p>
//             </div>
//           </div>
//         );
//       }
//       <div className="competed">
//         <button
//           type="button"
//           className="completed1"
//           onClick={completedHandler()}
//         >
//           <p className="completed_text">Completed</p>
//         </button>
//       </div>;
//     };

//     return (
//       <div className="btns">
//         {/* <div className="abort">
//                 <button type="button" className="abort1" onClick={abortHandler()}><p className='abort_text'>Abort</p></button>
//                 </div> */}
//         {conditional_render()}
//       </div>
//     );
//   };

//   const dropped = () => {
//     return (
//       <div className="dropped">
//         {labels()}
//         {/* {
//                     item_arr &&
//                     item_arr.map((item) =>{
//                         // let data;
//                         // React.useEffect(() => {
//                         //      async () =>{
//                         //     data = await axios.post(`http://127.0.0.1:4000/api/v1/canteen/dish/${item?.dishId}`,{},{
//                         //     headers:{
//                         //         Authorization:`Bearer ${token_main}`
//                         //     }}

//                         //     )
//                         //     }
//                         // },[])
//                         // console.log('ordercart',data)
//                         return <OrderItem dishname={item.dishName} qty={item.qty} />;
//                     })
//                 } */}
//         {item_arr &&
//           item_arr.map((item) => {
//             return <OrderItem dishname={item.dishName} qty={item.qty} />;
//           })}

//         {_button != true ? (
//           <div className="competed">
//             <div type="button" className="completed1">
//               <p className="completed_text">OTP: {otp}</p>
//             </div>
//           </div>
//         ) : (
//           <div className="competed">
//             <button
//               type="button"
//               className="completed1"
//               onClick={completedHandler}
//             >
//               <p className="completed_text">Completed</p>
//             </button>
//           </div>
//         )}

//         {/* {conbutton()} */}
//       </div>
//     );
//   };
//   return (
//     <div className="collapse">
//       <Collapsible
//         trigger={
//           <div className="box">
//             <div className="box-left">
//               <p className="box-title">OrderId: {orderId}</p>
//               <p className="box-value">Customer Name: {cust_name}</p>
//             </div>
//             <div className="btn">
//               <button className="toggle" onClick={toggle}>
//                 {<ArrowDropDownCircleIcon sx={{ fontSize: 40 }} />}{" "}
//               </button>
//             </div>
//           </div>
//         }
//       >
//         {dropped()}
//       </Collapsible>
//     </div>
//   );
// };

// export default CollapsibleBox;
