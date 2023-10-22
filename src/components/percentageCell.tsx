import { CellContext } from "@tanstack/react-table";
import { CoinMarket } from "../utils/models";
import Percentage from "./percentage";

export default function PercentageCell(props: CellContext<CoinMarket, any>) {
  return (
    <div className="text-right">
      <Percentage value={props.getValue()} precision={3} />
    </div>
  );
}


