import React, { Component } from "react";
import Joi from "joi-browser";
import http from "../common/http";
import Auth from "../common/Auth";
const apiUrl = process.env.REACT_APP_API_URL;
class LoginForm extends Component {
    state = {
        loginInProgress: false,
        resetInProgress: false,
        error: "",
        data: { UserID: "", UserPassword: "" },
        dataReset: { UserID: "", Email: "" },
        errors: {},
        resetErrors: {}
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

    validate = () => {
        const result = Joi.validate(this.state.data, this.schemaLogin, {
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
            this.props.history.push("/");
        } catch (e) {
            if (e.message) {
                this.setState({ error: e.message });
            }
        }
        this.setState({ loginInProgress: false });
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
                                        <a
                                            className="btn btn-2 btn-sm"
                                            href="#"
                                            id="btnReset"
                                        >
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
