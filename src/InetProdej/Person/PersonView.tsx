import personalImage from '../assets/icon_head.png'
import { ReactComponent as MagnifierIcon } from '../assets/magnifier.svg'

const PersonView = () => {
  return (
    <div className="person">
      <span style={{ fontWeight: 'bold', display: 'block' }}>Osoba</span>
      <div className="person__details">
        <img src={personalImage} alt="icon" />
        <span style={{ fontWeight: 'bold' }}>Jméno a příjmení</span>
        <span>Mgr. Zdeněk Machač</span>
        <span style={{ fontWeight: 'bold', marginTop: '10px' }}>
          Identifikace
        </span>
        <input type="text" />
        <div className="person__details__buttons">
          <button>
            <MagnifierIcon /> Vyhledat
          </button>
          <button>Vynulovat</button>
        </div>
      </div>
    </div>
  )
}

export default PersonView
