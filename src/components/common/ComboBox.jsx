import React, { Component } from "react";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { filterBy } from "@progress/kendo-data-query";
class CB extends Component {
    state = { data: [] };
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ data: nextProps.data });
        }
    }

    filterChange = event => {
        this.setState({
            data: this.filterData(event.filter)
        });
    };

    filterData(filter) {
        const data = this.props.data.slice();
        return filterBy(data, filter);
    }

    render() {
        const { style, allowCustom, data, ...rest } = this.props;
        return (
            <ComboBox
                style={style || { width: "400px", marginLeft: "7px" }}
                allowCustom={allowCustom || false}
                filterable={true}
                data={this.state.data}
                onFilterChange={this.filterChange}
                {...rest}
            />
        );
    }
}

export default CB;
