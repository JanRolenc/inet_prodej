import { ISalesListView } from "../interfaces";
import { numberCzechFormat } from "../InetProdej";

import { ReactComponent as CartIcon } from "../assets/shopping-cart.svg";

const SalesListView = ({
  // numberCzechFormat,
  // salesListViewToggler,
  // salesListViewTogglerState,
  salesListSettings,
  clearSalesList,
}: ISalesListView) => {
  return (
    <div className="sales-list">
      <div className="sales-list__content">
        <div className="sales-list__content__header">
          <div>
            <CartIcon />
            <span>Historie prodeje</span>
          </div>
          <div
            // onClick={() => salesListViewToggler(salesListViewTogglerState)}
            // onClick={() => salesListViewToggler(salesListSettings.open)}
            onClick={() => clearSalesList(salesListSettings)}
            className="sales-list__content__header__close"
          >
            &#10005;
          </div>
        </div>
        <div className="sales-list__content__body">
          <div
            style={{
              padding: "6px 0px 1px 8px",
              height: "5%",
              fontWeight: "bold",
            }}
          >
            Přehled posledních pěti nákupů
          </div>
          <div className="sales-list__content__body__cart">
            <div className="sales-list__content__body__cart__list">
              {salesListSettings.list.length
                ? salesListSettings.list.map((item) => (
                    <table key={item.dateOfSale}>
                      <thead>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Klient</td>
                          <td>{item.client}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Prodejce</td>
                          <td>{item.salesman}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Čas prodeje</td>
                          <td>{item.dateOfSale}</td>
                        </tr>
                      </thead>
                      <thead>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Zboží</td>
                          <td style={{ fontWeight: "bold" }}>Množství</td>
                          <td style={{ fontWeight: "bold" }}>Cena za kus</td>
                        </tr>
                      </thead>
                      <tbody>
                        {item.article.length
                          ? item.article.map((article) => (
                              <tr key={Math.random()}>
                                <td>{article.article1}</td>
                                <td style={{ textAlign: "right" }}>
                                  {article.quantity} ks
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  {numberCzechFormat(article.itemPrice)} Kč
                                </td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Celková cena</td>
                          <td style={{ fontWeight: "bold" }}>
                            {item.totalPrice} Kč
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesListView;
