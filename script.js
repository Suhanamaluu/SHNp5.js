const squares = document.querySelectorAll('.square');
const statusMessage = document.getElementById('status-message');
const resetButton = document.getElementById('reset-button');
let board = Array(9).fill(null);
let isXNext = true;
let winner = null;

const winningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const handleClick = (index) => {
  if (board[index] || winner) return;

  board[index] = isXNext ? 'X' : 'O';
  squares[index].textContent = board[index];
  isXNext = !isXNext;
  
  winner = checkWinner();
  if (winner) {
    statusMessage.textContent = `Winner: ${winner}`;
  } else {
    statusMessage.textContent = `Next Player: ${isXNext ? 'X' : 'O'}`;
  }
};

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes(null) ? null : 'Draw';
};

const resetGame = () => {
  board.fill(null);
  isXNext = true;
  winner = null;
  statusMessage.textContent = 'Next Player: X';
  squares.forEach(square => (square.textContent = ''));
};

squares.forEach((square, index) => {
  square.addEventListener('click', () => handleClick(index));
});

resetButton.addEventListener('click', resetGame);
