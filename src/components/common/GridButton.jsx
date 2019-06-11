import React, { Component } from "react";
import { GridColumn as Column } from "@progress/kendo-react-grid";
class GridButton extends Component {
    state = {};
    render() {
        const { onClick, iconClass, color } = this.props;
        return (
            <Column
                width="60px"
                cell={props => {
                    return (
                        <td>
                            <button className="k-button" onClick={onClick}>
                                <i
                                    className={iconClass}
                                    style={{ fontSize: "18px", color: color || "#737373" }}
                                />
                            </button>
                        </td>
                    );
                }}
            />
        );
    }
}

export default GridButton;
