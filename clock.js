const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    // below line will make second that is lower than 10 one number. (1..2..)
    // clockTitle.innerHTML = `${hours}:${minutes}:${seconds}`;

    // Ternary operator!
    clockTitle.innerHTML = `${hours < 10 ? ("0" + hours) : (hours)}:${minutes < 10 ? ("0"+minutes) : (minutes)}:${seconds < 10 ? ("0"+seconds) : (seconds)}`;
}

// always set up init function! 
function init(){
   getTime();
   setInterval(getTime, 1000);
}

init();