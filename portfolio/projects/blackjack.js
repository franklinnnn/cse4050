let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let pSum = document.getElementById("p-sum")
let pCards = document.getElementById("p-cards")

function getCard(){
    let number = Math.floor(Math.random() * 13) + 1
    if (number > 10){
        return 10
    } 
    else if (number === 1){
        return 11
    }
    else{
        return number
    }
}

function startGame(){
    isAlive = true
    let firstCard = getCard()
    let secondCard = getCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    makeGame()
}

function makeGame(){
    pCards.innerHTML = "Cards: "
    for(let i = 0; i < cards.length; i++){
        pCards.innerHTML += cards[i]+" "
    }

    pSum.innerHTML = "Sum: "+ sum
    if( sum <= 20){
        message = "Draw new card?"
    }
    else if(sum === 21){
        message = "You've got Blackjack!"
        hasBlackJack = true
    }
    else{
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.innerHTML = message
}

function newCard(){
    let card = getCard()
    sum += card
    cards.push(card)
    makeGame()
}