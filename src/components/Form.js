import React from 'react'

const Form = ({ username, setUsername, password, setPassword, formType, onSubmit }) => {

  return (
    <div className='auth-container'>
      <form onSubmit={onSubmit}>
        { formType==="register" ? <h1>Register</h1> : <h1>Login</h1>}
        <div className='form-group'>
            <label htmlFor='username'>Username: </label>
            <input type="text" id="username" value={username} onChange={(e ) =>{ setUsername(e.target.value) }} />
        </div>
        <div className='form-group'>
            <label htmlFor='password'>Password: </label>
            <input type="text" id="password" value={password}onChange={(e) =>{ setPassword(e.target.value) }} />
        </div>

        <button type='submit'>Login</button>
  
      </form>
    </div>
  )
}

export default Form;