import React from 'react';

class Wallet extends React.Component {
  render() {
    return (<header>
      <div>TrybeWallet</div>
      <p data-testid="email-field">
        {' '}
        {}
        {' '}
      </p>
      <span data-testid="total-field">0</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>);
  }
}

export default Wallet;
