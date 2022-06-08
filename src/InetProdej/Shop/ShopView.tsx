import ShopItemView from './ShopItemView'
import { IShopView } from '../interfaces'

const ShopView = ({ shopState, shopItemClick }: IShopView) => {
  return (
    <div className="shop">
      <div className="shop__list-container">
        <caption>Prodejna CPS</caption>
        <table>
          <thead>
            <tr>
              <th>Zboží / služba</th>
              <th>Cena / kus</th>
              <th>Počet</th>
              <th>Popis</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shopState.map((item) => (
              <ShopItemView
                key={item.id}
                item={item}
                shopItemClick={() => shopItemClick(item)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShopView
