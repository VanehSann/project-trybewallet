// Coloque aqui suas actions
export const actionUserType = 'actionUserType';
export const actionUser = (state) => ({
  type: actionUserType,
  state,
});

export const actionWalletType = 'actionWalletType';
export const actionWallet = (state) => ({ type: actionWalletType, state });
