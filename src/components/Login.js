import React, {useState} from 'react'
import Form from './Form';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async(event) =>{
        event.preventDefault();
        try {
          const req = {username, password};
          const response = await axios.post('http://localhost:3000/auth/login', req);
          setCookies("access_token", response.data.token);
          window.localStorage.setItem("userID", response.data.userID);
          console.log(response.data)
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
    onSubmit={handleSubmit}
  />
  )
}

export default Login