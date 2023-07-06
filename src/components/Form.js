import React from 'react'
import Logo from '../assets/logo.png'
const Form = ({ username, setUsername, password, setPassword, formType, handleSignIn, handleSignUp, isUserRegistered, setIsUserRegistered }) => {
  return (
    <>
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={Logo}
            alt="Your Company"
          />
          {isUserRegistered && <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2> }
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6"  method="POST" onSubmit={isUserRegistered ? handleSignIn : handleSignUp}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="name"
                  type="text"
                  value={username}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {setUsername(e.target.value)}}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                { isUserRegistered ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>

          {isUserRegistered ? (<p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a onClick={() => setIsUserRegistered(false)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign up
            </a>
          </p>) : (<p className="mt-10 text-center text-sm text-gray-500">
            Already a Member?{' '}
            <a onClick={() => setIsUserRegistered(true)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign In
            </a>
          </p>)}
        </div>
      </div>
    </>
  )
}

export default Form;