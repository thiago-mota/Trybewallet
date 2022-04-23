import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          Olá,
          { userEmail }
          ! Seja muito bem vindo.
        </p>

        <p data-testid="total-field">
          0
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
});

Header.propTypes = {
  userEmail: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
