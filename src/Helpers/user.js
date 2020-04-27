let user = 'Anonymus';

const setUser = (inputUser) => {
  user = inputUser;
};

const getUser = () => user;

export { setUser, getUser };