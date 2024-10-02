document.getElementById("submit").addEventListener("click", startGame);

let player1 = '';
let player2 = '';
let currentPlayer = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function startGame() {
    player1 = document.getElementById("player1").value;
    player2 = document.getElementById("player2").value;
    
    if (player1 && player2) {
        document.getElementById("name-input").style.display = 'none';
        document.getElementById("game").style.display = 'block';
        currentPlayer = player1; // Player 1 starts
        document.querySelector('.message').textContent = `${currentPlayer}, you're up`;
    } else {
        alert("Please enter names for both players!");
    }
}

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(event) {
    const cellIndex = event.target.id - 1;
    
    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer === player1 ? 'X' : 'O';
    event.target.textContent = board[cellIndex];

    if (checkWinner()) {
        document.querySelector('.message').textContent = `${currentPlayer}, congratulations you won!`;
        gameActive = false;
        return;
    }
    
    if (!board.includes('')) {
        document.querySelector('.message').textContent = `It's a tie!`;
        return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    document.querySelector('.message').textContent = `${currentPlayer}, you're up`;
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombos.some(combo => {
        return board[combo[0]] !== '' &&
               board[combo[0]] === board[combo[1]] &&
               board[combo[1]] === board[combo[2]];
    });
}
