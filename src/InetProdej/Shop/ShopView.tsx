import ShopItemView from './ShopItemView'
import { IShopView } from '../interfaces'

const ShopView = ({ shopState, shopItemClick }: IShopView) => {
  return (
    <div className="shop">
      <span>
        <span style={{ fontWeight: 'bold', padding: '5px' }}>Prodejna</span> CPS
      </span>
      <div className="shop__panel">
        <div className="shop__panel__left">Druh Items / služby</div>
        <div className="shop__panel__right">Cena / kus</div>
        <div className="shop__panel__right">Počet</div>
        <div className="shop__panel__left">Popis</div>
        <div className="shop__panel__hidden"></div>
      </div>
      <div className="shop__list-container">
        {shopState.map((item) => (
          <ShopItemView
            key={item.id}
            item={item}
            shopItemClick={() => shopItemClick(item)}
          />
        ))}
      </div>
    </div>
  )
}

export default ShopView
