import React from "react";
import "./App.css";
import Rankings from "../rankings/Rankings";
import Predictions from "../predictions/Predictions";

import update from "immutability-helper";
import { probabilities } from "../../common/bruteforce";

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
      <div>
        <Predictions {...predictionsProps(this.state)} />
        <Rankings
          onDragEnd={result =>
            this.setState(newStateOnDragEnd(this.state, result))
          }
          lists={constructLists(this.state)}
          listOrder={[
            stages.QUALIFICATION,
            stages.SPEED,
            stages.BOULDER,
            stages.LEAD
          ]}
        />
      </div>
    );
  }
}

export function constructList(state, stage) {
  const stageTitles = {
    [stages.QUALIFICATION]: "Qualification",
    [stages.SPEED]: "Speed Stage",
    [stages.BOULDER]: "Boulder Stage",
    [stages.LEAD]: "Lead Stage"
  };

  const constructItem = (athleteId, isRanked) => ({
    isRanked: isRanked,
    isDragDisabled: false,
    draggableId: stage + "-" + athleteId,
    athleteId: athleteId,
    content: state.athletes[athleteId].name
  });

  // create list with all ranked athletes
  const rankedAthleteIds = state[stage];
  let list = {
    title: stageTitles[stage],
    stage: "speed",
    items: rankedAthleteIds.map(athleteId => constructItem(athleteId, true))
  };

  // add an empty item
  list.items.push({
    isRanked: false,
    isDragDisabled: true,
    draggableId: stage + "-divider",
    athleteId: "divider",
    isDivider: true,
    content: "-----------"
  });

  // push all unranked athletes
  const allAthleteIds = Object.keys(state.athletes);
  allAthleteIds.forEach(athleteId => {
    const isRanked = rankedAthleteIds.includes(athleteId);
    if (!isRanked) {
      list.items.push(constructItem(athleteId, false));
    }
  });
  return list;
}

function constructLists(state) {
  return {
    [stages.QUALIFICATION]: constructList(state, stages.QUALIFICATION),
    [stages.SPEED]: constructList(state, stages.SPEED),
    [stages.BOULDER]: constructList(state, stages.BOULDER),
    [stages.LEAD]: constructList(state, stages.LEAD)
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
  if (source.droppableId !== destination.droppableId) {
    return state;
  }

  // do not allow the dividing line to be dragged
  const stage = source.droppableId;
  const list = lists[stage];
  let dividerIndex = list.items.findIndex(item => item.isDivider);
  if (source.index === dividerIndex) return state;

  // remove athlete from source, if they were already ranked
  const wasRanked = source.index < dividerIndex;
  if (wasRanked) {
    state = update(state, {
      [stage]: { $splice: [[source.index, 1]] }
    });
    dividerIndex--;
  }

  // insert athlete into destination, if they are now ranked
  const athleteId = list.items[source.index].athleteId;
  const willBeRanked = destination.index <= dividerIndex;
  if (willBeRanked) {
    state = update(state, {
      [stage]: {
        $splice: [[destination.index, 0, athleteId]]
      }
    });
  }

  return state;
}

export default App;
