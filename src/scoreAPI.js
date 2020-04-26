import 'regenerator-runtime';

const initGame = async () => {
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

  const response = await fetch(url, data);
  const result = await response.json();
  return result.result;
};

const postScore = async (name, score) => {
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

  const response = await fetch(url, data);
  const result = await response.json();
  return result;
};

const getScores = async () => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/mks0JG7qQwICboU6t2sW/scores/';
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, data);
  const result = await response.json();

  return result;
};

export { initGame, postScore, getScores };