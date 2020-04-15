import React from "react";
import { stages } from "../constants";
import { Card } from "react-bootstrap";
import ScenarioExplorerProtector from "../scenarioexplorerprotector/ScenarioExplorerProtector";

export default class Competition extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(JSON.stringify(props));
  }

  render() {
    return (
      <Card>
        <ScenarioExplorerProtector
          athletes={this.state.athletes}
          stages={{
            [stages.QUALIFICATION]: this.state[stages.QUALIFICATION],
            [stages.SPEED]: this.state[stages.SPEED],
            [stages.BOULDER]: this.state[stages.BOULDER],
            [stages.LEAD]: this.state[stages.LEAD]
          }}
        />
      </Card>
    );
  }
}
