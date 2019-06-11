import React, { Component } from "react";

class InputText extends Component {
    state = {};
    render() {
        const { name, maxLength, placeholder, value, onChange, error, ...rest } = this.props;
        return (
            <>
                <input
                    type="text"
                    className="form-control"
                    name={name}
                    maxLength={maxLength || "4000"}
                    placeholder={placeholder || name}
                    value={value}
                    onChange={onChange}
                    {...rest}
                />
                {error && <div className="alert alert-danger">{error}</div>}
            </>
        );
    }
}

export default InputText;
