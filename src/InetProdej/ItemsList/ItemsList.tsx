import { IItemsList } from '../interfaces'

const ItemsList = ({
  cartState,
  totalPrice,
  numberCzechFormat,
}: IItemsList) => {
  return (
    <table>
      <thead style={{ textAlign: 'left' }}>
        <tr>
          <th>Zboží</th>
          <th>Množství</th>
          <th>Cena za kus</th>
        </tr>
      </thead>

      <tbody>
        {cartState?.length
          ? cartState.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td style={{ textAlign: 'right' }}>{item.quantity} ks</td>
                <td style={{ textAlign: 'right' }}>
                  {item.price && numberCzechFormat(item.price * item.quantity)}{' '}
                  Kč
                </td>
              </tr>
            ))
          : null}
      </tbody>
      <tfoot>
        <tr>
          <td>Celková cena:</td>
          <td>{totalPrice} Kč</td>
        </tr>
      </tfoot>
    </table>
  )
}

export default ItemsList
