import React from 'react';

// Object that contains components
const AuthContext = React.createContext({
  isLoggedIn: false,
});

export default AuthContext;
