import React from 'react'
import { useState } from 'react'
import './App.scss'
import { ReactComponent as CartIcon } from './assets/shopping-cart.svg'
import { ReactComponent as MagnifierIcon } from './assets/magnifier.svg'
import personalImage from './assets/icon_head.png'
import { IItem } from './interfaces'
import data from './data.json'

import ShopItem from './components/shop-item/shop-item'

function App() {
  const [items, setItems] = useState<IItem[]>(data)
  const [itemsSelected, setItemsSelected] = useState<IItem[]>([])

  const itemButtonClick = (e: any) => {
    console.log(e.target.parentNode.id)
    // const itemSelected = items.filter((i) => i.id === e.target.parentNode.id)[0]
    // console.log(itemSelected)
    // setItemsSelected([...itemsSelected, itemSelected])
    // console.log(itemsSelected)
  }

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
          <div className="items__panel__left">Druh Items / služby</div>
          <div className="items__panel__right">Cena / kus</div>
          <div className="items__panel__right">Počet</div>
          <div className="items__panel__left">Popis</div>
          <div className="items__panel__hidden"></div>
        </div>
        <div className="items__list-container">
          {items.map((z) => (
            <div
              key={z.id}
              id={`${z.id}`}
              className="items__list-container__item"
            >
              <div className="items__list-container__item__left">
                <span>{z.name}</span>
              </div>
              <div className="items__list-container__item__right">
                <span>{z.price}</span>
              </div>
              <div className="items__list-container__item__right">
                <span>{z.quantity}</span>
              </div>
              <div className="items__list-container__item__left">
                <span>{z.description}</span>
              </div>
              <button onClick={itemButtonClick}>
                <CartIcon />
              </button>
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
            Druh Items / služby
          </div>
          <div className="shop__panel__right">Cena / kus</div>
          <div className="shop__panel__right">Počet</div>
          <div className="shop__panel__right">Cena</div>
          <div className="shop__panel__right">Odebrat 1</div>
        </div>
        <div className="shop__list-container">
          {itemsSelected.length
            ? itemsSelected.map((item: IItem, key: number) => (
                <ShopItem item={item} key={key} />
              ))
            : null}
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
