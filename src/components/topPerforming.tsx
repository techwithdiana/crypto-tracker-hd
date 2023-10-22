import { useNavigate } from "react-router-dom";
import { ResponsiveContainer, LineChart, YAxis, Line } from "recharts";
import { useCoins } from "../utils/hooks";
import Percentage from "./percentage";

export default function TopPerforming() {
  const { isLoading, data } = useCoins();
  const navigate = useNavigate();

  if (isLoading || !data) {
    return (
      <div className="w-full grid grid-cols-5 gap-4">
        {Array.from(Array(5).keys()).map((i) => (
          <div key={i} className="bg-slate-800 rounded animate-pulse h-40" />
        ))}
      </div>
    );
  }

  const coins = data
    .sort(
      (left, right) =>
        right.price_change_percentage_7d_in_currency -
        left.price_change_percentage_7d_in_currency
    )
    .slice(0, 5);

  return (
    <div className="text-white">
      <div className="font-medium text-xl mb-4 text-center">Top Performers</div>
      <div className="w-full grid grid-cols-5 gap-4">
        {coins.map((coin) => (
          <div
            key={coin.id}
            onClick={() => navigate("/" + coin.id)}
            className="border border-white border-opacity-50 rounded-lg p-3 text-opacity-75 hover:bg-white hover:bg-opacity-5 cursor-pointer transition-all"
          >
            <div className="flex gap-2 items-center mb-4">
              <img src={coin.image} className="w-6 h-6" />
              <span className="font-medium text-base flex-1">{coin.name}</span>
              <Percentage value={coin.price_change_percentage_7d_in_currency} />
            </div>
            <ResponsiveContainer height={75}>
              <LineChart
                margin={{
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                }}
                data={coin.sparkline_in_7d.price.map((value) => ({
                  value: value,
                }))}
              >
                <YAxis hide type="number" domain={["dataMin", "dataMax"]} />
                <Line
                  type="monotone"
                  dataKey="value"
                  dot={false}
                  strokeWidth={2}
                  stroke="#ffd700"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}