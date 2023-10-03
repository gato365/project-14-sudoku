////////////////////////////////////////
// Get Information from database functions
////////////////////////////////////////

// Display the scores on the frontend
document.getElementById('scoreboardButton').addEventListener('click', async () => {
    try {
        const scoreTable = document.getElementById('scoresTable'); 
        const button = document.getElementById('scoreboardButton');

        console.log("Button CLicked");
        if (scoreTable.style.display === 'block') {
            // If the scoreboard is currently shown, hide it and change the button text
            scoreTable.style.display = 'none';
            button.textContent = 'View Scoreboard';
        } else {
            // If the scoreboard is hidden, show it, fetch the scores, and change the button text
            scoreTable.style.display = 'block';
            const response = await fetch('/api/gameRecord');
            const data = await response.json();
            displayScores(data.scores); // Function to display the scores on the frontend
            button.textContent = 'Hide Scoreboard';
        }
    } catch (error) {
        console.error("Error fetching scores:", error);
    }
});


// Display the scores on the frontend and render the scatter plot
function displayScores(scores) {

    // Create a table
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create and append headers to the table
    const headers = ['Date', 'Level', 'Time', 'Errors', 'Strategies', 'Number of Clues'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Loop through scores and populate the table body
    scores.forEach(score => {
        const row = document.createElement('tr');

        // Extract and format the date from the dateTime

        const dateObj = new Date(score.dateTime);
        const date = dateObj.toString() !== "Invalid Date" ? dateObj.toLocaleDateString() : "Unknown Date";

        console.log("date", score.dateTime);

        [date, score.level, score.timeTaken, score.errors, score.strategies, score.numberOfClues].forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Append the table to a container in your HTML or replace an existing table
    const container = document.getElementById('scoresContainer');
    // Clear any previous content in the container
    container.innerHTML = '';
    container.appendChild(table);




    // Render the scatter plot 
    // Extract clues and time data from scores for the scatter plot
    const cluesData = scores.map(score => score.numberOfClues);
    const timeData = scores.map(score => {
        const timeParts = score.timeTaken.split(':');
        return parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10);  // Convert MM:SS to seconds
    });

    // Render the scatter plot
    const ctx = document.getElementById('cluesVsTimeChart').getContext('2d');
  new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Clues vs Time',
            data: cluesData.map((clue, index) => ({ x: clue, y: timeData[index] })),
            fontSize: 40,
            backgroundColor: 'black',   // Making the point color black
            borderColor: 'black',       // Making the border color of the point black
            borderWidth: 1,
            pointRadius: 5              // Increase point size
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Scatter Plot of Clues vs Time',
            fontSize: 40,               // Increase title size
            padding: 20,                // Some padding to make it look nicer
            align: 'center'             // Ensure the title is centered
        },
        tooltips: {
            callbacks: {
                title: function(tooltipItem, data) {
                    // Custom title for tooltip on hover
                    return `Point (${tooltipItem[0].xLabel}, ${tooltipItem[0].yLabel})`;
                },
                label: function(tooltipItem, data) {
                    // Here you can customize the tooltip stats further if needed
                    return `${tooltipItem.xLabel} Clues, ${tooltipItem.yLabel} seconds`;
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Clues',
                    fontSize: 30,          // Adjust x-axis title size
                    align: 'center'        // Center the x-axis title
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Time (in seconds)',
                    fontSize: 30,          // Adjust y-axis title size
                    align: 'center'        // Center the y-axis title
                }
            }
        }
    }
});


}


