import './InetProdej.scss'
import { IItem } from './interfaces'
import PersonView from './Person/PersonView'
import CartView from './Cart/CartView'
import ShopView from './Shop/ShopView'
import HeaderView from './Header/HeaderView'
import ModalView from './Modal/ModalView'
import SalesListView from './SalesList/SalesListView'
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
  const modalState = useSelector((state: RootState) => state.ModalModel)
  const salesListState = useSelector((state: RootState) => state.SalesListModel)

  const [reloadAuto, setReloadAuto] = useState(false)
  const [reloadManual, setReloadManual] = useState(true)

  // const [reloadAuto, forceUpdate] = useReducer((x) => x + 1, 0)

  // setTimeout(() => {
  //   forceUpdate()
  //   callReloadAuto()
  // }, 20000)

  useEffect(() => {
    dispatch.ShopModel.loadItems(headerState.shopId)
    dispatch.HeaderModel.loadHeaderState(headerState.shopId)
    // setReloadAuto(!reloadAuto)
  }, [])
  const reloadInterval = 15000
  useEffect(() => {
    const reload = setInterval(callReloadAuto, reloadInterval)
    return () => clearInterval(reload)
    // setReloadAuto(!reloadAuto)
    // }, 100000)
    // setTimeout(() => {
    // }, 100000)

    // }, [reloadAuto])
  }, [])

  const callReloadAuto = () => {
    dispatch.ShopModel.loadItems(headerState.shopId)
    // setTimeout(() => {
    changeListsAfterReload()
    // }, 2000)
    // setReloadAuto(!reloadAuto)
    setTimeout(() => {
      setChangedLists()
    }, 8000)
    // setTimeout(() => {
    // }, 3000)
  }

  useEffect(() => {
    // setTimeout(() => {
    dispatch.ShopModel.loadItems(headerState.shopId)
    // }, 3000)
  }, [reloadManual])

  const reloadButtonClick = () => {
    setReloadManual(!reloadManual)
    setTimeout(() => {
      changeListsAfterReload()
      setChangedLists()
    }, 3000)
  }
  const changeListsAfterReload = () => {
    const shopItemsCopy: IItem[] = shopState
    const cartItemsCopy: IItem[] = cartState
    shopItemsCopy.forEach((itemShop) => {
      var itemCart = cartItemsCopy.find(
        (itemCart) => itemCart.id === itemShop.id,
      )
      if (itemCart) {
        if (itemCart.quantity >= itemShop.quantity) {
          itemShop = {
            ...itemShop,
            quantity: itemShop.quantity - itemCart.quantity,
          }
        } else {
          itemCart = { ...itemCart, quantity: itemShop.quantity }
          itemShop = { ...itemShop, quantity: 0 }
        }
      }
    })
    return [shopItemsCopy, cartItemsCopy]
  }
  const setChangedLists = () => {
    var reloadedLists = changeListsAfterReload()
    dispatch.ShopModel.setItems(reloadedLists[0])
    dispatch.CartModel.setCart(reloadedLists[1])
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
    dispatch.ModalModel.callSell()
  }
  const clearSalesList = () => {
    dispatch.SalesListModel.clearSalesList()
    console.log('salesListState po clear', salesListState)
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
  console.log('render InerProdej.tsx')
  return !headerState.shopId ? (
    <div>Neni vybrán obchod</div>
  ) : (
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
        reloadButtonClick={reloadButtonClick}
      />
      <div className="person-cart-container">
        <PersonView personState={personState} modalState={modalState} />
        <CartView
          cartState={cartState}
          removeItem={removeItem}
          decreaseItem={decreaseItem}
          increaseItem={increaseItem}
          totalPrice={totalPrice}
          personState={personState}
          modalViewToggler={modalViewToggler}
          modalState={modalState}
          salesListState={salesListState}
        />
      </div>
      {modalState.open && (
        <ModalView
          cartState={cartState}
          personState={personState}
          totalPrice={totalPrice}
          modalViewToggler={modalViewToggler}
          modalState={modalState}
          clearCart={clearCart}
          clearPerson={clearPerson}
          clearPersonInput={clearPersonInput}
          callSell={callSell}
        />
      )}
      {salesListState.open && (
        <SalesListView
          salesListState={salesListState}
          clearSalesList={clearSalesList}
        />
      )}
    </div>
  )
}
