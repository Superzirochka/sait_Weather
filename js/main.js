let xhr = new XMLHttpRequest();
let keyAPI = "8779cde84caa36148153944dafc08f86";
let currentCity = "Kharkiv";
let country = "ua";
let output = $("#output");
let country_code = 200;
let currentWeather = {};
let forecastWeather = {};
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
  $("#country").append("<option>" + countryArr[i] + "</option>");
}

currentAPI(currentCity, country);

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

$("#btn").on("click", function() {
  currentCity = $("#city").val();
  country = $("#country").val();
  $("#temp").remove();
  currentAPI(currentCity, country);
  forecastAPI(currentCity, country);
});

function JSONDate(json) {
  let JSONObj = JSON.parse(json);
  return JSONObj;
}

function currentTemp(currentWeather) {
  for (key in currentWeather) {
    console.log(currentWeather.main["temp"]);
    return $("#currentTemp").append(
      "<p id='temp'>" + (currentWeather.main["temp"] - 273.15) + " °C </p>"
    );
  }
}

function forecastTemp(forecastWeather) {}

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
    } else {
      console.log(xhr.status + xhr.statusText);
    }
  };
}

function forecastAPI(currentCity, country) {
  xhr.open(
    "GET",
    "http://pro.openweathermap.org/data/2.5/forecast/hourly?q=" +
      currentCity +
      "," +
      country_code +
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
      forecastTemp(currentWeather);
    } else {
      console.log(xhr.status + xhr.statusText);
    }
  };
}
