import { ReactComponent as CartIcon } from '../assets/shopping-cart.svg'
import { IHeaderView } from '../interfaces'

import Select from 'react-select'

const options = [
  { value: 'normal', label: 'Normální' },
  { value: '4bits', label: '4bits-mirror' },
  { value: 'pcprox', label: 'PCProx' },
]
const customStyles = {
  // option: (provided:any, state:any) => ({
  //   ...provided,
  //   borderBottom: '2px dotted green',
  //   color: state.isSelected ? 'yellow' : 'black',
  //   backgroundColor: state.isSelected ? 'green' : 'white'
  // }),
  control: (provided: any) => ({
    ...provided,
    minHeight: '30px',
    maxHeight: '30px',
    borderRadius: '2px',
    borderColor: 'black',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    height: '30px',
    minWidth: '110px',
    // marginBottom: '8px',
    padding: '0px 8px',
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    height: '20px',
    marginTop: '4px',
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: '30px',
  }),
  menuList: (provided: any) => ({
    ...provided,
    zIndex: '10',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    paddingBottom: '4px',
  }),
}

const HeaderView = ({
  toggleTouchState,
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
          {personState
            ? `(${personState?.fullname} (${personState?.id}))`
            : null}
        </span>
      </div>
      <div className="header__reader-touch-container">
        <div className="header__reader-touch-container__reader-container">
          <span style={{ marginRight: '10px' }}>Vyber čtečku:</span>
          <Select
            options={options}
            styles={customStyles}
            menuIsOpen={true}
            placeholder=""
          />
        </div>
        <div
          className="header__touch"
          onClick={() => touchScreenToggler(toggleTouchState)}
        >
          <div
            className={`${
              toggleTouchState === 'true'
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
