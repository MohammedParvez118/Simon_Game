
let buttonColors  = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
var started = false;
let level = 0;

$(document).on("keypress", function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

$(".btn").on("click", function() {
    const userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  });


  function checkAnswer(currentLevel){
   
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            console.log("success");
            console.log(userClickedPattern);
            console.log(gamePattern);
    
            if (userClickedPattern.length === gamePattern.length){
                setTimeout(function () {
                  nextSequence();
                }, 1000);
            }
        }
        else{
            playSound("wrong");
            $("body").addClass("game-over");

            setTimeout(function () {
                $("body").removeClass("game-over");
              }, 200);

            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
            console.log("failure");
        }
    
  }

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("."+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  }



  

  function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColor){
    $(".btn").on("click", function(){
        $(this).addClass("pressed");

        setTimeout(() => {
            $(this).removeClass("pressed"); // Remove the class after 100ms
        }, 100);
    })
  }

  function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }
  
    
  