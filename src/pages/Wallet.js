import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { actionRequestCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { actionCurrencies } = this.props;
    actionCurrencies();
  }

  render() {
    return <Header />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionCurrencies: () => dispatch(actionRequestCurrencies()),

});

Wallet.propTypes = {
  actionCurrencies: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
