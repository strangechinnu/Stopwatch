// script.js

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

// Function to format time
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return (
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0') +
        ':' +
        String(milliseconds).padStart(2, '0')
    );
}

// Update display
function updateDisplay() {
    const currentTime = elapsedTime + (Date.now() - startTime);
    document.getElementById('display').textContent = formatTime(currentTime);
}

// Start the stopwatch
document.getElementById('startBtn').addEventListener('click', () => {
    if (!timerInterval) {
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
    }
});

// Pause the stopwatch
document.getElementById('pauseBtn').addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        elapsedTime += Date.now() - startTime;
    }
});

// Reset the stopwatch
document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    startTime = 0;
    elapsedTime = 0;
    laps = [];
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('lapList').innerHTML = '';
});

// Record a lap
document.getElementById('lapBtn').addEventListener('click', () => {
    const lapTime = elapsedTime + (timerInterval ? Date.now() - startTime : 0);
    laps.push(lapTime);
    const lapList = document.getElementById('lapList');
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
    lapList.appendChild(lapItem);
});
