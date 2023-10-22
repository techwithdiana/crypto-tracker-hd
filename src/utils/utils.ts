import currency from "currency.js";

export function parseCurrency(value: number, precision: number = 2) {
  let suffix = "";
  if (value > 1_000_000) {
    value /= 1_000_000;
    suffix = "M";
  } else if (value > 1_000) {
    value /= 1_000;
    suffix = "K";
  }

  return currency(value, { precision: precision }).format() + suffix;
}

export function parsePercentage(value: number, precision: number = 2) {
  return value.toFixed(precision) + "%";
}

