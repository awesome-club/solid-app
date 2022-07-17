import { StockApiPath, StockApiToken } from "../env";
import { yesterday } from "../service/TimeService";
import { Stock } from "./Dtos";

const SearchTickerPath = `${StockApiPath}/v3/reference/tickers`;
const TickerDetailsPath = `${StockApiPath}/v3/reference/tickers`;
const DailyValuesPath = `${StockApiPath}/v1/open-close`;

export function searchTicker(ticker: string): Promise<Response> {
  ticker = ticker.toUpperCase();
  return fetch(
    `${SearchTickerPath}?ticker=${ticker}&apiKey=${StockApiToken}`,
  );
}

export async function getTickerDetails(ticker: string): Promise<Stock> {
  ticker = ticker.toUpperCase();
  const resp = await fetch(
    `${TickerDetailsPath}/${ticker}?apiKey=${StockApiToken}`,
  );
  return (await resp.json()).results;
}

export function getDailyValues(
  ticker: string,
  stamp = "",
): Promise<Response> {
  ticker = ticker.toUpperCase();
  if (!stamp) {
    stamp = yesterday();
  }
  return fetch(
    `${DailyValuesPath}/${ticker}/${stamp}?apiKey=${StockApiToken}`,
  );
}
