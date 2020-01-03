import React from "react";
import ReactDOM from "react-dom";
import App, {
  calculateCentreOfMass,
  constructListsForStage,
  newStateOnDragEnd,
  predictionsProps
} from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("centre of mass", () => {
  expect(calculateCentreOfMass([0.4, 1.4, -3.6])).toEqual(
    0.4 * 0 + 1.4 * 1 - 3.6 * 2
  );
});

describe("predictions props", () => {
  it("order athletes by centre of mass", () => {
    const state = {
      athletes: {
        athlete1: { name: "Adam Ondra" },
        athlete2: { name: "Alex Megos" },
        athlete3: { name: "Margo Hayes" }
      },
      qualification: ["athlete3", "athlete1", "athlete2"],
      speed: ["athlete3", "athlete1", "athlete2"],
      boulder: ["athlete3"],
      lead: []
    };

    const props = predictionsProps(state);
    expect(props.rows.map(row => row[0])).toEqual([
      "Margo Hayes",
      "Adam Ondra",
      "Alex Megos"
    ]);
  });
});

describe("dragging athletes", () => {
  const oldState = {
    athletes: {
      athlete1: { name: "Adam Ondra" },
      athlete2: { name: "Alex Megos" },
      athlete3: { name: "Margo Hayes" }
    },
    qualification: ["athlete1", "athlete2", "athlete3"],
    speed: ["athlete1", "athlete2", "athlete3"],
    boulder: ["athlete3", "athlete2"],
    lead: []
  };

  it("removes the athlete from the source list and adds them to the destination when the lists are the same", () => {
    const result = {
      source: {
        droppableId: "boulder-ranked",
        index: 0
      },
      destination: {
        droppableId: "boulder-ranked",
        index: 1
      }
    };
    expect(newStateOnDragEnd(oldState, result)).toEqual({
      ...oldState,
      boulder: ["athlete2", "athlete3"]
    });
  });
});

it("constructs list correctly", () => {
  const state = {
    athletes: {
      athlete1: { name: "Adam Ondra" },
      athlete2: { name: "Alex Megos" },
      athlete3: { name: "Margo Hayes" }
    },
    speed: ["athlete1", "athlete3"]
  };

  expect(constructListsForStage(state, "speed")).toEqual({
    "speed-ranked": {
      title: "Speed Stage",
      droppableId: "speed-ranked",
      isRanked: true,
      stage: "speed",
      items: [
        {
          draggableId: "speed-athlete1",
          athleteId: "athlete1",
          content: "Adam Ondra"
        },
        {
          draggableId: "speed-athlete3",
          athleteId: "athlete3",
          content: "Margo Hayes"
        }
      ]
    },
    "speed-unranked": {
      title: "",
      isRanked: false,
      droppableId: "speed-unranked",
      stage: "speed",
      items: [
        {
          draggableId: "speed-athlete2",
          athleteId: "athlete2",
          content: "Alex Megos"
        }
      ]
    }
  });
});
