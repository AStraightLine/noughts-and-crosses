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
    const resetButton = document.getElementById('resetButton');

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
        gameBoard[selection].classList.add('animate');
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

    const displayVictoryController = (roundWinner, winningCombination) => {
        _highlightVictory(roundWinner, winningCombination);
    }

    const _highlightVictory = (roundWinner, winningCombination) => {
        // apply appropriate class styling to board square combination which earned the win // Possibility of being called twice
        for (let i = 0; i < winningCombination.length; i++) {
            if (roundWinner === 'user') {
                let square = GameBoard.gameBoard[(winningCombination[i])];
                square.classList.add('userWinningCombo');
            } else if (roundWinner === 'ai') {
                let square = GameBoard.gameBoard[(winningCombination[i])];
                square.classList.add('aiWinningCombo');
            }
        }
    }

    const drawHandler = (roundWinner) => {
        if (roundWinner === 'draw') {
            for (let i = 0; i < GameBoard.gameBoard.length; i++) {
                GameBoard.gameBoard[i].classList.add('drawSquare');
            }
        }
    }

    const clearWinningComboClasses = (roundWinner, winningCombination) => {
        if (roundWinner === 'draw') {
            for (let i = 0; i < GameBoard.gameBoard.length; i++) {
                GameBoard.gameBoard[i].classList.remove('drawSquare');
            }
        } else {
            for (let i = 0; i < GameBoard.gameBoard.length; i++) {
                if (roundWinner === 'user') {
                    GameBoard.gameBoard[i].classList.remove('userWinningCombo');
                } else if (roundWinner === 'ai') {
                    GameBoard.gameBoard[i].classList.remove('aiWinningCombo');
                }
            }
        }
        for (let i = 0; i < GameBoard.gameBoard.length; i++) {
            GameBoard.gameBoard[i].classList.remove('animate');
        }
    }

    return {
        populateNewBoard,
        clearBoard,
        displayUserSymbolSelection,
        squareSelected,
        aiSelected,
        displayVictoryController,
        clearWinningComboClasses,
        drawHandler,
    }
})();

