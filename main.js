focusMinutes = 50;
time = focusMinutes * 60;
minutes = Math.floor(time/60);
let seconds = time % 60;
const timerElement = document.getElementById("timer");
seconds = seconds < 10 ? `0` + seconds : seconds;
timerElement.innerHTML = `${minutes}: ${seconds}`;

//Running Status
timerRun = false;
coolDownRun = false;
function timerRunning(){
    coolDownRun = false;
    timerRun = true;
    return timerRun, coolDownRun;
}
function coolDownRunning(){
    timerRun = false;
    coolDownRun = true;
    return coolDownRun, timerRun;
}


//Clear Intervals
function clearIntervals(){
    return clearInterval(timerInterval);
}


//Focus Timer
function timer(){
    timerRunning();

    timerInterval = setInterval(updateTimer, 1000);
    function updateTimer(){
        if(time == -1){
            clearIntervals();
            coolDown();
        }
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        seconds = seconds < 10 ? `0` + seconds : seconds;
        timerElement.innerHTML = `${minutes}: ${seconds}`;
        time--;
    }
}
function resetTimer(){
    return time = focusMinutes * 60;
}

//Cooldown timer
function coolDown(){
    coolDownRunning();

    coolDownMinutes = 10;
    time = coolDownMinutes * 60;
    let seconds = time % 60;
    seconds = seconds < 10 ? `0` + seconds : seconds;

    timerInterval = setInterval(updateTimer, 1000);
    function updateTimer(){
        if(time == -1){
            clearIntervals();
            resetTimer();
            timer();
        }
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        seconds = seconds < 10 ? `0` + seconds : seconds;
        timerElement.innerHTML = `${minutes}: ${seconds}`;
        time--;
    }
}


//Controls
function pause(){
    document.getElementById('pause').style.display="none";
    document.getElementById('play').style.display="flex";
    clearIntervals();
};
function play(){
    document.getElementById('play').style.display="none";
    document.getElementById('pause').style.display="flex";
    timer();
};
function restart(){
    document.getElementById('pause').style.display="none";
    document.getElementById('play').style.display="flex";
    clearIntervals();
    resetTimer();
    timerElement.innerHTML = `${minutes}: ${seconds}`;
    return resetTimer();
};
function next(){
    if(timerRun == true){
        clearIntervals();
        return coolDown();
    }
    if(coolDownRun == true){
        clearIntervals();
        resetTimer();
        return timer();
    }
};