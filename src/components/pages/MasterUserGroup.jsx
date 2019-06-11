import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { GridColumn as Column } from "@progress/kendo-react-grid";
import ReactTooltip from "react-tooltip";
import Joi from "joi-browser";
import SweetAlert from "sweetalert2-react";
import Grid from "../common/Grid";
import GridButton from "../common/GridButton";
import http from "../common/http";
import Utils from "../common/Utils";
import df from "dateformat";
import Auth from "../common/Auth";
import InputText from "../common/InputText";
const apiUrl = process.env.REACT_APP_API_URL;
class MasterUserGroup extends Component {
    state = {
        show: false,
        ajaxInProgress: false,
        data: { UserGroup_Id: "", UserGroup: "" },
        error: "", // for request errors
        errors: { UserGroup_Id: "", UserGroup: "" },
        grid: [],
        Vendor_Code: "",
        sweetAlert: {
            show: false,
            type: "",
            title: "",
            text: "",
            onConfirm: null
        }
    };

    schema = {
        UserGroup_Id: Joi.string()
            .regex(/^\d+$/)
            .allow(null, "")
            .label("ID"),
        UserGroup: Joi.string()
            .required()
            .max(50)
    };

    componentDidMount() {
        this.loadGrid();
    }

    handleClose = () => {
        this.setState({ show: false });
    };

    handleChange = e => {
        const data = { ...this.state.data };
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ data });
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

    loadGrid = async () => {
        try {
            const res = await http.post(
                apiUrl + "/index.php?type=api&controller=MasterUserGroup&action=read",
                { UserGroupID: Auth.getUserGroupID() },
                "json"
            );

            this.setState({ grid: res.data.data });
        } catch (e) {
            if (e.response && e.response.data) {
                this.setState({ error: e.response.data });
            }
        }
    };

    handleSubmit = async e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });

        if (errors) return;

        this.setState({ ajaxInProgress: true, error: "" });
        // call server
        try {
            console.log(this.state.data);
            const res = await http.post(
                apiUrl + "/index.php?type=api&controller=MasterUserGroup&action=save",
                this.state.data,
                "text"
            );
            if (res.data != "success") {
                throw new Error({
                    response: { data: "Invalid response received" }
                });
            }

            this.setState({
                show: false,
                sweetAlert: {
                    show: true,
                    type: "success",
                    title: "Success",
                    text: "Data saved"
                },
                data: {
                    UserGroup_Id: "",
                    UserGroup: ""
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

    handleCreate = e => {
        this.setState({
            show: true,
            data: { UserGroup_Id: "", UserGroup: "" },
            error: "",
            errors: { UserGroup_Id: "", UserGroup: "" }
        });
    };

    handleEdit = di => {
        const { UserGroup_Id, UserGroup } = di;
        this.setState({
            show: true,
            data: { UserGroup_Id, UserGroup },
            error: "",
            errors: { UserGroup_Id: "", UserGroup: "" }
        });
    };

    render() {
        return (
            <>
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
                <Modal dialogClassName="modal-90w" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Master User Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="panel">
                            <div className="panel-body">
                                <form className="form-horizontal">
                                    <div className="form-group form-material col-md-6">
                                        <label className="col-sm-3 control-label">UserGroup ID</label>
                                        <div className="col-sm-9">
                                            <InputText
                                                name="UserGroup_Id"
                                                placeholder="ID"
                                                value={this.state.data.UserGroup_Id}
                                                onChange={this.handleChange}
                                                error={this.state.errors.UserGroup_Id}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-material col-md-6">
                                        <label className="col-sm-3 control-label">UserGroup</label>
                                        <div className="col-sm-9">
                                            <InputText
                                                name="UserGroup"
                                                value={this.state.data.UserGroup}
                                                onChange={this.handleChange}
                                                error={this.state.errors.UserGroup}
                                            />
                                        </div>
                                    </div>
                                    <div className="clearfix" />
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={this.handleClose}
                            disabled={this.state.ajaxInProgress}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={this.handleSubmit}
                            disabled={this.state.ajaxInProgress}
                        >
                            Save Changes
                        </Button>
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
                    </Modal.Footer>
                </Modal>

                <div className="page-main">
                    <ReactTooltip />
                    <div className="page-content padding-10">
                        <Grid
                            creatable={true}
                            onClickCreate={this.handleCreate}
                            exportable={true}
                            exportFile="MasterUserGroup.xlsx"
                            data={this.state.grid}
                            read={this.loadGrid}
                        >
                            <Column
                                width="60px"
                                cell={props => {
                                    return (
                                        <td>
                                            <button
                                                className="k-button"
                                                onClick={() => this.handleEdit(props.dataItem)}
                                            >
                                                <i
                                                    className="fa fa-pencil-square-o"
                                                    style={{ fontSize: "18px", color: "#737373" }}
                                                />
                                            </button>
                                        </td>
                                    );
                                }}
                            />
                            <Column field="UserGroup_Id" title="UserGroup_Id" width="100px" />
                            <Column field="UserGroup" title="UserGroup" />
                        </Grid>
                    </div>
                </div>
            </>
        );
    }
}

export default MasterUserGroup;
