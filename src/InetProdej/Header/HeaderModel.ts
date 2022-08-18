import { createModel } from "@rematch/core";
import type { RootModel } from "../RootModel";
import { IScanner, IHeaderSettings } from "../interfaces";
import Server from "../data/Server";

function getShopIdFromURL(): number {
  return parseInt(window.location.pathname.replace(/^.*\/(\d+)$/, "$1"));
}

export const HeaderModel = createModel<RootModel>()({
  state: {
    shopId: getShopIdFromURL(),
    touched: localStorage.touched,
    scanner: localStorage.scanner,
    scanners: [],
  } as IHeaderSettings,
  reducers: {
    setScanners(state, scanners: IScanner[]) {
      return { ...state, scanners: scanners };
    },
    changeScanner(state, scanner: string) {
      localStorage.scanner = scanner;

      return { ...state, scanner }; //shodne s: return { ...state, scanner: scanner}
    },
    toggleTouched(state) {
      if (state.touched === "false") {
        localStorage.touched = "true";
      } else {
        localStorage.touched = "false";
      }
      return { ...state, touched: localStorage.touched };
    },
  },
  effects: (dispatch) => ({
    async loadHeaderSettings() {
      const result = await Server.loadScanners();
      dispatch.HeaderModel.setScanners(result.getData() || ({} as IScanner[]));
    },
  }),
});
