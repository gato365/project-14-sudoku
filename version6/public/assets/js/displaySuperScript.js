
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


