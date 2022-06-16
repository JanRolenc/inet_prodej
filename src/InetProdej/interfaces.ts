export interface IItem {
  id: number;
  type: string;
  name: string;
  price: number | any;
  quantity: number | any;
  description: string;
}

export interface ICartView {
  cartState: IItem[];
  removeItem: (item: IItem) => void;
  decreaseItem: (item: IItem) => void;
  increaseItem: (item: IItem, count: number) => void;
  totalPrice: number;
  toggleTouchState: boolean;
  priceCzechFormat(price: number): string;
}
export interface IShopItemView {
  item: IItem;
  shopItemClick: (oneItemToRemove: IItem) => void;
  priceCzechFormat(price: number): string;
}

export interface ICartItemView {
  item: IItem;
  toggleTouchState: boolean;
  removeItem(itemToRemove: IItem): void;
  decreaseItem(item: IItem): void;
  increaseItem(item: IItem, count: number): void;
  priceCzechFormat(price: number): string;
}

export interface IShopView {
  shopState: IItem[];
  shopItemClick: (oneItemToRemove: IItem) => void;
  priceCzechFormat(price: number): string;
}
export interface IHeaderView {
  toggleTouchState: boolean;
  touchScreenToggler: (touch: boolean) => void;
}

export interface IPerson {
  id: number;
  fullname: string;
  money: number;
}
export interface IPersonView {
  personState: IPerson | null;
}
