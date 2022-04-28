import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  // totalExpenses = () => {
  //   const { userExpenses } = this.props;
  //   const total = userExpenses.reduce((acc, curr) => {
  //     acc += curr.value * curr.exchangeRates[curr.currency].ask;
  //     return acc;
  //   }, 0);
  //   console.log(total);
  // }

  render() {
    const { userEmail, userExpenses } = this.props;

    const totalExpenses = userExpenses.reduce((acc, curr) => {
      acc += curr.value * curr.exchangeRates[curr.currency].ask;
      return acc;
    }, 0);

    return (
      <header>
        <p data-testid="email-field">
          Olá,
          { userEmail }
          ! Seja muito bem vindo.
        </p>

        <p data-testid="total-field">
          { totalExpenses.toFixed(2) }
        </p>

        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userExpenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: propTypes.string.isRequired,
  userExpenses: propTypes.instanceOf(Array).isRequired,
};

// https://github.com/jsx-eslint/eslint-plugin-react/issues/2079

export default connect(mapStateToProps)(Header);
