import ModalItemView from './ModalItemView'
import { IModalView } from '../interfaces'

import { ReactComponent as CartIcon } from '../assets/shopping-cart.svg'
import stopIcon from '../assets/red_stop.png'
import greenCircle from '../assets/green-circle.png'
import yellowCircle from '../assets/yellow-circle.png'
import { useState } from 'react'

const ModalView = ({
  cartState,
  totalPrice,
  priceCzechFormat,
  modalTogglerState,
  modalViewToggler,
}: IModalView) => {
  const [sellClicked, setSellClicked] = useState<boolean>(false)
  const [saleFinished, setSaleFinished] = useState<boolean>(false)
  const clickSellModal = () => {
    // setSellClicked(true);
    // setTimeout(() => {
    //   setSaleFinished(true);
    // }, 5000);
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
          <div
            onClick={() => modalViewToggler(modalTogglerState)}
            className="modal__content__header__close"
          >
            &#10005;
          </div>
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
          {!sellClicked ? (
            <div className="modal__content__body__sale">
              <div className="modal__content__body__sale__left">
                Stisknutím tlačítka "Prodat" zahájíte prodejní transakci
              </div>
              <div className="modal__content__body__sale__right">
                <button onClick={clickSellModal}>Prodat</button>
                <button onClick={() => modalViewToggler(modalTogglerState)}>
                  <img src={stopIcon} alt="stop" />
                  Zavřít
                </button>
              </div>
            </div>
          ) : !saleFinished ? (
            <div className="modal__content__body__sale">
              <div className="modal__content__body__sale__left--sell">
                <progress id="bar" max={100}></progress>
                <label htmlFor="bar">
                  <img src={yellowCircle} alt="circle" />
                  Prodejní trasakce...
                </label>
              </div>
              <div className="modal__content__body__sale__right">
                <button disabled onClick={clickSellModal}>
                  Prodat
                </button>
                <button
                  disabled
                  onClick={() => modalViewToggler(modalTogglerState)}
                >
                  <img src={stopIcon} alt="stop" />
                  Zavřít
                </button>
              </div>
            </div>
          ) : (
            <div className="modal__content__body__sale">
              <div className="modal__content__body__sale__left">
                <img src={greenCircle} alt="circle" />
                Prodej proběhl úspěšně
              </div>
              <div className="modal__content__body__sale__right">
                <button disabled onClick={clickSellModal}>
                  Prodat
                </button>
                <button onClick={() => modalViewToggler(modalTogglerState)}>
                  <img src={stopIcon} alt="stop" />
                  Zavřít
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalView
