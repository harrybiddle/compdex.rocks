import React from "react";
import { Draggable } from "react-beautiful-dnd";
import dragHandleIcon from "./drag_handle-24px.svg";

export default class ListItem extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.draggableId} index={this.props.index}>
        {(provided, snapshot) => (
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
                // add border when dragging
                border: snapshot.isDragging ? "1px solid red" : "0px",
                color: this.props.isRanked ? "black" : "#999"
              }}
            >
              <span style={{ width: "2.5ex" }}>{this.props.prefix}</span>

              {this.props.content}
              <img
                src={dragHandleIcon}
                alt="Drag handle icon"
                style={{ marginLeft: "auto" }}
              />
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}
