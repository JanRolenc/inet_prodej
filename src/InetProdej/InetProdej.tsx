import './InetProdej.scss'
import { IItem } from './interfaces'
import PersonView from './Person/PersonView'
import CartView from './Cart/CartView'
import ShopView from './Shop/ShopView'
import HeaderView from './Header/HeaderView'
import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from './store'

function InetProdej() {
  const dispatch = useDispatch<Dispatch>()
  const shopState = useSelector((state: RootState) => state.ShopModel)
  const cartState = useSelector((state: RootState) => state.CartModel)
  const toggleTouchState = useSelector((state: RootState) => state.HeaderModel)

  useEffect(() => {
    dispatch.ShopModel.loadItems()
  }, [])

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

    const resultCount: number = Math.min(itemsCount, count)
    if (
      (resultCount > 0 && itemToIncrease.type === 'standard') ||
      itemToIncrease.type === 'noQuantity'
    ) {
      dispatch.CartModel.increment(itemToIncrease, resultCount)
      dispatch.ShopModel.decrement(itemToIncrease, resultCount)
    } else if (resultCount <= 0) {
      alert('Nedostatečná zásoba')
      return
    }
  }
  const decreaseItem = (itemToDecrease: IItem) => {
    dispatch.CartModel.decrement(itemToDecrease)
    dispatch.ShopModel.increment(itemToDecrease)
  }
  const touchScreenToggler = () => {
    dispatch.HeaderModel.toggle()
  }
  var totalPrice = 0
  for (let j = 0; j < cartState.length; j++) {
    if (cartState[j].price > 0) {
      totalPrice += cartState[j].price * cartState[j].quantity
    }
  }
  return (
    <div
      className={`${
        toggleTouchState
          ? 'inet-prodej-app inet-prodej-app--touch'
          : 'inet-prodej-app'
      }`}
    >
      <HeaderView
        toggleTouchState={toggleTouchState}
        touchScreenToggler={touchScreenToggler}
      />
      <ShopView shopState={shopState} shopItemClick={shopItemClick} />
      <div className="person-cart-container">
        <PersonView />
        <CartView
          cartState={cartState}
          toggleTouchState={toggleTouchState}
          removeItem={removeItem}
          decreaseItem={decreaseItem}
          increaseItem={increaseItem}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  )
}
export default InetProdej
