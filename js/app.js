var getRandomInt = function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

var baseUrl = 'https://gateway.marvel.com/v1/public/characters';
var limit = '100';
var offset = getRandomInt(0, 1000);
var apiKey = '00bc5f819bb0f261669e2bc249379ec3';
var privateKey = '668ac08feb3780cde547a8f3202e99959d02329d';
var timeStamp = Date.now() / 1000 | 0;
var hash = md5(timeStamp+privateKey+apiKey);
var completeUrl = baseUrl + '?limit=' + limit + '&offset=' + offset + '&ts=' + timeStamp + '&apikey=' + apiKey + '&hash=' + hash;

var getData = async () => {
    var response = await fetch(completeUrl);
    var myJson = await response.json(); //extract JSON from the http response
    obj = JSON.parse(JSON.stringify(myJson));

    function clean(obj) {
        var propNames = obj.getOwnPropertyNames(obj);
        for (var i = 0; i < propNames.length; i++) {
          var propName = propNames[i];
          if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
            return obj;
          }
        }
      }
  }

  var userAction = function() {
    var randomInt = getRandomInt(0, 100);
    offset = getRandomInt(0, 1000);

    var heroData = obj.data.results[randomInt];
    var name = heroData.name;
    var description = heroData.description;
    var imgExt = heroData.thumbnail.extension;
    var imageSrc = heroData.thumbnail.path + '.' + imgExt;

    if (name && description) {
        document.getElementById("heroName").innerHTML = name;
        document.getElementById("heroDescription").innerHTML = description;
        document.getElementById('heroImg').src = imageSrc;
    } else {
        userAction();
    }
  }

 getData();

var generateHeroBtn = document.getElementById('generateHeroBtn').addEventListener('click', userAction);