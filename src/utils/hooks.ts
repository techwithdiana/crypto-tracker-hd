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

export function useCoin(id: string) {
  const { isLoading, data } = useSWR("coins/" + id, fetcher<CoinDetail>, {
    dedupingInterval: 60_000,
  });

  return { isLoading, data: data?.data };
}

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

export function useCoinTable() {
  const { isLoading, data } = useCoins();
  const [filter, setFilter] = useState<string>("");

  const helper = createColumnHelper<CoinMarket>();
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

