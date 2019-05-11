import React, { Component } from "react";
import Joi from "joi-browser";
import SweetAlert from "sweetalert2-react";
import http from "./common/http";
import Utils from "./common/Utils";
const apiUrl = process.env.REACT_APP_API_URL;
class MyAccount extends Component {
    state = {
        data: {
            U_PIC_ID: "",
            U_PIC_Name: "",
            Passwords: "",
            Email: "",
            UserGroup_Id: "",
            UserGroup: "",
            Hp: "",
            Job_Title: "",
            Vendor_Code: "",
            NPWP: "",
            Vendor_Name: "",
            Addresses: "",
            City: "",
            District: "",
            Telp: "",
            Post_Code: "",
            Fax: "",
            Ext: ""
        },
        errors: {
            U_PIC_ID: "",
            U_PIC_Name: "",
            Passwords: "",
            Email: "",
            UserGroup_Id: "",
            UserGroup: "",
            Hp: "",
            Job_Title: "",
            Vendor_Code: "",
            NPWP: "",
            Vendor_Name: "",
            Addresses: "",
            City: "",
            District: "",
            Telp: "",
            Post_Code: "",
            Fax: "",
            Ext: ""
        },
        sweetAlert: {
            show: false,
            type: "success",
            title: "Success",
            text: "Data saved"
        }
    };

    schema = {
        U_PIC_ID: Joi.string()
            .required()
            .max(50)
            .label("User ID"),
        U_PIC_Name: Joi.string()
            .required()
            .max(50)
            .label("Name"),
        Passwords: Joi.string().allow(null, ""),
        Email: Joi.string()
            .required()
            .email({ minDomainAtoms: 1 })
            .max(100),
        UserGroup_Id: Joi.string().allow(null, ""),
        UserGroup: Joi.string().allow(null, ""),
        Hp: Joi.string()
            .allow(null, "")
            .max(30),
        Job_Title: Joi.string()
            .allow(null, "")
            .label("Job Title")
            .max(30),
        Vendor_Code: Joi.string()
            .allow(null, "")
            // .regex(/^\d+$/)
            // .length(10)
            // .required()
            .label("Vendor Code"),
        NPWP: Joi.string()
            .allow(null, "")
            // .regex(/^\d+$/)
            // .length(15)
            // .required()
            .label("NPWP"),
        Vendor_Name: Joi.string()
            .allow(null, "")
            // .max(50)
            // .required()
            .label("Vendor Name"),
        Addresses: Joi.string()
            .allow(null, "")
            // .max(200)
            // .required()
            .label("Address"),
        City: Joi.string()
            .allow(null, "")
            // .max(30)
            // .required()
            .label("City"),
        District: Joi.string()
            .allow(null, "")
            // .max(30)
            // .required()
            .label("District"),
        Telp: Joi.string()
            .allow(null, "")
            // .max(30)
            // .required()
            .label("Telp"),
        Post_Code: Joi.string()
            .allow(null, "")
            // .max(5)
            // .required()
            .label("Post Code"),
        Fax: Joi.string()
            .allow(null, "")
            // .max(30)
            // .required()
            .label("Fax"),
        Ext: Joi.string()
            .allow(null, "")
            .max(30)
            .label("Ext")
    };

    componentDidMount() {
        this.loadAccount();
    }

    loadAccount = async () => {
        try {
            const res = await http.post(
                apiUrl + "/index.php?type=api&controller=MyAccount&action=readAccount",
                {},
                "json"
            );
            const data = Utils.unnullify(res.data);

            this.setState({ data: data });
        } catch (e) {
            if (e.response && e.response.data) {
                this.setState({ error: e.response.data });
            }
        }
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

    handleSubmit = async e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.setState({ ajaxInProgress: true, error: "" });
        // call server
        try {
            const res = await http.post(
                apiUrl + "/index.php?type=api&controller=MyAccount&action=save",
                this.state.data,
                "text"
            );

            if (res.data != "success") {
                throw new Error({
                    response: { data: res.data }
                });
            }

            this.setState({
                sweetAlert: {
                    show: true,
                    type: "success",
                    title: "Success",
                    text: "Data saved"
                },
                error: "",
                errors: {}
            });
        } catch (e) {
            console.log(e);
            if (e.response && e.response.data) {
                this.setState({ error: e.response.data });
            }
        }
        this.setState({ ajaxInProgress: false });
    };

