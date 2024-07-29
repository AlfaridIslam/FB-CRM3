// src/components/Login.js
import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/facebook";
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Social Authentication</h1>
        <button onClick={handleLogin}>Login with Facebook</button>
      </header>
    </div>
  );
};

export default Login;
