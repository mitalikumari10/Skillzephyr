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
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://tm71vy3a35.execute-api.us-east-1.amazonaws.com/dev/login', {
        username,
        password
      });

      // Assuming the response contains an email
      const emailFromResponse = response.data.email || email;

      // Save JWT token and user details in local storage
      localStorage.setItem('jwtToken', response.data.token);
      const userDetails = { username, email: emailFromResponse };
      localStorage.setItem('user', JSON.stringify(userDetails));

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
      setIsLogin(true);
      toast.success('Registration successful!');
    } catch (err) {
      setError('Error registering: ' + (err.response?.data?.message || err.message));
      toast.error('Error registering!');
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
        
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
