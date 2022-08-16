import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'
import { ISalesListSettings, ISale } from '../interfaces'
import Server from '../data/Server'

export const SalesListModel = createModel<RootModel>()({
  state: {
    open: false,
    list: [],
  } as ISalesListSettings,
  reducers: {
    // toggle(state) {
    //   return { ...state, open: !state.open }
    // },
    setSales(state, list: ISale[]) {
      return { ...state, open: !state.open, list: list }
    },
    clearSalesList(state) {
      return { ...state, open: !state.open, list: [] }
    },
  },
  effects: (dispatch) => ({
    async loadSalesList() {
      const result = await Server.loadSales()
      dispatch.SalesListModel.setSales(result.getSales() || ({} as ISale[]))
    },
  }),
})
