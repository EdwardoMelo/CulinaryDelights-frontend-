import React, { useState } from 'react'
import Form from './Form';
import axios from 'axios'
import { base_url } from '../utils';

const Register = ({isUserRegistered, setIsUserRegistered}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 

  const handleSignUp = async(event) =>{
    event.preventDefault();
    try{
      const req = { username, password };
      const res = await axios.post(`${base_url}/auth/register`, req);
      alert(res.data.message);
      setIsUserRegistered(true);
    }catch(error){
      console.log(error)
    }
   
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      formType="register"
      handleSignUp={handleSignUp}
      isUserRegistered={isUserRegistered}
      setIsUserRegistered={setIsUserRegistered}
    /> 
  )
}

export default Register