// For functionality relating to the flow of game play.
const GameController = (() => {

    let _difficulty = '';
    let _resolved = false;
    let roundWinner = '';
    let winningCombination = [];

    const initGame = () => {
        DisplayController.populateNewBoard(GameBoard.gameBoard);
        setDifficulty(difficultySelect);
    }

    const setDifficulty = (option) => {
        _difficulty = option.value;
        resetHandler();
    }

    // Find winner when victory conditions met
    const _resolveGame = (winningSymbol, winningCombination) => {
        if (winningSymbol == userPlayer.getSymbol()) {
            roundWinner = 'user';
        } else if (winningSymbol == aiPlayer.getSymbol()) {
            roundWinner = 'ai';
        }
        _resolved = true;
        DisplayController.displayVictoryController(roundWinner, winningCombination);
    }

    const _checkVictory = () => {
        
        // Check victory conditions
        if(!(GameBoard.gameBoard[0].value == '') && // Make sure not equal because equally empty
                GameBoard.gameBoard[0].value == GameBoard.gameBoard[1].value &&
                GameBoard.gameBoard[1].value == GameBoard.gameBoard[2].value) {
            winningCombination = [0, 1, 2];
            _resolveGame(GameBoard.gameBoard[0].value, winningCombination);
        }

        if(!(GameBoard.gameBoard[3].value == '') &&
                GameBoard.gameBoard[3].value == GameBoard.gameBoard[4].value &&
                GameBoard.gameBoard[4].value == GameBoard.gameBoard[5].value) {
            winningCombination = [3, 4, 5];
            _resolveGame(GameBoard.gameBoard[3].value, winningCombination);
        }

        if(!(GameBoard.gameBoard[6].value == '') &&
                GameBoard.gameBoard[6].value == GameBoard.gameBoard[7].value &&
                GameBoard.gameBoard[7].value == GameBoard.gameBoard[8].value) {
            winningCombination = [6, 7, 8];
            _resolveGame(GameBoard.gameBoard[6].value, winningCombination);
        }

        if(!(GameBoard.gameBoard[0].value == '') &&
                GameBoard.gameBoard[0].value == GameBoard.gameBoard[3].value && 
                GameBoard.gameBoard[3].value == GameBoard.gameBoard[6].value) {
            winningCombination = [0, 3, 6];
            _resolveGame(GameBoard.gameBoard[0].value, winningCombination);
        }

        if(!(GameBoard.gameBoard[1].value == '') &&
                GameBoard.gameBoard[1].value == GameBoard.gameBoard[4].value &&
                GameBoard.gameBoard[4].value == GameBoard.gameBoard[7].value) {
            winningCombination = [1, 4, 7];
            _resolveGame(GameBoard.gameBoard[1].value, winningCombination);
        }

        if(!(GameBoard.gameBoard[2].value == '') &&
                GameBoard.gameBoard[2].value == GameBoard.gameBoard[5].value &&
                GameBoard.gameBoard[5].value == GameBoard.gameBoard[8].value) {
            winningCombination = [2, 5, 8];
            _resolveGame(GameBoard.gameBoard[2].value, winningCombination);
        }

        if(!(GameBoard.gameBoard[0].value == '') &&
                GameBoard.gameBoard[0].value == GameBoard.gameBoard[4].value && 
                GameBoard.gameBoard[4].value == GameBoard.gameBoard[8].value) {
            winningCombination = [0, 4, 8];
            _resolveGame(GameBoard.gameBoard[0].value, winningCombination);
        }

        if(!(GameBoard.gameBoard[6].value == '') &&
                GameBoard.gameBoard[6].value == GameBoard.gameBoard[4].value &&
                GameBoard.gameBoard[4].value == GameBoard.gameBoard[2].value) {
            winningCombination = [6, 4, 2];
            _resolveGame(GameBoard.gameBoard[6].value, winningCombination);
        }
    }

    const _checkPairs = (symbol) => {
        let _move;
        let _testMove;

        // Horizontal checks
        if ((GameBoard.gameBoard[0].value == symbol) && (GameBoard.gameBoard[1].value == symbol)) {
            _testMove = 2;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 2;
            }
        }
        if ((GameBoard.gameBoard[0].value == symbol) && (GameBoard.gameBoard[2].value == symbol)) {
            _testMove = 1;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 1;
            }
        }
        if ((GameBoard.gameBoard[1].value == symbol) && (GameBoard.gameBoard[2].value == symbol)) {
            _testMove = 0;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 0;
            }
        }
        if ((GameBoard.gameBoard[3].value == symbol) && (GameBoard.gameBoard[4].value == symbol)) {
            _testMove = 5;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 5;
            }
        }
        if ((GameBoard.gameBoard[3].value == symbol) && (GameBoard.gameBoard[5].value == symbol)) {
            _testMove = 4;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 4;
            }
        }
        if ((GameBoard.gameBoard[4].value == symbol) && (GameBoard.gameBoard[5].value == symbol)) {
            _testMove = 3;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 3;
            }
        }
        if ((GameBoard.gameBoard[6].value == symbol) && (GameBoard.gameBoard[7].value == symbol)) {
            _testMove = 8;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 8;
            }
        }
        if ((GameBoard.gameBoard[6].value == symbol) && (GameBoard.gameBoard[8].value == symbol)) {
            _testMove = 7;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 7;
            }
        }
        if ((GameBoard.gameBoard[7].value == symbol) && (GameBoard.gameBoard[8].value == symbol)) {
            _testMove = 6;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 6;
            }
        }
        // Vertical checks
        if ((GameBoard.gameBoard[0].value == symbol) && (GameBoard.gameBoard[3].value == symbol)) {
            _testMove = 6;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 6;
            }
        }
        if ((GameBoard.gameBoard[0].value == symbol) && (GameBoard.gameBoard[6].value == symbol)) {
            _testMove = 3;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 3;
            }
        }
        if ((GameBoard.gameBoard[3].value == symbol) && (GameBoard.gameBoard[6].value == symbol)) {
            _testMove = 0;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 0;
            }
        }
        if ((GameBoard.gameBoard[1].value == symbol) && (GameBoard.gameBoard[4].value == symbol)) {
            _testMove = 7;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 7;
            }
        }
        if ((GameBoard.gameBoard[1].value == symbol) && (GameBoard.gameBoard[7].value == symbol)) {
            _testMove = 4;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 4;
            }
        }
        if ((GameBoard.gameBoard[4].value == symbol) && (GameBoard.gameBoard[7].value == symbol)) {
            _testMove = 1;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 1;
            }
        }
        if ((GameBoard.gameBoard[2].value == symbol) && (GameBoard.gameBoard[5].value == symbol)) {
            _testMove = 8;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 8;
            }
        }
        if ((GameBoard.gameBoard[2].value == symbol) && (GameBoard.gameBoard[8].value == symbol)) {
            _testMove = 5;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 5;
            }
        }
        if ((GameBoard.gameBoard[5].value == symbol) && (GameBoard.gameBoard[8].value == symbol)) {
            _testMove = 2;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 2;
            }
        }
        // Diagonal checks
        if ((GameBoard.gameBoard[2].value == symbol) && (GameBoard.gameBoard[6].value == symbol)) {
            _testMove = 4;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 4;
            }
        }
        if ((GameBoard.gameBoard[2].value == symbol) && (GameBoard.gameBoard[4].value == symbol)) {
            _testMove = 6;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 6;
            }
        }
        if ((GameBoard.gameBoard[4].value == symbol) && (GameBoard.gameBoard[6].value == symbol)) {
            _testMove = 2;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 2;
            }
        }
        if ((GameBoard.gameBoard[4].value == symbol) && (GameBoard.gameBoard[8].value == symbol)) {
            _testMove = 0;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 0;
            }
        }
        if ((GameBoard.gameBoard[0].value == symbol) && (GameBoard.gameBoard[8].value == symbol)) {
            _testMove = 4;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 4;
            }
        }
        if ((GameBoard.gameBoard[0].value == symbol) && (GameBoard.gameBoard[4].value == symbol)) {
            _testMove = 8;
            if (GameBoard.gameBoard[_testMove].textContent === '') {
                _move = 8;
            }
        }

        // Return where to move if pair found else false
        if (_move != 'undefined') {
            return _move;
        } else {
            return false;
        }
    }

    const _checkDraw = () => {
        if (!_resolved) {
            // Check if last square
            let _squaresFilledCount = 0;
            for (let i = 0; i < 9; i++) {
                if (!(GameBoard.gameBoard[i].textContent === "")) {
                    _squaresFilledCount++;
                }
                if (_squaresFilledCount === 9) {
                    // All squares are filled, who won or draw?
                    _checkVictory();
                    // Check for draw
                    if (!_resolved) {
                        // Draw
                        roundWinner = 'draw';
                        DisplayController.drawHandler(roundWinner);
                        _resolved = true;
                    }
                }
            }
        }
    }

    const squareSelectHandler = (button) => {
        // Don't let the user keep clicking when someone has won
        if (_resolved) {
            return;
        }
        // Check if the square has already been selected by AI or User
        if (button.textContent === "") {
            DisplayController.squareSelected(button);
            GameBoard.setSelectedValue(button);

            _checkVictory();
        }
        // Check for a draw following user's move
        _checkDraw();
        if(!_resolved) {
            aiMoveHandler();
        }
    }

    const aiMoveHandler = () => {
        switch (_difficulty) {
            case 'easy':
                _makeAIMoveEasy();
                break;
            case 'medium':
                _makeAIMoveMedium();
                break;
            case 'hard':
                _makeAIMoveHard();
                break;
        }

        _checkDraw();
        _checkVictory();
    }

    // I like the idea of implementing: if it has index 0 and there are no pairs, move into 1, 2, 3, 6, 4 or 8
    // For now, checks for pairs in which it can win, if not, pairs in which to block, else random
    const _makeAIMoveHard = () => {
        let _selectionMade = false;
        let selection;

        if (_checkPairs(aiPlayer.getSymbol())) {
            selection = _checkPairs(aiPlayer.getSymbol());
            DisplayController.aiSelected(GameBoard.gameBoard, selection);
            GameBoard.setAISelectedValue(selection);
            _selectionMade = true;
        } else if (_checkPairs(userPlayer.getSymbol())) {
            selection = _checkPairs(userPlayer.getSymbol());
            DisplayController.aiSelected(GameBoard.gameBoard, selection);
            GameBoard.setAISelectedValue(selection);
            _selectionMade = true;
        } else {
            while (!_selectionMade) {
                selection = Math.floor(Math.random() * 9);
                if (GameBoard.gameBoard[selection].textContent === '') {
                    DisplayController.aiSelected(GameBoard.gameBoard, selection);
                    GameBoard.setAISelectedValue(selection);
                    _selectionMade = true;
                }
            }
        }
    }


    // Check if user is close to a victory condition, block if so, else random move
    const _makeAIMoveMedium = () => {
        let _selectionMade = false;
        let selection = _checkPairs(userPlayer.getSymbol());

        if (selection) {
            // If check pairs returns true, it has found that userPlayer is close to a win,
            // Move to block the win in the found pair.
            DisplayController.aiSelected(GameBoard.gameBoard, selection);
            GameBoard.setAISelectedValue(selection);
            _selectionMade = true;
        } else {
            // Make random move.
            while (!_selectionMade) {
                selection = Math.floor(Math.random() * 9);
                if (GameBoard.gameBoard[selection].textContent === '') {
                    DisplayController.aiSelected(GameBoard.gameBoard, selection);
                    GameBoard.setAISelectedValue(selection);
                    _selectionMade = true;
                }
            }
        }
    }

    // Random legal move
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
        DisplayController.clearWinningComboClasses(roundWinner, winningCombination);
        DisplayController.clearBoard(GameBoard.gameBoard);
        GameBoard.clearValues();
        _resolved = false;
        _roundWinner = '';
        winningCombination = [];
        _squaresFilledCount = 0;

        // If user is 'noughts' AI goes first
        if (userPlayer.getSymbol() === 'O') {
            aiMoveHandler();
        }
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
        aiMoveHandler,
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

const difficultySelectOptions = document.querySelectorAll('.difficultyOption');
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
