var getRandomInt = function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

var baseUrl = 'https://gateway.marvel.com/v1/public/characters';
var apiKey = '00bc5f819bb0f261669e2bc249379ec3';
var privateKey = '668ac08feb3780cde547a8f3202e99959d02329d';
var timeStamp = Date.now() / 1000 | 0;
var hash = md5(timeStamp + privateKey + apiKey);

var getUrl = function() {
    var limit = '100';
    var offset = getRandomInt(0, 1000);
    var completeUrl = baseUrl + '?limit=' + limit + '&offset=' + offset + '&ts=' + timeStamp + '&apikey=' + apiKey + '&hash=' + hash;
    return completeUrl;
}

var getData = async () => {
    var response = await fetch(getUrl());
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
    getUrl();
    getData();

    var randomInt = getRandomInt(0, 100);

    var heroData = obj.data.results[randomInt];
    var name = heroData.name;
    console.log(name);
    var description = heroData.description;
    var altDescriptionPath = heroData.urls[0].url;
    var corsSafeUrl = "https://cors-anywhere.herokuapp.com/" + altDescriptionPath;
    console.log(altDescriptionPath);
    var imgExt = heroData.thumbnail.extension;
    var imageSrc = heroData.thumbnail.path + '.' + imgExt;

    if (name && description) {
        document.getElementById("heroName").innerHTML = name;
        document.getElementById("heroDescription").innerHTML = description;
        document.getElementById('heroImg').src = imageSrc;
    } 
    else if (name && !description) {
        var request = new XMLHttpRequest();
        

        request.open('GET', corsSafeUrl, true);

        request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var resp = request.responseText;

            var parser = new DOMParser();
            var doc = parser.parseFromString(resp, 'text/html');
            var altDescription01 = doc.querySelector('.featured__copy');
            var altDescription02 = doc.querySelector('.text');

            document.getElementById("heroDescription").innerHTML = "";

            if (altDescription01) {
                document.getElementById("heroDescription").append(altDescription01);
              } else if (altDescription02) {
                document.getElementById("heroDescription").append(altDescription02);
              } else {
                document.getElementById("heroDescription").append("");
              }
        }
        };

        request.send();

        document.getElementById("heroName").innerHTML = name;
        document.getElementById('heroImg').src = imageSrc;
    }
        else {
            userAction();
        }
  }

var generateHeroBtn = document.getElementById('generateHeroBtn').addEventListener('click', userAction);

getUrl();
getData();