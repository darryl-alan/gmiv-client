import React, { Component } from "react";

class FakeLink extends Component {
  state = {};
  render() {
    const { classNames, scrollTo, children, onClick, ...rest } = this.props;
    return (
      <a
        {...rest}
        className={"button-link " + (classNames || "")}
        onClick={() => {
          if (scrollTo) {
            document.getElementById(scrollTo).scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "nearest"
            });
          }
          if (onClick) {
            onClick();
          }
        }}
      >
        {children}
      </a>
    );
  }
}

export default FakeLink;
