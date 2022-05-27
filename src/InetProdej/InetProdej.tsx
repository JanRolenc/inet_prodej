import * as React from "react";
import { useState, useEffect } from "react";
import "./InetProdej.scss";
import { ReactComponent as CartIcon } from "./assets/shopping-cart.svg";
import { ReactComponent as MagnifierIcon } from "./assets/magnifier.svg";
import personalImage from "./assets/icon_head.png";
import { IItem } from "./interfaces";
import data from "./data.json";
import ShopItem from "./ShopItem";

import { store } from "../store";

import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../store";

function InetProdej() {
  const [items, setItems] = useState<IItem[]>(data);
  const [itemsSelected, setItemsSelected] = useState<IItem[]>([]);

  const itemsState = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch<Dispatch>();

  const itemClick = (item: IItem) => {
    if (item.quantity === 0 && item.type === "standard") {
      alert("Zboží není skladem");
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
      if (item.type === "quantityAndPriceOptional") {
        var setPrice = prompt("Zadej cenu:");
        var setQuantity = prompt("Zadej množství:");
        if (setPrice && setQuantity) {
          itemsSelectedCopy.push({
            ...item,
            price: parseInt(setPrice),
            quantity: parseInt(setQuantity),
            id: item.id + parseInt(setPrice),
          });
        }
      } else if (item.type === "quantityOptional") {
        var setQuantity = prompt("Zadej množství:");
        if (setQuantity) {
          itemsSelectedCopy.push({ ...item, quantity: parseInt(setQuantity) });
        }
      } else if (item.type === "priceOptional") {
        var setPrice = prompt("Zadej cenu:");
        if (setPrice) {
          itemsSelectedCopy.push({
            ...item,
            price: parseInt(setPrice),
            quantity: 1,
          });
        }
      } else {
        itemsSelectedCopy.push({ ...item, quantity: 1 });
      }
    }
    setItemsSelected(itemsSelectedCopy);

    store.dispatch.shop.decrement(item);

    // const itemsCopy: IItem[] = [...itemsState];
    // for (let i = 0; i < itemsCopy.length; i++) {
    //   const itemSelected = itemsCopy[i];
    //   if (
    //     itemSelected.id === item.id &&
    //     (itemSelected.type === "standard" ||
    //       itemSelected.type === "priceOptional")
    //   ) {
    //     itemsCopy[i] = {
    //       ...itemSelected,
    //       quantity: itemSelected.quantity - 1,
    //     };
    //   } else {
    //     itemsCopy[i] = {
    //       ...itemSelected,
    //       quantity: itemSelected.quantity,
    //       price: itemSelected.price,
    //     };
    //   }
    // }
    // setItems(itemsCopy);
  };

  const removeItem = (itemToRemove: IItem) => {
    const itemsSelectedCopy: IItem[] = [...itemsSelected];
    const itemsCopy: IItem[] = [...items];

    for (let i = 0; i < itemsCopy.length; i++) {
      const item = itemsCopy[i];
      if (
        item.id === itemToRemove.id &&
        (itemToRemove.type === "standard" ||
          itemToRemove.type === "priceOptional")
      ) {
        itemsCopy[i] = {
          ...item,
          quantity: item.quantity + itemToRemove.quantity,
        };
        break;
      }
    }
    const itemSelectedsSelected = itemsSelectedCopy.filter(
      (item) => item.id !== itemToRemove.id
    );

    setItemsSelected(itemSelectedsSelected);
    setItems(itemsCopy);
  };

  const removeOneItem = (oneItemToRemove: IItem) => {
    var itemsSelectedCopy: IItem[] = [...itemsSelected];
    for (let i = 0; i < itemsSelectedCopy.length; i++) {
      const itemSelected = itemsSelectedCopy[i];
      if (itemSelected.id === oneItemToRemove.id) {
        itemsSelectedCopy[i] = {
          ...itemSelected,
          quantity: itemSelected.quantity - 1,
        };
        if (itemsSelectedCopy[i].quantity === 0) {
          itemsSelectedCopy = itemsSelectedCopy.filter(
            (item) => item.quantity !== 0
          );
        }
      }
    }
    setItemsSelected(itemsSelectedCopy);

    const itemsCopy: IItem[] = [...items];
    for (let i = 0; i < itemsCopy.length; i++) {
      const itemSelected = itemsCopy[i];
      if (
        itemSelected.id === oneItemToRemove.id &&
        (oneItemToRemove.type === "standard" ||
          oneItemToRemove.type === "priceOptional")
      ) {
        itemsCopy[i] = { ...itemSelected, quantity: itemSelected.quantity + 1 };
      } else if (
        oneItemToRemove.type === "quantityOptional" ||
        oneItemToRemove.type === "quantityAndPriceOptional"
      ) {
        itemsCopy[i] = { ...itemSelected, quantity: itemSelected.quantity };
      }
    }
    setItems(itemsCopy);
  };

  var totalPrice = 0;
  for (let j = 0; j < itemsSelected.length; j++) {
    if (itemsSelected[j].price > 0) {
      totalPrice += itemsSelected[j].price * itemsSelected[j].quantity;
    }
  }

  //alternativa
  // useEffect(() => {
  // var totalPrice = 0
  // for (let j = 0; j < itemsSelected.length; j++) {
  //   totalPrice += itemsSelected[j].price * itemsSelected[j].quantity
  // }
  // alternativa
  //   var totalPrice = itemsSelected.reduce(
  //     (total, itemSelected) =>
  //       total + itemSelected.price * itemSelected.quantity,
  //     0,
  //   )
  //   setTotalPrice(totalPrice)
  // }, [itemsSelected])
  const shopState = useSelector((state: RootState) => state.shop);

  return (
    <div className="inet-prodej-app">
      <div className="header">
        <CartIcon />
        <span style={{ fontWeight: "bold" }}>Inet Prodej</span>
        <span>(Mgr. Zdeněk Machač (3890))</span>
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
          {shopState.map((item) => (
            <div
              key={item.id}
              className="items__list-container__item"
              onClick={() => itemClick(item)}
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
                  key={item.id}
                  item={item}
                  removeItem={() => removeItem(item)}
                  removeOneItem={() => removeOneItem(item)}
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
