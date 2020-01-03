import React from "react";
import ListItem from "../listitem/ListItem";
import { Droppable } from "react-beautiful-dnd";

export default class List extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <Droppable droppableId={this.props.droppableId}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.items.map((item, index) => (
                <ListItem
                  key={item.draggableId}
                  draggableId={item.draggableId}
                  content={item.content}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
