import { ICartItemView } from '../interfaces'

const CartItemView = ({
  item,
  removeItem,
  decreaseItem,
  increaseItem,
  toggleTouchState,
}: ICartItemView) => {
  return (
    <tr key={item.id}>
      <td>
        <button
          className={`${
            toggleTouchState ? 'cart-btn cart-btn--touch' : 'cart-btn'
          }`}
          onClick={() => removeItem(item)}
        >
          &#215;
        </button>
      </td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.quantity}</td>
      <td>{item.price && item.price * item.quantity}</td>
      <td>
        <button
          className={`${
            toggleTouchState ? 'cart-btn cart-btn--touch' : 'cart-btn'
          }`}
          onClick={() => decreaseItem(item)}
        >
          &#45;
        </button>
        <button
          className={`${
            toggleTouchState ? 'cart-btn cart-btn--touch' : 'cart-btn'
          }`}
          onClick={() => increaseItem(item)}
        >
          &#43;
        </button>
        <button
          className={`${
            toggleTouchState ? 'cart-btn cart-btn--touch' : 'cart-btn'
          }`}
          onClick={() => increaseItem(item)}
        >
          &#43;5
        </button>
      </td>
    </tr>
  )
}

export default CartItemView
