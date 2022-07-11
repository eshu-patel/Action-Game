score = 0;  // initial score
cross = true;

audio = new Audio('music.mp3');  // plays until game continues(dino doesn't collides with obstacle)
audiogo = new Audio('gameover.mp3');   //plays when gam overs(dino collides with obstacle)
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {  // onKeydown event gets triggered whenever we press a key
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {   
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');  // jumping the dino when we press "^"
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');  // removing dino class so that now animation from dino is removed so that it can't move as game is over
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 115 + "px";  // moving dino forward by 115 px on pressing '>'
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 115) + "px";  // moving dino backward by 115 px on pressing '<'
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));  // getting the left value of dino
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));   // getting the bottom value of dino
    // we'll get values in px to convert them to integer we are using parseInt()

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));  // getting the left value of obstacle
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));   // getting the bottom value of obstacle

    offsetX = Math.abs(dx - ox);  // x-distance between dino and obstacle
    offsetY = Math.abs(dy - oy);  // y-distance between dino and obstacle
    
    if (offsetX < 73 && offsetY < 52) {
        gameOver.classList.add("out");
        dino.classList.add("out-bottom");
        dino.classList.remove("dino");  
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
        if(score>1){
            score-=1;    // as offset <73 => offset <145 also so our score will increase but actually the dinocollides so score shouldn't increase so that's why we are decreasing our score by 1
            updateScore(score);
        }
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        setTimeout(()=>{
            updateScore(score);
        },500)
        
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            if(aniDur>0.2){    
                newDur = aniDur - 0.1;
            }      // increasing speed of obstacle as score is increasing
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }
}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}