import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionUser } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
    this.inputOnChange = this.inputOnChange.bind(this);
    this.loginbutton = this.loginbutton.bind(this);
  }

inputOnChange = ({ target: { name, value } }) => {
  this.setState({
    [name]: value,
  }, this.isValid);
}

// ...
// Link do emailRegex indicado na thread da turma = https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
// ...
isValid = () => {
  const { email, password } = this.state;

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const isValidEmail = emailRegex.test(email);

  const seis = 6;
  const isValidPassWord = password.length >= seis;

  this.setState({
    isDisable: !((isValidEmail && isValidPassWord)), // o lint corrigiu a condicao: (isValidEmail && isValidPassWord) ? false : true
  });
}

loginbutton = () => {
  const { history, userState } = this.props;
  const { email } = this.state;
  userState(email);

  history.push('/carteira');

  console.log(history.location.pathname);
}

render() {
  const { email, password, isDisable } = this.state;
  return (
    <fieldset>
      <h1>TybeWallet</h1>
      <input
        type="email"
        data-testid="email-input"
        name="email"
        value={ email }
        onChange={ this.inputOnChange }
      />
      <input
        type="password"
        data-testid="password-input"
        name="password"
        value={ password }
        onChange={ this.inputOnChange }
      />
      <button
        type="button"
        disabled={ isDisable }
        onClick={ this.loginbutton }
      >
        Entrar

      </button>
    </fieldset>
  );
}
}
Login.propTypes = {
  userState: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userState: (stateEmail) => dispatch(actionUser(stateEmail)),
});

export default connect(null, mapDispatchToProps)(Login);
