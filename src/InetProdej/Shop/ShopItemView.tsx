import { ReactComponent as CartIcon } from '../assets/shopping-cart.svg'
import { IShopItemView } from '../interfaces'

const ShopItemView = ({
  item,
  shopItemClick,
  numberCzechFormat,
}: IShopItemView) => {
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
        <span>{numberCzechFormat(item.price)}</span>
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
