// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const initialState = {
  currencies: [],
  expenses: [],
  despesas: 0,
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case ('actionWalletTypeCurrencies'):
    return {
      ...state,
      currencies: action.state.currencies,
    };
    // teste
  case ('actionWalletTypeExpenses'):
    return {
      ...state,
      expenses: [...state.expenses, action.state.expenses],
    };
    // fim teste
  case ('actionWalletTypeDespesas'):
    return {
      ...state,
      despesas: action.state.despesas,
    };
  default:
    return state;
  }
}
export default wallet;
