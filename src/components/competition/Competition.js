import Rankings from "../rankings/Rankings";
import styles from "./Competition.module.css";
import React from "react";
import update from "immutability-helper";
import Predictions from "../predictions/Predictions";
import { stages } from "../constants";
import TabLabel from "../tablabel/TabLabel";

export default class Competition extends React.Component {
  state = {
    athletes: {
      athlete1: { name: "Adam Ondra" },
      athlete2: { name: "Akiyo Noguchi" },
      athlete3: { name: "Jan Hoyer" },
      athlete4: { name: "Janja Garnabret" },
      athlete5: { name: "William Bosi" },
      athlete6: { name: "Jessie Pilz" },
      athlete7: { name: "Margo Hayes" },
      athlete8: { name: "Tomoa Narasaki" }
    },
    [stages.QUALIFICATION]: [
      "athlete1",
      "athlete2",
      "athlete3",
      "athlete4",
      "athlete5",
      "athlete6",
      "athlete7",
      "athlete8"
    ],
    [stages.SPEED]: [
      "athlete1",
      "athlete2",
      "athlete3",
      "athlete4",
      "athlete5",
      "athlete6",
      "athlete7",
      "athlete8"
    ],
    [stages.BOULDER]: [
      "athlete1",
      "athlete2",
      "athlete3",
      "athlete4",
      "athlete5",
      "athlete6",
      "athlete7",
      "athlete8"
    ],
    [stages.LEAD]: ["athlete1"],
    activeTab: 0,
    activeSubTab: 3
  };

  setActiveTab(value) {
    const newState = update(this.state, { activeTab: { $set: value } });
    this.setState(newState);
  }

  setActiveSubTab(value) {
    const newState = update(this.state, { activeSubTab: { $set: value } });
    this.setState(newState);
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        {/* -- Header ---------------------------------------------------------------------------------------------- */}
        {/*<div className={headerStyle}>Compdex.rocks</div>*/}

        {/* -- Tab Labels ------------------------------------------------------------------------------------------ */}
        <div
          style={{
            display: "flex"
          }}
        >
          <TabLabel
            onClick={() => this.setActiveTab(0)}
            isActive={this.state.activeTab === 0}
          >
            Predictions
          </TabLabel>
          <TabLabel
            onClick={() => this.setActiveTab(1)}
            isActive={this.state.activeTab === 1}
          >
            Configuration
          </TabLabel>
        </div>
        {/* -- Predictions ----------------------------------------------------------------------------------------- */}
        <div
          className={[
            styles.tabContent,
            this.state.activeTab === 0 ? "" : styles.hiddenWhenTabInactive,
            styles.predictions
          ].join(" ")}
          style={{
            display: "flex"
          }}
        >
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              overflow: "scroll"
            }}
          >
            <Predictions
              athletes={this.state.athletes}
              stages={{
                [stages.QUALIFICATION]: this.state[stages.QUALIFICATION],
                [stages.SPEED]: this.state[stages.SPEED],
                [stages.BOULDER]: this.state[stages.BOULDER],
                [stages.LEAD]: this.state[stages.LEAD]
              }}
            />
          </div>
        </div>
        {/* -- Configuration --------------------------------------------------------------------------------------- */}
        <div
          className={[
            styles.tabContent,
            this.state.activeTab === 1 ? "" : styles.hiddenWhenTabInactive,
            styles.stages
          ].join(" ")}
        >
          <Rankings
            onDragEnd={result =>
              this.setState(newStateOnDragEnd(this.state, result))
            }
            activeTab={this.state.activeSubTab}
            onTabClick={value => this.setActiveSubTab(value)}
            lists={constructLists(this.state)}
            groups={[
              {
                title: "Qualification",
                listIds: [stages.QUALIFICATION + "-ranked"]
              },
              {
                title: "Speed",
                listIds: [stages.SPEED + "-ranked", stages.SPEED + "-unranked"]
              },
              {
                title: "Boulder",
                listIds: [
                  stages.BOULDER + "-ranked",
                  stages.BOULDER + "-unranked"
                ]
              },
              {
                title: "Lead",
                listIds: [stages.LEAD + "-ranked", stages.LEAD + "-unranked"]
              }
            ]}
          />
        </div>
      </div>
    );
  }
}

export function constructListsForStage(state, stage) {
  const constructItem = athleteId => ({
    draggableId: stage + "-" + athleteId,
    athleteId: athleteId,
    content: state.athletes[athleteId].name
  });

  // create list with all ranked athletes
  const rankedAthleteIds = state[stage];
  let rankedList = {
    droppableId: stage + "-ranked",
    stage: stage,
    isRanked: true,
    items: rankedAthleteIds.map(constructItem)
  };
  const allAthleteIds = Object.keys(state.athletes);
  let unrankedList = {
    droppableId: stage + "-unranked",
    stage: stage,
    isRanked: false,
    items: allAthleteIds
      .filter(athleteId => !rankedAthleteIds.includes(athleteId))
      .map(constructItem)
  };

  return {
    [rankedList.droppableId]: rankedList,
    [unrankedList.droppableId]: unrankedList
  };
}

function constructLists(state) {
  return {
    ...constructListsForStage(state, stages.QUALIFICATION),
    ...constructListsForStage(state, stages.SPEED),
    ...constructListsForStage(state, stages.BOULDER),
    ...constructListsForStage(state, stages.LEAD)
  };
}

export function calculateCentreOfMass(values) {
  return values.map((value, i) => value * i).reduce((a, b) => a + b, 0);
}

export function newStateOnDragEnd(state, result) {
  // ignore drags with no destination
  const { destination, source } = result;
  if (!destination) return state;

  // ignore drags between stages
  const lists = constructLists(state);
  const sourceList = lists[source.droppableId];
  const destinationList = lists[destination.droppableId];
  if (sourceList.stage !== destinationList.stage) {
    return state;
  }

  // remove athlete from source, if they were already ranked
  const stage = sourceList.stage;
  if (sourceList.isRanked) {
    state = update(state, {
      [stage]: { $splice: [[source.index, 1]] }
    });
  }

  // insert athlete into destination, if they are now ranked
  if (destinationList.isRanked) {
    const athleteId = sourceList.items[source.index].athleteId;
    state = update(state, {
      [stage]: {
        $splice: [[destination.index, 0, athleteId]]
      }
    });
  }

  return state;
}
