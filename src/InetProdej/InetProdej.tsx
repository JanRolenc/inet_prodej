import './InetProdej.scss'
import { IItem } from './interfaces'
import PersonView from './Person/PersonView'
import CartView from './Cart/CartView'
import ShopView from './Shop/ShopView'
import HeaderView from './Header/HeaderView'
import ModalView from './Modal/ModalView'
import SalesListView from './SalesList/SalesListView'
import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from './store'

function InetProdej() {
  const dispatch = useDispatch<Dispatch>()
  const shopState = useSelector((state: RootState) => state.ShopModel)
  const cartState = useSelector((state: RootState) => state.CartModel)
  const personState = useSelector((state: RootState) => state.PersonModel)
  const touchTogglerState = useSelector((state: RootState) => state.HeaderModel)
  const modalTogglerState = useSelector((state: RootState) => state.ModalModel)
  const salesListViewTogglerState = useSelector(
    (state: RootState) => state.SalesListModel,
  )

  useEffect(() => {
    dispatch.ShopModel.loadItems()
  }, [])

  function numberCzechFormat(price: number) {
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

  const shopItemClick = (item: IItem) => {
    if (item.quantity === 0 && item.type === 'standard') {
      alert('Zboží není skladem')
      return
    }
    dispatch.CartModel.increment(item, 1)
    dispatch.ShopModel.decrement(item, 1)
  }
  const removeItem = (itemToRemove: IItem) => {
    dispatch.ShopModel.addRemoved(itemToRemove)
    dispatch.CartModel.remove(itemToRemove)
  }
  const increaseItem = (itemToIncrease: IItem, count: number) => {
    const itemsCount: number = parseInt(
      shopState.find((i) => i.id === itemToIncrease.id)?.quantity,
    )
    if (itemsCount > 0) {
      const resultCount: number = Math.min(itemsCount, count)
      if (resultCount > 0 && itemToIncrease.type === 'standard') {
        dispatch.CartModel.increment(itemToIncrease, resultCount)
        dispatch.ShopModel.decrement(itemToIncrease, resultCount)
      } else if (resultCount <= 0 || itemsCount < count) {
        dispatch.CartModel.increment(itemToIncrease, itemsCount)
        dispatch.ShopModel.decrement(itemToIncrease, itemsCount)
      }
    } else {
      dispatch.CartModel.increment(itemToIncrease, count)
      dispatch.ShopModel.decrement(itemToIncrease, count)
    }
  }
  const decreaseItem = (itemToDecrease: IItem) => {
    dispatch.CartModel.decrement(itemToDecrease)
    dispatch.ShopModel.increment(itemToDecrease)
  }
  const touchScreenToggler = () => {
    dispatch.HeaderModel.toggle()
  }
  const modalViewToggler = () => {
    dispatch.ModalModel.toggle()
  }
  const salesListViewToggler = () => {
    dispatch.SalesListModel.toggle()
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

  return (
    <div
      className={`${
        touchTogglerState === 'true'
          ? 'inet-prodej-app inet-prodej-app--touch'
          : 'inet-prodej-app'
      }`}
    >
      <HeaderView
        touchTogglerState={touchTogglerState}
        touchScreenToggler={touchScreenToggler}
        personState={personState}
      />
      <ShopView
        shopState={shopState}
        shopItemClick={shopItemClick}
        numberCzechFormat={numberCzechFormat}
      />
      <div className="person-cart-container">
        <PersonView personState={personState} />
        <CartView
          cartState={cartState}
          touchTogglerState={touchTogglerState}
          removeItem={removeItem}
          decreaseItem={decreaseItem}
          increaseItem={increaseItem}
          totalPrice={totalPrice}
          numberCzechFormat={numberCzechFormat}
          personState={personState}
          modalViewToggler={modalViewToggler}
          modalTogglerState={modalTogglerState}
          salesListViewToggler={salesListViewToggler}
          salesListViewTogglerState={salesListViewTogglerState}
        />
      </div>
      {modalTogglerState && (
        <ModalView
          cartState={cartState}
          personState={personState}
          totalPrice={totalPrice}
          numberCzechFormat={numberCzechFormat}
          modalViewToggler={modalViewToggler}
          modalTogglerState={modalTogglerState}
          clearCart={clearCart}
        />
      )}
      {salesListViewTogglerState && (
        <SalesListView
          salesListViewTogglerState={salesListViewTogglerState}
          salesListViewToggler={salesListViewToggler}
          numberCzechFormat={numberCzechFormat}
        />
      )}
    </div>
  )
}
export default InetProdej
