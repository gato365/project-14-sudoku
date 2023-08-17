I want display the number of spaces a number has left on the board dynamically. The issue is the board is not changing but object within the html is changing.

Here is the code that assumes the board is changing but it is held const. 
```
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
           updateNumberCount(numSelected.id); // Decrease the count and update display
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
    setInitialCounts();
}



function getNumberCount() {
    let counts = Array(10).fill(0); // Indexes 0 to 9 (0 won't be used)
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const value = board[r][c];
            if (value !== "-") {
                counts[parseInt(value)]++;
            }
        }
    }
    return counts;
}

function setInitialCounts() {
    const counts = getNumberCount();
    for (let i = 1; i <= 9; i++) {
        const remaining = 9 - counts[i];
        updateNumberDisplay(i, remaining);
    }
}

function updateNumberCount(number) {
    const counts = getNumberCount();
    const newCount = counts[number] + 1;
    const remaining = 9 - newCount;
    updateNumberDisplay(number, remaining);
}

function updateNumberDisplay(number, remaining) {
    const numberElement = document.getElementById(number.toString());
    if (numberElement) {
        const superscript = numberElement.querySelector('.superscript');
        if (superscript) {
            superscript.textContent = remaining;
        } else {
            const newSuperscript = document.createElement('sup');
            newSuperscript.className = 'superscript';
            newSuperscript.textContent = remaining;
            numberElement.appendChild(newSuperscript);
        }
    }
}


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


```