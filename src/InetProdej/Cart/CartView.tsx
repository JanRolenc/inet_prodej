import CartItemView from './CartItemView'

import { ICartView } from '../interfaces'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '../store'

import { ReactComponent as CartIcon } from '../assets/shopping-cart.svg'

const CartView = ({
  cartState,
  removeItem,
  decreaseItem,
  increaseItem,
  totalPrice,
  // touchTogglerState,
  headerSettingsState,
  numberCzechFormat,
  personState,
  modalTogglerState,
  modalViewToggler,
}: // salesListViewToggler,
// salesListViewTogglerState,
// salesListSettings,
ICartView) => {
  const dispatch = useDispatch<Dispatch>()
  const salesListSettings = useSelector(
    (state: RootState) => state.SalesListModel,
  )

  const setSalesListSetting = () => {
    dispatch.SalesListModel.loadSalesList()
    console.log(
      'salesListSettings po kliku na posledni prodeje',
      salesListSettings,
    )
  }

  return (
    <div className="cart">
      <div id="touch" className="cart__name">
        Košík
        <button
          style={{ marginLeft: '40px' }}
          // onClick={() => salesListViewToggler(salesListViewTogglerState)}
          // onClick={() => salesListViewToggler(salesListSettings.open)}
          onClick={() => setSalesListSetting()}
        >
          Poslední prodeje
        </button>
      </div>
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
                    // touchTogglerState={touchTogglerState}
                    headerSettingsState={headerSettingsState}
                    numberCzechFormat={numberCzechFormat}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
      <div className="cart__sale">
        {!personState?.person?.id && !cartState.length ? (
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
              {personState.person?.money && personState.person?.money < 200 ? (
                <span>{numberCzechFormat(personState.person?.money)} Kč</span>
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
                {numberCzechFormat(totalPrice)} Kč
              </span>
            </span>
            <span style={{ display: 'block' }}>
              SUPO:
              {personState.person?.money &&
              personState.person?.money < 200 &&
              parseInt(
                numberCzechFormat(personState.person?.money - totalPrice),
              ) >= 0 ? (
                <span>
                  Zůstatek na klientském účtu je:{' '}
                  {numberCzechFormat(personState.person?.money - totalPrice)} Kč
                </span>
              ) : (
                <span style={{ color: 'red' }}>
                  Klientův zůstatek není dostatečný, chybí:{' '}
                  {personState?.person?.money &&
                    numberCzechFormat(
                      (personState.person.money - totalPrice) * -1,
                    )}{' '}
                  Kč
                </span>
              )}
            </span>
          </div>
        ) : !personState && cartState.length ? (
          <div>
            <span style={{ display: 'block' }}>
              Celková cena:{' '}
              <span style={{ fontWeight: 'bold' }}>
                {numberCzechFormat(totalPrice)} Kč
              </span>
            </span>
          </div>
        ) : null}

        <button
          disabled={
            personState &&
            cartState.length > 0 &&
            personState?.person?.money &&
            parseInt(
              numberCzechFormat(personState?.person?.money - totalPrice),
            ) >= 0
              ? false
              : true
          }
          onClick={() => modalViewToggler(modalTogglerState)}
        >
          <CartIcon /> Prodej
        </button>
      </div>
    </div>
  )
}

export default CartView
