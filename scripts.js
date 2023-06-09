//задаю все константы которые буду использовать
const api = "9df835223d687d00a1d5f8127b8da9d8"; // использую апи openweather
const iconImg = document.getElementById("weather-icon"); //сайт передаёт иконку
const loc = document.querySelector("#location"); //передать сайту локацию
const tempC = document.querySelector(".c"); //получить температуру цельсия
const tempF = document.querySelector(".f"); //получить температуру фаренгейта
const desc = document.querySelector(".desc"); //описание погоды
const sunriseDOM = document.querySelector(".sunrise"); //время восхода
const sunsetDOM = document.querySelector(".sunset"); // время заката

const constructData = (data) => {
  data = JSON.parse(data);
  iconImg.src = data.iconUrl;
  loc.textContent = `${data.place}`;
  desc.textContent = `${data.description}`;
  tempC.textContent = `${data.celcium} °C`;
  // tempF.textContent = `${data.fahrenheit.toFixed(1)} °F`;
  sunriseDOM.textContent = `${new Date(
    data.sunriseGMT
  ).toLocaleDateString()}, ${new Date(data.sunriseGMT).toLocaleTimeString()}`;
  sunsetDOM.textContent = `${new Date(
    data.sunsetGMT
  ).toLocaleDateString()}, ${new Date(data.sunsetGMT).toLocaleTimeString()}`;
};

window.addEventListener("load", () => {
  let long;
  let lat;
  // запрос геолокации. если отклонено, то поиск по городу вручную
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // по геолокации получаю широту и долготу для определения данных
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric&lang=ru`;
      const geo_URL = `http://localhost:8080/coords?lat=${lat}&long=${long}`;
      console.log(long, lat);

      // фетч для получения данных
      fetch(geo_URL)
        .then((r) => r.text())
        .then((d) => constructData(d));
    });
  } else {
    //если на момент отказа уже введён город, будет осуществлён поиск по нему
    getWeatherByWords();
  }
});
function getWeatherByWords() {
  //функция активируется по клику, осуществляет поиск по городу вручную
  const city = document.getElementById("getCity").value;

  if (city.length == 0) alert("введите город");
  // let baseUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${api}`;
  let cityURL = `http://localhost:8080/city?city=${city}`;

  fetch(cityURL)
    .then((r) => r.text())
    .then((d) => {
      console.log(d);
      if (d.includes('"message"')) {
        document.querySelector(".error").innerHTML = JSON.parse(d).message;
      }
      constructData(d);
    });
}
