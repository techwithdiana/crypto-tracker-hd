import { CellContext } from "@tanstack/react-table";
import { CoinMarket } from "../utils/models";

export default function CoinCell(props: CellContext<CoinMarket, any>) {
  const coin = props.row.original;

  return (
    <div className="flex gap-4 items-center">
      {props.row.getCanSelect() && (
        <input
          type="checkbox"
          disabled={
            !props.row.getIsSelected() &&
            Object.keys(props.table.getState().rowSelection).length >= 4
          }
          checked={props.row.getIsSelected()}
          onChange={() => props.row.toggleSelected()}
          onClick={(e) => e.stopPropagation()}
          className="w-6 h-6 cursor-pointer"
        />
      )}
      <img src={coin.image} className="w-12 h-12" />
      <div className="flex flex-col">
        <span className="font-medium text-lg">{coin.symbol.toUpperCase()}</span>
        <span className="text-sm">{coin.name}</span>
      </div>
    </div>
  );
}
