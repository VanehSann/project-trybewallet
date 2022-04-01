import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
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

export const rootReducer = combineReducers({ user, wallet });
export const store = createStore(rootReducer, composeWithDevTools());
