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
  clickOpenModal,
  openModal,
}: ICartView) => {
  // if (personState && totalPrice > 0) {
  //   const availableMoney: number | null = personState.money
  //   const moneyAfterPayment: number | null = availableMoney - totalPrice
  // }

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
        {!personState?.id && !cartState.length ? (
          <div>
            <span style={{ display: 'block' }}>Košík je prázdný.</span>
            <span style={{ display: 'block' }}>
              SUPO:
              <span style={{ color: 'red', paddingLeft: '0px' }}>
                {' '}
                Klient není vybrán.
              </span>
            </span>
          </div>
        ) : personState && !cartState.length ? (
          <div>
            <span style={{ display: 'block' }}>Košík je prázdný.</span>
            <span style={{ display: 'block' }}>
              SUPO: Zůstatek na klientském účtu je:
              {personState?.money && personState.money < 200 ? (
                <span>{priceCzechFormat(personState?.money)} Kč</span>
              ) : (
                <span style={{ fontStyle: 'italic' }}>
                  na účtě máte dostatek prostředků
                </span>
              )}
            </span>
          </div>
        ) : personState && cartState.length ? (
          <div>
            <span style={{ display: 'block' }}>
              Celková cena:{' '}
              <span style={{ fontWeight: 'bold' }}>
                {priceCzechFormat(totalPrice)} Kč
              </span>
            </span>
            <span style={{ display: 'block' }}>
              SUPO:
              {personState?.money &&
              personState.money < 200 &&
              parseInt(priceCzechFormat(personState?.money - totalPrice)) >=
                0 ? (
                <span>
                  Zůstatek na klientském účtu je:{' '}
                  {priceCzechFormat(personState?.money - totalPrice)} Kč
                </span>
              ) : (
                <span style={{ color: 'red' }}>
                  Klientův zůstatek není dostatečný, chybí:{' '}
                  {priceCzechFormat((personState?.money - totalPrice) * -1)} Kč
                </span>
              )}
            </span>
          </div>
        ) : null}

        <button
          disabled={personState && cartState.length > 0 ? false : true}
          onClick={() => clickOpenModal(openModal)}
        >
          <CartIcon /> Prodej
        </button>
      </div>
    </div>
  )
}

export default CartView
