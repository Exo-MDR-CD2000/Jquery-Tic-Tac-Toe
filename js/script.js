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

/**
 * Initializes the game when the document is ready.
 */
$(document).ready(function() {
    // Initialize variables
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    /**
     * Handles the click event on a cell.
     * @this {HTMLElement} The clicked cell element.
     */
    function handleCellClick() {
        const cellIndex = $(this).index(); // gets the index of the clicked cell
        
        // Check if the cell is already filled or the game is over
        if (gameBoard[cellIndex] !== '' || !gameActive) { // If the cell is already filled or the game is over, the function returns and does nothing.
            return;
        }

        // Update the game board and UI
        gameBoard[cellIndex] = currentPlayer; // updates the game board with the current player's choice
        $(this).text(currentPlayer); // updates the UI with the current player's choice

         // Adds CSS class based on the current player
         if (currentPlayer === 'X') {
            $(this).addClass('player1');
        } else {
            $(this).addClass('player2');
        }

        // Check for a win or draw
        const winningPattern = checkWin(); // calls the checkWin function to check if the current player has won
        if (checkWin()) { // checks if the current player has won
            gameActive = false; // we then set the gameActive variable to false to prevent further moves
            $('#winner').text(currentPlayer); // we update the winner text in the alert
            $('#winner-alert').removeClass('d-none'); // we then show the alert
            highlightWinningCells(winningPattern); // highlight the winning cells
        } else if (gameBoard.every(cell => cell !== '')) { // this checks if the game board is full
            gameActive = false; // then we set the gameActive variable to false to prevent further moves
            $('#tie-alert').removeClass('d-none'); // display the tie alert
        } else {
            // Switch to the next player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            $('#turn-indicator').text(`Player ${currentPlayer === 'X' ? 1 : 2}'s turn (${currentPlayer})`);
        }
    }

    /**
     * Checks if the current player has won the game.
     * @returns {Array|null} The winning pattern if the current player has won, otherwise null.
     */
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // Iterate over each winning pattern
        for (const pattern of winPatterns) {
            // checks if all cells in the pattern are filled with the current player's choice
            if (pattern.every(index => gameBoard[index] === currentPlayer)) {
                // return winning pattern if found
                return pattern;
            }
        }
        // return null if no winning pattern is found
        return null;
    }

      // Function to highlight winning cells using CSS
      function highlightWinningCells(winningPattern) {
        winningPattern.forEach(index => {
            $('.tic-tac-toe-cell').eq(index).addClass('winning-cell');
        });
    }

    // Function to restart the game
    function restartGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        $('.tic-tac-toe-cell').text('').removeClass('player1 player2 winning-cell');
        $('#turn-indicator').text("Player 1's turn (X)");
        $('#winner-alert').addClass('d-none');
        $('#tie-alert').addClass('d-none');
    }

    // Attach event handlers
    $('.tic-tac-toe-cell').click(handleCellClick);
    $('#restart-button').click(restartGame);
});