import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import Auth from "../common/Auth";
import http from "../common/http";
import "../../asset_theme/center/assets/examples/css/charts/chartjs.css";
import "../../asset_theme/global/vendor/c3/c3.css";

import loadingImg from "../../asset/KendoUI/styles/Default/loading-image.gif";
import bgImg from "../../login_theme/images/por4.png";

const apiUrl = process.env.REACT_APP_API_URL;

class Home extends Component {
    state = {
        news: [],
        currentData: {},
        chartData: []
    };

    componentDidMount() {
        this.loadNewsAndData();
    }

    loadNewsAndData = async () => {
        try {
            const res = await http.post(
                apiUrl +
                    "/index.php?type=api&controller=Home&action=readDashboard",
                {},
                "json"
            );

            const EFIN_CHART = res.data.EFIN_CHART;
            const chartData = EFIN_CHART.months.map((month, index) => {
                return {
                    name: month,
                    DNReady: Number(EFIN_CHART.DNReady[index]),
                    InvApproved: Number(EFIN_CHART.InvApproved[index]),
                    InvCertified: Number(EFIN_CHART.InvCertified[index]),
                    InvOnHold: Number(EFIN_CHART.InvOnHold[index]),
                    Paid: Number(EFIN_CHART.Paid[index])
                };
            });

            const currentData = res.data.EFIN_CURRENT;
            const news = res.data.NEWS;
            this.setState({ chartData, currentData, news });
        } catch (e) {}
    };

