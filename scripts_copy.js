//задаю все константы которые буду использовать
const api = '8bafa130-0d68-4bc9-87d5-4e578ef60fbd'; // использую апи ЯНДЕКСА
const iconImg = document.getElementById('weather-icon'); //сайт передаёт иконку
const loc = document.querySelector('#location'); //передать сайту локацию
const tempC = document.querySelector('.c'); //получить температуру цельсия
const tempF = document.querySelector('.f'); //получить температуру фаренгейта
const desc = document.querySelector('.desc'); //описание погоды
const sunriseDOM = document.querySelector('.sunrise'); //время восхода
const sunsetDOM = document.querySelector('.sunset'); // время заката

window.addEventListener('load', () => {
  let long; 
  let lat;
  // запрос геолокации. если отклонено, то поиск по городу вручную
  if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition((position) => {
      // по геолокации получаю широту и долготу для определения данных
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.weather.yandex.ru/v2/informers?lat=${lat}&lon=${long}`; //постоянная ссылка, к которой я обращаюсь

      // фетч для получения данных
      fetch(base, {
        // method: "GET",
        headers: { "X-Yandex-API-Key": api }
      }) 
        .then((response) => {
          console.log(response.json());
          return response.json();
        })
        // .then((data) => {
        //   const { temp } = data.main;
        //   const place = data.name;
        //   const { description, icon } = data.weather[0];
        //   const { sunrise, sunset } = data.sys;
        //   // данные вытащенные из json для последующего вывода

        //   const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        //   const fahrenheit = (temp * 9) / 5 + 32;

        //   // конвертирование в формат GMT
        //   const sunriseGMT = new Date(sunrise * 1000);
        //   const sunsetGMT = new Date(sunset * 1000);

        //   // деструктурирование и использование полученных данных на странице
        //   iconImg.src = iconUrl;
        //   loc.textContent = `${place}`;
        //   desc.textContent = `${description}`;
        //   tempC.textContent = `${temp.toFixed(1)} °C`;
        //   tempF.textContent = `${fahrenheit.toFixed(1)} °F`;
        //   sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
        //   sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        // });
    });
  }
  else { //если на момент отказа уже введён город, будет осуществлён поиск по нему
    getWeatherByWords();
  }
});
function getWeatherByWords() { //функция активируется по клику, осуществляет поиск по городу вручную
  const city = document.getElementById('getCity').value;
  let baseUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${api}`;

  fetch(baseUrl)
  .then((response) => {
    if (response.ok) { //если город написан неправильно, получаем код 404, и тогда появляется уведомление об ошибке
    return response.json();
    }
    else alert('Ошибка!');
  })
  .then((data) => {
    const { temp } = data.main;
    const place = data.name;
    const { description, icon } = data.weather[0];
    const { sunrise, sunset } = data.sys;

    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const fahrenheit = (temp * 9) / 5 + 32;

    const sunriseGMT = new Date(sunrise * 1000);
    const sunsetGMT = new Date(sunset * 1000);

    iconImg.src = iconUrl;
    loc.textContent = `${place}`;
    desc.textContent = `${description}`;
    tempC.textContent = `${temp.toFixed(1)} °C`;
    tempF.textContent = `${fahrenheit.toFixed(1)} °F`;
    sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
    sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
  });
}