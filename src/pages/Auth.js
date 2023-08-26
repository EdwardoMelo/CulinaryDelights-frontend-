import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const Auth = ({isUserRegistered, setIsUserRegistered}) => {

 return (
  <div className='flex h-screen my-20 bg-white w-[80%] lg:w1/3 '>
     {isUserRegistered ? 
     <Login 
     setIsUserRegistered={setIsUserRegistered} isUserRegistered={isUserRegistered}
     /> 
     : <Register setIsUserRegistered={setIsUserRegistered} isUserRegistered={isUserRegistered}/>}  
  </div>
  )
}

export default Auth;