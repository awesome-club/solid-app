import { createSignal, For, Show } from "solid-js";
import styles from "./Header.module.scss";
import {searchTicker, getDailyValues} from "../api/StockApi";
import Store from "../store";
import { Stock } from "../api/Dtos";

export default function Header() {
  const [tickers, setTickers] = createSignal([] as Stock[]);
  const [store, setStore] = Store;

  async function onSearch(ev: KeyboardEvent) {
    const value = (ev.target as HTMLInputElement).value;
    if (!value) {
      setTickers([]);
      return;
    }
    if (ev.code !== "Enter") return;
    
    const resp = await searchTicker(value);
    setTickers((await resp.json()).results);
  }

  async function onTickerClick(ticker: Stock) {
    setStore("activeTicker", ticker.ticker);
    setTickers([]);
  }

  return <header class={styles.main}>
    <div class={styles.dropdown}>
      <input type="search" 
        placeholder="Search ticker..." 
        onKeyUp={onSearch} />

      <Show when={tickers().length > 0}>
        <ul>
        <For each={tickers()}>{ticker =>
          <li onClick={() => onTickerClick(ticker)}>
            <h3>{ticker.ticker}</h3>
            <p>{ticker.name}</p>
          </li>
        }</For>
        </ul>
      </Show>
    </div>
  </header>
}