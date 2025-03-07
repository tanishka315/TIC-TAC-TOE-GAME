let board = Array(9).fill(null); // The board will track the state of each cell
let currentPlayer = 'X'; // Player 'X' starts the game
let gameOver = false;
let history = []; // Track the history of moves

// Function to handle player and computer moves
function makeMove(index) {
    if (board[index] || gameOver) return; // If the cell is already filled or the game is over, do nothing

    // Player makes a move
    board[index] = currentPlayer;
    updateBoard();

    // Check if the player has won
    if (checkWinner(currentPlayer)) {
        document.getElementById('status').innerText = `${currentPlayer} Wins!`;
        gameOver = true;
        history.push(`${currentPlayer} wins at move ${history.length + 1}`);
        updateHistory();
        return;
    }

    // Check if the board is full (draw)
    if (board.every(cell => cell !== null)) {
        document.getElementById('status').innerText = "It's a Draw!";
        gameOver = true;
        history.push(`Draw at move ${history.length + 1}`);
        updateHistory();
        return;
    }

    // Switch to the next player (Computer's turn)
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').innerText = `Player's Turn (${currentPlayer})`;

    // If it's the computer's turn, make a random move
    if (currentPlayer === 'O' && !gameOver) {
        setTimeout(computerMove, 500);
    }
}

// Function for the computer to make a random move
function computerMove() {
    let availableMoves = board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
    let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[move] = 'O';
    updateBoard();
    
    // Check if computer wins
    if (checkWinner('O')) {
        document.getElementById('status').innerText = "Computer (O) Wins!";
        gameOver = true;
        history.push(`Computer wins at move ${history.length + 1}`);
        updateHistory();
    } else {
        // Switch to player's turn (X)
        currentPlayer = 'X';
        document.getElementById('status').innerText = "Player's Turn (X)";
    }
}

// Function to check if a player has won
function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => pattern.every(index => board[index] === player));
}

// Function to update the visual board
function updateBoard() {
    board.forEach((cell, index) => {
        document.getElementById(index).innerText = cell;
    });
}

// Function to reset the game
function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;
    document.getElementById('status').innerText = `Player's Turn (X)`;
    updateBoard();
}

// Function to update the game history display
function updateHistory() {
    let historyList = document.getElementById('history');
    let historyItem = document.createElement('li');
    historyItem.innerText = history[history.length - 1];
    historyList.appendChild(historyItem);
}
