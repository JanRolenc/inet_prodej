import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'

export const SalesListModel = createModel<RootModel>()({
  state: false,
  reducers: {
    toggle(state) {
      return !state
    },
  },
  // effects: (dispatch) => ({
  //     async incrementAsync(payload: number, state) {
  //       console.log('This is current root state', state)
  //       await new Promise((resolve) => setTimeout(resolve, 1000))
  //       dispatch.count.increment(payload)
  //     },
  //   }),
})
