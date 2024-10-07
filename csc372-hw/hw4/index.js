/* Javascript for index.html */
let wins = 0;
let losses = 0;
let ties = 0;
let thinkingInterval = null; // Store the interval ID for the "Thinking..." animation

document.addEventListener('DOMContentLoaded', function () {
    displayScore();
    computerImage('question-mark');
});

// Handle player's choice and initiate game
function playerChoice(choice) {
    updatePlayerChoice(choice);
    thinking(); // Start the "Thinking..." animation

    computerShuffle(500, 3000, choice);
}

// Highlight player's choice 
function updatePlayerChoice(choice) {
    document.querySelectorAll('#choices img').forEach((img) => {
        img.classList.remove('selected');
    });

    if (choice) {
        document.getElementById(choice).classList.add('selected');
    }
}

// Update computer's choice image 
function computerImage(choice) {
    document.getElementById('computer-choice').src = `images/${choice}.PNG`;
}

// Shuffle computer's choice and display it after a short interval
function computerShuffle(interval, duration, playerChoice) {
    let shuffledImages = ['rock', 'paper', 'scissors'].sort(() => Math.random() - 0.5);
    let currentIndex = 0;

    // Set interval to quickly change computer's choice image
    let shuffleInterval = setInterval(() => {
        computerImage(shuffledImages[currentIndex]);
        currentIndex = (currentIndex + 1) % shuffledImages.length;
    }, interval);

    setTimeout(() => {
        clearInterval(shuffleInterval); // Stop the shuffle

        // Stop the "Thinking..." animation
        clearThinkingInterval();

        // Determine final computer choice
        let computerChoice = shuffledImages[Math.floor(Math.random() * shuffledImages.length)];
        computerImage(computerChoice);
        
        // Determine the outcome of the game
        let outcome = determineWinner(playerChoice, computerChoice);

        // Update the score and display the outcome
        displayScore(outcome);
        displayOutcome(outcome);
    }, duration);
}

// Animate the "Thinking..." text by adding a period every second
function thinking() {
    const outcomeElement = document.getElementById('outcome');
    outcomeElement.textContent = 'Thinking';

    // Clear any existing "Thinking..." interval before starting a new one
    clearThinkingInterval();

    let periodCount = 0;
    thinkingInterval = setInterval(() => {
        periodCount = (periodCount + 1) % 4; // Rotate through 0, 1, 2, 3 for number of periods
        outcomeElement.textContent = 'Thinking' + '.'.repeat(periodCount);
    }, 1000);
}

// Helper function to clear the "Thinking..." interval
function clearThinkingInterval() {
    if (thinkingInterval !== null) {
        clearInterval(thinkingInterval);
        thinkingInterval = null;
    }
}

// Determine the winner of the game based on player and computer choices
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    } else if ((playerChoice === 'rock' && computerChoice === 'scissors') ||
               (playerChoice === 'paper' && computerChoice === 'rock') ||
               (playerChoice === 'scissors' && computerChoice === 'paper')) {
        return 'win';
    } else {
        return 'loss';
    }
}

// Display the outcome of the game (win, loss, tie, or thinking)
function displayOutcome(outcome) {
    const outcomeTextMap = {
        win: 'You win!',
        loss: 'You lose!',
        tie: 'It\'s a tie!',
        'Thinking...': 'Thinking...'
    };
    document.getElementById('outcome').textContent = outcomeTextMap[outcome] || 'Click to play';
}

// Update and display the score based on the outcome
function displayScore(outcome) {
    if (outcome === 'win') {
        wins++;
    } else if (outcome === 'loss') {
        losses++;
    } else if (outcome === 'tie') {
        ties++;
    }
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    document.getElementById('ties').textContent = ties;
}

// Reset the score to 0 and update the UI accordingly
function resetScore() {
    wins = 0;
    losses = 0;
    ties = 0;
    displayScore();
    displayOutcome('Click to play');
    computerImage('question-mark');
    updatePlayerChoice(null);
    clearThinkingInterval(); 
}