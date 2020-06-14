var total_time = document.currentScript.getAttribute("totalTime");
let seconds_left = total_time;
let callback = null;

const alarmAudio = new Audio("/sounds/timer-alarm.mp3");

printTime(seconds_left);

function stopTimer() {
  document.getElementById("timer-display").classList.remove('timer-ended');
  alarmAudio.pause();
  document.getElementById("timer-toggler").innerHTML = "Iniciar";
  clearInterval(callback);
  callback = null;
}

function callbackFun() {
  seconds_left -= 1;
  printTime(seconds_left);
  if( seconds_left == 0 ){
    document.getElementById("timer-display").classList.add('timer-ended');
    document.getElementById("timer-toggler").classList.add('toggler-hidden');
    alarmAudio.play();
    alarmAudio.fastSeek(0);
    clearInterval(callback);
  }
}

function printTime(seconds) {
  const hours = Math.floor(seconds / (3600));
  seconds -= hours*3600;
  const minutes = Math.floor(seconds / (60));
  seconds -= minutes*60;
  document.getElementById("timer-display").innerHTML = (
    hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ":" +
    minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ":" +
    seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) 
  );
}

function toggleTimer() {
  if( !callback ) {
    document.getElementById("timer-toggler").innerHTML = "Pausar";
    callback = setInterval(callbackFun, 1000);
  } else {
    stopTimer();
  }
}

function resetTimer() {
  document.getElementById("timer-toggler").classList.remove('toggler-hidden');
  seconds_left = total_time;
  printTime(seconds_left);
  stopTimer();
}



