import "./App.css";
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

  const constructItem = athleteId => ({
    draggableId: stage + "-" + athleteId,
    athleteId: athleteId,
    content: state.athletes[athleteId].name
  });

  // create list with all ranked athletes
  const rankedAthleteIds = state[stage];
  let list = {
    droppableId: stage + "ranked",
    title: stageTitles[stage],
    stage: stage,
    isRanked: true,
    items: rankedAthleteIds.map(constructItem)
  };
  let unrankedList = {
    droppableId: stage + "unranked",
    title: "",
    stage: stage,
    isRanked: false
    items: allAthleteIds
      .filter(athleteId => !rankedAthleteIds.includes(athleteId))
      .map(constructItem)
  };

  return {
    [list.droppableId]: list, 
    [unrankedList.droppableId]: unrankedList
  }
}

function constructLists(state) {
  return {
    ...constructList(state, stages.QUALIFICATION),
    ...constructList(state, stages.SPEED),
    ...constructList(state, stages.BOULDER),
    ...constructList(state, stages.LEAD)
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
