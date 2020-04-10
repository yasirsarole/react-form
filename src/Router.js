import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "./Login";
import RegisterForm from "./RegisterForm";
import HomePage from "./Home";
import EditPage from "./Edit";
import Auth from "./Auth";
import getCookie from "./getCookie";

const Router = () => (
  <Switch>
    <Route path="/login" component={LoginForm} />
    <Route path="/register" component={RegisterForm} />
    <PrivateRoute path="/edit" component={EditPage} />
    <PrivateRoute path="/" component={HomePage} />
  </Switch>
);

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (getCookie("name")) {
    Auth.authenticate();
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        Auth.getAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};
export default Router;
