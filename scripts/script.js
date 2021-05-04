// Module for GameBoard as we only need one instance. 
const GameBoard = (() => {
    let gameBoard = [];

    const setSelectedValue = (button) => {
        button.value = button.textContent;
    }

    const setAISelectedValue = (selection) => {
        gameBoard[selection].value = aiPlayer.getSymbol();
    }

    const clearValues = () => {
        for (let i = 0; i < 9; i++) {
            gameBoard[i].value = '';
        }
    }

    return {
        gameBoard,
        setSelectedValue,
        clearValues,
        setAISelectedValue,
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

    const aiSelected = (gameBoard, selection) => {
        gameBoard[selection].textContent = aiPlayer.getSymbol();
    }

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
        aiSelected,
    }
})();

// For functionality relating to the flow of game play.
const GameController = (() => {

    let _difficulty = '';
    let _resolved = false;

    const initGame = () => {
        DisplayController.populateNewBoard(GameBoard.gameBoard);
        setDifficulty(difficultySelect);
    }

    const setDifficulty = (option) => {
        _difficulty = option.value;
        resetHandler();
    }

    // Find winner when victory conditions met
    const _resolveGame = (winningSymbol) => {
        // Test
        console.log("Someone won");
        // Decide who's won
        // Flag game as resolved.
        _resolved = true;
    }

    const _checkVictory = () => {
        
        // Check victory conditions
        if(!(GameBoard.gameBoard[0].value == '') && // Make sure not equal because equally empty
            GameBoard.gameBoard[0].value == GameBoard.gameBoard[1].value &&
            GameBoard.gameBoard[1].value == GameBoard.gameBoard[2].value) {
            _resolveGame(GameBoard.gameBoard[0].value);
        }

        if(!(GameBoard.gameBoard[3].value == '') &&
            GameBoard.gameBoard[3].value == GameBoard.gameBoard[4].value &&
            GameBoard.gameBoard[4].value == GameBoard.gameBoard[5].value) {
            _resolveGame(GameBoard.gameBoard[3].value);
        }

        if(!(GameBoard.gameBoard[6].value == '') &&
            GameBoard.gameBoard[6].value == GameBoard.gameBoard[7].value &&
            GameBoard.gameBoard[7].value == GameBoard.gameBoard[8].value) {
            _resolveGame(GameBoard.gameBoard[6].value);
        }

        if(!(GameBoard.gameBoard[0].value == '') &&
            GameBoard.gameBoard[0].value == GameBoard.gameBoard[3].value && 
            GameBoard.gameBoard[3].value == GameBoard.gameBoard[6].value) {
            _resolveGame(GameBoard.gameBoard[0].value);
        }

        if(!(GameBoard.gameBoard[1].value == '') &&
            GameBoard.gameBoard[1].value == GameBoard.gameBoard[4].value &&
            GameBoard.gameBoard[4].value == GameBoard.gameBoard[7].value) {
            _resolveGame(GameBoard.gameBoard[1].value);
        }

        if(!(GameBoard.gameBoard[2].value == '') &&
            GameBoard.gameBoard[2].value == GameBoard.gameBoard[5].value &&
            GameBoard.gameBoard[5].value == GameBoard.gameBoard[8].value) {
            _resolveGame(GameBoard.gameBoard[2].value);
        }

        if(!(GameBoard.gameBoard[0].value == '') &&
            GameBoard.gameBoard[0].value == GameBoard.gameBoard[4].value && 
            GameBoard.gameBoard[4].value == GameBoard.gameBoard[8].value) {
            _resolveGame(GameBoard.gameBoard[0].value);
        }

        if(!(GameBoard.gameBoard[6].value == '') &&
            GameBoard.gameBoard[6].value == GameBoard.gameBoard[4].value &&
            GameBoard.gameBoard[4].value == GameBoard.gameBoard[2].value) {
            _resolveGame(GameBoard.gameBoard[6].value);
        }
    }

    const squareSelectHandler = (button) => {
        // Check if the square has already been selected by AI or User
        if (button.textContent === "") {
            DisplayController.squareSelected(button);
            GameBoard.setSelectedValue(button);

            _checkVictory();

            if (!_resolved) {
                // Check if last square
                let _squaresFilledCount = 0;

                for (let i = 0; i < 9; i++) {
                    if (!(GameBoard.gameBoard[i].textContent === "")) {
                        _squaresFilledCount++;
                    }
                    if (_squaresFilledCount === 9) {
                        // See all squares are filled, see who won and return without allowing computer to make a move.
                        _checkVictory();
                        // Check for draw
                        if (!_resolved) {
                            // Draw
                            // Do something to let the user know and give them the option to reset.
                            _resolved = true;
                        }
                        return;
                    }
                }

                switch (_difficulty) {
                    case 'easy':
                        _makeAIMoveEasy();
                        break;
                    case 'medium':
                        break;
                    case 'hard':
                        break;
                    case 'impossible':
                        break;
                }

                _checkVictory();
                
            } else {
                return;
            }
        }
    }

    const _makeAIMoveEasy = () => {
        // Loop until random lands on a square which hasn't been selected yet.
        let selectionMade = false;
        while (!selectionMade) {
            let selection = Math.floor(Math.random() * 9);
            if (GameBoard.gameBoard[selection].textContent === '') {
                DisplayController.aiSelected(GameBoard.gameBoard, selection);
                GameBoard.setAISelectedValue(selection);
                selectionMade = true;
            }
        }
    }

    const resetHandler = () => {
        DisplayController.clearBoard(GameBoard.gameBoard);
        GameBoard.clearValues();
        _resolved = false;
        _squaresFilledCount = 0;
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
        resetHandler();
    }

    return {
        initGame,
        symbolSelectionHandler,
        squareSelectHandler,
        resetHandler,
        setDifficulty,
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

const difficultySelect = document.getElementById('difficultySelect');
const symbolSelectButtons = document.querySelectorAll('.symbolButton');

const userPlayer = Player('X');
const aiPlayer = Player('O');

GameController.initGame();

const boardSquares = document.querySelectorAll('.boardSquare');
const resetButton = document.getElementById('resetButton');

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

