import React, { useState, createContext, useContext } from 'react';

export const AuthContext = createContext({
  isauthenticated: false,
  setisauthenticated: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isauthenticated, setisauthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isauthenticated, setisauthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
