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
    
    const getRandomInt = function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
      }
    const randomInt = getRandomInt(0, 25);

    const heroData = obj.data.results[randomInt];
    const name = heroData.name;
    const imageSrc = heroData.thumbnail.path + '.jpg';

    document.getElementById("heroName").innerHTML = name;
    document.getElementById('heroImg').src = imageSrc;

    if (!name) {
        userAction();
    }
  }

const generateHeroBtn = document.getElementById('generateHeroBtn').addEventListener('click', userAction);