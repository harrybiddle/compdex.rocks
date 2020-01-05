import React from "react";

export const colorBuckets = [
  "#ffffff", // #0: -inf -> 0.09
  "#f7fbff", // #1:  0.1 -> 0.19
  "#deebf7", // #2:  0.2 -> 0.29
  "#c6dbef", // #3:  0.3 -> 0.39
  "#9ecae1", // #4:  0.4 -> 0.49
  "#6baed6", // #5:  0.5 -> 0.59
  "#4292c6", // #6:  0.6 -> 0.69
  "#2171b5", // #7:  0.7 -> 0.79
  "#08519c", // #8:  0.8 -> 0.89
  "#08306b" //  #9:  0.9 -> inf
];
export function getColor(probability) {
  const clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num);
  const i = Math.floor(probability * colorBuckets.length);
  const j = clamp(i, 0, colorBuckets.length - 1);
  return colorBuckets[j];
}

class Heatmap extends React.Component {
  render() {
    return (
      <div id="probabilities-container">
        <table>
          <thead>
            <tr>
              {this.props.columns.map((name, i) => (
                <th key={"header" + i}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.rows.map((row, i) => (
              <tr key={"row-" + i}>
                {row.map((value, j) => (
                  <td
                    key={"value-" + j}
                    style={j === 0 ? {} : { backgroundColor: getColor(value) }}
                  >
                    {j === 0 ? value : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Heatmap;
