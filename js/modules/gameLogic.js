// Game Logic Module - Handles game rules and win/tie detection
const GameLogic = {
    winningConditions: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ],

    checkWinner() {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (GameState.board[a] && 
                GameState.board[a] === GameState.board[b] && 
                GameState.board[a] === GameState.board[c]) {
                return {
                    winner: GameState.board[a],
                    winningCells: condition
                };
            }
        }
        return null;
    },

    checkTie() {
        return GameState.board.every(cell => cell !== null);
    },

    getGameResult() {
        const winResult = this.checkWinner();
        if (winResult) return winResult;
        if (this.checkTie()) return { winner: 'tie', winningCells: [] };
        return null;
    }
};