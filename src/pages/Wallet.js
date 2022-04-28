import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { actionExpenses, actionRequestCurrencies,
  actionRequestExchangeRates } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
    };
  }

  componentDidMount() {
    const { actionCurrencies } = this.props;
    actionCurrencies();
  }

  teste = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeResponse = await response.json();
    return exchangeResponse;
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { userExpenses } = this.props;
    const currentExchangeRates = await this.teste();

    const newExpense = {
      ...this.state,
      exchangeRates: currentExchangeRates,
    };

    userExpenses(newExpense);

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    }));
  }

  render() {
    const { value, description, currency,
      method, tag } = this.state;
    const { currencies } = this.props;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const expenseTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (

      <main>
        <Header />
        <section>
          <label htmlFor="expenseValue">
            Valor
            <input
              data-testid="value-input"
              name="value"
              id="expenseValue"
              type="number"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="expenseDescription">
            Descrição
            <input
              data-testid="description-input"
              name="description"
              id="expenseDescription"
              type="text"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((moeda) => (
                <option key={ moeda }>
                  { moeda }
                </option>)) }

            </select>
          </label>

          <label htmlFor="paymentMethod">
            Método de pagamento
            <select
              data-testid="method-input"
              name="method"
              id="paymentMethod"
              value={ method }
              onChange={ this.handleChange }
            >
              { paymentMethods.map((methods) => (
                <option key={ methods }>
                  { methods }
                </option>
              )) }
            </select>
          </label>

          <label htmlFor="expenseCategory">
            Categoria
            <select
              data-testid="tag-input"
              name="tag"
              id="expenseCategory"
              value={ tag }
              onChange={ this.handleChange }
            >
              { expenseTags.map((tags) => (
                <option key={ tags }>
                  { tags }
                </option>
              )) }
            </select>
          </label>

          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>

        </section>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionCurrencies: () => dispatch(actionRequestCurrencies()),
  userExpenses: (value) => dispatch(actionExpenses(value)),
  actionRates: () => dispatch(actionRequestExchangeRates()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  currencyRates: state.wallet.expenses,
});

Wallet.propTypes = {
  actionCurrencies: propTypes.func.isRequired,
  userExpenses: propTypes.func.isRequired,
  currencies: propTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
