import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { actionRequestCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      expenseValue: '',
      expenseDescription: '',
      currency: '',
      paymentMethod: '',
      expenseCategory: '',
    };
  }

  componentDidMount() {
    const { actionCurrencies } = this.props;
    actionCurrencies();
  }

  handleChange = ({ target: { name, value} }) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { expenseValue, expenseDescription, currency,
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
              value={ expenseValue }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="expenseDescription">
            Descrição
            <input
              data-testid="description-input"
              name="expenseDescription"
              value={ expenseDescription }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((currencies) => (
                <option key={ currencies }>
                  { currencies }
                </option>)) }

            </select>
          </label>

          <label htmlFor="paymentMethod">
            Método de pagamento
            <select
              data-testid="method-input"
              name="paymentMethod"
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

        </section>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionCurrencies: () => dispatch(actionRequestCurrencies()),

});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  actionCurrencies: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
