/* eslint-disable import/no-cycle */

import startGame from '../index';
import { checkForm, noInputError, clearDOM } from './helper';

const inputWrap = document.createElement('div');
const text = document.createElement('div');
const input = document.createElement('input');
const submit = document.createElement('button');

inputWrap.classList.add('input-wrap');
text.classList.add('input-text');
input.classList.add('input');
submit.classList.add('submit');

text.innerHTML = 'Please enter your name';
input.placeholder = 'Name...';
submit.innerHTML = 'Start';

inputWrap.appendChild(text);
inputWrap.appendChild(input);
inputWrap.appendChild(submit);
document.querySelector('body').appendChild(inputWrap);

submit.onclick = () => {
  const form = checkForm();
  if (form.response) {
    clearDOM();
    startGame(form.user);
  } else {
    noInputError();
  }
};