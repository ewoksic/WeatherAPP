let appId = '108f6547a8199c51eea80ecc0bafd9fc';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';


}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm)
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("Clear.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("Cloudy.jpg")';

            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("Rain.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("Storm.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("Snow.jpg")';
            break;


    }
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let huminityElement = document.getElementById('huminity');
    let whindSpeedElement = document.getElementById('whindSpeed');
    let cityHeaderElement = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = resultFromServer.main.temp + '&#176';
    whindSpeedElement.innerHTML = 'Winds at ' + resultFromServer.wind.speed + 'm/s';
    cityHeaderElement.innerHTML = resultFromServer.name;
    huminityElement.innerHTML = 'Humidity levels are ' + resultFromServer.main.humidity + ' %';
    setPositionForWeatherInfo();
}
function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
    weatherContainer.style.visibility = 'visible';

}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);

})
