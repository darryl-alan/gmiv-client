import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "../common/Auth";
import "../../asset_theme/center/assets/examples/css/charts/chartjs.css";
import "../../asset_theme/global/vendor/c3/c3.css";

import loadingImg from "../../asset/KendoUI/styles/Default/loading-image.gif";
import bgImg from "../../login_theme/images/por4.png";
class Home extends Component {
    state = {
        news: []
    };

    componentDidMount() {
        this.loadNewsAndData();
    }

    loadNewsAndData = () => {
        // todo
    };

    EvoWithNoBPI = (
        <React.Fragment key="Evo">
            <div class="col-sm-4" style={{ marginBottom: "-30px" }}>
                <Link
                    class="widget widget-shadow"
                    id="widgetLineareaOne"
                    style={{ backgroundColor: "#4271b2" }}
                    to="/dnready"
                >
                    <div class="widget-content">
                        <div class="padding-20 padding-top-10 padding-bottom-5">
                            <div class="clearfix">
                                <div class="pull-left padding-vertical-10">
                                    <i class="icon md-view-list font-size-24 vertical-align-bottom margin-right-5" />
                                    DN Ready
                                </div>
                                <span
                                    class="pull-right font-size-20"
                                    id="DN_Ready"
                                >
                                    <img
                                        src={loadingImg}
                                        style={{
                                            width: "28px",
                                            height: "28px"
                                        }}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div class="col-sm-4" style={{ marginBottom: "-30px" }}>
                <Link
                    class="widget widget-shadow"
                    id="widgetLineareaFourFour"
                    style={{ backgroundColor: "#f48223" }}
                    to="/invoicestatus?InvoiceStatus=C"
                >
                    <div class="widget-content">
                        <div class="padding-20 padding-top-10 padding-bottom-5">
                            <div class="clearfix">
                                <div class="pull-left padding-vertical-10">
                                    <i class="icon md-view-list font-size-24 vertical-align-bottom margin-right-5" />
                                    Inv Certified
                                </div>
                                <span
                                    class="pull-right font-size-20"
                                    id="Inv_Certified"
                                >
                                    <img
                                        src={loadingImg}
                                        style={{
                                            width: "28px",
                                            height: "28px"
                                        }}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div class="col-sm-4" style={{ marginBottom: "-30px" }}>
                <Link
                    class="widget widget-shadow"
                    id="widgetLineareaFour"
                    style={{ backgroundColor: "#38a22e" }}
                    to="/invoicestatus?InvoiceStatus=H"
                >
                    <div class="widget-content">
                        <div class="padding-20 padding-top-10 padding-bottom-5">
                            <div class="clearfix">
                                <div class="pull-left padding-vertical-10">
                                    <i class="icon md-view-list font-size-24 vertical-align-bottom margin-right-5" />
                                    Inv On Hold
                                </div>
                                <span
                                    class="pull-right font-size-20"
                                    id="Inv_OnHold"
                                >
                                    <img
                                        src={loadingImg}
                                        style={{
                                            width: "28px",
                                            height: "28px"
                                        }}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div class="col-sm-4" style={{ marginBottom: "-30px" }}>
                <Link
                    class="widget widget-shadow"
                    id="widgetLineareaFour"
                    style={{ backgroundColor: "#cb2e32" }}
                    to="/invoicestatus?InvoiceStatus=O"
                >
                    <div class="widget-content">
                        <div class="padding-20 padding-top-10 padding-bottom-5">
                            <div class="clearfix">
                                <div class="pull-left padding-vertical-10">
                                    <i class="icon md-view-list font-size-24 vertical-align-bottom margin-right-5" />
                                    Inv Approved
                                </div>
                                <span
                                    class="pull-right font-size-20"
                                    id="Inv_Approved"
                                >
                                    <img
                                        src={loadingImg}
                                        style={{
                                            width: "28px",
                                            height: "28px"
                                        }}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </React.Fragment>
    );

    BPI = (
        <div key="BPI" class="col-sm-4" style={{ marginBottom: "-30px" }}>
            <Link
                class="widget widget-shadow"
                id="widgetLineareaFour"
                style={{ backgroundColor: "#955fbc" }}
                to={
                    Auth.getUserGroup().indexOf("BPI") < 0
                        ? "/invoicestatus?InvoiceStatus=P"
                        : "/listpayment"
                }
            >
                <div class="widget-content">
                    <div class="padding-20 padding-top-10 padding-bottom-5">
                        <div class="clearfix">
                            <div class="pull-left padding-vertical-10">
                                <i class="icon md-view-list font-size-24 vertical-align-bottom margin-right-5" />
                                Ready For Payment
                            </div>
                            <span class="pull-right font-size-20" id="Paid">
                                <img
                                    src={loadingImg}
                                    style={{ width: "28px", height: "28px" }}
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );

