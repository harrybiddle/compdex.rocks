import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default class DraggableAthlete extends React.Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.athlete.draggableId}
        index={this.props.index}
        isDragDisabled={this.props.isDragDisabled}
      >
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div
              style={
                this.props.isRanked ? { color: "black" } : { color: "grey" }
              }
            >
              {this.props.athlete.content}
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}