    renderEvoWithNoBPI = () => {
        return (
            <React.Fragment key="Evo">
                <div className="col-sm-4" style={{ marginBottom: "-30px" }}>
                    <Link
                        className="widget widget-shadow"
                        id="widgetLineareaOne"
                        style={{ backgroundColor: "#4271b2" }}
                        to="/dnready"
                    >
                        <div className="widget-content">
                            <div className="padding-20 padding-top-10 padding-bottom-5">
                                <div className="clearfix">
                                    <div className="pull-left padding-vertical-10">
                                        <i className="icon md-view-list font-size-24 vertical-align-bottom margin-right-5" />
                                        DN Ready
                                    </div>
                                    <span
                                        className="pull-right font-size-20"
                                        id="DN_Ready"
                                    >
                                        {this.state.currentData.DNReady || (
                                            <img
                                                src={loadingImg}
                                                style={{
                                                    width: "28px",
                                                    height: "28px"
                                                }}
                                            />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-4" style={{ marginBottom: "-30px" }}>
                    <Link
                        className="widget widget-shadow"
                        id="widgetLineareaFourFour"
                        style={{ backgroundColor: "#f48223" }}
                        to="/invoicestatus?InvoiceStatus=C"
                    >
                        <div className="widget-content">
                            <div className="padding-20 padding-top-10 padding-bottom-5">
                                <div className="clearfix">
                                    <div className="pull-left padding-vertical-10">
                                        <i className="icon md-view-list font-size-24 vertical-align-bottom margin-right-5" />
                                        Inv Certified
                                    </div>
                                    <span
                                        className="pull-right font-size-20"
                                        id="Inv_Certified"
                                    >
                                        {this.state.currentData
                                            .InvCertified || (
                                            <img
                                                src={loadingImg}
                                                style={{
                                                    width: "28px",
                                                    height: "28px"
                                                }}
                                            />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-4" style={{ marginBottom: "-30px" }}>
                    <Link
                        className="widget widget-shadow"
                        id="widgetLineareaFour"
                        style={{ backgroundColor: "#38a22e" }}
                        to="/invoicestatus?InvoiceStatus=H"
                    >
                        <div className="widget-content">
                            <div className="padding-20 padding-top-10 padding-bottom-5">
                                <div className="clearfix">
                                    <div className="pull-left padding-vertical-10">
                                        <i className="icon md-view-list font-size-24 vertical-align-bottom margin-right-5" />
                                        Inv On Hold
                                    </div>
                                    <span
                                        className="pull-right font-size-20"
                                        id="Inv_OnHold"
                                    >
                                        {this.state.currentData.InvOnHold || (
                                            <img
                                                src={loadingImg}
                                                style={{
                                                    width: "28px",
                                                    height: "28px"
                                                }}
                                            />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-4" style={{ marginBottom: "-30px" }}>
                    <Link
                        className="widget widget-shadow"
                        id="widgetLineareaFour"
                        style={{ backgroundColor: "#cb2e32" }}
                        to="/invoicestatus?InvoiceStatus=O"
                    >
                        <div className="widget-content">
                            <div className="padding-20 padding-top-10 padding-bottom-5">
                                <div className="clearfix">
                                    <div className="pull-left padding-vertical-10">
                                        <i className="icon md-view-list font-size-24 vertical-align-bottom margin-right-5" />
                                        Inv Approved
                                    </div>
                                    <span
                                        className="pull-right font-size-20"
                                        id="Inv_Approved"
                                    >
                                        {this.state.currentData.InvApproved || (
                                            <img
                                                src={loadingImg}
                                                style={{
                                                    width: "28px",
                                                    height: "28px"
                                                }}
                                            />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </React.Fragment>
        );
    };

    renderBPI = () => {
        return (
            <div
                key="BPI"
                className="col-sm-4"
                style={{ marginBottom: "-30px" }}
            >
                <Link
                    className="widget widget-shadow"
                    id="widgetLineareaFour"
                    style={{ backgroundColor: "#955fbc" }}
                    to={
                        Auth.getUserGroup().indexOf("BPI") < 0
                            ? "/invoicestatus?InvoiceStatus=P"
                            : "/listpayment"
                    }
                >
                    <div className="widget-content">
                        <div className="padding-20 padding-top-10 padding-bottom-5">
                            <div className="clearfix">
                                <div className="pull-left padding-vertical-10">
                                    <i className="icon md-view-list font-size-24 vertical-align-bottom margin-right-5" />
                                    Ready For Payment
                                </div>
                                <span
                                    className="pull-right font-size-20"
                                    id="Paid"
                                >
                                    {this.state.currentData.Paid || (
                                        <img
                                            src={loadingImg}
                                            style={{
                                                width: "28px",
                                                height: "28px"
                                            }}
                                        />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    };

    renderChart = () => {
        return (
            <div
                key="Chart"
                className="col-sm-12"
                style={{
                    marginBottom: "-50px",
                    marginTop: "20px",
                    width: "100%",
                    height: 270
                }}
            >
                <ResponsiveContainer>
                    <LineChart
                        width={500}
                        height={300}
                        data={this.state.chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="DNReady"
                            stroke="#4271b2"
                            activeDot={{
                                r: 8
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="InvApproved"
                            stroke="#f48223"
                            activeDot={{
                                r: 8
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="InvCertified"
                            stroke="#38a22e"
                            activeDot={{
                                r: 8
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="InvOnHold"
                            stroke="#cb2e32"
                            activeDot={{
                                r: 8
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Paid"
                            stroke="#955fbc"
                            activeDot={{
                                r: 8
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    };
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
                elements.push(this.renderEvoWithNoBPI());
            }

            if (UserGroupID !== "004") {
                elements.push(this.renderBPI());
            }
            elements.push(this.renderChart());
        }

        return elements;
    };
    render() {
        const UserGroupID = Auth.getUserGroupID();
        const UserGroup = Auth.getUserGroup();
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
                                                                                    "(?:(https?)://([^s<]+)|(www.[^s<]+?.[^s<]+))(?<![.,:])";
                                                                                const str = e.News.replace(
                                                                                    new RegExp(
                                                                                        url,
                                                                                        "i"
                                                                                    ),
                                                                                    '<a href="$0" target="_blank" title="$0">$0</a>'
                                                                                );
                                                                                return (
                                                                                    <p
                                                                                        className="news-paragraph"
                                                                                        style={{
                                                                                            textAlign:
                                                                                                "left",
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
