// Timer information
let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
var timerVisible = true;

let numSelected = null;


let errors = 0;

const board = [
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


window.onload = function() {
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
            tile.classList.add("tile", "cell");
            document.getElementById("board").append(tile);
            tile.id = 'cell-' + r.toString() + "-" + c.toString();
        }
    }

}

function selectNumber(){
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



// Timer Related Functions
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


// Highlighting Capabilities
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


