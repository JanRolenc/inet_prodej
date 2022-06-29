import ModalItemView from './ModalItemView'
import { IModalView } from '../interfaces'

import { ReactComponent as CartIcon } from '../assets/shopping-cart.svg'
import stopIcon from '../assets/red_stop.png'

const ModalView = ({ cartState, totalPrice, priceCzechFormat }: IModalView) => {
  const modalButtonClick = () => {
    alert(`Chcete nakoupit za ${priceCzechFormat(totalPrice)} Kč?`)
    console.log(cartState)
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__content__header">
          <div>
            <CartIcon />
            <span>Prodejní transakce</span>
          </div>

          <div className="modal__content__header__close">&#10005;</div>
        </div>
        <div className="modal__content__body">
          <div className="modal__content__body__cart">
            <div style={{ margin: '5px 0px 5px 8px', height: '10%' }}>
              Nákupní košík obsahuje:
            </div>
            <div className="modal__content__body__cart__list">
              <table>
                {cartState?.length
                  ? cartState.map((item) => (
                      <ModalItemView
                        key={item.id}
                        item={item}
                        priceCzechFormat={priceCzechFormat}
                      />
                    ))
                  : null}
              </table>
            </div>
            <div style={{ margin: '8px 0px 5px 8px', height: '10%' }}>
              Celková cena: {totalPrice} Kč
            </div>
          </div>
          <div className="modal__content__body__sale">
            <span>
              Stisknutím tlačítka "Prodat" zahájíte prodejní transakci
            </span>
            <div>
              <button onClick={modalButtonClick}>Prodat</button>
              <button onClick={modalButtonClick}>
                <img src={stopIcon} alt="stop" />
                Zavřít
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalView
