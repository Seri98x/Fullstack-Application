import React from "react";


function LoginMock() {
    const react = React;
    react;
  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" />
      </div>
      <button id="loginButton">Login</button>
    </div>
  );
}

export default LoginMock;
