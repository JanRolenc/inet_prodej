import CartItemView from "./CartItemView";
import { ICartView } from "../interfaces";

const CartView = ({
  cartState,
  removeItem,
  decreaseItem,
  increaseItem,
  totalPrice,
}: ICartView) => {
  return (
    <div className="cart">
      <span style={{ fontWeight: "bold", padding: "10px" }}>Košík</span>
      <div className="cart__list-container">
        <table>
          <thead>
            <tr>
              <th className="cart__panel__left">Odebrat vše</th>
              <th className="cart__panel__left cart__panel__left--bigger">
                Druh Items / služby
              </th>
              <th className="cart__panel__right">Cena / kus</th>
              <th className="cart__panel__right">Počet</th>
              <th className="cart__panel__right">Cena</th>
              <th className="cart__panel__right cart__panel__right--bigger"></th>
            </tr>
          </thead>

          <tbody>
            {cartState.length
              ? cartState.map((item) => (
                  <CartItemView
                    key={item.id}
                    item={item}
                    removeItem={() => removeItem(item)}
                    decreaseItem={() => decreaseItem(item)}
                    increaseItem={() => increaseItem(item)}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
      {/* <div className="cart__panel">
        <div className="cart__panel__left">Odebrat vše</div>
        <div className="cart__panel__left cart__panel__left--bigger">
          Druh Items / služby
        </div>
        <div className="cart__panel__right">Cena / kus</div>
        <div className="cart__panel__right">Počet</div>
        <div className="cart__panel__right">Cena</div>
        <div className="cart__panel__right cart__panel__right--bigger"></div>
      </div>
      <div className="cart__list-container">
        {cartState.length
          ? cartState.map((item) => (
              <CartItemView
                key={item.id}
                item={item}
                removeItem={() => removeItem(item)}
                decreaseItem={() => decreaseItem(item)}
                increaseItem={() => increaseItem(item)}
              />
            ))
          : null}
      </div> */}
      <div className="cart__sale">
        <div>
          <span>Celková cena:</span>
          <span>{totalPrice} Kč</span>
        </div>
        <span>SUPO: Klientův zůstatek po zaplacení nákupního košíku: {}</span>
        <button>Prodej</button>
      </div>
    </div>
  );
};

export default CartView;
