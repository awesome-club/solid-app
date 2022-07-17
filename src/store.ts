import { createStore } from "solid-js/store";
import { Stock } from "./api/StockApi";

interface AppStore {
  activeTicker: string | null;
  stocks: Stock[];
}

export default createStore<AppStore>({
  activeTicker: null,
  stocks: [],
});
