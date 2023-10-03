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



        // Add click event listener to each button
        difficultyButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove selected class from all buttons
                difficultyButtons.forEach(btn => btn.classList.remove('selected'));

                // Add selected class to the clicked button
                this.classList.add('selected');
            });
        });


        // Get the selected difficulty level
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
            this.style.color = "green"; // Set the color to green for correct entries
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












