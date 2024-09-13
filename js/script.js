// jQuery goes here

// Check if jQuery is loaded and working
if (typeof jQuery !== 'undefined') {
    console.log(`jQuery is loaded: version ${$.fn.jquery}`);
} else {
    console.log('jQuery is not loaded');
}


console.log($('body'));


/**Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.

    Create a Tic-Tac-Toe game grid using your HTML element of choice.
    When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
    A heading should say whether it is X's or O's turn and change with each move made.
    A button should be available to clear the grid and restart the game.
    When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.
 */


/**
 * I need logic for the game
 * The player should be given a choice to choose between X and O
 * Then the game should start
 * The player should be able to click on the grid to place their choice
 * The game should check if the player has won
 * The game should check if the grid is full
 * The game should announce the winner
 * The game should allow the player to restart
 */


// Game logic below:

$(document).ready(function() {
    // Initialize variables
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Function to handle cell click
    function handleCellClick() {
        const cellIndex = $(this).index();
        
        // Check if the cell is already filled or the game is over
        if (gameBoard[cellIndex] !== '' || !gameActive) {
            return;
        }

        // Update the game board and UI
        gameBoard[cellIndex] = currentPlayer;
        $(this).text(currentPlayer);

         // Add class based on the current player
         if (currentPlayer === 'X') {
            $(this).addClass('player1');
        } else {
            $(this).addClass('player2');
        }

        // Check for a win or draw
        if (checkWin()) {
            gameActive = false;
            $('#winner').text(currentPlayer);
            $('#winner-alert').removeClass('d-none');
        } else if (gameBoard.every(cell => cell !== '')) {
            gameActive = false;
            $('#tie-alert').removeClass('d-none');
        } else {
            // Switch to the next player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            $('#turn-indicator').text(`Player ${currentPlayer === 'X' ? 1 : 2}'s turn (${currentPlayer})`);
        }
    }

    // Function to check for a win
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => gameBoard[index] === currentPlayer);
        });
    }

    // Function to restart the game
    function restartGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        $('.tic-tac-toe-cell').text('').removeClass('player1 player2');
        $('#turn-indicator').text("Player 1's turn (X)");
        $('#winner-alert').addClass('d-none');
        $('#tie-alert').addClass('d-none');
    }

    // Attach event handlers
    $('.tic-tac-toe-cell').click(handleCellClick);
    $('#restart-button').click(restartGame);
});