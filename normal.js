let mySound;
let myMusic;
function createComponent(width, height, color, x, y, type) {
    this.width = width;
    this.type = type;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            if(window.innerWidth<485){
                ctx.fillText(this.text,this.x+150, this.y+10);
            }else{
                ctx.fillText(this.text,this.x+220, this.y+10);
            }
           
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.touchHole = function (otherobj) {
        let myleft = this.x;               
        let mytop = this.y;               
        let otherleft = otherobj.x;              
        let othertop = otherobj.y;
        let otherright = otherobj.x + (otherobj.width);
        let mybottom = this.y + (this.height);
        let myright = this.x + (this.width);
        let otherbottom = otherobj.y + (otherobj.height);
        let crashHole = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crashHole = false;
        }
        return crashHole;
    }
}
let gameStarts = false,myGamePiece,border,lowerBorder,initalPos = true,myScore;
let  myObstacle = [];
let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        if(window.innerWidth<485){
            this.canvas.width = 370;
            this.canvas.height = 270;
        }
        else{
            this.canvas.width = 480;
            this.canvas.height = 270;
        }
        
        this.canvas.setAttribute("id", "gameArea")
        this.context = this.canvas.getContext("2d");
        this.scoreCount = 0;
        document.getElementById("parentElement").appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 10);
        document.body.onkeypress=function(e){
            if(e.keyCode===32){
                if (initalPos) {
                    moveup();
                    initalPos = !initalPos
                }
                else {
                    movedown();
                    initalPos = !initalPos

                }
            }
        }
        this.canvas.addEventListener('click', function (event) {

            if (initalPos) {
                moveup();
                initalPos = !initalPos
            }
            else {
                movedown();
                initalPos = !initalPos

            }
        });
},
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stopGame: function () {
        clearInterval(this.interval);
    }
}
function startGame() {

    gameStarts = true;
    myGamePiece = new createComponent(20, 20, "#f09516", 50, 160);
    myScore = new createComponent("15px", "verdana", "#f09516", 120, 20, "text");
    mySound = new sound("lose music.wav");
    myMusic = new soundRepeat("background.wav");
    myMusic.play();
    function makeArray(count, content) {
        let result = [];
        if (typeof (content) == "function") {
            for (let i = 0; i < count; i++) {
                result[result.length]=content(i);
            }
        }
        return result;
    }
    let createHole = makeArray(10000, function (i) { return i * 110; });

    createHole.forEach(function(element){
        if (element > 330) {
            if (Math.random() < 0.5) {
                let holeWid=Math.random();
                if(holeWid<0.5){
                    myObstacle[myObstacle.length]=new createComponent(50, 90, "black", element + 20, 0)
                }
                else{
                    myObstacle[myObstacle.length]=new createComponent(70, 90, "black", element + 20, 0)
                }
            }
            else{
                let holeWid=Math.random();
                if(holeWid<0.5){
                    myObstacle[myObstacle.length]=new createComponent(50, 90, "black", element + 20, 180)
                }
                else{
                    myObstacle[myObstacle.length]=new createComponent(70, 90, "black", element + 20, 180)
                }

            }
        }
    })
    border = new createComponent(10, 90, "brown", 0, 180);
    lowerBorder = new createComponent(10, 90, "brown", 0, 0);
    myGameArea.start();
    document.getElementById("highH2").style.display="block";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("homeButton").style.display = "none";
    document.getElementById("welcomeText").style.display = "none";
   
}
function updateGameArea() {
    myGameArea.clear();
    myGameArea.scoreCount += 1;
    lowerBorder.width += 120;
    lowerBorder.update()
    border.width += 120;
    border.update();
    for (let i = 0; i < myObstacle.length; i++) {
                 myObstacle[i].x += -1;
                 myObstacle[i].update();
    }
    // if(myGameArea.scoreCount>800 && myGameArea.scoreCount<=1500 ){
    //     for (let i = 0; i < myObstacle.length; i++) {
    //         myObstacle[i].x += -2;
    //         myObstacle[i].update();
    //     }
    // }
    // else if(myGameArea.scoreCount>1500 && myGameArea.scoreCount<=2000 ){
    //     for (let i = 0; i < myObstacle.length; i++) {
    //         myObstacle[i].x += -3;
    //         myObstacle[i].update();
    //     }
    // }
    // else{
    //     for (let i = 0; i < myObstacle.length; i++) {
    //         myObstacle[i].x += -1;
    //         myObstacle[i].update();
    //     }
    // }
    

    
    myScore.text = `Score : ${myGameArea.scoreCount}`
    myScore.update();
    myGamePiece.update();
    
    for (i = 0; i < myObstacle.length; i += 1) {
        if (myGamePiece.touchHole(myObstacle[i])) {
            myMusic.stop();
            myGameArea.stopGame();
            mySound.play();
            let btn = document.createElement("BUTTON");
            btn.setAttribute("id", "restart");
            document.querySelector("canvas").style.opacity="0.5";

            btn.addEventListener('click', function (event) {

                location.reload();
            });
            
            btn.innerHTML = "BACK";
            document.getElementById("parentElement").appendChild(btn);
            if (highScore < myGameArea.scoreCount) {
                localStorage.setItem("highScore1", myGameArea.scoreCount)
            }
            return;
        }
    }           
}
function moveup() {
    myGamePiece.y = 90;
}

function movedown() {
    myGamePiece.y = 160;
}

let highScore = localStorage.getItem("highScore1");
    if(highScore !== null ){
        highScore=localStorage.getItem("highScore1")
    }else{
        highScore=0;
    }
let highInsertSelect=document.getElementById("highInsert");
let txt=document.createTextNode(`${highScore}`);
highInsertSelect.appendChild(txt);


function soundRepeat(src) {
    this.soundRepeat = document.createElement("audio");
    this.soundRepeat.src = src;
    this.soundRepeat.setAttribute("preload", "auto");
    this.soundRepeat.setAttribute("controls", "none");
    this.soundRepeat.style.display = "none";
    this.soundRepeat.loop=true;
    this.soundRepeat.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    document.body.appendChild(this.soundRepeat);
    this.play = function(){
      this.soundRepeat.play();
    }
    this.stop = function(){
      this.soundRepeat.pause();
    }
  }

  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

