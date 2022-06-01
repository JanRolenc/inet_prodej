import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'

export const PersonModel = createModel<RootModel>()({
  state: 0,
  reducers: {
    increment(state, payload: number) {
      return state + payload
    },
  },
  // effects: (dispatch) => ({
  // 	incrementAsync(payload: number, state) {
  // 		dispatch.count.increment(payload)
  // 	},
  // }),
})
