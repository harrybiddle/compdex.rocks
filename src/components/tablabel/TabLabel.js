import React from "react";

export default class TabLabel extends React.Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        style={{
          cursor: "pointer",
          textAlign: "center",
          ...(this.props.isActive ? { textDecoration: "underline" } : {})
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
