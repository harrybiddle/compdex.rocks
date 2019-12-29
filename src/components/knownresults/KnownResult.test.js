import { newStateOnDragEnd } from "./KnownResults";

describe("dragging athletes", () => {
  const oldState = {
    columns: {
      "column-1": {
        id: "column-1",
        title: "Speed Round",
        athletes: [
          { id: "athlete-1", content: "Adam Ondra" },
          { id: "athlete-2", content: "Alex Megos" }
        ]
      },
      "column-2": {
        id: "column-2",
        title: "Isolation Zone",
        athletes: [{ id: "athlete-3", content: "Margo Hayes" }]
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
      columns: {
        "column-1": {
          title: "Speed Round",
          athletes: [
            { id: "athlete-1", content: "Adam Ondra" },
            { id: "athlete-3", content: "Margo Hayes" },
            { id: "athlete-2", content: "Alex Megos" }
          ]
        },
        "column-2": {
          title: "Isolation Zone",
          athletes: []
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
      columns: {
        "column-1": {
          title: "Speed Round",
          athletes: [
            { id: "athlete-2", content: "Alex Megos" },
            { id: "athlete-1", content: "Adam Ondra" }
          ]
        },
        "column-2": {
          title: "Isolation Zone",
          athletes: [{ id: "athlete-3", content: "Margo Hayes" }]
        }
      },
      columnOrder: ["column-1", "column-2"]
    });
  });
});
