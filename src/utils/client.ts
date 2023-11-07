import axios from "axios";

const apiKey: string = "CG-PQLTxwVGPZuRTH7By9yZyqx8";
const baseUrl: string = "https://api.coingecko.com/api/v3/";

/**
 *
 * @param route the API route
 * @returns the API response
 */
export function fetcher<TEntity>(route: string) {
  //axios is a handy API client that makes it easier to manage headers,
  //responses, parsing etc
  return axios.get<TEntity>(baseUrl + route, {
    headers: {
      "x-cg-demo-api-key": apiKey,
    },
  });
}