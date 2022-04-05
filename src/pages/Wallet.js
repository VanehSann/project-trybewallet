import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionWalletCurrencies, actionWalletExpenses } from '../actions/index';

const alimentacao = 'Alimentação'; // por conta do lint
class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      idInterate: 0,
      valueInput: 0,
      descriptionInput: '',
      currencyInterate: 'USD',
      methodInterate: 'Dinheiro',
      tagInterate: alimentacao,
      //
      currencies: [],
      expenses: [],
      //
      despesas: 0,
    };

    this.addbutton = this.addbutton.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
  }

  inputOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount = async () => {
    const { walletDispatchCurrencies } = this.props;
    const resultFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await resultFetch.json();
    const resultObject = Object.keys(result);
    resultObject.splice(1, 1);
    this.setState({
      currencies: resultObject,
    });
    // const { currencies } = this.state;
    walletDispatchCurrencies(this.state);
    // console.log(this.state);
  };

  addbutton = async () => {
    // não consegui implementar o thunk
    const { walletDispatchExpenses } = this.props;
    const { idInterate, valueInput, descriptionInput, currencyInterate,
      methodInterate, tagInterate, despesas } = this.state;
    const resultFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await resultFetch.json();

    // (20*6.5685)+(11*5.575)=192.695
    // remover sem arrendondar:  var Math.floor(-1.456 * 100) / 100 = -1.46
    // Math.floor retorna um inteiro: 192,
    // quando eu multiplico somaDespesas por 100 (19269.5), ele sobe duas casas decimais,
    // mas o Math.floor, vai retornar 19269, se você divide pelo valor que multiplicou 100,
    // ele retorna as mesmas casas demais de antes, e elimina o(s) ultimo(s) valor(res).
    // https://stackoverflow.com/questions/28170463/how-to-remove-trailing-decimals-without-rounding-up#:~:text=The%20function%20you%20want%20is,(4.9)%20%3D%204%20).&text=However%2C%20since%20Javascript%206%2C%20they,int%20without%20rounding%2C%20as%20expected.

    // Objeto[chave] - Me lembrei dessa forma de capturar no slack, não consigo achar a thread mais, nem lembro quem foi.
    const somaDespesas = Math.floor((Number(result[currencyInterate].ask * valueInput)
    + despesas) * 100) / 100;
    this.setState({
      idInterate: idInterate + 1,
      valueInput: 0,
      descriptionInput: '',
      currencyInterate: 'USD',
      methodInterate: 'Dinheiro',
      tagInterate: alimentacao,
      expenses: {
        id: ((idInterate === 0) ? idInterate - 0 : idInterate), // [this.state.expenses].length - 1,
        value: valueInput,
        description: descriptionInput,
        currency: currencyInterate,
        method: methodInterate,
        tag: tagInterate,
        exchangeRates: result,
      },
      despesas: somaDespesas,
    });

    walletDispatchExpenses(this.state);
  }

  render() {
    const { emailProp } = this.props;
    const { currencies, valueInput, despesas, descriptionInput } = this.state;
    const methodArr = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <>
        <header>
          <div>
            <div>TrybeWallet</div>
            <p data-testid="email-field">{ emailProp }</p>
            <span data-testid="total-field">{ despesas }</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
          <div>
            <input
              type="number"
              data-testid="value-input"
              value={ valueInput }
              onChange={ this.inputOnChange }
              name="valueInput"
            />
            <input
              type="text"
              data-testid="description-input"
              value={ descriptionInput }
              onChange={ this.inputOnChange }
              name="descriptionInput"
            />
            <label htmlFor="moeda" aria-label="moeda">
              <select id="moeda" onChange={ this.inputOnChange } name="currencyInterate">
                {
                  currencies.map((currency) => (
                    <option
                      key={ currency }
                      value={ currency }
                    >
                      { currency }
                    </option>
                  ))
                }
              </select>
            </label>
            <select
              data-testid="method-input"
              onChange={ this.inputOnChange }
              name="methodInterate"
            >
              { methodArr.map((method) => (
                <option
                  key={ method }
                  value={ `${method}` }

                >
                  { method }
                </option>
              )) }
            </select>
            <select
              data-testid="tag-input"
              onChange={ this.inputOnChange }
              name="tagInterate"
            >
              {tags.map((tag) => (
                <option
                  key={ tag }
                  value={ `${tag}` }
                >
                  { tag }
                </option>
              )) }
            </select>
            <button type="button" onClick={ this.addbutton }> Adicionar despesa</button>
          </div>
        </header>

        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
      </>);
  }
}

Wallet.propTypes = {
  emailProp: PropTypes.string.isRequired,
  walletDispatchCurrencies: PropTypes.func.isRequired,
  walletDispatchExpenses: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  emailProp: state.user.email,

});

const mapDispatchToProps = (dispatch) => ({
  walletDispatchCurrencies: (state) => dispatch(actionWalletCurrencies(state)),
  walletDispatchExpenses: (state) => dispatch(actionWalletExpenses(state)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
