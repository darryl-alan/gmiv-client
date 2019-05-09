import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "../common/Auth";
import FakeLink from "../common/FakeLink";
import avatar from "../../asset_theme/global/portraits/person.png";
import loadingImg from "../../asset/KendoUI/styles/Default/loading-image.gif";
class TopNav extends Component {
    state = { dropdownOpen: false };
    componentDidMount() {
        this.loadNotifications();
    }

    loadNotifications = () => {
        // TODO
        // $(function(){
        // 	var $countDNError = $("#countDNError");
        // 	var $countCertificate = $("#countCertificate");
        // 	$.ajax({
        // 		method: 'GET',
        // 		url: <?= json_encode('index.php?' . encryptQS('type=api&controller=Home&action=read')) ?>,
        // 		dataType: 'text',
        // 		data: {}
        // 	}).done(function( data, textStatus, jqXHR ) {
        // 		try{
        // 			data = JSON.parse(data);
        // 		}
        // 		catch(e){
        // 			swal('Error', data, 'error');
        // 			console.log(jqXHR, e);
        // 			return;
        // 		}
        // 		$countDNError.html(data.DNError);
        // 		$countCertificate.html(data.Certificate);
        // 	}).fail(function( jqXHR, textStatus, errorThrown ) {
        // 		swal('Error', errorThrown + (jqXHR.responseText !== '' ? ': ' + jqXHR.responseText : ''), 'error');
        // 		console.log(jqXHR);
        // 	});
        // });
    };

    handleToggleDropDown = e => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    };

    handleToggleMenubar = e => {
        let classes = document.body.className.split(/\s+/);
        let index = classes.indexOf("site-menubar-open");
        if (index < 0) {
            classes.push("site-menubar-open");
        } else {
            classes.splice(index, 1);
        }
        document.body.className = classes.join(" ");
    };
    render() {
        return (
            <nav
                className="site-navbar navbar navbar-inverse navbar-fixed-top navbar-mega"
                role="navigation"
                style={{ height: "70px" }}
            >
                <div className="navbar-container container-fluid">
                    <div
                        className="navbar-collapse navbar-collapse-toolbar"
                        id="site-navbar-collapse"
                    >
                        <ul className="nav navbar-toolbar">
                            <li id="toggleMenubar">
                                <FakeLink
                                    data-toggle="menubar"
                                    role="button"
                                    onClick={this.handleToggleMenubar}
                                >
                                    <i className="icon hamburger hamburger-arrow-left">
                                        <span className="sr-only">
                                            Toggle menubar
                                        </span>
                                        <span className="hamburger-bar" />
                                    </i>
                                </FakeLink>
                            </li>
                        </ul>
                        <ul className="nav navbar-toolbar navbar-right navbar-toolbar-right">
                            {Auth.getUserID() == "001" ||
                            Auth.getVendorCode() == "" ? (
                                <li
                                    className="dropdown tooltip-danger tooltip-scale"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    data-original-title="DN Error Log"
                                >
                                    <a
                                        href="#"
                                        data-placement="bottom"
                                        data-original-title="DN Error Log"
                                    >
                                        <i
                                            className="icon md-notifications"
                                            style={{
                                                fontSize: "22px",
                                                color: "#ffff00"
                                            }}
                                            aria-hidden="true"
                                        >
                                            <span
                                                className="badge badge-warning up"
                                                id="countDNError"
                                            >
                                                <img
                                                    src={loadingImg}
                                                    style={{
                                                        width: "16px",
                                                        height: "16px"
                                                    }}
                                                />
                                            </span>
                                        </i>
                                    </a>
                                </li>
                            ) : null}
                            <li
                                className={
                                    "dropdown" +
                                    (this.state.dropdownOpen ? " open" : "")
                                }
                            >
                                <FakeLink
                                    className="navbar-avatar dropdown-toggle"
                                    data-toggle="dropdown"
                                    onClick={this.handleToggleDropDown}
                                    data-animation="scale-up"
                                    style={{ paddingTop: "10px" }}
                                    role="button"
                                >
                                    <span className="avatar avatar-online">
                                        <img src={avatar} />
                                        <i />
                                    </span>
                                </FakeLink>
                                <ul
                                    className="dropdown-menu"
                                    role="menu"
                                    style={{ marginTop: 0 }}
                                >
                                    <li role="presentation">
                                        <Link to="/myaccount">
                                            <i className="icon md-account" />
                                            {Auth.getUserID().toUpperCase()}
                                        </Link>
                                    </li>
                                    <li
                                        className="divider"
                                        role="presentation"
                                    />
                                    <li role="presentation">
                                        <Link className="red-400" to="/logout">
                                            <i
                                                className="icon md-power red-400"
                                                aria-hidden="true"
                                            />{" "}
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default TopNav;
