import React, { Component } from "react";

class RegistrationForm extends Component {
  state = {};
  render() {
    return (
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
    );
  }
}

export default RegistrationForm;
