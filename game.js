let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern =[];
let randomNumber, randomChosenColour;
function nextSequence(){
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio('./sounds/'+randomChosenColour +'.mp3');
    audio.play();
}

$(document).keypress(nextSequence);

$("button").on("click",function(event){ 
    console.log(event);
});