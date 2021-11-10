'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
window.addEventListener('load', main);
document.getElementById('getPokemon').addEventListener('click', fetchAndPopulatePokemons);

function fetchData(url) {
  const promise = fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => {
    console.error(networkError.message);
  });

  return promise;
}

async function fetchAndPopulatePokemons() {
  const query = "pokemon";
  const pokemonApi = await fetchData(`https://pokeapi.co/api/v2/${query}`);
  const pokemonResults = pokemonApi.results;
  const selectElem = document.getElementById("pokemonSelector");

  pokemonResults.forEach(element => {
    const optionElem = document.createElement("option");
    optionElem.textContent = element.name;
    selectElem.appendChild(optionElem);
  });

  return pokemonResults;
}

function fetchImage(/* TODO parameter(s) go here */) {
  // TODO complete this function
  /* 
  Click on any option -> pokemonResults.url -> index?? -> JSONObject.sprites.front_default = image
  */

}

async function main() {
  try {
    const data = await fetchData("https://pokeapi.co/api/v2/");
    // eslint-disable-next-line hyf/no-commented-out-code
    //const pokemonList = await fetchAndPopulatePokemons(data);
    console.log(data);

  } catch (error) {
    console.error(error);
  }
}