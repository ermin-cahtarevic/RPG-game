let score = 0;

const getScore = () => score;

const setScore = (points) => {
  score += points;
  return `Current score: ${score}`;
};

const resetScore = () => {
  score = 0;
  return `Score restored to ${score}`;
};

export { getScore, setScore, resetScore };