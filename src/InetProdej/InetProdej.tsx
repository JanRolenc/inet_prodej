import './InetProdej.scss'
import { IItem } from './interfaces'
import PersonView from './Person/PersonView'
import CartView from './Cart/CartView'
import ShopView from './Shop/ShopView'
import HeaderView from './Header/HeaderView'
import SaleListView from './SaleList/SaleListView'
import LastSalesView from './LastSales/LastSalesView'
import { useEffect, useState, useReducer } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from './store'

export function numberCzechFormat(price: number) {
  var array = Array.from(price.toString())
  const index = array.findIndex((element) => element === '.')
  if (index > 0) {
    array.splice(index, 1, ',')
    if (index > 3) {
      for (let i = index - 3; i > 0; i -= 3) {
        array.splice(i, 0, ' ')
      }
    }
  } else if (array.length > 3) {
    for (let i = array.length - 3; i > 0; i -= 3) {
      array.splice(i, 0, ' ')
    }
  }

  return array.join('')
}

export default function InetProdej() {
  const dispatch = useDispatch<Dispatch>()
  const headerState = useSelector((state: RootState) => state.HeaderModel)
  const shopState = useSelector((state: RootState) => state.ShopModel)
  const personState = useSelector((state: RootState) => state.PersonModel)
  const cartState = useSelector((state: RootState) => state.CartModel)
  const saleListState = useSelector((state: RootState) => state.SaleListModel)
  const lastSalesListState = useSelector(
    (state: RootState) => state.LastSalesModel,
  )

  useEffect(() => {
    dispatch.ShopModel.loadItems(headerState.shopId)
    dispatch.HeaderModel.loadHeaderState(headerState.shopId)
  }, [])

  //  const reloadInterval = 15_000; // 15s
  //  useEffect(() => {
  //    const timerId = setInterval(reloadShop, reloadInterval);
  //    return () => clearInterval(timerId);
  //  }, []);

  const reloadShop = () => {
    console.log('**** 0 ', headerState.shopId)
    console.log('**** 1 ', dispatch)
    console.log('cart state po kliku na Obnova seznamu', cartState)
    dispatch.ShopModel.reloadItems({
      shopId: headerState.shopId,
      cartItems: cartState,
    })
  }

  const shopItemClick = (item: IItem) => {
    if (item.quantity === 0 && item.type === 'standard') {
      alert('Zboží není skladem')
    } else {
      dispatch.CartModel.increment(item, 1)
      dispatch.ShopModel.decrement(item, 1)
    }
  }
  const removeItem = (itemToRemove: IItem) => {
    dispatch.ShopModel.addRemoved(itemToRemove)
    dispatch.CartModel.remove(itemToRemove)
  }
  const increaseItem = (itemToIncrease: IItem, reload: number) => {
    const itemsreload: number =
      shopState.find((i) => i.id === itemToIncrease.id)?.quantity || 0
    if (itemsreload > 0) {
      const resultreload: number = Math.min(itemsreload, reload)
      if (resultreload > 0 && itemToIncrease.type === 'standard') {
        dispatch.CartModel.increment(itemToIncrease, resultreload)
        dispatch.ShopModel.decrement(itemToIncrease, resultreload)
      } else if (resultreload <= 0 || itemsreload < reload) {
        dispatch.CartModel.increment(itemToIncrease, itemsreload)
        dispatch.ShopModel.decrement(itemToIncrease, itemsreload)
      }
    } else {
      dispatch.CartModel.increment(itemToIncrease, reload)
      dispatch.ShopModel.decrement(itemToIncrease, reload)
    }
  }
  const decreaseItem = (itemToDecrease: IItem) => {
    dispatch.CartModel.decrement(itemToDecrease)
    dispatch.ShopModel.increment(itemToDecrease)
  }

  const touchScreenToggler = () => {
    dispatch.HeaderModel.toggleTouched()
  }
  const scannerToggler = (scanner: string) => {
    dispatch.HeaderModel.changeScanner(scanner)
  }
  const modalViewToggler = () => {
    dispatch.ModalModel.toggle()
  }
  const callSell = () => {
    const sellRequest = {
      personId: 2,
      userId: 2,
      shopId: 2,
      articles: [],
    }

    dispatch.ModalModel.callSell(sellRequest)
  }
  const clearSalesList = () => {
    dispatch.SalesListModel.clearSalesList()
  }
  var totalPrice = 0
  for (let j = 0; j < cartState.length; j++) {
    if (cartState[j].price > 0) {
      totalPrice += cartState[j].price * cartState[j].quantity
    }
  }
  const clearCart = () => {
    dispatch.CartModel.clearAll()
  }
  const clearPerson = () => {
    dispatch.PersonModel.setPerson(null)
  }
  const clearPersonInput = () => {
    dispatch.PersonModel.setPersonInput('')
  }
  return (
    // !headerState.shopId ? (
    //   <div>
    //     Neni vybrán obchod - zadej 1 do URL / No shop selected - add 1 to URL
    //   </div>
    // ) :
    <div
      className={`${
        headerState.touched === 'true'
          ? 'inet-prodej-app inet-prodej-app--touch'
          : 'inet-prodej-app'
      }`}
    >
      <HeaderView
        touchTogglerState={headerState.touched}
        touchScreenToggler={touchScreenToggler}
        headerState={headerState}
        scannerToggler={scannerToggler}
      />
      <ShopView
        shopState={shopState}
        shopItemClick={shopItemClick}
        headerState={headerState}
        reloadShop={reloadShop}
      />
      <div className="person-cart-container">
        <PersonView personState={personState} saleListState={saleListState} />
        <CartView
          cartState={cartState}
          removeItem={removeItem}
          decreaseItem={decreaseItem}
          increaseItem={increaseItem}
          totalPrice={totalPrice}
          personState={personState}
          modalViewToggler={modalViewToggler}
          saleListState={saleListState}
          lastSalesListState={lastSalesListState}
        />
      </div>
      {saleListState.open && (
        <SaleListView
          cartState={cartState}
          personState={personState}
          totalPrice={totalPrice}
          modalViewToggler={modalViewToggler}
          saleListState={saleListState}
          clearCart={clearCart}
          clearPerson={clearPerson}
          clearPersonInput={clearPersonInput}
          callSell={callSell}
        />
      )}
      {lastSalesListState.open && (
        <LastSalesView
          lastSalesState={lastSalesListState}
          clearSalesList={clearSalesList}
        />
      )}
    </div>
  )
}
