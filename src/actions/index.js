// Coloque aqui suas actions
export const actionUserType = 'actionUserType';
export const actionUser = (state) => ({
  type: actionUserType,
  state,
});

export const actionWalletTypeCurrencies = 'actionWalletTypeCurrencies';
export const actionWalletCurrencies = (state) => ({
  type: actionWalletTypeCurrencies,
  state,
});

// testando
export const actionWalletTypeExpenses = 'actionWalletTypeExpenses';
export const actionWalletExpenses = (state) => ({
  type: actionWalletTypeExpenses,
  state,
});
// fim testando
/// usando o thunk
