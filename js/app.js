const userAction = async () => {
    const response = await fetch('https://gateway.marvel.com:443/v1/public/characters?apikey=00bc5f819bb0f261669e2bc249379ec3');
    const myJson = await response.json(); //extract JSON from the http response
    const obj = JSON.parse(myJson);
    console.log('obj.name');
    console.log('obj.description');
  }