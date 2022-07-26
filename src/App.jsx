import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { fetchCustomers } from './asyncAactions/customers';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector(state => state.cash.cash);
  const customers = useSelector(state => state.customers.customers);

  const addCash = (cash) => {
    dispatch({ type: "ADD_CASH", payload: cash });
  }

  const getCash = (cash) => {
    dispatch({ type: "GET_CASH", payload: cash });
  }

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    }
    dispatch(addCustomerAction(customer));
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id));
  }

  return (
    <div className="App">
      <div>
        <div style={{ fontSize: "3rem" }}>{cash}</div>
        <div style={{ display: "flex" }}>
          <button onClick={() => addCash(+prompt())}>Пополнить счет</button>
          <button onClick={() => getCash(+prompt())}>Снять со счета</button>
        </div>
        <div style={{ display: "flex" }}>
          <button onClick={() => addCustomer(prompt())}>Добавить клиента</button>
          <button onClick={() => dispatch(fetchCustomers())}>Получить клиентов с бэка</button>
        </div>
        {customers.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: 0 }}>
            {customers.map(customer =>
              <div style={{ display: "flex" }}>
                <div onClick={() => removeCustomer(customer)} style={{ display: "inline-block", fontSize: "2rem", marginTop: 10, border: "solid 1px grey" }}>{customer.name}</div>
              </div>

            )}
          </div>
        ) : (
          <div style={{ fontSize: "2rem", marginTop: 20 }}>
            Клиенты отсутствуют
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
