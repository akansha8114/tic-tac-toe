// Game State Module - Manages all game state data
const GameState = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    gameActive: true,
    scores: {
        X: 0,
        O: 0,
        ties: 0
    },

    reset() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameActive = true;
    },

    resetScores() {
        this.scores = { X: 0, O: 0, ties: 0 };
    },

    makeMove(index) {
        if (this.board[index] || !this.gameActive) return false;
        this.board[index] = this.currentPlayer;
        return true;
    },

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    },

    updateScore(result) {
        if (result === 'tie') {
            this.scores.ties++;
        } else {
            this.scores[result]++;
        }
    }
};