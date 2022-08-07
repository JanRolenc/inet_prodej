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
  numberCzechFormat(price: number): string
}
export interface IShopItemView {
  item: IItem
  shopItemClick: (oneItemToRemove: IItem) => void
  numberCzechFormat(price: number): string
}
export interface ICartView {
  cartState: IItem[]
  removeItem: (item: IItem) => void
  decreaseItem: (item: IItem) => void
  increaseItem: (item: IItem, count: number) => void
  totalPrice: number
  // touchTogglerState: string
  headerSettingsState: IHeaderSettings
  numberCzechFormat(price: number): string
  personState: IPerson | null
  modalViewToggler: (modal: boolean) => void
  modalTogglerState: boolean
  salesListViewToggler: (modal: boolean) => void
  salesListViewTogglerState: boolean
}
export interface ICartItemView {
  item: IItem
  // touchTogglerState: string
  headerSettingsState: IHeaderSettings
  removeItem(itemToRemove: IItem): void
  decreaseItem(item: IItem): void
  increaseItem(item: IItem, count: number): void
  numberCzechFormat(price: number): string
}
export interface IModalView {
  cartState: IItem[]
  personState: IPerson | null
  totalPrice: number
  numberCzechFormat(price: number): string
  modalViewToggler: (modal: boolean) => void
  modalTogglerState: boolean
  clearCart(): void
}
export interface IModalItemView {
  item: IItem
  numberCzechFormat(price: number): string
}

export interface IScanner {
  id: string
  name: string
}

export interface IHeaderSettings {
  touched: string
  scanner: string | null
  scanners: IScanner[]
}
export interface IHeaderView {
  touchTogglerState: string
  touchScreenToggler: (touch: string) => void
  headerSettingsState: IHeaderSettings
  // scannerState: string | null
  scannerToggler: (scanner: string) => void
}

export interface IPerson {
  id: number
  fullname: string
  money: number
  ctecka: string | null
}
export interface IPersonView {
  personState: IPerson | null
}

export interface IItemsList {
  cartState: IItem[]
  numberCzechFormat(price: number): string
  totalPrice: number
}

export interface ISalesListView {
  numberCzechFormat(price: number): string
  salesListViewToggler: (modal: boolean) => void
  salesListViewTogglerState: boolean
}
