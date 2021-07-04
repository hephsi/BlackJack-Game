//listing object that is useful to develop the game 

let blackjackGame = {
    'player': {'scoreSpan': '#player-score', 'div': '#player-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-score', 'div': '#dealer-box', 'score': 0},
    'isStand': false,
    'turnsOver': false,
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11]},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A']
};

//defining const variables of player and bot 

const PLAYER = blackjackGame['player'];
const DEALER = blackjackGame['dealer'];


//using the button through event listeners
document.querySelector('#hit').addEventListener('click', blackjackHit);

document.querySelector('#stand').addEventListener('click', dealerLogic);

document.querySelector('#restart').addEventListener('click', blackjackDeal);


//defining constant variables for sounds 
const hitSound = new Audio('https://github.com/hephsi/BlackJack-Game/blob/438f8ae0974597cb6b5cfceae4475d3982355b97/sounds/swish.m4a');
const winSound = new Audio('https://github.com/hephsi/BlackJack-Game/blob/438f8ae0974597cb6b5cfceae4475d3982355b97/sounds/cash.mp3');
const lossSound = new Audio('https://github.com/hephsi/BlackJack-Game/blob/438f8ae0974597cb6b5cfceae4475d3982355b97/sounds/aww.mp3');
const bangSound = new Audio('https://github.com/hephsi/BlackJack-Game/blob/438f8ae0974597cb6b5cfceae4475d3982355b97/sounds/bang.mp3');
const drawSound = new Audio('https://github.com/hephsi/BlackJack-Game/blob/438f8ae0974597cb6b5cfceae4475d3982355b97/sounds/draw.mp3')


//when we click on hit button random card got picked in players box and score will get updated

function blackjackHit(){
    if (blackjackGame['isStand'] === false) {
      let card = randomCard();
      updateScore(card, PLAYER);
      showCard(card, PLAYER);
      showScore(PLAYER);
    }
}

//function to pick random card using math object

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}


//function to update the score of active player in his box

function updateScore(card, activePlayer) {
    if (card === 'A') {
      if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
        activePlayer['score'] += blackjackGame['cardsMap'][card][1];
      } 
      else {
        activePlayer['score'] += blackjackGame['cardsMap'][card][0];
      }
    } 
    else {
      activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

//funtion for showing up card after hit in active player box

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
      let cardImage = document.createElement('IMG');
      cardImage.src = './images/${card}.png';
      document.querySelector(activePlayer['div']).appendChild(cardImage);
      hitSound.play();
    }
}

//funtion to change score according to card showed up

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
      document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
      document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
      bangSound.play();
    } 
    else {
      document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}
  
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//function for bot logic

async function dealerLogic() {
    blackjackGame['isStand'] = true;
    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
      let card = randomCard();
      updateScore(card, DEALER);
      showCard(card, DEALER);
      showScore(DEALER);
      await sleep(1000);
}
  
blackjackGame['turnsOver'] = true;
    showResult(); 
}

//function for restart the game

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
  
      blackjackGame['isStand'] = false;
  
      let yourImages = document.querySelector('#player-box').querySelectorAll('img');
      let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
      for (i=0; i<yourImages.length; i++) {
        yourImages[i].remove();
      }
  
      for (i=0; i<dealerImages.length; i++) {
        dealerImages[i].remove();
      }
  
      PLAYER['score'] = 0;
      DEALER['score'] = 0;
  
      document.querySelector('#player-score').textContent = 0;
      document.querySelector('#dealer-score').textContent = 0;
  
      document.querySelector('#player-score').style.color = 'rgb(116, 161, 32)';
      document.querySelector('#dealer-score').style.color = 'rgb(116, 161, 32)';
  
      document.querySelector('#blackjack-result').textContent = "Let's play";
      document.querySelector('#blackjack-result').style.color = 'rgb(116, 161, 32)';
  
      blackjackGame['turnsOver'] = false;
    }
}
  
  // show result on the top and update the score in the table
function showResult() {
let message, messageColor;
  
    if (blackjackGame['turnsOver'] === true) {
  
      if (PLAYER['score'] <= 21) {
  
        // condition: higher score than dealer's or when dealer busts but you're 21 or under.
        if (PLAYER['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
          blackjackGame['wins']++;
          document.querySelector('#wins').textContent =  blackjackGame['wins']; 
          message = 'WON!';
          messageColor = 'green';
          winSound.play();
  
        } else if (PLAYER['score'] < DEALER['score']) {
          blackjackGame['losses']++;
          document.querySelector('#losses').textContent =  blackjackGame['losses']; 
          message = 'LOST!';
          messageColor = 'red';
          lossSound.play();
  
        } else if (PLAYER['score'] === DEALER['score']) {
          blackjackGame['draws']++;
          document.querySelector('#draws').textContent = blackjackGame['draws']; 
          message = 'TIED!';
          messageColor = 'rgb(116, 161, 32)';
          drawSound.play();
        }
  
        // condition: user busts but dealer doesn't
      } else if (PLAYER['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        message = 'LOST!';
        messageColor = 'red';
        lossSound.play();
  
      // condition: when DEALERh bust.
      } else if (PLAYER['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message = 'TIED!';
        messageColor = 'rgb(116, 161, 32)';
        drawSound.play();
      }
    }
  
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}
  
  

