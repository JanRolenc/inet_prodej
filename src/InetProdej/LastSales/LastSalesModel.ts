import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'
import { ILastSales, ISale } from '../interfaces'
import Server from '../data/Server'

export const LastSalesModel = createModel<RootModel>()({
  state: {
    open: false,
    list: [],
  } as ILastSales,
  reducers: {
    setLastSales(state, list: ISale[]) {
      return { ...state, open: !state.open, list }
    },
    clearSalesList(state) {
      return { ...state, open: !state.open, list: [] }
    },
  },
  effects: (dispatch) => ({
    async loadSalesList(shopId: number) {
      const result = await Server.loadLastSales(shopId)
      dispatch.LastSalesModel.setLastSales(result.getData() || ({} as ISale[]))
    },
  }),
})
