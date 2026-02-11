import React from 'react'
import Dashboard from './Dashboard'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
    const Navigate=useNavigate()
    const [error, setError] = React.useState('');

  const handleSubmitButton = async(e) => {
    e.preventDefault()
    console.log('Email:', email);
    try{
        const res=await api.post('/auth/login', {email,password});

        const token=res.data.token;
        localStorage.setItem('token', token);
        toast.success('Login successful! Redirecting to dashboard...');
        Navigate("/dashboard")
    }
    catch(error){
      setError(error.response?.data?.message || 'An error occurred during login. Please try again.');
      alert(error.response?.data?.message || 'An error occurred during login. Please try again.');
    }
  }

  return (
    <div className=" flex flex-col justify-center items-center bg-gray-100">
        <h2 className='text-black text-3xl'>Login Page</h2>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={handleSubmitButton}
        >
          <h2 className="text-2xl font-semibold">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div>
            <p className="text-sm mt-4 text-black">
                Don't have an account?{' '}
                <a href="/register" className="text-blue-600 hover:underline">
                Register here
                </a>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Login
