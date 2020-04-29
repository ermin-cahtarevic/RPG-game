import { getScore, setScore, resetScore } from '../score';

describe('Tests for getting initial score', () => {
  test('Should return 0 as initial score', () => {
    expect(getScore()).toEqual(0);
  });
});

describe('Tests for score', () => {
  test('Should return current score, after updating', () => {
    expect(setScore(50)).toBe('Current score: 50');
  });
});

describe('Tests for getting updated score', () => {
  test('Should return 50, after score was updated', () => {
    expect(getScore()).toEqual(50);
  });
});

describe('Tests for resetting score', () => {
  test('Should return current score 0', () => {
    expect(resetScore()).toBe('Score restored to 0');
  });
});