import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <>
      <div>This is login page</div>
      <Link to="/register">Register</Link>
    </>
  );
};

export default LoginForm;
