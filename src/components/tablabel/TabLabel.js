import React from "react";
import { headerStyle } from "../common.module.css";

export default class TabLabel extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className={headerStyle}
        style={{
          // border
          borderWidth: "0px",
          borderBottomWidth: this.props.isActive ? "2px" : "0px",
          borderBottomColor: "red",
          // size and padding
          flexGrow: 1,
          padding: "6px 12px",
          minHeight: "48px",
          // cursor
          cursor: "pointer",
          // text
          fontWeight: "500",
          lineHeight: "1.43",
          letterSpacing: "0.01071em",
          textAlign: "center",
          verticalAlign: "middle",
          textTransform: "uppercase"
        }}
      >
        {this.props.children}
      </button>
    );
  }
}
