import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";

const LoginForm = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [userName, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (!userName || !userPassword) {
      setErrorMsg("Username and password is required");
      Auth.signout();
    } else {
      Auth.authenticate();
      setErrorMsg("");

      props.history.push("/");
    }
  };

  const onFieldChange = (value, type) => {
    if (type === "name") {
      setUsername(value);
    } else {
      setUserPassword(value);
    }
  };

  return (
    <div className="login">
      <Link to="/register">Register</Link>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => onFieldChange(e.target.value, "name")}
        />
        <input
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => onFieldChange(e.target.value, "password")}
        />
        <input type="submit" value="Login" />
      </form>
      <span className="login-note">Login with any username and password</span>
      {errorMsg && <span className="error">{errorMsg}</span>}
    </div>
  );
};

export default LoginForm;
