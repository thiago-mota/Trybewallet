import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { actionRequestCurrencies, actionRequestExchangeRates } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      expenseValue: '',
      expenseDescription: '',
      selectedCurrency: '',
      paymentMethod: '',
      expenseCategory: '',
    };
  }

  componentDidMount() {
    const { actionCurrencies } = this.props;
    actionCurrencies();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {

  }

  render() {
    const { expenseValue, expenseDescription, selectedCurrency,
      paymentMethod, expenseCategory } = this.state;
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
              name="expenseValue"
              id="expenseValue"
              type="number"
              value={ expenseValue }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="expenseDescription">
            Descrição
            <input
              data-testid="description-input"
              name="expenseDescription"
              id="expenseDescription"
              type="text"
              value={ expenseDescription }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ selectedCurrency }
              onChange={ this.handleChange }
            >
              { currencies.map((currency) => (
                <option key={ currency }>
                  { currency }
                </option>)) }

            </select>
          </label>

          <label htmlFor="paymentMethod">
            Método de pagamento
            <select
              data-testid="method-input"
              name="paymentMethod"
              id="paymentMethod"
              value={ paymentMethod }
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
              name="expenseCategory"
              id="expenseCategory"
              value={ expenseCategory }
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
  actionExpenses: () => dispatch(actionRequestExchangeRates()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  actionCurrencies: propTypes.func.isRequired,
  actionExpenses: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
