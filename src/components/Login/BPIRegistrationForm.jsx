import React, { Component } from "react";

import pic from "../../login_theme/images/11.jpg";

class BPIRegistrationForm extends Component {
  state = {};
  render() {
    return (
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
                  <div className="col-md-12 wow fadeInUp" data-wow-delay="0.3s">
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
                  <div className="col-md-12 wow fadeInUp" data-wow-delay="0.3s">
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
    );
  }
}

export default BPIRegistrationForm;
