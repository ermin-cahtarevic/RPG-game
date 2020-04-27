const errorDisplay = document.querySelector('#error');

const error = (errorText) => {
  errorDisplay.innerHTML = errorText;
  errorDisplay.classList.add('error-show');
  setTimeout(() => errorDisplay.classList.remove('error-show'), 5000);
  return 'success';
};

export default error;