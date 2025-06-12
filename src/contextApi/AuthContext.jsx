// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);


  return (
    //here children is App component bcz we wrapped App inside AuthProvider in main.jsx
    <AuthContext.Provider value={{ user, setUser }}>
      {children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
