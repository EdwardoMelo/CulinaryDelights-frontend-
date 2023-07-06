import React, {useState} from 'react'
import Form from './Form';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../utils';

const Login = ({setIsUserRegistered, isUserRegistered}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSignIn = async(event) =>{
        event.preventDefault();
        try {
          const req = {username, password};
          console.log(req)
          const response = await axios.post(`${base_url}/auth/login`, req);
          
          setCookies("access_token", response.data.token);
          window.localStorage.setItem("userID", response.data.userID);
          
          navigate('/');

        } catch (error) {
          console.log(error);
        }
        
  }

  return (
    <Form 
    username={username}
    setUsername={setUsername}
    password={password}
    setPassword={setPassword}
    setIsUserRegistered={setIsUserRegistered}
    isUserRegistered={isUserRegistered}
    handleSignIn={handleSignIn}
  />
  )
}

export default Login