import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { actionUserEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      loginBtnDisabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.loginValidation);
  }

  checkPassword = () => {
    const { password } = this.state;
    const MIN_PASSWORD_LENGTH = 6;
    return password.length >= MIN_PASSWORD_LENGTH;
  };

  checkEmail = () => {
    const { email } = this.state;
    const EMAIL_VALIDATION = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    return email.match(EMAIL_VALIDATION);
  };
  // RegEx adaptado de https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

  loginValidation = () => {
    const validation = this.checkPassword() && this.checkEmail();
    return validation
      ? this.setState({ loginBtnDisabled: false })
      : this.setState({ loginBtnDisabled: true });
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatchEmail, history } = this.props;

    dispatchEmail(email);
    history.push('/carteira');
  };

  render() {
    const { password, email, loginBtnDisabled } = this.state;

    return (
      <div className="login-container">
        <label htmlFor="email">
          Login:
          <input
            name="email"
            value={ email }
            onChange={ this.handleChange }
            type="email"
            placeholder="Insira seu e-mail."
            data-testid="email-input"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            name="password"
            type="password"
            value={ password }
            onChange={ this.handleChange }
            placeholder="Insira sua senha."
            data-testid="password-input"
          />
        </label>

        <button
          type="button"
          disabled={ loginBtnDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(actionUserEmail(email)),
});

Login.propTypes = {
  dispatchEmail: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
