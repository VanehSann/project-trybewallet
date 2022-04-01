import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionWallet } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
    };
  }

  componentDidMount = async () => {
    const { walletDispatch } = this.props;
    const resultFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await resultFetch.json();
    const resultObject = Object.keys(result);
    resultObject.splice(1, 1);
    this.setState({
      currencies: resultObject,
    });
    walletDispatch(this.state);
  };

  render() {
    const { userProps } = this.props;
    const { currencies } = this.state;
    const methodArr = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <header>
        <div>TrybeWallet</div>
        <p data-testid="email-field">{ userProps }</p>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
        <input type="number" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        .
        <label htmlFor="moeda" aria-label="moeda">
          <select id="moeda">
            {
              currencies.map((currency) => (
                <option
                  key={ currency }
                >
                  { currency }

                </option>
              ))
            }
          </select>
        </label>
        <select data-testid="method-input">
          { methodArr.map((method) => (
            <option key={ method }>
              { method }
            </option>
          )) }
        </select>
        <select data-testid="tag-input">
          {tags.map((tag) => (
            <option key={ tag }>
              { tag }
            </option>
          )) }
        </select>

      </header>
    );
  }
}

Wallet.propTypes = {
  userProps: PropTypes.string.isRequired,
  walletDispatch: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  userProps: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  walletDispatch: (state) => dispatch(actionWallet(state)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
