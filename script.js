// Define the initial state variables
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';
let gameOver = false;
let moveHistory = [];
let currentMoveIndex = -1;

// Start the game by rendering the board
renderBoard();

function renderBoard() {
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = ''; // Clear previous content
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const square = document.createElement('div');
            square.classList.add('square');
            square.textContent = cell;
            square.onclick = () => makeMove(rowIndex, colIndex);
            boardContainer.appendChild(square);
        });
    });
}

function makeMove(row, col) {
    if (board[row][col] !== '' || gameOver) return;

    // Update board and save move to history
    board[row][col] = currentPlayer;
    moveHistory.push(JSON.parse(JSON.stringify(board))); // Save deep copy
    currentMoveIndex = moveHistory.length - 1;

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateGameStatus();

    renderBoard();
}

function updateGameStatus() {
    document.getElementById('turnDisplay').textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winningCombinations = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
            document.getElementById('winnerDisplay').textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
            document.getElementById('prevBtn').disabled = false;
            document.getElementById('nextBtn').disabled = true;
            return;
        }
    }

    if (moveHistory.length === 9) {
        document.getElementById('winnerDisplay').textContent = 'It\'s a draw!';
        gameOver = true;
        document.getElementById('prevBtn').disabled = false;
    }
}

function showPreviousMove() {
    if (currentMoveIndex > 0) {
        currentMoveIndex--;
        board = JSON.parse(JSON.stringify(moveHistory[currentMoveIndex]));
        renderBoard();
        document.getElementById('nextBtn').disabled = false;
        if (currentMoveIndex === 0) {
            document.getElementById('prevBtn').disabled = true;
        }
    }
}

function showNextMove() {
    if (currentMoveIndex < moveHistory.length - 1) {
        currentMoveIndex++;
        board = JSON.parse(JSON.stringify(moveHistory[currentMoveIndex]));
        renderBoard();
        document.getElementById('prevBtn').disabled = false;
        if (currentMoveIndex === moveHistory.length - 1) {
            document.getElementById('nextBtn').disabled = true;
        }
    }
}

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameOver = false;
    moveHistory = [];
    currentMoveIndex = -1;
    document.getElementById('prevBtn').disabled = true;
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('winnerDisplay').textContent = '';
    updateGameStatus();
    renderBoard();
}
