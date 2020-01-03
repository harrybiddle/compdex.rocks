import React from "react";

class Predictions extends React.Component {
  render() {
    return (
      <div id="probabilities-container">
        <table>
          <thead>
            <tr>
              {this.props.columns.map((name, index) => (
                <th key={"header" + index}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.rows.map((row, index) => (
              <tr key={index}>
                {row.map((column, index_) => (
                  <td key={index_}>{column}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Predictions;
