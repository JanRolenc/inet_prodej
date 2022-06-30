import './InetProdej.scss'
import { IItem } from './interfaces'
import PersonView from './Person/PersonView'
import CartView from './Cart/CartView'
import ShopView from './Shop/ShopView'
import HeaderView from './Header/HeaderView'
import ModalView from './Modal/ModalView'
import { useEffect } from 'react'
import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from './store'

function InetProdej() {
  const dispatch = useDispatch<Dispatch>()
  const shopState = useSelector((state: RootState) => state.ShopModel)
  const cartState = useSelector((state: RootState) => state.CartModel)
  const personState = useSelector((state: RootState) => state.PersonModel)
  const toggleTouchState = useSelector((state: RootState) => state.HeaderModel)
  const toggleModalState = useSelector((state: RootState) => state.ModalModel)

  // const [toggleModalState, settoggleModalState] = useState<boolean>(false)

  // const clicktoggleModalState = () => {
  //   // alert(`Chcete nakoupit za ${priceCzechFormat(totalPrice)} Kč?`)
  //   // console.log(cartState)
  //   settoggleModalState(!toggleModalState)
  //   console.log('toggleModalState', toggleModalState)
  // }

  useEffect(() => {
    dispatch.ShopModel.loadItems()
  }, [])

  function priceCzechFormat(price: number) {
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
    console.log(typeof itemsCount)
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
  var totalPrice = 0
  for (let j = 0; j < cartState.length; j++) {
    if (cartState[j].price > 0) {
      totalPrice += cartState[j].price * cartState[j].quantity
    }
  }
  console.log('localStorage.touched po render', localStorage.touched)
  return (
    <div
      className={`${
        toggleTouchState === 'true'
          ? 'inet-prodej-app inet-prodej-app--touch'
          : 'inet-prodej-app'
      }`}
    >
      <HeaderView
        toggleTouchState={toggleTouchState}
        touchScreenToggler={touchScreenToggler}
        personState={personState}
      />
      <ShopView
        shopState={shopState}
        shopItemClick={shopItemClick}
        priceCzechFormat={priceCzechFormat}
      />
      <div className="person-cart-container">
        <PersonView personState={personState} />
        <CartView
          cartState={cartState}
          toggleTouchState={toggleTouchState}
          removeItem={removeItem}
          decreaseItem={decreaseItem}
          increaseItem={increaseItem}
          totalPrice={totalPrice}
          priceCzechFormat={priceCzechFormat}
          personState={personState}
          modalViewToggler={modalViewToggler}
          toggleModalState={toggleModalState}
        />
      </div>
      {toggleModalState && (
        <ModalView
          cartState={cartState}
          totalPrice={totalPrice}
          priceCzechFormat={priceCzechFormat}
          modalViewToggler={modalViewToggler}
          toggleModalState={toggleModalState}
        />
      )}
    </div>
  )
}
export default InetProdej
