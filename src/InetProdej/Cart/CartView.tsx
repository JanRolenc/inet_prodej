import CartItemView from './CartItemView'
import { ICartView } from '../interfaces'

import { ReactComponent as CartIcon } from '../assets/shopping-cart.svg'

const CartView = ({
  cartState,
  removeItem,
  decreaseItem,
  increaseItem,
  totalPrice,
  toggleTouchState,
  priceCzechFormat,
  personState,
}: ICartView) => {
  const sellButtonClick = () => {
    alert(`Opravdu chcete nakoupit za ${priceCzechFormat(totalPrice)} Kč?`)
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
            {cartState?.length
              ? cartState.map((item) => (
                  <CartItemView
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    decreaseItem={decreaseItem}
                    increaseItem={increaseItem}
                    toggleTouchState={toggleTouchState}
                    priceCzechFormat={priceCzechFormat}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
      <div className="cart__sale">
        <div>
          <span style={{ display: 'block' }}>
            Celková cena:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {priceCzechFormat(totalPrice)} Kč
            </span>
          </span>
          <span style={{ display: 'block' }}>
            SUPO: Klientův zůstatek po zaplacení nákupního košíku:
            {personState ? (
              personState?.money && personState.money < 200 ? (
                `  ${priceCzechFormat(personState.money - totalPrice)} Kč`
              ) : (
                <span style={{ fontStyle: 'italic' }}>
                  na účtě máte dostatek prostředků
                </span>
              )
            ) : null}
          </span>
        </div>
        <button disabled={personState ? false : true} onClick={sellButtonClick}>
          <CartIcon /> Prodej
        </button>
      </div>
    </div>
  )
}

export default CartView
