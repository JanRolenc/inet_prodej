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
  function priceCzechFormat(price: number | any) {
    var array = Array.from(price.toString())
    if (array.length > 3) {
      for (let i = array.length - 3; i > 0; i -= 3) {
        array.splice(i, 0, ' ')
      }
    }

    return array.join('')
  }

  return (
    <div className="cart">
      <div className="cart__name">Košík</div>
      <div className="cart__list-container">
        <table>
          <thead>
            <tr>
              <th>Odebrat vše</th>
              <th>Druh zboží / služby</th>
              <th className="item-alignment-right">Cena / kus</th>
              <th className="item-alignment-right">Počet</th>
              <th className="item-alignment-right">Cena</th>
              <th className="item-alignment-right"></th>
            </tr>
          </thead>

          <tbody>
            {cartState.length
              ? cartState.map((item) => (
                  <CartItemView
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    decreaseItem={decreaseItem}
                    increaseItem={increaseItem}
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
            Celková cena: {priceCzechFormat(totalPrice)} Kč
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
