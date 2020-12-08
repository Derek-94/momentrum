const weather = document.querySelector(".js-weather");

const API_KEYS = "3523605f671c650939d2a45f0d11920d";
const COORDS = "coords";

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        //console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `🌡️  ${temperature}°c 
        📍 ${place}`;
    })
}

function saveCoords(coordsObject){
    localStorage.setItem(COORDS, JSON.stringify(coordsObject));
}

function handleGoeSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObject ={
        latitude:latitude,
        longitude: longitude
    };

    saveCoords(coordsObject);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cannot access geo location...");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGoeSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else{
        // getWeather.
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();