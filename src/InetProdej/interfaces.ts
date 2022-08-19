export interface IItem {
  id: number
  type: string
  name: string
  price: number
  quantity: number
  description: string
}

export interface IShopView {
  shopState: IItem[]
  shopItemClick: (oneItemToRemove: IItem) => void
  headerState: IHeaderSettings
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
  // headerState: IHeaderSettings
  personState: IPersonState | null
  modalViewToggler: (modal: boolean) => void
  modalState: boolean
  salesListState: ISalesList
}
export interface ICartItemView {
  item: IItem
  headerState: IHeaderSettings
  removeItem(itemToRemove: IItem): void
  decreaseItem(item: IItem): void
  increaseItem(item: IItem, count: number): void
  numberCzechFormat(price: number): string
}
export interface IModalView {
  cartState: IItem[]
  personState: IPersonState | null
  totalPrice: number
  // numberCzechFormat(price: number): string;
  modalViewToggler: (modal: boolean) => void
  modalState: boolean
  clearCart(): void
  clearPerson(): void
  clearPersonInput(): void
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
  shopId: number
  shopName: string
  touched: string
  scanner: string | null
  scanners: IScanner[]
}
export interface IHeaderView {
  touchTogglerState: string
  touchScreenToggler: (touch: string) => void
  headerState: IHeaderSettings
  scannerToggler: (scanner: string) => void
}

export interface IPerson {
  id: number
  fullname: string
  money: number
}
export interface IPersonState {
  person: IPerson | null
  personInput: string | null
}
export interface IPersonView {
  personState: IPersonState | null
  modalState: boolean
}

export interface IItemsList {
  cartState: IItem[]
  numberCzechFormat(price: number): string
  totalPrice: number
}

export interface ISalesListView {
  // numberCzechFormat(price: number): string;
  salesListState: ISalesList
  clearSalesList(salesListState: ISalesList): void
}
export interface ISale {
  id: number
  client: string
  salesman: string
  dateOfSale: string
  article: IArticle[]
  totalPrice: number
}
export interface ISalesList {
  open: boolean
  list: ISale[]
}

export interface IArticle {
  article1: string
  quantity: number
  itemPrice: number
}
