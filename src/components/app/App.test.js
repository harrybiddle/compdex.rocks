import React from "react";
import ReactDOM from "react-dom";
import App, {
  constructColumns,
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

  it("removes the athlete from the source column and adds them to the destination when the columns are different", () => {
    const result = {
      source: {
        droppableId: "isolation",
        index: 0 // athlete1 (the only one in the isolation zone)
      },
      destination: {
        droppableId: "boulder",
        index: 1
      }
    };
    expect(newStateOnDragEnd(oldState, result)).toEqual({
      ...oldState,
      boulder: ["athlete3", "athlete1", "athlete2"]
    });
  });

  it("removes the athlete from the source column and adds them to the destination when the columns are the same", () => {
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

it("constructs props for Rankings correctly", () => {
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

  expect(constructColumns(state)).toEqual({
    speed: {
      title: "Speed Round",
      zone: "speed",
      athletes: [
        {
          draggableId: "speed-athlete1",
          athleteId: "athlete1",
          content: "Adam Ondra"
        },
        {
          draggableId: "speed-athlete2",
          athleteId: "athlete2",
          content: "Alex Megos"
        },
        {
          draggableId: "speed-athlete3",
          athleteId: "athlete3",
          content: "Margo Hayes"
        }
      ]
    },
    boulder: {
      title: "Boulder Round",
      zone: "boulder",
      athletes: [
        {
          draggableId: "boulder-athlete3",
          athleteId: "athlete3",
          content: "Margo Hayes"
        },
        {
          draggableId: "boulder-athlete2",
          athleteId: "athlete2",
          content: "Alex Megos"
        }
      ]
    },
    lead: {
      title: "Lead Round",
      zone: "lead",
      athletes: []
    },
    isolation: {
      title: "Isolation Zone",
      zone: "isolation",
      athletes: [
        {
          draggableId: "boulder-athlete1",
          athleteId: "athlete1",
          content: "Adam Ondra"
        }
      ]
    }
  });
});
