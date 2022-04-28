import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionDeleteExpense } from '../actions';

class Table extends React.Component {
  handleClick = ({ target: { id: btnId } }) => {
    const { userExpenses, deletedExpenses } = this.props;
    const expenses = userExpenses.filter(({ id }) => Number(id) !== Number(btnId));
    deletedExpenses(expenses);
  };

  render() {
    const { userExpenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th> Descrição </th>
            <th> Tag </th>
            <th> Método de pagamento </th>
            <th> Valor </th>
            <th> Moeda </th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th> Moeda de conversão </th>
            <th> Editar/Excluir </th>
          </tr>

          { userExpenses.map((expense) => (
            <tr key={ expense.id }>
              <td>
                { expense.description }
              </td>
              <td>
                { expense.tag }
              </td>
              <td>
                { expense.method }
              </td>
              <td>
                { Number(expense.value).toFixed(2) }
              </td>
              <td>
                { expense.exchangeRates[expense.currency]
                  ? expense.exchangeRates[expense.currency].name
                  : ''}
              </td>
              <td>
                { expense.exchangeRates[expense.currency]
                  ? Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                  : '' }

              </td>
              <td>
                { expense.exchangeRates[expense.currency]
                  ? Number(expense.exchangeRates[expense.currency].ask * expense.value)
                    .toFixed(2)
                  : '' }
              </td>
              <td>
                Real
              </td>
              <td>
                <button type="button">Editar</button>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ this.handleClick }
                  id={ expense.id }
                >
                  Excluir
                </button>
              </td>
            </tr>
          )) }
        </thead>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  userExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deletedExpenses: (expenses) => dispatch(actionDeleteExpense(expenses)),
});

Table.propTypes = {
  userExpenses: propTypes.instanceOf(Array).isRequired,
  deletedExpenses: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
