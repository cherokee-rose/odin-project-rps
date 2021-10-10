// Game constants

const startGameBtn = document.getElementById('start-btn');
const dropdownItems = document.getElementsByClassName('dropdown-item');

const computerMoveDisplay = document.getElementById('computer-move-display');
const userMoveDisplay = document.getElementById('user-move-display');

const computerScoreDisplay = document.getElementById('computer-score');
const userScoreDisplay = document.getElementById('user-score');

const gameModeDisplay = document.getElementById('game-mode-display');

const computerIcon = document.getElementById('computer-icon');
const userIcon = document.getElementById('user-icon');

const inputButtons = document.getElementsByClassName("input");

const moveNames = ['rock', 'paper', 'scissors'];

const imageURLs = {
    rock: '../images/' + moveNames[0] + '.png',
    paper: '../images/' + moveNames[1] + '.png',
    scissors: '../images/' + moveNames[2] + '.png'   
};

const checkClassName = 'fa-check';
const crossClassName = 'fa-times';
const winnerColor = 'green';
const loserColor = 'red';

// Game variables

var gameMode = 'BEST OF 3';
var isPlaying = false;

var userMove = '';
var computerMove = '';

var userScore = 0;
var computerScore = 0;

var computerImgMoveURL = '';
var userImgMoveURL = '';

// Event handlers

// Add an event listener to start a new game
startGameBtn.onclick = () => {
    if (!isPlaying) {
        // Reset all the variables
        computerScore = 0;
        userScore = 0;
    
        computerImgMoveURL = '';
        userImgMoveURL = '';
    
        // Reset the game status
        isPlaying = true;
    
        // Reset the screen
        updateScreen();
    } else {
        alert('You\'ve already started the game!');
    }
};

// Add an event listener for the game mode dropdown menu
for (let i = 0; i < dropdownItems.length; i++){
    dropdownItems[i].onclick = () => {
        // Check if the item is not active already:
        if (!dropdownItems[i].className.match('active')){
            // Iterate through items to find the previous active item
            for (let j = 0; j < dropdownItems.length; j++){
                var item = dropdownItems[j];

                // Remove 'active' class from the previous active item:
                if (item.className.match('active')){
                    item.classList.remove('active');
                } 
            }            

            // Update the game mode:
            dropdownItems[i].classList.add('active');
            gameMode = dropdownItems[i].innerHTML;
            gameModeDisplay.innerHTML = gameMode;            
        }
    };
}


// Add an event listener for the input buttons
for (let i = 0; i < inputButtons.length; i++) {
    inputButtons[i].onclick = () => {
        if (isPlaying) {
            // Read and store the user's input
            userMove = inputButtons[i].id;
            // Generate a computer's input
            computerMove = moveNames[getRandomInt(3)];
    
            // Update the urls of the moves' images
            userImgMoveURL = imageURLs[userMove];
            computerImgMoveURL = imageURLs[computerMove];
    
            updateGame();
            updateScreen();
        } else {
            alert('You are not playing, you have to select a mode and start a new game.');
        }
    };
}

function updateScreen() {
    // Images of moves
    computerMoveDisplay.src = computerImgMoveURL;
    userMoveDisplay.src = userImgMoveURL;

    // Scores
    computerScoreDisplay.innerHTML = computerScore;
    userScoreDisplay.innerHTML = userScore;

    // Icons and the colors
    // Add if the game is finished
    if (!isPlaying) {
        let userIconValue = '';
        let computerIconValue = '';
        let userColor = '';
        let computerColor = '';

        if (userScore > computerScore) {
            userIconValue = checkClassName;
            computerIconValue = crossClassName;
            userColor = winnerColor;
            computerColor = loserColor;
        } else { 
            userIconValue = crossClassName;
            computerIconValue = checkClassName;
            userColor = loserColor;
            computerColor = winnerColor;
        }

        userIcon.classList.add(userIconValue);
        userIcon.style.color = userColor;
        userScoreDisplay.style.color = userColor;
        computerIcon.classList.add(computerIconValue);
        computerIcon.style.color = computerColor;
        computerScoreDisplay.style.color = computerColor;

    // Remove if it's a new game and it's not the first game
    } else if (userIcon.className.length > 3) {
        userIcon.classList.remove(userIcon.className.substring(4));
        userScoreDisplay.style.color = 'black';
        computerIcon.classList.remove(computerIcon.className.substring(4));
        computerScoreDisplay.style.color = 'black';
    }
}

function updateGame() {
    // Check whose move is greater
    if (userMove == "rock" && computerMove == "scissors" ||
        userMove == "paper" && computerMove == "rock" ||
        userMove == "scissors" && computerMove == "paper"){
        userScore++;

    } else if (userMove == computerMove) {
        // Tie
    } else {
        computerScore++;
    }

    if ((gameMode === 'BEST OF 3' && (userScore === 2 || computerScore === 2)) || 
        (gameMode === 'BEST OF 5' && (userScore === 3 || computerScore === 3)) ||
        (gameMode === 'DEUCE' && Math.abs(userScore - computerScore) === 2)) {
            isPlaying = false;
            console.log(`Game has finished: ${userScore} : ${computerScore}`);
    }
}

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}