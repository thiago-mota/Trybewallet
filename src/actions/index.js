export const USER_EMAIL = 'USER_EMAIL';
export const SELECTED_CURRENCY = 'SELECTED_CURRENCY';
export const USER_EXPENSE = 'USER_EXPENSE';

export const actionUserEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const actionCurrencies = (currencies) => ({
  type: SELECTED_CURRENCY,
  currencies,
});

export const actionExpenses = (expenses) => ({
  type: USER_EXPENSE,
  expenses,
});

export const requestCurrencies = async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesResponse = await response.json();
  const filteredCurrencies = Object.keys(currenciesResponse)
    .filter((currency) => currency !== 'USDT');

  dispatch(actionCurrencies(filteredCurrencies));
};
export const actionRequestCurrencies = () => requestCurrencies;

export const requestExchangeRates = async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeResponse = await response.json();
  dispatch(actionExpenses(exchangeResponse));
};
export const actionRequestExchangeRates = () => requestExchangeRates;
