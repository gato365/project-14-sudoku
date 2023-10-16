

# **Areas, Variables, and Functionality**

### 1) **Spirit**
#### Blessings
* **Variables**:
  * Text
  * Date

* **Functionality**:
  * Store without evaluation

#### Beliefs:
* **Variables**:
  * Text
  * Date
  * Conviction (1-10)

* **Functionality**:
  * Display past beliefs
  * Measure conviction on beliefs
  * Display mean of all beliefs



### 2) **Intellect**
#### Memory
* **Variables**:
  * Date
  * Percentage Correct
  * Time to Complete
  * Entered Text
  * Number of Errors
  * Group (A, B, C, D, E)
  * Line (1, 2, 3, 4, 5)

* **Functionality**:
  * Display performance on each group/line

#### Sudoku:
* **Variables**:
  * Number of Clues
  * Time to Solve
  * Number of Errors
  * Strategy Used
  * Difficulty Level
  * Date and Time

* **Functionality**:
  * Display correlation between number of clues and time to solve

---

### 3) **Physique**
#### Diet
* **Variables**:
  * Date
  * Time of Day
  * Type of Food
  * Quantity
  * Calories
  * Water Intake
  * Notes

* **Functionality**:
  * Display daily calorie intake
  * Display daily water intake

#### Workout
* **Variables**:
  * Date
  * Exercise
  * Sets
  * Reps
  * Weight
  * Notes

* **Functionality**:
  * Calculate and display power over time

#### Weight
* **Variables**:
  * Date
  * Weight
  * Notes

* **Functionality**:
  * Display weight trend over time

---

### 4) **Wealth**
#### Finances
* **Variables**:
  * Date
  * Description
  * Amount
  * Running Balance
  * Account

* **Functionality**:
  * Categorize expenses
  * Display expenses by category over time

---

### 5) **Drive**
#### Mood
* **Variables**:
  * Date
  * Exact Time of Day
  * General Time of Day (e.g., 4 am, 7:45, 10:45, 12 pm, 3 pm, 6 pm, 8:30 pm)
  * Mood
  * Notes

* **Functionality**:
  * Display mood trend over time or at the current moment 

#### Goals
* **Variables**:
  * Date
  * Exact Time of Day
  * General Time of Day
  * Goal
  * Notes
  * Completion Status
  * Date Completed

* **Functionality**:
  * Display goals over time 
  * Plan and input tasks/goals for weekends
  * Implement a mental system and weekend routine, including choosing relevant projects, allocating weekly time, selecting tasks within projects, and more.




## Future Areas
 - Grocery List
 - Calendar

# **UI Experience**

## **Daily Routine**

### **Morning Routine: Wake Up & Begin Day**
1. **Spiritual & Emotional Start**:
    - Pray to God
    - Kiss Kelley
    - Reflect on Blessings: Enter on website
    - Reflect on Beliefs: Enter on website

2. **Well-being Check**:
    - Look at the clock: Note the time of wake-up on the website
    - Brush Teeth
    - Use Bathroom
    - Stretch
    - Measure and Store Info on Website:
        - Weight
        - Mood: Reflect and enter
        - Goals: Set intentions for the day and enter
    
3. **Brain Boosters**:
    - Memory: Practice & enter progress on the website
    - Sudoku: Complete an easy puzzle on the website

4. **Home & Self-Care**:
    - Clean Kitchen
    - Workout
    - Play the Saxophone

5. **Nourishment**:
    - Eat Food: Track diet and calories on the website

### **Day Progression**:
1. **Work & Breaks**:
    - Do Tasks: Follow your task list
    - Track Mood: Update mood on the website during breaks
    - Play Sudoku (medium or higher during breaks): Enter performance on the website
    - Update and Track Progress of Goals: On the website 

### **Evening Routine: Wind Down & Reflect**:
1. **Family Time**:
    - Spend quality time with family
    - Eat Food: Track diet and calories on the website

2. **Relax & Refresh**:
    - Stretch
    - Enjoy a ride

3. **Reflection & Planning**:
    - Evaluate the Day: Reflect on achievements, challenges, and lessons
    - Plan for Tomorrow: Set intentions, tasks, and reminders

---

## **Weekend Routine**

1. **Reflection**:
    - Evaluate the Past Week: Analyze your achievements, mood trends, and overall progress

2. **Financial Management**:
    - Evaluate Finances: Review and categorize expenses, update balance, and set financial goals

3. **Planning**:
    - Plan for the Upcoming Week: Set tasks, goals, and priorities 

4. **Project Management**:
    - Review Projects: Review and update project status, tasks, and goals
    - Plan for Projects: Set tasks, goals, and priorities




# **MERN MVP Development Plan**

### 1. **Environment Setup**

- **MongoDB**: Set up MongoDB on your local machine. Initialize a database for your project.
  
- **Express**: Install Express.js using the npm package manager. Set up basic routing for your application.
  
- **React**: Use Create React App (CRA) to bootstrap your React application. This will provide a solid starting point and handle a lot of the build configuration for you.
  
- **Node.js**: Ensure Node.js is installed on your local machine. Create a basic server setup using Express.

### 2. **Backend Development**

- **Models**: Create MongoDB schemas and models for each of the areas: Spirit, Intellect, Physique, Wealth, and Drive. Use the given variables for each section.
  
- **API Routes**: Implement CRUD (Create, Read, Update, Delete) operations for each of the models.
  
- **Authentication**: Implement user authentication. This can be done using packages like `passport` or `jsonwebtoken`. This will allow users to securely store and retrieve their information.

### 3. **Frontend Development**

- **Components**: Develop individual React components for each section. This should include forms for data entry, displays for showing saved data, and charts/graphs for displaying trends.

- **State Management**: Consider using React's context API or Redux to manage global state, especially for user authentication.

- **Integration**: Connect the frontend to the backend using API calls. You can use the `axios` library to make these requests.

### 4. **UI/UX Design**

- **Layout**: Design a responsive layout that works on both desktop and mobile. Use frameworks like Bootstrap or Material-UI to assist.
  
- **Navigation**: Implement a clear navigation system to allow users to easily switch between different sections of the application.

- **Feedback**: Provide feedback to users when they input data, such as success and error messages.

### 5. **Testing**

- **Backend Testing**: Use a testing framework like Mocha or Jest to write unit tests for your API routes.
  
- **Frontend Testing**: Write tests for your React components. Jest, combined with a tool like React Testing Library, can be used here.

### 6. **Deployment with Dokku**

- **Dokku Setup**: Install Dokku on your server. Ensure you have a domain or subdomain pointing to your server.
  
- **MongoDB Plugin**: Install the MongoDB plugin for Dokku to handle the MongoDB setup on the server.
  
- **Deployment**: Push your application to your Dokku server. This will create a new container for your application and handle the necessary setup.

- **Database Migration**: Ensure that any data from your development MongoDB instance is migrated to your production instance.

### 7. **Post-launch**

- **Monitoring**: Monitor server performance, uptime, and potential errors. This can be achieved with tools like New Relic or Loggly.
  
- **Feedback Loop**: Have a method for users to provide feedback about bugs or potential improvements.

- **Iterate**: Based on user feedback and observed usage, continue to iterate on your MVP, adding enhancements and fixing any bugs.


