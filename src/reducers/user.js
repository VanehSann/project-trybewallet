// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {};

function user(state = initialState, action) {
  switch (action.type) {
  case ('actionUserType'):
    return {
      ...state,
      email: action.stateEmail,
    };
  default:
    return state;
  }
}
export default user;
