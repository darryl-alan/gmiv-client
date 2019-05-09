import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import RegistrationForm from "./Login/RegistrationForm";
import BPIRegistrationForm from "./Login/BPIRegistrationForm";
import LoginNavigation from "./Login/LoginNavigation";
import LoginForm from "./Login/LoginForm";

import "../login_theme/css/bootstrap.min.css";
import "../login_theme/css/style.css";

import bgImg from "../login_theme/images/1.jpg";
import Auth from "./common/Auth";

class LoginPage extends Component {
  state = {};
  render() {
    const UserID = Auth.getUserID();
    return UserID ? (
      <Redirect to="/" />
    ) : (
      <React.Fragment>
        <LoginNavigation />
        <header id="intro">
          <div
            id="carousel-example-generic"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="item active">
                <img src={bgImg} alt="First slide" />
                <div
                  className="centered"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <span
                    style={{
                      color: "#ffff",
                      fontSize: "100pt",
                      fontWeight: "900"
                    }}
                  >
                    GMIV
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div id="page-content" className="index-page">
          <RegistrationForm />
          <BPIRegistrationForm />
          <LoginForm history={this.props.history} />
        </div>
      </React.Fragment>
    );
  }
}

export default LoginPage;
