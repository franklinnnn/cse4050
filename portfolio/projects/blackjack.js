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
let gameWin = false;
let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;
let deck = [];

function startGame(){
    gameStarted = true;
    gameOver = false;
    gameWin = false;

    deck = createDeck();
    shuffleDeck(deck);
    playerCards = [getCard(), getCard()];
    dealerCards = [getCard(), getCard()];
    showStatus();

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
        gameWin = false;
        gameOver = true;
    }
    else if(dealerScore > 21){
        gameWin = true;
        gameOver = true;
    }
    else if(gameOver){
        if(playerScore > dealerScore){
            gameWin = true;
        }
        else{
            gameWin = false;
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
        //message.innerHTML = "Play a game";
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

    // message.innerHTML = dealerCardString + dealerScore + "\n\n" + playerCardString + playerScore;
    
    dcards.innerHTML = dealerCardString;
    dscore.innerHTML = dealerScore;
    pcards.innerHTML = playerCardString;
    pscore.innerHTML = playerScore;

    if(gameOver){
        if(gameWin){
            //message.innerHTML += "You win";
            text.innerHTML += "You win!";
      }
        else{
            //message.innerHTML += "Dealer wins";
            text.innerHTML += "Dealer wins";
        }
    }
}

function getScore(cardArray){
    let score = 0;
    let ace = false;
    for(let i = 0; i < cardArray.length; i++){
        let card = cardArray[i];
        score += getCardValue(card);
        if(card.value == "A"){
            ace = true;
        }
        if(ace && score + 10 <= 21){
            return score + 10;
        }
    }
    return score;
}

function updateScores(){
    playerScore = getScore(playerCards);
    dealerScore = getScore(dealerCards);
}

function getCard(){ 
    let c = deck.shift();
    return c;
    //return deck.shift();
}