    handleChange = e => {
        const data = { ...this.state.data };
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ data });
    };
    render() {
        return (
            <div className="page-main">
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
                <div className="page-content padding-10">
                    <div className="" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="myModalLabel">
                                    My Account
                                </h4>
                            </div>
                            <div className="modal-body" style={{ marginBottom: "-50px" }}>
                                <div className="panel">
                                    <div
                                        className="panel-body"
                                        style={{ height: "455px" }}
                                        data-plugin="scrollable"
                                        data-skin="scrollable-shadow"
                                    >
                                        <div data-role="container">
                                            <div data-role="content">
                                                <form
                                                    className="form-horizontal"
                                                    onSubmit={this.handleSubmit}
                                                >
                                                    <div className="col-md-5">
                                                        <div className="form-group form-material col-md-12 padding-0">
                                                            <label className="col-sm-2 control-label">
                                                                User ID
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="U_PIC_ID"
                                                                    value={this.state.data.U_PIC_ID}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-12 padding-0">
                                                            <label className="col-sm-2 control-label">
                                                                Name
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="U_PIC_Name"
                                                                    value={this.state.data.U_PIC_Name}
                                                                    onChange={this.handleChange}
                                                                    maxLength="50"
                                                                />
                                                                {this.state.errors.U_PIC_Name && (
                                                                    <div className="alert alert-danger">
                                                                        {this.state.errors.U_PIC_Name}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-12 padding-0">
                                                            <label className="col-sm-2 control-label">
                                                                Password
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input
                                                                    type="password"
                                                                    className="form-control"
                                                                    name="Passwords"
                                                                    placeholder="(unchanged)"
                                                                    value={this.state.data.Password}
                                                                    onChange={this.handleChange}
                                                                    maxLength="512"
                                                                />
                                                                {this.state.errors.Passwords && (
                                                                    <div className="alert alert-danger">
                                                                        {this.state.errors.Passwords}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-12 padding-0">
                                                            <label className="col-sm-2 control-label">
                                                                Email
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    name="Email"
                                                                    value={this.state.data.Email}
                                                                    onChange={this.handleChange}
                                                                    maxLength="100"
                                                                />
                                                                {this.state.errors.Email && (
                                                                    <div className="alert alert-danger">
                                                                        {this.state.errors.Email}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-6 padding-0">
                                                            <label className="col-sm-4 control-label">
                                                                UserGroup
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="UserGroup_Id"
                                                                    value={this.state.data.UserGroup_Id}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-group form-material col-md-6 padding-0">
                                                            <label className="col-sm-4 control-label">
                                                                Hp
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="Hp"
                                                                    onChange={this.handleChange}
                                                                    value={this.state.data.Hp}
                                                                    maxLength="30"
                                                                />
                                                                {this.state.errors.Hp && (
                                                                    <div className="alert alert-danger">
                                                                        {this.state.errors.Hp}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-6 padding-0">
                                                            <label className="col-sm-4 control-label">
                                                                Job Title
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="Job_Title"
                                                                    onChange={this.handleChange}
                                                                    value={this.state.data.Job_Title}
                                                                    maxLength="30"
                                                                />
                                                                {this.state.errors.Job_Title && (
                                                                    <div className="alert alert-danger">
                                                                        {this.state.errors.Job_Title}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="form-group form-material col-md-6 padding-0">
                                                            <label className="col-sm-4 control-label">
                                                                Vendor No.
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="Vendor_Code"
                                                                    value={this.state.data.Vendor_Code}
                                                                    disabled
                                                                    maxLength="10"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-6 padding-0">
                                                            <label className="col-sm-3 control-label">
                                                                NPWP
                                                            </label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="NPWP"
                                                                    value={this.state.data.NPWP}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-12 padding-0">
                                                            <label className="col-sm-2 control-label">
                                                                Vendor Name
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="Vendor_Name"
                                                                    disabled
                                                                    value={this.state.data.Vendor_Name}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-12 padding-0">
                                                            <label className="col-sm-2 control-label">
                                                                Addresses
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="Addresses"
                                                                    disabled
                                                                    value={this.state.data.Addresses}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-6 padding-0">
                                                            <label className="col-sm-4 control-label">
                                                                City
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="City"
                                                                    disabled
                                                                    value={this.state.data.City}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-6 padding-0">
                                                            <label className="col-sm-4 control-label">
                                                                District
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="District"
                                                                    disabled
                                                                    value={this.state.data.District}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-6 padding-0">
                                                            <label className="col-sm-4 control-label">
                                                                Telp
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="Telp"
                                                                    disabled
                                                                    value={this.state.data.Telp}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-6 padding-0">
                                                            <label className="col-sm-4 control-label">
                                                                Post Code
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="Post_Code"
                                                                    disabled
                                                                    value={this.state.data.Post_Code}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-6 padding-0">
                                                            <label className="col-sm-4 control-label">
                                                                Fax
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="Fax"
                                                                    disabled
                                                                    value={this.state.data.Fax}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-material col-md-6 padding-0">
                                                            <label className="col-sm-4 control-label">
                                                                Ext
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="Ext"
                                                                    onChange={this.handleChange}
                                                                    value={this.state.data.Ext}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="form-group form-material col-md-12"
                                                            style={{
                                                                marginBottom: "-10px"
                                                            }}
                                                        >
                                                            <button
                                                                type="submut"
                                                                className="btn btn-primary pull-right margin-top-10 margin-right-15"
                                                                disabled={this.state.ajaxInProgress}
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="clearfix" />
                                                    <div className="col-xs-12" style={{ marginTop: "20px" }}>
                                                        {this.state.error && (
                                                            <div className="alert alert-danger">
                                                                {this.state.error}
                                                            </div>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyAccount;
