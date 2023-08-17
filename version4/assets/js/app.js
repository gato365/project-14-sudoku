// Timer information
let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
var timerVisible = true;

let numSelected = null;


let errors = 0;

let board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

const solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];


window.onload = function () {
    startTimer();
    setGame();

    // Reattach the highlighting event listeners to the new cells
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', highlight);
        cell.addEventListener('mouseleave', removeHighlight);
    });
}

function setGame() {
    const counts = getNumberCounts(board);

    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerHTML = '<p>' + i + '<sup>' + (9 - counts[i]) + '</sup>' + '<p>'; // display count as superscript
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = 'cell-' + r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile", "cell");
            document.getElementById("board").append(tile);
        }
    }


    setInitialCounts();


    // Generate a new Sudoku board
    // Example usage
    const solutionBoard = generateSolution();
    const easyPuzzle = generatePuzzle(solutionBoard, 35);    // 35 clues for Easy difficulty
    const mediumPuzzle = generatePuzzle(solutionBoard, 29);  // 29 clues for Medium difficulty
    const hardPuzzle = generatePuzzle(solutionBoard, 24);    // 24 clues for Hard difficulty
    const expertPuzzle = generatePuzzle(solutionBoard, 20);  // 20 clues for Expert difficulty

    console.log('Solution:', solution);
    console.log('Easy Puzzle:', easyPuzzle);
    console.log('Medium Puzzle:', mediumPuzzle);
    console.log('Hard Puzzle:', hardPuzzle);
    console.log('Expert Puzzle:', expertPuzzle);

}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}




// Timer Related Functions
// Update the timer div with the current time

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[1]);
        let c = parseInt(coords[2]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            board[r] = replaceAt(board[r], c, numSelected.id); // Update the board
            updateNumberCount(numSelected.id); // Decrease the count and update display
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
    setInitialCounts();
}





function updateTimer() {
    let timerDiv = document.getElementById('timer');
    timerDiv.textContent = (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
}
// Start the timer
function startTimer() {
    timer = setInterval(function () {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
        updateTimer();
    }, 1000);
}


////////////////////////////////////////
// Create Hide Timer button functions
////////////////////////////////////////

// Create Hide Timer button
document.getElementById('hide-timer-button').addEventListener('click', function () {
    var timerDiv = document.getElementById('timer');

    if (timerVisible) {
        // if timer is visible, hide it and change button text to 'Show Timer'
        timerDiv.style.display = 'none';
        this.textContent = 'Show Timer';
        timerVisible = false;
    } else {
        // if timer is hidden, show it and change button text back to 'Hide Timer'
        timerDiv.style.display = 'block';
        this.textContent = 'Hide Timer';
        timerVisible = true;
    }
});


// Create Hide Strategies button
document.getElementById('hide-strategy-button').addEventListener('click', function () {

    // Get the div where the strategies will be displayed
    let strategiesContainer = document.getElementById('strategy-form');

    if (strategiesContainer.style.display === 'none') {
        // if strategies are hidden, show them and change button text to 'Hide Strategies'
        strategiesContainer.style.display = 'block';
        this.textContent = 'Hide Strategies';
    } else {
        // if strategies are visible, hide them and change button text back to 'Show Strategies'
        strategiesContainer.style.display = 'none';
        this.textContent = 'Show Strategies';
    }


});

////////////////////////////////////////
// Highlighting Capabilities functions
////////////////////////////////////////
// Add Highlighting to the board
function highlight(event) {
    let cell = event.target;

    // Assuming that your cells have id's like 'cell-0-0', 'cell-0-1', etc.
    let [row, col] = cell.id.split('-').slice(1).map(Number);

    for (let i = 0; i < 9; i++) {
        // Highlight the row
        let rowCell = document.getElementById(`cell-${row}-${i}`);
        rowCell.classList.add('highlighted');

        // Highlight the column
        let colCell = document.getElementById(`cell-${i}-${col}`);
        colCell.classList.add('highlighted');
    }
}

// Remove Highlighting from the board
function removeHighlight() {
    let highlightedCells = document.querySelectorAll('.highlighted');

    highlightedCells.forEach(cell => {
        cell.classList.remove('highlighted');
    });
}



////////////////////////////////////////
// Add dynamic superscript based on the number of remaining digits functions
////////////////////////////////////////

// Replace a character at a specific index in a string
function replaceAt(string, index, replacement) {
    return string.substr(0, index) + replacement + string.substr(index + 1);
}

// Set the initial counts for each number
function setInitialCounts() {
    const counts = getNumberCounts(board);
    for (let i = 1; i <= 9; i++) {
        const remaining = 9 - counts[i];
        updateNumberDisplay(i, remaining);
    }
}


// Update the number count for a specific number
function updateNumberCount(number) {
    console.log("updateNumberCount called with:", number);
    const counts = getNumberCounts(board);
    const newCount = counts[number] + 1;
    const remaining = 9 - newCount;

    console.log("New count and remaining for number:", number, newCount, remaining);
    updateNumberDisplay(number, remaining);
}

// Update the number display for a specific number
function updateNumberDisplay(number, remaining) {
    const numberElement = document.getElementById(number.toString());
    if (numberElement) {
        const superscript = numberElement.querySelector('sup');
        if (superscript) {
            superscript.textContent = remaining;
        } else {
            const newSuperscript = document.createElement('sup');
            newSuperscript.textContent = remaining;
            numberElement.querySelector('p').appendChild(newSuperscript);
        }
    }
}

// Get the number counts for each number
function getNumberCounts(board) {
    const counts = {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
    };

    for (let row of board) {
        for (let char of row) {
            if (char !== "-") {
                counts[char]++;
            }
        }
    }

    return counts;
}


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

    return puzzle;
}



