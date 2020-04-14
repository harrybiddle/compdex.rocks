import React, { useState } from "react";
import StackedBar from "../stackedbar/StackedBar";
import { Row, Col, Collapse, Button } from "react-bootstrap";

const CENTERING_STYLE = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

export function calculateCentreOfMass(values) {
  return values.map((value, i) => value * i).reduce((a, b) => a + b, 0);
}

export default function MedalScenarios(props) {
  const [open, setOpen] = useState(false);
  const [filteredAthlete, setfilteredAthlete] = useState(null);

  function filterToAthlete(i) {
    setfilteredAthlete(filteredAthlete === i ? null : i);
  }
  function isActive(i) {
    return filteredAthlete === null ? true : filteredAthlete === i;
  }
  const scenarios = Object.values(props).sort(
    (a, b) =>
      calculateCentreOfMass(a.scenarios) - calculateCentreOfMass(b.scenarios)
  );

  function scenariosForPlace(i) {
    return scenarios.map((d, j) => ({
      textColor: "white",
      backgroundColor: isActive(j) ? d.color : "Gainsboro",
      label: d.label,
      width: d.scenarios[i]
    }));
  }

  return (
    <>
      {/* -- Atheltes ---------------------------------------------------------------------------------------------*/}

      <Row>
        <Col xs={1} />
        <Col>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {scenarios.map((s, i) => (
              <Button
                className="m-1"
                style={{
                  backgroundColor: isActive(i) ? s.color : "Gainsboro",
                  border: "0px",
                  flexGrow: 1
                }}
                onClick={() => filterToAthlete(i)}
              >
                {s.name}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      <hr />

      {/* -- Medal Positions --------------------------------------------------------------------------------------*/}

      <Row className={["mt-3"]}>
        <Col xs={1} style={CENTERING_STYLE}>
          <svg
            class="bi bi-trophy"
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 011-1h8a1 1 0 011 1H3zm2-1a1 1 0 011-1h4a1 1 0 011 1H5z" />
            <path
              fill-rule="evenodd"
              d="M12.5 3a2 2 0 100 4 2 2 0 000-4zm-3 2a3 3 0 116 0 3 3 0 01-6 0zm-6-2a2 2 0 100 4 2 2 0 000-4zm-3 2a3 3 0 116 0 3 3 0 01-6 0z"
              clip-rule="evenodd"
            />
            <path d="M7 10h2v4H7v-4z" />
            <path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z" />
          </svg>
        </Col>
        <Col>
          <StackedBar {...scenariosForPlace(0)} />
        </Col>
      </Row>

      <Row className={["mt-3"]}>
        <Col xs={1} style={CENTERING_STYLE}>
          <svg
            class="bi bi-award-fill"
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 0l1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z" />
            <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
          </svg>
        </Col>
        <Col>
          <StackedBar {...scenariosForPlace(1)} />
        </Col>
      </Row>

      <Row className={["mt-3"]}>
        <Col xs={1} style={CENTERING_STYLE}>
          <svg
            class="bi bi-award"
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l-1.51-.229L8 1.126l-1.355.702-1.51.229-.684 1.365-1.086 1.072L3.614 6l-.25 1.506 1.087 1.072.684 1.365 1.51.229L8 10.874l1.356-.702 1.509-.229.684-1.365 1.086-1.072L12.387 6l.248-1.506-1.086-1.072-.684-1.365z"
              clip-rule="evenodd"
            />
            <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
          </svg>
        </Col>
        <Col>
          <StackedBar {...scenariosForPlace(2)} />
        </Col>
      </Row>

      <Row>
        <Button
          onClick={() => setOpen(!open)}
          variant="light"
          aria-controls="example-collapse-text"
          aria-expanded={open}
          style={{ marginLeft: "auto", marginRight: "auto" }}
          className={"mt-3"}
        >
          {open ? "Hide" : "Show"} Other Positions
        </Button>
      </Row>

      <Collapse in={open}>
        <div>
          {new Array(scenarios.length - 3).fill().map((_, i) => (
            <Row className={["mt-3"]}>
              <Col xs={1} style={CENTERING_STYLE}>
                {i + 4}
              </Col>
              <Col>
                <StackedBar {...scenariosForPlace(i + 3)} />
              </Col>
            </Row>
          ))}
        </div>
      </Collapse>
    </>
  );
}
