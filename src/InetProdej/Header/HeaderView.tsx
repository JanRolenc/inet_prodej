import { ReactComponent as CartIcon } from '../assets/shopping-cart.svg'
import { IHeaderView } from '../interfaces'

const HeaderView = ({
  touchTogglerState,
  touchScreenToggler,
  headerSettingsState,
  scannerToggler,
}: IHeaderView) => {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    scannerToggler(event.target.value)
  }
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
          <select
            style={{ minWidth: '110px' }}
            value={
              headerSettingsState.scanner !== null
                ? headerSettingsState.scanner
                : ''
            }
            onChange={handleChange}
          >
            {headerSettingsState.scanners.length > 0 &&
              headerSettingsState.scanners.map((scanner) => (
                <option key={scanner.id} value={scanner.name}>
                  {scanner.name}
                </option>
              ))}
          </select>
        </div>
        <div
          className="header__touch"
          onClick={() => touchScreenToggler(touchTogglerState)}
        >
          <div
            className={`${
              headerSettingsState.touched === 'true'
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
