const cards = document.querySelectorAll('.memory-card');
const cardsArr = [...cards];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

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
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unFlippedCards() {
    lockBoard = true;
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

cards.forEach(card => card.addEventListener('click', flipCard));