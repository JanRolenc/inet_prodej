export interface IItem {
  id: number
  type: string
  name: string
  price: number | any
  quantity: number | any
  description: string
}

export interface ICartView {
  cartState: IItem[]
  removeItem: (item: IItem) => void
  decreaseItem: (item: IItem) => void
  increaseItem: (item: IItem) => void
  totalPrice: number
}
export interface IShopItemView {
  item: IItem
  shopItemClick: (oneItemToRemove: IItem) => void
}

export interface IShopView {
  shopState: IItem[]
  shopItemClick: (oneItemToRemove: IItem) => void
}
