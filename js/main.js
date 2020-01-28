let xhr = new XMLHttpRequest();
let xhrFor = new XMLHttpRequest();
let weather;
let iconWeather;
let keyAPI = "8779cde84caa36148153944dafc08f86";
let currentCity = "Kharkiv";
let country = "ua";
let output = $("#output");
let country_code = 706483;
let currentWeather = {};
let forecastWeather = {};

let cityList = [
  {
    id: 706483,
    name: "Kharkiv",
    country: "UA",
    coord: {
      lon: 36.25,
      lat: 50
    }
  },
  {
    id: 707860,
    name: "Hurzuf",
    country: "UA",
    coord: {
      lon: 34.283333,
      lat: 44.549999
    }
  },
  {
    id: 519188,
    name: "Novinki",
    country: "RU",
    coord: {
      lon: 37.666668,
      lat: 55.683334
    }
  },
  {
    id: 1283378,
    name: "Gorkhā",
    country: "NP",
    coord: {
      lon: 84.633331,
      lat: 28
    }
  },
  {
    id: 1270260,
    name: "State of Haryāna",
    country: "IN",
    coord: {
      lon: 76,
      lat: 29
    }
  },
  {
    id: 708546,
    name: "Holubynka",
    country: "UA",
    coord: {
      lon: 33.900002,
      lat: 44.599998
    }
  },
  {
    id: 1283710,
    name: "Bāgmatī Zone",
    country: "NP",
    coord: {
      lon: 85.416664,
      lat: 28
    }
  }
];
let city = [];
let abbrCountry = [
  "af",
  "ar",
  "az",
  "bg",
  "ca",
  "cz",
  "da",
  "de",
  "el",
  "en",
  "eu",
  "fa",
  "fi",
  "fr",
  "gl",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "kr",
  "la",
  "lt",
  "mk",
  "no",
  "nl",
  "pl",
  "pt",
  "pt_br",
  "ro",
  "ru",
  "se",
  "sk",
  "sl",
  "sp",
  "sr",
  "th",
  "tr",
  "ua",
  "vi",
  "zh_cn",
  "zh_tw,zu"
];

let countryArr = [
  "Afrikaans",
  "Arabic",
  "Azerbaijani",
  "Bulgarian",
  "Catalan",
  "Czech",
  "Danish",
  "German",
  "Greek",
  "English",
  "Basque",
  "Farsi",
  "Finnish",
  "French",
  "Galician",
  "Hebrew",
  "Hindi",
  "Croatian",
  "Hungarian",
  "Indonesian",
  "Italian",
  "Japanese",
  "Korean",
  "Latvian",
  "Lithuanian",
  "Macedonian",
  "Norwegian",
  "Dutch",
  "Polish",
  "Portuguese",
  "Português Brasil",
  "Romanian",
  "Russian",
  "Swedish",
  "Slovak",
  "Slovenian",
  "Spanish",
  "Serbian",
  "Thai",
  "Turkish",
  "Ukrainian",
  "Vietnamese",
  "Chinese Simplified",
  "Chinese Traditional",
  "Zulu"
];

for (let i = 0; i < countryArr.length; i++) {
  if (countryArr[i] === "Ukrainian") {
    $("#country").append("<option selected>" + countryArr[i] + "</option>");
  }
  $("#country").append("<option>" + countryArr[i] + "</option>");
}

for (let i = 0; i < cityList.length; i++) {
  city.push(cityList[i].name);
  $("#city").append("<option>" + city[i] + "</option>");
}

console.log(city);
$("#table").remove();
currentAPI(currentCity, country);
forecastAPI(country_code);

$("#country")
  .change(function() {
    $("select option:selected").each(function() {
      for (let i = 0; i < countryArr.length; i++) {
        if ($(this).text() === countryArr[i]) {
          country = abbrCountry[i];
          console.log(country);
        }
      }
    });
  })
  .trigger("change");

$("#city")
  .change(function() {
    $("#city option:selected").each(function() {
      currentCity = $(this).text();
      for (let i = 0; i < cityList.length; i++) {
        if (cityList[i].name === currentCity) {
          country_code = cityList[i].id;
          console.log(country_code);
        }
      }
      console.log(currentCity);
    });
  })
  .trigger("change");

$("#btn").on("click", function() {
  currentCity = $("#city").val();
  for (let i = 0; i < countryArr.length; i++) {
    if ($("#country").val() === countryArr[i]) {
      country = abbrCountry[i];
    }
  }

  $("#temp").remove();

  $("#imgWeather").remove();
  $("#sun").remove();
  currentAPI(currentCity, country);
  forecastAPI(country_code);
});

