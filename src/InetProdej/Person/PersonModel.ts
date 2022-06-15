import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'
import Server from '../data/Server'

export const PersonModel = createModel<RootModel>()({
  state: '',
  reducers: {
    setPerson(state) {
      return state
    },
  },
  // effects: (dispatch) => ({
  // // 	incrementAsync(payload: number, state) {
  // // 		dispatch.count.increment(payload)
  // // 	},
  // // }),
  // findPerson() {
  //   const result = Server.findPerson("3890")
  //   // dispatch.PersonModel.setPerson(result.getPerson() || ({} as string))
  //   dispatch.PersonModel.setPerson(result.getPerson())
  // },
})
