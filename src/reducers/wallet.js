// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case ('actionWalletTypeCurrencies'):
    return {
      ...state,
      currencies: action.state.currencies,
      // expenses: [...state.expenses, action.state.expenses],
    };
    // teste
  case ('actionWalletTypeExpenses'):
    return {
      ...state,
      expenses: [...state.expenses, action.state.expenses],
    };
    // fim teste
  default:
    return state;
  }
}
export default wallet;
