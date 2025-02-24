import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
 
    const {name, setName, email, setEmail, password, setPassword, re_Password, setRe_Password }= useContext(AuthContext)
    const handleSubmit = async (e)=>{

        e.preventDefault()

    }



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-2xl font-bold mb-8">LOGO BLOGGER</div>
      <div className="mb-8">
        {/* Replace with your hero image */}
        <img src="path-to-your-hero-image.jpg" alt="Hero" className="w-full max-w-md" />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              onChange={(e)=> setName(e.target.value)}
              value={name}
              type="text"
              id="fullName"
              name="fullName"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              onChange={(e)=> setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              onChange={(e)=> setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">Re-enter Password</label>
            <input
              onChange={(e)=> setRe_Password(e.target.value)}
              value={re_Password}
              type="password"
              id="rePassword"
              name="rePassword"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            CONTINUE
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          When you create an account, you agree to our{' '}
          <a href="/terms" className="text-indigo-600 hover:text-indigo-500">Terms of BIG</a>. Learn how we handle your data in our{' '}
          <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">Ebroex notice</a>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;