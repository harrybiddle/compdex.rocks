import React from "react";
import DraggableAthlete from "../draggableathlete/DraggableAthlete";
import { Droppable } from "react-beautiful-dnd";

export default class Column extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.column.title}</h3>
        <Droppable droppableId={this.props.droppableId}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.column.athletes.map((athlete, index) => (
                <DraggableAthlete
                  key={athlete.draggableId}
                  athlete={athlete}
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
