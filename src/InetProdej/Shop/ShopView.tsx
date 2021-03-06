import ShopItemView from './ShopItemView'
import { IShopView } from '../interfaces'

const ShopView = ({
  shopState,
  shopItemClick,
  numberCzechFormat,
}: IShopView) => {
  return (
    <div className="shop">
      <div className="shop__name">Prodejna CPS</div>
      <div className="shop__list-container">
        <table>
          <thead>
            <tr>
              <th>Druh zboží / služby</th>
              <th className="item-alignment-right">Cena / kus</th>
              <th className="item-alignment-right">Počet</th>
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
                numberCzechFormat={numberCzechFormat}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShopView
