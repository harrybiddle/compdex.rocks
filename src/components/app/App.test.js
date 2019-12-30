import React from "react";
import ReactDOM from "react-dom";
import App, {
  constructList,
  rankingsProps,
  newStateOnDragEnd,
  predictionsProps
} from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("predictions props are constructed", () => {
  const state = {
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

  predictionsProps(state); // does not crash
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
        droppableId: "boulder",
        index: 0
      },
      destination: {
        droppableId: "boulder",
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

  expect(constructList(state, "speed")).toEqual({
    title: "Speed Stage",
    stage: "speed",
    items: [
      {
        isRanked: true,
        isDragDisabled: false,
        draggableId: "speed-athlete1",
        athleteId: "athlete1",
        content: "Adam Ondra"
      },
      {
        isRanked: true,
        isDragDisabled: false,
        draggableId: "speed-athlete3",
        athleteId: "athlete3",
        content: "Margo Hayes"
      },
      {
        isRanked: false,
        isDragDisabled: true,
        athleteId: "divider",
        draggableId: "speed-divider",
        isDivider: true,
        content: "-----------"
      },
      {
        isRanked: false,
        isDragDisabled: false,
        draggableId: "speed-athlete2",
        athleteId: "athlete2",
        content: "Alex Megos"
      }
    ]
  });
});
