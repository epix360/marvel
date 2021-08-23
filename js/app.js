const userAction = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const myJson = await response.json(); //extract JSON from the http response
    const obj = JSON.parse(JSON.stringify(myJson));
    console.log(obj.title);
    console.log(obj.completed);
  }

const generateHeroBtn = document.getElementById('generateHeroBtn').addEventListener('click', userAction)

