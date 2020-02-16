import React from "react";

export default class Splash extends React.Component {
  render() {
    return (
      <div style={{ height: "100%" }}>
        <div
          style={{
            height: "100%",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <div
            style={{
              flexGrow: 1,
              backgroundColor: "grey",
              maxHeight: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <h1 style={{ margin: "0px" }}>Compdex.Rocks</h1>
            <h3>Predict IFSC Climbing Comps</h3>
          </div>
          <div
            style={{
              flexGrow: 3,
              maxHeight: "100px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <h4 style={{ fontStyle: "italic" }}>Choose a competition</h4>
            <button onClick={this.props.onClick}>
              Open random competition
            </button>
          </div>
        </div>
      </div>
    );
  }
}
