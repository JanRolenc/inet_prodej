import React from "react";
import { useState } from "react";
import "./InetProdej.scss";
import { ReactComponent as CartIcon } from "./assets/shopping-cart.svg";
import { ReactComponent as MagnifierIcon } from "./assets/magnifier.svg";
import personalImage from "./assets/icon_head.png";
import { IItem } from "./interfaces";
import data from "./data.json";

import ShopItem from "./components/shop-item/shop-item";

function InetProdej() {
  const [items, setItems] = useState<IItem[]>(data);
  const [itemsSelected, setItemsSelected] = useState<IItem[]>([]);

  const itemClick = (item: IItem) => {
    if (item.quantity === 0) {
      return;
    }

    const itemsSelectedCopy: IItem[] = [...itemsSelected];

    var newItem = true;
    for (let i = 0; i < itemsSelectedCopy.length; i++) {
      const itemSelected = itemsSelectedCopy[i];
      if (itemSelected.id === item.id) {
        itemsSelectedCopy[i] = {
          ...itemSelected,
          quantity: itemSelected.quantity + 1,
        };
        newItem = false;
        break;
      }
    }
    if (newItem) {
      itemsSelectedCopy.push({ ...item, quantity: 1 });
    }
    setItemsSelected(itemsSelectedCopy);

    const itemsCopy: IItem[] = [...items];
    for (let i = 0; i < itemsCopy.length; i++) {
      const itemSelected = itemsCopy[i];
      if (itemSelected.id === item.id) {
        itemsCopy[i] = {
          ...itemSelected,
          quantity: itemSelected.quantity - 1,
        };
        break;
      }
    }

    setItems(itemsCopy);
  };

  const removeItem = (itemToRemove: IItem) => {
    const itemsSelectedCopy: IItem[] = [...itemsSelected];
    const itemsCopy: IItem[] = [...items];
    for (let i = 0; i < itemsCopy.length; i++) {
      const item = itemsCopy[i];
      if (item.id === itemToRemove.id) {
        itemsCopy[i] = {
          ...item,
          quantity: item.quantity + itemToRemove.quantity,
        };
        break;
      }
    }
    const newItemsSelected = itemsSelectedCopy.filter(
      (item) => item.id !== itemToRemove.id
    );

    setItemsSelected(newItemsSelected);
    setItems(itemsCopy);
  };

  const removeOnePieceOfItem = (onePieceOfItemToRemove: IItem) => {
    const itemsSelectedCopy: IItem[] = [...itemsSelected];
    for (let i = 0; i < itemsSelectedCopy.length; i++) {
      const itemSelected = itemsSelectedCopy[i];
      if (itemSelected.id === onePieceOfItemToRemove.id) {
        itemsSelectedCopy[i] = {
          ...itemSelected,
          quantity: itemSelected.quantity - 1,
        };
      }
    }
    setItemsSelected(itemsSelectedCopy);

    const itemsCopy: IItem[] = [...items];
    for (let i = 0; i < itemsCopy.length; i++) {
      const newItem = itemsCopy[i];
      if (newItem.id === onePieceOfItemToRemove.id) {
        itemsCopy[i] = { ...newItem, quantity: newItem.quantity + 1 };
      }
    }
    setItems(itemsCopy);
  };

  var totalPrice = 0;
  for (let j = 0; j < itemsSelected.length; j++) {
    totalPrice += itemsSelected[j].price * itemsSelected[j].quantity;
  }

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
          <span style={{ fontWeight: "bold", padding: "5px" }}>Prodejna</span>{" "}
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
          {items.map((item) => (
            <div
              key={item.id}
              className="items__list-container__item"
              onClick={(e) => itemClick(item)}
            >
              <div className="items__list-container__item__left">
                <span>{item.name}</span>
              </div>
              <div className="items__list-container__item__right">
                <span>{item.price}</span>
              </div>
              <div className="items__list-container__item__right">
                <span>{item.quantity}</span>
              </div>
              <div className="items__list-container__item__left">
                <span>{item.description}</span>
              </div>
              <CartIcon />
            </div>
          ))}
        </div>
      </div>
      <div className="person">
        <span style={{ fontWeight: "bold", display: "block" }}>Osoba</span>
        <div className="person__details">
          <img src={personalImage} alt="icon" />
          <span style={{ fontWeight: "bold" }}>Jméno a příjmení</span>
          <span>Mgr. Zdeněk Machač</span>
          <span style={{ fontWeight: "bold", marginTop: "10px" }}>
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
        <span style={{ fontWeight: "bold", padding: "10px" }}>Košík</span>
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
            ? itemsSelected.map((item) => (
                <ShopItem
                  key={item.id + "-" + item.price}
                  item={item}
                  removeItem={(e) => removeItem(item)}
                  removeOnePieceOfItem={(e) => removeOnePieceOfItem(item)}
                />
              ))
            : null}
        </div>
        <div className="shop__sale">
          <div>
            <span>Celková cena:</span>
            <span>{totalPrice} Kč</span>
          </div>
          <span>SUPO: Klientův zůstatek po zaplacení nákupního košíku: {}</span>
          <button>Prodej</button>
        </div>
      </div>
    </div>
  );
}

export default InetProdej;
