import React, { Component } from "react";

class FakeLink extends Component {
  state = {};
  render() {
    return (
      <a
        className={"button-link " + (this.props.className || "")}
        onClick={() => {
          if (this.props.scrollTo) {
            document.getElementById(this.props.scrollTo).scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "nearest"
            });
          }
        }}
      >
        {this.props.children}
      </a>
    );
  }
}

export default FakeLink;
