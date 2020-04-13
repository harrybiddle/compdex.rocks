import React from "react";
import StackedBar from "../stackedbar/StackedBar";
import { Card } from "react-bootstrap";

class MedalScenarios extends React.Component {
  scenarios() {
    return Object.values(this.props);
  }

  scenariosForPlace(i) {
    return this.scenarios().map(d => ({
      textColor: "white",
      backgroundColor: d.color,
      label: d.label,
      width: d.scenarios[i]
    }));
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Header>Gold Medal</Card.Header>
          <Card.Body>
            <StackedBar {...this.scenariosForPlace(0)} />
          </Card.Body>
        </Card>
        <Card className={["mt-3"]}>
          <Card.Header>Silver Medal</Card.Header>
          <Card.Body>
            <StackedBar {...this.scenariosForPlace(1)} />
          </Card.Body>
        </Card>
        <Card className={["mt-3"]}>
          <Card.Header>Bronze Medal</Card.Header>
          <Card.Body>
            <StackedBar {...this.scenariosForPlace(2)} />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default MedalScenarios;
