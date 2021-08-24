const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const apiKey = '00bc5f819bb0f261669e2bc249379ec3';
const privateKey = '668ac08feb3780cde547a8f3202e99959d02329d';
const timeStamp = Date.now() / 1000 | 0;
const hash = md5(timeStamp+privateKey+apiKey);
const completeUrl = baseUrl + '?ts=' + timeStamp + '&apikey=' + apiKey + '&hash=' + hash;

const userAction = async () => {
    const response = await fetch(completeUrl);
    const myJson = await response.json(); //extract JSON from the http response
    const obj = JSON.parse(JSON.stringify(myJson));
    console.log(obj.data.results.name);
    console.log(obj.data.results.description);
  }

const generateHeroBtn = document.getElementById('generateHeroBtn').addEventListener('click', userAction)