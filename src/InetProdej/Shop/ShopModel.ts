import { createModel, Models } from '@rematch/core'
import type { RootModel } from '../RootModel'
import data from '../data.json'
import { IItem } from '../interfaces'

export const ShopModel = createModel<RootModel>()({
  state: data as IItem[],
  reducers: {
    decrement(state, itemToDecrease: IItem) {
      const itemsCopy: IItem[] = [...state]
      for (let i = 0; i < itemsCopy.length; i++) {
        const item = itemsCopy[i]
        if (
          item.id === itemToDecrease.id &&
          (item.type === 'standard' || item.type === 'priceOptional')
        ) {
          itemsCopy[i] = {
            ...item,
            quantity: item.quantity - 1,
          }
        }
      }
      return itemsCopy
    },
    increment(state, itemToIncrease: IItem) {
      const itemsCopy: IItem[] = [...state]
      for (let i = 0; i < itemsCopy.length; i++) {
        const item = itemsCopy[i]
        if (
          item.id === itemToIncrease.id &&
          (itemToIncrease.type === 'standard' ||
            itemToIncrease.type === 'priceOptional')
        ) {
          itemsCopy[i] = {
            ...item,
            quantity: item.quantity + 1,
          }
        } else if (
          itemToIncrease.type === 'quantityOptional' ||
          itemToIncrease.type === 'quantityAndPriceOptional'
        ) {
          itemsCopy[i] = { ...item, quantity: item.quantity }
        }
      }
      return itemsCopy
    },
    addRemoved(state, itemRemoved: IItem) {
      const itemsCopy: IItem[] = [...state]
      for (let i = 0; i < itemsCopy.length; i++) {
        const item = itemsCopy[i]
        if (
          item.id === itemRemoved.id &&
          (itemRemoved.type === 'standard' ||
            itemRemoved.type === 'priceOptional')
        ) {
          itemsCopy[i] = {
            ...item,
            quantity: item.quantity + itemRemoved.quantity,
          }
          break
        }
      }
      return itemsCopy
    },
  },
  // effects: (dispatch) => ({
  //   async incrementAsync(payload: number, state) {
  //     console.log('This is current root state', state)
  //     await new Promise((resolve) => setTimeout(resolve, 1000))
  //     dispatch.count.increment(payload)
  //   },
  // }),
})
