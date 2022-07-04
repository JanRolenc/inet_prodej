import { ICartItemView } from '../interfaces'

import { useSelector } from 'react-redux'
import { RootState } from '../store'

const CartItemView = ({
  item,
  removeItem,
  decreaseItem,
  increaseItem,
  touchTogglerState,
  priceCzechFormat,
}: ICartItemView) => {
  const shopState = useSelector((state: RootState) => state.ShopModel)
  const shopStateCount = shopState.find((i) => i.id === item.id)?.quantity

  return (
    <tr className="cart__list-container__item" key={item.id}>
      <td>
        <button
          className={`${
            touchTogglerState === 'true'
              ? 'cart-btn cart-btn--touch'
              : 'cart-btn'
          }`}
          onClick={() => removeItem(item)}
        >
          &#215;
        </button>
      </td>
      <td>{item.name}</td>
      <td className="item-alignment-right">{priceCzechFormat(item.price)}</td>
      <td className="item-alignment-right" style={{ fontWeight: 'bold' }}>
        {item.quantity}
      </td>
      <td className="item-alignment-right">
        {item.price && priceCzechFormat(item.price * item.quantity)}
      </td>
      <td className="item-alignment-right">
        <button
          className={`${
            touchTogglerState === 'true'
              ? 'cart-btn cart-btn--touch'
              : 'cart-btn'
          }`}
          onClick={() => decreaseItem(item)}
        >
          &#45;
        </button>
        <button
          className={`${
            touchTogglerState === 'true'
              ? 'cart-btn cart-btn--touch'
              : 'cart-btn'
          }`}
          onClick={() => increaseItem(item, 1)}
          disabled={shopStateCount === 0 ? true : false}
        >
          &#43;
        </button>
        <button
          className={`${
            touchTogglerState === 'true'
              ? 'cart-btn cart-btn--touch'
              : 'cart-btn'
          }`}
          onClick={() => increaseItem(item, 5)}
          disabled={shopStateCount === 0 ? true : false}
        >
          &#43;5
        </button>
      </td>
    </tr>
  )
}

export default CartItemView
