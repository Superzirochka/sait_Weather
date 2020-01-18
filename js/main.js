let xhr = new XMLHttpRequest();
let keyAPI = "8779cde84caa36148153944dafc08f86";
let currentCity;
let output = $("#output");
let currentWeather = {};

$("#btn").on("click", function() {
  currentCity = $("#city").val();
  console.log(currentCity);
});

xhr.open(
  "GET",
  "http://api.openweathermap.org/data/2.5/weather?q=" +
    currentCity +
    ",uk&APPID=" +
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
  } else {
    console.log(xhr.status + xhr.statusText);
  }
};
function makeCell(str) {
  let td = document.createElement("td");
  td.textContent = str;
  return td;
}

function makeRow(cells) {
  let tr = document.createElement("tr");
  for (let i = 0; i < cells.length; i++) {
    tr.appendChild(cells[i]);
  }
  return tr;
}

function Table(rows) {
  let table = document.createElement("table");
  for (let i = 0; i < rows.length; i++) {
    table.appendChild(rows[i]);
  }
  return table;
}

function JSONDate(json) {
  let JSONObj = JSON.parse(json);
  return JSONObj;
}
