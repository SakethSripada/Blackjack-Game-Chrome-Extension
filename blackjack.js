let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = true;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let playerChips = 200;
let musicOn = true;
const money = 1000; // Get money from localStorage or set to 1000 initially
let moneyValDisplay = document.getElementById("money-val");
moneyValDisplay.textContent = "$" + money;

document.querySelector("#startGameBtn").addEventListener("click", game);
document.querySelector("#newCardBtn").addEventListener("click", showCard);
document.querySelector("#standBtn").addEventListener("click", stand);

let cardsIMG = [];

function showCard() {
    if (isAlive === true && hasBlackJack === false) {
        let i = getRandomCard();
        cardsIMG.push("h");
        if (i != 11) {
            sum += i;
        }

        document.getElementById("card" + cardsIMG.length).src = "images/" + i + "_of_clubs.png";
        if (i === 11) {
            document.getElementById("card" + cardsIMG.length).src = "images/ace_of_clubs.png";
            let aceChoice = prompt("You drew an Ace! Would you like to use it as a 1 or an 11?");
            sum += parseFloat(aceChoice);
        }
    }

    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've reached 21!";
        hasBlackJack = true;
    } else {
        message = "You're out of the game!";
        isAlive = false;
    }
    messageEl.textContent = message;
}

let randomNumber2 = Math.floor(Math.random() * 6) + 15;

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

let bet = 0; // Initialize bet variable

function game() {
    bet = parseInt(prompt("How much would you like to bet?"), 10);
    if (bet <= money && bet > 0) {
        showCard();
        showCard();
    } else {
        showCard();
        showCard();
        bet = 0
    }
}

function stand() {
    hasBlackJack = false;
    isAlive = false;
    let finalScore = document.getElementById("hand-el");
    finalScore.textContent = "Final Score:" + sum;
    let dealerScore = document.getElementById("scoretobeat");
    dealerScore.textContent = "Dealer's Score:" + randomNumber2;

    if (sum > randomNumber2) {
        const winnings = bet * 2; // Player wins double the bet
        messageEl.textContent = `You won! $${winnings} has been credited to your account!`;
        money += winnings;
    } else if (sum < randomNumber2) {
        messageEl.textContent = `You lost to the dealer! You lost $${bet}`;
        money -= bet;
    } else {
        messageEl.textContent = "It's a tie! Your bet has been returned.";
    }

    moneyValDisplay.textContent = "$" + money;
}

let restartBtn = document.getElementById("refresh");
restartBtn.addEventListener("click", function () {
    location.reload(true);
});

function playSound() {
    var audio = new Audio("../Code/images/Arcade Click Sound.wav");
    audio.play();
}

function playSound2() {
    var audio3 = new Audio("../Code/images/Achievement.wav");
    audio3.play();
}

function playBGMusic() {
    var audio2 = new Audio("../Code/images/Background Music for Blackjack.mp3");
    audio2.play();
}