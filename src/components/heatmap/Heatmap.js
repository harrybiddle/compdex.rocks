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
    const rowStyle = { height: "1em" };
    const firstColumnCellStyle = {
      padding: "0px",
      // maximum width of first column
      maxWidth: "130px",
      // hide overflow text behind ellipses
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden"
    };
    const valueCellStyle = {
      padding: "0px",
      minWidth: "1.5em",
      maxWidth: "1.5em",
      minHeight: "1.5em",
      maxHeight: "1.5em",
      height: "1.5em"
    };
    function* headers(length) {
      yield ["", ""];
      yield ["1", "st"];
      yield ["2", "nd"];
      yield ["3", "rd"];
      let i = 4;
      while (i < length) {
        yield [i, "th"];
        i++;
      }
    }

    return (
      <div id="probabilities-container">
        <table style={{ padding: "0px", borderSpacing: "0px" }}>
          <thead>
            <tr style={rowStyle}>
              {Array.from(headers(this.props.columns.length)).map(x => (
                <th key={"header" + x[0]} style={valueCellStyle}>
                  {x[0]}
                  <sup style={{ fontSize: "x-small" }}>{x[1]}</sup>
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ padding: "0px" }}>
            {this.props.rows.map((row, i) => (
              <tr key={"row-" + i} style={rowStyle}>
                {row.map((value, j) => (
                  <td
                    key={"value-" + j}
                    style={
                      j === 0
                        ? firstColumnCellStyle
                        : {
                            ...valueCellStyle,
                            backgroundColor: getColor(value)
                          }
                    }
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
