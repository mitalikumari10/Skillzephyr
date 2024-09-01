import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context';

const Login = () => {
  const navigate = useNavigate();
  const { setisauthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://tm71vy3a35.execute-api.us-east-1.amazonaws.com/dev/login', {
        username,
        password
      });
      localStorage.setItem('jwtToken', response.data.token);
      setisauthenticated(true);
      toast.success('Logged in!');
      navigate('/');
    } catch (err) {
      setError('Error logging in: ' + (err.response?.data?.message || err.message));
      toast.error('Error logging in!');
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post('https://tm71vy3a35.execute-api.us-east-1.amazonaws.com/dev/register', {
        username,
        password,
        email
      });
      setIsLogin(false);
      toast.success('Registration successful!');
    } catch (err) {
      setError('Error registering: ' + (err.response?.data?.message || err.message));
      toast.error('Error registering!');
    }
  };

  const handleConfirm = async () => {
    try {
      await axios.post('https://tm71vy3a35.execute-api.us-east-1.amazonaws.com/dev/validate', {
        username,
        confirmationCode
      });
      setIsLogin(true);
      setError(null);
      toast.success('Registration confirmed! Please log in.');
    } catch (err) {
      setError('Error confirming registration: ' + (err.response?.data?.message || err.message));
      toast.error('Error confirming registration!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {isLogin ? (
          <>
            <h2>Login</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
            <p>
              Don't have an account?{' '}
              <button onClick={() => setIsLogin(false)}>Register</button>
            </p>
          </>
        ) : (
          <>
            <h2>Register</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <button onClick={handleRegister}>Register</button>
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)}>Login</button>
            </p>
          </>
        )}
        {!isLogin && (
          <>
            <h2>Confirm Registration</h2>
            <input
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              placeholder="Confirmation Code"
            />
            <button onClick={handleConfirm}>Confirm</button>
          </>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
