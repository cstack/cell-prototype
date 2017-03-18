import * as React from "react";

interface CellUIProps {};
interface CellUIState {};

class CellUI extends React.Component<CellUIProps, CellUIState> {
  render() {
    return React.createElement(
      "div",
      {id: "cell-ui"},
      [
        "CellUI",
      ]
    );
  }
}

export default CellUI;