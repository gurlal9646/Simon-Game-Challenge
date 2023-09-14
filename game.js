let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let randomNumber, randomChosenColour;
let level = 0;
let gameStarted = false; // Variable to track whether the game has started

function nextSequence() {
    if (!gameStarted) {
        return; // Don't execute nextSequence if the game hasn't started
    }

    $("#level-title").text("Level " + level);
    level++;
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(document).keypress(function (event) {
    if (!gameStarted) {
        gameStarted = true; // Start the game when a key is pressed
        nextSequence(); // Start the first sequence
    }
});

$(".btn").on("click", function (event) {
    if (!gameStarted) {
        return; // Don't handle button clicks if the game hasn't started
    }

    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenColour);
});

function playSound(name) {
    let audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[gamePattern.length - 1] == currentLevel) {
        setTimeout(() => {
            nextSequence();
            userClickedPattern = [];
        }, 1000);
    } else {
        $("#level-title").text(`Game Over, Press Any Key to Restart`);
        playSound(`wrong`);
        $("body").addClass("game-over"); // Use a class for styling
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false; // Reset the gameStarted variable
}
