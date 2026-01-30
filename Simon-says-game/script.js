// Simon says game

let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");
 
document.addEventListener("keypress",function(){
    if(started==false){
        started = true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // random btn choose
    let randomIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randomIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}
function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(function(){
                levelUp()
            }, 500);
        }
    }
    else{
        let highest = localStorage.getItem("highestScore") || 0;
            if(level>highest){
                highest = level;
                localStorage.setItem("highestScore",highest);
            }
        h2.innerHTML = `Game over!Your score was <b>${level}<b><br>Your highest score is ${highest}<br>  Press any key to start`;
        document.body.classList.add("game-over");
            setTimeout(() => {
                document.body.classList.remove("game-over");
            }, 500);

        reset();
    }
}
function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}