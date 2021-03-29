var today = moment();
var currentDate = today.format("M/D/YYYY");

$('#searchBtn').click(function(event){
    event.preventDefault();
    var searchEntry = $('#inputCity').val();
    var searchCity = searchEntry.trim();
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchCity + '&appid=6aa2659bc92118766e2e14cd0b16066e&units=imperial';

    fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        $('#cityHighlight').css('display', 'block');
        $('#cityName').text(data.city.name + ' (' + currentDate + ') ');
        $('#cityTemp').text('Temperature: ' + data.list[0].main.temp + ' \xB0F');
        $('#cityHumid').text('Humidity: ' + data.list[0].main.humidity + '%');
        $('#cityWind').text('Wind Speed: ' + data.list[0].wind.speed + ' MPH');

        var cityLat = data.city.coord.lat;
        var cityLon = data.city.coord.lon;
        oneCallSearch(cityLat, cityLon);
      });
});

function oneCallSearch(latitude, longitude) {
  oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly,alerts&appid=6aa2659bc92118766e2e14cd0b16066e';
  
  fetch(oneCallUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        $('#cityUV').text('UV Index: ' + data.current.uvi);
      });

}

