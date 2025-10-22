const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values:{
        gameVelocity: 1000,
        hitPosition:0,
        result:0,
        currentTime: 60,
    },
    actions:{
        timerID: setInterval(randomSquare, 1000), // a função cria um intervalo de tempo onde de tempo em tempo o randomSqaure é chamado, mundando a posição do enemy,
        countDownTimerId: setInterval(countDown, 1000)        
    }
};

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() *9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id
}

function addListenerHitBox(){
   let audio;
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if (square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                let audio = new Audio("./src/audios/hit.m4a");
                audio.volume = 0.1;
                audio.play();
            }
        })
    })
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;



    if (state.values.currentTime <= 0){
        clearInterval(state.actions.timerID);          // para o movimento do inimigo
        clearInterval(state.actions.countDownTimerId); // para o contador
        alert("Game Over! Sua pontuação foi: " + state.values.result);
    
    }


}
function init() {
    addListenerHitBox();
}

init();