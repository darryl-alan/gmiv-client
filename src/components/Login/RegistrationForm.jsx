import React, { Component } from "react";
import Joi from "joi-browser";
import SweetAlert from "sweetalert2-react";
import http from "../common/http";
const apiUrl = process.env.REACT_APP_API_URL;
class RegistrationForm extends Component {
    state = {
        ajaxInProgress: false,
        data: {
            Vendor_Code: "",
            Name: "",
            Job_Title: "",
            Email: "",
            HP: "",
            EXT: ""
        },
        error: "", // for request errors
        errors: {},
        sweetAlert: {
            show: false,
            type: "",
            title: "",
            text: "",
            onConfirm: null
        }
    };

    schema = {
        Vendor_Code: Joi.string()
            .regex(/^\d+$/)
            .length(10)
            .required()
            .label("Vendor Code"),
        Name: Joi.string()
            .required()
            .max(50),
        Email: Joi.string()
            .allow(null, "")
            .email({ minDomainAtoms: 1 })
            .max(100),
        Job_Title: Joi.string()
            .allow(null, "")
            .label("Job Title")
            .max(30),
        HP: Joi.string()
            .allow(null, "")
            .max(30),
        EXT: Joi.string()
            .allow(null, "")
            .max(30)
            .label("Ext")
    };

    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, {
            abortEarly: false
        });

        if (!result.error) return null;

        const errors = {};

        result.error.details.forEach(e => (errors[e.path[0]] = e.message));
        return errors;
    };

    handleChange = e => {
        const data = { ...this.state.data };
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ data });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.setState({ ajaxInProgress: true });
        // call server
        try {
            const res = await http.post(
                apiUrl +
                    "/index.php?type=api&controller=Login&action=registerFin",
                this.state.data,
                "text"
            );

            if (!/^success\|index.php\?.+/.test(res.data)) {
                throw new Error({
                    response: { data: "Invalid response received" }
                });
            }

            const url = res.data.split("|")[1];

            this.setState({
                sweetAlert: {
                    show: true,
                    type: "success",
                    title: "Success",
                    text:
                        "Data registered, please submit documents for approval",
                    onConfirm: () => {
                        const s = { ...this.state.sweetAlert };
                        s.show = false;
                        this.setState({ sweetAlert: s });
                        window.open(
                            "#/view?path=" +
                                encodeURIComponent(apiUrl + "/" + url),
                            "_blank"
                        );
                    }
                },
                data: {
                    Vendor_Code: "",
                    Name: "",
                    Job_Title: "",
                    Email: "",
                    HP: "",
                    EXT: ""
                },
                error: "",
                errors: {}
            });
        } catch (e) {
            if (e.response && e.response.data) {
                this.setState({ error: e.response.data });
            }
        }
        this.setState({ ajaxInProgress: false });
    };

    render() {
        return (
            <section className="box-content box-2 box-style" id="menu">
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
                            <h2>Registration</h2>
                            <div className="intro">
                                Registering eFinance User
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <form
                            id="eProc-form"
                            method="post"
                            onSubmit={this.handleSubmit}
                        >
                            <div
                                className="col-md-12 wow fadeInUp"
                                data-wow-delay="0.3s"
                            >
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <div className="col-sm-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="Vendor_Code"
                                                maxLength="10"
                                                placeholder="Vendor Code"
                                                value={
                                                    this.state.data.Vendor_Code
                                                }
                                                onChange={this.handleChange}
                                            />
                                            {this.state.errors.Vendor_Code && (
                                                <div className="alert alert-danger">
                                                    {
                                                        this.state.errors
                                                            .Vendor_Code
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <div className="col-sm-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="Name"
                                                maxLength="50"
                                                placeholder="Name"
                                                value={this.state.data.Name}
                                                onChange={this.handleChange}
                                            />
                                            {this.state.errors.Name && (
                                                <div className="alert alert-danger">
                                                    {this.state.errors.Name}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <div className="col-sm-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="Email"
                                                maxLength="100"
                                                placeholder="Email"
                                                value={this.state.data.Email}
                                                onChange={this.handleChange}
                                            />
                                            {this.state.errors.Email && (
                                                <div className="alert alert-danger">
                                                    {this.state.errors.Email}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <div className="col-sm-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="HP"
                                                maxLength="30"
                                                placeholder="HP"
                                                value={this.state.data.HP}
                                                onChange={this.handleChange}
                                            />
                                            {this.state.errors.HP && (
                                                <div className="alert alert-danger">
                                                    {this.state.errors.HP}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <div className="col-sm-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="EXT"
                                                maxLength="30"
                                                placeholder="Ext"
                                                value={this.state.data.EXT}
                                                onChange={this.handleChange}
                                            />
                                            {this.state.errors.EXT && (
                                                <div className="alert alert-danger">
                                                    {this.state.errors.EXT}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <div className="col-sm-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="Job_Title"
                                                maxLength="30"
                                                placeholder="Job Title"
                                                value={
                                                    this.state.data.Job_Title
                                                }
                                                onChange={this.handleChange}
                                            />
                                            {this.state.errors.Job_Title && (
                                                <div className="alert alert-danger">
                                                    {
                                                        this.state.errors
                                                            .Job_Title
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-md-12 wow fadeInUp"
                                data-wow-delay="0.3s"
                            >
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <div className="col-sm-12">
                                            <button
                                                type="submit"
                                                className="btn btn-4 btn-block"
                                                name="btnBooking"
                                                id="FIN_btnSubmit"
                                                disabled={
                                                    this.state.ajaxInProgress
                                                }
                                            >
                                                SUBMIT
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
