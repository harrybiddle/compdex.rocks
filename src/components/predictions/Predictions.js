import React from "react";

class Predictions extends React.Component {
  render() {
    return (
      <div id="probabilities-container">
        <table>
          <thead>
            <tr>
              {Object.keys(this.props.columns).map((name, index) => (
                <th key={index}>{name}</th>
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
