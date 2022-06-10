import { ReactComponent as CartIcon } from "../assets/shopping-cart.svg";
import { IHeaderView } from "../interfaces";

const HeaderView = ({ toggleTouchState, touchScreenToggler }: IHeaderView) => {
  return (
    <div className="header">
      <div className="header__details">
        <CartIcon />
        <span style={{ fontWeight: "bold", fontSize: "larger" }}>
          Inet Prodej
        </span>
        <span>(Mgr. Zdeněk Machač (3890))</span>
      </div>
      <div
        className="header__touch"
        onClick={() => touchScreenToggler(toggleTouchState)}
      >
        <div
          className={`${
            toggleTouchState
              ? "header__touch__check-container"
              : "header__touch__check-container--off"
          }`}
        >
          <div></div>
        </div>
        <span>Dotyková obrazovka</span>
      </div>
    </div>
  );
};

export default HeaderView;
