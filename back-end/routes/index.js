const determineWinner = (move1, move2) => {
  if (move1 === move2) return 'draw';
  if ((move1 === 'stone' && move2 === 'scissors') ||
      (move1 === 'scissors' && move2 === 'paper') ||
      (move1 === 'paper' && move2 === 'stone')) {
    return 'player1';
  }
  return 'player2';
};
