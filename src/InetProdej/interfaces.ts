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
  volumeNull: boolean;
}
export interface IShopItemView {
  item: IItem;
  shopItemClick: (oneItemToRemove: IItem) => void;
}

export interface ICartItemView {
  item: IItem;
  toggleTouchState: boolean;
  volumeNull: boolean;
  removeItem(itemToRemove: IItem): void;
  decreaseItem(item: IItem): void;
  increaseItem(item: IItem, count: number): void;
}

export interface IShopView {
  shopState: IItem[];
  shopItemClick: (oneItemToRemove: IItem) => void;
}
export interface IHeaderView {
  toggleTouchState: boolean;
  touchScreenToggler: (touch: boolean) => void;
}
