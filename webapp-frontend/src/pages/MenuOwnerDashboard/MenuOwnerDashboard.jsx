import React,{useEffect} from 'react'
import Sidebar from "../../components/Sidebar/Sidebar";
import Menu from '../../components/Menu/Menu';
import Header_Menu from '../../components/Header_Menu/Header_Menu'
import Rightbar from '../../components/RightBar/Rightbar'
import './MenuOwnerDashboard.css'
import { useNavigate } from 'react-router-dom';
import{useSelector} from 'react-redux'
const MenuOwnerDashboard = () => {
  const token = useSelector(state => state.auth.token)
  const navigate = useNavigate();
  useEffect(() =>{
      if(!token){
        navigate("/");
      }
    },[])
  const additems =() => {
    return(
      <div>a</div>
    );
  }

  return (
    <div className="owner-or-dashboard-container">
      
      <div className="owner-or-inner-container">
      
        <div className="owner-or-left">
          <Sidebar/>
        </div>
        <div className="owner-or-right">
          <div className="header-or">
          
            <Header_Menu title="Make Orders" btn1title="Add Qty" btn2={additems()} btn2title="Add Items"/>
          </div>
          <div className="combine">
          <div className="owner-or-right-left">
              <Menu/>
            </div> 
            <div className="owner-or-right-right">
              <Rightbar 
              />
            </div>
          </div>
          </div>
          
        </div>
      </div>
 
  )
}

export default MenuOwnerDashboard