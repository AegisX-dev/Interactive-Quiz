// Question Bank
const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Which animal is known as man's best friend?",
        options: ["Cat", "Dog", "Horse", "Rabbit"],
        answer: "Dog"
    },
    {
        question: "What color is the sky on a clear day?",
        options: ["Green", "Red", "Blue", "Yellow"],
        answer: "Blue"
    }
];

// State Variables
let currentQuestionIndex = 0;
let timeLeft = 60; // 60 seconds for the quiz
let timerId = null;
const totalTime = 60; // Store total time for progress calculation
let answers = Array(questions.length).fill(null); // Array to store user answers

// Populate Quiz (show one question at a time)
function loadQuestion(index) {
    const questionsDiv = document.getElementById("questions");
    questionsDiv.innerHTML = ""; // Clear previous content
    
    if (questions.length === 0) {
        questionsDiv.innerHTML = "<p>No questions available!</p>";
        document.getElementById("submit-btn").disabled = true;
        return;
    }

    // Load the current question
    const q = questions[index];
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    
    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);
    
    q.options.forEach(option => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `question${index}`;
        radio.value = option;
        radio.id = `q${index}_${option}`;
        
        // Restore selected answer from the answers array
        if (answers[index] === option) {
            radio.checked = true;
        }
        
        // Update answers array when a new option is selected
        radio.addEventListener("change", () => {
            answers[index] = option;
            console.log("Current answers:", answers); // Debug
        });
        
        const optionText = document.createElement("span");
        optionText.textContent = option;
        optionText.setAttribute("for", `q${index}_${option}`);
        
        label.appendChild(radio);
        label.appendChild(optionText);
        questionDiv.appendChild(label);
    });
    
    questionsDiv.appendChild(questionDiv);

    // Update navigation buttons
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");
    
    prevBtn.disabled = index === 0; // Disable "Previous" on first question
    if (index === questions.length - 1) {
        // On the last question, hide "Next" and show "Submit"
        nextBtn.classList.add("hidden");
        submitBtn.classList.remove("hidden");
    } else {
        // Otherwise, show "Next" and hide "Submit"
        nextBtn.classList.remove("hidden");
        submitBtn.classList.add("hidden");
    }
}

// Start Timer
function startTimer() {
    const timerDiv = document.getElementById("timer");
    const progressBar = document.createElement("div");
    progressBar.classList.add("timer-progress-bar");
    document.getElementById("timer-progress").appendChild(progressBar);
    
    timerDiv.textContent = `Time Left: ${timeLeft}s`;
    
    timerId = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = `Time Left: ${timeLeft}s`;
        
        // Update progress bar
        const progressPercentage = (timeLeft / totalTime) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Add warning class when time is low
        if (timeLeft <= 10) {
            timerDiv.classList.add("warning");
        }
        
        // Auto-submit when time runs out
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerDiv.textContent = "Time's up!";
            document.getElementById("quiz-form").dispatchEvent(new Event("submit"));
        }
    }, 1000);
}

// Stop Timer
function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        document.getElementById("timer").textContent = "Quiz submitted!";
        document.getElementById("timer-progress").innerHTML = "";
    }
}

// Start Quiz
document.getElementById("start-btn").addEventListener("click", () => {
    // Show quiz content
    document.getElementById("quiz-content").classList.remove("hidden");
    // Hide start button
    const startBtn = document.getElementById("start-btn");
    startBtn.classList.add("hidden");
    console.log("Start button hidden:", startBtn.classList.contains("hidden"));
    // Load the first question
    loadQuestion(currentQuestionIndex);
    // Start the timer
    startTimer();
});

// Navigation: Previous Question
document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

// Navigation: Next Question
document.getElementById("next-btn").addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

// Handle Submission
document.getElementById("quiz-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Stop the timer on submission
    stopTimer();
    
    let score = 0;
    let unanswered = 0;
    
    questions.forEach((q, index) => {
        const selectedOption = answers[index]; // Use stored answer
        if (selectedOption) {
            if (selectedOption === q.answer) {
                score++;
            }
        } else {
            unanswered++;
        }
    });
    
    // Hide quiz content and show score screen
    document.getElementById("quiz-content").classList.add("hidden");
    const scoreScreen = document.getElementById("score-screen");
    scoreScreen.classList.remove("hidden");
    
    // Update circular scoreboard
    const scorePercentage = (score / questions.length) * 100;
    const circleProgress = document.querySelector(".circle-progress");
    
    // Ensure the ring starts at 0%
    circleProgress.style.background = `conic-gradient(#00c4b4 0% 0%, rgba(255, 255, 255, 0.2) 0% 100%)`;
    
    // Animate the ring to the final percentage
    setTimeout(() => {
        circleProgress.style.background = `conic-gradient(#00c4b4 0% ${scorePercentage}%, rgba(255, 255, 255, 0.2) ${scorePercentage}% 100%)`;
    }, 100); // Small delay to ensure the transition is visible
    
    // Update score text in the center
    const scoreText = document.getElementById("score-text");
    scoreText.textContent = `${score}/${questions.length}`;
    
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `You scored ${score} out of ${questions.length} questions correctly!`;
    
    // Add high-score class for scores of 4 or higher
    if (score >= 4) {
        resultDiv.classList.add("high-score");
    }
    
    if (unanswered > 0) {
        resultDiv.innerHTML += `<p class="warning">You left ${unanswered} question(s) unanswered.</p>`;
    }
});

// Reset Quiz
document.getElementById("reset-btn").addEventListener("click", () => {
    timeLeft = 60; // Reset timer
    currentQuestionIndex = 0; // Reset question index
    answers = Array(questions.length).fill(null); // Reset answers
    document.getElementById("timer").classList.remove("warning"); // Reset timer style
    document.getElementById("timer-progress").innerHTML = ""; // Clear progress bar
    loadQuestion(currentQuestionIndex);
    // Hide score screen and show start button
    document.getElementById("score-screen").classList.add("hidden");
    document.getElementById("quiz-content").classList.add("hidden");
    const startBtn = document.getElementById("start-btn");
    startBtn.classList.remove("hidden");
    console.log("Start button shown:", !startBtn.classList.contains("hidden"));
});

// Initial Load (questions are loaded but hidden)
loadQuestion(currentQuestionIndex);