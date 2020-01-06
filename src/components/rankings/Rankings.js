import React from "react";
import List from "../list/List";
import { DragDropContext } from "react-beautiful-dnd";

export default class Rankings extends React.Component {
  render() {
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        {this.props.stageOrder.map((droppableIds, stageIndex) => {
          return (
            <div
              key={"stage-" + stageIndex}
              className="stage-container"
              style={{
                minWidth: "300px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              {droppableIds.map(droppableId => {
                const list = this.props.lists[droppableId];
                return (
                  <div
                    style={
                      list.isRanked ? { color: "black" } : { color: "grey" }
                    }
                    key={droppableId + "-container"}
                  >
                    <List
                      title={list.title}
                      items={list.items}
                      droppableId={droppableId}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </DragDropContext>
    );
  }
}
