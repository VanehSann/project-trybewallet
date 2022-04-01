import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
  // removi o BrowserRouter, dica do Arthur Procópio.
  // também deram dicas sobre o BrowserRouter: Kauê Alves, Marcos Danilo e Débora Serra.
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ Wallet } />
    </Switch>

  );
}

export default App;
