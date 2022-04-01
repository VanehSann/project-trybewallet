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
    return (
      <header>
        <div>TrybeWallet</div>
        <p data-testid="email-field">{ userProps }</p>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Wallet.propTypes = {
  userProps: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  userProps: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  walletDispatch: (state) => dispatch(actionWallet(state)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
