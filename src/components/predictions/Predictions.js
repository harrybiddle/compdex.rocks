import React from "react";
import RidgelinePlot from "../ridgelineplot/RidgelinePlot";
import { useAsync } from "react-async";
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from "workerize-loader!./predictions.worker";
//const worker = () => require("./predictions.worker");
import Container from "react-bootstrap/Container";

function generateScenarios({ props }) {
  let inst = worker();
  return inst.generateScenarios(props);
}

export default function Predictions(props) {
  const { data, error, isPending } = useAsync({
    promiseFn: generateScenarios,
    props: props,
    watch: JSON.stringify(props) // stringify due to shallow compare
  });
  return (
    <Container>
      {isPending && "Loading..."}
      {error && `Something went wrong: ${error.message}`}
      {isPending || <RidgelinePlot {...data} />}
    </Container>
  );
}
