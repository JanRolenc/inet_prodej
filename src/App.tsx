import React from "react";
import "./App.scss";
import { ReactComponent as CartIcon } from "./assets/shopping-cart.svg";
import { ReactComponent as MagnifierIcon } from "./assets/magnifier.svg";
import personalImage from "./assets/icon_head.png";

function App() {
  return (
    <div className="inet-prodej-app">
      <div className="header">
        <CartIcon />
        <span style={{ fontWeight: "bold" }}>Inet Prodej</span>
        <span>(Mgr. Zdeněk Machač (3890))</span>
      </div>
      <div className="options-panel">
        <div className="options-panel__left">
          <span>Akce</span>
          <span>Čtečka</span>
          <span>Tiskárna</span>
          <span>Zprávy</span>
        </div>
        <div className="options-panel__right">
          <span>O programu</span>
        </div>
      </div>
      <div className="items">
        <span>
          <span style={{ fontWeight: "bold", margin: "5px 0px 0px 5px" }}>
            Prodejna
          </span>{" "}
          CPS
        </span>
        <div className="items__panel">
          <div className="items__panel__left">Druh zboží / služby</div>
          <div className="items__panel__right">Cena / kus</div>
          <div className="items__panel__right">Počet</div>
          <div className="items__panel__left">Popis</div>
        </div>
        <div className="items__list-container">
          <div className="items__list-container__left"></div>
          <div className="items__list-container__right"></div>
          <div className="items__list-container__right"></div>
          <div className="items__list-container__left"></div>
        </div>
      </div>
      <div className="below-half">
        <div className="person">
          <img src={personalImage} alt="icon" />
          <div className="person__details">
            <span style={{ fontWeight: "bold" }}>Jméno a příjmení</span>
            <span>Mgr. Zdeněk Machač</span>
            <span style={{ fontWeight: "bold" }}>Identifikace</span>
            <input type="number" />
            <div className="person__buttons">
              <button>
                <MagnifierIcon /> Vyhledat
              </button>
              <button>Vyhledat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
