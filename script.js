var scores, roundScore, activePlayer, gamePlaying;
var lastDice;

init();


document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. Random number for the dice
        var dice = Math.floor(Math.random()*6) + 1;

        //2. Change the dice Image
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';    
        diceDOM.src = 'dice' + dice + '.png';

        //3. Update the round Score and Current score if roll dice is not 1
        if(dice === 6 && lastDice === 6){
            scores[activePlayer]=0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        } 
        if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else{
            nextPlayer();
            // document.querySelector('.player-0-panel').classList.remove('active');
            // document.querySelector('.player-1-panel').classList.add('active');
        }
        lastDice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //Add the current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI score
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]; 

        var finalScore = document.querySelector('.final-score').value;
        var winningScore;
        //FinalScore is null, zero or empty string then finalScore is 100. Otherwise finalScore.
        if(finalScore){
            winningScore = finalScore;
        }else{
            winningScore = 100;
        }

        //check PLAYER is WINNER or not.
        if(scores[activePlayer] >=winningScore){
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        }else{
            //If click on hold then change the player.
            nextPlayer();
        }
    }
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore=0;
        document.querySelector('#current-0').textContent = '0';
        document.querySelector('#current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // document.querySelectorAll('#current-' + activePlayer).textContent = dice;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('#name-0').textContent = "Player1";
    document.querySelector('#name-1').textContent = "Player2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    

}


