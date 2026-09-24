let maxNumber = 50;
let secretNumber;
let attempts = 0;
let score = 100;
let hints = 3;
let gameOver = false;
let previousGuesses = [];

// Elements

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const hintBtn = document.getElementById("hintBtn");
const restartBtn = document.getElementById("restartBtn");

const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const attemptsDisplay = document.getElementById("attempts");
const hintsDisplay = document.getElementById("hints");

const maxNumberDisplay = document.getElementById("maxNumber");
const previousGuessesDisplay =
    document.getElementById("previousGuesses");

const difficultyButtons =
    document.querySelectorAll(".difficulty-btn");


// Start Game

function startGame() {

    secretNumber = Math.floor(Math.random() * maxNumber) + 1;

    attempts = 0;
    score = 100;
    hints = 3;
    previousGuesses = [];
    gameOver = false;

    guessInput.value = "";
    guessInput.disabled = false;
    guessBtn.disabled = false;
    hintBtn.disabled = false;

    message.textContent = "Make your first guess! 🚀";
    message.className = "message";

    updateStats();
    updatePreviousGuesses();

    guessInput.focus();
}


// Update Stats

function updateStats() {

    scoreDisplay.textContent = score;
    attemptsDisplay.textContent = attempts;
    hintsDisplay.textContent = hints;
}


// Check Guess

function checkGuess() {

    if (gameOver) return;

    const guess = Number(guessInput.value);

    // Validate input

    if (!guess || guess < 1 || guess > maxNumber) {

        message.textContent =
            `Please enter a number between 1 and ${maxNumber}. ⚠️`;

        return;
    }

    // Prevent duplicate guesses

    if (previousGuesses.includes(guess)) {

        message.textContent =
            "You already tried this number! 🔄";

        return;
    }

    previousGuesses.push(guess);
    attempts++;

    // Correct

    if (guess === secretNumber) {

        const bonus = Math.max(0, 50 - attempts * 5);
        score += bonus;

        message.textContent =
            `🎉 Correct! The number was ${secretNumber}. You won!`;

        message.className = "message correct";

        gameOver = true;

        guessInput.disabled = true;
        guessBtn.disabled = true;
        hintBtn.disabled = true;

    }

    // Too Low

    else if (guess < secretNumber) {

        score = Math.max(0, score - 5);

        message.textContent =
            "📈 Too low! Try a higher number.";

        message.className = "message wrong";

    }

    // Too High

    else {

        score = Math.max(0, score - 5);

        message.textContent =
            "📉 Too high! Try a lower number.";

        message.className = "message wrong";
    }

    updateStats();
    updatePreviousGuesses();

    guessInput.value = "";
    guessInput.focus();
}


// Hint

function getHint() {

    if (gameOver) return;

    if (hints <= 0) {

        message.textContent =
            "❌ You don't have any hints left.";

        return;
    }

    hints--;

    let hint;

    if (secretNumber % 2 === 0) {
        hint = "💡 Hint: The number is EVEN.";
    } else {
        hint = "💡 Hint: The number is ODD.";
    }

    // Additional hint based on range

    if (secretNumber <= maxNumber / 2) {

        hint += " It is in the lower half.";

    } else {

        hint += " It is in the upper half.";
    }

    score = Math.max(0, score - 10);

    message.textContent = hint;

    updateStats();
}


// Previous Guesses

function updatePreviousGuesses() {

    if (previousGuesses.length === 0) {

        previousGuessesDisplay.innerHTML =
            '<span class="empty">No guesses yet</span>';

        return;
    }

    previousGuessesDisplay.innerHTML =
        previousGuesses
            .map(number => `<span>${number}</span>`)
            .join("");
}


// Difficulty

difficultyButtons.forEach(button => {

    button.addEventListener("click", () => {

        difficultyButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        maxNumber = Number(button.dataset.max);

        maxNumberDisplay.textContent = maxNumber;

        startGame();
    });

});


// Events

guessBtn.addEventListener("click", checkGuess);

hintBtn.addEventListener("click", getHint);

restartBtn.addEventListener("click", startGame);


// Press Enter to Guess

guessInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        checkGuess();
    }

});


// Start the game

startGame();