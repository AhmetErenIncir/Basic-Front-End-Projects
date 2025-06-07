const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', '']; // Represents the board state

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    // Template literal replaced with string concatenation
    statusDisplay.textContent = 'Oyuncu ' + currentPlayer + ' Kazandı!';
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    statusDisplay.textContent = 'Oyun Berabere!';
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  // Check if the cell is already filled or the game is inactive
  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  // Update game state and UI
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer); // Add class for styling

  // Check for win/draw or switch player
  handleResultValidation();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  // Template literal replaced with string concatenation
  statusDisplay.textContent = 'Sıra: ' + currentPlayer;
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.textContent = 'Sıra: X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O'); // Remove classes
  });
}

// Add event listeners to cells and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleRestartGame);

// Initial status display - Template literal replaced with string concatenation
statusDisplay.textContent = 'Sıra: ' + currentPlayer;
