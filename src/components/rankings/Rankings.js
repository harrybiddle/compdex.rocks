import React from "react";
import List from "../list/List";
import { DragDropContext } from "react-beautiful-dnd";
import TabLabel from "../tablabel/TabLabel";
import styles from "../app/App.module.css";

export default class Rankings extends React.Component {
  render() {
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        {/* titles */}
        <div
          key="subtabs"
          style={{ display: "flex" }}
          className={styles.hiddenOnDesktop}
        >
          {this.props.groups.map((group, i) => {
            return (
              <TabLabel
                onClick={() => this.props.onTabClick(i)}
                isActive={this.props.activeTab === i}
              >
                {group.title}
              </TabLabel>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.props.groups.map((group, i) => {
            return (
              <div
                key={"stage-" + i}
                className={
                  this.props.activeTab === i ? "" : styles.hiddenWhenTabInactive
                }
              >
                <div
                  style={{
                    visibility: "visible",
                    boxSizing: "border-box",
                    padding: "16px 16px 16px 16px"
                  }}
                >
                  <span
                    style={{
                      boxSizing: "border-box",
                      fontSize: "1.25rem",
                      lineHeight: "2rem",
                      fontWeight: "600",
                      letterSpacing: ".0125em"
                    }}
                  >
                    {group.title}
                  </span>
                  {group.listIds.map(listId => {
                    const list = this.props.lists[listId];
                    return (
                      <div
                        style={
                          list.isRanked ? { color: "black" } : { color: "grey" }
                        }
                        key={listId + "-container"}
                      >
                        <List items={list.items} droppableId={listId} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    );
  }
}
