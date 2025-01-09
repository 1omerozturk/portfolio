'use client'
import Login from './login'
import React, { useEffect, useState } from 'react'
import { AdminAuth } from './auth'

const Admin = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    setIsLogin(AdminAuth.isLoggedIn())
  }, [])
  return (
    <div>
      {isLogin ? (
        <div>
          <h1>Admin Dashboard</h1>
          <p>Admin content</p>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  )
}

export default Admin
