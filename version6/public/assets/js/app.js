// Timer information
let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
var timerVisible = true;
let selectedDifficulty = 'easy';  // default difficulty
var solution;
let numSelected = null;


let errors = 0;
let board;
let clues

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onload = function () {


    // Initially hide the game
    hideGame();

    // Add event listener to the start button
    document.getElementById('startGame').addEventListener('click', function () {


        const difficultyButtons = document.querySelectorAll('.difficulty');
        let selectedDifficulty = null;

        for (let button of difficultyButtons) {
            if (button.classList.contains('selected')) {  // Assuming the selected button has a class 'selected'
                selectedDifficulty = button.getAttribute('data-level');
                break;
            }
        }

        if (!selectedDifficulty) {
            alert("Please select a difficulty level before starting.");
            return;
        }

        // Generate a new Sudoku board
        solution = generateSolution();
        // Generate a Sudoku puzzle from a solution based on the selected difficulty
      
    
        switch (selectedDifficulty) {
            case 'easy':
                clues = getRandomInt(30, 40); // Let's assume 75 to 80 for easy
                break;
            case 'medium':
                clues = getRandomInt(26, 29); // 26 to 29 for medium
                break;
            case 'hard':
                clues = getRandomInt(21, 24); // 21 to 24 for hard
                break;
            case 'expert':
                clues = getRandomInt(17, 20); // 17 to 20 for expert
                break;
        }
        
        board = generatePuzzle(solution, clues);
        console.log('Selected difficulty:', selectedDifficulty);
        console.log('Generated puzzle:', board);
        // I want to display the selected diffculty level using the id 'difficulty-level' based on the button clicked difficulty

        document.getElementById('difficulty-level').textContent = selectedDifficulty;





        // Hide menu and show game
        document.getElementById('menu').style.display = 'none';


        startTimer();
        setGame();
        showGame();


        // Reattach the highlighting event listeners to the new cells
        let cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('mouseenter', highlight);
            cell.addEventListener('mouseleave', removeHighlight);
        });
    });

    // For now, the difficulty buttons do nothing. Later, you can add event listeners to them.
}

////////////////////////////////////////
// The Structure of the Sudoku Board
////////////////////////////////////////

// 9x9 grid and each cell can contain a number from 1-9
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




}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}


function isBoardComplete() {
    for (let row of board) {
        if (row.includes("-")) {
            return false;  // Found an empty cell
        }
    }
    return true;
}

// Replace a character at a specific index in a string
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

    // For demonstration purposes, saving game data on each tile click
    // Ideally, you should save this only once the game is finished
    if (isBoardComplete()) {
        const gameData = prepareGameData();
        saveToLocalStorage(gameData);
        saveToDatabase(gameData);
        clearInterval(timer);  // Stop the timer when the board is complete
        displayGameStats(); // Display the game statistics
    }
}


////////////////////////////////////////
// Timer Related Functions
////////////////////////////////////////
// Update the timer div with the current time

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
// Saving Game Data functions
////////////////////////////////////////

// Prepare the game data to be saved
function prepareGameData() {
    const timeTaken = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    const currentDate = new Date().toLocaleString(); // Current date and time
    const gameData = {
        level: selectedDifficulty,
        timeTaken: timeTaken,
        errors: errors,
        strategies: 'd',
        dateTime: currentDate,
        numberOfClues: clues

    };
    return gameData;
}

// Save the game data to local storage
function saveToLocalStorage(data) {
    const savedGames = JSON.parse(localStorage.getItem('sudokuGames')) || [];
    savedGames.push(data);
    localStorage.setItem('sudokuGames', JSON.stringify(savedGames));
}



function displayGameStats() {
    // Assuming the difficulty and time are globally available
    document.getElementById('stats-difficulty').textContent = selectedDifficulty;
    document.getElementById('stats-time').textContent = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    document.getElementById('stats-errors').textContent = errors;

    // Display the game stats div
    document.getElementById('gameStats').style.display = 'block';
    document.getElementById('board').style.display = 'none';
    document.getElementById('digits').style.display = 'none';
    document.getElementById('strategy-form').style.display = 'none';
}



