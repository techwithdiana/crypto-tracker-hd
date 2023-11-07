import { fetcher } from "./client";
import { CoinDetail, CoinMarket, MarketPrices } from "./models";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { useState } from "react";
import CoinCell from "../components/coinCell";
import CurrencyCell from "../components/currencyCell";
import PercentageCell from "../components/percentageCell";
import { useUserContext } from "./userContext";
import ChartCell from "../components/chartCell";
import useSWR from "swr";

/**
 *
 * @param id Id of the Coin
 * @returns Details for a single coin
 */
export function useCoin(id: string) {
  /**
   * useSWR is a handy library that manages a cache and all API calls for you
   * if multiple pages or components all use the same API call, it will share the
   * response and only call the API once
   *
   * you can also tell it to cache the API call for a certain amount of time or even
   * things like refresh the API call when the user leaves the tab and comes back
   *
   * it also returns { isLoading, isValidation, data, error }
   *
   * isLoading is whether its the first time the call is loading
   * isValidation is whether the call is being reloaded
   * error is the error from the api call
   * data is the data from the api call
   */
  const { isLoading, data } = useSWR("coins/" + id, fetcher<CoinDetail>, {
    //This will cache the API call for 60 seconds, if a page/component requests it again after
    //60 seconds it will reload
    dedupingInterval: 60_000,
  });

  return { isLoading, data: data?.data };
}

/**
 *
 * @returns A list of all coins and their market values
 */
export function useCoins() {
  const { currency } = useUserContext();

  const { isLoading, data } = useSWR(
    `coins/markets?vs_currency=${currency}&price_change_percentage=7d&sparkline=true`,
    fetcher<CoinMarket[]>,
    {
      dedupingInterval: 60_000,
    }
  );

  return { isLoading, data: data?.data };
}

/**
 *
 * @param id The Coin Id
 * @param days The days to return
 * @returns A detailed market history of the coin
 */
export function useCoinHistory(id: string, days: number) {
  const { currency } = useUserContext();

  const { isLoading, data } = useSWR(
    `coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
    fetcher<MarketPrices>,
    {
      dedupingInterval: 60_000,
    }
  );

  return { isLoading, data: data?.data };
}

/**
 *
 * @returns Builds and returns the data required for the coin table
 */
export function useCoinTable() {
  const { isLoading, data } = useCoins();
  const [filter, setFilter] = useState<string>("");

  const helper = createColumnHelper<CoinMarket>();

  //useReactTable is a hook that manages all the sorting, filtering, pagination, and rendering for you
  const table = useReactTable<CoinMarket>({
    columns: [
      helper.accessor("name", {
        header: "Coin",
        cell: CoinCell,
      }),
      helper.accessor("current_price", {
        header: "Current Price",
        cell: CurrencyCell,
      }),
      helper.accessor("market_cap", {
        header: "Market Cap",
        cell: CurrencyCell,
      }),
      helper.accessor("price_change_percentage_24h", {
        header: "24h Change",
        cell: PercentageCell,
      }),
      helper.accessor("price_change_percentage_7d_in_currency", {
        header: "7d Change",
        cell: PercentageCell,
      }),
      helper.accessor("sparkline_in_7d.price", {
        header: "7d History",
        cell: ChartCell,
        enableSorting: false,
      }),
    ],
    data: data ?? [],
    enableGlobalFilter: true,
    initialState: {
      sorting: [{ id: "market_cap", desc: true }],
    },
    state: {
      globalFilter: filter,
    },
    getRowId: (row) => row.id,
    globalFilterFn: (row, _columnId, value: string) => {
      return (
        row.original.name.toLowerCase().includes(value.trim().toLowerCase()) ||
        row.original.symbol.toLowerCase().includes(value.trim().toLowerCase())
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return { isLoading, data, table, setFilter };
}
