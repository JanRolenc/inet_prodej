import { ReactComponent as CartIcon } from '../assets/shopping-cart.svg'
import { IShopItemView } from '../interfaces'

const ShopItemView = ({ item, shopItemClick }: IShopItemView) => {
  function priceCzechFormat(price: number | any) {
    var array = Array.from(price.toString())
    if (array.length > 3) {
      for (let i = array.length - 3; i > 0; i -= 3) {
        array.splice(i, 0, ' ')
      }
    }

    return array.join('')
  }
  return (
    <tr
      className="shop__list-container__item"
      key={item.id}
      onClick={() => shopItemClick(item)}
    >
      <td>
        <span>{item.name}</span>
      </td>
      <td className="item-alignment-right">
        <span>{priceCzechFormat(item.price)}</span>
      </td>
      <td className="item-alignment-right">
        <span>{item.quantity}</span>
      </td>
      <td>
        <span>{item.description}</span>
      </td>
      <td>
        <CartIcon />
      </td>
    </tr>
  )
}

export default ShopItemView
