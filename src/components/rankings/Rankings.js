import React from "react";
import List from "../list/List";
import { DragDropContext } from "react-beautiful-dnd";

export default class Rankings extends React.Component {
  render() {
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        {this.props.listOrder.map(listId => {
          const list = this.props.lists[listId];
          return (
            <List
              key={listId}
              title={list.title}
              items={list.items}
              droppableId={listId}
            />
          );
        })}
      </DragDropContext>
    );
  }
}
