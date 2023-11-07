import clsx from "clsx";
import { useState } from "react";
import {
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { useCoinHistory } from "../utils/hooks";
import { parseCurrency } from "../utils/utils";

export default function Chart({ id }: { id: string }) {
  const [days, setDays] = useState<number>(1);
  const { isLoading, data } = useCoinHistory(id, days);

  return (
    <div>
      {(isLoading || !data) && (
        <div className="bg-slate-800 rounded-lg w-full h-[500px] animate-pulse" />
      )}
      {!!data && (
        <ResponsiveContainer height={500}>
          <LineChart
            data={data.prices.map((tick) => ({
              value: tick[1],
              time:
                days === 1
                  ? new Date(tick[0]).toLocaleTimeString()
                  : new Date(tick[0]).toLocaleDateString(),
            }))}
            margin={{ top: 16, left: 16, right: 16, bottom: 16 }}
          >
            <YAxis
              type="number"
              domain={["dataMin", "dataMax"]}
              tickFormatter={(value) => {
                if (typeof value === "number") return parseCurrency(value);
                return value;
              }}
              className="font-light text-xs"
            />
            <XAxis dataKey="time" className="font-light text-xs" />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ffd700"
              dot={false}
              strokeWidth={3}
            />
            <Tooltip formatter={(value: number) => parseCurrency(value, 4)} />
          </LineChart>
        </ResponsiveContainer>
      )}
      {/** This is just building the buttons based on the length/label */}
      <div className="flex flex-row lg:p-4 gap-2 lg:gap-6">
        {[
          { length: 1, label: "24h" },
          { length: 7, label: "Last Week" },
          { length: 30, label: "Last Month" },
          { length: 90, label: "Last 3 Months" },
          { length: 365, label: "Last Year" },
        ].map(({ length, label }) => (
          <button
            onClick={() => setDays(length)}
            disabled={isLoading || !data}
            className={clsx("p-3 flex-1 rounded-lg", {
              "bg-transparent border border-yellow-400 text-white hover:bg-yellow-400 hover:text-black transition-all font-medium":
                length !== days,
              "bg-yellow-400 font-bold": length === days,
            })}
            key={length}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

