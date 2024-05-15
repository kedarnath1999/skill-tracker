import React, { useState } from 'react';
import { useAuth } from '../contextProvider/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent the default form submission behavior
    try {
        await signup(email, password);
        navigate("/home")
        // Optionally, redirect the user or show a success message
    } catch (error) {
        console.error('Signup failed:', error.message);
        alert('Signup failed: ' + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="mb-3 text-center">Signup</h3>
          <form onSubmit={handleSubmit} className="card card-body">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">Sign Up</button>
              <button onClick={() => navigate("/login")} className="btn btn-secondary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
