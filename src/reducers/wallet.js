import { SELECTED_CURRENCY, USER_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  console.log('Action', action);
  switch (action.type) {
  case SELECTED_CURRENCY:
    return {
      ...state,
      currencies: action.currencies,
    };
  case USER_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
