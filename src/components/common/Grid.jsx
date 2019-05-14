import React, { Component } from "react";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
class GD extends Component {
    state = { skip: 0, take: 10 };
    excelExport;

    pageChange = event => {
        this.setState({
            skip: event.page.skip,
            take: event.page.take
        });
    };

    render() {
        const { exportable, exportFile, toolbar, data, read, children, ...rest } = this.props;
        return (
            <ExcelExport
                data={data}
                fileName="DNFraud.xlsx"
                ref={exporter => {
                    this.excelExport = () => exporter.save();
                }}
            >
                <Grid
                    data={data.slice(this.state.skip, this.state.take + this.state.skip)}
                    skip={this.state.skip}
                    take={this.state.take}
                    resizable={true}
                    total={data.length}
                    pageable={true}
                    onPageChange={this.pageChange}
                    {...rest}
                >
                    <GridToolbar>
                        {exportable && (
                            <button
                                data-tip="Export Excel"
                                className="k-button k-primary"
                                onClick={this.excelExport}
                            >
                                <i className="k-icon k-i-file-excel" />
                            </button>
                        )}
                        {toolbar}
                        <button className="pull-right k-button k-primary" onClick={read}>
                            <i className="k-icon k-i-reload" />
                        </button>
                    </GridToolbar>
                    {children}
                </Grid>
            </ExcelExport>
        );
    }
}

export default GD;
