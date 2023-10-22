import { CellContext } from "@tanstack/react-table";
import { CoinMarket } from "../utils/models";
import { Line, LineChart, YAxis } from "recharts";

export default function ChartCell(props: CellContext<CoinMarket, number[]>) {
  return (
    <LineChart
      height={30}
      width={150}
      margin={{
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      }}
      data={props.getValue().map((value) => ({
        value: value,
      }))}
      className="ms-auto"
    >
      <YAxis hide type="number" domain={["dataMin", "dataMax"]} />
      <Line
        type="monotone"
        dataKey="value"
        dot={false}
        strokeWidth={2}
        stroke={
          props.row.original.price_change_percentage_7d_in_currency > 0
            ? "#16a34a"
            : "#dc2626"
        }
      />
    </LineChart>
  );
}
