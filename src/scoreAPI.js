import 'regenerator-runtime';
import error from './error';

const initGame = async () => {
  let returnValue = {};

  const title = JSON.stringify({
    name: 'Forest Run',
  });
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: title,
  };

  try {
    const response = await fetch(url, data);
    returnValue = await response.json();
  } catch (err) {
    error(err);
  }

  return returnValue.result;
};

const postScore = async (name, score) => {
  let returnValue = {};

  const post = JSON.stringify({
    user: name,
    score,
  });
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/mks0JG7qQwICboU6t2sW/scores/';
  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: post,
  };

  try {
    const response = await fetch(url, data);
    returnValue = await response.json();
  } catch (err) {
    error(err);
  }

  return returnValue;
};

const sortPlayers = (input) => {
  const arr = [];

  for (let i = 0; i < input.length; i += 1) {
    arr.push([input[i].user, input[i].score]);
  }

  arr.sort((a, b) => b[1] - a[1]);

  return arr;
};

const getScores = async () => {
  let returnValue = {};

  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/mks0JG7qQwICboU6t2sW/scores/';
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, data);
    returnValue = await response.json();
  } catch (err) {
    error(err);
  }

  return sortPlayers(returnValue.result);
};

export { initGame, postScore, getScores };