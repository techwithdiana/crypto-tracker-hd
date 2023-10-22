import axios from "axios";

const apiKey: string = "CG-PQLTxwVGPZuRTH7By9yZyqx8";
const baseUrl: string = "https://api.coingecko.com/api/v3/";

export function fetcher<TEntity>(route: string) {
  return axios.get<TEntity>(baseUrl + route, {
    headers: {
      "x-cg-demo-api-key": apiKey,
    },
  });
}