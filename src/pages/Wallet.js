import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionWalletCurrencies, actionWalletDespesas, actionWalletExpenses } from '../actions/index';

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
      //
      editExpense: false,
    };
  }

  inputOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount = async () => {
    const { walletDispatchCurrencies, walletDispatchDespesas } = this.props;
    const resultFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await resultFetch.json();
    const resultObject = Object.keys(result);
    resultObject.splice(1, 1);
    this.setState({
      currencies: resultObject,
      despesas: 187.12,
    });
    walletDispatchCurrencies(this.state);
    walletDispatchDespesas(this.state);
  };

  addExpense = async () => {
    // não consegui implementar o thunk
    const { walletDispatchExpenses, walletDispatchDespesas } = this.props;
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
    walletDispatchDespesas(this.state);
  }

  editExpense = () => {
    this.setState({
      editExpense: false,
    });
    console.log('a');
  }

deleteBtn = (index, valor) => {
  const { despesas } = this.state;

  const { expensesProp, walletDispatchDespesas } = this.props;
  const subtracaoDespesas = (despesas - valor);
  //
  expensesProp.map((expense) => ((expense.id === index)
   && expensesProp.splice(expense, 1)));
  //

  //
  this.setState({
    despesas: subtracaoDespesas < 0 ? 0 : subtracaoDespesas, // (subtracaoDespesas < 0) ? 0 : subtracaoDespesas,
  });
  //
  console.log('ExpensesDelete');
  walletDispatchDespesas(this.state);
}

editBtn = () => {
  this.setState({
    editExpense: true,
  });
  console.log('depois eu faço2');
}

render() {
  const { emailProp, expensesProp, despesasProp } = this.props;
  const { currencies, valueInput, descriptionInput, editExpense, despesas } = this.state;
  console.log('Despesas: ', despesas);
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
          <label
            htmlFor="moeda"
            aria-label="moeda"
            data-testid="currency-input"
          >
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
          { !editExpense
            ? (
              <button type="button" onClick={ this.addExpense }>
                Adicionar despesa
              </button>
            )
            : (
              <button type="button" onClick={ this.editExpense }>
                Editar despesa
              </button>
            )}
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
        <tbody>
          {expensesProp.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{`${expense.value}.00`}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {parseFloat(expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)}
              </td>
              <td>
                {Math.floor(expense.exchangeRates[expense.currency].ask
                   * expense.value * 100) / 100 }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.editBtn() }

                >
                  Editar
                </button>
                <button
                  type="submit"
                  data-testid="delete-btn"
                  onClick={ () => this.deleteBtn(expense.id, Math.floor(expense.exchangeRates[expense.currency].ask
                    * expense.value * 100) / 100) }
                  // Debóra Serra me deu dica de enviar o id no lugar do index, e eu acabei usando essa dica pra enviar outras informações, com o (ask * value).
                >
                  Excluir
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </>);
}
}

Wallet.propTypes = {
  emailProp: PropTypes.string.isRequired,
  walletDispatchCurrencies: PropTypes.func.isRequired,
  walletDispatchExpenses: PropTypes.func.isRequired,
  walletDispatchDespesas: PropTypes.func.isRequired,
  expensesProp: PropTypes.arrayOf().isRequired,
  despesasProp: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  emailProp: state.user.email,
  expensesProp: state.wallet.expenses,
  // despesasProp: state.wallet.despesas,

});

const mapDispatchToProps = (dispatch) => ({
  walletDispatchCurrencies: (state) => dispatch(actionWalletCurrencies(state)),
  walletDispatchExpenses: (state) => dispatch(actionWalletExpenses(state)),
  walletDispatchDespesas: (state) => dispatch(actionWalletDespesas(state)),

});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
