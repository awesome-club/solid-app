import { createResource, createSignal, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";
import {getDailyValues, getTickerDetails} from "../api/StockApi";
import { StockApiToken } from "../env";
import { fmt } from "../service/NumberService";
import styles from "./StockDetails.module.scss";
import Store from "../store";
import { Stock } from "../api/Dtos";

export interface StockDetailsProps {
  ticker: string;
  onClose: () => void;
}

export default function StockDetails({ticker, onClose}: StockDetailsProps) {
  const [store, setStore] = Store;
  const [stock] = createResource(() => ticker, getTickerDetails)

  async function follow() {
    if (!stock()) return;

    const resp = await getDailyValues(ticker);
    const data = {
      ...stock(),
      values: [await resp.json()]
    } as Stock;

    setStore("stocks", [data, ...store.stocks]);
    onClose();
  }

  return <Portal>
    <div class={styles.cover} onClick={onClose} />
    <div class={styles.modal} onClick={ev => ev.stopPropagation()}>
      <Show 
        fallback="Loading..."
        when={!stock.loading && !stock.error}>
        
        <header>
          <img src={`${stock()?.branding.logo_url}?apiKey=${StockApiToken}`} />
          <div class="data">
            <h1><span>{stock()?.ticker}</span>{stock()?.name}</h1>
            <a href={stock()?.homepage_url}>{stock()?.homepage_url}</a>
          </div>
        </header>
        
        <section>
          <p>{stock()?.description}</p>
          <ul>
            <li>
              <strong>Market Cap:</strong>${fmt(stock()?.market_cap! / 1_000_000_000)} Billion
            </li>
            <li>
              <strong>Employees:</strong>{fmt(stock()?.total_employees!)}
            </li>
            <li>
              <strong>Shares Outstanding:</strong>{fmt(stock()?.share_class_shares_outstanding!)}
            </li>
          </ul>
        </section>

        <footer>
          <button onClick={follow}>Follow</button>
        </footer>

      </Show>
    </div>
  </Portal>
}