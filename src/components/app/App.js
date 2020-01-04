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

const arrayDifference = (a, b) => a.filter(x => !b.includes(x));

class App extends React.Component {
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
    [stages.LEAD]: ["athlete1"]
  };

  computationCanProceed() {
    const allAthleteIds = Object.keys(this.state.athletes);
    const numberMissingAthletes = stage =>
      arrayDifference(allAthleteIds, this.state[stage]).length;
    return (
      numberMissingAthletes(stages.QUALIFICATION) === 0 &&
      numberMissingAthletes(stages.SPEED) === 0 &&
      numberMissingAthletes(stages.BOULDER) < 2
    );
  }

  render() {
    return (
      <div id="app-container">
        {this.computationCanProceed() ? (
          <Predictions {...predictionsProps(this.state)} />
        ) : (
          <div>Finish some stages first</div>
        )}
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

export function calculateCentreOfMass(values) {
  return values.map((value, i) => value * i).reduce((a, b) => a + b, 0);
}

export function predictionsProps(state) {
  function* headers(length) {
    yield "";
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
  let rows = Object.entries(
    probabilities(
      new Set(athletes),
      state[stages.QUALIFICATION],
      state[stages.SPEED],
      state[stages.BOULDER],
      state[stages.LEAD]
    )
  ).map(a => [state.athletes[a[0]].name].concat(a[1]));
  rows.sort(
    (a, b) =>
      calculateCentreOfMass(a.slice(1)) - calculateCentreOfMass(b.slice(1))
  );
  return {
    columns: Array.from(headers(athletes.length + 1)),
    rows: rows
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
