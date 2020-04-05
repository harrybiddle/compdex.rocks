import React from "react";
import ListItem from "../listitem/ListItem";
import { Droppable } from "react-beautiful-dnd";
import { ListGroup } from "react-bootstrap";

export default class List extends React.Component {
  render() {
    return (
      <div>
        <Droppable droppableId={this.props.droppableId}>
          {provided => (
            <ListGroup
              variant="flush"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.items.map((item, index) => (
                <ListItem
                  isRanked={this.props.isRanked}
                  key={item.draggableId}
                  draggableId={item.draggableId}
                  prefix={this.props.isNumbered ? index + 1 + "." : null}
                  content={item.content}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ListGroup>
          )}
        </Droppable>
      </div>
    );
  }
}
