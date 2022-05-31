import { IItem } from '../interfaces'

interface Props {
  item: IItem
  removeItem(itemToRemove: IItem): void
  decreaseItem(oneToDecrease: IItem): void
  increaseItem(oneToIncrease: IItem): void
}

const CartItemView = ({
  item,
  removeItem,
  decreaseItem,
  increaseItem,
}: Props) => {
  return (
    <div key={item.id} className="cart__list-container__item">
      <div className="cart__list-container__item__button">
        <button onClick={() => removeItem(item)}>&#215;</button>
      </div>
      <div className="cart__list-container__item__left cart__list-container__item__left--bigger">
        {item.name}
      </div>
      <div className="cart__list-container__item__right">{item.price}</div>
      <div className="cart__list-container__item__right">{item.quantity}</div>
      <div className="cart__list-container__item__right">
        {item.price && item.price * item.quantity}
      </div>
      <div className="cart__list-container__item__button cart__list-container__item__button--bigger">
        <button onClick={() => decreaseItem(item)}>&#45;</button>
        <button onClick={() => increaseItem(item)}>&#43;</button>
      </div>
    </div>
  )
}

export default CartItemView
