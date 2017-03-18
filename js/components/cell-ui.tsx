import * as React from "react";

interface CellUIProps {};
interface CellUIState {};

class CellUI extends React.Component<CellUIProps, CellUIState> {
  render() {
    return <div id="cell-ui">CellUI</div>
  }
}

export default CellUI;