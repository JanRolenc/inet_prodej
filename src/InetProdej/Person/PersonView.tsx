import personalImage from "../assets/icon_head.png";
import { ReactComponent as MagnifierIcon } from "../assets/magnifier.svg";

const PersonView = () => {
  return (
    <div className="person">
      <div className="person__name">Osoba</div>
      <div className="person__details">
        <img src={personalImage} alt="icon" />
        <span>Jméno a příjmení</span>
        <span>Mgr. Zdeněk Machač</span>
        <span style={{ marginTop: "10px" }}>Identifikace</span>
        <input type="text" />
        <div className="person__details__buttons">
          <button>
            <MagnifierIcon /> Vyhledat
          </button>
          <button>Vynulovat</button>
        </div>
      </div>
    </div>
  );
};

export default PersonView;
