import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const RegisterForm = (props) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const onFieldChange = (value, type) => {
    switch (type) {
      case "name":
        setName(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const onUserRegister = (e) => {
    e.preventDefault();
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    setErrorMsg("");
    let registerFlag = true;
    const currentUserNames =
      Object.keys(JSON.parse(localStorage.getItem("data"))) || [];

    // check duplicate username condition
    if (currentUserNames.length && currentUserNames.indexOf(userName) > -1) {
      setErrorMsg("Duplicate user name provided");
      registerFlag = false;
    }

    if (email && !emailRegex.test(email)) {
      setErrorMsg("Please enter valid email address, format - x@y.co");
      registerFlag = false;
    }

    if (phoneNumber && phoneNumber.length > 10) {
      setErrorMsg("Only 10 numbers are allowed");
      registerFlag = false;
    }

    if (name && phoneNumber && email && userName && password && registerFlag) {
      const userData = { name, phoneNumber, email, userName, password };

      // check if browser supports local storage
      if (typeof Storage !== "undefined") {
        localStorage.setItem(
          "data",
          JSON.stringify({
            [userName]: userData,
            ...JSON.parse(localStorage.getItem("data")),
          })
        );

        setName("");
        setPassword("");
        setPhoneNumber("");
        setEmail("");
        setUserName("");
      }

      if (cookies) removeCookie("name");
      setCookie("name", userName, { path: "/" });
      if (cookies) props.history.push("/");
    }
  };

  return (
    <div className="register-container">
      <Link to="/login">Login Page</Link>
      <form onSubmit={(e) => onUserRegister(e)}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => onFieldChange(e.target.value, "name")}
          value={name}
        />
        <input
          type="number"
          placeholder="Phone Number"
          onChange={(e) => onFieldChange(e.target.value, "phoneNumber")}
          value={phoneNumber}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => onFieldChange(e.target.value, "email")}
          value={email}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => onFieldChange(e.target.value, "userName")}
          value={userName}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => onFieldChange(e.target.value, "password")}
          value={password}
        />
        <input type="submit" value="Register" />
      </form>
      <span className="required-note">All the fields are required</span>
      {errorMsg && <span className="error">{errorMsg}</span>}
    </div>
  );
};

export default RegisterForm;
