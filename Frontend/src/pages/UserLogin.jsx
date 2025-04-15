import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user && user._id) {
      navigate('/home', { replace: true });
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        identifier,
        password
      });

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);

        // ✅ replace history so back button doesn't return to login
        navigate('/home', { replace: true });
      }

      setIdentifier('');
      setPassword('');
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="/logo.png" alt="Manipal Cabs Logo" />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>Email or Phone Number</h3>
          <input
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="text"
            placeholder='email@example.com or 9876543210'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
          >
            Login
          </button>
        </form>

        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
      </div>

      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
