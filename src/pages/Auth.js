import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const Auth = ({isUserRegistered, setIsUserRegistered}) => {

 return (
  <div>
     {isUserRegistered ? 
     <Login 
     setIsUserRegistered={setIsUserRegistered} isUserRegistered={isUserRegistered}
     /> 
     : <Register setIsUserRegistered={setIsUserRegistered} isUserRegistered={isUserRegistered}/>}  
  </div>
  )
}

export default Auth;