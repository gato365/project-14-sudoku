//  https://dev.to/dsasse07/generating-solving-sudoku-in-js-ruby-with-backtracking-4hm 
const BLANK_BOARD = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const isSafe = (board, row, col, num) => {
    for(let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if(board[row][i] === num || board[i][col] === num || board[m][n] === num) {
            return false;
        }
    }
    return true;
}

const solveSudoku = (board) => {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(board[i][j] === 0) {
                for(let num = 1; num <= 9; num++){
                    if(isSafe(board, i, j, num)){
                        board[i][j] = num;
                        if(solveSudoku(board)) {
                            return true;
                        } else {
                            board[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

const pokeHoles = (board, holes) => {
    while (holes > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if(board[row][col] !== 0) {
            board[row][col] = 0;
            holes--;
        }
    }
}

const generateSudoku = (holes) => {
    let board = JSON.parse(JSON.stringify(BLANK_BOARD));
    solveSudoku(board);
    let solution = JSON.parse(JSON.stringify(board));
    pokeHoles(board, holes);
    return [board, solution];
}

function formatBoard(board) {
    return board.map(row => row.join("").replace(/0/g, " "));
}

let [board, solution] = generateSudoku(20);

 console.log(formatBoard(board));
 console.log(formatBoard(solution));

