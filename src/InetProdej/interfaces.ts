export interface IItem {
  id: number;
  type: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
}

export interface IShopView {
  shopState: IItem[];
  shopItemClick: (oneItemToRemove: IItem) => void;
  headerState: IHeaderSettings;
  reloadButtonClick(): void;
}
export interface IShopItemView {
  item: IItem;
  shopItemClick: (oneItemToRemove: IItem) => void;
  numberCzechFormat(price: number): string;
}
export interface ICartView {
  cartState: IItem[];
  removeItem: (item: IItem) => void;
  decreaseItem: (item: IItem) => void;
  increaseItem: (item: IItem, count: number) => void;
  totalPrice: number;
  personState: IPersonState | null;
  modalViewToggler: (modal: boolean) => void;
  saleListState: ISaleListModel;
  lastSalesListState: ILastSales;
}
export interface ICartItemView {
  item: IItem;
  headerState: IHeaderSettings;
  removeItem(itemToRemove: IItem): void;
  decreaseItem(item: IItem): void;
  increaseItem(item: IItem, count: number): void;
  numberCzechFormat(price: number): string;
}
export interface ISaleListView {
  cartState: IItem[];
  personState: IPersonState | null;
  totalPrice: number;
  modalViewToggler: (modal: boolean) => void;
  saleListState: ISaleListModel;
  callSell(): void;
  clearCart(): void;
  clearPerson(): void;
  clearPersonInput(): void;
}
export interface ISaleListItemView {
  item: IItem;
  numberCzechFormat(price: number): string;
}
export interface ISaleListModel {
  open: boolean;
  confirmed: string;
}

export interface IScanner {
  id: string;
  name: string;
}

export interface IHeaderSettings {
  shopId: number;
  shopName: string;
  user: IPerson;
  touched: string;
  scanner: string | null;
  scanners: IScanner[];
}
export interface IHeaderView {
  touchTogglerState: string;
  touchScreenToggler: (touch: string) => void;
  headerState: IHeaderSettings;
  scannerToggler: (scanner: string) => void;
}

export interface IPerson {
  id: number;
  fullname: string;
  money: number;
}
export interface IPersonState {
  person: IPerson | null;
  personInput: string | null;
}
export interface IPersonView {
  personState: IPersonState | null;
  saleListState: ISaleListModel;
}

export interface IItemsList {
  cartState: IItem[];
  numberCzechFormat(price: number): string;
  totalPrice: number;
}

export interface ISellArticle {
  id: number;
  quantity: number;
  price: number;
}

export interface ISellRequest {
  personId: number;
  userId: number;
  shopId: number;
  articles: ISellArticle[];
}

export interface ILastSalesView {
  lastSalesState: ILastSales;
  clearSalesList(lastSalesState: ILastSales): void;
}
export interface ISale {
  id: number;
  client: string;
  salesman: string;
  dateOfSale: string;
  article: IArticle[];
  totalPrice: number;
}
export interface ILastSales {
  open: boolean;
  list: ISale[];
}

export interface IArticle {
  article1: string;
  quantity: number;
  itemPrice: number;
}

export interface IShopReload {
  shopId: number;
  cartItems: IItem[];
}
