import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'
import Server from '../data/Server'
import { ISaleListModel, ISellRequest } from '../interfaces'

export const SaleListModel = createModel<RootModel>()({
  state: {
    open: false,
    confirmed: 'neurceno',
  } as ISaleListModel,
  reducers: {
    setSell(state, confirmed: string) {
      return { ...state, confirmed }
    },
    toggle(state) {
      return { ...state, open: !state.open }
    },
  },
  // effects: (dispatch) => ({
  //   async callSell(personId: number, userId: number, shopId: number) {
  //     const result = await Server.sell(personId, userId, shopId)
  //     dispatch.ModalModel.setSell(result.getData() || '')
  //   },
  // }),
  effects: (dispatch) => ({
    async callSell(sellRequest: ISellRequest) {
      const result = await Server.sell(sellRequest)
      dispatch.SaleListModel.setSell(result.getData() || '')
    },
  }),
})
