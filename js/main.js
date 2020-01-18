let xhr = new XMLHttpRequest();
$("#currentWeather") 

xhr.open("GET", " https://openweathermap.org/", true);
xhr.timeout = 1000;
xhr.ontimeout = function() {
  output.textContent = "Превышено время ожидания";
};
xhr.send();

output.textContent = "Загругка....";
xhr.onreadystatechange = function() {
  if (xhr.readyState != 4) return;
  output.textContent = "Данные полученны";
  if (xhr.status >= 200 && xhr.status < 300) {
    JSONDate(xhr.responseText);//выводим таблицу двнных

    //console.log(JSON.parse(xhr.responseText));
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
  let rows = [];
  let JSONObj = JSON.parse(json);
  for (let i = 0; i < JSONObj.length; i++) {
    let cells = [];

    cells.push(makeCell(JSONObj[i].name));
    cells.push(makeCell(JSONObj[i].login));
    cells.push(makeCell(JSONObj[i].password));
    rows.push(makeRow(cells));
  }
  document.body.appendChild(Table(rows));
}
