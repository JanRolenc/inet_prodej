import { createModel } from "@rematch/core";
import type { RootModel } from "../RootModel";
import { ISalesListSettings, ISale } from "../interfaces";
import Server from "../data/Server";

export const SalesListModel = createModel<RootModel>()({
  state: {
    open: false,
    list: [],
  } as ISalesListSettings,
  reducers: {
    setLastSales(state, list: ISale[]) {
      return { ...state, open: !state.open, list };
    },
    clearSalesList(state) {
      return { ...state, open: !state.open, list: [] };
    },
  },
  effects: (dispatch) => ({
    async loadSalesList(shopId: number) {
      const result = await Server.loadLastSales(shopId);
      dispatch.SalesListModel.setLastSales(result.getData() || ({} as ISale[]));
    },
  }),
});
