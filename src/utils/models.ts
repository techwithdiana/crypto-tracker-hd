export interface Coin {
  id: string;
  symbol: string;
  name: string;
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
      cad: number;
    };
    market_cap: {
      usd: number;
      cad: number;
    };
    fully_diluted_valuation: {
      usd: number;
      cad: number;
    };
    total_volume: {
      usd: number;
      cad: number;
    };
    market_cap_rank: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
  };
}

export interface MarketPrices {
  prices: number[][];
}

export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  sparkline_in_7d: {
    price: number[];
  };
}
