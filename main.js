const timerElement = document.getElementById("timer");
focusMinutes = 50; // Default 50
coolDownMinutes = 10; // Default 10
time = focusMinutes * 60;
minutes = Math.floor(time/60);
let seconds = time % 60;
seconds = seconds < 10 ? `0` + seconds : seconds;
timerElement.innerHTML = `${minutes}:${seconds}`;
tabTimerElement = document.getElementById("tabTimer");
tabTimerElement.innerHTML = "Zenodoro | " + `${minutes}:${seconds}`;

//Running Status
timerRun = false;
coolDownRun = false;
function timerRunning(){
    timerRun = true;
    coolDownRun = false;

    return timerRun, coolDownRun;
}
function coolDownRunning(){
    timerRun = false;
    coolDownRun = true;

    return timerRun, coolDownRun;
}

// Alert
function sound(){
    let time = 0;
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds < 10 ? `0` + seconds : seconds;
    timerElement.innerHTML = `${minutes}:${seconds}`;
    tabTimerElement.innerHTML = "Zenodoro | &#9200;";
    audio = document.getElementById('zenAlert');
    audio.loop = true;
    audio.currentTime = 0;
    audio.play();
    alert("Timer has ended. Click 'OK' to start next timer.");
    audio.pause();

    if(timerRun == true){
        clearIntervals();
        return coolDown();
    }

    if(coolDownRun == true){
        clearIntervals();
        resetTimer();
        return timer();
    }
}

//Clear Intervals
function clearIntervals(){
    return clearInterval(timerInterval);
}

//Focus Timer
function timer(){
    timerRunning();

    // focusMinutes = 50;
    function updateTimer(){
        if(time == -1){
            clearIntervals();
            sound();
        }
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        seconds = seconds < 10 ? `0` + seconds : seconds;
        timerElement.innerHTML = `${minutes}:${seconds}`;
        tabTimerElement.innerHTML = "Zenodoro | " + `${minutes}:${seconds}`;
        time--;
    }
    updateTimer();
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}
function resetTimer(){
    time = focusMinutes * 60;
    minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds < 10 ? `0` + seconds : seconds;
    return minutes, seconds;
}

//Cooldown timer
function coolDown(){
    coolDownRunning();

    // coolDownMinutes = 10;
    time = coolDownMinutes * 60;
    let seconds = time % 60;
    seconds = seconds < 10 ? `0` + seconds : seconds;

    function updateTimer(){
        if(time == -1){
            clearIntervals();
            sound();
        }
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        seconds = seconds < 10 ? `0` + seconds : seconds;
        timerElement.innerHTML = `${minutes}:${seconds}`;
        tabTimerElement.innerHTML = "Zenodoro | " + `${minutes}:${seconds}`;
        time--;
    }
    updateTimer();
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}
function resetCoolDown(){
    time = coolDownMinutes * 60
    minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds < 10 ? `0` + seconds : seconds;
    return minutes, seconds;
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
    if(timerRun == true){
        clearIntervals();
        resetTimer();
        timerElement.innerHTML = `${minutes}:${seconds}`;
        tabTimerElement.innerHTML = "Zenodoro | " + `${minutes}:${seconds}`;
        return pause();
    }
    if(coolDownRun == true){
        clearIntervals();
        resetCoolDown();
        timerElement.innerHTML = `${minutes}:${seconds}`;
        tabTimerElement.innerHTML = "Zenodoro | " + `${minutes}:${seconds}`;
        return pause();
    }
};
function next(){
    if(timerRun == true){
        resetTimer();
        clearIntervals();
        resetTimer();
        coolDown();
        return restart();
    }
    if(coolDownRun == true){
        resetTimer();
        clearIntervals();
        resetTimer();
        timer();
        return restart();
    }
};

// Settings
function showSettings(){
    document.getElementById('cog').style.display="none";
    document.getElementById('cogPressed').style.display="flex";
    document.getElementById('settingsForm').style.display="flex"
}
function hideSettings(){
    document.getElementById('cog').style.display="flex";
    document.getElementById('cogPressed').style.display="none";
    document.getElementById('settingsForm').style.display="none"
}
function applySettings(){
    focusIn = document.getElementById('focus').value;
    restIn = document.getElementById('rest').value;
    focusMinutes = focusIn;
    coolDownMinutes = restIn;
    if(focusIn == ""){
        focusMinutes = 50;
    }
    if(restIn == ""){
        coolDownMinutes = 10;
    }
    hideSettings();
    return focusMinutes, coolDownMinutes, restart();
}