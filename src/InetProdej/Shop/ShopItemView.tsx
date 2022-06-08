import { ReactComponent as CartIcon } from '../assets/shopping-cart.svg'
import { IShopItemView } from '../interfaces'

const ShopItemView = ({ item, shopItemClick }: IShopItemView) => {
  return (
    <tr
      className="shop__list-container__item"
      key={item.id}
      onClick={() => shopItemClick(item)}
    >
      <td>
        <span>{item.name}</span>
      </td>
      <td>
        <span>{item.price}</span>
      </td>
      <td>
        <span>{item.quantity}</span>
      </td>
      <td>
        <span>{item.description}</span>
      </td>
      <CartIcon />
    </tr>
  )
}

export default ShopItemView
