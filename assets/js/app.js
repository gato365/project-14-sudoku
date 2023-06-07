
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
};


function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
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
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
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

    // Is this line needeed?
    
    // setGame(); // Reinitialize game
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

    let strategy = document.getElementById('strategy').value;
    console.log(strategy);  // This will print the strategy to the console

    // Here, you would add the code to send the strategy to your database


    // get the date and time
    let date = new Date();
    let key = "sudoku-strategy:" + date.toLocaleString();
    localStorage.setItem(key, strategy);
    // save strategy into local storage with date and time
    localStorage.setItem(key, strategy);


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

    if(timerVisible){
        // if timer is visible, hide it and change button text to 'Show Timer'
        timerDiv.style.display = 'none';
        this.textContent = 'Show Timer';
        timerVisible = false;
    }else{
        // if timer is hidden, show it and change button text back to 'Hide Timer'
        timerDiv.style.display = 'block';
        this.textContent = 'Hide Timer';
        timerVisible = true;
    }
});


// Add an event listener to the start button
document.getElementById('start-button').addEventListener('click', function () {
    // Start the game and the timer
    startGame();
    startTimer();

    // Hide the start button
    this.style.display = 'none';

    // Show Hide Timer button
    document.getElementById('hide-timer-button').style.display = 'block';

    // Reinitialize the game
    setGame()

    // Unhide Strategy Form
    document.getElementById('strategy-form').style.display = 'block';
});
