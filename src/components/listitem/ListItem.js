import React from "react";
import { Draggable } from "react-beautiful-dnd";
import dragHandleIcon from "./drag_handle-24px.svg";

export default class ListItem extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.draggableId} index={this.props.index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div
              style={{
                fontSize: "14px",
                height: "32px",
                lineHeight: "1.43",
                padding: "8px 16px 8px 16px",
                // vertically center text
                display: "flex",
                alignItems: "center",
                // ensure that drag handle appears at end
                justifyContent: "space-between"
              }}
            >
              {this.props.content}
              <img src={dragHandleIcon} alt="Drag handle icon" />
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}
