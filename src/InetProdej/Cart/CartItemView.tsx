import { ICartItemView } from "../interfaces";

const CartItemView = ({
  item,
  removeItem,
  decreaseItem,
  increaseItem,
  toggleTouchState,
  volumeNull,
}: ICartItemView) => {
  return (
    <tr className="cart__list-container__item" key={item.id}>
      <td>
        <button
          className={`${
            toggleTouchState ? "cart-btn cart-btn--touch" : "cart-btn"
          }`}
          onClick={() => removeItem(item)}
        >
          &#215;
        </button>
      </td>
      <td>{item.name}</td>
      <td className="item-alignment-right">{item.price}</td>
      <td className="item-alignment-right">{item.quantity}</td>
      <td className="item-alignment-right">
        {item.price && item.price * item.quantity}
      </td>
      <td className="item-alignment-right">
        <button
          className={`${
            toggleTouchState ? "cart-btn cart-btn--touch" : "cart-btn"
          }`}
          onClick={() => decreaseItem(item)}
        >
          &#45;
        </button>
        <button
          className={`${
            toggleTouchState ? "cart-btn cart-btn--touch" : "cart-btn"
          }`}
          onClick={() => increaseItem(item, 1)}
          disabled={volumeNull ? true : false}
        >
          &#43;
        </button>
        <button
          className={`${
            toggleTouchState ? "cart-btn cart-btn--touch" : "cart-btn"
          }`}
          onClick={() => increaseItem(item, 5)}
          disabled={volumeNull ? true : false}
        >
          &#43;5
        </button>
      </td>
    </tr>
  );
};

export default CartItemView;
