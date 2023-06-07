
var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]



window.onload = function () {
    // Restore board and errors from local storage
    let savedBoard = localStorage.getItem('board');
    let savedErrors = localStorage.getItem('errors');

    if (savedBoard && savedErrors) {
        board = JSON.parse(savedBoard);
        errors = parseInt(savedErrors);
    }

    // Call setGame() to initialize the board
    setGame();

    // Adding highlight event listeners after cells are created
    let cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.addEventListener('mouseenter', highlight);
        cell.addEventListener('mouseleave', removeHighlight);
    });
};

function countDigits(board) {
    // Initialize counters for digits 1-9
    let counters = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};

    // Iterate through the board
    for (let row of board) {
        for (let digit of row) {
            if (digit !== '-') {
                counters[digit]++;
            }
        }
    }

    return counters;
}




function setGame() {
      // Digits 1-9
      for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.classList.add("selection-number");

        let digit = document.createElement("span");
        digit.innerText = i;
        number.appendChild(digit);

        // Count how many of this number is needed
        let countNeeded = 9 * 9 - [...board.join('')].filter(x => x == i).length;
        let count = document.createElement("span");
        count.innerText = countNeeded;
        count.classList.add("count");
        number.appendChild(count);

        // Attach click event listener
        number.addEventListener("click", selectNumber);

        document.getElementById("digits").appendChild(number);
        number.id = "";
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
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
            tile.id = 'cell-' + r.toString() + "-" + c.toString();
        }
    }
}

function selectNumber() {
    let selectedNumber = parseInt(this.innerText);

    if (isNaN(selectedNumber)) {
        return;
    }

    if (numSelected !== null) {
        let previousSelected = document.getElementById(numSelected);
        previousSelected.classList.remove("number-selected");
    }

    numSelected = selectedNumber;
    this.classList.add("number-selected");
}

function updateNumberCount(num) {
    // Get the number divs
    let numberDivs = document.querySelectorAll(".selection-number");

    for (let div of numberDivs) {
        // Get the number from the first child (the digit span)
        let digit = div.firstElementChild.innerText;

        // If this is the div for the number we're looking for
        if (digit === num) {
            // Get the count span
            let countSpan = div.querySelector('.count');

            // Decrease the count
            let currentCount = parseInt(countSpan.innerText);
            countSpan.innerText = currentCount - 1;

            // If count is zero, disable the number
            if (currentCount - 1 == 0) {
                div.classList.add('disabled');
            }

            // No need to check other divs
            break;
        }
    }
}


function selectTile() {
    if (numSelected == null) {
        return;
    }

    if (this.innerText != "") {
        return;
    }

    // "cell-0-0" "cell-0-1" .. "cell-3-1"
    let coords = this.id.split("-").slice(1); //["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (r < 0 || r >= solution.length || c < 0 || c >= solution[r].length) {
        console.error(`Invalid coordinates: (${r}, ${c})`);
        return;
    }

    if (solution[r][c] == numSelected) {
        this.innerText = numSelected;
        board[r] = board[r].substr(0, c) + numSelected.toString() + board[r].substr(c + 1);
        updateNumberCount(numSelected);
    }
    else {
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
}



function startGame() {
    // Clear errors
    errors = 0;
    document.getElementById('errors').textContent = '0';

    // Reset board
    let boardElement = document.getElementById("board");
    boardElement.innerHTML = '';  // Clear board
    let digitsElement = document.getElementById("digits");
    digitsElement.innerHTML = ''; // Clear digits

    // Save board and errors to local storage
    localStorage.setItem('board', JSON.stringify(board));
    localStorage.setItem('errors', errors);
    // Reset timer
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateTimer();

    // Reset strategy
    document.getElementById('strategy').value = '';

    // Hide strategies
    document.getElementById('strategies-container').innerHTML = '';
}



document.getElementById('strategy-form').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent the form from being submitted in the traditional way

    // Get the strategy from the textarea
    let strategy = document.getElementById('strategy').value;

    // Only save strategy if the textarea is not empty
    if (strategy.trim() !== '') {
        console.log(strategy);  // This will print the strategy to the console

        // Here, you would add the code to send the strategy to your database

        // Get the date and time
        let date = new Date();
        let key = "sudoku-strategy:" + date.toLocaleString();

        // Save strategy into local storage with date and time
        localStorage.setItem(key, strategy);
    } else {
        console.log('No strategy entered');  // You can handle this case as you wish
    }
});


document.getElementById('display-strategies').addEventListener('click', function () {



    // Get the div where the strategies will be displayed
    let strategiesContainer = document.getElementById('strategies-container');

    // Clear the container
    strategiesContainer.innerHTML = "";

    // Get all strategies from local storage
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("sudoku-strategy:")) {
            let strategy = localStorage.getItem(key);

            // Create a new paragraph for each strategy and append it to the container
            let p = document.createElement('p');
            p.textContent = `${key}: ${strategy}`;
            strategiesContainer.appendChild(p);
        }
    }

    // If no strategies are found, display a message
    if (localStorage.length === 0) {
        strategiesContainer.textContent = "No strategies found.";
    }
});


// Timer information
let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;

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

var timerVisible = true;

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



// Add an event listener to the start button
document.getElementById('start-button').addEventListener('click', function () {
    // Start the game and the timer
    startGame();
    startTimer();

    // Reinitialize the game
    setGame()


    // Reattach the highlighting event listeners to the new cells
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', highlight);
        cell.addEventListener('mouseleave', removeHighlight);
    });

    // Show the board and digits by setting display to flex
    document.getElementById('board').style.display = 'flex';
    document.getElementById('board').style.flexWrap = 'wrap';
    document.getElementById('digits').style.display = 'flex';
    document.getElementById('digits').style.flexWrap = 'wrap';



    // Hide the start button
    this.style.display = 'none';

    // Show Hide Timer button
    document.getElementById('hide-timer-button').style.display = 'block';



    // Unhide Strategy Form
    document.getElementById('strategy-form').style.display = 'block';

    // Show Hide Strategies button
    document.getElementById('hide-strategy-button').style.display = 'block';

});




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


function removeHighlight() {
    let highlightedCells = document.querySelectorAll('.highlighted');

    highlightedCells.forEach(cell => {
        cell.classList.remove('highlighted');
    });
}



