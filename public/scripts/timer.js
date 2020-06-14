var total_time = document.currentScript.getAttribute("totalTime");
let seconds_left = total_time;
let callback = null;

printTime(seconds_left);

function callbackFun() {
  if( seconds_left > 0 ) {
    seconds_left -= 1;
    printTime(seconds_left);
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
    document.getElementById("timer-toggler").innerHTML = "Iniciar";
    clearInterval(callback);
    callback = null;
  }
}

function resetTimer() {
  seconds_left = total_time;
  printTime(seconds_left);
  clearInterval(callback);
  callback = setInterval(callbackFun, 1000);
}



