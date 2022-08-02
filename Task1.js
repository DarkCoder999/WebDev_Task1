var Points = 0;
var HighestPoints = 0;
var Player1 = 0;
var Player2_Sequence = [];
var GameSequence = [];
var PointsArr = [];
var Game_on = false;
var minutes = 0 ;
var seconds;
var duration;
var id;
var HighestPoints1 = 0;
HighestPoints1 = window.localStorage.getItem("HighestPoints1");
document.querySelector(".HighestScore").innerHTML = "Highest Score: " + HighestPoints1;

//sets the game upon clicking the start button
document.getElementById("start").addEventListener("click",function(){
    if (!Game_on) {
        Player2_Sequence=[];
        GameSequence=[];
        document.querySelector("body").classList.remove("end-game");
        Points = 0;
        document.getElementById("start").innerHTML = "Enjoy Gaming" ;
        document.getElementById("clock").innerHTML= 'Time Left: 00:00';
        document.querySelector("h4").innerHTML = "Your Score : " + Points ;
        document.querySelector("h2").innerHTML = "Player1 Turn";
        HighestScoreDisplay();
        Game_on = true;
        bgm.play();
    }
});

//displays the highest score achieved from the local storage
function HighestScoreDisplay(){
    HighestPoints1 = window.localStorage.getItem("HighestPoints1");
    document.querySelector(".HighestScore").innerHTML = "Highest Score: " + HighestPoints1;
    Player2_Sequence=[];
}

//updates timer accordingly using seconds value in mm:ss
function clock(val){
    function TimeChange(){
        const min = Math.floor(seconds/60);
        let sec = seconds % 60;
        seconds--;
        if(seconds<0){
            remainingTime.innerHTML = "00:00";
            GameEnd();
            new_game();
        } 
        if(sec>=10){
          remainingTime.innerHTML =  'Time left: 0'+min + ':' + sec;
        }
        else{
          remainingTime.innerHTML =  'Time left: 0'+min + ':0' + sec;
        }
    }
    remainingTime = document.getElementById("clock");
    duration = setInterval(TimeChange,1000);
}    
function ClockClear(){
    clearInterval(duration);
}

//User clicks the tile, id gets stored in array and calls required functions
for(var k=1;k<=36;k++){
    document.querySelectorAll(".grid")[k].addEventListener("click", gameLogic);
}
function gameLogic(){
  if(Player1 % 2 == 0){
      ClockClear();
      var Player1ClickedTile = this.id;
      GameSequence.push(Player1ClickedTile);
      clickedSound.play();
      document.querySelector("h2").innerHTML = "Player2 Turn";
      clickedtile(Player1ClickedTile);
      seconds = 3*(GameSequence.length - 1)+5;
      clock();
      Player1++;
  }
  else{
      var Player2ClickedTile = this.id;
      Player2_Sequence.push(Player2ClickedTile);
      clickedSound.play();
      clickedtile(Player2ClickedTile);
      handleClick(Player2_Sequence.length-1);
  } 
}

//checks if user2 clicks in correct sequence set by user1 and updates score accordingly
function handleClick(value) {
    if(GameSequence[value] === Player2_Sequence[value]) {
        Points = Points + seconds;  
        document.querySelector("h4").innerHTML = "Your Score : " + Points ;
        if(Player2_Sequence.length === GameSequence.length){  
            ClockClear();
            Player1++;
            document.querySelector("h2").innerHTML = "Player1 Turn";
            HighestScoreDisplay();
        }
    } 
    else {
        GameEnd();  
        new_game();
    }
}

//calls animation from CSS for clicked tiles
function clickedtile(tile){
    var pressedTile = document.getElementById(tile);
    pressedTile.classList.add("clicked");
    setTimeout(function(){
        pressedTile.classList.remove('clicked');
    },200);
}
function previousTile(){
    var i=0;
    document.getElementById("clock").innerHTML= 'Time Left: 00:00';
    function animations(){
        var pressedTile = document.getElementById(GameSequence[i]);
        clickedSound.play();
        pressedTile.classList.add("clicked");
        setTimeout(function(){
            pressedTile.classList.remove('clicked');
        },250);
        i++;
        if(i>= GameSequence.length){
            removePreviousTile();
        }
    }
    id = setInterval(animations,1000);  
}
function removePreviousTile(){
    clearInterval(id);
}

//invokes the following actions when game ends
function GameEnd(){
    document.querySelector("body").classList.add("end-game");
    document.getElementById("start").innerHTML = "Restart" ;
    document.querySelector("h2").innerHTML = "Game Over!!!";
    ClockClear();
    bgm.pause();
    Result.play();
    GameEndSound.play();
    Player1 = 0;
    PointsArr.push(Points);
    PointsArr.sort(function(a, b){return b - a});
    if(PointsArr.length<2){
        document.querySelector(".g1").innerHTML = PointsArr[0];
    }
    else if(PointsArr.length<3){
        document.querySelector(".g1").innerHTML = PointsArr[0];
        document.querySelector(".g2").innerHTML = PointsArr[1];
    }
    else if(PointsArr.length<4){
        document.querySelector(".g1").innerHTML = PointsArr[0];
        document.querySelector(".g2").innerHTML = PointsArr[1];
        document.querySelector(".g3").innerHTML = PointsArr[2];
    }
    else if(PointsArr.length<5){
        document.querySelector(".g1").innerHTML = PointsArr[0];
        document.querySelector(".g2").innerHTML = PointsArr[1];
        document.querySelector(".g3").innerHTML = PointsArr[2];
        document.querySelector(".g4").innerHTML = PointsArr[3];
    }
    else{
        document.querySelector(".g1").innerHTML = PointsArr[0];
        document.querySelector(".g2").innerHTML = PointsArr[1];
        document.querySelector(".g3").innerHTML = PointsArr[2];
        document.querySelector(".g4").innerHTML = PointsArr[3];
        document.querySelector(".g5").innerHTML = PointsArr[4];
    }
}

//invokes the following actions when game restarts
function new_game(){
    HighestPoints = window.localStorage.getItem("HighestPoints1");
    if(Points>HighestPoints){
        window.localStorage.setItem("HighestPoints1" , Points); }
    document.querySelector(".HighestScore").innerHTML = "Highest Score: " + HighestPoints;
    Game_on = false;
    Player1 = 0;
    Player2_Sequence=[];
    GameSequence=[];
}