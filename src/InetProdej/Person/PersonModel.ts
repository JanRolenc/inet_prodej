import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'
import Server from '../data/Server'
import { IPerson } from '../interfaces'

export const PersonModel = createModel<RootModel>()({
  state: null as IPerson | null,
  reducers: {
    setPerson(state, person: IPerson | null) {
      return person
    },
    // setPersonMoney(state, person: IPerson | null) {
    //   return person?.money
    // },
  },
  effects: (dispatch) => ({
    async findPerson(input: string) {
      const result = await Server.findPerson(input)
      dispatch.PersonModel.setPerson(result.getData())
    },
  }),
})
