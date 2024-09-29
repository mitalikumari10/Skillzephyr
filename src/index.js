import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

export const Context = createContext({
  isauthenticated: false, user: null
});

const ContextWrapper = () => {
  const [isauthenticated, setIsauthenticated] = useState(false);
  const [user, setUser] = useState({})

  return (
    <Context.Provider value={{ isauthenticated, setIsauthenticated, user, setUser }}>
      <App />
    </Context.Provider>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <ContextWrapper />
  </React.StrictMode>
);
