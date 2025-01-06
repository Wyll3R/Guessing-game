// Define the initial number of attempts
const INITIAL_ATTEMPTS = 10;

// Initialize the number of attempts
let attempts = INITIAL_ATTEMPTS;
// Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
// Get the result display element
const result = document.getElementById("result");
// Get the input field
const guessInput = document.getElementById("guess");
// Get the submit button
const submit = document.getElementById("submit");
// Get the restart button
const restart = document.getElementById("restart");

// Function to check the user's guess
function checkGuess(event) {
    event.preventDefault(); // Prevent form submission

    // Get the user's guess from the input field
    const guess = guessInput.value;

    // Check if the input is a valid number
    if (guess === '' || isNaN(guess) || guess < 1 || guess > 100) {
        result.innerHTML = "Please enter a valid number between 1 and 100!";
        return; // Exit the function if the input is invalid
    }

    // Check if the guess is correct
    if (Number(guess) === randomNumber) {
        const attemptsUsed = INITIAL_ATTEMPTS - attempts;
        result.innerHTML = `Congratulations! You guessed the right number! You have used ${attemptsUsed + 1} out of ${INITIAL_ATTEMPTS} attempts.`;
        disableInput(); // Disable further input
        submit.style.display = "none"; // Hide the submit button
        restart.style.display = "inline"; // Show the restart button
        return; // Exit the function after winning
    } else if (guess < randomNumber) { // Check if the guess is too low
        result.innerHTML = `Number ${guessInput.value} is too low! Try a higher number!`;
    } else if (guess > randomNumber) { // Check if the guess is too high
        result.innerHTML = `Number ${guessInput.value} is too high! Try a lower number!`;
    }

    // Decrement the number of attempts
    attempts--;
    guessInput.value = ""; // Clear the input field after the user has guessed the number

    // Provide feedback on the number of attempts left
    if (attempts > 0) {
        result.innerHTML += ` You have ${attempts} attempts left!`;
    }

    // Check if the game is over
    if (attempts <= 0) {
        result.innerHTML = `Game Over! The number was ${randomNumber}`;
        disableInput(); // Disable further input
        submit.style.display = "none"; // Hide the submit button
        restart.style.display = "inline"; // Show the restart button
    }
}

// Function to disable the input field
function disableInput() {
    guessInput.disabled = true;
}

// Function to restart the game
function restartGame() {
    attempts = INITIAL_ATTEMPTS; // Reset the number of attempts
    randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a new random number
    guessInput.disabled = false; // Enable the input field
    submit.style.display = "inline"; // Show the submit button
    restart.style.display = "none"; // Hide the restart button
    result.innerHTML = ""; // Clear the result display
    guessInput.value = ""; // Clear the input field
}

// Add event listeners for the buttons
submit.addEventListener("click", checkGuess);
restart.addEventListener("click", restartGame);

// Add event listener for the input field to listen for the Enter key
guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess(event);
    }
});