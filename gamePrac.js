var character = document.getElementById("character");
var topTimer = document.getElementById("timer");
var interval;
var both = 0;
var count = 0;
var flameArr = [];
var livesCounter = 3;
var seconds = 0;
var timeCount = 0;
var x = 0.5;
function add() {
    seconds++;
    topTimer.textContent = seconds;
    timeCount++;
    if(timeCount%10 == 0) {
        x = x + 0.1;
    }
}
setInterval(add, 1000);
function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > -5) {
        //document.getElementById("flamingo").setAttribute("src", "flam.gif");
        character.style.left = left - 2 + "px";
    }
}
function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < 405) {
        //document.getElementById("flamingo").setAttribute("src", "flam.gif");
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
    //document.getElementById("flamingo").setAttribute("src", "flamingo.png");
    clearInterval(interval);
    both = 0;
});

setInterval(function() {
    if (count > 0) {
        var lastFireCreated = document.getElementById("fire"+(count-1));
        if (parseFloat(window.getComputedStyle(lastFireCreated).getPropertyValue("top")) - 100 > -100) {
            var fire = document.createElement("img");
            fire.setAttribute("src", "fireball.png");
            fire.setAttribute("class", "fire");
            fire.setAttribute("id", "fire"+count);
            game.appendChild(fire);
            var random = Math.floor(Math.random() * 460) + 55;
            fire.style.left = random + "px";
            fire.style.top = parseFloat(window.getComputedStyle(lastFireCreated).getPropertyValue("top")) - 100 + "px";
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
        var random = Math.floor(Math.random() * 460) + 55;
        fire.style.left = random + "px";
        flameArr.push(count);
        count++;
    }
    for (var i = 0; i < flameArr.length; i++) {
        let current = flameArr[i];
        let iFire = document.getElementById("fire"+current);
        iFire.style.top = parseFloat(window.getComputedStyle(iFire).getPropertyValue("top")) + x + "px";
        if ((parseFloat(window.getComputedStyle(iFire).getPropertyValue("top")) + x) > 170) {
            flameArr.shift();
            iFire.remove();
        }
    }
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
                            livesCounter++;
                        }
                    } else {
                        livesCounter--;
                    }
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
                        alert("You loose! You lasted " + seconds + " seconds!");
                    }
                }
                
            } else {
                if (((leftOfFire) >= characterLeft) && (leftOfFire < (characterLeft + 68))) {
                    flameArr.shift();
                    fireBall.remove();
                    if (fireBall.getAttribute("src") == "fish.png") {
                        if (livesCounter <= 2) {
                            livesCounter++;
                        }
                    } else {
                        livesCounter--;
                    }
                    if (livesCounter == 3) {
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
                        alert("You loose! You lasted " + seconds + " seconds!");
                    }
                }
            }
        }
        
    }
},1);
