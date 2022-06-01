import './InetProdej.scss'
import { ReactComponent as CartIcon } from './assets/shopping-cart.svg'
import { IItem } from './interfaces'
import PersonView from './Person/PersonView'
import CartView from './Cart/CartView'
import ShopView from './Shop/ShopView'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from './store'

function InetProdej() {
  const dispatch = useDispatch<Dispatch>()
  const shopState = useSelector((state: RootState) => state.ShopModel)
  const cartState = useSelector((state: RootState) => state.CartModel)

  const shopItemClick = (item: IItem) => {
    if (item.quantity === 0 && item.type === 'standard') {
      alert('Zboží není skladem')
      return
    }
    dispatch.CartModel.increment(item)
    dispatch.ShopModel.decrement(item)
  }
  const removeItem = (itemToRemove: IItem) => {
    dispatch.ShopModel.addRemoved(itemToRemove)
    dispatch.CartModel.remove(itemToRemove)
  }
  const increaseItem = (itemToIncrease: IItem) => {
    dispatch.CartModel.increment(itemToIncrease)
    dispatch.ShopModel.decrement(itemToIncrease)
  }
  const decreaseItem = (itemToDecrease: IItem) => {
    dispatch.CartModel.decrement(itemToDecrease)
    dispatch.ShopModel.increment(itemToDecrease)
  }
  var totalPrice = 0
  for (let j = 0; j < cartState.length; j++) {
    if (cartState[j].price > 0) {
      totalPrice += cartState[j].price * cartState[j].quantity
    }
  }
  return (
    <div className="inet-prodej-app">
      <div className="header">
        <CartIcon />
        <span style={{ fontWeight: 'bold' }}>Inet Prodej</span>
        <span>(Mgr. Zdeněk Machač (3890))</span>
      </div>

      <ShopView shopState={shopState} shopItemClick={shopItemClick} />
      <PersonView />
      <CartView
        cartState={cartState}
        removeItem={removeItem}
        decreaseItem={decreaseItem}
        increaseItem={increaseItem}
        totalPrice={totalPrice}
      />
    </div>
  )
}
export default InetProdej
