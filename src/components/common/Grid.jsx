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
            onClickCreate,
            onClickEdit,
            onClickDelete,
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
                fileName={exportFile || "Export.xlsx"}
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
                        {(onClickCreate || false) && (
                            <button data-tip="Create" className="k-button k-primary" onClick={onClickCreate}>
                                <i className="k-icon k-i-plus" />
                            </button>
                        )}
                        {(exportable || false) && (
                            <button
                                data-tip="Export Excel"
                                className="k-button k-primary"
                                onClick={this.excelExport}
                            >
                                <i className="k-icon k-i-file-excel" />
                            </button>
                        )}
                        {toolbar || <React.Fragment />}
                        <button className="pull-right k-button k-primary" onClick={read}>
                            <i className="k-icon k-i-reload" />
                        </button>
                    </GridToolbar>
                    {onClickEdit && (
                        <Column
                            width="60px"
                            cell={props => {
                                return (
                                    <td>
                                        <button
                                            className="k-button"
                                            onClick={() => onClickEdit(props.dataItem)}
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
                    )}
                    {onClickDelete && (
                        <Column
                            width="60px"
                            cell={props => {
                                return (
                                    <td>
                                        <button
                                            className="k-button"
                                            onClick={() => onClickDelete(props.dataItem)}
                                        >
                                            <i
                                                className="fa fa-trash-o"
                                                style={{ fontSize: "18px", color: "#737373" }}
                                            />
                                        </button>
                                    </td>
                                );
                            }}
                        />
                    )}
                    {children}
                </Grid>
            </ExcelExport>
        );
    }
}

export default GD;
