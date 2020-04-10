import React, { useState } from "react";
import { Link } from "react-router-dom";
import getCookie from "./getCookie";
import { useCookies } from "react-cookie";

const EditPage = (props) => {
  const currentUser = getCookie("name");
  let userData = JSON.parse(localStorage.getItem("data"))[currentUser];

  const [name, setName] = useState(userData["name"]);
  const [phoneNumber, setPhoneNumber] = useState(userData["phoneNumber"]);
  const [email, setEmail] = useState(userData["email"]);
  const [userName, setUserName] = useState(userData["userName"]);
  const [password, setPassword] = useState(userData["password"]);
  const [errorMsg, setErrorMsg] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const onFieldEdit = (value, type) => {
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

  const onEditSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    setErrorMsg("");
    let editFlag = true;
    const currentUserNames =
      Object.keys(JSON.parse(localStorage.getItem("data"))) || [];
    const currentUserIndex = currentUserNames.indexOf(currentUser);
    currentUserNames.splice(currentUserIndex, 1);

    // check duplicate username condition
    if (currentUserNames.length && currentUserNames.indexOf(userName) > -1) {
      setErrorMsg("Duplicate user name provided");
      editFlag = false;
    }

    if (email && !emailRegex.test(email)) {
      setErrorMsg("Please enter valid email address, format - x@y.co");
      editFlag = false;
    }

    if (phoneNumber && phoneNumber.length > 10) {
      setErrorMsg("Only 10 numbers are allowed");
      editFlag = false;
    }

    if (name && phoneNumber && email && userName && password && editFlag) {
      userData = { name, phoneNumber, email, userName, password };

      // check if browser supports local storage
      if (typeof Storage !== "undefined") {
        let registeredData = JSON.parse(localStorage.getItem("data"));

        // delete current user data
        delete registeredData[currentUser];

        // clear localstorage
        localStorage.clear();

        localStorage.setItem(
          "data",
          JSON.stringify({
            [userName]: userData,
            ...registeredData,
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
    <div className="user-data">
      <Link to="/">Home</Link>
      <div className="user-details">
        <form onSubmit={(e) => onEditSubmit(e)}>
          <div>
            <span className="type">Name: </span>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => onFieldEdit(e.target.value, "name")}
              value={name}
            />
          </div>
          <div>
            <span className="type">Phone Number: </span>
            <input
              type="number"
              placeholder="Phone Number"
              onChange={(e) => onFieldEdit(e.target.value, "phoneNumber")}
              value={phoneNumber}
            />
          </div>
          <div>
            <span className="type">Email: </span>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => onFieldEdit(e.target.value, "email")}
              value={email}
            />
          </div>
          <div>
            <span className="type">User Name: </span>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => onFieldEdit(e.target.value, "userName")}
              value={userName}
            />
          </div>
          <div>
            <span className="type">Password</span>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => onFieldEdit(e.target.value, "password")}
              value={password}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
        {errorMsg && <span className="error">{errorMsg}</span>}
      </div>
    </div>
  );
};

export default EditPage;
