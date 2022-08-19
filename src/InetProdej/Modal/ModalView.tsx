import { IModalView } from '../interfaces'
import ItemsList from '../ItemsList/ItemsList'

import { ReactComponent as CartIcon } from '../assets/shopping-cart.svg'
import stopIcon from '../assets/red_stop.png'
import greenCircle from '../assets/green-circle.png'
import yellowCircle from '../assets/yellow-circle.png'
import { useState } from 'react'
import { numberCzechFormat } from '../InetProdej'

const ModalView = ({
  cartState,
  totalPrice,
  // numberCzechFormat,
  modalState,
  modalViewToggler,
  clearCart,
  clearPerson,
  clearPersonInput,
}: IModalView) => {
  const [sellClicked, setSellClicked] = useState<boolean>(false)
  const [saleFinished, setSaleFinished] = useState<boolean>(false)
  const clickSellModal = () => {
    setSellClicked(true)
    setTimeout(() => {
      setSaleFinished(true)
      clearCart()
      clearPerson()
      clearPersonInput()
    }, 5000)
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
            onClick={() => modalViewToggler(modalState)}
            className="modal__content__header__close"
          >
            &#10005;
          </div>
        </div>
        <div className="modal__content__body">
          <div
            style={{
              padding: '3px 0px 1px 8px',
              height: '10%',
              fontWeight: 'bold',
            }}
          >
            Nákupní košík obsahuje:
          </div>
          {!sellClicked ? (
            <div>
              <div className="modal__content__body__cart">
                <div className="modal__content__body__cart__list">
                  <ItemsList
                    totalPrice={totalPrice}
                    cartState={cartState}
                    numberCzechFormat={numberCzechFormat}
                  />
                </div>
              </div>

              <div className="modal__content__body__sale">
                <div className="modal__content__body__sale__left">
                  Stisknutím tlačítka "Prodat" zahájíte prodejní transakci
                </div>
                <div className="modal__content__body__sale__right">
                  <button onClick={clickSellModal}>Prodat</button>
                  <button onClick={() => modalViewToggler(modalState)}>
                    <img src={stopIcon} alt="stop" />
                    Zavřít
                  </button>
                </div>
              </div>
            </div>
          ) : !saleFinished ? (
            <div>
              <div className="modal__content__body__cart">
                <div className="modal__content__body__cart__list">
                  <ItemsList
                    totalPrice={totalPrice}
                    cartState={cartState}
                    numberCzechFormat={numberCzechFormat}
                  />
                </div>
              </div>
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
                  <button disabled onClick={() => modalViewToggler(modalState)}>
                    <img src={stopIcon} alt="stop" />
                    Zavřít
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="modal__content__body__cart">
                <div className="modal__content__body__cart__list">
                  <ItemsList
                    totalPrice={totalPrice}
                    cartState={cartState}
                    numberCzechFormat={numberCzechFormat}
                  />
                </div>
              </div>
              <div className="modal__content__body__sale">
                <div className="modal__content__body__sale__left">
                  <img src={greenCircle} alt="circle" />
                  Prodej proběhl úspěšně
                </div>
                <div className="modal__content__body__sale__right">
                  <button onClick={() => modalViewToggler(modalState)}>
                    <img src={stopIcon} alt="stop" />
                    Zavřít
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalView
