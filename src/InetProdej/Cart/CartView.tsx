import CartItemView from './CartItemView'
import { ICartView } from '../interfaces'

const CartView = ({
  cartState,
  removeItem,
  decreaseItem,
  increaseItem,
  totalPrice,
  toggleTouchState,
}: ICartView) => {
  return (
    <div className="cart">
      <caption>Košík</caption>
      <div className="cart__list-container">
        <table>
          <thead>
            <tr>
              <th>Odebrat vše</th>
              <th>Zboží / služba</th>
              <th>Cena / kus</th>
              <th>Počet</th>
              <th>Cena</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {cartState.length
              ? cartState.map((item) => (
                  <CartItemView
                    key={item.id}
                    item={item}
                    removeItem={() => removeItem(item)}
                    decreaseItem={() => decreaseItem(item)}
                    increaseItem={() => increaseItem(item)}
                    toggleTouchState={toggleTouchState}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
      <div className="cart__sale">
        <div>
          <span style={{ display: 'block' }}>
            Celková cena: {totalPrice} Kč
          </span>
          <span style={{ display: 'block' }}>
            SUPO: Klientův zůstatek po zaplacení nákupního košíku: {}
          </span>
        </div>
        <button>Prodej</button>
      </div>
    </div>
  )
}

export default CartView
