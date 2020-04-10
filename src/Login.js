import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import { useCookies } from "react-cookie";
import getCookie from "./getCookie";

const LoginForm = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [userName, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [cookies, setCookie] = useCookies(["name"]);

  useEffect(() => {
    // redirect to home page if already logged in
    if (getCookie("name")) props.history.push("/");
  });

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (!userName || !userPassword) {
      setErrorMsg("Username and password is required");
      Auth.signout();
    } else {
      const registeredData = JSON.parse(localStorage.getItem("data")) || {};
      const registeredUsers = Object.keys(registeredData);

      if (registeredUsers.indexOf(userName) > -1) {
        if (userPassword === registeredData[userName]["password"]) {
          Auth.authenticate();
          setErrorMsg("");

          setCookie("name", userName, { path: "/" });
          if (cookies) props.history.push("/");
        } else {
          setErrorMsg("Login failed: Invalid username or password");
        }
      } else {
        setErrorMsg("Login failed: Invalid username or password");
      }
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
      <span className="login-note">
        Please register, if not already registered
      </span>
      {errorMsg && <span className="error">{errorMsg}</span>}
    </div>
  );
};

export default LoginForm;
