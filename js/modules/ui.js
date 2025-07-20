// UI Module - Manages all DOM interactions and visual updates
const UI = {
    elements: {
        board: document.getElementById('game-board'),
        status: document.getElementById('game-status'),
        restartBtn: document.getElementById('restart-btn'),
        resetScoresBtn: document.getElementById('reset-scores-btn'),
        scoreX: document.getElementById('score-x'),
        scoreO: document.getElementById('score-o'),
        scoreTies: document.getElementById('score-ties')
    },

    init() {
        this.createBoard();
        this.bindEvents();
        this.updateDisplay();
    },

    createBoard() {
        this.elements.board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', () => this.handleCellClick(i));
            this.elements.board.appendChild(cell);
        }
    },

    bindEvents() {
        this.elements.restartBtn.addEventListener('click', () => Game.restart());
        this.elements.resetScoresBtn.addEventListener('click', () => Game.resetScores());
    },

    handleCellClick(index) {
        Game.makeMove(index);
    },

    updateBoard() {
        const cells = this.elements.board.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            const value = GameState.board[index];
            cell.textContent = value || '';
            cell.className = 'cell';
            if (value) {
                cell.classList.add(value.toLowerCase());
            }
        });
    },

    updateStatus(message, isWinner = false, isTie = false) {
        this.elements.status.textContent = message;
        this.elements.status.className = 'game-status';
        if (isWinner) {
            this.elements.status.classList.add('winner');
        } else if (isTie) {
            this.elements.status.classList.add('tie');
        }
    },

    highlightWinningCells(cells) {
        const boardCells = this.elements.board.querySelectorAll('.cell');
        cells.forEach(index => {
            boardCells[index].classList.add('winning');
        });
    },

    updateScores() {
        this.elements.scoreX.textContent = GameState.scores.X;
        this.elements.scoreO.textContent = GameState.scores.O;
        this.elements.scoreTies.textContent = GameState.scores.ties;
    },

    updateDisplay() {
        this.updateBoard();
        this.updateScores();
        if (GameState.gameActive) {
            this.updateStatus(`Player ${GameState.currentPlayer}'s turn`);
        }
    },

    animateMove(index) {
        const cell = this.elements.board.querySelector(`[data-index="${index}"]`);
        cell.style.animation = 'none';
        setTimeout(() => {
            cell.style.animation = 'fadeIn 0.3s ease-out';
        }, 10);
    }
};