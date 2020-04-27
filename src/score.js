let score = 0;

const getScore = () => score;

const setScore = (points) => {
  score += points;
  return `Current score: ${score}`;
};

const resetScore = () => {
  score = 0;
};

export { getScore, setScore, resetScore };