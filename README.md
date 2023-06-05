# project-14-sudoku
Getting it to work







List of Features:

Generate different boards
Location to record strategies
Mouse highlight row and column ability
Timer
Hide timer ability
Hide strategies ability
How many numbers are needed for each number
Save the data into database
Create Difficulty
Create a scoring mechanism
Create a leaderboard
Make it into an apple app
Create this using react

 [ ] 1. **Location to record strategies**: This can be implemented as a simple text input field where users can jot down their thoughts. You'll need to add a component for this in your React app and wire it up to the state of the app so the strategies are saved.
 [ ] 2. **Hide timer ability**: This involves adding a toggle button that changes the visibility of the timer. This would require some conditional rendering in your React components.
 [ ] 3. **Hide strategies ability**: Similar to the hide timer ability, this would involve adding a button that toggles the visibility of the strategy recording area.
 [ ] 4. **Timer**: This feature requires you to set up an interval that updates the time elapsed since the player started the game. There are many ways to do this in JavaScript, and you can display the timer using a React component.
 [ ] 5. **Mouse highlight row and column ability**: This requires adding event listeners to the Sudoku grid cells in your app. When the mouse hovers over a cell, you would update the CSS of the relevant row and column to highlight them.
 [ ] 6. **How many numbers are needed for each number**: This could involve adding a counter for each number (1-9) that updates as the player fills in the Sudoku grid. This would require both JavaScript to update the counters and React to display them.
 [ ] 7. **Generate different boards**: This might be complex depending on how sophisticated you want the board generation to be. You could use a simple random number generator to fill in a certain number of cells, or you could use a more complex algorithm to generate boards with unique solutions.
 [ ] 8. **Create Difficulty**: This involves creating an algorithm to assess the difficulty of a generated Sudoku board. This might require some research into how Sudoku difficulty is typically assessed. This feature would also include UI changes to allow the user to select a difficulty before starting a game.
 [ ] 9. **Save the data into database**: This requires setting up a backend for your app and integrating it with a database. You'll need to set up an API for your app to interact with, and you'll need to decide on a schema for your data. You might use a technology like Firebase, or set up your own server with Node.js and a database like PostgreSQL.
10. **Create a scoring mechanism**: This could be as simple as timing how long it takes the player to complete the board, or it could involve more complex metrics like how efficiently the player filled in the board. You'll need to decide on the rules for scoring and implement them in your app.
11. **Create a leaderboard**: This involves setting up a system to track multiple players' scores and display them in a leaderboard. This would likely require a backend and database to store the scores, as well as changes to your React app to display the leaderboard.
12. **Make it into an apple app**: This is potentially the most complex task, as it involves learning about iOS development and possibly a whole new set of technologies. You might use a technology like React Native to port your React app to iOS, or you might need to learn Swift and the iOS SDK to build a native app.