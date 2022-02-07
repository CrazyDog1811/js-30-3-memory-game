const cards = document.querySelectorAll('.memory-card');
const cardsArr = [...cards];
const firstPlayer = document.querySelector('.player1');
const secondPlayer = document.querySelector('.player2');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let isFirst = true;
let count = 0;

console.log(firstPlayer.lastElementChild.innerHTML);

shuffle();

function flipCard(ev) {

    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
    checkAllFlipped();
}

function checkForMatch() {
    (firstCard.firstElementChild.alt === secondCard.firstElementChild.alt) ?
    disableCards(): unFlippedCards();
}

function disableCards() {
    countScore();
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unFlippedCards() {
    lockBoard = true;
    count++;
    checkPlayer();
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        card.classList.remove('flip');
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    })
}

function checkAllFlipped() {
    let fullScreen = cardsArr.every(el => el.classList.contains('flip'));
    if(fullScreen) {
        setTimeout(() => {
            shuffle();
            cards.forEach(card => card.addEventListener('click', flipCard));   
        }, 1000)
    }
}

function checkPlayer() {
    if(count % 2 === 0) {
        secondPlayer.classList.remove('active');
        firstPlayer.classList.add('active');
    } else {
        firstPlayer.classList.remove('active');
        secondPlayer.classList.add('active');
    }
}

function countScore() {
    if(firstPlayer.classList.contains('active')) {
        let sum = firstPlayer.lastElementChild.innerHTML;
        sum++;
        firstPlayer.lastElementChild.innerHTML = sum;
    } else {
        let sum = secondPlayer.lastElementChild.innerHTML;
        sum++;
        secondPlayer.lastElementChild.innerHTML = sum;  
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));