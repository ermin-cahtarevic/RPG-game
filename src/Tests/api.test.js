import { initGame, postScore, getScores } from './apiMock';

describe('Tests for initalizing a new game on Score API', () => {
  test('Should return an object with the string ID of the game', () => {
    initGame().then(data => {
      expect(typeof data).toBe('object');
    });
  });

  test('Should return a string with the ID of the game', () => {
    initGame().then(data => {
      expect(typeof data.result).toBe('string');
    });
  });
});

describe('Tests for sending a POST request to the Score API', () => {
  test('Should return an object with the string ID of the game', () => {
    postScore('Ermin', 150).then(data => {
      expect(data).toBe('Leaderboard score created correctly.');
    });
  });
});

describe('Tests for sending a GET request to the Score API', () => {
  test('Should return an object with the users sorted by their scores', () => {
    getScores().then(data => {
      expect(typeof data).toBe('object');
    });
  });
});