import { useSearchParams } from "react-router-dom";
import { useCoins } from "../utils/hooks";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { parseCurrency, parsePercentage } from "../utils/utils";
import { useState } from "react";
import clsx from "clsx";

export default function ComparisonPage() {
  const [mode, setMode] = useState<"currency" | "percentage">("percentage");

  const { data } = useCoins();
  const [searchParams] = useSearchParams();

  const selectedCoins = searchParams.get("coins")?.split(",") ?? [];
  const chartData: { [key: string]: number }[] = [];

  for (const id of selectedCoins) {
    const coin = data?.find((coin) => coin.id === id);
    if (!coin) continue;

    const first = coin.sparkline_in_7d.price[0];

    for (let i = 0; i < coin.sparkline_in_7d.price.length; i++) {
      let value = coin.sparkline_in_7d.price[i];
      if (mode === "percentage") {
        value /= first;
      }
      const data = chartData[i];
      if (!data) {
        chartData.push({
          [id]: value,
          time:
            new Date().getTime() -
            (coin.sparkline_in_7d.price.length - i) * 1_000 * 60 * 60,
        });
      } else {
        data[id] = value;
      }
    }
  }

  const colors: string[] = ["#793FDF", "#7091F5", "#97FFF4", "#FFFD8C"];

  return (
    <div className="max-w-[120rem] mx-auto px-16 py-8">
      <div className="bg-slate-800 drop-shadow-md rounded-lg p-8">
        <div className="font-medium text-sm mb-8">
          <button
            onClick={() => setMode("currency")}
            className={clsx(
              "px-2 rounded-s border border-yellow-400 text-white",
              {
                "bg-yellow-400 text-black": mode === "currency",
              }
            )}
          >
            Currency
          </button>
          <button
            onClick={() => setMode("percentage")}
            className={clsx(
              "px-2 rounded-e border border-yellow-400 text-white",
              {
                "bg-yellow-400 text-black": mode === "percentage",
              }
            )}
          >
            Percentage
          </button>
        </div>
        {!!data && (
          <ResponsiveContainer height={600}>
            <LineChart data={chartData}>
              <YAxis
                tick={{ fill: "#ffffff" }}
                className="text-xs"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) => {
                  if (typeof value === "number")
                    return mode === "percentage"
                      ? parsePercentage(value - 1, 4)
                      : parseCurrency(value, 4);
                  return value;
                }}
              />
              <Tooltip
                formatter={(value: number) =>
                  mode === "percentage"
                    ? parsePercentage(value - 1, 4)
                    : parseCurrency(value, 4)
                }
              />
              <XAxis
                dataKey="time"
                tick={{ fill: "#ffffff" }}
                className="font-light text-xs"
                tickFormatter={(value) => {
                  if (typeof value === "number")
                    return new Date(value).toLocaleString();
                  return value;
                }}
              />
              <Legend />
              {selectedCoins.map((id, index) => (
                <Line
                  key={id}
                  dataKey={id}
                  name={data.find((coin) => coin.id === id)?.name ?? id}
                  dot={false}
                  strokeWidth={3}
                  stroke={colors[index]}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
