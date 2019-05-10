import React, { Component } from "react";
import Joi from "joi-browser";
import http from "../common/http";
import SweetAlert from "sweetalert2-react";
import Auth from "../common/Auth";
const apiUrl = process.env.REACT_APP_API_URL;
class LoginForm extends Component {
    state = {
        loginInProgress: false,
        resetInProgress: false,
        error: "",
        errorReset: "",
        data: { UserID: "", UserPassword: "" },
        dataReset: { UserID: "", Email: "" },
        errors: {},
        resetErrors: {},
        sweetAlert: {
            show: false,
            type: "",
            title: "",
            text: "",
            onConfirm: null
        }
    };

    schemaLogin = {
        UserID: Joi.string()
            .required()

            .max(50)
            .label("Username"),
        UserPassword: Joi.string()
            .required()
            // .allow(null, "")
            .label("Password")
    };
    schemaReset = {
        UserID: Joi.string()
            .required()

            .max(50)
            .label("Username"),
        Email: Joi.string()
            .required()
            .email({ minDomainAtoms: 1 })
            .max(100)
    };

    validate = () => {
        const result = Joi.validate(this.state.data, this.schemaLogin, {
            abortEarly: false
        });

        if (!result.error) return null;

        const errors = {};

        result.error.details.forEach(e => (errors[e.path[0]] = e.message));
        return errors;
    };

    validateReset = () => {
        const result = Joi.validate(this.state.dataReset, this.schemaReset, {
            abortEarly: false
        });

        if (!result.error) return null;

        const errors = {};

        result.error.details.forEach(e => (errors[e.path[0]] = e.message));
        return errors;
    };

    handleSubmit = async e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        const { UserID, UserPassword } = this.state.data;
        let res;
        this.setState({ loginInProgress: true, error: "" });
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
            this.setState({ loginInProgress: false });
            return;
        }

        try {
            Auth.storeToken(res.data);
            this.setState({ error: "" });
            this.setState({ loginInProgress: false });
            this.props.history.push("/");
        } catch (e) {
            if (e.message) {
                this.setState({ error: e.message });
            }
            this.setState({ loginInProgress: false });
        }
    };

    handleReset = async e => {
        e.preventDefault();
        const errors = this.validateReset();
        this.setState({ resetErrors: errors || {} });
        console.log(this.state);
        if (errors) return;

        const { UserID, Email } = this.state.dataReset;
        let res;
        this.setState({ resetInProgress: true, errorReset: "" });
        try {
            res = await http.post(
                apiUrl +
                    "/index.php?type=api&controller=Login&action=ResetPassword",
                { UserID, Email },
                "text"
            );
            if (res.data != "success") {
                throw new Error({ response: { data: res.data } });
            }
            this.setState({
                sweetAlert: {
                    show: true,
                    type: "success",
                    title: "Success",
                    text: "Password reset, please check your email"
                },
                dataReset: {
                    UserID: "",
                    Email: ""
                },
                errorReset: "",
                resetErrors: {}
            });
        } catch (e) {
            if (e.response && e.response.data) {
                this.setState({ errorReset: e.response.data });
            }
        }

        this.setState({ resetInProgress: false });
    };

    handleChange = e => {
        const data = { ...this.state.data };
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ data });
    };

    handleChangeReset = e => {
        const data = { ...this.state.dataReset };
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ dataReset: data });
    };

    render() {
        return (
            <section className="box-content box-4 box-style" id="portfolio">
                <SweetAlert
                    show={this.state.sweetAlert.show}
                    type={this.state.sweetAlert.type}
                    title={this.state.sweetAlert.title}
                    text={this.state.sweetAlert.text}
                    onConfirm={
                        this.state.sweetAlert.onConfirm ||
                        (() => {
                            const s = { ...this.state.sweetAlert };
                            s.show = false;
                            this.setState({ sweetAlert: s });
                        })
                    }
                />
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
                                            />
                                            {this.state.errors.UserID && (
                                                <div className="alert alert-danger">
                                                    {this.state.errors.UserID}
                                                </div>
                                            )}
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
                                                value={
                                                    this.state.data.UserPassword
                                                }
                                                onChange={this.handleChange}
                                            />
                                            {this.state.errors.UserPassword && (
                                                <div className="alert alert-danger">
                                                    {
                                                        this.state.errors
                                                            .UserPassword
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button
                                            type="submit"
                                            className="btn btn-4 btn-block"
                                            disabled={
                                                this.state.loginInProgress
                                            }
                                        >
                                            LOGIN
                                        </button>
                                        {this.state.error && (
                                            <div
                                                className="alert alert-danger"
                                                style={{
                                                    marginTop: "10px"
                                                }}
                                            >
                                                {this.state.error}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-1" />
                        <div className="col-md-3" id="forgot">
                            <div className="row">
                                <div className="box-content box-1">
                                    <form onSubmit={this.handleReset}>
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
                                                                placeholder="User Name"
                                                                name="UserID"
                                                                value={
                                                                    this.state
                                                                        .dataReset
                                                                        .UserID
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleChangeReset
                                                                }
                                                            />
                                                            {this.state
                                                                .resetErrors
                                                                .UserID && (
                                                                <div className="alert alert-danger">
                                                                    {
                                                                        this
                                                                            .state
                                                                            .resetErrors
                                                                            .UserID
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1" />
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="col-md-1" />
                                                    <div className="col-md-10">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control input-xs"
                                                                placeholder="Email"
                                                                name="Email"
                                                                value={
                                                                    this.state
                                                                        .dataReset
                                                                        .Email
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleChangeReset
                                                                }
                                                            />
                                                            {this.state
                                                                .resetErrors
                                                                .Email && (
                                                                <div className="alert alert-danger">
                                                                    {
                                                                        this
                                                                            .state
                                                                            .resetErrors
                                                                            .Email
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1" />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-2 btn-sm"
                                                disabled={
                                                    this.state.resetInProgress
                                                }
                                            >
                                                Reset
                                            </button>
                                            {this.state.errorReset && (
                                                <div
                                                    className="alert alert-danger"
                                                    style={{
                                                        marginTop: "10px"
                                                    }}
                                                >
                                                    {this.state.errorReset}
                                                </div>
                                            )}
                                        </div>
                                    </form>
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
