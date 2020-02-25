import React from "react";
import RidgelinePlot from "../ridgelineplot/RidgelinePlot";
import { useAsync } from "react-async";
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from "workerize-loader!../../predictions.worker";

//
// export default function Predictions(props) {
//   // computationShouldProceed() {
//   //   const allAthleteIds = Object.keys(this.props.athletes);
//   //   const numberMissingAthletes = stage =>
//   //     arrayDifference(allAthleteIds, this.props.stages[stage]).length;
//   //   return (
//   //     numberMissingAthletes(stages.QUALIFICATION) === 0 &&
//   //     numberMissingAthletes(stages.SPEED) === 0 &&
//   //     numberMissingAthletes(stages.BOULDER) < 2
//   //   );
//   // }
//   //
//   // shouldComponentUpdate = nextProps => !isEqual(this.props, nextProps);
//   return <RidgelinePlot {...ridgelinePlotProps(props)} />;
// }
//
// // You can use async/await or any function that returns a Promise
// const loadPlayer = async ({ playerId }, { signal }) => {
//   return playerId;
// };
//
// function promiseFn({ props }) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log("start promise");
//       resolve(ridgelinePlotProps(props));
//       console.log("finish promise");
//     }, 1000);
//   });
// }

function foo({ props }) {
  let inst = worker();
  return inst.ridgelinePlotProps(props);
}

export default function MyComponent(props) {
  const { data, error, isPending } = useAsync({
    promiseFn: foo,
    props: props,
    watch: JSON.stringify(props) // stringify due to shallow compare
  });
  console.log("render, pending?" + isPending + " data=" + data);

  return (
    <div>
      {isPending && "Loading..."}
      {error && `Something went wrong: ${error.message}`}
      {isPending || <RidgelinePlot {...data} />}
    </div>
  );
}
