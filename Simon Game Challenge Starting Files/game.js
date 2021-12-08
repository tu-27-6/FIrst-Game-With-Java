//create array to store color
var buttonColours = ['red', 'blue', 'green', 'yellow'];

//store randomChosenColour
var gamePattern = [];

//store id of button got clicked
var userClickPattern = [];

var started = false;
var level = 0;

//press A to start Game 
$(document).keypress(function() {
    if(!started) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
});

//detect when any buttons are clicked
$('.btn').click(function() {
    //store all the id of button got clicked
    var userChosenColour = $(this).attr('id');

    //push userChosenColour in to userClickPattern
    userClickPattern.push(userChosenColour);

    //play sound when clicked
    playSound(userChosenColour);

    //animated when pressed
    animatePressed(userChosenColour);

    //check right answer
    checkAnswer(userClickPattern.length - 1);
    
});

function nextSequence() {
    userClickPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    //create random number 0 - 3
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(userChosenColour);
}

//function to play sounds
function playSound(coloursName) {
    var audio = new Audio('sounds/' + coloursName + '.mp3');
    audio.play();

}

//function for animation
function animatePressed(coloursName) {
    $('#' + coloursName).addClass('pressed');

    setTimeout(function() {
        $('#' + coloursName).removeClass('pressed');
    }, 100);
}

//Check answer
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        console.log('true');

        if(userClickPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log('false');

        //loser sound
        playSound('wrong');

        //Change h1 title
        $('body').addClass('game-over');
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

        $('#level-title').text('GAME OVER, press A to reload');

        //resetGame
        reset();
    }

}

function reset() {
    level = 0;
    started = false;
    gamePattern = [];
}