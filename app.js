/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct number if loose
- Let player choose to play again 
*/

// Game values

let min = 1, 
    max = 10,
    winningNum = getRandomNumber(min,max),
    guessesLeft = 3;

// UI Elements

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-game'){
    window.location.reload();
  }
})

//Listen for guess
guessBtn.addEventListener('click',function(){
  let guess = parseInt(guessInput.value);
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`,'red');
  }
 //Check if won
 if(guess === winningNum){
 // Game over - won 
  gameOver(true, `${winningNum} is correct, YOU WIN!`)
 }
 else {
  // Wrong number
  guessesLeft -= 1;
  if(guessesLeft === 0){
    // Game over - lost
    gameOver(false,`Game Over, you lost! The correct number was ${winningNum}`);
  } else {
    // Game continues - answer wrong

    //Change border color
    guessInput.style.borderColor = 'red';

    //Clear input
    guessInput.value = '';

    //Tell user its the wrong number
    setMessage(`${guess} is not correct, ${guessesLeft} guesses left`,'red');

  }

}
});

function gameOver(won, msg){

  guessInput.disabled = true;
  let color = won ? 'green' : 'red';
  guessInput.style.borderColor = color;
  setMessage(msg,color);

  //Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function setMessage(msg,color){
  message.style.color = color;
  message.textContent = msg;
}

//Get winning number
function getRandomNumber(min,max){
  
  return min + Math.floor(Math.random() * ( max - min +1));
}