import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'
import Server from '../data/Server'
import { IModalModel } from '../interfaces'

export const ModalModel = createModel<RootModel>()({
  state: {
    open: false,
    confirmed: 'neurceno',
  } as IModalModel,
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
    async callSell() {
      const result = await Server.sell()
      dispatch.ModalModel.setSell(result.getData() || '')
    },
  }),
})
