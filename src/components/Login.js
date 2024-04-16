import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import the AuthContext

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { handleLogin } = useAuth(); // Access handleLogin from the AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://blog-app-be-vsoy.onrender.com/login', formData);
  debugger;
      if (response && response.data) {
        console.log(response)
        sessionStorage.setItem('token', response.data.token);
       const test =  sessionStorage.getItem("token")
       
        console.log('Token set in sessionStorage:', response.data.token);
        console.log(test) // Add this line for debugging
        handleLogin(response.data.token);
        navigate('/dashboard');
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error.response.data.message);
    }
  };
  
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '20rem' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3 text-center">Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
};

export default Login;
