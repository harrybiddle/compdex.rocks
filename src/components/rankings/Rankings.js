import React from "react";
import List from "../list/List";
import { DragDropContext } from "react-beautiful-dnd";

export default class Rankings extends React.Component {
  render() {
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        {this.props.groups.map((group, i) => {
          return (
            /*
                  We go for an effect like this:

                  -----------------------
                  |                     |
                  |--  -------------  --|
                  | |  |           |  | |
                  | |  |           |  | |
                  |--  -------------  --|
                  |                     |
                  -----------------------
               */
            <div
              key={"stage-" + i}
              style={{
                backgroundColor: "white",
                flex: "0 0 calc(100% - 40px)",
                maxWidth: "500px",
                marginLeft: i === 0 ? "24px" : "0px",
                marginRight: "24px",
                borderRadius: "4px",
                boxShadow:
                  "0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12)"
              }}
            >
              <div
                style={{
                  visibility: "visible",
                  boxSizing: "border-box",
                  padding: "16px 16px 16px 16px"
                }}
              >
                <span
                  style={{
                    boxSizing: "border-box",
                    fontSize: "1.25rem",
                    lineHeight: "2rem",
                    fontWeight: "600",
                    letterSpacing: ".0125em"
                  }}
                >
                  {group.title}
                </span>
                {group.listIds.map(listId => {
                  const list = this.props.lists[listId];
                  return (
                    <div
                      style={
                        list.isRanked ? { color: "black" } : { color: "grey" }
                      }
                      key={listId + "-container"}
                    >
                      <List items={list.items} droppableId={listId} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </DragDropContext>
    );
  }
}
