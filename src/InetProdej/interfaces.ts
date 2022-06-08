export interface IItem {
  id: number
  type: string
  name: string
  price: number | any
  quantity: number | any
  description: string
  // event: any
}

export interface ICartView {
  cartState: IItem[]
  removeItem: (item: IItem) => void
  decreaseItem: (item: IItem) => void
  increaseItem: (item: IItem) => void
  totalPrice: number
  toggleTouchState: boolean
}
export interface IShopItemView {
  item: IItem
  shopItemClick: (oneItemToRemove: IItem) => void
}

export interface ICartItemView {
  item: IItem
  toggleTouchState: boolean
  removeItem(itemToRemove: IItem): void
  decreaseItem(oneToDecrease: IItem): void
  increaseItem(oneToIncrease: IItem): void
}

export interface IShopView {
  shopState: IItem[]
  shopItemClick: (oneItemToRemove: IItem) => void
}
export interface IHeaderView {
  toggleTouchState: boolean
  touchScreenToggler: (touch: boolean) => void
}
