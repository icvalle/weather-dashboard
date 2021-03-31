var today = moment();
var currentDate = today.format("M/D/YYYY");
var forecastDay1 = moment().add(1, 'day').format("M/D/YYYY");
var forecastDay2 = moment().add(2, 'days').format("M/D/YYYY");
var forecastDay3 = moment().add(3, 'days').format("M/D/YYYY");
var forecastDay4 = moment().add(4, 'days').format("M/D/YYYY");
var forecastDay5 = moment().add(5, 'days').format("M/D/YYYY");

$('#searchBtn').click(function(event){
    event.preventDefault();
    var searchEntry = $('#inputCity').val();
    var searchCity = searchEntry.trim();
    $('#cityList').append('<li class="list-group-item">' + searchCity + '</li>');
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchCity + '&appid=6aa2659bc92118766e2e14cd0b16066e&units=imperial';
    currentWeather(weatherUrl);
    
});

function currentWeather(url) {
  fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        $('#cityHighlight').css('display', 'block');
        $('#forecast5Days').css('display', 'flex');
        var iconCode = data.list[0].weather[0].icon;
        var weatherIcon = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';
        $('#cityName').text(data.city.name + ' (' + currentDate + ')').append('<img src="' + weatherIcon + '" width="60px" height="auto">');
        $('#cityTemp').text('Temperature: ' + data.list[0].main.temp + ' \xB0F');
        $('#cityHumid').text('Humidity: ' + data.list[0].main.humidity + '%');
        $('#cityWind').text('Wind Speed: ' + data.list[0].wind.speed + ' MPH');
        var cityLat = data.city.coord.lat;
        var cityLon = data.city.coord.lon;
        oneCallSearch(cityLat, cityLon);
      });
}

function oneCallSearch(latitude, longitude) {
  oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly,alerts&appid=6aa2659bc92118766e2e14cd0b16066e&units=imperial';
  
  fetch(oneCallUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        if (data.current.uvi < 4) {
          $('#cityUV').text('UV Index: ').append('<span id="uvBg" class="favorable">' + data.current.uvi + '</span>');
        } else if (data.current.uvi >= 4 && data.current.uvi <= 6) {
          $('#cityUV').text('UV Index: ').append('<span id="uvBg" class="moderate">' + data.current.uvi + '</span>');
        } else {
          $('#severe').text('UV Index: ').append('<span id="uvBg" class="favorable">' + data.current.uvi + '</span>');
        }

        var iconCode1 = data.daily[1].weather[0].icon;
        var day1Icon = 'https://openweathermap.org/img/wn/' + iconCode1 + '@2x.png';
        $('#day1').text(forecastDay1).append('<br>' + '<img src="' + day1Icon + '" width="50px" height="auto">');
        $('#day1Temp').text('Temp: ' + data.daily[1].temp.day + ' \xB0F');
        $('#day1Humid').text('Humidity: ' + data.daily[1].humidity + '%');

        var iconCode2 = data.daily[2].weather[0].icon;
        var day2Icon = 'https://openweathermap.org/img/wn/' + iconCode2 + '@2x.png';
        $('#day2').text(forecastDay2).append('<br>' + '<img src="' + day2Icon + '" width="50px" height="auto">');
        $('#day2Temp').text('Temp: ' + data.daily[2].temp.day + ' \xB0F');
        $('#day2Humid').text('Humidity: ' + data.daily[2].humidity + '%');

        var iconCode3 = data.daily[3].weather[0].icon;
        var day3Icon = 'https://openweathermap.org/img/wn/' + iconCode3 + '@2x.png';
        $('#day3').text(forecastDay3).append('<br>' + '<img src="' + day3Icon + '" width="50px" height="auto">');
        $('#day3Temp').text('Temp: ' + data.daily[3].temp.day + ' \xB0F');
        $('#day3Humid').text('Humidity: ' + data.daily[3].humidity + '%');

        var iconCode4 = data.daily[4].weather[0].icon;
        var day4Icon = 'https://openweathermap.org/img/wn/' + iconCode4 + '@2x.png';
        $('#day4').text(forecastDay4).append('<br>' + '<img src="' + day4Icon + '" width="50px" height="auto">');
        $('#day4Temp').text('Temp: ' + data.daily[4].temp.day + ' \xB0F');
        $('#day4Humid').text('Humidity: ' + data.daily[4].humidity + '%');

        var iconCode5 = data.daily[5].weather[0].icon;
        var day5Icon = 'https://openweathermap.org/img/wn/' + iconCode5 + '@2x.png';
        $('#day5').text(forecastDay5).append('<br>' + '<img src="' + day5Icon + '" width="50px" height="auto">');
        $('#day5Temp').text('Temp: ' + data.daily[5].temp.day + ' \xB0F');
        $('#day5Humid').text('Humidity: ' + data.daily[5].humidity + '%');

      });

}

