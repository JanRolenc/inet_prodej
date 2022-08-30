import { createModel } from '@rematch/core'
import type { RootModel } from '../RootModel'
import Server from '../data/Server'
import { IItem, IShopReload } from '../interfaces'

export const ShopModel = createModel<RootModel>()({
  state: [] as IItem[],
  reducers: {
    setItems(state, items: IItem[]) {
      return items
    },
    // reloadShopList(state) {
    //   // const changeListsAfterReload = () => {
    //     const shopItemsCopy: IItem[] = [...state];
    //     const cartItemsCopy: IItem[] = cartState;
    //     shopItemsCopy.forEach((itemShop) => {
    //       var itemCart = cartItemsCopy.find(
    //         (itemCart) => itemCart.id === itemShop.id
    //       );
    //       if (itemCart) {
    //         if (itemCart.quantity >= itemShop.quantity) {
    //           itemShop = {
    //             ...itemShop,
    //             quantity: itemShop.quantity - itemCart.quantity,
    //           };
    //         } else {
    //           itemCart = { ...itemCart, quantity: itemShop.quantity };
    //           itemShop = { ...itemShop, quantity: 0 };
    //         }
    //       }
    //     });
    //     return [shopItemsCopy, cartItemsCopy];
    //   // };
    // },
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
    async loadItems(shopId: number) {
      const result = await Server.loadItems(shopId)
      dispatch.ShopModel.setItems(result.getData() || ({} as IItem[]))
    },

    async reloadItems(shopReload: IShopReload) {
      const result = await Server.loadItems(shopReload.shopId)

      const lists: IItem[][] = recomputeLists(
        result.getData() || ({} as IItem[]),
        shopReload.cartItems,
      )
      console.log('result.getData()', result.getData())
      console.log('shopReload.cartItems', shopReload.cartItems)
      console.log('list[0] shopItems', lists[0])
      console.log('list[1] shopItems', lists[1])
      dispatch.ShopModel.setItems(lists[0])
      dispatch.CartModel.setCart(lists[1])
    },
  }),
})

function recomputeLists(shopState: IItem[], cartState: IItem[]): IItem[][] {
  const shopItemsCopy: IItem[] = shopState.map((item) => ({ ...item }))
  const cartItemsCopy: IItem[] = cartState.map((item) => ({ ...item }))
  shopItemsCopy.forEach((itemShop) => {
    var itemCart = cartItemsCopy.find((item) => item.id === itemShop.id)
    var itemCartIndex = cartItemsCopy.findIndex(
      (item) => item.id === itemShop.id,
    )
    if (itemCart) {
      if (itemShop.quantity >= itemCart.quantity) {
        console.log('true: itemShop.quantity >= itemCart.quantity') //funguje
        console.log(
          'itemShop mnozstvi PRED odectem mnozstvi z cart',
          itemShop.quantity,
        ) //funguje
        // v obchode vice nebo stejne nez v kosiku
        itemShop = {
          ...itemShop,
          quantity: itemShop.quantity - itemCart.quantity,
        }
        console.log(
          'itemShop mnozstvi PO odectu mnozstvi z cart',
          itemShop.quantity,
        ) //funguje
        // v kosiku vice nez v obchode
      } else if (itemShop.quantity > 0) {
        itemCart = { ...itemCart, quantity: itemShop.quantity }
        itemShop = { ...itemShop, quantity: 0 }
        alert(
          `${itemCart.name}: nedostatečná skladová zásoba - množství v košíku snížena`,
        )
        //v obchode nulove mnozstvi
      } else {
        cartItemsCopy.splice(itemCartIndex, 1)
        alert(
          `${itemCart.name}: zboží není skladem - položka bude odebrána z košíku`,
        )
      }
    }
  })
  console.log('shopItemsCopy po cyklu', shopItemsCopy) //TADY TO NEFUNGUJE
  console.log('cartItemsCopy po cyklu', cartItemsCopy) //TADY TO NEFUNGUJE
  return [shopItemsCopy, cartItemsCopy]
}