async function saveToDatabase(data) {
    try {


        const response = await fetch('/api/gameRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log("Received content-type:", response.headers.get('content-type'));

        if (response.headers.get('content-type').includes('application/json')) {
            const result = await response.json();
            if (response.status === 200) {
                console.log(result.message);
            } else {
                console.error("Error saving game:", result.message);
            }
        } else {
            console.error("Unexpected response:", await response.text());
        }


    } catch (error) {
        console.error("There was an error saving the game:", error);
    }
}

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
// Generates menu functionality functions
////////////////////////////////////////

function hideGame() {
    // Assuming your game container has an ID of 'board'
    document.getElementById('game').style.display = 'none';
}

function showGame() {
    // Assuming your game container has an ID of 'board'
    document.getElementById('game').style.display = 'block';
}

////////////////////////////////////////
// Difficulty Buttons function
////////////////////////////////////////

// Attach event listener to difficulty buttons
const difficultyButtons = document.querySelectorAll('.difficulty');
for (let button of difficultyButtons) {
    button.addEventListener('click', function (e) {
        // Get the difficulty level from the clicked button's data attribute
        selectedDifficulty = e.target.getAttribute('data-level');

        // Optionally: Add some visual feedback to show which difficulty is selected.
        difficultyButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
}








////////////////////////////////////////
// Get Information from database functions
////////////////////////////////////////

// Display the scores on the frontend
document.getElementById('scoreboardButton').addEventListener('click', async () => {
    try {
        const scoreTable = document.getElementById('scoresTable');
        const button = document.getElementById('scoreboardButton');

        console.log("Button CLicked");
        if (scoreTable.style.display === 'block') {
            // If the scoreboard is currently shown, hide it and change the button text
            scoreTable.style.display = 'none';
            button.textContent = 'View Scoreboard';
        } else {
            // If the scoreboard is hidden, show it, fetch the scores, and change the button text
            scoreTable.style.display = 'block';
            const response = await fetch('/api/gameRecord');
            const data = await response.json();
            displayScores(data.scores); // Function to display the scores on the frontend
            button.textContent = 'Hide Scoreboard';
        } 
    } catch (error) {
        console.error("Error fetching scores:", error);
    }
});




// Display the scores on the frontend

function displayScores(scores) {

    // Create a table
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create and append headers to the table
    const headers = ['Date', 'Level', 'Time', 'Errors', 'Strategies','Number of Clues'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Loop through scores and populate the table body
    scores.forEach(score => {
        const row = document.createElement('tr');

        // Extract and format the date from the dateTime
        
        const dateObj = new Date(score.dateTime);
        const date = dateObj.toString() !== "Invalid Date" ? dateObj.toLocaleDateString() : "Unknown Date";

        console.log("date", score.dateTime);

        [date, score.level, score.timeTaken, score.errors, score.strategies, score.numberOfClues].forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Append the table to a container in your HTML or replace an existing table
    const container = document.getElementById('scoresContainer');
    // Clear any previous content in the container
    container.innerHTML = '';
    container.appendChild(table);
}





////////////////////////////////////////
// Plot the data functions
////////////////////////////////////////
// Assuming data is an array of game records like you provided
const cluesData = data.map(record => record.level === 'easy' ? 80 : 
                                 record.level === 'medium' ? 29 :
                                 record.level === 'hard' ? 24 : 20);

const timeData = data.map(record => {
    const timeParts = record.timeTaken.split(':');
    // Convert time to seconds for a continuous scale
    return parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10);
});

const ctx = document.getElementById('cluesVsTimeChart').getContext('2d');

new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Clues vs Time',
            data: cluesData.map((clue, index) => ({ x: clue, y: timeData[index] })),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Clues'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Time (in seconds)'
                }
            }
        }
    }
});
