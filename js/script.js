// SELECT ELEMENTS:
// Unordered list where players guessed letters will appear
const lettersList = document.querySelector(".guessed-letters");

// Button with text 'Guess!' in it
const guessButton = document.querySelector(".guess");

// Text input where player enters letter
const letterInput = document.querySelector(".letter");

// Empty paragraph where word in progress appears
const wordInProgress = document.querySelector(".word-in-progress");

// Paragraph where number of remaining guesses appears
const remainingGuesses = document.querySelector(".remaining");

// Span in above paragraph
const numGuesses = document.querySelector(".num-guesses");

// Empty paragraph where messages will appear when player guesses
const message = document.querySelector(".message");

// Hidden button that will appear to prompt player to play again
const playAgainButton = document.querySelector(".play-again");

// Starting word:
const word = "magnolia";
console.log(word.length);

// Function to add circle placeholders for each letter of word 
const createPlaceholders = function(word) {
    let circles = "";
    for (let letter of word) {
        circles += "●";
    };
    wordInProgress.innerText = circles;
};

// Capture the user's letter input when clicking guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const inputValue = letterInput.value;
    console.log(inputValue);
    letterInput.value = "";
})


createPlaceholders(word);