import React from "react";
import List from "../list/List";
import { DragDropContext } from "react-beautiful-dnd";
import { Tabs, Tab } from "react-bootstrap";

export default class Rankings extends React.Component {
  render() {
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        <Tabs defaultActiveKey="stage-0" id="sub-tab">
          {this.props.groups.map((group, i) => {
            const key = "stage-" + i;
            return (
              <Tab key={key} eventKey={key} title={group.title}>
                <div
                  style={{
                    visibility: "visible",
                    boxSizing: "border-box"
                  }}
                >
                  {group.listIds.map(listId => {
                    const list = this.props.lists[listId];
                    return (
                      <div key={listId + "-parentcontainer"}>
                        {/* if list is unranked, draw a divider above it */}
                        {list.isRanked ? null : (
                          <div key={listId + "divider"}>
                            <hr
                              style={{
                                border: "none",
                                borderBottom: "1px solid #ccc",
                                marginBottom: "0px"
                              }}
                            />
                            <span
                              style={{
                                fontSize: "smaller",
                                paddingLeft: "16px",
                                color: "#999"
                              }}
                            >
                              Isolation Zone
                            </span>
                          </div>
                        )}

                        {/* draw the list */}
                        <List
                          items={list.items}
                          droppableId={listId}
                          isNumbered={list.isRanked}
                          isRanked={list.isRanked}
                        />
                      </div>
                    );
                  })}
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </DragDropContext>
    );
  }
}
