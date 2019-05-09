import React, { Component } from "react";
import "../../asset_theme/center/assets/examples/css/charts/chartjs.css";
import "../../asset_theme/global/vendor/c3/c3.css";
import Auth from "../common/Auth";
class Home extends Component {
  state = {
    news: []
  };

  componentDidMount() {
    this.loadNews();
  }

  loadNews = () => {
    // todo
  };

  render() {
    return (
      <div className="page-main">
        <div className="page-content padding-10">
          <div className="" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">
                  Hi {Auth.getUserID()}, welcome to GMIV
                </h4>
              </div>
              <div className="modal-body" style={{ marginBottom: "0px" }}>
                <div
                  className="panel"
                  style={{
                    height: "470px",
                    marginTop: "-10px",
                    marginBottom: "0px"
                  }}
                  data-plugin="scrollable"
                  data-skin="scrollable-shadow"
                >
                  <div data-role="container">
                    <div data-role="content">
                      <div
                        className="panel-body"
                        style={{
                          height: "465px",
                          marginLeft: "-20px",
                          marginRight: "-20px"
                        }}
                      >
                        <div className="col-lg-4 col-md-6">
                          <div
                            className="widget widget-shadow"
                            style={{ backgroundColor: "azure" }}
                          >
                            <div className="widget-header cover overlay">
                              <div
                                className="cover-background height-150"
                                style={{
                                  backgroundImage:
                                    "url('public/login_theme/images/por4.png')"
                                }}
                              />
                            </div>
                            <div
                              className="widget-body padding-horizontal-30 padding-vertical-20"
                              style={{ height: "calc(100% - 250px)" }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  paddingLeft: "110px"
                                }}
                              >
                                <div className="margin-bottom-20">
                                  <div
                                    className="font-size-16"
                                    style={{
                                      fontStyle: "italic",
                                      fontFamily: "Georgia,sans-serif"
                                    }}
                                  >
                                    Keynote
                                  </div>
                                  <div className="font-size-14">&nbsp;</div>
                                </div>
                              </div>
                              <div
                                style={{ height: "73px", marginRight: "-10px" }}
                                data-plugin="scrollable"
                                data-skin="scrollable-shadow"
                              >
                                <div data-role="container">
                                  <div data-role="content">
                                    {this.state.news.map(e => {
                                      const url =
                                        "~(?:(https?)://([^s<]+)|(www.[^s<]+?.[^s<]+))(?<![.,:])~i";
                                      const str = e.News.replace(
                                        new RegExp(
                                          url,
                                          '<a href="$0" target="_blank" title="$0">$0</a>'
                                        )
                                      );
                                      return (
                                        <p style={{ paddingRight: "20px" }}>
                                          {str}
                                        </p>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="widget-footer text-center bg-grey-500 padding-30"
                              style={{ height: "80px" }}
                            >
                              <div
                                className="example-buttons"
                                style={{ marginTop: "-10px" }}
                              >
                                <a
                                  data-toggle="tooltip"
                                  title="download manual"
                                  className="pull-left btn btn-floating btn-warning btn-sm"
                                  target="_blank"
                                  href="/filedownloader?path=public/manual.pdf"
                                >
                                  {/* todo */}
                                  <i
                                    className="icon md-collection-bookmark"
                                    aria-hidden="true"
                                  />
                                </a>

                                {Auth.getVendorCode() == "" ? (
                                  <React.Fragment>
                                    <button
                                      type="button"
                                      data-toggle="tooltip"
                                      title="upload manual"
                                      className="pull-left btn btn-floating btn-warning btn-sm"
                                      onClick={this.handleUploadFile}
                                    >
                                      <i
                                        className="icon fa-upload"
                                        aria-hidden="true"
                                      />
                                    </button>
                                    <input
                                      type="file"
                                      id="browse"
                                      name="browse"
                                      style={{ display: "none" }}
                                    />
                                  </React.Fragment>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-8 col-md-6">
                          {/*
									<?php
									require getdir(__FILE__) . '/partials/home-evo.php';
									?>*/}
                        </div>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