    Chart = (
        <div key="Chart" class="col-sm-12" style={{ marginBottom: " -50px" }}>
            <div
                class="example-wrap"
                style={{ marginBottom: "-50px", height: "100px" }}
            >
                <div class="example" style={{ marginBottom: "-50px" }}>
                    <div id="exampleC3Spline1" style={{ height: "250px" }} />
                </div>
            </div>
        </div>
    );

    renderHomeElements = () => {
        const UserGroupID = Auth.getUserGroupID();
        const UserGroup = Auth.getUserGroup();
        let elements = [];
        if (
            UserGroupID === "001" ||
            UserGroupID === "100" ||
            UserGroup.indexOf("EVO") >= 0
        ) {
            if (UserGroup.indexOf("BPI") < 0) {
                elements.push(this.EvoWithNoBPI);
            }

            if (UserGroupID !== "004") {
                elements.push(this.BPI);
            }
            elements.push(this.Chart);
        }

        return elements;
    };

    render() {
        return (
            <div className="page-main">
                <div className="page-content padding-10">
                    <div className="" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4
                                    className="modal-title"
                                    id="myModalLabel"
                                    style={{ textAlign: "left" }}
                                >
                                    Hi {Auth.getUserID()}, welcome to GMIV
                                </h4>
                            </div>
                            <div
                                className="modal-body"
                                style={{ marginBottom: "0px" }}
                            >
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
                                                        style={{
                                                            backgroundColor:
                                                                "azure"
                                                        }}
                                                    >
                                                        <div className="widget-header cover overlay">
                                                            <div
                                                                className="cover-background height-150"
                                                                style={{
                                                                    backgroundImage: `url(${bgImg})`
                                                                }}
                                                            />
                                                        </div>
                                                        <div
                                                            className="widget-body padding-horizontal-30 padding-vertical-20"
                                                            style={{
                                                                height:
                                                                    "calc(100% - 250px)"
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        "relative",
                                                                    paddingLeft:
                                                                        "110px"
                                                                }}
                                                            >
                                                                <div className="margin-bottom-20">
                                                                    <div
                                                                        className="font-size-16"
                                                                        style={{
                                                                            fontStyle:
                                                                                "italic",
                                                                            fontFamily:
                                                                                "Georgia,sans-serif",
                                                                            textAlign:
                                                                                "left"
                                                                        }}
                                                                    >
                                                                        Keynote
                                                                    </div>
                                                                    <div className="font-size-14">
                                                                        &nbsp;
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    height:
                                                                        "73px",
                                                                    marginRight:
                                                                        "-10px"
                                                                }}
                                                                data-plugin="scrollable"
                                                                data-skin="scrollable-shadow"
                                                            >
                                                                <div data-role="container">
                                                                    <div data-role="content">
                                                                        {this.state.news.map(
                                                                            e => {
                                                                                const url =
                                                                                    "~(?:(https?)://([^s<]+)|(www.[^s<]+?.[^s<]+))(?<![.,:])~i";
                                                                                const str = e.News.replace(
                                                                                    new RegExp(
                                                                                        url,
                                                                                        '<a href="$0" target="_blank" title="$0">$0</a>'
                                                                                    )
                                                                                );
                                                                                return (
                                                                                    <p
                                                                                        style={{
                                                                                            paddingRight:
                                                                                                "20px"
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            str
                                                                                        }
                                                                                    </p>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="widget-footer text-center bg-grey-500 padding-30"
                                                            style={{
                                                                height: "80px"
                                                            }}
                                                        >
                                                            <div
                                                                className="example-buttons"
                                                                style={{
                                                                    marginTop:
                                                                        "-10px"
                                                                }}
                                                            >
                                                                <a
                                                                    data-toggle="tooltip"
                                                                    title="download manual"
                                                                    className="pull-left btn btn-floating btn-warning btn-sm"
                                                                    target="_blank"
                                                                    href={
                                                                        "/filedownloader?path=" +
                                                                        encodeURIComponent(
                                                                            "public/manual.pdf"
                                                                        )
                                                                    }
                                                                >
                                                                    {/* todo */}
                                                                    <i
                                                                        className="icon md-collection-bookmark"
                                                                        aria-hidden="true"
                                                                    />
                                                                </a>

                                                                {Auth.getVendorCode() ==
                                                                "" ? (
                                                                    <React.Fragment>
                                                                        <button
                                                                            type="button"
                                                                            data-toggle="tooltip"
                                                                            title="upload manual"
                                                                            className="pull-left btn btn-floating btn-warning btn-sm"
                                                                            onClick={
                                                                                this
                                                                                    .handleUploadFile
                                                                            }
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
                                                                            style={{
                                                                                display:
                                                                                    "none"
                                                                            }}
                                                                        />
                                                                    </React.Fragment>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-8 col-md-6">
                                                    {this.renderHomeElements()}
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
