// Coloque aqui suas actions
export const actionUserType = 'actionUserType';
export const actionUser = (stateEmail) => ({
  type: actionUserType,
  stateEmail,
});

export const actionWalletType = 'actionWalletType';
export const actionWallet = (state) => ({ type: actionWalletType, state });
