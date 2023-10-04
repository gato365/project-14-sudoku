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

