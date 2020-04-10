import React from "react";
import Auth from "./Auth";
import { useCookies } from "react-cookie";

const HomePage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  const onSignOut = (e) => {
    e.preventDefault();
    Auth.signout();
    removeCookie("name");
  };

  return (
    <>
      <a href="#" onClick={(e) => onSignOut(e)}>
        Sign Out
      </a>
      <div>This is home page</div>
    </>
  );
};

export default HomePage;
