document.addEventListener("DOMContentLoaded", function () {
    const tleftDisplay = document.getElementById("time-left");
    const playPause = document.getElementById("start_stop");

    let sessionTime = 1;
    let sessionTimeSec = sessionTime * 60;
    let isPlaying = false;
    let timeInterval;

    function updateDisplay() {
      const minutes = Math.floor(sessionTimeSec / 60);
      let seconds =  sessionTimeSec % 60;
      // Add leading zeros to minutes & seconds if necessary
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

      // Handle special case: display "00:00" when both minutes & seconds are 0
      if (minutes === 0 && seconds === 0) {
          tleftDisplay.innerHTML = "00:00";
      } else {
          tleftDisplay.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
      } 
    }
    function startTimer() {
      if(!isPlaying){
        isPlaying = true;
        timeInterval = setInterval(updateTimer, 1000);
      }
    };
    function stopTimer() {
      if(isPlaying){
        clearInterval(timeInterval);
        isPlaying = false;
      }
    };
    function updateTimer() {
      if (isPlaying) {
        if (sessionTimeSec > 0) {
          sessionTimeSec--;
          updateDisplay();
        }
        // if (sessionTimeSec === 0) {
        //   clearInterval(timeInterval);
        //   isPlaying = false;
        //   // sessionTimeSec = sessionTime * 60;
        //   updateDisplay();
        // }
      }
    }
    playPause.addEventListener("click", function () {
      if (!isPlaying) {
        playPause.classList.toggle("play-pause");
        startTimer();
      } else if (isPlaying) {
        playPause.classList.add("play-pause");
        stopTimer();
      }
    });

  });