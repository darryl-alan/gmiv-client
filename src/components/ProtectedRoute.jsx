import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
class ProtectedRoute extends Component {
  state = {};
  render() {
    // const currentUser = auth.getCurrentUser(); // TODO
    const currentUser = false;
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
