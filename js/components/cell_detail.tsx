import * as React from "react";
import * as Engine from "../engine";

interface CellDetailProps {
  selectedCell: Engine.Cell,
};
interface CellDetailState {
};

class CellDetail extends React.Component<CellDetailProps, CellDetailState> {
  constructor(props: CellDetailProps) {
    super(props);
  }
  render() {
    return <div>CellDetail</div>;
  }
}

export default CellDetail;