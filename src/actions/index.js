export const USER_EMAIL = 'USER_EMAIL';

const actionUserEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export default actionUserEmail;
