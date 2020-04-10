import React, { Component } from "react";
import Router from "./Router";
import { withCookies } from "react-cookie";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Router />
        </div>
      </div>
    );
  }
}
export default withCookies(App);
