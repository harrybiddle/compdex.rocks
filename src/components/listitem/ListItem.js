import React from "react";
import { Draggable } from "react-beautiful-dnd";
import dragHandleIcon from "./drag_handle-24px.svg";
import { ListGroup } from "react-bootstrap";

const EXTRA_CLASSES_FOR_DRAGGING = [
  "shadow",
  "p-3",
  "mb-5",
  "bg-white rounded",
  "border",
  "border-light"
];

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
            <ListGroup.Item
              variant={this.props.isRanked ? null : "light"}
              className={[
                "d-flex",
                "justify-content-between",
                "align-items-center",
                ...(snapshot.isDragging ? EXTRA_CLASSES_FOR_DRAGGING : [])
              ]}
            >
              <span style={{ width: "2.5ex" }}>{this.props.prefix}</span>
              {this.props.content}
              <img
                src={dragHandleIcon}
                alt="Drag handle icon"
                style={{ marginLeft: "auto" }}
              />
            </ListGroup.Item>
          </div>
        )}
      </Draggable>
    );
  }
}
