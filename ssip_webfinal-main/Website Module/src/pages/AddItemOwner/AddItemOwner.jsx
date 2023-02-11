import React from 'react'
import { useSelector } from 'react-redux';
import AddItem from '../../components/AddItem/AddItem'
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from 'react-router-dom';
const AddItemOwner = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  React.useEffect(() =>{
    if(!token){
      navigate("/");
    }
  },[])
  return (
    <div className="owner-dashboard-container">
      <div className="owner-inner-container">
        <div className="owner-left">
          <Sidebar/>
        </div>
        <div className="owner-right">
            <AddItem/>
        </div>
      </div>
    </div>
  )
}

export default AddItemOwner