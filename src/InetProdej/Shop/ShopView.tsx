import ShopItemView from './ShopItemView'
import { IShopView } from '../interfaces'
import { numberCzechFormat } from '../InetProdej'

const ShopView = ({
  shopState,
  shopItemClick,
  headerState,
  reloadButtonClick,
}: IShopView) => {
  return (
    <div className="shop">
      <div id="touch" className="shop__name">
        {headerState.shopName}
        <button style={{ marginLeft: '40px' }} onClick={reloadButtonClick}>
          Obnova seznamu
        </button>
      </div>
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
