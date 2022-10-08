import React from 'react'
import Sidebar from "../../components/Sidebar/Sidebar";
import Orders from '../../components/Orders/Orders';
import './OrdersOwnerDashboard.css'

const OrdersOwnerDashboard = () => {
  return (
    <div className="owner-dashboard-container">
      <div className="owner-inner-container">
        <div className="owner-left">
          <Sidebar/>
        </div>
        <div className="owner-right">
          <Orders/>
        </div>
      </div>
    </div>
  )
}

export default OrdersOwnerDashboard