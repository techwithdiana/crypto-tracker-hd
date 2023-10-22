import clsx from "clsx";
import { useCoin } from "../utils/hooks";
import { useUserContext } from "../utils/userContext";
import { parseCurrency } from "../utils/utils";

export default function Summary({ id }: { id: string }) {
  const { isLoading, data } = useCoin(id);
  const { currency } = useUserContext();

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 items-center text-white bg-slate-800 rounded-lg shadow-md p-8 h-full",
        {
          "animate-pulse": isLoading,
        }
      )}
    >
      {(isLoading || !data) && (
        <>
          {Array.from(Array(5).keys()).map((i) => (
            <div
              key={i}
              className="h-20 bg-slate-50 animate-pulse rounded-lg"
            />
          ))}
        </>
      )}
      {!!data && (
        <>
          <img src={data.image.large} className="w-40 h-40" />
          <span className="font-bold text-5xl">{data.name}</span>
          <span className="text-center">
            {data.description.en.split(". ")[0]}.
          </span>
          <div className="flex gap-2 text-2xl">
            <span className="font-bold">Rank:</span>
            <span>{data.market_data.market_cap_rank}</span>
          </div>
          <div className="flex gap-2 text-2xl">
            <span className="font-bold">Current Price:</span>
            <span>
              {parseCurrency(
                currency === "usd"
                  ? data.market_data.current_price.usd
                  : data.market_data.current_price.cad
              )}
            </span>
          </div>
          <div className="flex gap-2 text-2xl">
            <span className="font-bold">Market Cap:</span>
            <span>
              {parseCurrency(
                currency === "usd"
                  ? data.market_data.market_cap.usd
                  : data.market_data.market_cap.cad
              )}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
