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















