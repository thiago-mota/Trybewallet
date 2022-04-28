import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
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
                { expense.exchangeRates[expense.currency].name }
              </td>
              <td>
                { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }

              </td>
              <td>
                { Number(expense.exchangeRates[expense.currency].ask * expense.value)
                  .toFixed(2) }
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

Table.propTypes = {
  userExpenses: propTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Table);
