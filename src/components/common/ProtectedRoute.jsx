import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";
class ProtectedRoute extends Component {
  state = {};
  render() {
    // const currentUser = auth.getCurrentUser(); // TODO
    const currentUser = Auth.getUserID();
    const { component: Component, render, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          if (!currentUser) return <Redirect to="/login" />;
          return Component ? <Component {...props} /> : render(props);
        }}
      />
    );
  }
}

export default ProtectedRoute;
