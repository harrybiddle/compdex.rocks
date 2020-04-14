import Rankings from "../rankings/Rankings";
import React from "react";
import update from "immutability-helper";
import { stages } from "../constants";
import { Tab, Card, Nav } from "react-bootstrap";
import SafePredictions from "../safepredictions/SafePredictions";

export default class Competition extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(JSON.stringify(props));
  }

  render() {
    return (
      <Card>
        <Tab.Container defaultActiveKey="predictions">
          {/* == Navigational Tabs ================================================================================= */}
          <Card.Header>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="predictions">Predictions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="configuration">Configuration</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          {/* == Tab Panes ========================================================================================= */}
          <Card.Body>
            {/* -- Predictions ------------------------------------------------------------------------------------- */}
            <Tab.Content>
              <Tab.Pane eventKey="predictions">
                <SafePredictions
                  athletes={this.state.athletes}
                  stages={{
                    [stages.QUALIFICATION]: this.state[stages.QUALIFICATION],
                    [stages.SPEED]: this.state[stages.SPEED],
                    [stages.BOULDER]: this.state[stages.BOULDER],
                    [stages.LEAD]: this.state[stages.LEAD]
                  }}
                />
              </Tab.Pane>
              {/* -- Configuration---------------------------------------------------------------------------------- */}
              <Tab.Pane eventKey="configuration">
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
                      listIds: [
                        stages.SPEED + "-ranked",
                        stages.SPEED + "-unranked"
                      ]
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
                      listIds: [
                        stages.LEAD + "-ranked",
                        stages.LEAD + "-unranked"
                      ]
                    }
                  ]}
                />
              </Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Tab.Container>
      </Card>
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
