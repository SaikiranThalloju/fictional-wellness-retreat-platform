import React from 'react'
import Navbar from '../Navbar/Navbar'
import TopComponent from '../TopComponent/TopComponent'

import DisplayCards from '../DisplayCards/DisplayCards'
import Footer from '../Footer/Footer'
const Dashboard = () => {
  return (
    <div>
    <Navbar/>
    <TopComponent/>
    <DisplayCards/>
    <Footer/>
    </div>
  )
}

export default Dashboard
