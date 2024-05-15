import React, { useState } from 'react';
import { useAuth } from '../contextProvider/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login,handleGoogleSignIn } = useAuth();
  const navigate = useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <div className="container mt-5"> {/* Centering the form in the page */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit} className="card card-body">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
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
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <button onClick={handleGoogleSignIn} className="btn btn-danger w-100 mt-2">
              <FontAwesomeIcon icon={faGoogle} className="me-2" /> Sign Up with Google
            </button>
            <button onClick={() => navigate("/signup")} className="btn btn-secondary mt-2">Sign-up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
