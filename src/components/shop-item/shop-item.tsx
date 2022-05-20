import { IItem } from "../../interfaces";

interface Props {
  item: IItem;
  removeItem(itemToRemove: IItem): void;
  removeOnePieceOfItem(onePieceOfItemToRemove: IItem): void;
}

const ShopItem = ({ item, removeItem, removeOnePieceOfItem }: Props) => {
  return (
    <div key={item.id} className="shop__list-container__item">
      <div className="shop__list-container__item__button">
        <button onClick={() => removeItem(item)}>
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div className="shop__list-container__item__left shop__list-container__item__left--bigger">
        {item.name}
      </div>
      <div className="shop__list-container__item__right">{item.price}</div>
      <div className="shop__list-container__item__right">{item.quantity}</div>
      <div className="shop__list-container__item__right">
        {item.price * item.quantity}
      </div>
      <div className="shop__list-container__item__button">
        <button onClick={() => removeOnePieceOfItem(item)}>-1</button>
      </div>
    </div>
  );
};

export default ShopItem;
