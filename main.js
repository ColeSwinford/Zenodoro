//Timer variables/default config
const startingMinutes = 25;
let time = startingMinutes * 60;
const timerElement = document.getElementById("timer");
const minutes = Math.floor(time/60);
let seconds = time % 60;
seconds = seconds < 10 ? `0` + seconds : seconds;
timerElement.innerHTML = `${minutes}: ${seconds}`;

//Timer
function Timer(){
    timerInterval = setInterval(updateTimer, 1000);
    function updateTimer(){
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        seconds = seconds < 10 ? `0` + seconds : seconds;
        timerElement.innerHTML = `${minutes}: ${seconds}`;
        time--;
    }
};
//Restart Timer
function restartTimer(){
    killTimer = true;
    let time = startingMinutes * 60;
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds < 10 ? `0` + seconds : seconds;
    timerElement.innerHTML = `${minutes}: ${seconds}`;
};

//Controls
function pause(){
    document.getElementById('pause').style.display="none";
    document.getElementById('play').style.display="flex";
    clearInterval(timerInterval);
};
function play(){
    document.getElementById('play').style.display="none";
    document.getElementById('pause').style.display="flex";
    Timer();
};
function restart(){
    document.getElementById('pause').style.display="none";
    document.getElementById('play').style.display="flex";
    clearInterval(timerInterval);
    restartTimer();
    // the issue with the timer value not reseting after resuming seems to be due to the fact that we have don't have a global time value that's constantly being updated
};
function next(){
    alert('next works');
};