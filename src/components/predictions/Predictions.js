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
          {Object.keys(this.state.columns).map(name => (
            <th>{name}</th>
          ))}
        </thead>
        <tbody>
          {this.state.rows.map(row => (
            <tr>
              {row.map(column => (
                <td>{column}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Predictions;
