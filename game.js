var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started = false;
var level = 0;
$(document).keypress(function(){
    if(!started){
        $("#level.title").text("Level:"+ level);
        nextSeq();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);

    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSeq(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChoseColor = buttonColors[randomNumber];
    gamePattern.push(randomChoseColor);

    $("#"+randomChoseColor).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChoseColor);

}

function playSound(name) {
    soundlink="sounds/" + name + ".mp3";
    var audio = new Audio(soundlink);
    audio.play();
  }


  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  
  function checkAnswer(currentLevel){
        if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
            console.log("Success");
            if (userClickedPattern.length === gamePattern.length){
                setTimeout(function () {
                  nextSeq();
                }, 1000);
        
              }
        }
        else{
            console.log("Wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {   
            $("body").removeClass("game-over");
            },200);
            $("h1").text("Game over Press any key to restart");
            $(document).keypress(function(){
                startOver();
            })
        }
  }

  function startOver(){
        level=0;
        gamePattern=[];
        nextSeq();
  }