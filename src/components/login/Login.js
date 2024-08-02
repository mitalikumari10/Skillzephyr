import React, { useState } from 'react';
// import { Auth } from 'aws-amplify';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

//   const handleLogin = async () => {
//     try {
//       await Auth.signIn(username, password);
//       // Redirect to home page
//     } catch (error) {
//       console.error('Error logging in', error);
//     }
//   };

//   const handleRegister = async () => {
//     try {
//       await Auth.signUp({
//         username,
//         password,
//         attributes: {
//           email
//         }
//       });
//       // Switch to verification step
//       setIsLogin(false);
//     } catch (error) {
//       console.error('Error registering', error);
//     }
//   };

//   const handleConfirm = async () => {
//     try {
//       await Auth.confirmSignUp(username, confirmationCode);
//       // Redirect to login page or automatically log in the user
//     } catch (error) {
//       console.error('Error confirming sign up', error);
//     }
//   };

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
            <button >Login</button>
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
            <button >Register</button>
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
            <button>Confirm</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
