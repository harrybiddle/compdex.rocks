import React from "react";
import ListItem from "../listitem/ListItem";
import { Droppable } from "react-beautiful-dnd";

export default class List extends React.Component {
  render() {
    return (
      <div>
        <Droppable droppableId={this.props.droppableId}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.items.map((item, index) => (
                <ListItem
                  key={item.draggableId}
                  draggableId={item.draggableId}
                  prefix={this.props.isNumbered ? index + 1 + "." : null}
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
