import React, { Component } from "react";
import { GridColumn as Column } from "@progress/kendo-react-grid";
import Grid from "../common/Grid";

import ReactTooltip from "react-tooltip";
import df from "dateformat";
import http from "../common/http";
import Utils from "../common/Utils";
import "@progress/kendo-theme-default/dist/all.css";
import Auth from "../common/Auth";
import ComboBox from "../common/ComboBox";

const apiUrl = process.env.REACT_APP_API_URL;
class DNFraud extends Component {
    state = { grid: [], vendors: [], Vendor_Code: "" };

    componentDidMount() {
        this.loadVendors();
        this.loadGrid();
    }

    loadVendors = async () => {
        try {
            const res = await http.post(
                apiUrl + "/index.php?type=api&controller=MasterVendor&action=readDropDown",
                { Vendor_Code: Auth.getVendorCode() },
                "json"
            );

            this.setState({ vendors: res.data.data });
        } catch (e) {
            if (e.response && e.response.data) {
                this.setState({ error: e.response.data });
            }
        }
    };

    loadGrid = async () => {
        try {
            console.log(this.state.Vendor_Code);
            const res = await http.post(
                apiUrl + "/index.php?type=api&controller=DNFraud&action=read",
                { Vendor_Code: this.state.Vendor_Code },
                "json"
            );

            this.setState({ grid: res.data.data });
        } catch (e) {
            if (e.response && e.response.data) {
                this.setState({ error: e.response.data });
            }
        }
    };

    handleChange = e => {
        const Vendor_Code = e.target.value ? e.target.value.Vendor_Code : "";
        this.setState(
            {
                Vendor_Code: Vendor_Code
            },
            () => this.loadGrid()
        );
    };

    render() {
        return (
            <div className="page-main">
                <ReactTooltip />
                <div className="page-content padding-10">
                    <Grid
                        exportable={true}
                        exportFile="DNFraud.xlsx"
                        toolbar={
                            <ComboBox
                                style={{ width: "400px", marginLeft: "7px" }}
                                data={this.state.vendors}
                                textField="Vendor"
                                dataItemKey="Vendor_Code"
                                autoWidth={true}
                                allowCustom={false}
                                // value={this.state.Vendor_Code}
                                onChange={this.handleChange}
                            />
                        }
                        data={this.state.grid}
                        read={this.loadGrid}
                    >
                        <Column title="Order">
                            <Column field="Plant" title="Plant" width="55px" />
                            <Column field="PO_No" title="PO_No" width="110px" />
                            <Column field="PO_Item" title="PO_Item" width="70px" />
                            <Column field="DN_No" title="DN_No" width="160px" />
                            <Column field="HeaderText" title="HeaderText" width="220px" />
                            <Column field="Material_No" title="Material_No" width="180px" />
                            <Column field="Material_Desc" title="Material_Desc" width="220px" />
                            <Column
                                field="Qty"
                                title="Qty"
                                width="70px"
                                cell={props => (
                                    <td className="text-right">{Utils.format(props.dataItem.Qty, 0)}</td>
                                )}
                            />
                            <Column field="UoM" title="UoM" width="55px" />
                            <Column
                                field="Price_Unit"
                                title="Price_Unit"
                                width="120px"
                                cell={props => (
                                    <td className="text-right">{Utils.format(props.dataItem.Price_Unit)}</td>
                                )}
                            />
                        </Column>
                        <Column title="GR">
                            <Column field="GR_No" title="No" width="120px" />
                            <Column field="GR_Item" title="Item" width="60px" />
                            <Column
                                field="GR_Scan_Date"
                                title="Scan Date"
                                width="120px"
                                cell={props => (
                                    <td className="text-right">
                                        {df(props.dataItem.GR_Scan_Date, "dd/mm/yyyy")}
                                    </td>
                                )}
                            />
                        </Column>

                        <Column title="Error">
                            <Column field="Error_Msg" title="Message" width="150px" />
                            <Column
                                field="Entry_Date"
                                title="Date"
                                width="120px"
                                cell={props => (
                                    <td className="text-right">
                                        {df(props.dataItem.Entry_Date, "dd/mm/yyyy")}
                                    </td>
                                )}
                            />
                        </Column>
                        <Column field="Vendor_Name" title="Vendor_Name" width="240px" />
                        {/* <Column
                            field="Discontinued"
                            width="120px"
                            cell={props => (
                                <td>
                                    <input disabled type="checkbox" checked={props.dataItem[props.field]} />
                                </td>
                            )}
                        /> */}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default DNFraud;
