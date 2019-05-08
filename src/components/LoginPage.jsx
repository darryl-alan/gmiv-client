import React, { Component } from "react";
import "../login_theme/css/bootstrap.min.css";
import "../login_theme/css/style.css";
import logo from "../login_theme/images/logo.png";
import bgImg from "../login_theme/images/1.jpg";
import pic from "../login_theme/images/11.jpg";
import SweetAlert from "sweetalert2-react";
class LoginPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <SweetAlert
          show={false}
          title="Demo"
          text="Sweetalert in react"
          onConfirm={() => alert("yo")}
        />
        <nav
          className="navbar navbar-inverse navbar-fixed-top"
          role="navigation"
        >
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
                <h3 className="visible-xs">RedRestaurant</h3>
              </a>
            </div>
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a className="page-scroll" href="#intro">
                    Home
                  </a>
                </li>
                <li>
                  <a className="page-scroll" href="#menu">
                    Registration
                  </a>
                </li>
                <li>
                  <a className="page-scroll" href="#staff">
                    BPI
                  </a>
                </li>
                <li>
                  <a className="page-scroll" href="#portfolio">
                    Sign-In
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

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
        <a id="backTop">Back To Top</a>
        <div id="page-content" className="index-page">
          <section className="box-content box-2 box-style" id="menu">
            <div className="container">
              <div className="row heading">
                <div className="col-lg-12">
                  <h2>Registration</h2>
                  <div className="intro">Registering eFinance User</div>
                </div>
              </div>
              <div className="row">
                <form id="eProc-form" method="post" action="#">
                  <div className="col-md-12 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="form-group col-md-6">
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          id="FIN_Vendor_Code"
                          maxLength="10"
                          placeholder="Vendor Code"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          id="FIN_Name"
                          maxLength="50"
                          placeholder="Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          id="FIN_Email"
                          maxLength="100"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          id="FIN_HP"
                          maxLength="30"
                          placeholder="HP"
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          id="FIN_EXT"
                          maxLength="30"
                          placeholder="Ext"
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          id="FIN_Job_Title"
                          maxLength="30"
                          placeholder="Job Title"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="form-group col-md-12">
                      <div className="col-sm-12">
                        <button
                          type="button"
                          className="btn btn-4 btn-block"
                          name="btnBooking"
                          id="FIN_btnSubmit"
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
          <section className="box-content box-3" id="staff">
            <div className="container">
              <div className="row heading">
                <div className="col-lg-12">
                  <h2>BPI</h2>
                  <div className="intro">Registering BPI User</div>
                </div>
              </div>
              <div className="row center">
                <div className="col-md-3">
                  <div className="wrap-img">
                    <img src={pic} />
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="row">
                    <form id="eProc-bpi-form" method="post" action="#">
                      <div
                        className="col-md-12 wow fadeInUp"
                        data-wow-delay="0.3s"
                      >
                        <div className="form-group col-md-6">
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className="form-control"
                              id="BPI_Vendor_Code"
                              maxLength="10"
                              placeholder="Vendor Code"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className="form-control"
                              id="BPI_Name"
                              maxLength="50"
                              placeholder="Name"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className="form-control"
                              id="BPI_Email"
                              maxLength="100"
                              placeholder="Email"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className="form-control"
                              id="BPI_HP"
                              maxLength="30"
                              placeholder="HP"
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className="form-control"
                              id="BPI_EXT"
                              maxLength="30"
                              placeholder="Ext"
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className="form-control"
                              id="BPI_Job_Title"
                              maxLength="30"
                              placeholder="Job Title"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-md-12 wow fadeInUp"
                        data-wow-delay="0.3s"
                      >
                        <div className="form-group col-md-12">
                          <div className="col-sm-12">
                            <button
                              type="button"
                              className="btn btn-4 btn-block"
                              name="btnBooking"
                              id="BPI_btnSubmit"
                            >
                              SUBMIT
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
                  <form
                    method="post"
                    action="<?= hsc('index.php?' . encryptQS('type=app&controller=Login&action=login&redirect_to=' . urlencode(get('redirect_to')))) ?>"
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control input-lg"
                            name="UserID"
                            id="UserID"
                            placeholder="Your Username"
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
                          />
                        </div>
                      </div>
                      {/** if invalid password */}
                      <br />
                      <div className="col-xs-12">
                        <div className="form-control">
                          Invalid ID or Password
                        </div>
                      </div>
                      {/** endif */}
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
        </div>
      </React.Fragment>
    );
  }
}

export default LoginPage;
