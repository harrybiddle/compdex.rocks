import React from "react";
import ReactDOM from "react-dom";
import App, { constructColumns, newStateOnDragEnd } from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("dragging athletes", () => {
  const oldState = {
    athletes: {
      athlete1: { name: "Adam Ondra" },
      athlete2: { name: "Alex Megos" },
      athlete3: { name: "Margo Hayes" }
    },
    speedRound: ["athlete1", "athlete2", "athlete3"],
    boulderRound: ["athlete3", "athlete2"],
    leadRound: []
  };

  it("removes the athlete from the source column and adds them to the destination when the columns are different", () => {
    const result = {
      source: {
        droppableId: "isolationZone",
        index: 0 // athlete1 (the only one in the isolation zone)
      },
      destination: {
        droppableId: "boulderRound",
        index: 1
      }
    };
    expect(newStateOnDragEnd(oldState, result)).toEqual({
      ...oldState,
      boulderRound: ["athlete3", "athlete1", "athlete2"]
    });
  });

  it("removes the athlete from the source column and adds them to the destination when the columns are the same", () => {
    const result = {
      source: {
        droppableId: "boulderRound",
        index: 0
      },
      destination: {
        droppableId: "boulderRound",
        index: 1
      }
    };
    expect(newStateOnDragEnd(oldState, result)).toEqual({
      ...oldState,
      boulderRound: ["athlete2", "athlete3"]
    });
  });
});

it("constructs props for KnownResults correctly", () => {
  const state = {
    athletes: {
      athlete1: { name: "Adam Ondra" },
      athlete2: { name: "Alex Megos" },
      athlete3: { name: "Margo Hayes" }
    },
    speedRound: ["athlete1", "athlete2", "athlete3"],
    boulderRound: ["athlete3", "athlete2"],
    leadRound: []
  };

  expect(constructColumns(state)).toEqual({
    speedRound: {
      title: "Speed Round",
      athletes: [
        { id: "speedRound-athlete1", content: "Adam Ondra" },
        { id: "speedRound-athlete2", content: "Alex Megos" },
        { id: "speedRound-athlete3", content: "Margo Hayes" }
      ]
    },
    boulderRound: {
      title: "Boulder Round",
      athletes: [
        { id: "boulderRound-athlete3", content: "Margo Hayes" },
        { id: "boulderRound-athlete2", content: "Alex Megos" }
      ]
    },
    leadRound: {
      title: "Lead Round",
      athletes: []
    },
    isolationZone: {
      title: "Isolation Zone",
      athletes: [{ id: "boulderRound-athlete1", content: "Adam Ondra" }]
    }
  });
});
