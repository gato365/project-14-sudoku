////////////////////////////////////////
// Generate a new Sudoku board functions
////////////////////////////////////////



// Generate a new Sudoku board

function generateSolution() {
    const board = new Array(9).fill(null).map(() => new Array(9).fill(null));

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            while (numbers.length > 0) {
                const randomIndex = Math.floor(Math.random() * numbers.length);
                const number = numbers.splice(randomIndex, 1)[0];

                if (isValid(board, row, col, number)) {
                    board[row][col] = number;
                    break;
                } else if (numbers.length === 0) {
                    // Reset and try again
                    return generateSolution();
                }
            }
        }
    }

    return board;
}

// Check if a number is valid in a specific position
function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        const ySquare = Math.floor(row / 3) * 3;
        const xSquare = Math.floor(col / 3) * 3;

        if (board[row][x] === num || board[x][col] === num || board[ySquare + Math.floor(x / 3)][xSquare + (x % 3)] === num) {
            return false;
        }
    }

    return true;
}

// Generate a Sudoku puzzle from a solution
function generatePuzzle(solution, clues) {
    const puzzle = JSON.parse(JSON.stringify(solution)); // Deep copy of the solution
    let removed = 81 - clues;

    while (removed > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (puzzle[row][col] !== null) {
            puzzle[row][col] = "-";
            removed--;
        }
    }

    // Convert the puzzle array of arrays to an array of strings
    const formattedPuzzle = puzzle.map(row => row.join(''));

    return formattedPuzzle;
}
