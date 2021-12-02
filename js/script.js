// SELECT ELEMENTS:
// Unordered list where player's guessed letters will appear
const lettersList = document.querySelector(".guessed-letters");

// Button with text 'Guess!' in it
const guessButton = document.querySelector(".guess");

// Text input where player enters letter
const letterInput = document.querySelector(".letter");

// Empty paragraph where 'word in progress' appears
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

// Array to hold guessed letters
const guessedLetters = [];


// Add circle placeholders for each letter of word 
const createPlaceholders = function(word) {
    let circles = "";
    for (let letter of word) {
        circles += "●";
    };
    wordInProgress.innerText = circles;
};

createPlaceholders(word);


// Capture the user's letter input when clicking guess button
guessButton.addEventListener("click", function(e) {
    // prevents page from reloading with each click
    e.preventDefault();
    const inputValue = letterInput.value;
    letterInput.value = "";
    message.innerText = "";
    const validInput = checkInput(inputValue);
    if (typeof validInput !== "undefined") {
        makeGuess(validInput);
    }
});


// Validate user's input
const checkInput = function(input) {
    // check if value is only a character
    const acceptedLetter = /[a-zA-Z]/
    if (input === "") {
        message.innerText = "Enter ☝️ one letter for a guess!";
    } else if (input.length > 1) {
        message.innerText = `Only enter one value, silly 😜`;
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Only letters please ✅ (no nums allowed)";
    } else {
        return input;
    };
};


// Append input to guessedLetters array
// if it has not been guessed yet
const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText = `You already guessed '${letter}', try again!`;
    } else {
        message.innerText = `Your guess is: '${letter}'`;
        guessedLetters.push(letter);
        displayLetters();
        updateWord(guessedLetters);
    };
    console.log(guessedLetters);
}


// Display letters guessed to screen
const displayLetters = function() {
    lettersList.innerHTML = "";
    for (let letter of guessedLetters) {
        let listItem = document.createElement("li");
        listItem.innerText = letter;
        lettersList.append(listItem);
    };
};


// Update word in progress - replace dots with letters
// TODO - change the arrays:
const updateWord = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // Check if any of the letters in wordArray are in the word
    const wordProg = wordInProgress.innerText.split("");
    wordArray.forEach(function(letter, index) {
        if (guessedLetters.includes(letter)) {
            wordProg[index] = letter;
        };
    });
    wordInProgress.innerText = wordProg.join("");
    playerWon();
};


// Check if player won the game
const playerWon = function() {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    };
};