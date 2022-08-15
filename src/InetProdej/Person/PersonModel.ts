import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'
import Server from '../data/Server'
import { IPersonState, IPerson } from '../interfaces'

export const PersonModel = createModel<RootModel>()({
  state: {
    person: {},
    personInput: '',
  } as IPersonState,
  reducers: {
    setPerson(state, person: IPerson | null) {
      return { ...state, person: person }
    },
    setPersonInput(state, personInput: string | null) {
      return { ...state, personInput: personInput }
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
