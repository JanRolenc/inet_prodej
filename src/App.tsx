import React from 'react'
import { useState } from 'react'
import './App.scss'
import { ReactComponent as CartIcon } from './assets/shopping-cart.svg'
import { ReactComponent as MagnifierIcon } from './assets/magnifier.svg'
import personalImage from './assets/icon_head.png'
import { Zboží } from './interfaces'
import data from './data.json'

function App() {
  const [zbozi, setZbozi] = useState<Zboží[]>(data)
  return (
    <div className="inet-prodej-app">
      <div className="header">
        <CartIcon />
        <span style={{ fontWeight: 'bold' }}>Inet Prodej</span>
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
          <span style={{ fontWeight: 'bold', padding: '5px' }}>Prodejna</span>{' '}
          CPS
        </span>
        <div className="items__panel">
          <div className="items__panel__left">Druh zboží / služby</div>
          <div className="items__panel__right">Cena / kus</div>
          <div className="items__panel__right">Počet</div>
          <div className="items__panel__left">Popis</div>
          {/* slepa div jen pro upraveni sirky panelu aby byl shodny s sirkou items__list-container po naskoceni scroll baru */}
          {zbozi.length > 9 && <div className="items__panel__hidden"></div>}
        </div>
        <div className="items__list-container">
          {zbozi.map((z) => (
            <div key={z.id} className="items__list-container__item">
              <div className="items__list-container__item__left">
                <span>{z.druh}</span>
              </div>
              <div className="items__list-container__item__right">
                <span>{z.cena}</span>
              </div>
              <div className="items__list-container__item__right">
                <span>{z.pocet}</span>
              </div>
              <div className="items__list-container__item__left">
                <span>{z.popis}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="person">
        <span style={{ fontWeight: 'bold', display: 'block' }}>Osoba</span>
        <div className="person__details">
          <img src={personalImage} alt="icon" />
          <span style={{ fontWeight: 'bold' }}>Jméno a příjmení</span>
          <span>Mgr. Zdeněk Machač</span>
          <span style={{ fontWeight: 'bold', marginTop: '10px' }}>
            Identifikace
          </span>
          <input type="text" />
          <div className="person__details__buttons">
            <button>
              <MagnifierIcon /> Vyhledat
            </button>
            <button>Vynulovat</button>
          </div>
        </div>
      </div>
      <div className="shop">
        <span style={{ fontWeight: 'bold', padding: '10px' }}>Košík</span>
        <div className="shop__panel">
          <div className="shop__panel__left">Odebrat vše</div>
          <div className="shop__panel__left shop__panel__left--bigger">
            Druh zboží / služby
          </div>
          <div className="shop__panel__right">Cena / kus</div>
          <div className="shop__panel__right">Počet</div>
          <div className="shop__panel__right">Cena</div>
          <div className="shop__panel__right">Odebrat 1</div>
        </div>
        <div className="shop__list-container">
          <div className="shop__list-container__item">
            <div className="shop__list-container__item__button">
              <button>X</button>
            </div>
            <div className="shop__list-container__item__left shop__list-container__item__left--bigger">
              nazdar
            </div>
            <div className="shop__list-container__item__right">AHoj</div>
            <div className="shop__list-container__item__right">Hola</div>
            <div className="shop__list-container__item__right">zdar</div>
            <div className="shop__list-container__item__button">
              <button>-1</button>
            </div>
          </div>
        </div>
        <div className="shop__sale">
          <span>Celková cena: {}</span>
          <span>SUPO: Klientův zůstatek po zaplacení nákupního košíku: {}</span>
          <button>Prodej</button>
        </div>
      </div>
    </div>
  )
}

export default App
