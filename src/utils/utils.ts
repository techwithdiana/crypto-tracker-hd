import currency from "currency.js";

/**
 *
 * @param value The currency value to format
 * @param precision How many decimal places to use
 * @returns Returns a formatted currency string
 */
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

/**
 *
 * @param value The percentage value to format
 * @param precision How many decimals places to use
 * @returns Returns a formatted percentage string
 */
export function parsePercentage(value: number, precision: number = 2) {
  return value.toFixed(precision) + "%";
}