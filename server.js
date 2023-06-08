const express = require('express');
const app = express();
// const https = require('https');
const fetch = require('node-fetch');
// import fetch from 'node-fetch';
const api = '8bafa130-0d68-4bc9-87d5-4e578ef60fbd'; //апи-кей яндекса

// Обработка GET-запросов
app.get('/', function (req, res) {
  res.send('Привет, мир!');
});

// опции будущего запроса
fetch('api.weather.yandex.ru/v2/informers?lat=56.426496&lon=61.9216896', {
    method: "GET",
    headers: { "X-Yandex-API-Key": api }
}) 
  .then((response) => {
    console.log(response.json());
    return response.json();
  })
  .then(json => {
    console.log(json[0])
  })

//отправка запроса


// Запуск сервера
app.listen(3000, function () {
  console.log('Сервер запущен на порту 3000!');
});
