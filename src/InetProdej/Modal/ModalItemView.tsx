import { IModalItemView } from '../interfaces'

const ModalItemView = ({ item, priceCzechFormat }: IModalItemView) => {
  return (
    <tr className="cart__list-container__item" key={item.id}>
      <td>{item.name}</td>
      <td className="" style={{ fontWeight: 'bold' }}>
        {item.quantity} ks
      </td>
      <td className="">
        {item.price && priceCzechFormat(item.price * item.quantity)} Kč
      </td>
    </tr>
  )
}

export default ModalItemView
