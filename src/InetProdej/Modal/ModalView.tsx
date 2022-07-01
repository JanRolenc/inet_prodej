import ModalItemView from "./ModalItemView";
import { IModalView } from "../interfaces";

import { ReactComponent as CartIcon } from "../assets/shopping-cart.svg";
import stopIcon from "../assets/red_stop.png";
import greenCircle from "../assets/green-circle.png";
import { useState } from "react";

const ModalView = ({
  cartState,
  totalPrice,
  priceCzechFormat,
  toggleModalState,
  modalViewToggler,
}: IModalView) => {
  const [barValue, setBarValue] = useState<number>(0);
  const [sellClicked, setSellClicked] = useState<boolean>(false);
  const clickSellModal = () => {
    setSellClicked(true);
    var newValue = 0;
    const interval = setInterval(() => {
      setBarValue((previousValue) => {
        newValue = previousValue + 10;
        if (newValue === 100) {
          clearInterval(interval);
        }
        return newValue;
      });
    }, 500);
    if (newValue === 100) {
      modalViewToggler(toggleModalState); //toto nefunguje
    }
  };
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__content__header">
          <div>
            <CartIcon />
            <span>Prodejní transakce</span>
          </div>
          <div
            onClick={() => modalViewToggler(toggleModalState)}
            className="modal__content__header__close"
          >
            &#10005;
          </div>
        </div>
        <div className="modal__content__body">
          <div className="modal__content__body__cart">
            <div style={{ margin: "5px 0px 5px 8px", height: "10%" }}>
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
            <div style={{ margin: "8px 0px 5px 8px", height: "10%" }}>
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
                <button onClick={() => modalViewToggler(toggleModalState)}>
                  <img src={stopIcon} alt="stop" />
                  Zavřít
                </button>
              </div>
            </div>
          ) : (
            <div className="modal__content__body__sale">
              <div className="modal__content__body__sale__left--sell">
                <progress id="bar" value={barValue} max={100}></progress>
                <label htmlFor="bar">
                  <img src={greenCircle} alt="circle" />
                  Prodejní trasakce...
                </label>
              </div>
              <div className="modal__content__body__sale__right">
                <button disabled onClick={clickSellModal}>
                  Prodat
                </button>
                <button
                  disabled
                  onClick={() => modalViewToggler(toggleModalState)}
                >
                  <img src={stopIcon} alt="stop" />
                  Zavřít
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalView;
