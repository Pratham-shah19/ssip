import React from "react";
// import "./DetailBar_Owner.css";
import axios from "axios";
import { API } from "../../constants/API";
import { useDispatch, useSelector } from "react-redux";
import * as ItemsActions from "../../store/actions/items";
const DetailBar_Owner = ({ data }) => {
  let [qty, setqty] = React.useState(0);
  // console.log("DetailBar", data);
  const dispatch = useDispatch();
  const handleclick = async () => {
    // dispatch(ItemsActions.setsid(data._id));
    // window.location.reload();
    dispatch(ItemsActions.setId(data._id));
    // console.log("DetailBar", res);
  };
  React.useEffect(() => {
    handleclick();
  }, []);
  return (
    <div className="one-result2">
      <p className="result-id">{data.name}</p>
      <button onClick={handleclick} className="dtbar">
        Done
      </button>
    </div>
  );
};

export default DetailBar_Owner;
