import personalImage from '../assets/icon_head.png'
import { ReactComponent as MagnifierIcon } from '../assets/magnifier.svg'

import { useState, useEffect } from 'react'

import { IPersonView } from '../interfaces'

import { useDispatch } from 'react-redux'
import { Dispatch } from '../store'

const PersonView = ({ personState }: IPersonView) => {
  const [inputPerson, setInputPerson] = useState<string>('')
  const dispatch = useDispatch<Dispatch>()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setInputPerson(input)
  }

  useEffect(() => {
    dispatch.ShopModel.loadItems()
    dispatch.PersonModel.setPerson(null)
    dispatch.CartModel.setCart([])
  }, [inputPerson])

  function clearInput() {
    setInputPerson('')
  }

  const searchPerson = (input: string) => {
    if (inputPerson === '') {
      alert('Zadej ID osoby')
    } else {
      dispatch.PersonModel.findPerson(input)
    }
  }

  return (
    <div className="person">
      <div className="person__name">Osoba</div>
      <div className="person__details">
        <img src={personalImage} alt="icon" />
        <span>Jméno a příjmení</span>
        <span>{personState?.fullname}</span>
        <span style={{ marginTop: '10px' }}>Identifikace</span>
        <form onSubmit={handleSubmit}>
          <input type="text" value={inputPerson} onChange={handleChange} />
          <div className="person__details__buttons">
            <button
              type="submit"
              value="Submit"
              onClick={() => searchPerson(inputPerson)}
            >
              <MagnifierIcon /> Vyhledat
            </button>
            <button onClick={clearInput}>Vynulovat</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PersonView
