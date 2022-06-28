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
  increaseItem: (item: IItem, count: number) => void
  totalPrice: number
  toggleTouchState: string
  priceCzechFormat(price: number): string
  personState: IPerson | null
}
export interface IShopItemView {
  item: IItem
  shopItemClick: (oneItemToRemove: IItem) => void
  priceCzechFormat(price: number): string
}

export interface ICartItemView {
  item: IItem
  toggleTouchState: string
  removeItem(itemToRemove: IItem): void
  decreaseItem(item: IItem): void
  increaseItem(item: IItem, count: number): void
  priceCzechFormat(price: number): string
}

export interface IShopView {
  shopState: IItem[]
  shopItemClick: (oneItemToRemove: IItem) => void
  priceCzechFormat(price: number): string
}
export interface IHeaderView {
  toggleTouchState: string
  touchScreenToggler: (touch: string) => void
  personState: IPerson | null
}

export interface IPerson {
  id: number
  fullname: string
  money: number
}
export interface IPersonView {
  personState: IPerson | null
}
