import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'

export const HeaderModel = createModel<RootModel>()({
  state: false,
  reducers: {
    toggle(state) {
      const toggleTouch = !state
      return toggleTouch
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
