// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case ('actionWalletType'):
    return {
      ...state,
      currencies: action.state.currencies,
    };
  default:
    return state;
  }
}
export default wallet;
