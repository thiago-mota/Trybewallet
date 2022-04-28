import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail, userExpenses } = this.props;

    const totalExpenses = userExpenses.reduce((acc, curr) => {
      if (curr.exchangeRates[curr.currency]) {
        console.log('Curr', curr);
        const newValue = acc + (curr.value) * (curr.exchangeRates[curr.currency].ask);
        console.log('newValue', newValue);
        return newValue;
      } return acc;
    }, 0).toFixed(2);

    return (
      <header>
        <p data-testid="email-field">
          { userEmail }
        </p>

        <p data-testid="total-field">
          { totalExpenses }
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
