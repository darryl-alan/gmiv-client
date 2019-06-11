import React, { Component } from "react";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { orderBy } from "@progress/kendo-data-query";

class GD extends Component {
    state = { skip: 0, take: 10, sort: [] };
    excelExport;

    pageChange = event => {
        this.setState({
            skip: event.page.skip,
            take: event.page.take
        });
    };

    render() {
        const {
            creatable,
            onClickCreate,
            exportable,
            exportFile,
            toolbar,
            data,
            read,
            children,
            ...rest
        } = this.props;
        return (
            <ExcelExport
                data={data}
                fileName="DNFraud.xlsx"
                ref={exporter => {
                    this.excelExport = () => exporter.save();
                }}
            >
                <Grid
                    data={orderBy(
                        data.slice(this.state.skip, this.state.take + this.state.skip),
                        this.state.sort
                    )}
                    skip={this.state.skip}
                    take={this.state.take}
                    resizable={true}
                    sortable={true}
                    sort={this.state.sort}
                    onSortChange={e => {
                        this.setState({
                            sort: e.sort
                        });
                    }}
                    total={data.length}
                    pageable={true}
                    onPageChange={this.pageChange}
                    {...rest}
                >
                    <GridToolbar>
                        {creatable && (
                            <button data-tip="Create" className="k-button k-primary" onClick={onClickCreate}>
                                <i className="k-icon k-i-plus" />
                            </button>
                        )}
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
