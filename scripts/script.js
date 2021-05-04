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
    const _crossesButton = document.getElementById('crossesSelectButton');
    const _noughtsButton = document.getElementById('noughtsSelectButton');

    const populateNewBoard = (gameBoard) => {
        for (let i = 0; i < 9; i++) {
            const boardSquare = document.createElement('button');
            boardSquare.value = '';
            boardSquare.setAttribute('id', 'boardSquare'+i);
            boardSquare.classList.add('boardSquare');
            _board.appendChild(boardSquare);
            gameBoard.push(boardSquare);
            displayUserSymbolSelection();
        }
    };

    const clearBoard = (gameBoard) => {
        for (let i = 0; i < 9; i++) {
            gameBoard[i].textContent = '';
        }
    };

    const squareSelected = (button) => {
        button.textContent = userPlayer.getSymbol();
    };

    const displayUserSymbolSelection = () => {
        if (userPlayer.getSymbol() === 'X') {
            _crossesButton.classList.add('selectedSymbol');
            _noughtsButton.classList.remove('selectedSymbol');
        } else if (userPlayer.getSymbol() === 'O') {
            _noughtsButton.classList.add('selectedSymbol');
            _crossesButton.classList.remove('selectedSymbol');
        }
    };

    return {
        populateNewBoard,
        clearBoard,
        displayUserSymbolSelection,
        squareSelected,
    }
})();

// For functionality relating to the flow of game play.
const GameController = (() => {

    const initGame = () => {
        DisplayController.populateNewBoard(GameBoard.gameBoard);
    }

    const squareSelectHandler = (button) => {
        // Check if the square has already been selected by AI or User
        if (button.textContent === "") {
            DisplayController.squareSelected(button);
        } else {
            return;
        }
    }

    const resetHandler = () => {
        DisplayController.clearBoard(GameBoard.gameBoard);
    }

    const symbolSelectionHandler = (button) => {
        if (button.value === 'X') {
            userPlayer.setSymbol(button.value);
            aiPlayer.setSymbol('O');
        } else if (button.value === 'O') {
            userPlayer.setSymbol(button.value);
            aiPlayer.setSymbol('X');
        }
        DisplayController.displayUserSymbolSelection();
        DisplayController.clearBoard(GameBoard.gameBoard);
    }

    return {
        initGame,
        symbolSelectionHandler,
        squareSelectHandler,
        resetHandler,
    }

})();

// Factory Function for Player as there will be multiple Player instances. 
const Player = (symbol) => {
    let _playerSymbol = symbol;

    const getSymbol = () => _playerSymbol;
    const setSymbol = (newSymbol) => {
        _playerSymbol = newSymbol;
    }

    return {
        getSymbol,
        setSymbol,
    }
};

const userPlayer = Player('X');
const aiPlayer = Player('O');

GameController.initGame();

const symbolSelectButtons = document.querySelectorAll('.symbolButton');
const resetButton = document.getElementById('resetButton');
const boardSquares = document.querySelectorAll('.boardSquare');

symbolSelectButtons.forEach((button) => {
    button.addEventListener('click', () => {
        GameController.symbolSelectionHandler(button);
    });
});

resetButton.addEventListener('click', () => {
    GameController.resetHandler();
});

boardSquares.forEach((button) => {
    button.addEventListener('click', () => {
        GameController.squareSelectHandler(button);
    });
});

