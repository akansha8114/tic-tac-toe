const Game = {
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    },

    start() {
        SoundFX.init();
        UI.init();
        this.loadScores();
        this.bindGlobalEvents();
        console.log('🎮 Tic Tac Toe Game Initialized');
    },

    makeMove(index) {
        if (!GameState.makeMove(index)) return;

        UI.updateBoard();
        UI.animateMove(index);
        SoundFX.playMoveSound();

        const result = GameLogic.getGameResult();
        
        if (result) {
            setTimeout(() => {
                this.endGame(result);
            }, 100);
        } else {
            GameState.switchPlayer();
            UI.updateStatus(`Player ${GameState.currentPlayer}'s turn`);
        }
    },

    endGame(result) {
        GameState.gameActive = false;
        
        if (result.winner === 'tie') {
            UI.updateStatus('It\'s a tie! 🤝', false, true);
            GameState.updateScore('tie');
            SoundFX.playTieSound();
        } else {
            UI.updateStatus(`Player ${result.winner} wins! 🎉`, true);
            UI.highlightWinningCells(result.winningCells);
            GameState.updateScore(result.winner);
            SoundFX.playWinSound();
        }
        
        UI.updateScores();
        this.saveScores();
    },

    restart() {
        GameState.reset();
        UI.updateDisplay();
        const cells = UI.elements.board.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('winning'));
        console.log('🔄 Game restarted');
    },

    resetScores() {
        GameState.resetScores();
        UI.updateScores();
        this.saveScores();
        console.log('📊 Scores reset');
    },

    saveScores() {
        try {
            localStorage.setItem('ticTacToeScores', JSON.stringify(GameState.scores));
        } catch (e) {
            window.gameScores = { ...GameState.scores };
        }
    },

    loadScores() {
        try {
            const savedScores = localStorage.getItem('ticTacToeScores');
            if (savedScores) {
                GameState.scores = JSON.parse(savedScores);
                UI.updateScores();
            }
        } catch (e) {
            if (window.gameScores) {
                GameState.scores = { ...window.gameScores };
                UI.updateScores();
            }
        }
    },

    bindGlobalEvents() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('🔇 Game paused (tab hidden)');
            } else {
                console.log('🔊 Game resumed (tab visible)');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' || e.key === 'R') {
                this.restart();
            }
        });
    }
};

window.TicTacToeGame = {
    GameState,
    GameLogic,
    UI,
    SoundFX,
    Game
};

Game.init();