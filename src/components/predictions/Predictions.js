import React from "react";

class Predictions extends React.Component {
  state = {
    columns: ["athlete", "1st", "2nd"],
    rows: [
      ["Adam Ondra", 0.2, 0.8],
      ["Alex Megos", 0.8, 0.2]
    ]
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            {Object.keys(this.state.columns).map((name, index) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.state.rows.map((row, index) => (
            <tr key={index}>
              {row.map((column, index_) => (
                <td key={index_}>{column}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Predictions;