function JSONDate(json) {
  let JSONObj = JSON.parse(json);
  return JSONObj;
}

function weatherMain(currentWeather) {
  weather = currentWeather.weather[0].main;
  iconWeather = currentWeather.weather[0].icon;
  return $("#icon").append(
    "<img  id='imgWeather' src='https://openweathermap.org/img/wn/" +
      iconWeather +
      "@2x.png' alt='" +
      weather +
      "'/>"
  );
}

function sunSet(currentWeather) {
  let sunrise = new Date(currentWeather.sys["sunrise"] * 1000);
  let hoursRise = sunrise.getHours();
  let minutesRise = sunrise.getMinutes();
  let secondsRise = sunrise.getSeconds();
  let sunset = new Date(currentWeather.sys["sunset"] * 1000);
  let hoursSet = sunset.getHours();
  let minutesSet = sunset.getMinutes();
  let secondsSet = sunset.getSeconds();
  return $("#currentSun").append(
    "<p id='sun'> Восход   " +
      hoursRise +
      ":" +
      minutesRise +
      ":" +
      secondsRise +
      " <br> Заход          " +
      hoursSet +
      ":" +
      minutesSet +
      ":" +
      secondsSet +
      "</p>"
  );
}

function currentTemp(currentWeather) {
  for (key in currentWeather) {
    return $("#currentTemp").append(
      "<p id='temp'>" +
        (currentWeather.main["temp"] - 273.15) +
        " °C<br>" +
        currentWeather.weather[0].description +
        "</p>"
    );
  }
}

function forecastTemp(forecastWeather) {
  $("#table").remove();
  $("table").append($("<tbody id='table'></tbody>"));
  let tableWeather = $("#table");
  //for (let key in forecastWeather) {
  for (let i = 0; i < forecastWeather.list.length; i++) {
    let d = new Date(forecastWeather.list[i].dt * 1000);
    let date = d.getDate();
    let mounth = d.getMonth();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let temper = forecastWeather.list[i].main.temp - 273.15;
    let weatherIcon = forecastWeather.list[i].weather[0].icon;
    let weatherDiscrip = forecastWeather.list[i].weather[0].description;
    tableWeather.append(
      "<tr class='myTable'> <td scope='row'>  " +
        date +
        "." +
        (mounth + 1) +
        "  </td><td>" +
        hours +
        ":" +
        minutes +
        "" +
        seconds +
        "</td><td>" +
        "<img  id='imgWeather' src='https://openweathermap.org/img/wn/" +
        weatherIcon +
        "@2x.png' alt='" +
        weatherDiscrip +
        "'/> <br> <p>" +
        weatherDiscrip +
        "</p></td><td>" +
        Math.floor(temper) +
        " °C         </td></tr>"
    );
  }
  //}
  return tableWeather;
}

function currentAPI(currentCity, country) {
  xhr.open(
    "GET",
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      currentCity +
      "," +
      country +
      "&APPID=" +
      keyAPI,
    true
  );
  xhr.timeout = 1000;
  xhr.ontimeout = function() {
    $("#currentWeather").textContent = "Превышено время ожидания";
  };
  xhr.send();

  $("#currentWeather").textContent = "Загругка....";
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    $("#currentTemp").textContent = "error";
    if (xhr.status >= 200 && xhr.status < 300) {
      currentWeather = JSONDate(xhr.responseText); //выводим таблицу двнных
      console.log(currentWeather);
      currentTemp(currentWeather);
      weatherMain(currentWeather);
      sunSet(currentWeather);
    } else {
      console.log(xhr.status + xhr.statusText);
    }
  };
}

function forecastAPI(country_code) {
  xhrFor.open(
    "GET",
    "http://api.openweathermap.org/data/2.5/forecast?id=" +
      country_code +
      "&APPID=8779cde84caa36148153944dafc08f86",
    true
  );
  xhrFor.timeout = 1000;
  xhrFor.ontimeout = function() {
    $("#currentWeather").textContent = "Превышено время ожидания";
  };
  xhrFor.send();

  $("#currentWeather").textContent = "Загругка....";
  xhrFor.onreadystatechange = function() {
    if (xhrFor.readyState != 4) return;
    $("#currentTemp").textContent = "error";
    if (xhrFor.status >= 200 && xhrFor.status < 300) {
      forecastWeather = JSONDate(xhrFor.responseText); //выводим таблицу двнных
      console.log(forecastWeather);
      forecastTemp(forecastWeather);
    } else {
      console.log(xhrFor.status + xhrFor.statusText);
    }
  };
}
