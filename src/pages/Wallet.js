import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
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

export default connect(mapStateToProps)(Wallet);
