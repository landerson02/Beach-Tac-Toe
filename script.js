let dif;
let maxDepth;
let playerIcon;
let aiIcon;
let curPLayer = true;
const EMPTY = 0;
const PLAYER = 1;
const AI = -1;
const board = Array(3).fill(null).map(() => Array(3).fill(EMPTY));
const elementBoard = Array(3).fill(null).map(() => Array(3).fill(null));

function getRandomMove(board) {
    let possibleMoves = [];
    for (let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] === EMPTY) {
                possibleMoves.push([i, j]);
            }
        }
    }
    return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
}

function getScore(board) {
    let score = 0;
    if(isDraw(board)) {
        return 0;
    }
    let winner = isWin(board);
    if(winner === AI) {
        return 100;
    } else if (winner === PLAYER) {
        return -100;
    } else {
        // Check rows
        for(let i = 0; i < 3; i++) {
            if(board[i][0] !== EMPTY && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                if(board[i][0] === AI) {
                    score += 10;
                } else if(board[i][0] === PLAYER) {
                    score -= 10;
                }
            }
        }
        // Check cols
        for(let i = 0; i < 3; i++) {
            if(board[0][i] !== EMPTY && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                if(board[0][i] === AI) {
                    score += 10;
                } else if(board[0][i] === PLAYER) {
                    score -= 10;
                }
            }
        }
        // Check diagonals
        if(board[0][0] !== EMPTY && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            if(board[0][0] === AI) {
                score += 10;
            } else if(board[0][0] === PLAYER) {
                score -= 10;
            }
        }
        if(board[0][2] !== EMPTY && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            if(board[0][2] === AI) {
                score += 10;
            } else if(board[0][2] === PLAYER) {
                score -= 10;
            }
        }
    }
    return score;
}

function minimax(board, depth, isMaxPlayer) {
    let score;
    let state = isWin(board);
    if(state !== 0 || isDraw(board)) {
        score = getScore(board);
        return {score: score};
    }
    if(depth === maxDepth) {
        score = getScore(board);
        return {score: score};
    }
    if(isMaxPlayer) {
        let bestScore = -Infinity;
        let bestMove;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++){
                if(board[i][j] === EMPTY) {
                    board[i][j] = AI;
                    let result = minimax(board, depth + 1, false);
                    let moveScore = result.score
                    board[i][j] = EMPTY;
                    if(moveScore > bestScore) {
                        console.log(moveScore);
                        bestScore = moveScore;
                        bestMove = [i, j];
                    }
                }
            }
        }
        return {score: bestScore, move: bestMove};
    } else {
        let bestScore = Infinity;
        let bestMove;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++){
                if(board[i][j] === EMPTY) {
                    board[i][j] = PLAYER;
                    let result = minimax(board, depth + 1, true);
                    let moveScore = result.score
                    board[i][j] = EMPTY;
                    if(moveScore < bestScore) {
                        bestScore = moveScore;
                        bestMove = [i, j];
                    }
                }
            }
        }
        return {score: bestScore, move: bestMove};
    }
}

function getMove(board) {
    // if (maxDepth === 1) {
    //     return getRandomMove(board);
    // }
    return minimax(board, 0, true).move;
}

function isGameOver(board) {
    return isWin(board) || isDraw(board);
}

function isWin(board) {
    // Check rows
    for(let i = 0; i < 3; i++) {
        if(board[i][0] !== EMPTY && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
    }
    // Check cols
    for(let i = 0; i < 3; i++) {
        if(board[0][i] !== EMPTY && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return board[0][i];
        }
    }
    // Check diagonals
    if(board[0][0] !== EMPTY && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if(board[0][2] !== EMPTY && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }
    return 0;
}

function isDraw(board) {
    if(isWin(board)) {
        return false;
    }
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++){
            if(board[i][j] === EMPTY) {
                return false;
            }
        }
    }
    return true;
}

function start() {
    let mainContainer = document.getElementById('main-container');

    let iconSelected = -1;
    let difSelected = -1;
    let startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        if(iconSelected !== -1 && difSelected !== -1) {
            while(mainContainer.firstChild!=null) {
                mainContainer.removeChild(mainContainer.firstChild);
            }
            if (difSelected === 0) {
                maxDepth = 1;
            } else if (difSelected === 1) {
                maxDepth = 2;
            } else if (difSelected === 2) {
                maxDepth = 3;
            } else if (difSelected === 3) {
                maxDepth = Infinity;
            }
            const icons = ['ball', 'star', 'pineapple', 'flamingo'];
            do {
                const num = Math.floor(Math.random() * 4);
                aiIcon = icons[num];
            } while(playerIcon === aiIcon);
            beginGame();
        }
    });
    let iconElements = [];
    let difElements = [];
    for (let i = 0; i < 4; i++) {
        iconElements.push(document.getElementById('icon-' + i));
        difElements.push(document.getElementById('dif-' + i));
        iconElements[i].addEventListener('click', () => {
            for (let j = 0; j < 4; j++) {
                iconElements[j].classList.remove('selected');
            }
            iconElements[i].classList.add('selected');
            iconSelected = i;
            if (iconSelected === 0) {
                playerIcon = 'ball';
            } else if (iconSelected === 1) {
                playerIcon = 'star';
            } else if (iconSelected === 2) {
                playerIcon = 'pineapple';
            } else if (iconSelected === 3) {
                playerIcon = 'flamingo';
            }
        });
        difElements[i].addEventListener('click', () => {
            for (let j = 0; j < 4; j++) {
                difElements[j].classList.remove('selected');
            }
            difElements[i].classList.add('selected');
            difSelected = i;
            dif = difSelected;
        });
    }
}

function beginGame() {
    // Create board
    const mainContainer = document.getElementById('main-container');
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            let cell = document.createElement('button');
            cell.classList.add('cell');
            cell.id = 'cell' + (3*i + j);
            elementBoard[i][j] = cell;
            gridContainer.appendChild(cell);
        }
    }
    console.log(elementBoard);
    mainContainer.appendChild(gridContainer);
    let isUserTurn = true;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            elementBoard[i][j].addEventListener('click', () => {
                if (board[i][j] !== EMPTY) return;
                if(isUserTurn) {
                    elementBoard[i][j].classList.add(playerIcon);
                    board[i][j] = PLAYER;
                    isUserTurn = false;
                }
                if(isWin(board)) {
                    console.log('USER WON');
                    return;
                }
                let move = getMove(board);
                console.log(move);
                board[move[0]][move[1]] = AI;
                elementBoard[move[0]][move[1]].classList.add(aiIcon);
                isUserTurn = true;
                if(isWin(board)) {
                    console.log('AI WON');
                } else if(isDraw(board)) {
                    console.log('DRAW');
                }
            });
        }
    }
}
