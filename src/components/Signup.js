import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://blog-app-be-vsoy.onrender.com/signup', formData);
      console.log(response.data);
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Error:', error.response.data.message);
      // Show error message
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '20rem' }}>
        <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" name="name" className="form-control" placeholder="Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
