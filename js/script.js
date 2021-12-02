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
const remaining = document.querySelector(".remaining");

// Span in above paragraph
const numGuesses = document.querySelector(".num-guesses");

// Empty paragraph where messages will appear when player guesses
const message = document.querySelector(".message");

// Hidden button that will appear to prompt player to play again
const playAgainButton = document.querySelector(".play-again");

// Section with form to input and guess letters
const letterSection = document.querySelector(".letter-section");

// Hidden button that will appear at the end of the game
const endGame = document.querySelector(".end-game");


// *** GLOBAL VARIABLES ***

// Starting word:
let word = "magnolia";

// Array to hold guessed letters
let guessedLetters = [];

let remainingGuesses = 2;

numGuesses.innerText = remainingGuesses;


// *** FUNCTIONS ***

// Async function to fetch words
const getWord = async function () {
    const res = await fetch( 
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await res.text();
    const wordArray = words.split("\n");

    // select a random word
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex].trim();
    console.log(randomWord);
    word = randomWord;
    createPlaceholders(word);
};



// Add circle placeholders for each letter of word 
const createPlaceholders = function(word) {
    let circles = "";
    for (let letter of word) {
        circles += "●";
    };
    wordInProgress.innerText = circles;
};

getWord();


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
        updateRemainingGuesses(letter);
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


// Count guesses remaining
const updateRemainingGuesses = function(guess) {
    const newWord = word.toUpperCase();
    if (newWord.includes(guess)) {
        message.innerText = `The letter '${guess}' is in the word ! 👏👏`;
    } else {
        message.innerText = `The letter '${guess}' is not the word.`;
        remainingGuesses -= 1;
        numGuesses.innerText = remainingGuesses;
        console.log(numGuesses.innerText);
        
    };

    if (numGuesses.innerText == 1) {
        remaining.innerHTML = "You only have 1 guess remaining!";       
    };

    if (numGuesses.innerText == 0) {
        remaining.innerText = "No more guesses remaining!";
        message.innerText = "Game Over ☹️";
        startOver();

    };

};


// Check if player won the game
const playerWon = function() {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        remaining.innerText = "";
        message.innerHTML = '<p class="highlight">You guessed the word! Congrats!</p>';
        startOver();
    };
};


// Start over
const startOver = function() {   
    clearScreen();
    playAgainButton.classList.remove("hide");
    endGame.classList.remove("hide");
};


// Clear screen
const clearScreen = function() {
    lettersList.classList.add("hide");
    letterSection.classList.add("hide");
    remaining.classList.add("hide");
};


// Activate play again button
playAgainButton.addEventListener("click", function(e) {
    message.classList.remove("win");
    message.innerText = "";
    lettersList.innerHTML = "";
    remainingGuesses = 2;
    numGuesses.innerText = remainingGuesses;
    remaining.innerHTML = `<p class="remaining">You have <span class="num-guesses">${remainingGuesses}</span> guesses remaining.</p>`;
    guessedLetters = [];
    lettersList.classList.remove("hide");
    letterSection.classList.remove("hide");
    remaining.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
});


endGame.addEventListener("click", function() {
    clearScreen();
    playAgainButton.classList.add("hide");
    endGame.classList.add("hide");
    wordInProgress.innerHTML = '';
    message.innerText = "Thanks for Playing! 👋";   
});