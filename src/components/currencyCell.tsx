import { CellContext } from "@tanstack/react-table";
import { CoinMarket } from "../utils/models";
import { parseCurrency } from "../utils/utils";

export default function CurrencyCell(props: CellContext<CoinMarket, number>) {
  return <div className="text-right">{parseCurrency(props.getValue(), 4)}</div>;
}
