import { Component, createEffect, For, onMount, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import styles from './App.module.scss';
import Header from './components/Header';
import StockDetails from './components/StockDetails';
import { StockApiToken } from './env';
import Store from "./store";

const {localStorage} = window;

const App: Component = () => {
  const [store, setStore] = Store;

  const isDetailsModal = () => !!store.activeTicker;

  createEffect(() => {
    if (store.stocks.length === 0) return;
    const stocks = JSON.stringify(store.stocks);
    localStorage.setItem("stocks", stocks);
  });

  onMount(() => {
    const stocks = localStorage.getItem("stocks");
    if (!stocks) return;
    setStore("stocks", JSON.parse(stocks))
  });

  return (
    <div class={styles.app}>
      <Header />

      <main>
        <ul>
          <For each={store.stocks}>{stock =>
            <li>
              <img src={`${stock.branding.logo_url}?apiKey=${StockApiToken}`} />
              <section>
                <h6>${stock.values[0].low}</h6>
                <h4>${stock.values[0].open}</h4>
                <h6>${stock.values[0].high}</h6>
              </section>
            </li>
          }</For>
        </ul>
      </main>

      <Show when={isDetailsModal()}>
        <StockDetails 
          ticker={store.activeTicker!} 
          onClose={() => setStore("activeTicker", null)}
          />
      </Show>
    </div>
  );
};

export default App;
