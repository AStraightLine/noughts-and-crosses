// Module for GameBoard as we only need one instance. 
const GameBoard = (() => {
    let gameBoard = [];

    return {
        gameBoard,
    };
})();

// For functionality relating to display input and output.
const DisplayController = (() => {

    const _board = document.getElementById('board');

    const populateNewBoard = (gameBoard) => {
        for (let i = 0; i < 9; i++) {
            const boardSquare = document.createElement('button');
            boardSquare.setAttribute('value', '');
            boardSquare.setAttribute('id', 'boardSquare'+i);
            boardSquare.classList.add('boardSquare');
            _board.appendChild(boardSquare);
            gameBoard.push(boardSquare);
        }
    };

    const clearBoard = (gameBoard) => {
        for (let i = 0; i < 9; i++) {
            gameBoard[i].setAttribute('value', '');
            gameBoard[i].textContent = '';
        }
    };

    return {
        populateNewBoard,
        clearBoard,
    }
})();

// For functionality relating to the flow of game play.
const GameController = (() => {

})();

// Factory Function for Player as there will be multiple Player instances. 
const Player = () => {

};

DisplayController.populateNewBoard(GameBoard.gameBoard);
DisplayController.clearBoard(GameBoard.gameBoard);
console.log(GameBoard.gameBoard);


