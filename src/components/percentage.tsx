import clsx from "clsx";
import { parsePercentage } from "../utils/utils";

export default function Percentage({
  value,
  precision = 2,
}: {
  value: number;
  precision?: number;
}) {
  return (
    <span
      className={clsx("text-white text-sm px-1.5 py-1 rounded", {
        "bg-green-600": value > 0,
        "bg-red-600": value < 0,
        "bg-gray-600": value === 0,
      })}
    >
      {parsePercentage(value, precision)}
    </span>
  );
}