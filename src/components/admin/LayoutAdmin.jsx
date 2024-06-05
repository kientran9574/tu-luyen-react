import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutAdmin = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default LayoutAdmin