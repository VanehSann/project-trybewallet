// Coloque aqui suas actions
export const actionUserType = 'actionUserType';
export const actionUser = (email) => ({
  type: actionUserType,
  email,
});

export const actionWalletType = 'actionWalletType';
export const actionWallet = (state) => ({ type: actionWalletType, state });
