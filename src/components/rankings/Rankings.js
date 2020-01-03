import React from "react";
import List from "../list/List";
import { DragDropContext } from "react-beautiful-dnd";

export default class Rankings extends React.Component {
  render() {
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        {this.props.listOrder.map(droppableId => {
          const list = this.props.lists[droppableId];
          return (
            <div style={list.isRanked ? { color: "black" } : { color: "grey" }}>
              <List
                key={droppableId}
                title={list.title}
                items={list.items}
                droppableId={droppableId}
              />
            </div>
          );
        })}
      </DragDropContext>
    );
  }
}
