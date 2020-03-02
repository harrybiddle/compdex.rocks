import React from "react";
import RidgelinePlot from "../ridgelineplot/RidgelinePlot";
import { useAsync } from "react-async";
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from "workerize-loader!./predictions.worker";
//const worker = () => require("./predictions.worker");

function asyncRidgelinePlotProps({ props }) {
  let inst = worker();
  return inst.ridgelinePlotProps(props);
}

export default function MyComponent(props) {
  const { data, error, isPending } = useAsync({
    promiseFn: asyncRidgelinePlotProps,
    props: props,
    watch: JSON.stringify(props) // stringify due to shallow compare
  });
  return (
    <div>
      {isPending && "Loading..."}
      {error && `Somethsing went wrong: ${error.message}`}
      {isPending || <RidgelinePlot {...data} />}
    </div>
  );
}
