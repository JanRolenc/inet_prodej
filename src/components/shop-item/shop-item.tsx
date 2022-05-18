import { IItem } from '../../interfaces'

interface Props {
  item: IItem
  //   removeTask(taskNameToDelete: string): void //removeTask je fce typu void s argumentem typu string
}

const ShopItem = ({ item }: any) => {
  return (
    <div key={item.id} className="shop__list-container__item">
      <div className="shop__list-container__item__button">
        <button>X</button>
      </div>
      <div className="shop__list-container__item__left shop__list-container__item__left--bigger">
        {item.name}
      </div>
      <div className="shop__list-container__item__right">{item.price}</div>
      <div className="shop__list-container__item__right">{item.quantity}</div>
      <div className="shop__list-container__item__right">
        {item.price * item.quantity}
      </div>
      <div className="shop__list-container__item__button">
        <button>-1</button>
      </div>
    </div>
  )
}

export default ShopItem
