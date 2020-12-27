var character = document.getElementById("character");
var topTimer = document.getElementById("timer");
var start = document.getElementById("start");
var lost = document.getElementById("lost");
var speaker = document.getElementById("speaker");
var fishSound = document.getElementById("fishSound");
var fireSound = document.getElementById("fireSound");
var mouseSound = document.getElementById("mouseSound");
var music = document.getElementById("music");
music.volume = 0.1;
var interval; //interval for how long flamingo is moving
var both = 0; //var for if both keys are down
var count = 0;
var flameArr = []; //array that holds the fireballs numbers (ex: fire1, fire2 would hold 1, 2)
var livesCounter = 3;
var seconds = 0;
var timeCount = 0; //the number the timer is displaying
var speed = 0.9; //speed of the fireballs falling

start.addEventListener("click", startGame);
function startGame () {
    //game set up
    mouseSound.play();
    music.play();
    music.addEventListener("ended", function(){
        music.play();
    });
    speaker.addEventListener("click", pauseMusic);
    function pauseMusic () {
        mouseSound.play();
        if (speaker.getAttribute("src") == "soundOn.png") {
            music.pause();
            speaker.setAttribute("src", "soundOff.png");
        } else if (speaker.getAttribute("src") == "soundOff.png") {
            music.play();
            speaker.setAttribute("src", "soundOn.png");
        }
    }
    character.style.left ="215px";
    document.addEventListener('keyup', event => {
      if (event.code === 'Space') {
        mouseSound.play();
        location.reload();
      }
    });
    document.getElementById("welcome").style.display = "none";
    document.getElementById("instruc").style.display = "none";
    document.getElementById("start").style.display = "none";
    
    //starting timer
    function add() {
        seconds++;
        topTimer.textContent = seconds;
        timeCount++;
        if(timeCount % 10 == 0) {
            speed = speed + 0.1;
            console.log(speed);
        }
    }
    var timeInterval = setInterval(add, 1000);
    
    //functions to make flamingo move
    function moveLeft() {
        var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        if (left > -5) {
            document.getElementById("flamingo").setAttribute("src", "flamingo.png");
            character.style.left = left - 2 + "px";
        }
    }
    function moveRight() {
        var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        if (left < 405) {
            document.getElementById("flamingo").setAttribute("src", "flamingoFaceRight.png");
            character.style.left = left + 2 + "px";
        }
    }
    document.addEventListener("keydown", event => {
        if (both == 0) {
            both++;
            if (event.key === "ArrowLeft") {
                interval = setInterval(moveLeft, 1);
            }
            if (event.key === "ArrowRight") {
                interval = setInterval(moveRight, 1);
            }
        }
    });
    document.addEventListener("keyup", event => {
        clearInterval(interval);
        both = 0;
    });
    
    //function to determine how many hearts get shown
    function lives() {
        if (livesCounter == 3){
        document.getElementById("heart1").style.opacity = 1;
        document.getElementById("heart2").style.opacity = 1;
        document.getElementById("heart3").style.opacity = 1;
    } else if (livesCounter == 2) {
        document.getElementById("heart1").style.opacity = 1;
        document.getElementById("heart2").style.opacity = 1;
        document.getElementById("heart3").style.opacity = 0;
    } else if (livesCounter == 1) {
        document.getElementById("heart1").style.opacity = 1;
        document.getElementById("heart2").style.opacity = 0;
        document.getElementById("heart3").style.opacity = 0;
    } else if (livesCounter == 0){
        document.getElementById("heart1").style.opacity = 0;
        document.getElementById("heart2").style.opacity = 0;
        document.getElementById("heart3").style.opacity = 0;
        lost.innerHTML = "You died! You lasted " + seconds + " seconds!<br/>Press space to try again";
        lost.style.visibility = "visible";
        clearInterval(fullGame);
        clearInterval(timeInterval);
        }   
    }
    
    //function that creates and deletes fireballs and keeps them moving, and determine if flamingo is hit
    var fullGame = setInterval(function() {
        if (count > 0) {
            var lastFireCreated = document.getElementById("fire"+(count-1));
            if (parseFloat(window.getComputedStyle(lastFireCreated).getPropertyValue("top")) - 80 > -100) {
                var fire = document.createElement("img");
                fire.setAttribute("src", "fireball.png");
                fire.setAttribute("class", "fire");
                fire.setAttribute("id", "fire"+count);
                game.appendChild(fire);
                var random = Math.floor(Math.random() * 455) + 35;
                fire.style.left = random + "px";
                fire.style.top = parseFloat(window.getComputedStyle(lastFireCreated).getPropertyValue("top")) - 80 + "px";
                flameArr.push(count);
                count++;
                if (count%20 == 0) {
                    fire.setAttribute("src", "fish.png");
                }
            }
        } else {
            var fire = document.createElement("img");
            fire.setAttribute("src", "fireball.png");
            fire.setAttribute("class", "fire");
            fire.setAttribute("id", "fire"+count);
            game.appendChild(fire);
            var random = Math.floor(Math.random() * 455) + 35;
            fire.style.left = random + "px";
            flameArr.push(count);
            count++;
        }
        
        //moves fireballs down and deletes them once they reach bottom
        for (var i = 0; i < flameArr.length; i++) {
            let current = flameArr[i];
            let iFire = document.getElementById("fire"+current);
            iFire.style.top = parseFloat(window.getComputedStyle(iFire).getPropertyValue("top")) + speed + "px";
            if ((parseFloat(window.getComputedStyle(iFire).getPropertyValue("top")) + speed) > 170) {
                flameArr.shift();
                iFire.remove();
            }
        }
        
        //determines if flamingo is hit with fish or fire adds/subtracts lives
        for (var i = 0; i < flameArr.length; i++) {
            let current = flameArr[i];
            fireBall = document.getElementById("fire"+current);
            topOfFire = parseFloat(window.getComputedStyle(fireBall).getPropertyValue("top"));
            leftOfFire = (fireBall.getBoundingClientRect()).left;
            characterLeft = (character.getBoundingClientRect()).left + 13;
            if (topOfFire >= 90) {
                if (topOfFire <= 109) {
                    if (((leftOfFire) >= characterLeft) && (leftOfFire < (characterLeft + 53))) {
                        flameArr.shift();
                        fireBall.remove();
                        if (fireBall.getAttribute("src") == "fish.png") {
                            if (livesCounter <= 2) {
                                fishSound.play();
                                livesCounter++;
                            }
                        } else {
                            fireSound.play();
                            livesCounter--;
                        }
                        lives();
                    }
                } else {
                    if (((leftOfFire) >= characterLeft) && (leftOfFire < (characterLeft + 68))) {
                        flameArr.shift();
                        fireBall.remove();
                        if (fireBall.getAttribute("src") == "fish.png") {
                            if (livesCounter <= 2) {
                                fishSound.play();
                                livesCounter++;
                            }
                        } else {
                            fireSound.play();
                            livesCounter--;
                        }
                        lives();
                    }
                }
            }
        }
    },1);
}
