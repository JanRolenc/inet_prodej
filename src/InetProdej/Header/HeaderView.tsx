import { ReactComponent as CartIcon } from '../assets/shopping-cart.svg'
import { IHeaderView } from '../interfaces'

const HeaderView = ({
  touchTogglerState,
  touchScreenToggler,
  personState,
}: IHeaderView) => {
  return (
    <div className="header">
      <div className="header__details">
        <CartIcon />
        <span style={{ fontWeight: 'bold', fontSize: 'larger' }}>
          Inet Prodej
        </span>
        <span>
          <i>jmeno prodejce</i>
        </span>
      </div>
      <div className="header__reader-touch-container">
        <div className="header__reader-touch-container__reader-container">
          <span style={{ marginRight: '10px' }}>Čtečka</span>
          <select>
            <option
              selected={!personState?.ctecka ? true : false}
              value="ctecka"
            ></option>
            <option
              selected={personState?.ctecka === 'normalni' ? true : false}
              value="normal"
            >
              Normální
            </option>
            <option
              selected={personState?.ctecka === '4bits' ? true : false}
              value="4bits"
            >
              4bits-mirror
            </option>
            <option
              selected={personState?.ctecka === 'pcprox' ? true : false}
              value="pcprox"
            >
              PCProx
            </option>
          </select>
        </div>
        <div
          className="header__touch"
          onClick={() => touchScreenToggler(touchTogglerState)}
        >
          <div
            className={`${
              touchTogglerState === 'true'
                ? 'header__touch__check-container'
                : 'header__touch__check-container--off'
            }`}
          >
            <div></div>
          </div>
          <span>Dotyková obrazovka</span>
        </div>
      </div>
    </div>
  )
}

export default HeaderView
