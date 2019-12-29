import { newStateOnDragEnd } from "./KnownResults";

describe("dragging athletes", () => {
  const oldState = {
    athletes: {
      "athlete-1": { id: "athlete-1", content: "Adam Ondra" },
      "athlete-2": { id: "athlete-2", content: "Alex Megos" },
      "athlete-3": { id: "athlete-3", content: "Margo Hayes" }
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Speed Round",
        athleteIds: ["athlete-1", "athlete-2"]
      },
      "column-2": {
        id: "column-2",
        title: "Isolation Zone",
        athleteIds: ["athlete-3"]
      }
    },
    columnOrder: ["column-1", "column-2"]
  };

  it("removes the athlete from the source column and adds them to the destination when the columns are different", () => {
    const result = {
      draggableId: "athlete-3",
      source: {
        index: 0,
        droppableId: "column-2"
      },
      destination: {
        droppableId: "column-1",
        index: 1
      }
    };
    expect(newStateOnDragEnd(oldState, result)).toEqual({
      athletes: {
        "athlete-1": { id: "athlete-1", content: "Adam Ondra" },
        "athlete-2": { id: "athlete-2", content: "Alex Megos" },
        "athlete-3": { id: "athlete-3", content: "Margo Hayes" }
      },
      columns: {
        "column-1": {
          id: "column-1",
          title: "Speed Round",
          athleteIds: ["athlete-1", "athlete-3", "athlete-2"]
        },
        "column-2": {
          id: "column-2",
          title: "Isolation Zone",
          athleteIds: []
        }
      },
      columnOrder: ["column-1", "column-2"]
    });
  });

  it("removes the athlete from the source column and adds them to the destination when the columns are the same", () => {
    const result = {
      draggableId: "athlete-1",
      source: {
        index: 0,
        droppableId: "column-1"
      },
      destination: {
        droppableId: "column-1",
        index: 1
      }
    };
    expect(newStateOnDragEnd(oldState, result)).toEqual({
      athletes: {
        "athlete-1": { id: "athlete-1", content: "Adam Ondra" },
        "athlete-2": { id: "athlete-2", content: "Alex Megos" },
        "athlete-3": { id: "athlete-3", content: "Margo Hayes" }
      },
      columns: {
        "column-1": {
          id: "column-1",
          title: "Speed Round",
          athleteIds: ["athlete-2", "athlete-1"]
        },
        "column-2": {
          id: "column-2",
          title: "Isolation Zone",
          athleteIds: ["athlete-3"]
        }
      },
      columnOrder: ["column-1", "column-2"]
    });
  });
});
