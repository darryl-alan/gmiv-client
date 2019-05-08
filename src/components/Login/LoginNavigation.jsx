import React, { Component } from "react";

import FakeLink from "../common/FakeLink";

import logo from "../../login_theme/images/logo.png";

class LoginNavigation extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="#">
              <img src={logo} className="hidden-xs" alt="" />
              {/* <h3 className="visible-xs">RedRestaurant</h3> */}
            </a>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <FakeLink scrollTo="intro">Home</FakeLink>
              </li>
              <li>
                <FakeLink scrollTo="menu">Registration</FakeLink>
              </li>
              <li>
                <FakeLink scrollTo="staff">BPI</FakeLink>
              </li>
              <li>
                <FakeLink scrollTo="portfolio">Sign In</FakeLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default LoginNavigation;
