import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Corrected hook name

  useEffect(() => {
    // Check if user is not authenticated (not logged in)
    if (localStorage.getItem('token')) {
      // Redirect user to the home page
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        // Handle successful login
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token); // Save token in localStorage
        toast.success('Login successful'); // Display success toast notification
        navigate('/') // Navigate to home page after successful login
      } else {
        // Handle unsuccessful login
        console.error('Login failed:', response.statusText);
        toast.error('Invalid email or password'); // Display error toast notification
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error:', error.message);
      toast.error('Something went wrong'); // Display error toast notification
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar/>
      <form onSubmit={handleLogin} className="p-6 w-full md:h-screen lg:h-screen md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="w-full bg-red-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
