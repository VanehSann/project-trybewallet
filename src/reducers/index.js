import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

// Configure os seus reducers.

// ...
// O test não tava passando, vi umas threads no slack, sobre o assunto, e me ajudou a solucionar, revisei o conteúdo de tests e vi o código da aula ao vivo.
// Por conta do renderWithRouterAndStore(<App />);
// Para que os testes rode, será preciso conecta-los aos tests, por isso foi preciso,
// configurar o reducer agora.
// ...

// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

// o npm start dizia que não estava exportando, exportei aqui, e pegou, mesmo eu exportando embaixo.
export const rootReducer = combineReducers({ user, wallet });

// mas se removo debaixo o lint reclama.
export default rootReducer;
