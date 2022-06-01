import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'
import { IItem } from '../interfaces'

export const CartModel = createModel<RootModel>()({
  state: [] as IItem[],
  reducers: {
    increment(state, item: IItem) {
      const itemsSelectedCopy: IItem[] = [...state]

      var newItem = true
      for (let i = 0; i < itemsSelectedCopy.length; i++) {
        const itemSelected = itemsSelectedCopy[i]
        if (itemSelected.id === item.id) {
          itemsSelectedCopy[i] = {
            ...itemSelected,
            quantity: itemSelected.quantity + 1,
          }
          newItem = false
          break
        }
      }
      if (newItem) {
        if (item.type === 'quantityAndPriceOptional') {
          var setPrice = prompt('Zadej cenu:')
          var setQuantity = prompt('Zadej množství:')
          if (setPrice && setQuantity) {
            itemsSelectedCopy.push({
              ...item,
              price: parseInt(setPrice),
              quantity: parseInt(setQuantity),
              id: item.id + parseInt(setPrice),
            })
          }
        } else if (item.type === 'quantityOptional') {
          var setQuantity = prompt('Zadej množství:')
          if (setQuantity) {
            itemsSelectedCopy.push({ ...item, quantity: parseInt(setQuantity) })
          }
        } else if (item.type === 'service') {
          var setPrice = prompt('Zadej cenu:')
          if (setPrice) {
            itemsSelectedCopy.push({
              ...item,
              price: parseInt(setPrice),
              quantity: 1,
            })
          }
        } else {
          itemsSelectedCopy.push({ ...item, quantity: 1 })
        }
      }
      return itemsSelectedCopy
    },
    decrement(state, itemToDecrease: IItem) {
      var itemsSelectedCopy: IItem[] = [...state]
      for (let i = 0; i < itemsSelectedCopy.length; i++) {
        const itemSelected = itemsSelectedCopy[i]
        if (itemSelected.id === itemToDecrease.id) {
          itemsSelectedCopy[i] = {
            ...itemSelected,
            quantity: itemSelected.quantity - 1,
          }
          if (itemsSelectedCopy[i].quantity === 0) {
            itemsSelectedCopy = itemsSelectedCopy.filter(
              (item) => item.quantity !== 0,
            )
          }
        }
      }
      return itemsSelectedCopy
    },
    remove(state, itemToRemove: IItem) {
      const itemsSelectedCopy: IItem[] = [...state]
      const itemsSelected = itemsSelectedCopy.filter(
        (item) => item.id !== itemToRemove.id,
      )
      return itemsSelected
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
