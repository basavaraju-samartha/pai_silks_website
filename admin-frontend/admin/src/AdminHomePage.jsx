import React from 'react'
import PaiLogo from "./assets/PaiLogo.svg?react" 
import { useState } from 'react'

import Notifications from "./assets/svg/Notifications.svg?react"

import DashBoard from './components/DashBoard'
import AllProducts from './components/AllProducts'
import OrderList from './components/OrderList'

const AdminHomePage = () => {
  const [clicked, setClicked]=useState(true)
  const [currentClicked, setcurrentClicked]=useState(false)
  const [currentView, setCurrentView] = useState("dashboard");

  const handleGoToDashBoardPage = () => setCurrentView("dashboard");
  const handleGoToAllProductsPage = () => setCurrentView("allProducts");
  const handleOrderList = () => setCurrentView("orderList");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <DashBoard/>
        );
      case "allProducts":
        return (
          <AllProducts/>
        );
      case "orderList":
        return (
          <OrderList/>
        );
      default:
        return (
          <DashBoard/>
        );
    }
  };

  return (
    <div className='bg-[#FAFAFA] flex h-screen'>
      <div className='h-full w-[15%] flex flex-col gap-3 items-center p-[2%] border-1'>
        <div className='w-full flex justify-center'>
          <PaiLogo alt="" />
        </div>
        <div style={clicked ? { backgroundColor: "#68232B",color:"white" } : {}}
         onClick={()=>handleGoToDashBoardPage()} className='hover:text-white hover:bg-[#68232B] rounded-xl w-full p-3 text-center cursor-pointer '> 
          Dashboard {/* style={clicked ? { backgroundColor: "#68232B",color:"white" } : {}} onClick={()=>setClicked(true)} */}
        </div>
        <div onClick={()=>handleGoToAllProductsPage()} className='hover:text-white hover:bg-[#68232B] rounded-xl w-full p-3 text-center cursor-pointer' >
          All Products
        </div>
        <div onClick={()=>handleOrderList()} className='hover:text-white hover:bg-[#68232B] rounded-xl w-full p-3 text-center cursor-pointer'>
          Order List
        </div>

      </div>
      <div className='h-full w-[85%]'>
        <div className='h-[10%] p-3 px-10 flex gap-5 items-center justify-end border-1'>
          <div><Notifications/></div>
          <div>Admin</div>
        </div>
        <div className=' h-[90%] bg-[#FFE9CC] overflow-y-auto'>
          <div className='h-[150rem]'>{renderView()}</div>
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage