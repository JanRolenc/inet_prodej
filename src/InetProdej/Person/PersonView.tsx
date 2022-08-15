import personalImage from '../assets/icon_head.png'
import { ReactComponent as MagnifierIcon } from '../assets/magnifier.svg'

import { useEffect, useRef } from 'react'

import { IPersonView } from '../interfaces'

import { useDispatch } from 'react-redux'
import { Dispatch } from '../store'

const PersonView = ({ personState, modalTogglerState }: IPersonView) => {
  const dispatch = useDispatch<Dispatch>()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    dispatch.PersonModel.setPersonInput(input)
  }

  const inputElement = useRef<HTMLInputElement>(null)
  if (modalTogglerState === false) {
    inputElement.current?.focus()
  } else {
    inputElement.current?.blur()
  }

  useEffect(() => {
    dispatch.PersonModel.setPerson(null)
    inputElement.current?.focus()
  }, [])

  function clear() {
    dispatch.PersonModel.setPerson(null)
    dispatch.PersonModel.setPersonInput('')
  }

  const searchPerson = (input: string) => {
    if (personState?.personInput === '') {
      alert('Zadej ID osoby')
    } else {
      dispatch.PersonModel.findPerson(input)
    }
  }

  return (
    <div className="person">
      <div id="touch" className="person__name">
        Osoba
      </div>
      <div className="person__details">
        <img src={personalImage} alt="icon" />
        <span>Jméno a příjmení</span>
        <span>
          {personState?.person ? (
            `${personState.person.fullname} (${personState.person.id})`
          ) : (
            <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
              osoba nevybrána
            </span>
          )}
        </span>
        <span style={{ marginTop: '10px' }}>Identifikace</span>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputElement}
            type="text"
            value={
              personState?.personInput !== null ? personState?.personInput : ''
            }
            onChange={handleChange}
          />
          <div className="person__details__buttons">
            <button
              type="submit"
              value="Submit"
              onClick={() =>
                searchPerson(
                  personState?.personInput ? personState?.personInput : '',
                )
              }
            >
              <MagnifierIcon /> Vyhledat
            </button>
            <button onClick={clear}>Vynulovat</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PersonView
