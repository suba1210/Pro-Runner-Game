let events,randScore=-201;
let image = document.getElementById('source');
let powerImage= document.getElementById("power");
let movingImg=document.getElementById("movingObstacle");
let movingImg1=document.getElementById("obstacle2");
let moving=[],moving1=[];
let mySound;
let myMusic;
function createComponent(width, height, color, x, y, type) {
    this.width = width;
    this.type = type;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.angle = 0;
    this.x = x;
    this.y = y;
    this.dy=0.5;
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
           
        }
        else if(this.type=="image"){
        ctx.save();
        ctx.translate(this.x+7, this.y+10);        
        ctx.rotate(this.angle);  
        ctx.drawImage(image,this.width/-2,this.height/-2, this.width, this.height);     
        ctx.restore(); 
        } 
        else if(this.type=="powerImage"){
            ctx.drawImage(powerImage,this.x, this.y, this.width, this.height);
        }
        else if(this.type=="movingImg"){
            ctx.drawImage(movingImg,this.x, this.y, this.width, this.height);
        }
        else if(this.type=="movingImg1"){
            ctx.drawImage(movingImg1,this.x, this.y, this.width, this.height);
        }
        else {
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
let powerUp=[];
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
    myGamePiece = new createComponent(20, 20, "#f09516", 50, 160,"image");
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
            let randomNum = Math.random();
            if(randomNum<0.1){
                if(Math.random()<0.5){
                    powerUp[powerUp.length]= new createComponent(20,20,"#f09516",element+150,90, "powerImage");
                }else{
                    powerUp[powerUp.length]= new createComponent(20,20,"#f09516",element+150,160, "powerImage");

                }               
            }
            else if (randomNum>=0.1 && randomNum < 0.5) {
                let holeWid=Math.random();
                if(holeWid<0.5){
                    myObstacle[myObstacle.length]=new createComponent(50, 90, "black", element + 20, 0)
                }
                else{
                    myObstacle[myObstacle.length]=new createComponent(70, 90, "black", element + 20, 0)
                }
            }
            else if(randomNum>=0.5 && randomNum<0.9){
                let holeWid=Math.random();
                if(holeWid<0.5){
                    myObstacle[myObstacle.length]=new createComponent(50, 90, "black", element + 20, 180)
                }
                else{
                    myObstacle[myObstacle.length]=new createComponent(70, 90, "black", element + 20, 180)
                }
            }
            else if(randomNum>=0.9 && randomNum<0.95){
                moving[moving.length]= new createComponent(20,20,"#f09516",element+150,90,"movingImg");
            }
            else if(randomNum>=0.95){
                moving1[moving1.length]= new createComponent(20,20,"#f09516",element+150,90,"movingImg1");
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
    speedControl(1);
    myScore.text = `Score : ${myGameArea.scoreCount}`
    myScore.update();
    myGamePiece.update();



    for (let i = 0; i < moving.length; i++) {
        moving[i].x+=-1;
        moving[i].y+=moving[i].dy;
     if(moving[i].y>160 || moving[i].y<90){
            moving[i].dy *= -1;
        }
        moving[i].update();
    }

    for (let i = 0; i < moving1.length; i++) {
        moving1[i].x+=-1;
        moving1[i].y+=moving1[i].dy;
    if(moving1[i].y>160 || moving1[i].y<90){
        moving1[i].dy *= -1;
        }
        moving1[i].update();
    }



    for (i = 0; i < myObstacle.length; i++) {
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
                localStorage.setItem("highScore", myGameArea.scoreCount)
            }
            return;
        }
    }


    for (let i = 0; i < moving.length; i++){
        if(myGamePiece.touchHole(moving[i])){
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
                localStorage.setItem("highScore", myGameArea.scoreCount)
            }
            return;
        }
    }

    for (let i = 0; i < moving1.length; i++){
        if(myGamePiece.touchHole(moving1[i])){
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
                localStorage.setItem("highScore", myGameArea.scoreCount)
            }
            return;
        }
    }





    for(let i=0;i<powerUp.length;i++){
        if(myGamePiece.touchHole(powerUp[i])){
            randScore=myGameArea.scoreCount;
        }
    }
    if(myGameArea.scoreCount<randScore+200){
        events=0;
    }
    else{
        events=1
    }
    speedControl(events);
}
function moveup() {
    myGamePiece.y = 90;
    myGamePiece.angle += 180 * Math.PI / 180;
}

function movedown() {
    myGamePiece.y = 160;
    myGamePiece.angle += 180 * Math.PI / 180;
}

