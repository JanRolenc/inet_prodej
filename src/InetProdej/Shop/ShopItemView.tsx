import { ReactComponent as CartIcon } from '../assets/shopping-cart.svg'
import { IShopItemView } from '../interfaces'

const ShopItemView = ({ item, shopItemClick }: IShopItemView) => {
  return (
    <div
      key={item.id}
      className="shop__list-container__item"
      onClick={() => shopItemClick(item)}
    >
      <div className="shop__list-container__item__left">
        <span>{item.name}</span>
      </div>
      <div className="shop__list-container__item__right">
        <span>{item.price}</span>
      </div>
      <div className="shop__list-container__item__right">
        <span>{item.quantity}</span>
      </div>
      <div className="shop__list-container__item__left">
        <span>{item.description}</span>
      </div>
      <CartIcon />
    </div>
  )
}

export default ShopItemView
