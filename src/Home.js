import React from "react";
import Auth from "./Auth";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import getCookie from "./getCookie";

const HomePage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  const onSignOut = (e) => {
    e.preventDefault();
    Auth.signout();
    removeCookie("name");
  };

  const currentUser = getCookie("name");
  const userData = JSON.parse(localStorage.getItem("data"))[currentUser];

  return (
    <div className="user-data">
      <div className="links">
        <a href="#" onClick={(e) => onSignOut(e)}>
          Sign Out
        </a>
        <Link to="/edit">Edit Details</Link>
      </div>
      <div className="user-details">
        {Object.keys(userData).map((data, index) => (
          <div className={data} key={data + index}>
            <span className="type">{`${data}: `}</span>
            <span className="value">{userData[data]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
