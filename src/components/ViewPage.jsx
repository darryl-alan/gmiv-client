import React, { Component } from "react";

class ViewPage extends Component {
    state = {};
    render() {
        const qs = this.props.location.search;

        const parsed = new URLSearchParams(qs.substr(1));

        const url = parsed.get("path");

        return (
            <iframe
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,

                    width: "100vw",
                    height: "100vh",
                    overflow: "auto"
                }}
                src={url}
            />
        );
    }
}

export default ViewPage;
