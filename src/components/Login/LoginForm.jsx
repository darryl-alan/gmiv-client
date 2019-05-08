import React, { Component } from "react";
import http from "../common/http";
import Auth from "../common/Auth";
const apiUrl = process.env.REACT_APP_API_URL;
class LoginForm extends Component {
  state = {
    error: "",
    data: { UserID: "", UserPassword: "" }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { UserID, UserPassword } = this.state.data;
    let res;
    try {
      res = await http.post(
        apiUrl + "/index.php?type=api&controller=Login&action=login",
        { UserID, UserPassword },
        "text"
      );
    } catch (e) {
      if (e.response && e.response.data) {
        this.setState({ error: e.response.data });
      }
      return;
    }

    try {
      Auth.storeToken(res.data);
      this.setState({ error: "" });
      this.props.history.push("/");
    } catch (e) {
      if (e.message) {
        this.state({ error: e.message });
      }
    }
  };

  handleChange = e => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };

  render() {
    return (
      <section className="box-content box-4 box-style" id="portfolio">
        <div className="container">
          <div className="row heading">
            <div className="col-lg-12">
              <h2>SIGN-IN</h2>
              <br />
            </div>
          </div>
          <div className="row center">
            <div className="col-md-8">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control input-lg"
                        name="UserID"
                        id="UserID"
                        placeholder="Your Username"
                        value={this.state.data.UserID}
                        onChange={this.handleChange}
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control input-lg"
                        name="UserPassword"
                        id="UserPassword"
                        placeholder="Your Password"
                        required="required"
                        value={this.state.data.UserPassword}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  {this.state.error ? (
                    <React.Fragment>
                      <br />
                      <div className="col-xs-12">
                        <div className="form-control">{this.state.error}</div>
                      </div>
                    </React.Fragment>
                  ) : null}
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn-4 btn-block"
                      name="btnBooking"
                      id="btnBbooking"
                      value="SIGN-IN"
                    >
                      LOGIN
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-1" />
            <div className="col-md-3" id="forgot">
              <div className="row">
                <div className="box-content box-1">
                  <div className="service">
                    <p>Forgot Password ?</p>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-1" />
                        <div className="col-md-10">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control input-xs"
                              name="RESET_USERNAME"
                              id="RESET_USERNAME"
                              placeholder="User Name"
                              required="required"
                            />
                          </div>
                        </div>
                        <div className="col-md-1" />
                      </div>

                      <div className="col-md-12">
                        <div className="col-md-1" />
                        <div className="col-md-10">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control input-xs"
                              name="RESET_EMAIL"
                              id="RESET_EMAIL"
                              placeholder="Email"
                              required="required"
                            />
                          </div>
                        </div>
                        <div className="col-md-1" />
                      </div>
                    </div>
                    <a className="btn btn-2 btn-sm" href="#" id="btnReset">
                      Reset
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginForm;
