let defaultCountdownDate = '1 Jan 2025';



const daysEl = document.getElementById('days');

const hoursEl = document.getElementById('hours');

const minutesEl = document.getElementById('minutes');

const secondsEl = document.getElementById('seconds');

const countdownTitle_i = document.getElementById('countdownTitle');

const countdownDate_i = document.getElementById('countdownDate');

const startButton_b = document.getElementById('startButton');




startButton_b.addEventListener('click',() => {

    // const countdownTitleText_p = document.getElementById('countdownTitleText');

    defaultCountdownDate = countdownDate_i.value 

    document.getElementById('countdownTitleText').innerHTML = countdownTitle_i.value 

    startButton_b.disabled = true;

    countdownDate_i.style.display = 'none';

    countdownTitle_i.style.display = 'none';

    countDown();
 });







function countDown() {
    const defaultCountdownDateDate = new Date(defaultCountdownDate);

    const currentDate = new Date();

    const totalSeconds = (defaultCountdownDateDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);

    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    
    const minutes = Math.floor((totalSeconds / 60 ) % 24 ) % 60;

    const seconds = Math.floor(totalSeconds) % 60;


    
    daysEl.innerHTML = days;
    
    hoursEl.innerHTML = hours;
    
    minutesEl.innerHTML = minutes;   
    
    secondsEl.innerHTML = seconds;

}


function formatTime(time){

    return time < 10  ? `0${time}` : time;

}



// initial call 

countDown();


setInterval(countDown, 1000)



