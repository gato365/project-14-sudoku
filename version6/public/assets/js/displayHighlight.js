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

