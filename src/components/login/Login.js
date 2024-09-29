import React, { useContext, useState } from 'react';
import axios from 'axios';
import './Login.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsauthenticated } = useContext(Context);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null); // Reset error state
    try {
      const response = await axios.post(
        'https://27977u1eql.execute-api.us-east-1.amazonaws.com/dev/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );

      if (response.status === 200) { // Check for successful response
        setIsauthenticated(true);
        setUser(response.data.user); // Assuming the response contains user data
        toast.success('Logged in!');
        navigate('/');
      }
    } catch (err) {
      setError('Error logging in: ' + (err.response?.data?.message || err.message));
      toast.error('Error logging in!');
    }
  };

  const handleRegister = async () => {
    setError(null); // Reset error state
    try {
      const response = await axios.post(
        'https://27977u1eql.execute-api.us-east-1.amazonaws.com/dev/register',
        { username, password, email }
      );

      setIsLogin(true);
      toast.success(response.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError('Error registering: ' + errorMessage);
      toast.error(errorMessage);
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
