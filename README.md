# Interactive Quiz Application

This project is an interactive general knowledge quiz built using HTML, CSS, and JavaScript. It features a user-friendly interface with a timer, question navigation, and a circular progress scoreboard to display the final score. The quiz is styled with a modern, glassmorphism-inspired design and includes animations for a polished user experience.

# Features

Question Bank: A set of 5 general knowledge questions with multiple-choice options.

Timer: A 60-second countdown timer with a progress bar that turns red when 10 seconds remain.

Navigation: "Previous" and "Next" buttons to navigate through questions.

Answer Tracking: Stores user answers and allows revisiting questions to change selections.

Score Display: A circular progress ring showing the score percentage, with a high-score effect for 4+ correct answers.

Responsive Design: Optimized for both desktop and mobile devices.

Animations: Smooth transitions and hover effects for an engaging experience.

# Files

index.html: The main HTML structure for the quiz interface.

styles.css: Contains all styling, including glassmorphism effects, animations, and responsive design.

script.js: Handles the quiz logic, including question loading, timer, navigation, and score calculation.

# Setup and Usage

Clone or Download: Clone this repository or download the files.

Open the Application:
Ensure all files (index.html, styles.css, script.js) are in the same directory.

Open index.html in a web browser.


Start the Quiz:
Click the "Start Quiz" button to begin.
Answer questions by selecting radio buttons.
Navigate using "Previous" and "Next" buttons.
Submit answers manually or wait for the timer to run out.


View Results: After submission, view your score on the circular scoreboard.

Try Again: Click "Try Again" to reset and restart the quiz.

# Dependencies

Google Fonts: Uses the "Poppins" font, loaded via a CDN in index.html.
No other external dependencies are required.

# Customization

Add Questions: Modify the questions array in script.js to add or change questions, options, or answers.

Adjust Timer: Change the timeLeft and totalTime variables in script.js to adjust the quiz duration.

Styling: Edit styles.css to customize colors, fonts, or animations.

High-Score Threshold: Adjust the score threshold for the .high-score class in script.js (currently set to 4).

# Notes

The quiz auto-submits when the timer reaches zero.
Unanswered questions are tracked and displayed in the results.
The application is fully client-side and does not require a server.

# Future Improvements

Add more question types (e.g., true/false, text input).
Implement local storage to save high scores.
Add difficulty levels or categories for questions.
Include sound effects for timer warnings or correct/incorrect answers.

