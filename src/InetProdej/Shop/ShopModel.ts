import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'
import Server from '../data/Server'
import { IItem } from '../interfaces'

export const ShopModel = createModel<RootModel>()({
  state: [] as IItem[],
  reducers: {
    setItems(state, items: IItem[]) {
      return items
    },
    decrement(state, itemToDecrease: IItem, count: number) {
      const itemsCopy: IItem[] = [...state]
      for (let i = 0; i < itemsCopy.length; i++) {
        const item = itemsCopy[i]
        if (item.id === itemToDecrease.id && item.type === 'standard') {
          if (item.quantity >= count) {
            itemsCopy[i] = {
              ...item,
              quantity: item.quantity - count,
            }
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
          itemToIncrease.type === 'standard'
        ) {
          itemsCopy[i] = {
            ...item,
            quantity: item.quantity + 1,
          }
        } else if (
          itemToIncrease.type === 'quantityOptional' ||
          itemToIncrease.type === 'quantityAndPriceOptional' ||
          itemToIncrease.type === 'service'
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
        if (item.id === itemRemoved.id && itemRemoved.type === 'standard') {
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
  effects: (dispatch) => ({
    //   async incrementAsync(payload: number, state) {
    //     console.log('This is current root state', state)
    //     await new Promise((resolve) => setTimeout(resolve, 1000))
    //     dispatch.count.increment(payload)
    //   },
    async loadItems() {
      const result = await Server.loadItems()
      dispatch.ShopModel.setItems(result.getData() || ({} as IItem[]))
    },
  }),
})