let highScore = localStorage.getItem("highScore");
    if(highScore !== null ){
        highScore=localStorage.getItem("highScore")
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

function speedControl(e){

    if(e===1){
        if(myGameArea.scoreCount>700 && myGameArea.scoreCount<=2000){
            for (let i = 0; i < myObstacle.length; i++) {
                myObstacle[i].x += -2;
                myObstacle[i].update();
            }
        }
        else if(myGameArea.scoreCount>2000 && myGameArea.scoreCount<=3000 ){
            for (let i = 0; i < myObstacle.length; i++) {
                myObstacle[i].x += -2.5;
                myObstacle[i].update();
            }
        }
        else if(myGameArea.scoreCount>3000 && myGameArea.scoreCount<=4000){
            for (let i = 0; i < myObstacle.length; i++) {
                myObstacle[i].x += -3;
                myObstacle[i].update();
            }
        }
        else if(myGameArea.scoreCount>4000){
            for (let i = 0; i < myObstacle.length; i++) {
                myObstacle[i].x += -4;
                myObstacle[i].update();
            }
        }
        else{
            for (let i = 0; i < myObstacle.length; i++) {
                myObstacle[i].x += -1.5;
                myObstacle[i].update();
            }
        }



        if(myGameArea.scoreCount>700 && myGameArea.scoreCount<=2000){
            for (let i = 0; i < powerUp.length; i++) {
                powerUp[i].x += -2;
                powerUp[i].update();
            }
        }
        else if(myGameArea.scoreCount>2000 && myGameArea.scoreCount<=3000 ){
            for (let i = 0; i < powerUp.length; i++) {
                powerUp[i].x += -2.5;
                powerUp[i].update();
            }
        }
        else if(myGameArea.scoreCount>3000 && myGameArea.scoreCount<=4000 ){
            for (let i = 0; i < powerUp.length; i++) {
                powerUp[i].x += -3;
                powerUp[i].update();
            }
        }
        else if(myGameArea.scoreCount>4000){
            for (let i = 0; i < powerUp.length; i++) {
                powerUp[i].x += -4;
                powerUp[i].update();
            }
        }
        else{
            for (let i = 0; i < powerUp.length; i++) {
                powerUp[i].x += -1.5;
                powerUp[i].update();
            }
        }


        
        if(myGameArea.scoreCount>700 && myGameArea.scoreCount<=2000){
            for (let i = 0; i < moving.length; i++) {
                moving[i].x+=-1.5;
                moving[i].y+=moving[i].dy;
            if(moving[i].y>160 || moving[i].y<90){
                moving[i].dy *= -1;
             }
             moving[i].update();
            }
        }
        else if(myGameArea.scoreCount>2000 && myGameArea.scoreCount<=3000 ){
            for (let i = 0; i < moving.length; i++) {
                moving[i].x+=-2;
                moving[i].y+=moving[i].dy;
            if(moving[i].y>160 || moving[i].y<90){
                moving[i].dy *= -1;
             }
                moving[i].update();
            }
        }
        else if(myGameArea.scoreCount>3000 && myGameArea.scoreCount<=4000 ){
            for (let i = 0; i < moving.length; i++) {
                moving[i].x+=-2.5;
                moving[i].y+=moving[i].dy;
            if(moving[i].y>160 || moving[i].y<90){
                moving[i].dy *= -1;
             }
                moving[i].update();
            }
        }
        else if(myGameArea.scoreCount>4000){
            for (let i = 0; i < moving.length; i++) {
                moving[i].x+=-3.5;
                moving[i].y+=moving[i].dy;
            if(moving[i].y>160 || moving[i].y<90){
                moving[i].dy *= -1;
             }
                moving[i].update();
            }
        }
        else{
            for (let i = 0; i < moving.length; i++) {
                moving[i].x+=-1;
                moving[i].y+=moving[i].dy;
            if(moving[i].y>160 || moving[i].y<90){
                moving[i].dy *= -1;
             }
                moving[i].update();
            }
        }

        
        if(myGameArea.scoreCount>700 && myGameArea.scoreCount<=2000){
            for (let i = 0; i < moving1.length; i++) {
                moving1[i].x+=-1.5;
                moving1[i].y+=moving1[i].dy;
            if(moving1[i].y>160 || moving1[i].y<90){
                moving1[i].dy *= -1;
             }
             moving1[i].update();
            }
        }
        else if(myGameArea.scoreCount>2000 && myGameArea.scoreCount<=3000 ){
            for (let i = 0; i < moving1.length; i++) {
                moving1[i].x+=-2;
                moving1[i].y+=moving1[i].dy;
            if(moving1[i].y>160 || moving1[i].y<90){
                moving1[i].dy *= -1;
             }
                moving1[i].update();
            }
        }
        else if(myGameArea.scoreCount>3000 && myGameArea.scoreCount<=4000 ){
            for (let i = 0; i < moving1.length; i++) {
                moving1[i].x+=-2.5;
                moving1[i].y+=moving1[i].dy;
            if(moving1[i].y>160 || moving1[i].y<90){
                moving1[i].dy *= -1;
             }
                moving1[i].update();
            }
        }
        else if(myGameArea.scoreCount>4000){
            for (let i = 0; i < moving1.length; i++) {
                moving1[i].x+=-3.5;
                moving1[i].y+=moving1[i].dy;
            if(moving1[i].y>160 || moving1[i].y<90){
                moving1[i].dy *= -1;
             }
                moving1[i].update();
            }
        }
        else{
            for (let i = 0; i < moving1.length; i++) {
                moving1[i].x+=-1;
                moving1[i].y+=moving1[i].dy;
            if(moving1[i].y>160 || moving1[i].y<90){
                moving1[i].dy *= -1;
             }
                moving1[i].update();
            }
        }
    }
    else{
        for (let i = 0; i < myObstacle.length; i++) {
            myObstacle[i].x += -0.5;
            myObstacle[i].update();
        }
        for (let i = 0; i < powerUp.length; i++) {
            powerUp[i].x += -0.5;
            powerUp[i].update();
        }
        for (let i = 0; i < moving.length; i++) {
            moving[i].x+=-0.3;
            moving[i].y+=moving[i].dy;
        if(moving[i].y>160 || moving[i].y<90){
            moving[i].dy *= -1;
            }
            moving[i].update();
        }
        for (let i = 0; i < moving1.length; i++) {
            moving1[i].x+=-0.3;
            moving1[i].y+=moving1[i].dy;
        if(moving1[i].y>160 || moving1[i].y<90){
            moving1[i].dy *= -1;
            }
            moving1[i].update();
        }
        
    }
}
