import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Auth from "./common/Auth";

class Logout extends Component {
  state = {};
  render() {
    Auth.logout();
    return <Redirect to="/" />;
  }
}

export default Logout;
