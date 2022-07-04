export interface IItem {
  id: number
  type: string
  name: string
  price: number | any
  quantity: number | any
  description: string
}

export interface IShopView {
  shopState: IItem[]
  shopItemClick: (oneItemToRemove: IItem) => void
  priceCzechFormat(price: number): string
}
export interface IShopItemView {
  item: IItem
  shopItemClick: (oneItemToRemove: IItem) => void
  priceCzechFormat(price: number): string
}
export interface ICartView {
  cartState: IItem[]
  removeItem: (item: IItem) => void
  decreaseItem: (item: IItem) => void
  increaseItem: (item: IItem, count: number) => void
  totalPrice: number
  touchTogglerState: string
  priceCzechFormat(price: number): string
  personState: IPerson | null
  modalViewToggler: (modal: boolean) => void
  modalTogglerState: boolean
}
export interface ICartItemView {
  item: IItem
  touchTogglerState: string
  removeItem(itemToRemove: IItem): void
  decreaseItem(item: IItem): void
  increaseItem(item: IItem, count: number): void
  priceCzechFormat(price: number): string
}
export interface IModalView {
  cartState: IItem[]
  totalPrice: number
  priceCzechFormat(price: number): string
  modalViewToggler: (modal: boolean) => void
  modalTogglerState: boolean
}
export interface IModalItemView {
  item: IItem
  priceCzechFormat(price: number): string
}

export interface IHeaderView {
  touchTogglerState: string
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
