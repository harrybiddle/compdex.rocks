import Rankings from "../rankings/Rankings";
import Predictions from "../predictions/Predictions";
import { probabilities } from "../../common/bruteforce";
import React from "react";
import update from "immutability-helper";

const stages = {
  QUALIFICATION: "qualification",
  SPEED: "speed",
  BOULDER: "boulder",
  LEAD: "lead"
};

class App extends React.Component {
  state = {
    athletes: {
      athlete1: { name: "Adam Ondra" },
      athlete2: { name: "Alex Megos" },
      athlete3: { name: "Margo Hayes" }
    },
    [stages.QUALIFICATION]: ["athlete1", "athlete2", "athlete3"],
    [stages.SPEED]: ["athlete1", "athlete2"],
    [stages.BOULDER]: [],
    [stages.LEAD]: []
  };

  render() {
    return (
      <div id="app-container">
        <Predictions {...predictionsProps(this.state)} />
        <Rankings
          onDragEnd={result =>
            this.setState(newStateOnDragEnd(this.state, result))
          }
          lists={constructLists(this.state)}
          stageOrder={[
            [stages.QUALIFICATION + "-ranked"],
            [stages.SPEED + "-ranked", stages.SPEED + "-unranked"],
            [stages.BOULDER + "-ranked", stages.BOULDER + "-unranked"],
            [stages.LEAD + "-ranked", stages.LEAD + "-unranked"]
          ]}
        />
      </div>
    );
  }
}

export function constructListsForStage(state, stage) {
  const stageTitles = {
    [stages.QUALIFICATION]: "Qualification",
    [stages.SPEED]: "Speed Stage",
    [stages.BOULDER]: "Boulder Stage",
    [stages.LEAD]: "Lead Stage"
  };

  const constructItem = athleteId => ({
    draggableId: stage + "-" + athleteId,
    athleteId: athleteId,
    content: state.athletes[athleteId].name
  });

  // create list with all ranked athletes
  const rankedAthleteIds = state[stage];
  let rankedList = {
    droppableId: stage + "-ranked",
    title: stageTitles[stage],
    stage: stage,
    isRanked: true,
    items: rankedAthleteIds.map(constructItem)
  };
  const allAthleteIds = Object.keys(state.athletes);
  let unrankedList = {
    droppableId: stage + "-unranked",
    title: "",
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
export function predictionsProps(state) {
  function* headers(length) {
    yield "1st";
    yield "2nd";
    yield "3rd";
    let i = 4;
    while (i < length) {
      yield i + "th";
      i++;
    }
  }
  const athletes = Object.keys(state.athletes);
  return {
    columns: ["athlete"].concat(Array.from(headers(athletes.length))),
    rows: Object.entries(
      probabilities(
        new Set(athletes),
        state[stages.QUALIFICATION],
        state[stages.SPEED],
        state[stages.BOULDER],
        state[stages.LEAD]
      )
    ).map(a => [state.athletes[a[0]].name].concat(a[1]))
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

export default App;
