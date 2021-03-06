const cards = document.querySelectorAll('.memory-card');

// card state
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;


function flipCard() {
    if (lockBoard) return;
    // prevent user from clicking the same card twice
    if (this === firstCard) return;
    console.log(this)
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}


function checkForMatch() {
    // console.log(firstCard.dataset.framework)
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        matches++
        console.log(matches);
        if (matches === 6) {
            console.log('game over');
            
            // cards.classList.remove('flip');
        }
        resetBoard();
        return;
    }

    unflipCards();
}

// console.log(checkForMatch())

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // call this method to reset variables after each round
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        // call method to reset board
        resetBoard();
    }, 700)
}

// Method for resetting board after second card flip if cards do not match
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// unfinished function
// function resetGame() {
//     [hasFlippedCard, lockBoard] = [false, false];
//     [firstCard, secondCard] = [null, null];
// }


(function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
  })();


  console.log(cards)
  

cards.forEach(card => card.addEventListener('click', flipCard));