let suits = ["<span class='red'>&#9829 </span>", 
             "<span class='red'>&#9830 </span>",
             "<span class='black'>&#9827 </span>",
             "<span class='black'>&#9824 </span>"];

let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let message = document.getElementById("message");
let pcards = document.getElementById("player-cards");
let pscore = document.getElementById("player-score");
let dcards = document.getElementById("dealer-cards");
let dscore = document.getElementById("dealer-score");
let text = document.getElementById("text-area");
let start = document.getElementById("start-btn");
let hit = document.getElementById("hit-btn");
let stay = document.getElementById("stay-btn");

let gameStart = false;
let gameOver = false;
let gameStatus = 0;
let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;
let deck = [];

start.style.display = 'inline';
hit.style.display = 'none';
stay.style.display = 'none';

function startGame(){
    gameStarted = true;
    gameStatus = 0;
    gameOver = false;

    deck = createDeck();
    shuffleDeck(deck);
    playerCards = [getCard(), getCard()];
    dealerCards = [getCard(), getCard()];
    start.innerHTML = "Restart";
    hit.style.display = 'inline';
    stay.style.display = 'inline';
    showStatus();
    checkEnd();
    text.textContent = "";
}

function createDeck(){
    let deck = [];
    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < values.length; j++){
            let card = {suit: suits[i], value: values[j]}
            deck.push(card);
        }
    }
    return deck;
}
function shuffleDeck(deck){
    for(let i = 0; i < deck.length; i++){
        let shuffle = Math.trunc(Math.random() * deck.length);
        let temp = deck[shuffle];
        deck[shuffle] = deck[i];
        deck[i] = temp;
    }
}

function hitBtn(){
    playerCards.push(getCard());
    checkEnd();
    showStatus();
}
function stayBtn(){
    gameOver = true;
    checkEnd();
    showStatus();
}

function checkEnd(){
    updateScores();
    
    if(gameOver){
        while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21){
            dealerCards.push(getCard());
            updateScores();
        }
    }
    if(playerScore > 21){
        gameStatus = 2;
        gameOver = true;
    }
    else if(dealerScore > 21){
        gameStatus = 1;
        gameOver = true;
    }
    else if(gameOver){
        if(playerScore > dealerScore){
            gameStatus = 1;
        }
        else if(playerScore = 21){
            gameStatus = 1;
        }
        else if(dealerScore > playerScore){
            gameStatus = 2;
        }
        else if(playerScore == dealerScore){
            gameStatus = 0;
        }
    }
}

function getCardString(card){
        return "<div class='card'>" + card.value + card.suit + "</div>";
}
function getCardValue(card){
        switch(card.value){
        case "A":
            return 1;
        case "2":
            return 2;
        case "3":
            return 3;
        case "4":
            return 4;
        case "5":
            return 5;
        case "6":
            return 6;
        case "7":
            return 7;
        case "8":
            return 8;
        case "9":
            return 9;
        default:
            return 10;       
    }
}


function showStatus(){
    if(!gameStarted){
        text.innerHTML = "Play a game";
        return;
    }
    let playerCardString = '';
    for(let i = 0; i < playerCards.length; i++){
        playerCardString += getCardString(playerCards[i]);
    }
    let dealerCardString = '';
    for(let i = 0; i < dealerCards.length; i++){
        dealerCardString += getCardString(dealerCards[i]);
    }
    updateScores();
    
    dcards.innerHTML = dealerCardString;
    dscore.innerHTML = dealerScore;
    pcards.innerHTML = playerCardString;
    pscore.innerHTML = playerScore;


    if(gameOver){
        if(gameStatus == 1){
            win();
        }
        else if(gameStatus == 2){
            text.innerHTML += "Dealer wins"
            //lose();
        }
        else if(gameStatus == 0){
            //text.innerHTML = "It's a tie";
            tie();
        }
        start.style.display = 'inline';
        hit.style.display = 'none';
        stay.style.display = 'none';
    }
}

function getScore(cardArray){
    let score = 0;
    ace = 0;
    for(let i = 0; i < cardArray.length; i++){
        let card = cardArray[i];
        score += getCardValue(card);

        if(card.value == "A"){
            ace += 1;
        }
    }
    for(let j = 0; j < ace; j++){
        if(score + 10 <= 21){
            score += 10;
        }
    }
    return score;
}

function updateScores(){
    playerScore = getScore(playerCards);
    dealerScore = getScore(dealerCards);
}

function win(){
    updateScores();
    if(playerScore === 21){
        text.innerHTML = "You have Blackjack!";
    }
    else if(dealerScore > 21){
        text.innerHTML = "Dealer bust! You win";
    }
}

function lose(){
    updateScores();
    if(playerScore > 21){
        text.innerHTML += "Bust! Dealer wins";
    }
    else if(playerScore < dealerScore){
        text.innerHTML += "Dealer wins"
    }
    else{
        text.innerHTML += "Dealer wins"
    }
}

function tie(){
    updateScores();
    if(playerScore = dealerScore){
        text.innerHTML = "It's a tie"
    }
}

function getCard(){ 
    return deck.shift();
}
