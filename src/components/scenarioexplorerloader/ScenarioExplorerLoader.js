import React from "react";
import ScenarioExplorer from "../scenarioexplorer/ScenarioExplorer";
import { useAsync } from "react-async";
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from "workerize-loader!./ScenarioExplorerLoader.worker";
//const worker = () => require("./scenarioexplorerloader.worker");
import Container from "react-bootstrap/Container";

function generateScenariosAsync({ props }) {
  let inst = worker();
  return inst.generateScenarios(props);
}

export default function ScenarioExplorerLoader(props) {
  const { data: scenarios, error, isPending } = useAsync({
    promiseFn: generateScenariosAsync,
    props: props,
    watch: JSON.stringify(props) // stringify due to shallow compare
  });
  return (
    <Container>
      {isPending && "Loading..."}
      {error && `Something went wrong: ${error.message}`}
      {isPending || <ScenarioExplorer {...scenarios} />}
    </Container>
  );
}
