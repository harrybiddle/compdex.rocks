import React from "react";
import StackedBar from "../stackedbar/StackedBar";

class RidgelinePlot extends React.Component {
  render() {
    const data = Object.values(this.props);
    console.log("RidgelinePlot props " + JSON.stringify(data));

    const firstPlace = data.map(d => ({
      textColor: "white",
      backgroundColor: d.color,
      label: d.label,
      width: d.scenarios[0]
    }));
    return (
      <div>
        First place <StackedBar {...firstPlace} />
      </div>
    );
  }
}

export default RidgelinePlot;
