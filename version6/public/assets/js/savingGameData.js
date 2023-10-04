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

