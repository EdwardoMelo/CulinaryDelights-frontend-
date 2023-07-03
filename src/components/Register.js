import React, { useState } from 'react'
import Form from './Form';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 

  const handleSubmit = async(event) =>{
    event.preventDefault();
    try{
      const req = { username, password };
      const res = await axios.post('http://localhost:3000/auth/register', req);
      alert(res.data.message);
      
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
      onSubmit={handleSubmit}
    /> 
  )
}

export default Register