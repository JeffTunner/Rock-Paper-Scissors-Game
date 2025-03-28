let score = JSON.parse(localStorage.getItem('score')) || {Wins: 0, Losses: 0, Ties: 0 };

updateScore();

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') {
        result('rock');
    } else if(event.key === 'p') {
        result('paper');
    } else if(event.key === 's') {
        result('scissors');
    }
});

function computerPicker() {

    let computerPick = '';
    const random2 = Math.random();

    if(random2 >=0 && random2 < 1/3) {
        computerPick = 'rock';
    } else if (random2 >=1/3 && random2 < 2/3) {
        computerPick = 'paper';
    } else {
        computerPick = 'scissors';
    } 

    return computerPick;
}

function result(yourPick) {
    let result = '';
    const computerPick = computerPicker();

    if((computerPick === 'rock' && yourPick === 'scissors') || (computerPick === 'paper' && yourPick === 'rock') || (computerPick === 'scissors' && yourPick === 'paper')) {
        result = 'You Lose!'
        score.losses++;
    } else if ((computerPick === 'paper' && yourPick === 'scissors') || (computerPick === 'rock' && yourPick === 'paper') || (computerPick === 'scissors' && yourPick === 'rock')) {
        result = 'You Win!'
        score.wins++;
    } else if((computerPick === 'scissors' && yourPick === 'scissors') || (computerPick === 'paper' && yourPick === 'paper') || (computerPick === 'rock' && yourPick === 'rock')) {
        result = 'Its a Draw!!!'
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You <img src= "${yourPick}-emoji.png" class="move-img"> - <img src= "${computerPick}-emoji.png" class="move-img"> Computer `;
}

function updateScore() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
}

let isAutoPlay = false;
let intervalID;
function autoPlay() {
    if(!isAutoPlay) {
        intervalID = setInterval(function() {
            const playerMove = computerPicker();
            result(playerMove);
        }, 1000);
        isAutoPlay = true;
    }  else {
        clearInterval(intervalID);
        isAutoPlay = false;
    }
}
